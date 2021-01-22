<template>
    <div id="header" v-if="!is_mobile()"> <!-- PC -->
        <div class="top-bar">
            <div>
                <div class="logo">
                    <router-link to="/" title="홈으로"><span>VV</span></router-link>
                </div>
                <div class="navigation">
                    <ul>
                        <li>
                            <router-link to="/community">커뮤니티</router-link>
                        </li>
                        <li>
                            <router-link to="/auth">라이브러리</router-link>
                        </li>
                        <li>
                            <router-link to="/auth/vrchat">VRCHAT API</router-link>
                        </li>
                    </ul>
                </div>
                <div class="menu" title="메뉴">
                    <router-link to="/auth/login" title="로그인" v-if="!GET_LOGIN" class="btn">로그인</router-link>
                    <router-link to="/auth/join" title="회원가입" v-if="!GET_LOGIN" class="btn">회원가입</router-link>
                    <router-link to="/auth/login" title="로그인" v-if="GET_LOGIN" class="btn">안녕하세요</router-link>
                    <a class="ham" v-on:click="Navigation(true)">
                        <div></div>
                        <div></div>
                        <div></div>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div id="header" class="mobile" v-else> <!-- MOBILE -->
        <div class="top-bar">
            <div>
                <div class="logo">
                    <router-link to="/" title="홈으로"><span>VV</span></router-link>
                </div>
                <div class="menu" title="메뉴">

                    <!-- sign out -->
                    <router-link to="/auth/login" title="로그인" v-if="!GET_LOGIN" class="btn">
                        <i><font-awesome-icon :icon="faSignInAlt" /></i>
                    </router-link>

                    <!-- sign in -->
                    
                    <!--
                    <router-link to="#" title="검색" v-if="GET_LOGIN" class="btn">
                        <i><font-awesome-icon :icon="faSearch" /></i>
                    </router-link>
                    -->

                    <router-link to="#" title="프로필" v-if="GET_LOGIN" class="btn profile">
                        <div>
                            <div>

                            </div>
                        </div>
                    </router-link>

                    <a class="ham" v-on:click="Navigation(true)">
                        <i><font-awesome-icon :icon="faBars" /></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { IS_MOBILE } from '@/store/helper/'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faSignInAlt, faSearch } from '@fortawesome/free-solid-svg-icons'

const userStore = 'userStore';

export default {
    name: 'default-header',
    computed: {
        ...mapGetters([
            'GET_NAVIGATION'
        ]),
        ...mapGetters(userStore, [
            'GET_LOGIN'
        ])
    },
    data(){
        return {
            // Icon
            faBars, faSignInAlt, faSearch,
        }
    },
    methods : {
        ...mapActions([
            'ON_NAVIGATION'
        ]),
        is_mobile(){ return IS_MOBILE() },
        Navigation : function(value){
            this.ON_NAVIGATION(true)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #header {
        & {
            width: 100%;
            height: auto;
            background-color: $bg-black-light;
        }

        & > .top-bar {
            & {
                width: 100%;
                max-width: $wrap;
                height: 50px;
                display: table;
                margin: 0 auto;
                overflow: hidden;
            }

            &:after {
                @include after();
            }

            & > div {
                & {
                    display: table-cell;
                    vertical-align: middle;
                }

                & > .logo {
                    & {
                        width: 50px;
                        background-color: $bg-blue;
                        display: table;
                        vertical-align: middle;
                        float: left;
                        position: relative;
                        @include box-shadow(5px 5px 15px rgba(0,0,0,0.1));
                    }

                    &:after {
                        content: " ";
                        display: block;
                        padding-bottom: 100%;
                    }

                    & > a {
                        & {
                            color: #fff;
                            font-size: 18px;
                            font-weight: 300;
                            display: table-cell;
                            vertical-align: middle;
                            padding: 0 20px;
                            letter-spacing: 1px;
                            text-decoration: none;
                            position: absolute;
                            left: 50%; top: 50%;
                            @include transform(translate(-50%, -50%));
                        }

                        & > span {
                            color: #fff;
                            font-size: 20px;
                            font-family: $notoKR-B;
                            letter-spacing: -3px;
                            display: block;
                            @include transform(rotate(90deg));
                        }
                    }
  
                }

                & > .navigation {
                    & {
                        width: auto; height: 50px;
                        padding-left: 15px;
                        float: left;
                    }

                    & > ul {
                        & {
                            width: auto; height: 100%;
                            font-size: 0; list-style: none;
                        }

                        & > li {
                            & {
                                display: inline-block;
                                width: auto; height: 100%;
                                padding: 0 30px;
                            }

                            & > a {
                                & {
                                    display: block;
                                    font-size: #{$font-size - 1};
                                    color: #fff;
                                    text-decoration: none;
                                    line-height: 50px;
                                    letter-spacing: 1px;
                                }
                            }
                        }
                    }
                }

                & > .menu {
                    & {
                        float: right;
                        display: table;
                        height: 50px;
                        width: auto;
                    }

                    & > a{
                        & {
                            display: table-cell;
                            vertical-align: middle;
                            text-decoration: none;
                            color: #f1f1f1;
                            text-align: center;
                            width: 100px; height: 35px;
                            padding: 0; margin: 0;
                            font-size: #{$font-size - 1};
                            cursor: pointer;
                            @include transform(scale(1));
                            @include transition(all .2s);
                        }

                        &.btn {
                            width: auto;
                            padding-right:30px;
                        }

                        &:hover {
                            color: #fff;
                            @include transform(scale(1.1));
                            @include transition(all .2s);
                        }
                    }

                    & > a.ham {
                        & {
                            width: 50px; height: auto;
                            border: 0; background: none;
                            padding: 0; margin: 0;
                            outline: none; font-size: 0;
                            background-color: $bg-blue;
                            position: relative;
                        }

                        &:after {
                            content: " ";
                            display: block;
                            padding-bottom: 100%;
                        }

                        & > i {
                            & {
                                position: absolute;
                                left: 50%; top: 50%;
                                color: #fff;
                                font-size: #{$font-size + 7};
                                @include transform(translate(-50%, -50%));
                            }
                        }
                    }
                }
            }
        }

        & > .nav {
            & {
                width: 100%;
                height: 0px;
                //height: 5px;
                background-color: $bg-orange;
                border-bottom: 3px solid $bg-orange;
            }

            & > ul {
                & {
                    width: 100%;
                    max-width: $wrap;
                    height: 100%;
                    margin: 0 auto;
                    font-size: 0;
                }

                & > li {
                    & {
                        width: auto;
                        height: 100%;
                        display: inline-block;
                        list-style: none;
                        font-size: 14px;
                    }

                    & > a {
                        & {
                            color: #fff;
                            font-weight: 100;
                            text-decoration: none;
                            height: 100%;
                            display: table;
                            padding: 0 15px;
                        }

                        & > span {
                            & {
                                display: table-cell;
                                vertical-align: middle;
                                letter-spacing: 0.6px;
                            }
                        }

                    }
                }
            }
        }

        &.mobile {
            & > .top-bar {
                & {
                    height: 45px;
                }
                
                & > div {
                    & > .logo {
                        & {
                            width: 45px;
                        }

                        & > a {
                            & > span {
                                & {
                                    font-size: #{$font-size + 2};
                                }
                            }
                        }
                    }

                    & > .menu {
                        & {
                            height: 45px;    
                        }

                        & > a.btn {
                            & {
                                width: 45px; height: auto;
                                position: relative;
                                padding: 0; margin: 0;
                            }

                            & > i {
                                & {
                                    position: absolute;
                                    left: 50%; top: 50%;
                                    font-size: #{$font-size};
                                    color: #fff;
                                    @include transform(translate(-50%, -50%));
                                }
                            }

                            &.profile {
                                & > div {
                                    & {
                                        width: 100%; height: 100%;
                                        position: absolute;
                                        left: 50%; top: 50%;
                                        padding: 10px;
                                        @include transform(translate(-50%, -50%));
                                    }

                                    & > div {
                                        & {
                                            position: relative;
                                            width: 100%; height: auto;
                                            border: 1px solid #ddd;
                                            border-radius: 50%;
                                            background-color: #fff;
                                            overflow: hidden;
                                        }

                                        &:after {
                                            content: " ";
                                            display: block;
                                            padding-bottom: 100%;
                                        }
                                    }
                                }
                            }
                        }

                        & > a.ham {
                            & {
                                width: 45px;
                            }

                            & > i {
                                & {
                                    font-size: #{$font-size + 4};
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
