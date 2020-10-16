<template>
    <li>
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
                                <span class="cog" title="설정">
                                    <i><font-awesome-icon :icon="faCog" /></i>
                                    <span>설정</span>
                                </span>
                            </p>
                        </div>
                        <div class="button">
                            <button type="button" class="page" v-on:click="Mypage">라이브러리 / Vrchat API</button>

                            <button type="button" v-on:click="LOGOUT">로그아웃</button>
                        </div>
                    </div>

                    <div>

                    </div>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBell, faHeart, faCog } from '@fortawesome/free-solid-svg-icons'

const userStore = 'userStore';

export default {
    name: 'navMyPage',
    data(){
        return {
            faBell, faHeart, faCog
        }
    },
    methods: {
        ...mapActions(userStore, [
            'USER_LOGOUT'
        ]),
        LOGOUT() {
            this.USER_LOGOUT();
        },
        Mypage() {
            this.$router.push({ path : '/auth' });
        }
    }

}
</script>

<style lang="scss" scoped>
    .mypage {

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
</style>