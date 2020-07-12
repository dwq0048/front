<template>
    <div class="default">
        <div class="contents">
            <div class="info">
                <div class="title">
                    <h1>{{ post.title }}</h1>
                </div>
                <div class="display">
                    <div>
                        <span>{{ post.board.name }}</span>
                        <span>{{ post.state.date_fix }}</span>
                        <span>{{ post.user.nickname }}</span>
                    </div>
                    <div>
                        <span>좋아요</span>
                    </div>
                </div>
            </div>
            <div class="post">
                <div v-html="post.post"></div>
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
import { faHeart as faHeartS } from '@fortawesome/free-solid-svg-icons'

import { SET_TIME } from '@/store/helper'
import { SET_BOARD } from '@/store/helper'

import Comment from '@/components/board/comment_skin/chatPack01'

export default {
    name: 'DefaultMain',
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
                },
                type: {
                    password: '',
                    skin: '',
                    state: '',
                },
                files: [],
                images: [],
            },
            faHeartR,
            faHeartS
        }
    },
    components: {
        'comment' : Comment
    },
    methods : {

    },
    created: function(){
        const data = {
            id: this.id,
            board: 'notice'
        }

        this.$axios({
            method: 'post',
            url: `/api/1/board/view/${this.id}`,
            data: data,
            withCredentials: true,
        }).then((req) => {
            this.post = req.data.req;
            this.post.state.date_fix = SET_TIME(this.post.state.date_fix);
            this.post.board = {
                original: this.post.board,
                name: SET_BOARD.category(this.post.board)
            }

            console.log(this.post);

            const element = document.createElement('div');
            element.innerHTML = this.post.post;
            for(let i=0; i<this.post.images.length; i++){
                const src = element.querySelectorAll(`[data-index]`);
                for(let j=0; j<src.length; j++){
                    const index = src[j].getAttribute("data-index");
                    src[j].setAttribute("src", `http://127.0.0.1:3000/images/${this.post.images[index]}`);
                }
            }

            this.post.post = element.outerHTML;
        }).catch((err) => {
            console.log(err);
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
