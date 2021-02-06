<template>
    <div class="profile">
        <h1>프로필 수정</h1>
        <ul>
            <li class="image">
                <div>
                    <h1>프로필 사진</h1>
                    <div>
                        <p>
                            기기의 Jpeg, Jpg, Png 파일을 업로드 해주세요
                            <br />
                            최소 120px x 120px 사이즈 이상의 이미지를 업로드 해주세요( 필수아님 )
                        </p>
                        <div>
                            <ul>
                                <li>
                                    <div></div>
                                </li>
                                <li>
                                    <div></div>
                                </li>
                                <li>
                                    <div></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <button type="button">
                        <div>
                            <span>사진 업로드</span>
                        </div>
                    </button>
                </div>
            </li>
            <li class="nickname">
                <div>
                    <h1>닉네임 변경</h1>
                    <div>
                        <p>
                            하루에 최대 1번 ( 한국기준 오전 12시 ) 변경 가능 합니다.
                        </p>
                        <div>
                            <div class="form-input">
                                <div class="input">
                                    <input type="text">
                                </div>
                                <div class="button">
                                    <button type="button">
                                        <div>
                                            <span>중복 검사</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name : 'SettingProfile'
}
</script>

<style lang="scss" scoped>
    .profile {
        & {
            display: block;
            width: 100%; height: auto;
            background-color: #fff;
            border-radius: 5px;
            padding: 15px;
            @include box-shadow(2px 2px 5px rgba(0,0,0,0.1));
        }

        & > h1 {
            & {
                display: block;
                font-size: #{$font-size + 10};
                font-weight: bold;
                color: #999;
                line-height: 1;
                padding-bottom: 10px;
            }
        }

        & > ul {
            & {
                display: block;
                width: 100%; height: auto;
                list-style: 0;
                font-size: 0;
            }

            & > li {
                & {
                    display: block;
                    width: 100%; height: auto;
                    border-bottom: 1px solid #ddd;
                }
                
                & > div {
                    & {
                        display: block;
                        width: 100%; height: auto;
                        padding: 15px;
                    }

                    & > h1 {
                        & {
                            display: block;
                            font-size: #{$font-size + 5};
                            color: #555;
                            line-height: 1;
                            text-align: left;
                        }
                    }

                    & > div {
                        & {
                            padding: 10px 0;
                        }

                        & > p {
                            & {
                                display: block;
                                width: 100%; height: auto;
                                font-size: #{$font-size};
                                margin: 0; padding: 0;
                                line-height: 1.3;
                                letter-spacing: 1px;
                                padding: 0 0 15px 5px;
                                text-align: left;
                            }
                        }
                    }
                }

                /* 이미지 수정 */
                &.image {
                    & > div {
                        & {
                            text-align: right;
                        }

                        & > div {
                            & {
                                text-align: left;
                            }

                            & > div {
                                & > ul {
                                    & {
                                        display: block;
                                        width: 100%; height: auto;
                                        list-style: none;
                                        font-size: 0;
                                    }

                                    & > li {
                                        & {
                                            display: inline-block;
                                            vertical-align: bottom;
                                            padding-right: 30px;
                                        }

                                        & > div {
                                            & {
                                                position: relative;
                                                display: block;
                                                width: 90px; height: auto;
                                                border-radius: 3px;
                                                border: 1px solid #ddd;
                                                background-color: #ccc;
                                                overflow: hidden;
                                            }

                                            &:after {
                                                content: " ";
                                                display: block;
                                                padding-bottom: 100%;
                                            }
                                        }

                                        &:nth-child(1){
                                            & > div {
                                                & {
                                                    width: 120px;
                                                }
                                            }
                                        }

                                        &:nth-child(2){
                                            & > div {
                                                & {
                                                    width: 90px;
                                                }
                                            }
                                        }

                                        &:nth-child(3){
                                            & > div {
                                                & {
                                                    width: 60px;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        & > button {
                            & {
                                display: inline-block;
                                border: 0; background: none;
                                margin: 0; padding: 0;
                                outline: none; cursor: pointer;
                                background-color: $bg-blue;
                                font-size: #{$font-size};
                                color: #fff;
                                padding: 7px 25px;
                                border-radius: 2px;
                            }
                        }
                    }
                }
                /* 이미지 수정 끝 */

                /* 닉네임 수정 */
                &.nickname {
                    & > div {
                        & > div {
                            & > div {
                                & > .form-input {
                                    & {
                                        display: table;
                                        width: 100%; height: 35px;
                                        border: 1px solid #ddd;
                                    }

                                    & > .input {
                                        & {
                                            display: table-cell;
                                            vertical-align: middle;
                                            width:100%; height: 100%;
                                        }

                                        & > input {
                                            & {
                                                display: block;
                                                width: 100%; height: 100%;
                                                padding: 0; margin: 0;
                                                border: 0; background: none;
                                                outline: none;
                                            }
                                        }
                                    }

                                    & > .button {
                                        & {
                                            display: table-cell;
                                            vertical-align: middle;
                                            width: auto; height: auto;
                                            text-align: right;
                                            font-size: 0;
                                            padding-right: 5px;
                                            white-space: nowrap;
                                        }

                                        & > button {
                                            & {
                                                display: inline-block;
                                                border: 0; background: none;
                                                padding: 0; margin: 0;
                                                outline: none; cursor: pointer;
                                                background-color: $bg-orange;
                                                border-radius: 5px;
                                            }

                                            & > div {
                                                & {
                                                    font-size: 0;
                                                }
                                                
                                                & > span {
                                                    & {
                                                        display: inline-block;
                                                        vertical-align: middle;
                                                        font-size: #{$font-size - 2};
                                                        color: #fff;
                                                        padding: 5px 15px;
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
                /* 닉네임 수정 끝 */
            }
        }
    }
</style>
