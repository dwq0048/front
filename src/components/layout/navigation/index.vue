<template>
    <div id="side" v-bind:class="{ active : GET_NAVIGATION, close : TO_CLOSE }">
        <div class="close" title="닫기" v-on:click="Navigation(false)"></div>
        <div class="contents" ref="side">
            <div class="banner">
                <button v-on:clikc="Navigation(false)">
                    <i><font-awesome-icon :icon="faTimes" /></i>
                </button>
            </div>
            <ul>
                <nav-login v-if="!GET_LOGIN" />
                <nav-mypage v-if="GET_LOGIN" />
                <nav-menu />
            </ul>

            <div class="scrollBar" ref="scrollBar" :style="styleObject"></div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { mapActions, mapGetters } from 'vuex'

import NavLogin from './login'
import NavMyPage from './mypage'
import NavMenu from './menu'

const userStore = 'userStore'

export default {
    name: 'navigation',
    components: {
        'nav-login': NavLogin,
        'nav-mypage': NavMyPage,
        'nav-menu': NavMenu
    },
    data(){
        return {
            TO_CLOSE: false,
            styleObject: {},
            faTimes
        }
    },
    computed: {
        ...mapGetters(userStore, [
            'GET_LOGIN'
        ]),
        ...mapGetters([
            'GET_NAVIGATION'
        ])
    },
    methods: {
        ...mapActions([
            'ON_NAVIGATION'
        ]),
        Navigation(payload){
            if(!payload){
                this.TO_CLOSE = true;
                setTimeout(() => {
                    this.ON_NAVIGATION(false);
                    this.TO_CLOSE = false;
                },300)
            }else {
                this.ON_NAVIGATION(true);
            }
        },
    },
    mounted() {
        const Content = this.$refs.side;
        const ContentHeight = Content.scrollHeight;
        const ContentOffset = Content.offsetHeight;

        const Bar = this.$refs.scrollBar; 
        const BarHeight = (ContentOffset / ContentHeight * 100);//Bar.offsetHeight;
        Bar.style.height = `${BarHeight}%`;

        const ScrollPosition = 100 - BarHeight;

		Content.addEventListener('scroll', (data) => {
            const scroll = (Content.scrollTop) / (ContentHeight - ContentOffset) * ScrollPosition;
            Bar.style.top = `${scroll}%`;
		});
    }
}
</script>

<style scoped lang="scss">

    #side {
        & {
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.7);
            z-index: 10000;
            cursor: pointer;
            display:none;
        }

        & > .close {
            position: absolute;
            width: 100%;
            height: 100%;
        }

        & > .contents {
            & {
                width: 350px;
                height: 100%;
                position: fixed;
                right: -350px;
                top: 0;
                background-color: $bg-black-light;
                cursor: default;
                border-left: 2px solid $bg-blue;
                overflow-y: scroll;
                -ms-overflow-style: none;
            }

            &::-webkit-scrollbar {
                display:none;
            }

            & > div.scrollBar {
                & {
                    position:fixed;
                    right: 0px;
                    top: 0%;
                    width: 3px;
                    height: 100%;
                    background-color: #ee8243;
                    @include transition(.2s all);
                    z-index: 10;
                }
            }

            & > .banner {
                & {
                    width: 100%;
                    height: 50px;
                    background-color: $bg-blue;
                }

                & > button {
                    & {
                        float: right;
                        display:block;
                        width: 50px;
                        height: 50px;
                        background: none;
                        border: none;
                        outline: none;
                        cursor: pointer;
                        padding: 0;
                        position: relative;
                        @include transform(rotate(0deg));
                        @include transition(.2s all);
                    }

                    & > i {
                        font-size: 26px;
                        color: #fff;
                        left: 50%; top: 50%;
                        position:absolute;
                        @include transform(translate(-50%, -50%) rotate(0deg));
                    }

                    &:hover > i {
                        @include transform(translate(-50%, -50%) rotate(360deg));
                        @include transition(.2s all);
                    }
                }
            }

            & > ul {
                & {
                    font-size: 0;
                    text-decoration: none;
                }

                & > li {
                    & {
                        width: 100%;
                        height: auto;
                    }

                    & > .menu {
                        & {
                            display: table;
                            width: 100%;
                            height: 55px;
                            border-bottom: 2px solid $bg-blue-bold;
                            background-color: $bg-blue;
                            display: table;
                        }

                        & > div {
                            & {
                                width: 100%;
                                color: #fff;
                                display: table-cell;
                                font-size: #{$font-size + 2};
                                padding-left: 15px;
                                vertical-align: middle;
                                letter-spacing: 5px;
                                cursor: pointer;
                            }

                            & > span {
                                & > div {
                                    & {
                                        position: relative;
                                        content: " ";
                                        display: inline-block;
                                        width:15px;
                                        height:15px;
                                        margin-right: 10px;
                                        @include transform(rotate(90deg));
                                    }

                                    &:after{
                                        content: " ";
                                        display: block;
                                        width: 15px;
                                        height: 2px;
                                        background-color: #fff;
                                        @include transform(rotate(45deg));
                                        position: absolute;
                                    }

                                    &:before{
                                        content: " ";
                                        display: block;
                                        width: 15px;
                                        height: 2px;
                                        background-color: #fff;
                                        @include transform(rotate(-45deg));
                                        position: absolute;
                                        top: 10px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        &.active {
            & {
                display: block;
                animation-duration: .3s;
                animation-direction: normal;
                animation-name: slide-background;
                @keyframes slide-background {
                    from {
                        background-color: rgba(0, 0, 0, 0);
                    }

                    to {
                        background-color: rgba(0, 0, 0, 0.7);
                    }
                }
                background-color: rgba(0, 0, 0, 0.7);
            }

            & > .contents {
                & {
                    animation-duration: .3s;
                    animation-direction: normal;
                    animation-name: slide-contents;
                    @keyframes slide-contents {
                        from {
                            right: -350px;
                        }

                        to {
                            right: 0px;
                        }
                    }
                    right: 0px;
                }
            }
        }

        &.active.close {
            & {
                animation-duration: .3s;
                animation-direction: normal;
                animation-name: slide-background-close;
                @keyframes slide-background-close {
                    from {
                        background-color: rgba(0, 0, 0, 0.7);
                    }

                    to {
                        background-color: rgba(0, 0, 0, 0);
                    }
                }
                background-color: rgba(0, 0, 0, 0);
            }

            & > .contents {
                & {
                    animation-duration: .3s;
                    animation-direction: normal;
                    animation-name: slide-contents-close;
                    @keyframes slide-contents-close {
                        from {
                            right: 0px;
                        }

                        to {
                            right: -350px;
                        }
                    }
                    right: -350px;
                }
            }
        }
    }

</style>
