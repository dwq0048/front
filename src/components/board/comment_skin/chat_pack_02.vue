<template>
    <div class="comment">
        <div class="profile">
            <div class="intro">
                <div class="wrap">
                    <div class="img">
                        <div></div>
                    </div>
                    <div class="user">
                        <p v-if="post.users.nickname">{{ post.users.nickname }}</p>
                    </div>
                </div>
                <div class="love">
                    <div>
                        <i><font-awesome-icon :icon="faHeartR" /></i>
                        <i><font-awesome-icon :icon="faPlus" /></i>
                        <span>0</span>
                    </div>
                </div>
            </div>
            <div class="submit">
                <button type="button" title="팔로우">
                    <span>팔로우 하기</span>
                    <i><font-awesome-icon :icon="faUserPlus" /></i>
                </button>
            </div>
        </div>
        <div class="submit" v-if="GET_LOGIN">
            <div class="intro">
                <h1>실시간 채팅<span>댓글 수 : 0</span></h1>
            </div>
            <div class="form-input">
                <textarea v-model="reply"></textarea>

                <div class="smile">
                    <button type="button">
                        <div>
                            <i><font-awesome-icon :icon="faSmile" /></i>
                        </div>
                    </button>
                </div>
                <div class="upload">
                    <button type="button" v-on:click="Comment()">
                        <div>
                            <i><font-awesome-icon :icon="faArrowUp" /></i>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        <div class="contents">
            <div class="no-reply" v-if="!list">
                <p>댓글이 없습니다.</p>
            </div>
            <div class="reply" v-if="list">
                <ul>
                    <li v-for="(item, i) in list" :key="i">
                        <div>
                            <div class="intro">
                                <div class="profile">
                                    <div></div>
                                </div>

                                <div class="user">
                                    <div class="title">
                                        <p class="name">관리자</p>
                                        <p class="date">{{ item.state.date_fix }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="post">
                                {{ item.post }}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';

import { mapActions, mapGetters } from 'vuex'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart as faHeartS, faPlus, faArrowUp, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartR, faSmile } from '@fortawesome/free-regular-svg-icons'

const socket = io('http://localhost:3000')
const userStore = 'userStore'
const postStore = 'postStore'

export default {
    name: 'comment_chat',
    props: ['info', 'post'],
    data() {
        return {
            faPlus, faArrowUp, faUserPlus, faSmile, faHeartS, faHeartR,
            reply: '',
            page: 0,
            index: false,
            list: false,
            socket: "",
        }
    },
    computed: {
        ...mapGetters(userStore, [
            'GET_LOGIN'
        ])
    },
    methods: {
        ...mapActions(postStore, [
            'COMMENT_LIST', 'COMMENT_POST'
        ]),
        Comment(){
            this.COMMENT_POST({
                board: this.info.board,
                index: this.index,
                comment: this.reply
            }).then((payload) => {
                socket.emit(this.index, {
                    payload
                });
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    created() {
        console.log(this.post);

        this.index = this.$route.params.id;

        this.COMMENT_LIST({
            board: this.info.board,
            index: this.index,
            page: this.page,
            view: 15
        }).then((req) => {
            this.list = req;

            socket.on(this.index, (data) => {
                this.list.unshift(data.payload.data.result);
            });
        }).catch((err) => {
            console.log(err);
        });
    }
}
</script>

<style lang="scss" scoped>
    .comment {
        & {
            background-color: #f9f9f9;
            width: 100%; height: 100%;
            border-radius: 5px;
            overflow: hidden;
            @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
        }

        & > .profile {
            & {
                background-color: #fff;
            }

            & > .intro {
                & {
                    display: table;
                    width: 100%; height: auto;
                    padding: 25px 15px 0px 15px;
                }

                & > .wrap {
                    & {
                        display: table-cell;
                        vertical-align: middle;
                        font-size: 0;
                    }

                    & > .img {
                        & {
                            display: inline-block;
                            vertical-align: middle;
                        }

                        & > div {
                            & {
                                width: 30px; height: auto;
                                position: relative;
                                border-radius: 50%;
                                background-color: #ccc;
                            }

                            &:after {
                                display: block;
                                content: " ";
                                padding-bottom: 100%;
                            }
                        }
                    }

                    & > .user {
                        & {
                            display: inline-block;
                            vertical-align: middle;
                            font-size: #{$font-size};
                            color: #555;
                        }

                        & > p {
                            & {
                                padding-left: 10px;
                                font-weight: bold;
                            }
                        }
                    }
                }

                & > .love {
                    & {
                        display: table-cell;
                        vertical-align: middle;
                        text-align: right;
                    }

                    & > div {
                        & {
                            display: inline-block;
                            font-size: 0;
                            color: #999;
                            padding-right: 5px;
                            cursor: pointer;
                        }

                        & > i:nth-child(1) {
                            & {
                                display: inline-block;
                                vertical-align: middle;
                                font-size: #{$font-size + 2};
                                line-height: 1;
                            }
                        }

                        & > i:nth-child(2){
                            & {
                                display: inline-block;
                                vertical-align: middle;
                                font-size: #{$font-size - 6};
                                padding: 0 5px;
                                line-height: 1;
                            }
                        }

                        & > span {
                            & {
                                display: inline-block;
                                vertical-align: middle;
                                font-size: #{$font-size + 2};
                                font-weight: bold;
                                line-height: 1;
                            }
                        }
                    }
                }
            }

            & > .submit {
                & {
                    padding: 15px 20px;
                }

                & > button {
                    & {
                        display: block;
                        width: 100%; height: auto;
                        border: 0; background: none;
                        margin: 0; padding: 0;
                        cursor: pointer; outline: none;
                        font-size: 0;
                        padding: 10px 5px;
                        background-color: $bg-orange;
                        border-radius: 15px;
                        text-align: center;
                        color: #fff;
                    }

                    & > span {
                        & {
                            display: inline-block;
                            vertical-align: middle;
                            font-size: #{$font-size - 2};
                            font-weight: bold;
                            letter-spacing: 1px;
                            line-height: 1;
                        }
                    }

                    & > i {
                        & {
                            display: inline-block;
                            vertical-align: middle;
                            font-size: #{$font-size - 2};
                            padding-left: 10px;
                            line-height: 1;
                        }
                    }
                }
            }
        }

        & > .submit {
            & {
                width: 100%;
                padding: 15px 30px;
                background-color: #fff;
                border: 1px solid #ddd;
                border-left: 0;
                border-right: 0;
            }

            & > .intro {
                & {
                    padding-bottom: 10px;
                }

                & > h1 {
                    & {
                        font-size: #{$font-size + 2};
                        font-weight: bold;
                    }

                    & > span {
                        & {
                            padding-left: 5px;
                            font-size: #{$font-size - 2};
                            vertical-align: bottom;
                        }
                    }
                }
            }

            & > .form-input {
                & {
                    width: 100%;
                    height: auto;
                    vertical-align: top;
                    border: 1px solid #ccc;
                    border-radius: 30px;
                    font-size: 0;
                    position: relative;
                }

                & > textarea {
                    border: none;
                    background: none;
                    width: calc(100% - 50px);
                    height: 35px;
                    line-height: 25px;
                    outline: none;
                    border: none;
                    padding: 0;
                    margin: 0;
                    padding: 5px 10px;
                    font-size: #{$font-size};
                    resize: none;
                    overflow: auto;
                    vertical-align: middle;
                }

                & > .upload, & > .smile {
                    & {
                        position: absolute;
                        right: -1px; top: -1px;
                        width: 37px; height: 37px;
                        border-radius: 5px;
                        overflow: hidden;
                    }

                    & > button {
                        & {
                            display: block;
                            width: 100%; height: 100%;
                            border: 0;
                            background: none;
                            margin: 0; padding: 0;
                            color: #fff;
                            background-color: $bg-blue;
                            cursor: pointer;
                        }
                    }

                    &.smile {
                        & {
                            right: 37px;
                        }

                        & > button {
                            & {
                                background: none;
                                color: #ccc;
                                font-size: #{$font-size + 4};
                            }
                        }
                    }
                }
            }
        }

        & > .contents {
            & {
                width: 100%;
                min-height: 100px;
                background-color: #f9f9f9;
            }

            & > .no-reply {
                text-align: center;
                font-size: #{$font-size};
                font-weight: bold;
                color: #333;
                line-height: 100px;
            }

            & > .reply {
                & {
                    padding-top: 15px;
                }

                & > ul {
                    & {
                        display: block;
                        width: 100%;
                        font-size: 0;
                    }

                    & > li {
                        & {
                            display: block;
                            width: 100%;
                            padding: 0 15px 25px 15px;
                            font-size: 0;
                        }

                        & > div {
                            &:after {
                                content: " ";
                                display: block;
                                clear: both;
                            }

                            & > .intro{
                                & > .profile {
                                    & {
                                        width: 10%;
                                        display: inline-block;
                                        vertical-align: middle;
                                        padding: 2px;
                                    }

                                    & > div {
                                        & {
                                            width: 100%;
                                            height: auto;
                                            border-radius: 50%;
                                            background-color: #ccc;
                                        }

                                        &:after {
                                            content: " ";
                                            display: block;
                                            padding-bottom: 100%;
                                        }
                                    }
                                }

                                & > .user {
                                    & {
                                        width: 90%;
                                        display: inline-block;
                                        vertical-align: middle;
                                        padding-left: 10px;
                                    }

                                    & > .title {
                                        & > p {
                                            display: inline-block;
                                        }

                                        & > .name {
                                            font-size: #{$font-size + 1};
                                            color: #333;
                                            font-weight: bold;
                                        }

                                        & > .date {
                                            font-size: #{$font-size - 4};
                                            color: #999;
                                            vertical-align: bottom;
                                            padding-left: 5px;
                                        }
                                    }
                                }
                            }

                            & > .post {
                                & {
                                    width: 90%;
                                    float: right;
                                    font-size: #{$font-size};
                                    padding-left: 10px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
