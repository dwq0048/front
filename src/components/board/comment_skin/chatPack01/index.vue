<template>
    <div class="comment">
        <div class="submit" v-if="GET_LOGIN">
            <div class="plus">
                <button type="button">
                    <div>
                        <i><font-awesome-icon :icon="faPlus" /></i>
                    </div>
                </button>
            </div>
            <div class="form-input">
                <textarea v-model="reply"></textarea>
            </div>
            <div class="upload">
                <button type="submit" v-on:click="Comment()">
                    <div>
                        <i><font-awesome-icon :icon="faCloudUploadAlt" /></i>
                    </div>
                </button>
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
                                    <p class="name">{{ item.user.nickname }}</p>
                                    <p class="date">{{ item.state.date_fix }}</p>
                                </div>
                                <div class="post">
                                    {{ item.post }}
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
import { faPlus, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'

const socket = io('http://localhost:3000')
const userStore = 'userStore'
const postStore = 'postStore'

export default {
    name: 'comment_chat',
    props: ['info'],
    data() {
        return {
            faPlus, faCloudUploadAlt,
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
                width: 100%;
                padding: 15px 30px;
                display: table;
            }

            & > .plus {
                & {
                    width: 80px;
                    display: table-cell;
                    vertical-align: bottom;
                }

                & > button {
                    & {
                        border: none;
                        background: none;
                        padding: 0;
                        margin: 0;
                        font-size: #{$font-size - 2};
                        color: #999;
                        line-height: 35px;
                        cursor: pointer;
                    }

                    & > div {
                        & {
                            width: 35px;
                            height: 35px;
                            border: 2px solid #999;
                            border-radius: 5px;
                        }
                    }
                }
            }

            & > .upload {
                & {
                    width: 100px;
                    display: table-cell;
                    vertical-align: bottom;
                }

                &:after {
                    content: " ";
                    display: block;
                    clear: both;
                }

                & > button {
                    & {
                        border: none;
                        background: none;
                        padding: 0;
                        margin: 0;
                        font-size: #{$font-size + 2};
                        line-height: 35px;
                        cursor: pointer;
                        float: right;
                    }

                    & > div {
                        & {
                            display: inline-block;
                            width: 70px;
                            height: 35px;
                            border: 2px solid #999;
                            color: #999;
                            border-radius: 5px;
                        }
                    }
                }
            }

            & > .form-input {
                & {
                    width: 700px;
                    height: auto;
                    display: table-cell;
                    vertical-align: top;
                    border: 1px solid #999;
                    border-radius: 10px;
                    font-size: 0;
                }

                & > textarea {
                    border: none;
                    background: none;
                    width: 100%;
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
            }
        }

        & > .contents {
            & {
                width: 100%;
                min-height: 100px;
                background-color: #f1f1f1;   
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
                                    width: 10%;
                                    display: inline-block;
                                    padding: 20px;
                                }

                                & > div {
                                    & {
                                        width: 100%;
                                        height: auto;
                                        border: 2px solid $bg-orange;
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
                                    width: 90%;
                                    display: inline-block;
                                    vertical-align: top;
                                    padding: 15px 0px;
                                }

                                & > .title {
                                    & > p {
                                        display: inline-block;
                                    }

                                    & > .name {
                                        font-size: #{$font-size + 2};
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
                                        font-size: #{$font-size + 2};
                                        padding-top: 10px;
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
