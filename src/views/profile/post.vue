<template>
    <div class="post">
        <div>
            <div class="title">
                <div class="left">
                    <h1>000의 게시글</h1>
                </div>
                <div class="right">
                    <div>
                        <div class="search">
                            <div>
                                <div class="input">
                                    <input type="text">
                                </div>
                                <div class="submit">
                                    <button type="button">
                                        <i><font-awesome-icon :icon="faSearch" /></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="type">
                            <ul>
                                <li :class="{ active : this.active.type == 'list' }">
                                    <button type="button">
                                        <i><font-awesome-icon :icon="faThList" /></i>
                                    </button>
                                </li>
                                <li :class="{ active : this.active.type == 'grid' }">
                                    <button type="button">
                                        <i><font-awesome-icon :icon="faThLarge" /></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list" v-if="list">
                <board-grid :list="list" :info="info" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { SET_BOARD, SET_TIME } from '@/store/helper/'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faThLarge, faThList, faSearch } from '@fortawesome/free-solid-svg-icons'

import BoardGrid from '@/components/board/list_skin/defaultPack01/grid.vue'

const postStore = 'postStore'

export default {
    name: 'ProfilePost',
    components: {
        'board-grid': BoardGrid
    },
    data(){
        return {
            // Icons
            faThLarge, faThList, faSearch,

            // variable
            page : 0,
            view : 15,
            active : {
                type : 'grid'
            },

            list: false,
            info: {

            }
        }
    },
    methods : {
        ...mapActions(postStore, [
            'POST_LIST'
        ]),
        UpdateData(){
            this.page = (this.$route.query.page) ? Number(Number(this.$route.query.page) - 1) : 0;
            (isNaN(this.page)) ? this.page = 0 : undefined;
            
            return { page: this.page, view: this.view, index: this.$route.query.id };
        },
        ListLoad(){
            const data = this.UpdateData();
            
            this.POST_LIST(data).then((req) => {
                this.list = req.list;
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    async created(){
        await this.UpdateData();
        this.ListLoad();
    }
}
</script>

<style lang="scss" scoped>
.post {
    & {
        display: block;
        position: relative;
        width: 100%; height: auto;
    }

    & > div {
        & {
            display: block;
            width: 100%; height: auto;
            border-radius: 5px;
            overflow: hidden;
            background-color: #fff;
            @include box-shadow(2px 2px 5px rgba(0,0,0,0.1));
        }

        & > .title {
            & {
                display: table;
                width: 100%; height: auto;
                padding: 15px 25px;
                background-color: #f9f9f9;
                border-bottom: 1px solid #eee;
            }

            & > .left {
                & {
                    display: table-cell;
                    vertical-align: middle;
                    font-size: 0;
                    white-space: nowrap;
                }

                & > h1 {
                    & {
                        display: inline-block;
                        vertical-align: middle;
                        font-size: #{$font-size + 4};
                        letter-spacing: 1.5px;
                        line-height: 1;
                    }
                }
            }

            & > .right {
                & {
                    display: table-cell;
                    vertical-align: middle;
                    width: 100%; height: auto;
                    font-size: 0;
                }

                & > div {
                    & {
                        display: table;
                        width: 100%; height: auto;
                    }

                    & > .search {
                        & {
                            display: table-cell;
                            vertical-align: middle;
                            width: 100%; height: auto;
                            vertical-align: middle;
                            padding: 0 15px;
                        }

                        & > div {
                            & {
                                display: table;
                                width: 100%; height: auto;
                                background-color: #fff;
                                border: 1px solid #ddd;
                                border-radius: 15px;
                            }

                            & > .input {
                                & {
                                    display: table-cell;
                                    vertical-align: middle;
                                    width: 100%; height: 26px;
                                }

                                & > input {
                                    & {
                                        display: block;
                                        width: 100%; height: 100%;
                                        outline: none; cursor: text;
                                        background: none; border: 0;
                                        padding: 0 15px; margin: 0;
                                        font-size: #{$font-size - 2};
                                        letter-spacing: 1px;
                                    }
                                }
                            }
                            
                            & > .submit {
                                & {
                                    display: table-cell;
                                    vertical-align: middle;
                                }

                                & > button {
                                    & {
                                        display: block;
                                        outline: none; cursor: pointer;
                                        background: none; border: 0;
                                        padding: 0; margin: 0;
                                        font-size: 0;
                                        padding: 0 10px;
                                    }

                                    & > i {
                                        & {
                                            display: inline-block;
                                            vertical-align: middle;
                                            text-align: center;
                                            font-size: #{$font-size};
                                            color: #ddd;
                                            @include transition(.2s all);
                                        }
                                    }

                                    &:hover {
                                        & > i {
                                            & {
                                                color: #999;
                                                @include transition(.2s all);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    & > .type {
                        & {
                            display: table-cell;
                            vertical-align: middle;
                            font-size: 0;
                        }

                        & > ul {
                            & {
                                display: block;
                                list-style: none;
                                font-size: 0;
                                white-space: nowrap;
                            }

                            & > li {
                                & {
                                    display: inline-block;
                                    vertical-align: middle;
                                    padding-left: 15px;
                                }

                                &:nth-child(1){
                                    & {
                                        padding-left: 0;
                                    }
                                }

                                & > button {
                                    & {
                                        display: block;
                                        cursor: pointer; outline: none;
                                        background: none; border: 0;
                                        padding: 0; margin: 0;
                                        font-size: 0;
                                    }

                                    & > i {
                                        & {
                                            display: inline-block;
                                            vertical-align: middle;
                                            font-size: #{$font-size};
                                            color: #999;
                                            line-height: 1;
                                            letter-spacing: 0;
                                            text-align: center;
                                            @include transition(.2s all);
                                        }
                                    }

                                    &:hover {
                                        & > i {
                                            & {
                                                color: #555;
                                                @include transition(.2s all);
                                            }
                                        }
                                    }
                                }

                                &.active {
                                    & > button {
                                        & > i {
                                            & {
                                                color: #555;
                                                @include transition(.2s all);
                                            }
                                        }
                                    }
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
