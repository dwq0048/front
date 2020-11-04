<template>
    <div class="list">
        <table>
            <tr v-for="(item, i) in list" :key="i">
                <td class="title">       
                    <div>
                        <h1 class="title">게시물 제목 - {{ i }}</h1>
                        <div class="text">ㅁㄴ엄니ㅏ언마ㅣㅓ임나ㅓ암너이ㅓㄴㅁ아ㅓ미ㅏ너이ㅏㄴ머이마너이ㅏㄴ머ㅣㅇ머니아ㅓ미ㅏ어ㅣㅏ너이ㅏㅁ너이ㅓㄴㅁ이마너이ㅏㄴ머인머이마너이ㅏ너이ㅏㅁ너이ㅏㄴ머이ㅏㅁ너아너임나ㅓ인ㅁ언미ㅏ어ㅣ나머인마어ㅣㄴ마ㅓ이ㅏㄴ머이ㅏㄴ머아니ㅓ이ㅏㄴ머이ㅏㅓㄴ미아ㅓ이ㅏㄹ쿠,ㅊㅋ투,ㅡㅋ퉃ㅋ퉃ㅁ니ㅏㅓㅇ마ㅓ쟈ㅐ대ㅑㅂㄱ머이ㅏㅓㅇ머ㅏ너이ㅓㅏ모러ㅣㅏㄴ어라멀이아나ㅓㅁ나어ㅜ쿷뱌ㅓㄱㅈㄷ러ㅣ리나어</div>
                    </div>
                </td>
                <td class="options">
                    <div>
                        <div class="category">
                            자유 게시판
                        </div>
                        <div class="date">
                            하루 전
                        </div>
                        <div class="tag">
                            #뭐시기, #뭐기, #하허하하하
                        </div>
                    </div>
                </td>
                <td class="img">
                    <div>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'AuthList',
    data(){
        return {
            list : [
                {},{},{},{},{}
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
    .list {
        & {
            width: 100%; height: auto ;
        }

        & > table {
            & {
                width: 100%; height: auto;
            }

            & > tr {
                & > td {
                    &.title {
                        & {
                            width: 60%;
                            padding: 10px;
                            vertical-align: middle;
                        }

                        & > div {
                            & {
                                width: 100%; height: 100px;
                                overflow: hidden;
                            }

                            & > h1 {
                                & {
                                    display: block;
                                    font-size: #{$font-size + 2};
                                    font-weight: bold;
                                    line-height: 1;
                                    padding-bottom: 10px;
                                    color: #555;
                                }
                            }

                            & > .text {
                                & {
                                    display: block;
                                    font-size: #{$font-size};
                                    font-weight: normal;
                                    line-height: 1.3;
                                    color: #999;
                                }
                            }
                        }
                    }

                    &.options {
                        & {
                            width: 25%;
                            padding: 0 10px;
                            vertical-align: bottom;
                        }

                        & > div {
                            & {
                                padding-bottom: 10px;
                            }

                            & > .category {
                                & {
                                    font-size: #{$font-size};
                                    font-weight: bold;
                                    color: #555;
                                    padding-bottom: 5px;
                                }
                            }

                            & > .date {
                                & {
                                    font-size: #{$font-size};
                                    color: #aaa;
                                    padding-bottom: 5px;
                                }
                            }

                            & > .tag {
                                & {
                                    font-size: #{$font-size};
                                    color: $bg-blue;
                                }
                            }
                        }
                    }

                    &.img {
                        & {
                            width: 15%;
                            vertical-align: middle;
                        }

                        & > div {
                            & {
                                width: 100%; height: auto;
                                background-color: #ddd;
                            }

                            &:after {
                                content: " ";
                                display: block;
                                padding-bottom: 70%;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
