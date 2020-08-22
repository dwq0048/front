<template>
    <div class="board">
        <layout-navigation />
        <layout-header />

        <div class="contents" v-bind:class="{ active : side }">
            <div class="photo">
                <widget-skin :info="info" @childs-event="parentsMethod"/>
            </div>
            <div class="comet" ref="comet">
                <comment :info="info"/>
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
        'widget-skin' : WidgetSkin,
    },
    data(){
        return {
            info: config,
            side: false,
            left: ''
        }
    },
    methods: {
        parentsMethod(data){
            this.side = data;
            const el = this.$refs.comet
            const left = el.getBoundingClientRect().left;
            if(this.side){
                el.querySelector('.comment').style.left = `${left}px`;
            }else {
                el.querySelector('.comment').style.left = '';
            }
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
            margin: 0;
            margin-top: 70px;
        }

        .photo {
            & {
                width: 1200px;
                height: auto;
                padding: 0 30px;
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
                font-size: #{$font-size};
                vertical-align: top;
                text-align: left;
            }
        }

        &.active {
            & > .comet {
                & > div {
                    position: fixed;
                    top: 0; left: 0;
                    width: 400px;
                }
            }
        }

    }

    .widget {
        & {
            width: 1300px;
            margin: 0 auto;
        }

        & > div {
            width: 800px;
            position: relative;
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

            &.active {
                & > .comet {
                    & > div {
                        position: relative;
                    }
                }
            }
        }
    }
</style>
