<template>
    <div class="comment">
        <ul>
            <li v-for="(item, i) in list" :key="i">
                <div class="title">
                    <h1>대충 제목 - {{ i }}</h1>
                    <div class="text">
                        하하하허허ㅓ핳후후후ㅜ후
                    </div>
                </div>
                <div class="options">
                    <span class="board">자유게시판</span>
                    <span class="date">하루전</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'AuthComment',
    data(){
        return {
            list : [ {},{},{},{},{} ]
        }
    }
}
</script>

<style lang="scss" scoped>
    .comment {
        & {
            display: block;
            width: 100%; height: auto;
        }

        & > ul {
            & {
                width: 100%; height: auto;
                list-style: none;
                font-size: 0;
            }

            & > li {
                & {
                    display: table;
                    width: 100%;
                    padding: 15px;
                    border-bottom: 1px solid #eee;
                }

                &:nth-last-child(1){
                    & {
                        border-bottom: 0;
                    }
                }

                & > .title {
                    & {
                        display: table-cell;
                        vertical-align: middle;
                        width: 80%;
                    }

                    & > h1 {
                        & {
                            display: block;
                            font-size: #{$font-size + 2};
                            font-weight: bold;
                            line-height: 1;
                            color: #555;
                            padding-bottom: 10px;
                        }
                    }

                    & > .text {
                        & {
                            display: block;
                            width: 100%; height: auto;
                            font-size: #{$font-size};
                            color: #999;
                        }
                    }
                }

                & > .options {
                    & {
                        display: table-cell;
                        vertical-align: middle;
                        width: 20%;
                        font-size: #{$font-size};
                        color: #555;
                    }

                    & > span {
                        & {
                            display: block;
                        }

                        &.board {
                            & {
                                font-weight: bold;
                                padding-bottom: 5px;
                            }
                        }

                        &.date {
                            & {
                               color: #aaa; 
                            }
                        }
                    }
                }
            }
        }
    }
</style>
