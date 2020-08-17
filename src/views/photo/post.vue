<template>
    <div class="board">
        <layout-navigation />
        <layout-header />

        <div class="title"></div>
        <div class="contents">
            <div class="photo">
                <widget-skin :info="info" />
            </div>
            <div class="comet">
                <comment />
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/layout/header'
import Navigation from '@/components/layout/navigation'

import Comment from '@/components/board/comment_skin/chatPack02'
import WidgetSkin from '@/components/board/main_skin/photoPack01/post'

import { config } from './config'

export default {
        name: 'boardNoticePost',
        props: ['option'],
        components: {
            'layout-header': Header,
            'layout-navigation': Navigation,
            'comment' : Comment,
            'widget-skin' : WidgetSkin
        },
        data(){
            return {
                info: config
            }
        }
}

</script>

<style lang="scss" scoped>
    @import '../Notice/style.scss';

    .contents {
        & {
            position: relative;
            width: auto;
            max-width: 100%;
            font-size: 0;
            vertical-align: top;
            text-align: center;
        }

        .photo {
            & {
                width: 1200px;
                height: auto;
                padding: 80px 30px 10px 30px;
                display: inline-block;
                font-size: #{$font-size};
                vertical-align: top;
                text-align: left;
            }
        }

        .comet {
            & {
                display: inline-block;
                width: 400px;
                height: calc(100vh - 250px);
                margin-top: 80px;
                background-color: #f1f1f1;
                font-size: #{$font-size};
                vertical-align: top;
                text-align: left;
                @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
            }
        }

    }

    @media (max-width: 1650px) {
        .contents {
            & > .photo {
                & {
                    width: 900px;
                }
            }
        }
    }

    @media (max-width: 1330px) {
        .contents {
            & {
                padding: 0 15px;
            }

            & > .photo {
                & {
                    width: 100%;
                    max-width: 1024px;
                    display: block;
                    margin: 0 auto;
                    padding: 0;
                }
            }

            & > .comet {
                & {
                    width: 100%;
                    max-width: 1024px;
                    display: block;
                    margin: 0 auto;
                    padding-top: 15px;
                }
            }
        }
    }
</style>
