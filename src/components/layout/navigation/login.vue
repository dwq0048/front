<template>
    <li>
        <div class="view">
            <div>
                <div class="login">
                    <form v-on:submit.prevent="Login">
                        <div class="form" :class="{ active: LOGIN_ALERT['ERROR'] }">
                            <div class="form-input" :class="{ active: LOGIN_ALERT['USER_ID'] }">
                                <input type="text" placeholder="USER ID / E-MAIL" v-model="USER_ID"/>
                            </div>
                            <div class="form-input" :class="{ active: LOGIN_ALERT['USER_PW'] }">
                                <input type="password" placeholder="PASSWORD" v-model="USER_PW"/>
                            </div>
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
                                    <p>서비스 이용약관 동의</p>
                                </label>
                            </div>

                            <div class="form-submit">
                                <button type="submit">LOGIN</button>
                            </div>

                            <div class="alert" :class="{ active: LOGIN_ALERT['ALERT'] }">
                                <p>{{ LOGIN_ALERT['MESSAGE'] }}</p>
                            </div>

                            <div class="line">
                                <div>
                                    <p>OR</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

const userStore = 'userStore'

export default {
    name: 'nav_login',
    data() {
        return {
            USER_ID: '',
            USER_PW: '',
            LOGIN_ALERT: {}
        }
    },
    computed: {
        ...mapGetters(userStore, [
            'GET_ALERT', 'UPDATE_ALERT'
        ])
    },
    methods: {
        ...mapActions(userStore, [
            'USER_ALERT','USER_LOGIN'
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
                if(req.data.status == 'success'){
                    console.log(req);
                }else{
                    this.LoginFail(req.data.message);
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
        }
    },
    created(){
        this.LOGIN_ALERT = this.GET_ALERT;
    }
}
</script>

<style lang="scss" scoped>
    .form-input {
        & {
            width: 100%;
            height: 45px;
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

    .form-submit {
        & {
            width: 100%;
            height: 50px;
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
                font-size: #{$font-size - 1};
                cursor: pointer;
                outline: none;
                @include box-sizing(border-box);
            }
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

.login {
    & {
        padding: 30px 0 15px 0;
    }

    & .form {
        & {
            width: 100%;
            height: auto;
            max-width: 300px;
            margin: 0 auto;
            position: relative;
            @include transition(.2s all);
        }

        & > .form-input {
            & {
                height: 37px;
                border:2px solid $bg-orange;
                margin-bottom: 15px;
            }

            & > input {
                font-size: #{$font-size - 3};
            }
        }

        & > .form-submit {
            & {
                height: 40px;
                margin-top: 20px;
            }
        }

        & > .checkbox {
            & {
                margin-bottom: 5px;
            }

            & > label {
                & {
                    font-size: #{$font-size - 2};
                    color: $bg-light;
                    cursor: pointer;
                }

                & > p {
                    & {
                        display: inline-block;
                        padding-left: 5px;
                    }
                }

                & > i {
                    & {
                        display: block;
                        font-style: normal;
                    }
                }
            }
        }

        & > .alert {
            margin-top: 10px;
            font-size: #{$font-size - 2};
            color: #f1f1f1;
        }

        & > .line {
            & {
                padding-top: 30px;
            }

            & > div {
                & {
                    width: 100%;
                    height: 2px;
                    background-color: #fff;
                    position: relative;
                    text-align: center;
                }

                & > p {
                    color: #fff;
                    background-color: $bg-black-light;
                    padding: 0px 20px;
                    font-size: #{$font-size - 2};
                    display: inline-block;
                    margin-top: -8px;
                }
            }

        }
    }

    & .form-input.active {
        & {
            @include transition(.2s all);
            border: 2px solid #e84f4f;
        }

        & input::placeholder {
            color: #e84f4f;
        }
    }

    & .alert.active {
        @include transition(.2s all);
        opacity: 1;
    }

    & .form.active {
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
}
</style>