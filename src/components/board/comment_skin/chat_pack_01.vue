<template>
    <div class="comment">
        <div class="menu">
            <ul>
                <li v-for="(item, i) in Menu.children" :key="i" :class="{ active : item.Active }">
                    <button type="button" :title="item.en" @click="MenuActive(i)">
                        <span>{{ item.ko }}</span>
                        <div v-if="item.option">
                            <i v-if="item.option.count"><font-awesome-icon :icon="faPlus" /></i>
                            <span v-if="item.option.count">{{ item.option.count }}</span>
                        </div>
                    </button>
                </li>
            </ul>
        </div>
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
                            <i><font-awesome-icon :icon="faSmile" /></i>
                        </button>
                    </div>
                    <div class="text">
                        <div>
                            <textarea v-model="content"></textarea>
                        </div>
                    </div>
                    <div class="submit" @click="Submit">
                        <button type="button">
                            <i><font-awesome-icon :icon="faArrowUp" /></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="contents">
            <div class="no-reply" v-if="!comment || comment.length <= 0">
                <p>댓글이 없습니다.</p>
            </div>
            <div class="reply" v-if="comment">
                <ul>
                    <li v-for="(item, i) in comment" :key="i">
                        <div>
                            <div class="profile">
                                <div>

                                </div>
                            </div>
                            <div class="content">
                                <div class="title">
                                    <p class="name">{{ item.post.users.nickname }}</p>
                                    <p class="date">{{ item.post.state.date_display }}</p>
                                </div>
                                <div class="post" v-for="(items, k) in item.array" :key="k">
                                    <div class="text">
                                        {{ items }}
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
import { mapActions, mapGetters } from 'vuex'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faArrowUp, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { faSmile } from '@fortawesome/free-regular-svg-icons'

const userStore = 'userStore'
const postStore = 'postStore'

export default {
    name: 'comment_chat',
    props: ['comment', 'count'],
    data() {
        return {
            // Icon
            faPlus, faArrowUp, faSortUp, faSmile,

            // Variable
            content : "",

            // Menu
            Menu : {
                options : {},
                children : [
                    { ko : '댓글', en : 'Comment', Active : true, option : { count : (this.count)?this.count:0 } },
                    { ko : '목록', en : 'List', Active : false }
                ]
            }
        }
    },
    computed: {
        ...mapGetters(userStore, [
            'GET_LOGIN'
        ])
    },
    methods: {
        MenuActive(option){
            this.Menu.children.map(item => { item.Active = false });
            this.Menu.children[option].Active = true;
        },
        Submit(){
            this.$emit('comment-submit', this.content);
        }
    }
}
</script>

<style lang="scss" scoped>
    .comment {
        & {
            background-color: #fff;
            margin-top: 25px;
            border-radius: 3px;
            overflow: hidden;
            @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
        }

        & > .menu {
            & {
                width: 100%; height: auto;
            }

            & > ul {
                & {
                    display: block;
                    width: 100%; height: auto;
                    list-style: none;
                    font-size: 0;
                    background-color: #aaa;
                }

                & > li {
                    & {
                        position: relative;
                        display: inline-block;
                        z-index: 1;
                        @include box-shadow(0px 0px 0px rgba(0,0,0,0.1));
                        @include transition(.2s all);
                    }

                    & > button {
                        & {
                            display: block;
                            outline: none; cursor: pointer;
                            border: 0; background: none;
                            margin: 0; padding: 0;
                            padding: 10px 30px;
                            font-size: #{$font-size - 2};
                            letter-spacing: 1px;
                            font-weight: bold;
                            color: #fff;
                            @include transition(.2s all);
                        }

                        & > span {
                            & {
                                display: inline-block;
                                vertical-align: middle;
                            }
                        }

                        & > div {
                            & {
                                display: inline-block;
                                vertical-align: middle;
                                color: #f1f1f1;
                                @include transition(.2s all);
                            }

                            & > i {
                                & {
                                    display: inline-block;
                                    vertical-align: middle;
                                    font-size: #{$font-size - 4};
                                    padding: 0 5px;
                                }
                            }

                            & > span {
                                & {
                                    display: inline-block;
                                    vertical-align: middle;
                                    font-weight: bold;
                                    font-size: #{$font-size};
                                }
                            }
                        }
                    }

                    &.active {
                        & {
                            background-color: #fff;
                            z-index: 2;
                            @include box-shadow(2px 1px 2px rgba(0,0,0,0.1));
                            @include transition(.2s all);
                        }

                        & > button {
                            & {
                                color: #555;
                                @include transition(.2s all);
                            }

                            & > div {
                                & {
                                    color: #aaa;
                                    @include transition(.2s all);
                                }
                            }
                        }
                    }

                    &:hover {
                        & {
                            z-index: 3;
                            @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
                            @include transition(.2s all);
                        }
                    }
                }
            }
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
                                    padding: 10px 10px 10px 0;
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
                                        display: table;
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
