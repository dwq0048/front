<template>
    <div class="home">
        <div class="profile">
            <div class="thema"></div>
            <div class="intro">
                <div class="info">
                </div>
            </div>
        </div>
        <div class="wrap">
            <div class="navigation">
                <div>
                    <div class="profile">
                        <div>
                            <div class="img">

                            </div>
                            <div class="description">
                                <h1>대충 이름</h1>
                                <span class="level">레밸 : <span>1</span></span>
                            </div>
                        </div>
                        <button type="button" class="btn">
                            <span>로그아웃</span>
                        </button>
                    </div>
                    <div class="options">
                        <div>
                            <h1>
                                <i><font-awesome-icon :icon="faBell" /></i>
                                <span>알림</span>
                            </h1>
                            <ul>
                                <li>어디어디서 댓글이 달렸습니다.</li>
                                <li>127.0.0.1 에서 로그인 했습니다.</li>
                                <li>회원가입을 축하합니다. </li>
                            </ul>
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
                <div class="comment">
                    <div class="top">
                        <h1>방명록</h1>
                        <div>
                            <label for="">
                                <input type="checkbox">
                                <span>글타래 구독</span>
                            </label>
                        </div>
                    </div>
                    <div class="input">
                        <div class="profile">
                            <div></div>
                        </div>
                        <div class="payload">
                            <div>
                                <button type="button" class="plus">
                                    <i><font-awesome-icon :icon="faPlus" /></i>
                                </button>
                                <div class="text">
                                    <div>
                                        <div>
                                            <textarea></textarea>
                                        </div>
                                        <button type="button" class="emoticon">
                                            <i><font-awesome-icon :icon="faSmileWink" /></i>
                                        </button>
                                    </div>
                                </div>
                                <button type="button" class="submit">
                                    <i><font-awesome-icon :icon="faArrowUp" /></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart as faHeartS, faLockOpen, faLock, faPlus, faBell, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartR, faThumbsUp, faSmileWink } from '@fortawesome/free-regular-svg-icons'

export default {
    name: 'AuthHome',
    data(){
        return {
            // Icon
            faHeartS, faLockOpen, faLock, faPlus, faBell, faArrowUp, faSmileWink,
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
                position: relative;
                z-index: 100;
                margin-top: -25px;
                padding: 0 5px;
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

                    & > .profile {
                        & {
                            display: block;
                            width: 100%; height: auto;
                            padding-bottom: 15px;
                        }

                        & > div {
                            & {
                                display: table;
                                width: 100%; height: auto;
                            }

                            & > .img {
                                & {
                                    display: table-cell;
                                    position: relative;
                                    vertical-align: top;
                                    width: 50px; height: auto;
                                    border-radius: 3px;
                                    background-color: #ccc;
                                }

                                &:after {
                                    content: " ";
                                    display: block;
                                    padding-bottom: 100%;
                                }
                            }

                            & > .description {
                                & {
                                    display: table-cell;
                                    vertical-align: top;
                                    width: auto; height: auto;
                                    padding: 5px 10px;
                                }

                                & > h1 {
                                    & {
                                        display: block;
                                        font-size: #{$font-size + 2};
                                        font-weight: bold;
                                        line-height: 1;
                                        color: #555;
                                        padding-bottom: 5px;
                                    }
                                }

                                & > span {
                                    & {
                                        display: block;
                                        font-size: #{$font-size - 2};
                                        font-weight: normal;
                                        color: #aaa;
                                    }
                                }
                            }
                        }

                        & > button.btn {
                            & {
                                display: block;
                                width: 100%; height: 30px;
                                border: 0; background: none;
                                margin: 0; padding: 0;
                                outline: none; cursor: pointer;
                                background-color: $bg-orange;
                                margin-top: 15px;
                                border-radius: 3px;
                                font-size: #{$font-size - 2};
                                letter-spacing: 1px;
                                color: #fff;
                                @include transition(.2s all);
                            }

                            &:hover {
                                & {
                                    background-color: $bg-orange-bold;
                                    @include transition(.2s all);
                                }
                            }
                        }
                    }

                    & > .options {
                        & {
                            width: 100%; height: auto;
                            padding-bottom: 15px;
                        }

                        & > div {
                            & {
                                width: 100%; height: auto;
                                padding: 15px;
                                border-radius: 5px;
                                background-color: #eee;
                                border: 1px solid #e1e1e1;
                            }

                            & > h1 {
                                & {
                                    display: block;
                                    font-size: #{$font-size};
                                    font-weight: bold;
                                    color: #555;
                                    padding-bottom: 10px;
                                }

                                & > i {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                        font-size: #{$font-size - 2};
                                        padding-right: 5px;
                                    }
                                }

                                & > span {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                        letter-spacing: 2px;
                                    }
                                }
                            }

                            & > ul {
                                & {
                                    width: 100%; height: auto;
                                    font-size: 0;
                                    list-style: none;
                                }

                                & > li {
                                    & {
                                        display: block;
                                        width: 100%; height: auto;
                                        font-size: #{$font-size - 2};
                                        line-height: 1.9;
                                        letter-spacing: 1px;
                                    }
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
                    padding: 45px 5px 15px 5px;;
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

                & > .comment {
                    & {
                        display: block;
                    }

                    & > .top {
                        & {
                            width: 100%; height: auto;
                            display: table;
                            background-color: #ddd;
                            border-radius: 2px;
                            padding: 10px 15px;
                        }

                        & > h1 {
                            & {
                                display: table-cell;
                                vertical-align: middle;
                                font-size: #{$font-size + 2};
                                line-height: 1;
                                font-weight: bold;
                                color: 555;
                            }
                        }

                        & > div {
                            & {
                                display: table-cell;
                                vertical-align: middle;
                                text-align: right;
                            }

                            & > label {
                                & {
                                    display: inline-block;
                                    cursor: pointer;
                                }

                                & > input[type=checkbox] {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                    }
                                }

                                & > span {
                                    & {
                                        padding-left: 7px;
                                        display: inline-block;
                                        vertical-align: middle;
                                        color: #555;
                                        font-size: #{$font-size - 2};
                                    }
                                }
                            }
                        }
                    }

                    & > .input {
                        & {
                            display: table;
                            width: 100%; height: auto;
                            padding-top: 15px;
                        }

                        & > .profile {
                            & {
                                display: table-cell;
                                vertical-align: top;
                                width: 40px; height: auto;
                            }

                            & > div {
                                & {
                                    width: 100%; height: auto;
                                    position: relative;
                                    background-color: #ccc;
                                    border-radius: 3px;
                                    overflow: hidden;
                                }

                                &:after {
                                    content: " ";
                                    display: block;
                                    padding-bottom: 100%;
                                }
                            }
                        }

                        & > .payload {
                            & {
                                display: table-cell;
                                vertical-align: top;
                                padding-left: 15px;
                            }

                            & > div {
                                & {
                                    width: 100%; height: auto;
                                    display: table;
                                    border: 1px solid #ddd;
                                    border-radius: 10px;
                                    overflow: hidden;
                                }

                                & > button {
                                    & {
                                        display: table-cell;
                                        border: 0; background: none;
                                        padding: 0; margin: 0;
                                        outline: none; cursor: pointer;
                                    }
                                }

                                & > .plus {
                                    & {
                                        width: 40px; height: auto;
                                        position: relative;
                                    }

                                    & > i {
                                        & {
                                            position: absolute;
                                            left: 50%; top: 50%;
                                            @include transform(translate(-50%, -50%));
                                            color: #555;
                                            font-size: #{$font-size};
                                        }
                                    }

                                    &:after {
                                        content: " ";
                                        display: block;
                                        padding-bottom: 100%;
                                    }
                                }

                                & > .emoticon {
                                    & {
                                        width: 40px; height: auto;
                                        position: relative;
                                    }

                                    & > i {
                                        & {
                                            position: absolute;
                                            left: 50%; top: 50%;
                                            color: #555;
                                            font-size: #{$font-size};
                                            @include transform(translate(-50%, -50%));
                                        }
                                    }

                                    &:after {
                                        content: " ";
                                        display: block;
                                        padding-bottom: 100%;
                                    }
                                }

                                & > .submit {
                                    & {
                                        width: 40px; height: auto;
                                        position: relative;
                                        background-color: $bg-blue;
                                    }

                                    & > i {
                                        & {
                                            position: absolute;
                                            left: 50%; top: 50%;
                                            color: #fff;
                                            font-size: #{$font-size};
                                            @include transform(translate(-50%, -50%));
                                        }
                                    }

                                    &:after {
                                        content: " ";
                                        display: block;
                                        padding-bottom: 100%;
                                    }
                                }

                                & > .text {
                                    & {
                                        display: table-cell;
                                        width: 100%; height: 40px;
                                    }

                                    & > div {
                                        & {
                                            display: table;
                                            width: 100%; height: 100%;
                                        }

                                        & > div {
                                            & {
                                                display: table-cell;
                                                vertical-align: top;
                                                width: 100%; height: 40px;
                                            }
                                            
                                            & > textarea {
                                                display: block;
                                                position: relative;
                                                border: 0; background: none;
                                                margin: 0; padding: 0;
                                                outline: none; resize: none;
                                                font-family: "NS_L";
                                                width: 100%; height: 40px;
                                                padding-top: 10px;
                                                letter-spacing: 1px;
                                            }
                                        }

                                        & > button {
                                            & {
                                                display: table-cell;
                                                position: relative;
                                                width: 40px; height: auto;
                                                border: 0; background: none;
                                                margin: 0; padding: 0;
                                                outline: none; cursor: pointer;
                                            }

                                            & > i {
                                                & {
                                                    position: absolute;
                                                    left: 50%; top: 50%;
                                                    font-size: #{$font-size};
                                                    color: #aaa;
                                                    @include transform(translate(-50%, -50%));
                                                }
                                            }

                                            &:after {
                                                content: " ";
                                                display: block;
                                                padding-bottom: 100%;
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
