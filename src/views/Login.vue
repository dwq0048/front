<template>
	<div class="login">
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
            <form v-on:submit.prevent="login">
                <div class="form" :class="{ active: isError['form'] }" >
                    <div class="input" :class="{ active: isError['userid'] }">
                        <label for="userid">User ID / E-mail</label>
                        <div class="form-input">
                            <input type="text" placeholder="User ID / E-mail" id ="userid" v-model="userid" />
                        </div>
                    </div>
                    <div class="input" :class="{ active: isError['userpw'] }">
                        <label for="password">Password</label>
                        <div class="form-input">
                            <input type="password" placeholder="password" id ="userpw" v-model="userpw" />
                        </div>
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
                            <p>서비스 이용약관</p>
                            <i>서비스 이용약관에 동의하여야 로그인이 가능합니다.</i>
                        </label>
                    </div>
                    <div class="submit">
                            <div class="form-submit">
                                <button type="submit">
                                    LOGIN
                                </button>
                            </div>
                    </div>
                    <div class="alert" :class="{ active: isError['alert'] }">
                        <p>{{ isError['message'] }}</p>
                    </div>

                    <div class="line">
                        <p>OR</p>
                    </div>
                </div>
            </form>
        </div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Header from '@/components/layout/header'
import Side from '@/components/layout/side'

const userStore = 'userStore';

export default {
    name: 'Login',
    data() {
        return {
            isError: {
                alert: false,
                userid: false,
                userpw: false,
                form: false,
                message: ''
            },
            userid: '',
            userpw: ''
        }
    },
	components: {
        'default-header': Header,
        'default-side': Side
    },
    computed: {
        ...mapGetters(userStore, {
            storeUserName: 'GE_USER_NAME'
        }),
    },
    methods : {
        ...mapActions(userStore, [
            'USER_LOGIN'
        ]),
        login : function(){
            let data = {
                userid : userid.value,
                userpw : userpw.value
            }

            if(!data.userid){
                this.loginFail('userid no field');
                return
            }else if(!data.userpw){
                this.loginFail('userpw no field');
                return
            }

            this.USER_LOGIN(data).then((req) => {
                if(req.data.status == 'fail'){
                    //로그인 실패
                    this.loginFail(req.data.message);
                }else if(req.data.status == 'success'){
                    // 로그인 성공
                    console.log(req.data);
					this.$store.commit('TokenInfo', req.data.info);
					this.$router.push({ path: '/' });
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        loginFail: function(message){
            this.reset();
            this.isError.form = true;

            switch(message){
                case 'userid no field':
                    this.isError.alert = true;
                    this.isError.userid = true;
                    this.isError.message = '아이디를 입력해주세요.';
                    break;
                case 'userpw no field':
                    this.isError.userpw = true;
                    this.isError.alert = true;
                    this.isError.message = '비밀번호를 입력해주세요.'
                    break;
                case 'userid error':
                    this.isError.alert = true;
                    this.isError.userid = true;
                    this.isError.userpw = true;
                    this.isError.message = '아이디 또는 비밀번호가 틀렸습니다.';
                    break;
                case 'password error':
                    this.isError.alert = true;
                    this.isError.userid = true;
                    this.isError.userpw = true;
                    this.isError.message = '아이디 또는 비밀번호가 틀렸습니다.';
                    break;
                default:
                    this.isError.alert = true;
                    this.isError.message = '알 수 없는 오류입니다.';
                    break;
            }

            window.setTimeout(() => {
                this.isError.form = false;
			}, 300);
        },
        reset: function(){
            this.isError.userid = false;
            this.isError.userpw = false;
            this.isError.alert = false;
            this.isError.message = '';
        }
    }
}
</script>

<style scoped lang="scss">

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
            max-width: 800px;
            height: auto;
            margin: 80px auto 0 auto;
            padding: 70px 0;
            background-color: #fff;
            border-radius: 5px;
            @include box-shadow(5px 5px 15px rgba(0,0,0,0.1));
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
                font-size: #{$font-size + 2};
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
