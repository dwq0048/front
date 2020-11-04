<template>
    <ul :class="{ active : option }">
        <li>
            <router-link to="/auth" title="Dashboard">
                <div class="icon">
                    <i><font-awesome-icon :icon="faHome" /></i>
                </div>
                <div class="description">
                    <span>Dashboard</span>
                </div>
            </router-link>
        </li>
        <li>
            <router-link to="/auth" title="Vrchat Api">
                <div class="icon">
                    <i><font-awesome-icon :icon="faVrCardboard" /></i>
                </div>
                <div class="description">
                    <span>Vrchat Api</span>
                </div>
            </router-link>
        </li>
        <li>
            <router-link to="/auth" title="알림">
                <div class="icon">
                    <i><font-awesome-icon :icon="faBell" /></i>
                </div>
                <div class="description">
                    <span>알림</span>
                </div>
            </router-link>
        </li>
        <li>
            <router-link to="/auth/like" title="좋아요">
                <div class="icon">
                    <i><font-awesome-icon :icon="faHeart" /></i>
                </div>
                <div class="description">
                    <span>좋아요</span>
                </div>
            </router-link>
        </li>
        <li>
            <router-link to="/auth/post" title="내 게시글">
                <div class="icon">
                    <i><font-awesome-icon :icon="faUser" /></i>
                </div>
                <div class="description">
                    <span>내 게시글</span>
                </div>
            </router-link>
        </li>
        <li>
            <router-link to="/auth/setting" title="설정">
                <div class="icon">
                    <i><font-awesome-icon :icon="faUserCog" /></i>
                </div>
                <div class="description">
                    <span>설정</span>
                </div>
            </router-link>
        </li>
    </ul>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faVrCardboard, faUserCog, faUser, faHeart, faBell } from '@fortawesome/free-solid-svg-icons'

export default {
    name: 'AuthNavigation',
    props: [ 'info' ],
    data(){
        return {
            // Icon
            faHome, faVrCardboard, faUserCog, faUser, faHeart, faBell,

            option : false
        }
    },
    created(){
        this.option = (this.info) ? true : false;
    }
}
</script>

<style lang="scss" scoped>
    ul {
        & {
            position: relative;
            width: 100%; height: auto;
            display: block;
            font-size: 0;
            list-style: none;
            @include transition(.2s all)
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
                    text-decoration: none;
                    font-size: 0;
                    white-space: nowrap;
                }

                & > .icon {
                    & {
                        display: inline-block;
                        width: 80px; height: auto;
                        position: relative;
                        vertical-align: middle;
                    }

                    &:after {
                        content: " ";
                        display: block;
                        padding-bottom: 100%;
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

                & > .description {
                    & {
                        display: inline-block;
                        width: auto; height: auto;
                        vertical-align: middle;
                        visibility: hidden;
                        @include transition(.2s all);
                    }

                    & > span {
                        & {
                            display: block;
                            width: 0px;
                            overflow: hidden;
                            font-size: #{$font-size};
                            font-weight: bold;
                            color: #fff;
                            white-space: nowrap;
                            letter-spacing: 1px;
                            margin-left: -15px;
                        }
                    }
                }
            }
        }

        &.active{
            & {
                position: absolute;
                left: 0; top: 0;
                background-color: #fff;
                padding-left: 20px;
            }

            & > li {
                & > a {
                    & > .icon {
                        & > i {
                            & {
                                color: #555;
                            }
                        }
                    }

                    & > .description {
                        & > span {
                            & {
                                color: #555;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
