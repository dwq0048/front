<template>
    <div class="board">
        <layout-navigation />
        <layout-header />

        <div class="contents" v-bind:class="{ active : side }">
            <div class="photo">
                <widget-skin :info="info" :post="post" @childs-event="parentsMethod" v-if="post"/>
            </div>
            <div class="comet" ref="comet">
                <comment :info="info" :post="post" v-if="post"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Header from '@/components/layout/header'
import Navigation from '@/components/layout/navigation'

import Comment from '@/components/board/comment_skin/chatPack02'
import WidgetSkin from '@/components/board/main_skin/photoPack01/post'

import { config } from './config'

const postStore = 'postStore'

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
            post: false,


            side: false,
            left: '',
        }
    },
    methods: {
        ...mapActions(postStore, [
            'POST_VIEW'
        ]),
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
    },
    created(){
        let info = this.info;
        info.index = this.$route.params.id;

        this.POST_VIEW(info).then((req) => {
            this.post = req;

        }).catch((err) => {
            console.log(err)
        })
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
                width: 850px;
                height: auto;
                display: inline-block;
                font-size: #{$font-size};
                vertical-align: top;
                text-align: left;
                padding-right: 30px;
            }
        }

        .comet {
            & {
                display: inline-block;
                width: 350px;
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
                    width: 350px;
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
