<template>
    <div class="profile">
        <div class="title">
            <h1>
                <router-link to="#">내 프로필</router-link>
            </h1>
            <span>
			    <i><font-awesome-icon :icon="faChevronRight" /></i>
            </span>
            <h2>프로필 수정</h2>
        </div>
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
                                    <div>
                                        <input type="text">
                                    </div>
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
            <li class="description">
                <div>
                    <h1>프로필 설명</h1>
                    <div>
                        <p>
                            asdsad
                        </p>
                        <div>
                            <div class="text-area">
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="submit">
            <div>
                <div class="right">
                    <button type="button">
                        <div>
                            <span>프로필 저장</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const userStore = 'userStore'

export default {
    name : 'SettingProfile',
    data(){
        return {
            // Icons
            faChevronRight,

            info : false
        }
    },
    computed: {},
    methods : {
		...mapActions(userStore, [
            'USER_DETAILS'
		]),
    },
    created(){
        this.USER_DETAILS().then((req) => {
            console.log(req);
        }).catch((err) => {
            console.log(err);
        });
    },
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

        & > .title {
            & {
                display: block;
                width: 100%; height: auto;
                font-size: 0;
                list-style: none;
                padding: 10px 15px;
            }

            & > h1 {
                & {
                    display: inline-block;
                    vertical-align: bottom;
                    font-size: #{$font-size + 10};
                    font-weight: bold;
                    line-height: 1;
                }

                & > a {
                    & {
                        display: block;
                        color: $bg-blue;
                        text-decoration: none;
                    }
                }

                &:hover {
                    & {
                        text-decoration: underline;
                    }
                }
            }

            & > span {
                & {
                    display: inline-block;
                    vertical-align: bottom;
                    font-size: #{$font-size};
                    font-weight: bold;
                    line-height: 1;
                    padding: 0 10px;
                    color: #555;
                }
            }

            & > h2 {
                & {
                    display: inline-block;
                    vertical-align: bottom;
                    font-size: #{$font-size};
                    line-height: 1;
                    color: #555;
                }
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

                &:nth-last-child(1){
                    & {
                        border-bottom: 0;
                    }
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
                                font-weight: bold;
                                margin: 0; padding: 0;
                                line-height: 1.3;
                                letter-spacing: 1px;
                                padding: 0 0 15px 1px;
                                color: #999;
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
                                border-radius: 5px;
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
                                    }

                                    & > .input {
                                        & {
                                            display: table-cell;
                                            vertical-align: middle;
                                            width:100%; height: 100%;
                                            padding-right: 15px;
                                        }

                                        & > div {
                                            & {
                                                display: block;
                                                width: 100%; height: 100%;
                                                border: 1px solid #ddd;
                                                border-radius: 5px;
                                            }

                                            & > input {
                                                & {
                                                    display: block;
                                                    width: 100%; height: 100%;
                                                    padding: 0; margin: 0;
                                                    border: 0; background: none;
                                                    outline: none;
                                                    padding: 0 15px;
                                                    font-size: #{$font-size};
                                                    color: #555;
                                                    letter-spacing: 1px;
                                                }
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
                                            white-space: nowrap;
                                        }

                                        & > button {
                                            & {
                                                display: inline-block;
                                                width: auto; height: 100%;
                                                border: 0; background: none;
                                                padding: 0; margin: 0;
                                                outline: none; cursor: pointer;
                                                background-color: $bg-blue;
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
                                                        font-size: #{$font-size};
                                                        color: #fff;
                                                        padding: 0px 30px;
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

                /* 프로필 설명 */
                &.description {
                    & > div {
                        & > div {
                            & > div {
                                & > .text-area {
                                    & {
                                        display: block;
                                        width: 100%; height: 100px;
                                    }

                                    & > div {
                                        & {
                                            display: block;
                                            width: 100%; height: 100%;
                                            border: 1px solid #ddd;
                                            border-radius: 5px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                /* 프로필 설명 끝 */
            }
        }

        & > .submit {
            & {
                display: block;
                width: 100%; height: auto;
            }

            & > div {
                & {
                    display: table;
                    width: 100%; height: auto;
                    font-size: 0;
                    padding: 0 15px;
                }

                & > .right {
                    & {
                        display: table-cell;
                        vertical-align: middle;
                        text-align: right;
                        white-space: nowrap;
                    }

                    & > button {
                        & {
                            display: inline-block;
                            border: 0; background: none;
                            padding: 0; margin: 0;
                            outline: none; cursor: pointer;
                            padding: 10px 30px;
                            background-color: $bg-orange;
                            border-radius: 3px;
                            color: #fff;
                        }

                        & > div {
                            & {
                                display: block;
                                font-size: 0;
                            }

                            & > span {
                                & {
                                    display: inline-block;
                                    vertical-align: middle;
                                    font-size: #{$font-size};
                                    font-weight: bold;
                                    line-height: 1;
                                }
                            }

                            & > i {
                                & {
                                    display: inline-block;
                                    vertical-align: middle;
                                    font-size: #{$font-size};
                                    padding-right: 5px;
                                    line-height: 1;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
