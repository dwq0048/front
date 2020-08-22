<template>
    <li>
        <div class="view">
            <div class="no-padding">
                <div class="menu">
                    <div>
                        <div>
                            <div>
                                <i><font-awesome-icon :icon="faHome" /></i>
                            </div>
                        </div>
                        <ul>
                            <li>
                                <div>
                                    <div>
                                        <div>홈페이지</div>
                                    </div>
                                    <span>
                                        <div></div>
                                    </span>
                                </div>
                                <ul>
                                    <li>
                                        <router-link to="/notice">공지사항</router-link>
                                        <router-link to="/blog">블로그</router-link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div>
                            <div>
                                <i><font-awesome-icon :icon="faInfo" /></i>
                            </div>
                        </div>
                        <ul>
                            <li>
                                <div>
                                    <div>
                                        <div>정보</div>
                                    </div>
                                    <span>
                                        <div></div>
                                    </span>
                                </div>
                                <ul>
                                    <li>
                                        <router-link to="/guide">가이드</router-link>
                                        <router-link to="/wiki">위키</router-link>
                                        <router-link to="/qna">질문</router-link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div>
                            <div>
                                <i><font-awesome-icon :icon="faComments" /></i>
                            </div>
                        </div>
                        <ul>
                            <li>
                                <div>
                                    <div>
                                        <div>커뮤니티</div>
                                    </div>
                                    <span>
                                        <div></div>
                                    </span>
                                </div>
                                <ul>
                                    <li>
                                        <router-link to="/free">자유게시판</router-link>
                                        <router-link to="/photo">VR 포토</router-link>
                                        <router-link to="/video">VR 영상</router-link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faInfo, faComments } from '@fortawesome/free-solid-svg-icons'

export default {
    name: 'navMenu',
    data() {
        return {
            faHome, faInfo, faComments
        }
    }
}
</script>

<style lang="scss" scoped>
    .view {
        & {
            display: block;
        }

        & > div {
            & {
                padding: 30px 15px;
            }

            
            .menu {
                
                & > div {
                    & > div {
                        & {
                            width: 15%;
                            display: inline-block;
                            vertical-align: top;
                            font-size: 0;
                        }

                        & > div {
                            & {
                                width: 100%;
                                height: auto;
                                padding-top: 100%;
                                position: relative;
                            }

                            & > i {
                                color: #c4c4c4;
                                font-size: #{$font-size - 2};
                                position: absolute;
                                left: 50%; top: 50%;
                                @include transform(translate(-50%, -50%));
                            }
                        }
                    }

                    & > ul {
                        & {
                            width: 85%;
                            display: inline-block;
                            vertical-align: top;
                            font-size: 0;
                            background-color: #555;
                        }

                        & > li {
                            & {
                                display: block;
                            }

                            & > div {
                                & {
                                    font-size: #{$font-size};
                                    font-weight: bold;
                                    color: #c4c4c4;
                                    background-color: #353535;
                                    width: 100%;
                                    height: 52.19px;
                                    padding-left: 20px;
                                    display: block;
                                    position: relative;
                                    cursor: pointer;
                                }

                                & > div {
                                    & {
                                        display: table;
                                        height: 100%;
                                    }

                                    & > div {
                                        display: table-cell;
                                        vertical-align: middle;
                                    }
                                }

                                & > span {
                                    & {
                                        display: block;
                                        position: absolute;
                                        right: 25px; top: 50%;
                                        @include transform(translateY(-50%));
                                    }

                                    & > div {
                                        & {
                                            width: 10px;
                                            height: 10px;
                                            position:relative;
                                            @include transform(rotate(-45deg));
                                        }

                                        &::after {
                                            content: " ";
                                            display: block;
                                            width: 100%;
                                            height: 2px;
                                            position: absolute;
                                            left:0; bottom: 0;
                                            background-color: #c4c4c4;
                                        }

                                        &::before {
                                            content: " ";
                                            display: block;
                                            height: 100%;
                                            width: 2px;
                                            position: absolute;
                                            left:0; bottom: 0;
                                            background-color: #c4c4c4;
                                        }
                                    }
                                    
                                }
                            }

                            & > ul {
                                & {
                                    font-size: 0;
                                    text-decoration: none;
                                }

                                & > li {
                                    & {
                                        padding-bottom: 50px;
                                    }

                                    & > a {
                                        display: block;
                                        padding: 15px 20px;
                                        font-size: #{$font-size};
                                        text-decoration: none;
                                        color: #f1f1f1;
                                        @include transition(all .2s)
                                    }

                                    & > a:hover {
                                        background-color: #515151;
                                        color: #fff;
                                        @include transition(all .2s);
                                    }
                                }
                            }
                        }

                    }
                }
                
            }


        }

        & > div.no-padding {
            padding: 0;
        }
    }
</style>