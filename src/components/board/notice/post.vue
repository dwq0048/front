<template>
    <div class="default">
        <div class="nav">
            <div class="title">
                <h1>{{ post.title }}</h1>
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
    </div>
</template>

<script>
export default {
    name: 'DefaultMain',
    data() {
        return {
            id: this.$route.params.id,
            post: {}
        }
    },
    methods : {
        
    },
    created: function(){
        const data = {
            id: this.id,
            board: 'notice'
        }

        this.$axios({
            method: 'post',
            url: `/api/1/board/view/${this.id}`,
            data: data,
            withCredentials: true,
        }).then((req) => {
            this.post = req.data.req;
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
