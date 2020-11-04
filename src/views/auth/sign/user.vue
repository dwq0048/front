<template>
    <div class="user">
        <default-side />
		<default-header />

        <div class="wrap">
            <div class="contents">
                <div class="wrap" v-if="this.$route.name == 'Auth'">
                    <auth-home />
                </div>
                <div class="wrap" v-else>
                    <router-view></router-view>
                </div>
            </div>
            <div class="navigation private-nav">
                <div>
                    <div class="nav">
                        <router-link :class="{ active : this.$route.name == 'Auth' }" to="/auth" title="Dashboard"></router-link>
                        <router-link to="/auth" title="Vrchat Api"></router-link>
                        <router-link to="/auth" title="알림"></router-link>
                        <router-link :class="{ active : this.$route.name == 'AuthLike' }" to="/auth/like" title="좋아요"></router-link>
                        <router-link :class="{ active : this.$route.name == 'AuthPost' }" to="/auth/post" title="내 게시글"></router-link>
                        <router-link :class="{ active : this.$route.name == 'AuthSetting' }" to="/auth/setting" title="설정"></router-link>
                        <div>
                            <auth-nav />
                            <div>
                                <auth-nav :info="{ option : true }" />
                            </div>
                        </div>
                    </div>

                    <!-- 로그아웃 -->
                    <!--
                    <div class="setting">
                        <ul>
                            <li>
                                <router-link to="#" title="로그아웃">
                                    <i><font-awesome-icon :icon="faSignOutAlt" /></i>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    -->
                </div>
            </div>
        </div>

        <default-footer />
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import Header from '@/components/layout/header'
import Side from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'

import Home from '@/views/auth/user/home'
import Nav from '@/components/widget/auth/user/nav/navigation'

export default {
    name: 'User',
	components: {
        'default-header': Header,
        'default-side': Side,
        'default-footer': Footer,
        'auth-home' : Home,
        'auth-nav' : Nav,
    },
    data(){
        return {
            // Icon
            faSignOutAlt
        }
    },
    created(){
        console.log(this.$route);
    }
}
</script>

<style lang="scss" scoped>
    .user {
        & > div.wrap {
            & {
                width: 100%;
                max-width: $wrap;
                min-height: 500px;
                margin: 15px auto;
                display: table;
            }

            & > .contents {
                & {
                    display: table-cell;
                    position: relative;
                    width: auto; height: auto;
                    border-radius: 10px;
                    background-color: #f9f9f9;
                    z-index: 10;
                    vertical-align: top;
                    overflow: hidden;
                    @include box-shadow(5px 5px 15px rgba(0,0,0,0.1));
                }

                & > div.top {
                    & {
                        width: 100%; height: 15px;
                        background-color: #555;
                    }
                }

                & > div.wrap {
                    & {
                        vertical-align: top;
                    }
                }
            }

            & > .navigation{
                & {
                    display: table-cell;
                    width: 80px; height: auto;
                    position: relative;
                    z-index: 1;
                }

                & > div {
                    & {
                        width: 100px; height: auto;
                        position: absolute;
                        left: 0; top: 10px; right: 0; bottom: 10px;
                        background-color: #555;
                        border-radius: 10px;
                        margin-left: -20px;
                        overflow: hidden;
                        @include transition(.2s all);
                    }

                    & > div.nav {
                        & {
                            position: relative;
                            display: block;
                            width: 100%; height: auto;
                            padding-left: 20px;
                        }
                    }

                    & > div.setting {
                        & {
                            position: absolute;
                            left: 0; bottom: 0;
                            display: block;
                            width: 100%; height: auto;
                            padding: 50px 0px 10px 20px;
                        }

                        & > ul {
                            & {
                                display: block;
                                width: 100%; height: auto;
                                list-style: none;
                                font-size: 0;
                            }

                            & > li {
                                & {
                                    display: block;
                                    width: 100%; height: auto;
                                }

                                & > a {
                                    & {
                                        display: block;
                                        position: relative;
                                        width: 100%; height: auto;
                                    }

                                    &:after {
                                        & {
                                            content: " ";
                                            display: block;
                                            padding-bottom: 100%;
                                        }
                                    }

                                    & > i {
                                        & {
                                            display: block;
                                            position: absolute;
                                            left: 50%; top: 50%;
                                            font-size: #{$font-size + 4};
                                            color: #ccc;
                                            @include transform(translate(-50%, -50%));
                                        }
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

<style lang="scss">
    .user {
        .navigation.private-nav {
            & > div {
                & > .nav {
                    & > div {
                        & > div {
                            & {
                                position: absolute;
                                left: 0; top: 0;
                                width: 100%; height: 80px;
                                overflow: hidden;
                                @include transition(.2s all)
                            }
                        }
                    }

                    & > a {
                        & {
                            display: block;
                            position: absolute;
                            width: 100%; height: 80px;
                            left: 0;
                            z-index: 20;
                        }

                        &:nth-child(1){ top: 0 }
                        &:nth-child(2){ top: 80px }
                        &:nth-child(3){ top: 160px }
                        &:nth-child(4){ top: 240px }
                        &:nth-child(5){ top: 320px }
                        &:nth-child(6){ top: 400px }

                        &:hover ~ div > div {
                            & { @include transition(.2s all) }
                            & > ul { @include transition(.2s all) }
                        }

                        &:nth-child(1).active ~ div > div {
                            & { top: 0 }
                            & > ul { top: 0 }
                        }

                        &:nth-child(2).active ~ div > div {
                            & { top: 80px }
                            & > ul { top: -80px }
                        }

                        &:nth-child(3).active ~ div > div {
                            & { top: 160px }
                            & > ul { top: -160px }
                        }

                        &:nth-child(4).active ~ div > div {
                            & { top: 240px }
                            & > ul { top: -240px }
                        }

                        &:nth-child(5).active ~ div > div {
                            & { top: 320px }
                            & > ul { top: -320px }
                        }

                        &:nth-child(6).active ~ div > div {
                            & { top: 400px }
                            & > ul { top: -400px }
                        }

                        &:nth-child(1):hover ~ div > div {
                            & { top: 0 }
                            & > ul { top: 0 }
                        }

                        &:nth-child(2):hover ~ div > div {
                            & { top: 80px }
                            & > ul { top: -80px }
                        }

                        &:nth-child(3):hover ~ div > div {
                            & { top: 160px }
                            & > ul { top: -160px }
                        }

                        &:nth-child(4):hover ~ div > div {
                            & { top: 240px }
                            & > ul { top: -240px }
                        }

                        &:nth-child(5):hover ~ div > div {
                            & { top: 320px }
                            & > ul { top: -320px }
                        }

                        &:nth-child(6):hover ~ div > div {
                            & { top: 400px }
                            & > ul { top: -400px }
                        }
                    }
                }
            }
        }
        .navigation.private-nav:hover {
            & {
                @include transition(.2s all);
            }

            & > div {
                & {
                    width: 200px!important;
                    @include transition(.2s all);
                }

                & > .nav {
                    & > div {
                        & > ul {
                            & > li {
                                & > a {
                                    & > .description {
                                        & {
                                            visibility: visible;
                                            @include transition(.2s all);
                                        }

                                        & > span {
                                            & {
                                                width: auto;
                                                @include transition(.2s all);
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        & > div {
                            & > ul {
                                & > li {
                                    & > a {
                                        & > .description {
                                            & {
                                                visibility: visible;
                                                @include transition(.2s all);
                                            }

                                            & > span {
                                                & {
                                                    width: auto;
                                                    @include transition(.2s all);
                                                }
                                            }
                                        }
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
