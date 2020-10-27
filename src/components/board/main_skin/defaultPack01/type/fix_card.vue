<template>
    <div class="card" ref="BottomMenu" :class="{ active : FixBot }">
        <div ref="BottomMenuSub">
            <div class="profile">
                <div class="image">
                    <div></div>
                </div>
                <div class="intro">
                    <div class="name">
                        이름
                    </div>
                    <div class="decoration">
                        프로필 설명이 없습니다.
                    </div>
                </div>
            </div>
            <div class="sim">
                <div>
                    <button type="button" class="love" title="좋아요" @click="LOVE_ME">
                        <div :class="{ active : Love }">
                            <i class="fill"><font-awesome-icon :icon="faHeartS" /></i>
                            <i class="empty"><font-awesome-icon :icon="faHeartR" /></i>
                            <div class="fly">
                                <i><font-awesome-icon :icon="faHeartS" /></i>
                                <i><font-awesome-icon :icon="faHeartS" /></i>
                                <i><font-awesome-icon :icon="faHeartS" /></i>
                            </div>
                        </div>
                        <span>
                            <i><font-awesome-icon :icon="faPlus" /></i>
                            <span :class="{ active : Love }">
                                <span class="current">{{ LoveCount }}</span>
                                <span class="fake">{{ LoveFake }}</span>
                            </span>
                        </span>
                    </button>
                    <button type="button" title="댓글" class="comment">
                        <div>
                            <i><font-awesome-icon :icon="faCommentDots" /></i>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import { SET_SCRIPT } from '@/store/helper/index'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart as faHeartS, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartR, faCommentDots } from '@fortawesome/free-regular-svg-icons'

export default {
    name : 'FixCard',
    data(){
        return {
            // Icon
            faHeartR, faHeartS, faPlus, faCommentDots,

            // Variable
            Love : false,
            LoveCount : 0,
            LoveFake : 0,

            FixBot : true
        }
    },
    methods : {
        LOVE_ME(){
            this.Love = (this.Love) ? false : true;
        }
    },
    created(){
        this.LoveFake = Number( this.LoveCount + 1 );
    },
    mounted(){
        SET_SCRIPT.optimizedResize();

        const Padding = () => {
            const _this = this;
            const BottomMenu = _this.$refs.BottomMenu;
            const BottomMenuSub = _this.$refs.BottomMenuSub;

            BottomMenu.style.paddingTop = `120px`;
        }

        const EventMenu = () => {
            const _this = this;
            const BottomMenu = _this.$refs.BottomMenu;
            const BottomMenuSub = _this.$refs.BottomMenuSub;
            const WinHeight = window.innerHeight;

            const BottomElement = BottomMenu.getBoundingClientRect();
            const BottomPosition = {
                bottom: WinHeight - BottomElement.bottom,
                left: BottomElement.left
            }

            if(BottomPosition.bottom < 0){
                this.FixBot = true;

                BottomMenuSub.style.width = `${BottomMenu.offsetWidth}px`;
                BottomMenuSub.style.left = `${BottomPosition.left}px`;
            }else{
                this.FixBot = false;

                BottomMenuSub.style.width = ``;
                BottomMenuSub.style.left = ``;
            }
        }

        Padding();
        EventMenu();
        
        window.addEventListener('scroll', (data) => {
            EventMenu();
        });

        window.addEventListener("optimizedResize", function() {
			EventMenu();
		});
    }
}
</script>

<style lang="scss" scoped>
    .card {
        & {
            width: 100%; height: auto;
            position: relative;
        }

        & > div {
            & {
                width: 100%; height: 120px;
                position: absolute;
                display: table;
                left: 0; bottom: 0;
                padding: 30px;
                background-color: #fff;
                border: 1px solid #f1f1f1;
                z-index: 100;
            }

            & > .profile {
                & {
                    width: 70%; height: auto;
                    font-size: 0;
                    display: table-cell;
                    vertical-align: middle;
                }

                & > .image {
                    & {
                        width: 50px; height: auto;
                        display: table-cell;
                        vertical-align: middle;
                        @include transition(.2s all);
                    }

                    & > div {
                        & {
                            width: 100%; height: auto;
                            border-radius: 50%;
                            background-color: #ccc;
                            overflow: hidden;
                        }

                        &:after {
                            content: " ";
                            display: block;
                            padding-bottom: 100%;
                        }
                    }
                }

                & > .intro {
                    & {
                        display: table-cell;
                        vertical-align: middle;
                        padding-left: 15px;
                    }

                    & > div {
                        & {
                            font-size: #{$font-size};
                            color: #aaa;
                        }

                        &.name {
                            & {
                                font-weight: bold;
                                display: block;
                            }
                        }

                        &.decoration {
                            & {
                                display: block;
                                padding-top: 3px;
                                font-size: #{$font-size - 2};
                            }
                        }
                    }
                }
            }

            & > .sim {
                & {
                    width: 30%; height: auto;
                    display: table-cell;
                    text-align: right;
                    vertical-align: middle;
                }

                & > div {
                    & {
                        display: table;
                        width: 100%; height: auto;
                    }

                    & > .love {
                        & {
                            position: relative;
                            display: table-cell;
                            vertical-align: middle;
                            width: auto; height: auto;
                            border: 0; background: none;
                            outline: none; cursor: pointer;
                            margin: 0; padding: 0;
                            padding: 0 15px;
                        }


                        & > div {
                            & {
                                display: inline-block;
                                position: relative;
                            }

                            & > i {
                                & {
                                    font-size: #{$font-size + 12};
                                    color: #bbb;
                                    display: inline-block;
                                    vertical-align: middle;
                                    @include transition(.2s all);
                                }

                                &.empty {
                                    & {
                                        opacity: 1;
                                    }
                                }

                                &.fill {
                                    & {
                                        opacity: 0;
                                        color: red;
                                        position: absolute;
                                        left: 50%; top: 50%;
                                        @include transform(translate(-50%, -50%));
                                    }
                                }
                            }

                            & > div {
                                & > i{
                                    & {
                                        visibility: hidden;
                                        position: absolute;
                                        color: red;
                                        @include transform(scale(1));
                                    }

                                    &:nth-child(1) {
                                        & {
                                            left: 5px; top: 0;
                                            font-size: #{$font-size};
                                        }
                                    }

                                    &:nth-child(2) {
                                        & {
                                            left: 5px; top: 5px;
                                            font-size: #{$font-size + 12};
                                        }
                                    }

                                    &:nth-child(3) {
                                        & {
                                            left: 0px; top: 0px;
                                            font-size: #{$font-size + 8};
                                        }
                                    }
                                }
                            }

                            &.active {
                                & {
                                    @include transition(.2s all);
                                }
                            
                                & > .empty {
                                    & {
                                        opacity: 0;
                                    }
                                }

                                & > .fill {
                                    & {
                                        opacity: 1;
                                    }
                                }

                                & > div {
                                    & > i {
                                        & {
                                            visibility: visible;
                                            @include transform(scale(0));
                                        }

                                        &:nth-child(1) {
                                            & {
                                                left: -10px; top: -30px;
                                                @include transition(.7s all);
                                            }
                                        }

                                        &:nth-child(2){
                                            & {
                                                left: -10px; top: -25px;
                                                @include transition(1s all);
                                            }
                                        }

                                        &:nth-child(3){
                                            & {
                                                left: -5px; top: -40px;
                                                @include transition(.8s all);
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        & > span {
                            & {
                                display: inline-block;
                                vertical-align: middle;
                                font-size: #{$font-size + 4};
                            }

                            & > i {
                                & {
                                    display: inline-block;
                                    vertical-align: middle;
                                    font-size: #{$font-size - 2};
                                    color: #bbb;
                                    padding: 0 5px;
                                }
                            }

                            & > span {
                                & {
                                    display: inline-block;
                                    vertical-align: middle;
                                    height: 1.5em;
                                    color: #bbb;
                                    font-weight: bold;
                                    overflow-y: hidden;
                                    line-height: 1.5em;
                                    font-size: #{$font-size + 4};
                                }

                                & > span {
                                    & {
                                        display: block;
                                        @include transition(.2s all);
                                    }
                                }

                                &.active {
                                    & > span {
                                        & {
                                            @include transition(.2s all);
                                        }

                                        &.current {
                                            margin-top: -1.5em;
                                        }

                                        &.fake {
                                            margin-top: 0em;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    & > .comment {
                        & {
                            display: table-cell;
                            vertical-align: middle;
                            border: 0; background: none;
                            outline: none; cursor: pointer;
                            padding: 0; margin: 0;
                        }

                        & > div {
                            & {
                                display: block;
                                position: relative;
                                width: 0px; height: auto;
                                overflow: hidden;
                                @include transition(.2s width);
                            }

                            & > i {
                                & {
                                    display: block;
                                    position: absolute;
                                    left: 50%; top: 50%;
                                    font-size: #{$font-size + 12};
                                    color: #bbb;
                                    line-height: 1.2;
                                    @include transform(translate(-50%, -50%));
                                }
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
        }

        &.active {
            & > div {
                & {
                    position: fixed;
                    left: 0; bottom: 0;
                    padding: 15px 30px;
                    height: auto;
                }

                & > .profile {
                    & > .image {
                        & {
                            width: 35px;
                            @include transition(.2s all);
                        }
                    }

                    & > .intro {
                        & > .decoration {
                            & {
                                display: none;
                            }
                        }
                    }
                }

                & > .sim {
                    & > div {
                        & > .love {
                            & > div {
                                & > i {
                                    & {
                                        font-size: #{$font-size + 6};
                                    }
                                }
                            }

                            & > span {
                                & > i{
                                    & {
                                        font-size: #{$font-size - 4};
                                    }
                                }

                                & > span {
                                    & {
                                        font-size: #{$font-size};
                                    }

                                    & > span {
                                        & {
                                            font-size: #{$font-size};
                                        }
                                    }
                                }
                            }
                        }

                        & > .comment {
                            & > div{
                                & {
                                    width: 32px;
                                    @include transition(.2s width);
                                }

                                & > i {
                                    & {
                                        font-size: #{$font-size + 6};
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
