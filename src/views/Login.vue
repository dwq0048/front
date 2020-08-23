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

            <login />

        </div>
	</div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { mapActions, mapGetters } from 'vuex'

import Header from '@/components/layout/header'
import Side from '@/components/layout/navigation'
import Login from '@/components/widget/auth/login.vue'

const userStore = 'userStore'

export default {
    name: 'Auth',
    data() {
        return {
            page : {
                login : true,
                join : false,
            },

            faHome
        }
    },
	components: {
        'default-header': Header,
        'default-side': Side,
        'login' : Login,
    },
}
</script>

<style scoped lang="scss">

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
    }

</style>
