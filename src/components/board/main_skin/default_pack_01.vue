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
                <div class="left">
                    <div class="select">
                        <select>
                            <option value="" checked>전체</option>
                            <option value="">주간</option>
                            <option value="">월간</option>
                        </select>
                    </div>
                </div>
                <div class="input">
                    <div>
                        <button type="button" class="filter" title="필터">
                            <i><font-awesome-icon :icon="faFilter" /></i>
                        </button>
                        <div class="input">
                            <input type="text" placeholder="게시판 검색...">
                        </div>
                        <button type="button" class="search" title="검색">
                            <i><font-awesome-icon :icon="faSearch" /></i>
                        </button>
                    </div>
                </div>
                <div class="right">
                    <ul>
                        <li>
                            <button type="button" title="리스트" v-on:click="boardStyle('list')" :class="{ active: Active.list }">
                                <i><font-awesome-icon :icon="faThList" /></i>
                            </button>
                        </li>
                        <li>
                            <button type="button" title="그리드" v-on:click="boardStyle('grid')" :class="{ active: Active.grid }" >
                                <i><font-awesome-icon :icon="faThLarge" /></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="list">
            <board-list :info="info" :list="Notice" :page="page" :option="{ style : 'notice' }" />

            <board-list v-if="Active.list" :list="list" :info="info" :page="page"/>
            <board-grid v-if="Active.grid" :list="list" :info="info" />
        </div>
        <div class="pagenation">
            <pagenation v-if="count" :count="count" :board="info.board" @list-load="ListLoad()"/>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { SET_BOARD, SET_TIME } from '@/store/helper/'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faThLarge, faThList, faEdit, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons'

import BoardList from '../list_skin/defaultPack01/list.vue'
import BoardGrid from '../list_skin/defaultPack01/grid.vue'
import Pagenation from '@/components/board/_variety/pagenation'

const postStore = 'postStore'

export default {
    name: 'DefaultMain',
    props: ['info'],
    components: {
        'board-list': BoardList,
        'board-grid': BoardGrid,
        'pagenation' : Pagenation,
    },
    data() {
        return {
            list : [],
            page : 0,
            view : 15,
            count : false,

            title: '',
            Active: {
                list: false,
                grid: true
            },

            Notice : [
                {
                    _id : 0,
                    title : '12.08 게시판 공지사항 입니다.',
                    meta : {
                        thumbnail : undefined
                    },
                    state : {
                        displayDate : '하루전'
                    },
                    users : {
                        nickname : '관리자'
                    }
                }, 
                {
                    _id : 0,
                    title : '자유 게시판 필독!!',
                    meta : {
                        thumbnail : undefined
                    },
                    state : {
                        displayDate : '하루전'
                    },
                    users : {
                        nickname : '관리자'
                    }
                }
            ],

            // Icon
            faThLarge, faThList, faEdit, faFilter, faSearch,
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
        },
        UpdateData(){
            this.page = (this.$route.query.page) ? Number(Number(this.$route.query.page) - 1) : 0;
            (isNaN(this.page)) ? this.page = 0 : undefined;
            
            return { board: this.info.board, page: this.page, view: this.view };
        },
        ListLoad(){
            const data = this.UpdateData();
            
            this.POST_LIST(data).then((req) => {
                this.list = req.list;
                this.count = req.count;
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    async created(){
        this.title = SET_BOARD.category(this.info.board);
        this.boardStyle(this.info.list);

        await this.UpdateData();
        this.ListLoad();
    }
}
</script>

<style lang="scss" scoped>
    .default {
        & {
            width: 100%;
            height: auto;
            padding-bottom: 15px;
        }

        & > .nav {
            & {
                background-color: #fff;
                border-radius: 5px;
                @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
            }

            & > .title {
                & {
                    display: table;
                    width: 100%; height: auto;
                    padding: 15px 30px;
                }

                & > h1 {
                    & {
                        display: table-cell;
                        vertical-align: middle;
                        width: 100%; height: auto;
                        font-size: #{$font-size + 4};
                        font-weight: bold;
                        line-height: 1;
                    }
                }

                & > .write {
                    & {
                        display: table-cell;
                        vertical-align: middle;
                        outline: none; cursor: pointer;
                        border: 0; background: none;
                        padding: 0; margin: 0;
                        text-decoration: none;
                        font-size: #{$font-size + 2};
                        color: $bg-blue-light;
                        @include transition(.2s all);
                    }

                    &:hover {
                        & {
                            color: $bg-blue-bold;
                            @include transition(.2s all);
                        }
                    }
                }
            }

            & > .menu {
                & {
                    display: table;
                    width: 100%; height: auto;
                    padding: 10px 0;
                }

                & > .input {
                    & {
                        display: table-cell;
                        vertical-align: middle;
                        width: 100%; height: auto;
                    }

                    & > div {
                        & {
                            display: table;
                            width: 100%; height: auto;
                            background-color: #f1f1f1;
                            border: 1px solid #eee;
                            border-radius: 15px;
                            padding: 5px;
                            font-size: #{$font-size - 2};
                        }

                        & > button {
                            & {
                                display: table-cell;
                                vertical-align: middle;
                                outline: none; cursor: pointer;
                                background: none; border: 0;
                                margin: 0; padding: 0;
                                padding: 0 10px;
                                color: #999;
                            }
                        }

                        & > .input {
                            & {
                                display: table-cell;
                                vertical-align: middle;
                                width: 100%;
                            }

                            & > input {
                                & {
                                    display: block;
                                    width: 100%; height: 100%;
                                    outline: 0; cursor: text;
                                    border: 0; background: none;
                                    margin: 0; padding: 0;
                                    line-height: 1;
                                    font-size: #{$font-size - 2};
                                }
                            }
                        }
                    }
                }

                & > .left {
                    & {
                        display: table-cell;
                        vertical-align: middle;
                    }

                    & > .select {
                        & {
                            padding: 0 15px;
                        }

                        & > select {
                            & {
                                width: 120px; height: auto;
                                outline: none; cursor: pointer;
                                border: 0; background: none;
                                margin: 0; padding: 0;
                                border: 1px solid #eee;
                                border-radius: 2px;
                                background-color: #f9f9f9;
                                color: #555;
                                padding: 5px 10px;
                                line-height: 1;
                                font-size: #{$font-size - 2};
                            }
                        }
                    }
                }

                & > .right {
                    & {
                        display: table-cell;
                        vertical-align: middle;
                    }

                    & > ul {
                        & {
                            display: block;
                            width: 100%; height: auto;
                            list-style: none;
                            font-size: 0;
                            white-space: nowrap;
                            padding: 0 10px;
                        }

                        & > li {
                            & {
                                display: inline-block;
                                vertical-align: middle;
                            }

                            & > button {
                                & {
                                    display: block;
                                    outline: none; cursor: pointer;
                                    border: 0; background: none;
                                    margin: 0; padding: 0;
                                    padding: 5px 10px;
                                }

                                & > i {
                                    & {
                                        font-size: #{$font-size - 2};
                                        color: #777;
                                        line-height: 1;
                                    }
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
                border-radius: 5px;
                overflow: hidden;
                @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
            }
        }

        & > .pagenation {
            & {
                padding-top: 25px;
            }
        }
    }
</style>
