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
                <div class="title">
                    <h1>제목</h1>
                </div>
                <div class="display">
                    <div>
                        <span>게시판 이름</span>
                        <span>날짜</span>
                        <span>닉네임</span>
                    </div>
                    <div>
                        <span>좋아요</span>
                    </div>
                </div>
            </div>
            <div class="post">
                <!--
                <div v-html="post.post"></div>
                -->
                <div></div>
            </div>
            <div class="love">
                <button type="button">
                    <i><font-awesome-icon :icon="faHeartR" /></i>
                    <span>좋아요</span>
                </button>
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
import { faHeart as faHeartS, faList, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'

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
            post: {},

            faHeartR, faHeartS, faList, faCaretLeft,  faCaretRight
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
    created: function(){
        const data = {
            id: this.id,
            board: this.board
        }

        this.POST_VIEW(data).then((req) => {
            this.post = req
        }).catch((err) => {
            console.log(err)
        })
    },
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
                & {
                    border-bottom: 1px solid #ddd;
                }
                
                & > .title {
                    & {
                        padding: 20px 30px;
                    }

                    & > h1 {
                        font-size: #{$font-size + 10};
                    }
                }

                & > .display {
                    & {
                        padding: 0px 30px 15px 30px;
                    }

                    &:after {
                        content: " ";
                        display: block;
                        clear: both;
                    }

                    & > div {
                        & {
                            float: left;
                        }

                        & > span {
                            font-size: #{$font-size - 1};
                            color: #858585;
                            display: inline-block;
                            padding-right: 15px;
                        }
                        
                    }

                    & > div:nth-child(2){
                        & {
                            float: right;
                        }

                        & > span {
                            padding-right: 0;
                            padding-left: 15px;
                        }
                    }
                }
            }

            & > .post {
                & {
                    padding: 30px;
                    min-height: 425px;
                }
            }

            & > .love {
                & {
                    text-align: center;
                    padding: 0 0 30px 0;
                }

                & > button {
                    & {
                        display: inline-block;
                        background: none;
                        border: none;
                        vertical-align: middle;
                        cursor: pointer;
                        border: 1px solid #ccc;
                        border-radius: 10px;
                        padding: 0 20px;
                        margin: 0 15px;
                        outline: none;
                        @include transition(.2s all);
                    }

                    & > i {
                        display: inline-block;
                        font-size: #{$font-size + 2};
                        line-height: 40px;
                        color: #999;
                        @include transition(.2s all);
                    }

                    & > span {
                        display: inline-block;
                        padding-left: 10px;
                        font-size: #{$font-size + 2};
                        line-height: 40px;
                        color: #999;
                    }

                    &:hover {
                        & {
                            background-color: #f1f1f1;
                            @include transition(.2s all);
                        }
                    }

                    &:active {
                        & {
                            border: 1px solid #e02554;
                            @include transition(.2s all);
                        }
                        & > i {
                            color: #e02554;
                            @include transition(.2s all);
                        }

                        & > span{
                            color: #e02554;
                            @include transition(.2s all);
                        }
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
        }
    }
</style>
