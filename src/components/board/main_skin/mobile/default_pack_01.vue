<template>
    <div class="default mobile">
        <div class="nav">
            <div class="title">
                <h1>{{ title }}</h1>
                <router-link :to="`/${info.board}/edit`" class="write" title="글쓰기">
                    <i><font-awesome-icon :icon="faEdit" /></i>
                </router-link>
            </div>
        </div>

        <div class="list">
            <board-grid :list="list" :info="info" :page="page"/>
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

import BoardGrid from '../../list_skin/defaultPack01/grid.vue'
import Pagenation from '@/components/board/_variety/pagenation'

const postStore = 'postStore'

export default {
    name: 'DefaultMain',
    props: ['info'],
    components: {
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

            // Icon
            faThLarge, faThList, faEdit, faFilter, faSearch,
        }
    },
    methods : {
        ...mapActions(postStore, [
            'POST_LIST'
        ]),
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
    created: function(){
        this.title = SET_BOARD.category(this.info.board);

        this.UpdateData();
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
