<template>
	<div class="auth">
        <default-side />
		<default-header />

        <div class="title">
            <h1>
                VV
            </h1>
            <p>
                VRCHAT 맵 / 캐릭터 등 정보를 쉽게 조회하기 위해 제작된 홈페이지 입니다.<br>
                VRCHAT 계정 또는 스팀 아이디로 로그인 가능합니다.
            </p>
        </div>
        <div class="contents">
            <div class="head">
                <router-link to="/">
                    <i><font-awesome-icon :icon="faHome" /></i>
                </router-link>
                <ul>
                    <li :class="{ active : page.join }">
                        <button type="button">
                            <p>회원가입</p>
                        </button>
                    </li>
                    <li :class="{ active : page.login }">
                        <button type="button">
                            <p>로그인</p>
                        </button>
                    </li>
                </ul>
            </div>

            <!-- 여기 -->

        </div>
	</div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { mapActions, mapGetters } from 'vuex'

import Header from '@/components/layout/header'
import Side from '@/components/layout/navigation'

const userStore = 'userStore'

export default {
    name: 'Auth',
    data() {
        return {
            LOGIN_ALERT: {},
            USER_ID: '',
            USER_PW: '',

            page : {
                login : true,
                join : false,
            },

            faHome
        }
    },
	components: {
        'default-header': Header,
        'default-side': Side
    },
    computed: {
        ...mapGetters(userStore, [
            'GET_ALERT', 'UPDATE_ALERT'
        ])
    },
    methods : {
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

<style scoped lang="scss">

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

    .title {
        & {
            width: 100%;
            height: auto;
            text-align: center;
            margin-top: 80px;
        }

        & > h1 {
            text-align: center;
            font-size: 64px;
            color: $bg-orange;
            letter-spacing: -5px;
            font-family: $notoKR-B;
            display:inline-block;
            @include transform(rotate(90deg));
        }

        & > p {
            margin-top: 15px;
            line-height: 1.6;
        }
    }

    .contents {
        & {
            width: 100%;
            max-width: 700px;
            height: auto;
            margin: 80px auto 0 auto;
            background-color: #fff;
            border-radius: 5px;
            padding-bottom: 70px;
            @include box-shadow(5px 5px 15px rgba(0,0,0,0.1));
        }

        & > .head {
            & {
                width: 100%;
                height: 40px;
                background-color: $bg-blue-bold;
                border-bottom: 2px solid $bg-blue-light;
            }

            & > a {
                & {
                    display: inline-block;
                    width: auto;
                    height: 100%;
                    position: relative;
                    border: none;
                    background: none;
                    padding: 0 15px;
                    vertical-align: middle;
                    cursor: pointer;
                    font-size: 0;
                    line-height: 40px;
                    background-color: $bg-blue-light;
                }

                & > i {
                    & {
                        font-size: #{$font-size};
                        color: #fff;
                        display: inline-block;
                        vertical-align: middle;
                    }
                }

                & > span {
                    & {
                        display: inline-block;
                        font-size: #{$font-size - 2};
                        color: #bbb;
                        padding-left: 10px;
                        vertical-align: middle;
                        letter-spacing: 3px;
                    }
                }
            }

            & > ul {
                & {
                    list-style: none;
                    font-size: 0;
                    width: auto;
                    height: 100%;
                    float: right;
                }

                & > li {
                    & {
                        display: inline-block;
                        width: auto;
                        height: 100%;
                        background-color: $bg-blue-bold;
                        @include transition(.2s all);
                    }

                    & > button {
                        & {
                            display: block;
                            width: auto;
                            height: 100%;
                            padding: 0;
                            margin: 0;
                            border: none;
                            background: none;
                            outline: none;
                            cursor: pointer;
                        }

                        & > p {
                            display: inline-block;
                            width: auto;
                            line-height: 45px;
                            font-size: #{$font-size - 2};
                            letter-spacing: 3px;
                            color: #f1f1f1;
                            padding: 0 30px;
                            @include transition(.2s all);
                        }
                    }

                    &:hover {
                        & {
                            background-color: $bg-blue;
                        }
                    }

                    &.active {
                        & {
                            background-color: $bg-blue-light;
                            @include transition(.2s all);
                        }

                        & > button {

                            & > p {
                                & {
                                    color: #fff;
                                    @include transition(.2s all);
                                }
                            }
                        }
                    }
                }
            }
        }

        & > form {
            & {
                padding-top: 70px;
            }
        }
    }

    .form {
        & {
            width: 500px;
            margin: 0 auto;
            position: relative;
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
