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
            </div>
        </div>
        <div class="list">
            <ul>
                <li v-for="(item, i) in list" :key="i">
                    <div class="num">
                        <p>{{ ((page * 15)+i)+1 }}</p>
                    </div>
                    <div class="title">
                        <p><router-link :to="'/'+info.board+'/post/'+item._id">{{ item.title }}</router-link></p>
                    </div>
                    <div class="date">
                        <p>{{ item.state.date }}</p>
                    </div>
                    <div class="user">
                        <p>{{ item.user.name }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { SET_BOARD } from '@/store/helper/'

export default {
    name: 'DefaultMain',
    props: ['info'],
    data() {
        return {
            list : [],
            page : 0,
            title: ''
        }
    },
    methods : {
        
    },
    created: function(){
        this.title = SET_BOARD.category(this.info.board);

        const data = {
            board: this.info.board,
            page: this.page,
            view: 15
        }

        this.$axios({
            method: 'post',
            url: `/api/1/board/list/${this.info.board}`,
            data: data,
            withCredentials: true,
        }).then((req) => {
            this.list = req.data.data;
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
                & > ul {
                    & {
                        font-size: 0;
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
                        width: 5%;
                        height: auto;
                        display: table-cell;
                    }

                    & > .title {
                        width: 65%;
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
            }
        }
    }
</style>
