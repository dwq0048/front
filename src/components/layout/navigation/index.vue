<template>
    <div id="side" v-bind:class="{ active : GET_NAVIGATION, close : TO_CLOSE }">
        <div class="close" title="닫기" v-on:click="Navigation(false)"></div>
        <div class="contents" ref="side">
            <ul>
                <nav-login />
                <nav-mypage />
                <nav-menu />
            </ul>

            <div class="scrollBar" ref="scrollBar" :style="styleObject"></div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import NavLogin from './login'
import NavMyPage from './mypage'
import NavMenu from './menu'

const userStore = 'userStore'
const helperStore = 'helperStore'

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
            styleObject: {}
        }
    },
    computed: {
        ...mapGetters(helperStore, [
            'GET_NAVIGATION'
        ])
    },
    methods: {
        ...mapActions(helperStore, [
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
    .form-input {
        & {
            width: 100%;
            height: 45px;
            border: 2px solid $bg-black-light;
            background-color: #fff;
        }

        & > input {
            width: 100%;
            height: 100%;
            padding:0 0 0 15px;
            font-size: $font-size;
            color: $font-color;
            border: none;
            background: none;
            outline: none;
        }

    }

    .form-submit {
        & {
            width: 100%;
            height: 50px;
            background-color: $bg-orange;
            border-radius: 5px;
            overflow: hidden;
            cursor: pointer;
            @include transition(all .2s);
        }

        &:hover {
            background-color: $bg-orange-bold;
            @include transition(all .2s);
        }

        & > button {
            & {
                width: 100%;
                height: 100%;
                background:none;
                border:none;
                color:#fff;
                letter-spacing: 2px;
                font-size: #{$font-size - 1};
                cursor: pointer;
                outline: none;
                @include box-sizing(border-box);
            }
        }

    }

    .form-checkbox {
        & {
            display: inline-block;
        }

        & > input {
            display: none;
        }

        & > input:checked + div {
            & > svg {
                display: block;
            }
        }

        & > div {
            & {
                width: 10px;
                height: 10px;
                background-color: #f1f1f1;
                border: 1px solid $bg-gray;
                border-radius: 2px;
                position: relative;
                cursor: pointer;
                @include transition(all .2s);
            }

            &:hover {
                background-color: $bg-light-bold;
                @include transition(all .2s);
            }

            &:active {
                background-color: $bg-gray;
                @include transition(all .2s);
            }

            & > svg {
                & {
                    display: none;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    @include transform(translate(-50%, -50%));
                    width:8px;
                    height:8px;
                }
            }
        }
    }

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
