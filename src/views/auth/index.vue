<template>
    <div class="auth">
        <default-side />
		<default-header />

        <div class="contents" :class="{ active : this.$route.params.id == 'join' }">
            <div class="background" :style="'background-image:url(' + require(`@/assets/beat.jpeg`)+ ')'">
                <div>
                    <div class="intro">
                        <h1>
                            <b>VV</b>
                        </h1>

                        <p>Vrchat 정보를 쉽게 검색하기 위해 제작된 홈페이지 입니다.<br>
                        로그인 후 Vrchat 계정 인증을 하시면 여러 가지 정보를<br>
                        간편하게 조회 할 수 있습니다.</p>
                    </div>
                    <div class="button">
                        <router-link to="/auth/join" v-if="this.$route.params.id == 'login'">
                            <i><font-awesome-icon :icon="faArrowRight" /></i>
                            회원가입
                            </router-link>
                        <router-link to="/auth/login" v-if="this.$route.params.id == 'join'">
                            로그인
                            <i><font-awesome-icon :icon="faArrowLeft" /></i>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="wrap">
                <login v-if="this.$route.params.id == 'login'" />
                <join v-if="this.$route.params.id == 'join'" />
            </div>
        </div>
        
        <default-footer />
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import Header from '@/components/layout/header'
import Side from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'

import Login from '@/components/widget/auth/login.vue'
import Join from '@/components/widget/auth/join.vue'

export default {
    name: 'Login',
    data(){
        return {
            page: '',

            faArrowRight, faArrowLeft
        }
    },
	components: {
        'default-header': Header,
        'default-side': Side,
        'default-footer': Footer,
        'login' : Login,
        'join' : Join,
    },
    created(){
        this.page = this.$route.params.id;
    }
}
</script>

<style lang="scss" scoped>
    .auth {
        & > .contents {
            & {
                width: 1200px;
                height: auto;
                background-color: #fff;
                padding: 15px 0;
                position: relative;
                margin: 50px auto 0 auto;
                border-radius: 50px;
                overflow: hidden;
                text-align: right;
                @include box-shadow(5px 5px 15px rgba(0,0,0,0.1));
                @include transition(.2s all);
            }

            &:after {
                content: " ";
                display: block;
                clear: both;
            }

            & > .background {
                & {
                    position: absolute;
                    left: 0; right: 50%; top: 0; bottom: 0;
                    background-color: #ccc;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: 50% 50%;
                    background-attachment: fixed;
                    @include transition(.2s all);
                    z-index: 10;
                }

                & > div {
                    & {
                        position: absolute;
                        left: 0; top: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0,0,0,0.5);
                    }

                    & > .button {
                        & {
                            position: absolute;
                            left: 100%; top: 0;
                            white-space: nowrap;
                            @include transform(translateX(-100%));
                            @include transition(.2s all);
                        }

                        & > a {
                            & {
                                display: inline-block;
                                text-decoration: none;
                                font-size: #{$font-size};
                                color: #fff;
                                font-weight: bold;
                                padding: 15px;
                                @include transform(scale(1));
                                @include transition(.2s all);
                            }

                            & > i {
                                & {
                                    padding-right: 5px;
                                }
                            }

                            &:hover {
                                & {
                                    @include transform(scale(1.1));
                                    @include transition(.2s all);
                                }
                            }
                        }
                    }

                    & > .intro {
                        & {
                            position: absolute;
                            left: 50%; top: 50%;
                            @include transform(translate(-50%, -50%));
                            @include transition(.2s all);
                        }

                        & > h1 {
                            & {
                                font-size: #{$font-size + 50};
                                color: $bg-orange;
                                text-align: center;
                            }

                            & > b {
                                & {
                                    display: inline-block;
                                    font-family: $notoKR-M;
                                    font-style: normal;
                                    font-weight: 300;
                                    letter-spacing: -5px;
                                    @include transform(rotate(90deg));
                                }
                            }
                        }

                        & > p {
                            & {
                                color: #fff;
                                font-size: #{$font-size};
                                letter-spacing: 3px;
                                line-height: 1.5;
                                font-weight: bold;
                                white-space: nowrap;
                                text-align: center;
                                padding-top: 30px;
                            }
                        }
                    }
                }
            }

            & > .wrap {

                & > form {
                    & {
                        width: 50%;
                        display: inline-block;
                    }
                }
            }

            &.active {
                & {
                    text-align: left;
                    @include transition(.2s all);
                }

                & > .background {
                    & {
                        left: 50%; right: 0; top: 0; bottom: 0;
                        @include transition(.2s all);
                    }

                    & > div {
                        & > .button {
                            & {
                                left: 0;
                                @include transform(translateX(0));
                                @include transition(.2s all);
                            }

                            & > a {
                                & > i {
                                    & {
                                        padding-right: 0;
                                        padding-left: 5px;
                                    }
                                }
                            }
                        }
                    }
                } 
            }

        }
    }
</style>
