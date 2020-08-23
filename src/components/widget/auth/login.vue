<template>
    <form v-on:submit.prevent="Login">
        <div class="form" :class="{ active: LOGIN_ALERT['ERROR'] }" >
            <div class="input" :class="{ active: LOGIN_ALERT['USER_ID'] }">
                <label for="userid">User ID / E-mail</label>
                <div class="form-input">
                    <input type="text" placeholder="User ID / E-mail" v-model="USER_ID" />
                </div>
            </div>
            <div class="input" :class="{ active: LOGIN_ALERT['USER_PW'] }">
                <label for="password">Password</label>
                <div class="form-input">
                    <input type="password" placeholder="password" v-model="USER_PW" />
                </div>
            </div>

            <div>
                <div class="checkbox">
                    <label>
                        <div class="form-checkbox">
                            <input type="checkbox" />
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 10 10">
                                    <path d="M 1,6 3,8 8,1" style="stroke:#000; stroke-width:2; fill:none;" />
                                </svg>
                            </div>
                        </div>
                        <p>자동 로그인</p>
                    </label>
                </div>
            </div>
            <div class="submit">
                <div class="form-submit">
                    <button type="submit">LOGIN</button>
                </div>
                <router-link to="/">아이디 까먹음? / 아 비번 뭐였지?</router-link>
            </div>
            <div class="alert" :class="{ active: LOGIN_ALERT['ALERT'] }">
                <p>{{ LOGIN_ALERT['MESSAGE'] }}</p>
            </div>

            <div class="line">
                <p>OR</p>
            </div>

        </div>
    </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

const userStore = 'userStore'

export default {
    name: 'LoginWidget',
    data() {
        return {
            LOGIN_ALERT: {},
            USER_ID: '',
            USER_PW: '',
        }
    },
    computed: {
        ...mapGetters(userStore, [
            'GET_ALERT', 'UPDATE_ALERT'
        ])
    },
    methods: {
        ...mapActions(userStore, [
            'USER_ALERT'
        ]),
        Login : function(){
            const payload = {
                USER_ID: this.USER_ID,
                USER_PW: this.USER_PW
            }

            if(!payload.USER_ID){
                this.LoginFail('There is no user ID');
                return
            }else if(!payload.USER_PW){
                this.LoginFail('There is no user PW');
                return
            }

            this.USER_LOGIN(payload).then((req) => {
                if(req.data.status == 'fail'){
                    this.LoginFail(req.data.message);
                }else if(req.data.status == 'success'){
                    console.log(req);
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        LoginFail: function(message){
            this.USER_ALERT(message);
            this.LOGIN_ALERT = this.UPDATE_ALERT;

            window.setTimeout(() => {
                this.LOGIN_ALERT.ERROR = false;
			}, 300);
        },
        created(){
            this.LOGIN_ALERT = this.GET_ALERT;
        }
    }
}
</script>

<style lang="scss" scoped>

    .form-input {
        & {
            width: 100%;
            height: 40px;
            border: 2px solid $bg-black-light;
            background-color: #fff;
        }

        & > input {
            width: 100%;
            height: 100%;
            padding:0 0 0 15px;
            font-size: $font-size;
            color: $font-color;
            border: none;
            background: none;
            outline: none;
        }

    }

    .form-checkbox {
        & {
            display: inline-block;
        }

        & > input {
            display: none;
        }

        & > input:checked + div {
            & > svg {
                display: block;
            }
        }

        & > div {
            & {
                width: 10px;
                height: 10px;
                background-color: #f1f1f1;
                border: 1px solid $bg-gray;
                border-radius: 2px;
                position: relative;
                cursor: pointer;
                @include transition(all .2s);
            }

            &:hover {
                background-color: $bg-light-bold;
                @include transition(all .2s);
            }

            &:active {
                background-color: $bg-gray;
                @include transition(all .2s);
            }

            & > svg {
                & {
                    display: none;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    @include transform(translate(-50%, -50%));
                    width:8px;
                    height:8px;
                }
            }
        }
    }

    .form-submit {
        & {
            width: 100%;
            height: 45px;
            background-color: $bg-orange;
            border-radius: 5px;
            overflow: hidden;
            cursor: pointer;
            @include transition(all .2s);
        }

        &:hover {
            background-color: $bg-orange-bold;
            @include transition(all .2s);
        }

        & > button {
            & {
                width: 100%;
                height: 100%;
                background:none;
                border:none;
                color:#fff;
                letter-spacing: 2px;
                font-size: #{$font-size - 2};
                cursor: pointer;
                outline: none;
                @include box-sizing(border-box);
            }
        }

    }


    .form {
        & {
            width: 500px;
            margin: 0 auto;
            position: relative;
            padding-top: 70px;
            @include transition(.2s all);
        }

        .input {
            & {
                width: 100%;
                height: auto;
                max-width: 500px;
                margin: 0 auto 20px auto;
            }

            &:last-child {
                margin: 0 auto 0 auto;
            }

            & > label {
                display: block;
                font-size: #{$font-size};
                color: $bg-black-light;
                line-height:1.5;
                padding-bottom:5px;
            }

            & > div {
                & {
                    border: 1px solid $bg-gray;
                    border-radius: 5px;
                    overflow: hidden;
                    @include transition(.2s all);
                }

                & > ::placeholder {
                    color: $bg-light-bold;
                    font-size: #{$font-size - 2};
                }
            }

        }

        .checkbox {
            & {
                width: 100%;
                height: auto;
                max-width: 500px;
                margin: 0 auto 5px auto;
            }
            & > label {
                & {
                    cursor: pointer;
                }

                & > p {
                    display: inline-block;
                    padding-left: 5px;
                    color: $font-color;
                    font-weight: bold;
                    font-size: #{$font-size - 2};
                }

                & > i {
                    font-size: #{$font-size - 2};
                    display: block;
                    font-style: normal;
                }
            }
        }

        .submit {
            & {
                margin-top:30px;
            }

            & > a {
                & {
                    display: block;
                    margin-top: 10px;
                    text-decoration: none;
                    font-weight: bold;
                    color: $bg-blue;
                    text-align: right;
                    @include transition(.2s all);
                }

                &:hover {
                    & {
                        color: $bg-blue-bold;
                        text-decoration: underline;
                        @include transition(.2s all);
                    }
                }
            }
        }

        .alert {
            & {
                @include transition(.2s all);
                color: #e84f4f;
                font-size: #{$font-size - 2};
                opacity:0;
            }

            & > p {
                padding: 7px 0px 0px 5px;
            }
        }

        .line {
            & {
                width: 100%;
                height: 1px;
                position: relative;
                background-color: $bg-gray;
                margin-top:50px;
                text-align: center;
            }

            & > p {
                font-size: $font-size;
                background-color: #fff;
                padding: 0 30px;
                display: inline-block;
                position: relative;
                top: -8px;
            }

        }

    }

    .input.active {
        .form-input {
            @include transition(.2s all);
            border: 1px solid #e84f4f;
        }
    }

    .alert.active {
        @include transition(.2s all);
        opacity: 1;
    }

    .form.active {
        animation-duration: .3s;
        animation-direction: reverse;
        animation-name: slidein;
        @keyframes slidein {
            0% {
                left: -2px;
            }

            20% {
                left: 0px;
            }

            40% {
                left: 2px;
            }

            60% {
                left: 0px;
            }

            80% {
                left: -2px;
            }

            100% {
                left: 0px;
            }
        }
    }

</style>