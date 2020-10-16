<template>
    <div class="setting">
        <div class="wrap">
            <div class="section half">
                <div class="title">
                    <h1>프로필 설정</h1>
                </div>
                <div class="set">
                    <div class="profile">
                        <div class="xs">

                        </div>
                        <div class="ms">

                        </div>
                        <div class="cs">

                        </div>
                    </div>
                </div>
                <div class="set">
                    <table>
                        <tr>
                            <td>닉네임</td>
                            <td>뭐시기 닉네임</td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td>dwq0048@gmail.com</td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td>비공개</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="section half">
                <div class="title">
                    <h1>공개/알림 설정</h1>
                </div>
                <div class="set">
                    <table>
                        <tr>
                            <td>게시글</td>
                            <td>공개</td>
                        </tr>
                        <tr>
                            <td>댓글</td>
                            <td>공개</td>
                        </tr>
                        <tr>
                            <td>좋아요</td>
                            <td>공개</td>
                        </tr>
                    </table>
                </div>
                <div class="set">
                    <table>
                        <tr>
                            <td>내 게시물 댓글</td>
                            <td>알림</td>
                        </tr>
                        <tr>
                            <td>댓글 언급</td>
                            <td>알림</td>
                        </tr>
                        <tr>
                            <td>채팅</td>
                            <td>알림</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="section">
                <div class="title">
                    <h1>계정 연동</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AuthSetting'
}
</script>

<style lang="scss" scoped>
    .setting {
        & {
            width: 100%; height: auto;
            padding: 10px 15px;
        }

        & > div.wrap {
            & {
                display: block;
                width: 100%; height: auto;
                font-size: 0;
            }

            & > .section {
                & {
                    width: 100%; height: auto;
                    display: inline-block;
                    padding: 0 15px;
                }

                & > .title {
                    & {
                        display: table;
                        width: 100%; height: auto;
                        border-bottom: 1px solid #ddd;
                        padding: 10px 15px;
                    }
                    
                    & > h1 {
                        & {
                            display: table-cell;
                            font-size: #{$font-size + 4};
                            font-weight: bold;
                            color: #333;
                        }
                    }
                }

                & > .set {
                    & {
                        display: block;
                        width: 100%; height: auto;
                    }

                    & > table {
                        & {
                            font-size: #{$font-size};
                            padding: 15px;
                            letter-spacing: 1px;
                            line-height: 2;
                        }

                        & > tr {
                            & > td:nth-child(1) {
                                & {
                                    font-weight: bold;
                                    padding-right: 15px;
                                }
                            }
                        }
                    }

                    & > .profile {
                        & {
                            display: block;
                            width: 100%; height: auto;
                            padding: 15px;
                        }

                        & > div {
                            & {
                                display: inline-block;
                                position: relative;
                                vertical-align: bottom;
                                margin-right: 20px;
                                border-radius: 2px;
                                background-color: #555;
                            }

                            &:after {
                                content: " ";
                                display: block;
                                padding-bottom: 100%;
                            }
                        }

                        & > .xs {
                            & {
                                width: 100px;
                            }
                        }

                        & > .ms {
                            & {
                                width: 60px;
                            }
                        }

                        & > .cs {
                            & {
                                width: 40px;
                                border-radius: 50%;
                            }
                        }
                    }
                }
            }

            & > .half {
                & {
                    width: 50%;
                    vertical-align: top;
                }    
            }

            &:after {
                & {
                    content: " ";
                    display: block;
                    clear: both;
                }
            }
        }
    }
</style>
