<template>
    <div class="default">
        <div class="nav">
            <div class="title">
                <h1>{{ title }}</h1>
                <router-link :to="`/${info.board}/edit`" class="write" title="글쓰기">
                    <i><font-awesome-icon :icon="faEdit" /></i>
                </router-link>
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
                        <button type="button" title="리스트" v-on:click="boardStyle('list')" :class="{ active: Active.list }">
                            <i><font-awesome-icon :icon="faThList" /></i>
                        </button>
                        <button type="button" title="그리드" v-on:click="boardStyle('grid')" :class="{ active: Active.grid }" >
                            <i><font-awesome-icon :icon="faThLarge" /></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="list">
            <board-list v-if="Active.list" :list="list" :info="info" :page="page"/>
            <board-grid v-if="Active.grid" :list="list" :info="info" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { SET_BOARD, SET_TIME } from '@/store/helper/'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faThLarge, faThList, faEdit } from '@fortawesome/free-solid-svg-icons'

import BoardList from './type/list'
import BoardGrid from './type/grid'

const postStore = 'postStore'

export default {
    name: 'DefaultMain',
    props: ['info'],
    components: {
        'board-list': BoardList,
        'board-grid': BoardGrid,
    },
    data() {
        return {
            list : [],
            page : 0,
            title: '',
            Active: {
                list: false,
                grid: true
            },

            faThLarge,
            faThList,
            faEdit
        }
    },
    methods : {
        ...mapActions(postStore, [
            'POST_LIST'
        ]),
        boardStyle(type){
            switch(type){
                case 'list':
                    this.boardReset();
                    this.Active.list = true;
                    break;
                case 'grid':
                    this.boardReset();
                    this.Active.grid = true;
                    break;
                default:
                    this.boardReset();
                    this.Active.list = true;
            }
        },
        boardReset(){
            this.Active = {
                list: false,
                grid: false
            }
        }
    },
    created: function(){
        this.title = SET_BOARD.category(this.info.board);
        this.boardStyle(this.info.list);

        const data = {
            board: this.info.board,
            page: this.page,
            view: 15
        }
        
        this.POST_LIST(data).then((req) => {
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
                    position: relative;
                }

                & > h1 {
                    font-size: #{$font-size + 6};
                }

                & > .write {
                    & {
                        display: inline-block;
                        border: none;
                        background: none;
                        margin: 0; padding: 0;
                        outline: none;
                        cursor: pointer;
                        position: absolute;
                        right: 0; top: 50%;
                        padding: 5px 30px;
                        @include transition(.2s all);
                        @include transform(scale(1) translate(0, -50%));
                    }

                    & > i {
                        & {
                            font-size: #{$font-size + 4};
                            color: $bg-blue;
                        }
                    }

                    &:hover {
                        & {
                            @include transition(.2s all);
                            @include transform(scale(1.05) translate(0, -50%));
                        }
                    }
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
        }
    }
</style>
