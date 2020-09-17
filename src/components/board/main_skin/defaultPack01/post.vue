<template>
    <div class="default">
        <div class="contents">
            <!-- Title Start -->
            <div class="nav">
                <div>
                    <button type="button" class="prev" title="목록으로">
                        <i><font-awesome-icon :icon="faList" /></i>
                        <span>목록으로</span>
                    </button>
                    <div class="arrow">
                        <button type="button" class="prev" title="이전 글">
                            <i><font-awesome-icon :icon="faCaretLeft" /></i>
                        </button>
                        <button type="button" class="next" title="다음 글">
                            <i><font-awesome-icon :icon="faCaretRight" /></i>
                        </button>
                    </div> 
                </div>
            </div>
            <!-- Title End -->
            <div class="info">
                <div class="title" v-if="post">
                    <h1>{{ post.title }}</h1>
                </div>
                <div class="display" v-if="post">
                    <div>
                        <span>{{ post.board.name }}</span>
                        <span>{{ post.state.displayDate }}</span>
                        <span>조회수 : 0</span>
                    </div>
                </div>
            </div>
            <div class="post" v-if="post">
                <div v-html="post.post" class="editor-post"></div>
            </div>

            <div class="card">
                <div>
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
                        <button type="button" title="좋아요">
                            <i><font-awesome-icon :icon="faHeartR" /></i>
                            <span>
                                <i><font-awesome-icon :icon="faPlus" /></i>
                                <span>0</span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="setting">
                <div class="default_btn">
                    <button type="button">공유하기</button>
                    <button type="button">신고</button>
                </div>
            </div>
        </div>

        <div class="comment">
            <comment :info="info"/>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart as faHeartR } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartS, faList, faCaretLeft, faCaretRight, faShareSquare, faPlus } from '@fortawesome/free-solid-svg-icons'

import { SET_TIME } from '@/store/helper'
import { SET_BOARD } from '@/store/helper'

import Comment from '@/components/board/comment_skin/chatPack01'

const postStore = 'postStore'

export default {
    name: 'DefaultMain',
    props: ['info'],
    data() {
        return {
            id: this.$route.params.id,
            board: this.info.board,
            post: false,

            faHeartR, faHeartS, faList, faCaretLeft,  faCaretRight, faShareSquare, faPlus
        }
    },
    components: {
        'comment' : Comment
    },
    methods : {
        ...mapActions(postStore, [
            'POST_VIEW'
        ]),
    },
    created(){
        const data = {
            index: this.id,
            board: this.board
        }

        this.POST_VIEW(data).then((req) => {
            this.post = req;

            console.log(this.post);
        }).catch((err) => {
            console.log(err)
        })
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

            & > .nav {
                & {
                    width: 100%;
                    height: 45px;
                    background-color: #fff;
                    border-bottom: 1px solid #ddd;
                }

                & > div {
                    & {
                        width: 100%;
                        height: 100%;
                        position: relative;
                    }

                    & > button {
                        & {
                            border: 0;
                            background: none;
                            outline: none;
                            font-size: #{$font-size};
                            padding:0; margin: 0;
                            color: #fff;
                            cursor: pointer;
                        }

                        & > i {
                            & {
                                display: inline-block;
                                font-size: #{$font-size - 2};
                                padding-left: 7px;
                            }
                        }

                        & > span {
                            & {
                                display: inline-block;
                                vertical-align: middle;
                                font-size: #{$font-size - 2};
                            }
                        }

                        &.prev {
                            & {
                                width: auto; height: 100%;
                                border-right: 1px solid #ddd;
                                background-color: #fff;
                                padding: 0 15px;
                            }

                            & > i {
                                & {
                                    font-size: #{font-size + 2};
                                    color: #555;
                                    padding-left: 0;
                                    display: inline-block;
                                    vertical-align: middle;
                                }
                            }

                            & > span {
                                & {
                                    padding-left: 15px;
                                    color: #555;
                                    display: inline-block;
                                    font-size: #{$font-size - 2};
                                    vertical-align: middle;
                                }
                            }
                        }
                    }

                    & > .arrow {
                        & {
                            position: absolute;
                            right: 0; top: 0;
                        }

                        & > button {
                            & {
                                display: inline-block;
                                width: 45px; height: auto;
                                border: 0; background: none;
                                margin: 0; padding: 0;
                                outline: none; cursor: pointer;
                                font-size: #{$font-size + 2};
                                color: #aaa;
                                position: relative;
                                border-left: 1px solid #ddd;
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
                                    left: 50%; top: 50%;
                                    @include transform(translate(-50%, -50%));
                                }
                            }
                        }
                    }
                }
            }
            
            & > .info {
                & > .title {
                    & {
                        padding: 30px 45px 15px 45px;
                    }

                    & > h1 {
                        font-size: #{$font-size + 10};
                    }
                }

                & > .display {
                    & {
                        display: inline-block;
                        text-align: left;
                        padding: 0px 45px 15px 45px;
                    }

                    & > div {
                        & {
                            font-size: 0;
                        }

                        & > span {
                            & {
                                display: inline-block;
                                font-size: #{$font-size - 2};
                                color: #bbb;
                                padding-right: 30px;
                            }

                            &:nth-last-child(1){
                                & {
                                    padding-right: 0;
                                }
                            }
                        }
                    }
                }
            }

            & > .post {
                & {
                    padding: 15px 45px;
                    min-height: 425px;
                }
            }

            & > .card {
                & {
                    width: 100%; height: auto;
                    position: relative;
                    padding: 30px;
                    border: 1px solid #f1f1f1;
                }

                & > div {
                    & > .profile {
                        & {
                            width: 70%; height: auto;
                            font-size: 0;
                            display: inline-block;
                            vertical-align: middle;
                        }

                        & > .image {
                            & {
                                width: 50px; height: auto;
                                display: table-cell;
                                vertical-align: middle;
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
                            display: inline-block;
                            text-align: right;
                            vertical-align: middle;
                        }

                        & > button{
                            & {
                                position: relative;
                                display: inline-block;
                                width: auto; height: auto;
                                border: 0; background: none;
                                margin: 0; padding: 0;
                                outline: none; cursor: pointer;
                                padding: 0 15px;
                            }

                            & > i {
                                & {
                                    left: 50%; top: 50%;
                                    font-size: #{$font-size + 12};
                                    color: #bbb;
                                    display: inline-block;
                                    vertical-align: middle;
                                }
                            }

                            & > span {
                                & {
                                    display: inline-block;
                                    vertical-align: middle;
                                }
                                & > i {
                                    & {
                                        font-size: #{$font-size - 2};
                                        color: #bbb;
                                        padding: 0 5px;
                                        vertical-align: middle;
                                    }
                                }
                                & > span {
                                    & {
                                        font-size: #{$font-size + 4};
                                        color: #bbb;
                                        font-weight: bold;
                                        vertical-align: middle;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            & > .setting {
                & {
                    background-color: #f9f9f9;
                    border-top: 1px solid #f1f1f1;
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
        }
    }
</style>

<style lang="scss">
    .editor-post {
        & > div {
            & {
                font-size: #{$font-size};
                color: $font-color;
                line-height: 1.7;
            }

            h1 {
                & {
                    font-size: #{$font-size + 12};
                    font-weight: normal;
                }
            }
            h2 {
                & {
                    font-size: #{$font-size + 10};
                    font-weight: normal;
                }
            }
            h3 {
                & {
                    font-size: #{$font-size + 8};
                    font-weight: normal;
                }
            }
            h4 {
                & {
                    font-size: #{$font-size + 6};
                    font-weight: normal;
                }
            }
            h5 {
                & {
                    font-size: #{$font-size + 4};
                    font-weight: normal;
                }
            }
            h6 {
                & {
                    font-size: #{$font-size + 2};
                    font-weight: normal;
                }
            }

            img {
                & {
                    width: 100%;
                }
            }

            ul {
                & {
                    list-style-position: inside;
                    padding-left: 5px;
                    margin: 15px 0;
                }

                & > li {
                    & > p {
                        display: inline-block;
                    }
                }
            }

            ol {
                & {
                    list-style-position: inside;
                    padding-left: 5px;
                    margin: 15px 0;
                }

                & > li {
                    & > p {
                        display: inline-block;
                    }
                }
            }

            blockquote {
                & {
                    background-color: #f1f1f1;
                    padding: 15px;
                    padding-left: 20px;
                    position: relative;
                    margin: 15px 0;
                }

                &:after {
                    content: " ";
                    display: block;
                    position: absolute;
                    width: 5px;
                    height: 100%;
                    left: 0;
                    top: 0;
                    background-color: #b9b9b9;
                }
            }

            hr {
                & {
                    border-top: 1px solid #ddd;
                    margin: 30px 0;
                }
            }
        }
    }
</style>
