<template>
    <div class="default">
        <div class="nav">
            <div class="title">
                <h1>{{ title }}</h1>
            </div>
            <div class="menu">
                <ul>
                    <li>
                        <button type="button">최신</button>
                    </li>
                    <li>
                        <button type="button">인기</button>
                    </li>
                </ul>
                <ul class="right">
                    <li>
                        <button type="button" title="리스트" :class="{ active: ACTIVE.list  }">
                            <i><font-awesome-icon :icon="faThList" /></i>
                        </button>
                        <button type="button" title="그리드" :class="{ active: ACTIVE.grid  }">
                            <i><font-awesome-icon :icon="faThLarge" /></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="list">
            <ul v-if="false">
                <li v-for="(item, i) in list" :key="i">
                    <div class="num">
                        <p>{{ ((page * 15)+i)+1 }}</p>
                    </div>
                    <div class="title">
                        <p><router-link :to="'/'+info.board+'/post/'+item._id">{{ item.title }}</router-link></p>
                    </div>
                    <div class="date">
                        <p>{{ item.state.date_fix }}</p>
                    </div>
                    <div class="user">
                        <p>{{ item.user.name }}</p>
                    </div>
                </li>
            </ul>
            <ul class="grid">
                <li v-for="(item, i) in list" :key="i">
                    <div class="num">
                        <p>
                            <i><font-awesome-icon :icon="faHeartR" /></i>
                            <span>{{ ((page * 15)+i)+1 }}</span>
                        </p>
                    </div>
                    <div class="title">
                        <p class="king"><router-link :to="'/'+info.board+'/post/'+item._id">{{ item.title }}</router-link></p>
                        <div class="info">
                            <p class="date">{{ item.state.displayDate }}</p>
                            <p class="name">{{ item.user.name }}</p>
                        </div>
                    </div>
                    <div class="thumbnail">
                        <div>
                        
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { SET_BOARD, SET_TIME } from '@/store/helper/'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartR } from '@fortawesome/free-regular-svg-icons'

const postStore = 'postStore'

export default {
    name: 'DefaultMain',
    props: ['info'],
    data() {
        return {
            list : [],
            page : 0,
            title: '',
            ACTIVE: {
                list: false,
                grid: true
            },

            faThLarge,
            faThList,
            faHeartR
        }
    },
    methods : {
        ...mapActions(postStore, [
            'POST_LIST'
        ]),
    },
    created: function(){
        this.title = SET_BOARD.category(this.info.board);

        const data = {
            board: this.info.board,
            page: this.page,
            view: 15
        }

        this.POST_LIST(data).then((req) => {
            console.log(req);
            this.list = req;
        }).catch((err) => {
            console.log(err);
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

        & > .nav {
            & {
                background-color: #fff;
                @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
            }
            & > .title {
                & {
                    padding: 15px 30px;
                }

                & > h1 {
                    font-size: #{$font-size + 6};
                }
            }
            & > .menu {
                &:after {
                    content: " ";
                    display: block;
                    clear: both;
                }

                & > ul {
                    & {
                        font-size: 0;
                        float: left;
                    }

                    & > li {
                        & {
                            display: inline-block;
                            list-style: none;
                            font-size: #{$font-size + 6};
                            height: 45px;
                        }

                        & > button {
                            & {
                                border: none;
                                background: none;
                                outline: none;
                                padding:0 30px;
                                height: 100%;
                                cursor: pointer;
                            }
                        }
                    }

                    &.right {
                        & {
                            float: right;
                            padding-right: 15px;
                        }

                        & > li {
                            & > button {
                                & {
                                    font-size: #{$font-size};
                                    color: #999;
                                    padding: 0 15px;
                                    @include transition(.2s all);
                                }

                                &.active {
                                    color: #555;
                                    @include transition(.2s all);
                                }
                            }
                        }
                    }
                }
            }
        }

        & > .list {
            & {
                background-color: #fff;
                margin-top: 15px;
                @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
            }
            & > ul {
                & {
                    font-size: 0;
                }

                & > li {
                    & {
                        width: 100%;
                        height: 45px;
                        display: table;
                        list-style: none;
                        font-size: #{$font-size};
                        border-bottom: 1px solid #f1f1f1;
                        padding: 0 10px;
                    }

                    & > div {
                        vertical-align: middle;
                    }

                    & > .num {
                        & {
                            width: 7%;
                            height: auto;
                            display: table-cell;
                        }

                        & > p {
                            & {
                                vertical-align: middle;
                                text-align: center;
                                padding-right: 10px;
                            }

                            & > i {
                                & {
                                    font-size: #{$font-size - 4};
                                    display: inline-block;
                                    vertical-align: middle;
                                    padding-right: 5px;
                                }
                            }

                            & > span {
                                & {
                                    display: inline-block;
                                    vertical-align: middle;
                                }
                            }
                        }
                    }

                    & > .title {
                        width: 63%;
                        height: auto;
                        display: table-cell;
                    }

                    & > .date {
                        width: 10%;
                        height: auto;
                        display: table-cell;
                    }

                    & > .user {
                        width: 20%;
                        height: auto;
                        display: table-cell;
                    }
                }

                &.grid {
                    & > li {
                        & > .title {
                            & {
                                width: 82%;
                                padding: 10px 0;
                            }

                            & > .king {
                                & {
                                    display: block;
                                    width: 100%;
                                }

                                & > a {
                                    display: block;
                                    text-decoration: none;
                                    color: #333;
                                    font-weight: bold;
                                    font-size: #{$font-size + 2};
                                    padding-bottom: 10px;
                                }
                            }

                            & > .info {
                                & {
                                    display: block;
                                    font-size: #{$font-size};
                                    color: #555;
                                }

                                & > .date {
                                    & {
                                        display: inline-block;
                                        padding-right: 30px;
                                    }
                                }

                                & > .name {
                                    & {
                                        display: inline-block;
                                    }
                                }
                            }
                        }

                        & > .thumbnail {
                            & {
                                width: 10%;
                                height: auto;
                                display: table-cell;
                                padding: 15px;
                            }

                            & > div {
                                & {
                                    width: 100px;
                                    height: auto;
                                    position: relative;
                                    overflow: hidden;
                                    border-radius: 1px;
                                    background-color: #ccc;
                                }

                                &:after {
                                    content: " ";
                                    display: block;
                                    padding-bottom: 80%;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
