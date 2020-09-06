<template>
    <div class="board">
        <layout-navigation />
        <layout-header />

        <div class="alert">
            <div class="background" title="닫기"></div>
            <div class="window">
                <div>
                    <div class="title">
                        <button type="button" title="닫기">
                            <i><font-awesome-icon :icon="faTimes" /></i>
                        </button>
                    </div>
                    <div class="text">

                    </div>
                </div>
            </div>
        </div>

        <div class="title"></div>
        <div class="contents">
            <div class="nav">
                <menu-skin />
            </div>
            <div class="board">
                <widget-skin :info="info" />
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import Header from '@/components/layout/header'
import Navigation from '@/components/layout/navigation'

import MenuSkin from '@/components/board/menu_skin/sidePack01'
import WidgetSkin from '@/components/board/main_skin/defaultPack01/edit'

import { config } from './config'

export default {
        name: 'BoardNoticeEdit',
        props: ['option'],
        components: {
            'layout-header': Header,
            'layout-navigation': Navigation,
            'menu-skin' : MenuSkin,
            'widget-skin' : WidgetSkin
        },
        data(){
            return {
                info: config,

                faTimes
            }
        }
}
</script>

<style lang="scss" scoped>
    @import './style.scss';

    .alert {
        & {
            position: fixed;
            left: 0; top: 0;
            width: 100%; height: 100%;
            z-index: 100;
            display: none;
        }

        & > .background {
            & {
                position: absolute;
                left: 0; top: 0;
                width: 100%; height: 100%;
                background-color: rgba(0,0,0,0.5);
                cursor: pointer;
            }
        }

        & > .window {
            & {
                position: absolute;
                left: 50%; top: 50%;
                width: 100%; height: auto;
                max-width: 500px;
                background-color: #fff;
                border-radius: 5px;
                overflow: hidden;
                @include transform(translate(-50%, -50%));
            }

            & > div {
                & > .title {
                    & {
                        width: 100%; height: 40px;
                        background-color: #f1f1f1;
                        border-bottom: 1px solid #ddd;
                        text-align: right;
                        font-size: 0;
                    }

                    & > button {
                        & {
                            display: inline-block;
                            width: 39px; height: 39px;
                            position: relative;
                            border: 0; background: none;
                            margin: 0; padding: 0;
                            border-left: 1px solid #ddd;
                            background-color: #fff;
                            cursor: pointer;
                        }

                        & > i {
                            & {
                                position: absolute;
                                left: 50%; top: 50%;
                                font-size: #{$font-size + 2};
                                color: #999;
                                @include transform(translate(-50%, -50%));
                            }
                        }
                    }
                }

                & > .text {
                    & {
                        padding: 15px;
                    }
                }
            }
        }
    }

</style>
