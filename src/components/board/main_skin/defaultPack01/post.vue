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

                    <div class="title">
                        <h1 v-if="post">{{ post.title }}</h1>
                    </div>

                    <setting-pop />
                </div>
            </div>
            <!-- Title End -->
            <div class="info">
                <div class="title" v-if="post">
                    <h1>{{ post.title }}</h1>
                </div>
                <div class="display" v-if="post">
                    <div class="left">
                        <span>{{ post.board.name }}</span>
                        <span>{{ post.state.displayDate }}</span>
                        <span>{{ post.users.nickname }}</span>
                        <!--
                        -->
                    </div>
                    <div class="right">
                        <span>조회수 : {{ post.count }}</span>
                        <span>댓글수 : {{ 0 }}</span>
                        <span>좋아요 : {{ 0 }}</span>
                    </div>
                </div>
                <div class="line"><span></span></div>
            </div>
            <div class="post" v-if="post">
                <div v-html="post.post" class="editor-post"></div>
            </div>

            <!-- Card -->
            <fixed-card />
            <!-- Card End -->

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
import { faList, faCaretLeft, faCaretRight, faShareSquare, faPlus } from '@fortawesome/free-solid-svg-icons'

import { SET_TIME } from '@/store/helper'
import { SET_BOARD } from '@/store/helper'

import SettingPop from '@/components/board/variety/setting-edit'
import Comment from '@/components/board/comment_skin/chatPack01'
import FixedCard from './type/fix_card'

const postStore = 'postStore'

export default {
    name: 'DefaultMain',
    props: ['info'],
    data() {
        return {
            id: this.$route.params.id,
            board: this.info.board,
            post: false,

            faList, faCaretLeft, faCaretRight, faShareSquare, faPlus,
        }
    },
    components: {
        'comment' : Comment,
        'setting-pop' : SettingPop,
        'fixed-card' : FixedCard,
    },
    methods : {
        ...mapActions(postStore, [ 'POST_VIEW' ]),
    },
    created(){
        const data = {
            index: this.id,
            board: this.board
        }

        // 포스트 불러오기
        this.POST_VIEW(data).then((req) => {
            this.post = req;
        }).catch((err) => {
            console.log(err)
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

            & > .nav {
                & {
                    width: 100%;
                    height: 45px;
                    background-color: #fff;
                    border-bottom: 1px solid #ddd;
                }

                & > div {
                    & {
                        position: relative;
                        width: 100%; height: 100%;
                    }

                    & > .title {
                        & {
                            position: absolute;
                            display: table;
                            width: 100%; height: 100%;
                            left: 0; top: 0;
                            z-index: 1;
                        }

                        & > h1 {
                            & {
                                display: table-cell;
                                vertical-align: middle;
                                text-align: center;
                                font-size: #{$font-size - 2};
                                letter-spacing: 1.5px;
                                line-height: 1;
                                color: #555;
                            }
                        }
                    }

                    & > button {
                        & {
                            display: inline-block;
                            vertical-align: middle;
                            border: 0; background: none;
                            padding:0; margin: 0;
                            outline: none; cursor: pointer;
                            font-size: #{$font-size};
                            color: #fff;
                            z-index: 10;
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
                        display: table;
                        width: 100%; height: auto;
                        padding: 0px 45px 15px 45px;
                        text-align: right;
                    }

                    & > .left {
                        & {
                            display: table-cell;
                            vertical-align: middle;
                            font-size: 0;
                            text-align: left;
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

                    & > .right {
                        & {
                            display: table-cell;
                            vertical-align: middle;
                            font-size: 0;
                            text-align: right;
                        }

                        & > span {
                            & {
                                display: inline-block;
                                font-size: #{$font-size - 2};
                                color: #aaa;
                                padding-left: 30px;
                            }

                            &:nth-child(1){
                                & {
                                    padding-left: 0;
                                }
                            }
                        }
                    }
                }

                & > .line {
                    & {
                        width: 100%; height: 0;
                        padding: 10px 15px;
                    }

                    & > span {
                        & {
                            display: block;
                            width: 100%; height: 100%;
                            border-bottom: 1px solid #eee;
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
