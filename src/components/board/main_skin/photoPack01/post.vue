<template>
    <div class="default">
        <div class="contents" ref="content">
            <div class="info">
                <div class="profile">
                    <div class="image">
                        <div></div>
                    </div>
                    <div class="name">
                        <p>안녕하세요</p>
                    </div>
                </div>
                <div class="status">
                    <span>{{ post.state.displayDate }}</span>
                </div>
            </div>
            <div class="post">
                <div class="view">
                    <div ref="ImgPost">
                        <img :src="`http://127.0.0.1:3000/images/${post.images[CurImg]}`" alt="">
                    </div>
                </div>
                <div class="arrow">
                    <button type="button">
                        <i><font-awesome-icon :icon="faChevronLeft" /></i>
                    </button>
                    <button type="button">
                        <i><font-awesome-icon :icon="faChevronRight" /></i>
                    </button>
                </div>
                <div class="slide">
                    <ul>
                        <li v-for="(item, i) in post.images" :key="i">
                            <div :class="{ active : (CurImg == i) }">
                                <img :src="`http://127.0.0.1:3000/images/${item}`" alt="">
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="setting">
                <div class="default_btn">
                    <button type="button">공유하기</button>
                    <button type="button">신고</button>
                </div>
            </div>
        </div>

        <div class="other">
            <div class="list">
                <div>
                    <h1>작성자의 게시글</h1>
                </div>
                <ul>
                    <li>
                        <div></div>
                    </li>
                    <li>
                        <div></div>
                    </li>
                    <li>
                        <div></div>
                    </li>
                    <li>
                        <div></div>
                    </li>
                    <li>
                        <div></div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="good">
            <div class="users">
                <h1>추천 게시글</h1>
            </div>
            <div class="widget">
                <widget-grid :grid="grid"/>
            </div>
        </div>
    </div>
</template>

<script>
import Grid from '@/components/widget/main/grid-post'

import { mapActions, mapGetters } from 'vuex'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import { SET_TIME } from '@/store/helper'
import { SET_BOARD } from '@/store/helper'

const postStore = 'postStore'

export default {
    name: 'DefaultPhoto',
    props: ['info'],
    data() {
        return {
            id: this.$route.params.id,
            board: this.info.board,
            post: {
                title: '',
                board: '',
                post: '',
                user: {
                    name: '',
                    nickname: '',
                    userKey: '',
                    userid: '',
                },
                state: {
                    date: '',
                    date_fix: '',
                    displayDate: '',
                },
                type: {
                    password: '',
                    skin: '',
                    state: '',
                },
                files: [],
                images: [],
            },

            faChevronLeft,
            faChevronRight,

            side: false,
            CurImg: 0,
            grid: {
                width: 800,
                max: 1650,
                min: 1330,
                img: 'auto'
            }
        }
    },
    components: {
        'widget-grid': Grid,
    },
    methods : {
        ...mapActions(postStore, [
            'POST_VIEW'
        ]),
    },
    created: function(){
        const data = {
            id: this.id,
            board: this.info.board
        }

        this.POST_VIEW(data).then((req) => {
            this.post = req;
            const radio = (this.post.ImageMeta[0].meta.height / this.post.ImageMeta[0].meta.width) * 100;
            this.$refs.ImgPost.style.paddingBottom = `${radio}%`;
        }).catch((err) => {
            console.log(err)
        })
    },
    mounted() {
        const cont = this.$refs.content;
        window.addEventListener('scroll', (data) => {
            //console.log(window.scrollY);
            const el = cont.getBoundingClientRect();
            const top = el.top;
            const left = el.left;
            if(top <= 0){
                this.side = true;
            }else{
                this.side = false;
            }
            this.$emit('childs-event', this.side)
		});
    }
}
</script>

<style lang="scss" scoped>
    .default {
        & {
            width: 100%;
            height: auto;
        }

        & > .contents {
            & {
                background-color: #fff;
                @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
            }
            
            & > .info {
                & {
                    border-bottom: 1px solid #ddd;
                    padding: 15px;
                    position: relative;
                }                

                & > div.profile {

                    & > .image {
                        & {
                            width: 35px;
                            height: auto;
                            background-color: #999;
                            border-radius: 50%;
                            border: 1px solid #ccc;
                            display: inline-block;
                            vertical-align: middle;
                        }

                        &::after {
                            & {
                                content: " ";
                                display: block;
                                padding-bottom: 100%;
                            }
                        }
                    }

                    & > .name {
                        & {
                            display: inline-block;
                            vertical-align: middle;
                        }

                        & > p {
                            display: inline-block;
                            vertical-align: middle;
                            font-size: #{$font-size};
                            color: $font-color;
                            font-weight: bold;
                            line-height: 35px;
                            padding-left: 10px;
                        }
                    }
                }

                & > div.status {

                    & {
                        position: absolute;
                        right: 0; top: 50%;
                        @include transform(translateY(-50%));
                    }

                    & > span {
                        font-size: #{$font-size - 1};
                        color: #858585;
                        display: inline-block;
                        padding-right: 15px;
                    }
                    
                }
            }

            & > .post {
                & {
                    position: relative;
                }

                & > .view {
                    & {
                        width: 100%;
                        height: auto;
                        background-color: #ccc;
                        cursor: w-resize;
                        cursor: grab;
                        position: relative;
                    }

                    & > div {
                        & {
                            width: 100%;
                            height: auto;
                            overflow: hidden;
                        }

                        & > img {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            left: 0; top: 0;
                        }
                    }
                }

                & > .arrow {
                    & {
                        width: 100%;
                        height: 100%;
                        opacity: 1;
                        @include transition(.2s all);
                    }

                    & > button {
                        & {
                            display: block;
                            background: none;
                            border: none;
                            cursor: pointer;
                            outline: none;
                            position: absolute;
                            top: 50%;
                            @include transform(translateY(-50%));
                            font-size: #{$font-size + 30};
                            color: rgba(255,255,255,0.5);
                            height: 100%;
                            z-index: 1;
                            padding: 0 10px;
                        }

                        &:nth-child(1){
                            left: 0;
                        }

                        &:nth-child(2){
                            right: 0;
                        }
                    }
                }

                & > .slide {
                    & {
                        width: 100%;
                        height: auto;
                        position: absolute;
                        left: 0; bottom: 0;
                        opacity: 1;
                        background-color: rgba(0,0,0,0.5);
                        @include transition(.2s all);
                        cursor: w-resize;
                        cursor: grab;
                        z-index: 2;
                    }

                    & > ul {
                        & {
                            width: 100%;
                            height: auto;
                            font-size: 0;
                            padding: 20px 15px;
                            white-space: nowrap;
                            overflow: hidden;
                        }

                        & > li {
                            & {
                                display: inline-block;
                                width: 10%;
                                height: auto;
                                padding-right: 15px;
                                cursor: pointer;
                            }

                            & > div {
                                & {
                                    width: 100%;
                                    height: auto;
                                    background-color: #555;
                                    position: relative;
                                    border: 1px solid #555;
                                    border-radius: 3px;
                                    overflow: hidden;
                                }

                                &:after {
                                    content: " ";
                                    display: block;
                                    padding-bottom: 100%;
                                }

                                & > img {
                                    & {
                                        width: 100%;
                                        height: 100%;
                                        position: absolute;
                                        left: 0; top: 0;
                                        object-fit: cover;
                                    }
                                }

                                &.active {
                                    & {
                                        border: 1px solid $bg-orange;
                                    }
                                }
                            }
                        }
                    }
                }

                &:hover {
                    & > .slide {
                        & {
                            opacity: 0;
                            @include transition(.2s all);
                        }
                    }

                    & > .arrow {
                        & {
                            opacity: 0;
                            @include transition(.2s all);
                        }
                    }
                }

                & > .slide:hover {
                    & {
                        opacity: 1;
                        @include transition(.2s all);
                    }
                }

                & > .arrow:hover {
                    & {
                        opacity: 1;
                        @include transition(.2s all);
                    }
                }                
            }

            & > .setting {
                & {
                    background-color: #f9f9f9;
                    border-top: 1px solid #ddd;
                    padding: 15px 15px;
                    text-align: right;
                }

                & > .default_btn {
                    & {
                        display: inline-block;
                    }

                    & > button {
                        & {
                            display: inline-block;
                            font-size: #{$font-size - 2};
                            color: #999;
                            margin-left: 15px;
                            padding: 0 15px;
                            border:none;
                            background: none;
                            cursor: pointer;
                        }
                    }
                }
            }

            &.active {
                & > .comet {
                    & {
                        position: fixed;
                        top: 0;
                        right: 0;
                    }
                }
            }
        }

        & > .other {
            & {
                width: 100%;
                height: auto;
                padding-top: 40px;
            }

            & > .list {
                & {
                    width: 100%;
                    height: auto;
                }

                & > div:nth-child(1) {
                    & {
                        display: block;
                    }

                    & > h1 {
                        & {
                            font-size: #{$font-size + 2};
                            color: $font-color;
                            font-weight: bold;
                            margin: 0;
                            padding: 0;
                        }
                    }
                }

                & > ul {
                    & {
                        width: 100%;
                        height: auto;
                        list-style: none;
                        font-size: 0;
                        white-space: nowrap;
                        padding-top: 15px;
                        margin-left: -15px;
                    }

                    & > li {
                        & {
                            width: 20%;
                            height: auto;
                            padding: 0 15px;
                            display: inline-block;
                        }
                        
                        & > div {
                            & {
                                width: 100%;
                                height: auto;
                                background-color: #333;
                                position: relative;
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

        & > .good {
            & {
                width: 100%;
                height: auto;
                margin-top: 40px;
            }

            & > .users {
                & {
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                & > h1 {
                    & {
                        font-size: #{$font-size + 2};
                        color: $font-color;
                        font-weight: bold;
                        margin: 0;
                        padding: 0;
                    }
                }
            }

            & > .widget {
                & {
                    padding-top: 15px;
                    margin-left: -15px;
                }
            }
        }
    }

    @media (max-width: 1650px) {
        .default {
            & > .contents {
                & > .post {
                    & > .slide {
                        & > ul {
                            & > li {
                                & {
                                    width: 15%;
                                }
                            }
                        }
                    }
                }
            }
        }
    }


    @media (max-width: 740px) {
        .default {
            & > .contents {
                & > .post {
                    & > .slide {
                        & > ul {
                            & > li {
                                & {
                                    width: 20%;
                                }
                            }
                        }
                    }
                }
            }

            & > .other {
                & > .list {
                    & > ul {
                        & > li {
                            & {
                                width: 25%;
                            }
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 520px) {
        .default {
            & > .other {
                & > .list {
                    & > ul {
                        & > li {
                            & {
                                width: 33.3333%;
                            }
                        }
                    }
                }
            }
        }
    }

</style>

<style lang="scss">
    .pee {
        & > .grid {
            margin: 0!important;
        }
    }
</style>