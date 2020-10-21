<template>
    <div class="home">
        <div class="profile">
            <div class="thema"></div>
            <div class="intro">
                <div class="info">
                    <div class="img">

                    </div>
                    <div class="text">
                        <h1>대충 내 닉네임</h1>
                        <div class="options">
                            <ul>
                                <li>
                                    <span>좋아요</span>
                                    <i>0</i>
                                </li>
                                <li>
                                    <span>오늘 방문자</span>
                                    <i>0</i>
                                </li>
                                <li>
                                    <span>총 방문자</span>
                                    <i>0</i>
                                </li>
                            </ul>
                        </div>
                        <div class="description">
                            프로필 설명이 없습니다.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrap">
            <div class="navigation">
                <div>
                    <div class="options">
                        <div class="last_date">
                            <h1>마지막 로그인</h1>
                            <span>하루 전</span>
                        </div>
                    </div>
                    <div class="menu">
                        <ul>
                            <li>
                                <router-link to="#">
                                    <div>
                                        <h1>게시글</h1>
                                        <span>[0]</span>
                                    </div>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="#">
                                    <div>
                                        <h1>이미지</h1>
                                        <span>[0]</span>
                                    </div>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="#">
                                    <div>
                                        <h1>댓글</h1>
                                        <span>[0]</span>
                                    </div>
                                </router-link>
                            </li>
                            <li class="line"></li>
                            <li>
                                <router-link to="#">
                                    <div>
                                        <h1>해시 태그</h1>
                                        <span>[0]</span>
                                    </div>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="#">
                                    <div>
                                        <h1>방명록</h1>
                                        <span>[0]</span>
                                    </div>
                                </router-link>
                            </li>
                            <li class="line"></li>
                            <li>
                                <router-link to="#">
                                    <div>
                                        <h1>통계</h1>
                                        <span>[0]</span>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="post">
                <div class="hash">
                    <ul>
                        <li>
                            <router-link to="#">
                                <i><font-awesome-icon :icon="faHashtag" /></i>
                                <span>이미지</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="#">
                                <i><font-awesome-icon :icon="faHashtag" /></i>
                                <span>자유</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="#">
                                <i><font-awesome-icon :icon="faHashtag" /></i>
                                <span>게임</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="#">
                                <i><font-awesome-icon :icon="faHashtag" /></i>
                                <span>3D</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="#">
                                <i><font-awesome-icon :icon="faHashtag" /></i>
                                <span>일기</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="art">
                    <div class="title">
                        <h1>
                            <span>최신 이미지</span>
                            <i><font-awesome-icon :icon="faLockOpen" /></i>
                        </h1>
                        <div class="btn">
                            <router-link to="#">
                                <span>더보기</span>
                                <i><font-awesome-icon :icon="faPlus" /></i>
                            </router-link>
                        </div>
                    </div>
                    <ul>
                        <li><div></div></li>
                        <li><div></div></li>
                        <li><div></div></li>
                        <li><div></div></li>
                        <li><div></div></li>
                        <li><div></div></li>
                    </ul>
                </div>
                <div class="list">
                    <div class="title">
                        <h1>
                            <span>최신 게시글</span>
                            <i><font-awesome-icon :icon="faLockOpen" /></i>
                        </h1>
                        <div class="btn">
                            <router-link to="#">
                                <span>더보기</span>
                                <i><font-awesome-icon :icon="faPlus" /></i>
                            </router-link>
                        </div>
                    </div>
                    <ul>
                        <li v-for="(item, i) in list" :key="i">
                            <table>
                                <tr>
                                    <td class="love">
                                        <i><font-awesome-icon :icon="faHeartR" /></i>
                                        <span>0</span>
                                    </td>
                                    <td class="title">대충 제목 - 1</td>
                                    <td class="date">방금전</td>
                                    <td class="view">
                                        <span>조회수<span>0</span></span>
                                    </td>
                                </tr>
                            </table>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faLockOpen, faLock, faPlus, faHeart as faHeartS, faHashtag } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartR, faThumbsUp } from '@fortawesome/free-regular-svg-icons'

export default {
    name: 'AuthHome',
    data(){
        return {
            // Icon
            faLockOpen, faLock, faPlus, faHeartS, faHashtag, 
            faHeartR, faThumbsUp,

            list : [{},{},{},{},{}]
        }
    }
}
</script>

<style lang="scss" scoped>
    .home {
        & > .profile {
            & {
                padding: 15px;
            }

            & > .thema {
                & {
                    width: 100%; height: auto;
                    background-color: #ccc;
                    position: relative;
                }

                &:after {
                    content: " ";
                    display: block;
                    width: 100%; height: auto;
                    padding-bottom: 20%;
                }
            }

            & > .intro {
                & {
                    width: 100%; height: auto;
                    margin-top: -25px;
                    padding: 0 15px;
                    display: table;
                }

                & > .info {
                    & {
                        display: table-cell;
                        vertical-align: top;
                        font-size: 0;
                    }

                    & > .img {
                        & {
                            width: 100px; height: auto;
                            position: relative;
                            display: inline-block;
                            overflow: hidden;
                            background-color: #999;
                            border-radius: 50%;
                            vertical-align: top;
                        }

                        &:after {
                            content: " ";
                            display: block;
                            padding-bottom: 100%;
                        }
                    }

                    & > .text {
                        & {
                            width: auto; height: auto;
                            display: inline-block;
                            vertical-align: top;
                            padding: 50px 15px 0 15px;
                        }

                        & > h1 {
                            & {
                                font-size: #{$font-size + 4};
                                line-height: 1;
                                color: #333;
                                padding-bottom: 10px;
                            }
                        }

                        & > .options {
                            & > ul {
                                & {
                                    display: inline-block;
                                    white-space: nowrap;
                                    font-size: 0;
                                    list-style: none;
                                }

                                & > li {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                        font-size: #{$font-size - 2};
                                        color: #999;
                                        padding-left: 10px;
                                    }

                                    &:nth-child(1){
                                        & {
                                            padding-left: 0;
                                        }
                                    }

                                    & > span {
                                        & {
                                            display: inline-block;
                                            vertical-align: middle;
                                        }
                                    }

                                    & > i {
                                        & {
                                            display: inline-block;
                                            vertical-align: middle;
                                            font-style: normal;
                                            padding-left: 5px;
                                            font-weight: bold;
                                        }
                                    }
                                }
                            }
                        }
                        & > .description {
                            & {
                                width: 100%; height: auto;
                                font-size: #{$font-size};
                                margin-top: 15px;
                                color: #555;
                                line-height: 1.3;
                                letter-spacing: 1px;
                            }
                        }
                    }
                }
            }
        }

        & > .wrap {
            & {
                width: 100%; height: auto;
                display: table;
            }

            & > .navigation {
                & {
                    display: table-cell;
                    vertical-align: top;
                    width: 300px; height: auto;
                    padding: 15px 15px;
                }

                & > div {
                    & {
                        display: block;
                        width: 100%; height: auto;
                        border-radius: 3px;
                        padding: 15px;
                        background-color: #f9f9f9;
                        border: 1px solid #eee;
                        @include box-shadow(2px 2px 5px rgba(0,0,0,0.1));
                    }

                    & > .options {
                        & {
                            width: 100%; height: auto;
                        }

                        & > .last_date {
                            & {
                                width: 100%; height: auto;
                                padding: 0 5px 15px 5px;
                            }

                            & > h1 {
                                & {
                                    display: block;
                                    font-size: #{$font-size + 2};
                                    color: #555;
                                    font-weight: bold;
                                    line-height: 1;
                                    padding-bottom: 10px;
                                }
                            }

                            & > span {
                                & {
                                    display: block;
                                    font-size: #{$font-size};
                                    color: #aaa;
                                    line-height: 1;
                                }
                            }
                        }
                    }

                    & > .menu {
                        & {
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
                                    display: block;
                                    width: 100%; height: auto;
                                }

                                &.line {
                                    & {
                                        width: 100%; height: 0;
                                        border-bottom: 1px solid #ddd;
                                        margin: 10px 0;
                                    }
                                }

                                & > a {
                                    & {
                                        display: table;
                                        width: 100%; height: auto;
                                        text-decoration: none;
                                        cursor: pointer;
                                        color: #555;
                                    }

                                    & > div {
                                        & {
                                            display: table-cell;
                                            vertical-align: middle;
                                            width: 100%; height: auto;
                                            font-size: 0;
                                            padding: 10px 5px;
                                            line-height: 1;
                                        }

                                        & > h1 {
                                            & {
                                                display: inline-block;
                                                vertical-align: middle;
                                                font-size: #{$font-size + 2};
                                                font-weight: bold;
                                                line-height: 1;
                                            }
                                        }

                                        & > span {
                                            & {
                                                display: inline-block;
                                                vertical-align: middle;
                                                font-size: #{$font-size};
                                                color: $bg-blue;
                                                line-height: 1;
                                                padding-left: 10px;
                                                letter-spacing: 1px;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            & > .post {
                & {
                    display: table-cell;
                    vertical-align: top;
                    width: auto;; height: auto;
                    padding: 15px 5px;
                    font-size: 0;
                }

                & > div {
                    & {
                        width: 100%;
                        display: inline-block;
                        vertical-align: top;
                        padding: 0 10px;
                    }
                    
                    & > .title {
                        & {
                            display: table;
                            width: 100%; height: auto;
                            padding: 15px;
                            border-bottom: 1px solid #ddd;   
                        }

                        & > h1 {
                            & {
                                display: table-cell;
                                color: #555;
                                line-height: 1;
                            }

                            & > span {
                                & {
                                    display: inline-block;
                                    vertical-align: middle;
                                    font-size: #{$font-size + 4};
                                    font-weight: bold;
                                }
                            }

                            & > i {
                                & {
                                    display: inline-block;
                                    vertical-align: middle;
                                    font-size: #{$font-size - 2};
                                    padding-left: 10px;
                                    color: $bg-orange;
                                }
                            }
                        }

                        & > .btn {
                            & {
                                display: table-cell;
                                vertical-align: middle;
                                text-align: right;
                            }

                            & > a {
                                & {
                                    display: inline-block;
                                    vertical-align: middle;
                                    text-decoration: none;
                                    color: $bg-blue;
                                    font-size: #{$font-size};
                                }

                                & > i {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                        padding-left: 5px;
                                        font-size: #{$font-size - 2};
                                    }
                                }

                                & > span {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                        font-weight: bold;
                                    }
                                }
                            }
                        }
                    }
                }

                & > .hash {
                    & {
                        width: 100%; height: auto;
                        padding: 0 15px;
                    }

                    & > ul {
                        & {
                            display: block;
                            list-style: none;
                            font-size: 0;
                            white-space: nowrap;
                            overflow: hidden;
                        }

                        & > li {
                            & {
                                display: inline-block;
                                vertical-align: middle;
                                padding-right: 10px;
                            }

                            & > a {
                                & {
                                    display: block;
                                    text-decoration: none;
                                    font-size: #{$font-size + 2};
                                    color: $bg-blue;
                                }

                                & > i {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                        font-size: #{$font-size};
                                        padding-right: 5px;
                                    }
                                }

                                & > span {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                        font-weight: bold;
                                    }
                                }

                                &:hover {
                                    & {
                                        text-decoration: underline;
                                    }

                                    & > span {
                                        & {
                                            text-decoration: underline;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                & > .art {
                    & > ul {
                        & {
                            width: 100%; height: auto;
                            display: block;
                            font-size: 0;
                            list-style: none;
                            padding: 5px 0;
                        }

                        & > li {
                            & {
                                display: inline-block;
                                width: calc(100% / 6); height: auto;
                                padding: 5px;
                            }

                            & > div {
                                & {
                                    display: block;
                                    position: relative;
                                    width: 100%; height: auto;
                                    padding-bottom: 100%;
                                    background-color: #ccc;
                                    border-radius: 3px;
                                    overflow: hidden;
                                }
                            }
                        }
                    }
                }

                & > .list {
                    & > ul {
                        & {
                            width: 100%; height: auto;
                            font-size: 0;
                            list-style: none;
                            padding-bottom: 10px;
                        }

                        & > li {
                            & {
                                display: block;
                                width: 100%; height: 35px;
                                font-size: #{$font-size - 2};
                            }

                            & > table {
                                & {
                                    width: 100%; height: 35px;
                                }

                                & > tr {
                                    & > td {
                                        & {
                                            vertical-align: middle;
                                        }
                                        &.love {
                                            & {
                                                width: 10%;
                                                text-align: center;
                                                color: #999;
                                            }

                                            & > i {
                                                & {
                                                    display: inline-block;
                                                    padding-right: 5px;
                                                }
                                            }
                                        }

                                        &.title {
                                            & {
                                                width: 50%;
                                                font-weight: bold;
                                                font-size: #{$font-size};
                                            }
                                        }

                                        &.date {
                                            & {
                                                width: 20%;
                                                text-align: center;
                                            }
                                        }

                                        &.view {
                                            & {
                                                width: 20%;
                                            }

                                            & > span {
                                                & {
                                                    display: block;
                                                    width: 100%; height: auto;
                                                }

                                                & > span {
                                                    & {
                                                        padding-left: 5px;
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
    }
</style>
