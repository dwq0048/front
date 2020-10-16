<template>
    <div class="comment">
        <div class="submit" v-if="GET_LOGIN">
            <div class="select">
                <select>
                    <option value="asc">최신 순서</option>
                    <option value="desc">오래된 순서</option>
                </select>
            </div>
            <div class="chat">
                <div>
                    <div class="plus">
                        <button type="text">
                            <i><font-awesome-icon :icon="faPlus" /></i>
                        </button>
                    </div>
                    <div class="text">
                        <div>
                            <textarea v-model="reply"></textarea>
                        </div>
                    </div>
                    <div class="submit" @click="Comment">
                        <button type="button">
                            <i><font-awesome-icon :icon="faArrowUp" /></i>
                        </button>
                    </div>
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
                            <div class="profile">
                                <div>

                                </div>
                            </div>
                            <div class="content">
                                <div class="title">
                                    <p class="name">이름</p>
                                    <p class="date">{{ item.state.date_fix }}</p>
                                </div>
                                <div class="post">
                                    <div class="text">
                                        {{ item.post }}
                                    </div>
                                </div>
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
import { faPlus, faArrowUp, faSortUp } from '@fortawesome/free-solid-svg-icons'

const socket = io('http://localhost:3000')
const userStore = 'userStore'
const postStore = 'postStore'

export default {
    name: 'comment_chat',
    props: ['info'],
    data() {
        return {
            faPlus, faArrowUp, faSortUp,
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
        this.index = this.$route.params.id;

        // 댓글 불러오기
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
            background-color: #fff;
            margin-top: 25px;
            @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
        }

        & > .submit {
            & {
                display: table;
                width: 100%; height: auto;
                padding: 10px 15px;
            }

            & > .select {
                & {
                    display: table-cell;
                    width: 150px; height: auto;
                    vertical-align: middle;
                    padding-right: 15px;
                }

                & > select {
                    & {
                        width: 100%; height: 40px;
                        font-family: $notoKR-L;
                        padding: 0 5px;
                        border: 0; background-color: #f9f9f9;
                        border: 1px solid #ddd;
                        border-radius: 3px;
                        font-size: #{$font-size};
                        font-weight: bold;
                        color: #888;
                        cursor: pointer; outline: none;
                    }
                }
            }

            & > .chat {
                & {
                    display: table-cell;
                    vertical-align: middle;
                    border: 1px solid #ddd;
                    border-radius: 7px;
                    overflow: hidden;
                }

                & > div {
                    & {
                        width: 100%; height: auto;
                        display: table;
                    }

                    & > .plus {
                        & {
                            display: table-cell;
                            width: 40px; height: 40px;
                        }

                        & > button {
                            & {
                                display: block;
                                width: 100%; height: 100%;
                                border: 0; background: none;
                                margin: 0; padding: 0;
                                outline: none; cursor: pointer;
                                position: relative;
                            }

                            & > i {
                                & {
                                    position: absolute;
                                    left: 50%; top: 50%;
                                    color: #888;
                                    font-size: #{$font-size};
                                    @include transform(translate(-50%, -50%));
                                }
                            }
                        }
                    }

                    & > .text {
                        & {
                            display: table-cell;
                            vertical-align: middle;
                            font-size: #{$font-size}
                        }

                        & > div {
                            & {
                                font-size: #{$font-size};
                            }

                            & > textarea {
                                & {
                                    display: block;
                                    font-family: $notoKR-L;
                                    padding: 10px 5px 0px 0px;
                                    width: 100%; height: 40px;
                                    border: 0; background: none;
                                    cursor: text; outline: none;
                                    resize: none;
                                    color: #555;
                                    font-weight: bold;
                                    letter-spacing: 1.3px;
                                }
                                
                                &::-webkit-scrollbar { display: none; }
                            }
                        }
                    }

                    & > .submit {
                        & {
                            display: table-cell;
                            width: 40px; height: 40px;
                            vertical-align: middle;
                        }

                        & > button {
                            & {
                                display: block;
                                position: relative;
                                width: 100%; height: 100%;
                                border: 0; background: none;
                                margin: 0; padding: 0;
                                outline: none; cursor: pointer;
                                background-color: $bg-blue;
                                border-radius: 1px;
                            }

                            & > i {
                                & {
                                    position: absolute;
                                    left: 50%; top: 50%;
                                    font-size: #{$font-size};
                                    color: #fff;
                                    @include transform(translate(-50%, -50%));
                                }
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
                        }

                        & > div {
                            & > div.profile {
                                & {
                                    width: 8%;
                                    display: inline-block;
                                    padding: 15px;
                                }

                                & > div {
                                    & {
                                        width: 100%;
                                        height: auto;
                                        border-radius: 50%;
                                        background-color: #333;
                                    }

                                    &:after {
                                        content: " ";
                                        display: block;
                                        padding-bottom: 100%;
                                    }
                                }
                            }

                            & > div.content {
                                & {
                                    width: 92%;
                                    display: inline-block;
                                    vertical-align: top;
                                    padding: 15px 0px;
                                }

                                & > .title {
                                    & > p {
                                        display: inline-block;
                                    }

                                    & > .name {
                                        font-size: #{$font-size};
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

                                & > .post {
                                    & {
                                        position: relative;
                                        display: inline-block;
                                        font-size: #{$font-size};
                                        background-color: rgb(202, 234, 247);
                                        margin-top: 10px;
                                        border-radius: 10px;
                                        padding: 5px 15px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
