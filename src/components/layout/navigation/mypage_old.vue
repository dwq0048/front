<template>
    <li v-if="!is_mobile()"> <!-- PC -->
        <div class="view">
            <div>
                <div class="mypage">
                    <div class="profile">
                        <div class="image">
                            <div></div>
                        </div>

                        <div class="intro">
                            <p class="nickname"> 하하</p>
                            <p class="setting">
                                <span class="bell" >
                                    <i><font-awesome-icon :icon="faBell" /></i>
                                    <span>알림</span>
                                </span>
                                <span class="wish" title="좋아요">
                                    <i><font-awesome-icon :icon="faHeart" /></i>
                                    <span>좋아요</span>
                                </span>
                                <span class="cog" title="설정" @click="goRouter('/auth/setting')">
                                    <i><font-awesome-icon :icon="faCog" /></i>
                                    <span>설정</span>
                                </span>
                            </p>
                        </div>
                        <div class="button">
                            <button type="button" class="page" @click="goRouter('/auth')">라이브러리 / Vrchat API</button>

                            <button type="button" v-on:click="LOGOUT">로그아웃</button>
                        </div>
                    </div>

                    <div>

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
                                    <div class="image">
                                        <div>
                                            <div></div>
                                        </div>
                                    </div>
                                    <div class="name">
                                        <p>하하</p>
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
                                    <i><font-awesome-icon :icon="faVrCardboard" /></i>
                                    <span>VR</span>
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
import { faBell, faHeart, faCog, faVrCardboard, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { IS_MOBILE } from '@/store/helper/'

const userStore = 'userStore';

export default {
    name: 'navMyPage',
    data(){
        return {
            faBell, faHeart, faCog, faVrCardboard, faSignOutAlt
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

                    & > .image {
                        & {
                            width: 20%;
                            height: auto;
                            display: inline-block;
                        }

                        & > div {
                            position: relative;
                            background-color: #c4c4c4;
                            border: 2px solid $bg-orange;
                            padding-top: 100%;
                            overflow: hidden;
                        }
                    }

                    & > .intro {
                        & {
                            width: 80%;
                            height: auto;
                            display: inline-block;
                            vertical-align: bottom;
                            padding-left: 20px;
                        }

                        & > p {
                            font-size: #{$font-size};
                            color: #fff;
                            margin-bottom: 5px;
                        }

                        & > p.nickname {
                            font-size: #{$font-size + 4};
                            font-weight: bold;
                        }

                        & > p.setting {
                            & > span {
                                & {
                                    margin-right: 15px;
                                    cursor: pointer;
                                    position: relative;
                                    @include transform(scale(1));
                                    @include transition(.2s all);
                                    display: inline-block;
                                }

                                & > span {
                                    font-size: #{$font-size - 2};
                                    padding-left: 5px;
                                    vertical-align: middle;
                                    display: inline-block;
                                }

                                & > i {
                                    display: inline-block;
                                    vertical-align: middle;
                                }
                            }

                            & > span:hover {
                                & {
                                    @include transform(scale(1.1));
                                    @include transition(.2s all);
                                }
                            }
                        }
                    }

                    & > .button {
                        & {
                            margin-top: 20px;
                        }

                        & > button {
                            & {
                                width: 100%;
                                font-size: #{$font-size - 2};
                                text-align: center;
                                margin: 0;
                                padding: 10px;
                                display: block;
                                border:none;
                                background: none;
                                outline: none;
                                cursor: pointer;
                                background-color: #555;
                                color: #f1f1f1;
                                text-decoration: none;
                                outline: none;
                                letter-spacing: 3px;
                                font-weight: bold;
                                @include transition(.2s all);
                            }

                            &.page {
                                & {
                                    background-color: $bg-orange;
                                    margin-bottom: 10px;
                                }
                            }
                        }

                        & > a:hover {
                            background-color: #515151;
                            @include transition(.2s all);
                        }
                    }
                }
            }
        }

        &.mobile {
            & > div {
                & > .mypage {
                    & > .profile {
                        & > .user {
                            & {
                                display: table;
                                width: 100%; height: auto;
                            }

                            & > .description {
                                & {
                                    display: table-cell;
                                    vertical-align: middle;
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
                                                    border-radius: 50%;
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

                                        & > p {
                                            & {
                                                font-size: #{$font-size + 2};
                                                font-weight: bold;
                                                color: #fff;
                                                line-height: 1;
                                                padding: 0; margin: 0;
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
                                        display: inline-block;
                                        border: 0; background: none;
                                        padding: 0; margin: 0;
                                        outline: none; cursor: pointer;
                                        padding: 5px;
                                    }

                                    & > i {
                                        & {
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
                                width: 100%;
                                padding: 0;
                            }

                            & > p {
                                & {
                                    text-align: center;
                                    font-size: 0;
                                }

                                & > span {
                                    & {
                                        display: inline-block;
                                        width: 25%;
                                        margin: 0; padding: 0;
                                    }

                                    & > i {
                                        & {
                                            font-size: #{$font-size};
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