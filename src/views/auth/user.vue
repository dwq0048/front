<template>
    <div class="user">
        <default-side />
		<default-header />

        <div class="wrap">
            <div class="contents">
                <div class="top">

                </div>
                <div class="wrap" v-if="this.$route.name == 'Auth'">
                    있당
                </div>
                <div class="wrpa" v-else>
                    <router-view></router-view>
                </div>
            </div>
            <div class="navigation">
                <div>
                    <div class="nav">
                        <ul>
                            <li>
                                <router-link to="/auth" title="Dashboard">
                                    <i><font-awesome-icon :icon="faHome" /></i>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/auth" title="Vrchat Api">
                                    <i><font-awesome-icon :icon="faVrCardboard" /></i>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/auth" title="내 게시글">
                                    <i><font-awesome-icon :icon="faUser" /></i>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/auth/setting" title="프로필 설정">
                                    <i><font-awesome-icon :icon="faUserCog" /></i>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="setting">
                        <ul>
                            <li>
                                <router-link to="#" title="로그아웃">
                                    <i><font-awesome-icon :icon="faSignOutAlt" /></i>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <default-footer />
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faVrCardboard, faUserCog, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import Header from '@/components/layout/header'
import Side from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'

export default {
    name: 'User',
	components: {
        'default-header': Header,
        'default-side': Side,
        'default-footer': Footer,
    },
    data(){
        return {
            faHome, faVrCardboard, faUserCog, faUser, faSignOutAlt
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
                        left: 0; top: 0; right: 0; bottom: 0;
                        background-color: #555;
                        border-radius: 10px;
                        margin-left: -20px;
                    }

                    & > div.nav {
                        & {
                            display: block;
                            width: 100%; height: auto;
                            padding-left: 20px;
                        }

                        & > ul {
                            & {
                                width: 100%; height: auto;
                                display: block;
                                font-size: 0;
                                list-style: none;
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
                                        text-decoration: none;
                                    }

                                    &:after {
                                        & {
                                            content: " ";
                                            display: block;
                                            width: 100%;
                                            padding-bottom: 100%;
                                        }
                                    }

                                    & > i {
                                        & {
                                            display: block;
                                            position: absolute;
                                            font-size: #{$font-size + 4};
                                            color: #fff;
                                            left: 50%; top: 50%;
                                            @include transform(translate(-50%, -50%));
                                        }
                                    }
                                }
                            }
                        }
                    }

                    & > div.setting {
                        & {
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
