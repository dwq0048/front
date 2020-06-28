<template>
    <div class="default">
        <div class="nav">
            <div class="title">
                <h1>공지사항</h1>
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
                <li>
                    <div class="num">
                        <p>1</p>
                    </div>
                    <div class="title">
                        <p>안녕하세요</p>
                    </div>
                    <div class="date">
                        <p>1분전</p>
                    </div>
                    <div class="user">
                        <p>오줌달달</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DefaultMain'
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
                padding: 15px;
                @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
            }
            & > ul {
                & {
                    font-size: 0;
                }
                & > li {
                    & {
                        width:100%;
                        display: table;
                        list-style: none;
                        font-size: #{$font-size};
                    }

                    & > .num {
                        width: 10%;
                        height: auto;
                        display: table-cell;
                    }

                    & > .title {
                        width: 50%;
                        height: auto;
                        display: table-cell;
                    }

                    & > .date {
                        width: 20%;
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
