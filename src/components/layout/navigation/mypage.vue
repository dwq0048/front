<template>
    <li v-if="!is_mobile()"> <!-- PC -->
        <div class="view">
            <div>
                <div class="mypage">
                    <div class="profile">
                        <div class="user">
                            <div class="description">
                                <div>
                                    <router-link :to="`/profile/${GET_USER.index}`" class="image">
                                        <div>
                                            <div></div>
                                        </div>
                                    </router-link>
                                    <div class="name">
                                        <router-link :to="`/profile/${GET_USER.index}`">하하</router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="logout">
                                <button type="button">
                                    <span>로그아웃</span>
                                    <i><font-awesome-icon :icon="faSignOutAlt" /></i>
                                </button>
                            </div>
                        </div>

                        <div class="intro">
                            <p class="setting">
                                <span class="bell" >
                                    <i><font-awesome-icon :icon="faBell" /></i>
                                    <span>알림</span>
                                </span>
                                <span class="wish" title="좋아요">
                                    <i><font-awesome-icon :icon="faHeart" /></i>
                                    <span>좋아요</span>
                                </span>
                                <span class="vr" title="vr">
                                    <i><font-awesome-icon :icon="faFlask" /></i>
                                    <span>기능</span>
                                </span>
                                <span class="cog" title="설정" @click="goRouter('/auth/setting')">
                                    <i><font-awesome-icon :icon="faCog" /></i>
                                    <span>설정</span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </li>

    <li v-else> <!-- MOBILE -->
        <div class="view mobile">
            <div>
                <div class="mypage">
                    <div class="profile">
                        <div class="user">
                            <div class="description">
                                <div>
                                    <router-link to="#" class="image">
                                        <div>
                                            <div></div>
                                        </div>
                                    </router-link>
                                    <div class="name">
                                        <router-link to="#">하하</router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="logout">
                                <button type="button">
                                    <i><font-awesome-icon :icon="faSignOutAlt" /></i>
                                </button>
                            </div>
                        </div>

                        <div class="intro">
                            <p class="setting">
                                <span class="bell" >
                                    <i><font-awesome-icon :icon="faBell" /></i>
                                    <span>알림</span>
                                </span>
                                <span class="wish" title="좋아요">
                                    <i><font-awesome-icon :icon="faHeart" /></i>
                                    <span>좋아요</span>
                                </span>
                                <span class="vr" title="vr">
                                    <i><font-awesome-icon :icon="faFlask" /></i>
                                    <span>기능</span>
                                </span>
                                <span class="cog" title="설정" @click="goRouter('/auth/setting')">
                                    <i><font-awesome-icon :icon="faCog" /></i>
                                    <span>설정</span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBell, faHeart, faCog, faFlask, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { IS_MOBILE } from '@/store/helper/'

const userStore = 'userStore';

export default {
    name: 'navMyPage',
    data(){
        return {
            faBell, faHeart, faCog, faFlask, faSignOutAlt
        }
    },
    methods: {
        ...mapActions(userStore, [
            'USER_LOGOUT'
        ]),
        is_mobile(){ return IS_MOBILE() },
        LOGOUT() {
            this.USER_LOGOUT();
        },
        goRouter(path) {
            this.$router.push({ path : path });
        }
    },
    computed: {
        ...mapGetters(userStore, [
            'GET_USER'
        ])
    },
    created(){
        console.log(this.GET_USER);
    }
}
</script>

<style lang="scss" scoped>
    .view {
        & > div {
            & > .mypage {
                & > .profile {
                    & {
                        width: 100%;
                        display: block;
                        padding: 15px 15px 0 15px;
                    }

                    & > .user {
                        & {
                            display: table;
                            width: 100%; height: auto;
                        }

                        & > .description {
                            & {
                                display: table-cell;
                                vertical-align: middle;
                                width: 100%; height: auto;
                            }

                            & > div {
                                & {
                                    display: table;
                                }

                                & > .image {
                                    & {
                                        position: relative;
                                        display: table-cell;
                                        vertical-align: middle;
                                        width: 50px; height: auto;
                                        text-decoration: none;
                                        outline: none; cursor: pointer;
                                    }

                                    &:after {
                                        content: " ";
                                        display: block;
                                        padding-bottom: 100%;
                                    }

                                    & > div {
                                        & {
                                            padding: 10px;
                                            position: absolute;
                                            left: 0; top: 0;
                                            width: 100%; height: 100%;
                                        }

                                        & > div {
                                            & {
                                                position: relative;
                                                width: 100%; height: 100%;
                                                border: 1px solid $bg-orange;
                                                background-color: #fff;
                                                border-radius: 5px;
                                                overflow: hidden;
                                            }
                                        }
                                    }
                                }

                                & > .name {
                                    & {
                                        display: table-cell;
                                        vertical-align: middle;
                                    }

                                    & > a {
                                        & {
                                            font-size: #{$font-size + 2};
                                            font-weight: bold;
                                            color: #fff;
                                            line-height: 1;
                                            padding: 0; margin: 0;
                                            text-decoration: none;
                                        }

                                        &:hover {
                                            & {
                                                text-decoration: underline;
                                            }
                                        }
                                    }
                                }

                            }
                        }

                        & > .logout {
                            & {
                                display: table-cell;
                                text-align: right;
                                vertical-align: middle;
                                padding-right: 10px;
                            }

                            & > button {
                                & {
                                    display: block;
                                    white-space: nowrap;
                                    border: 0; background: none;
                                    padding: 0; margin: 0;
                                    outline: none; cursor: pointer;
                                    padding: 5px;
                                }

                                & > span {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                        font-size: #{$font-size - 1};
                                        font-weight: bold;
                                        color: #fff;
                                        padding-right: 10px;
                                    }
                                }

                                & > i {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                        font-size: #{$font-size};
                                        color: #ddd;
                                        @include transition(.2s all);
                                    }
                                }

                                &:active {
                                    & > i {
                                        & {
                                            color: #fff;
                                            @include transition(.2s all);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    & > .intro {
                        & {
                            width: 100%; height: auto;
                            padding: 0; margin: 0;
                            padding-top: 10px;
                        }

                        & > p {
                            & {
                                text-align: center;
                                font-size: 0;
                            }

                            & > span {
                                & {
                                    display: inline-block;
                                    width: 25%; height: auto;
                                    margin: 0; padding: 0;
                                    line-height: 1;
                                    color: #fff;
                                    font-size: #{$font-size - 1};
                                }

                                & > i {
                                    & {
                                        font-size: #{$font-size};
                                        padding-right: 10px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        &.mobile {

        }
    }
</style>