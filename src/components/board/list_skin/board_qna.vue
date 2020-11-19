<template>
    <div class="qna">
        <div class="side">
            <div>
                <ul class="description">
                    <li class="wait">
                        <button type="button">
                            <div></div>
                            <span>답변을 기다립니다.</span>
                        </button>
                    </li>
                    <li>
                        <button type="button">
                            <div></div>
                            <span>채택을 기다립니다.</span>
                        </button>
                    </li>
                    <li class="check">
                        <button type="button">
                            <div></div>
                            <span>채택된 질문</span>
                        </button>
                    </li>
                </ul>
                <div class="new-hash">
                    <div class="title">
                        <h1>최신 태그</h1>
                    </div>
                    <ul>
                        <li v-for="(item, i) in TempHashs" :key="i">
                            <button type="button">
                                <i><font-awesome-icon :icon="faHashtag" /></i>
                                <span>{{ item.ko }}</span>
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="new-hash">
                    <div class="title">
                        <h1>인기 태그</h1>
                    </div>
                    <ul>
                        <li v-for="(item, i) in TempHashs" :key="i">
                            <button type="button">
                                <i><font-awesome-icon :icon="faHashtag" /></i>
                                <span>{{ item.ko }}</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <ul>
            <li v-for="(item, i) in Template" :key="i">
                <div>
                    <div class="bar" :class="{ blue : (item.option.state == 0), orange : (item.option.state == 1) }"></div>
                    <div class="intro">
                        <div class="description">
                            <div class="title">
                                <h1>{{ item.title }}</h1>
                            </div>
                            <div class="text">
                                <div>
                                    {{ item.text }}
                                </div>
                            </div>
                            <div class="hash">
                                <ul>
                                    <li>
                                        <button type="button">
                                            <i><font-awesome-icon :icon="faHashtag" /></i>
                                            <span>태그 1</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button">
                                            <i><font-awesome-icon :icon="faHashtag" /></i>
                                            <span>태그 2</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button">
                                            <i><font-awesome-icon :icon="faHashtag" /></i>
                                            <span>태그 3</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="image">
                            <div>
                                <i><font-awesome-icon :icon="faImage" /></i>
                            </div>
                        </div>
                    </div>
                    <div class="options">
                        <div class="left">
                            <ul>
                                <li class="profile">
                                    <div>
                                        <div class="img"></div>
                                        <div class="name">
                                            <span>{{ item.name }}</span>
                                        </div>
                                    </div>
                                </li>
                                <li class="answer">
                                    <span>답변 :</span>
                                    <span>0</span>
                                </li>
                                <li class="date">
                                    <span>{{ item.date }}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="right">
                            <ul>
                                <li>
                                    <button type="buttpn">
                                        <span>의견 남기기</span>
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="submit">
                                        <span>답변 남기기</span>
                                        <i><font-awesome-icon :icon="faCaretRight" /></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHashtag, faCaretRight, faImage } from '@fortawesome/free-solid-svg-icons'

export default {
    name: 'BoardQna',
    data(){
        return {
            // Icons
            faHashtag, faCaretRight, faImage,
            
            Template : [
                {
                    option : {
                        state : 0
                    },
                    title : '안녕하세요',
                    text : "하하하호호호후후후... 후휴허하ㅏ히히호호호",
                    name : "관리자",
                    date : "방금전"
                },
                {
                    option : {
                        state : 1
                    },
                    title : '안녕하세요',
                    text : "하하하호호호후후후... 후휴허하ㅏ히히호호호",
                    name : "관리자",
                    date : "방금전"
                },
                {
                    option : {
                        state : 2
                    },
                    title : '안녕하세요',
                    text : "하하하호호호후후후... 후휴허하ㅏ히히호호호",
                    name : "관리자",
                    date : "방금전"
                },
                {
                    option : {
                        state : 0
                    },
                    title : '안녕하세요',
                    text : "하하하호호호후후후... 후휴허하ㅏ히히호호호",
                    name : "관리자",
                    date : "방금전"
                },
                {
                    option : {
                        state : 0
                    },
                    title : '안녕하세요',
                    text : "하하하호호호후후후... 후휴허하ㅏ히히호호호",
                    name : "관리자",
                    date : "방금전"
                },
                {
                    option : {
                        state : 0
                    },
                    title : '안녕하세요',
                    text : "하하하호호호후후후... 후휴허하ㅏ히히호호호",
                    name : "관리자",
                    date : "방금전"
                },
                {
                    option : {
                        state : 0
                    },
                    title : '안녕하세요',
                    text : "하하하호호호후후후... 후휴허하ㅏ히히호호호",
                    name : "관리자",
                    date : "방금전"
                },
                {
                    option : {
                        state : 1
                    },
                    title : '안녕하세요',
                    text : "하하하호호호후후후... 후휴허하ㅏ히히호호호",
                    name : "관리자",
                    date : "방금전"
                },
                {
                    option : {
                        state : 0
                    },
                    title : '안녕하세요',
                    text : "하하하호호호후후후... 후휴허하ㅏ히히호호호",
                    name : "관리자",
                    date : "방금전"
                },
                {
                    option : {
                        state : 2
                    },
                    title : '안녕하세요',
                    text : "하하하호호호후후후... 후휴허하ㅏ히히호호호",
                    name : "관리자",
                    date : "방금전"
                },
            ],

            TempHashs : [
                { ko : '사진' },
                { ko : 'Vrchat' },
                { ko : 'VR 기기' },
                { ko : '오큘러스_리프트' },
                { ko : '이것저것' },
                { ko : '바이브' },
                { ko : '스팀' },
                { ko : '아주아주긴태그를달아보자' },
                { ko : '컨트롤러' },
                { ko : '게임' },
                { ko : '내공냠냠' },
                { ko : '컴퓨터_사양' },
                { ko : '컴튜터' },
                { ko : '모델링' },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
    .qna {
        & {
            display: table;
            width: 100%; height: auto;
        }

        & > .side {
            & {
                display: table-cell;
                vertical-align: top;
                width: 170px; height: auto;
                border-right: 1px solid #ddd;
            }

            & > div {
                & {
                    display: block;
                    width: 100%; height: auto;
                    max-width: 170px;
                    overflow: hidden;
                }

                & > .description {
                    & {
                        display: block;
                        width: 100%; height: auto;
                        list-style: none;
                        font-size: 0;
                        overflow: hidden;
                    }

                    & > li {
                        & {
                            display: block;
                            width: 100%; height: auto;
                        }

                        & > button {
                            & {
                                display: block;
                                position: relative;
                                width: 100%; height: auto;
                                outline: none; cursor: pointer;
                                background: none; border: 0;
                                padding: 0; margin: 0;
                                text-align: left;
                                background-color: #fff;
                                @include transition(.2s all);
                            }

                            & > div {
                                & {
                                    position: absolute;
                                    left: 0; top: 0;
                                    width: 6px; height: 100%;
                                    background-color: #ddd;
                                }
                            }

                            & > span {
                                & {
                                    display: block;
                                    width: 100%; height: auto;
                                    padding: 15px 15px 15px 20px;
                                    font-size: #{$font-size -2};
                                    font-weight: bold;
                                    color: #555;
                                }
                            }

                            &:hover {
                                & {
                                    background-color: #f1f1f1;
                                    @include transition(.2s all);
                                }
                            }
                        }

                        &.wait {
                            & > button {
                                & > div {
                                    & {
                                        background-color: $bg-blue;
                                    }
                                }
                            }
                        }

                        &.check {
                            & > button {
                                & > div {
                                    & {
                                        background-color: $bg-orange;
                                    }
                                }
                            }
                        }
                    }
                }

                & > .new-hash{
                    & {
                        display: block;
                        width: 100%; height: auto;
                    }

                    & > .title {
                        & {
                            display: block;
                            padding: 14px;
                            background-color: #aaa;
                        }

                        & > h1 {
                            & {
                                display: block;
                                width: 100%; height: auto;
                                font-size: #{$font-size - 1};
                                font-weight: bold;
                                line-height: 1;
                                color: #fff;
                            }
                        }

                    }

                    & > ul {
                        & {
                            display: block;
                            width: 100%; height: auto;
                            list-style: none;
                            font-size: 0;
                            text-align: center;
                            padding-top: 5px;
                            padding-bottom: 15px;
                        }

                        & > li {
                            & {
                                display: inline-block;
                                vertical-align: top;
                                padding: 5px;
                            }

                            & > button {
                                & {
                                    display: block;
                                    outline: none; cursor: pointer;
                                    background: none; border: 0;
                                    padding: 0; margin: 0;
                                    font-size: 0;
                                    border-radius: 2px;
                                    background-color: #fff;
                                    overflow: hidden;
                                    padding: 5px;
                                    text-align: left;
                                    @include transition(.2s all);
                                }

                                & > i {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                        font-size: #{$font-size - 4};
                                        color: #777;
                                        line-height: 1;
                                        @include transition(.2s all);
                                    }
                                }

                                & > span {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                        font-size: #{$font-size - 2};
                                        font-weight: bold;
                                        color: #888;
                                        line-height: 1;
                                        padding-left: 5px;
                                        @include transition(.2s all);
                                    }
                                }

                                &:hover {
                                    & {
                                        background-color: $bg-blue;
                                        @include transition(.2s all);
                                    }

                                    & > i {
                                        & {
                                            color: #fff;
                                            @include transition(.2s all);
                                        }
                                    }

                                    & > span {
                                        & {
                                            color: #fff;
                                            @include transition(.2s all);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    &.orange {
                        & > .title {
                            & {
                                background-color: $bg-orange;
                            }
                        }

                        & > ul {
                            & > li {
                                & > button {
                                    &:hover {
                                        & {
                                            background-color: $bg-orange;
                                            @include transition(.2s all);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        & > ul {
            & {
                display: table-cell;
                vertical-align: top;
                width: auto; height: auto;
                list-style: none;
                font-size: 0;
            }

            & > li {
                & {
                    display: block;
                    width: 100%; height: auto;
                    background-color: #fff;
                    @include transition(.2s all);
                }

                & > div {
                    & {
                        display: block;
                        width: 100%; height: auto; 
                        position: relative;
                        border-bottom: 1px solid #ddd;
                        padding: 15px;
                    }

                    & > .bar {
                        & {
                            position: absolute;
                            right: 0; top: 0;
                            width: 5px; height: 100%;
                            background-color: #ddd;
                            opacity: 0.7;
                        }

                        &.blue {
                            & {
                                background-color: $bg-blue;
                            }
                        }

                        &.orange {
                            & {
                                background-color: $bg-orange;
                            }
                        }
                    }

                    & > .intro {
                        & {
                            display: table;
                            width: 100%; height: auto;
                        }

                        & > .image {
                            & {
                                display: table-cell;
                                vertical-align: middle;
                                text-align: right;
                            }

                            & > div {
                                & {
                                    display: inline-block;
                                    position: relative;
                                    width: 130px; height: auto;
                                    background-color: #ddd;
                                    border-radius: 3px;
                                    overflow: hidden;
                                }

                                &:after {
                                    content: " ";
                                    display: block;
                                    padding-bottom: 70%;
                                }

                                & > i {
                                    & {
                                        display: block;
                                        position: absolute;
                                        line-height: 1;
                                        font-size: #{$font-size + 6};
                                        color: #aaa;
                                        left: 50%; top: 50%;
                                        @include transform(translate(-50%, -50%));
                                    }
                                }
                            }
                        }

                        & > .description {
                            & {
                                display: table-cell;
                                vertical-align: middle;
                                width: auto; height: auto;
                            }

                            & > .title {
                                & {
                                    padding: 10px 0;
                                }

                                & > h1 {
                                    & {
                                        display: block;
                                        margin: 0; padding: 0;
                                        font-weight: bold;
                                        font-size: #{$font-size + 1};
                                        color: #555;
                                        line-height: 1;
                                    }
                                }
                            }

                            & > .text {
                                & {
                                    padding: 10px 0;
                                }
                                
                                & > div {
                                    & {
                                        display: block;
                                        color: #777;
                                        font-size: #{$font-size - 1};
                                        line-height: 1;
                                    }
                                }
                            }

                            & > .hash {
                                & {
                                    display: block;
                                    width: 100%; height: auto;
                                    padding: 5px 0;
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
                                            display: inline-block;
                                            vertical-align: middle;
                                            font-size: #{$font-size};
                                            padding: 2px 5px 2px 0px;
                                        }

                                        &:nth-last-child(1){
                                            & {
                                                padding-right: 0px;
                                            }
                                        }

                                        & > button {
                                            & {
                                                display: block;
                                                outline: none; cursor: pointer;
                                                background: none; border: 0;
                                                padding: 0; margin: 0;
                                                font-size: 0;
                                                font-weight: bold;
                                                padding: 5px 7px;
                                                background-color: #f1f1f1;
                                                color: #555;
                                                border-radius: 2px;
                                            }

                                            & > i {
                                                & {
                                                    display: inline-block;
                                                    vertical-align: middle;
                                                    line-height: 1;
                                                    font-size: #{$font-size - 4};
                                                    padding-right: 5px;
                                                }
                                            }

                                            & > span {
                                                & {
                                                    display: inline-block;
                                                    vertical-align: middle;
                                                    line-height: 1;
                                                    font-size: #{$font-size - 2};
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                        }

                    }

                    & > .options {
                        & {
                            display: table;
                            width: 100%; height: auto;
                            padding: 10px 0;
                        }

                        & > .left {
                            & {
                                display: table-cell;
                                vertical-align: middle;
                            }

                            & > ul {
                                & {
                                    display: block;
                                    margin: 0; padding: 0;
                                    list-style: none;
                                    font-size: 0;
                                }

                                & > li {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                        font-size: #{$font-size};
                                        padding-right: 15px;
                                    }

                                    &:nth-last-child(1){
                                        & {
                                            padding-right: 0;
                                        }
                                    }

                                    &.profile {
                                        & > div {
                                            & > .img{
                                                & {
                                                    display: inline-block;
                                                    position: relative;
                                                    vertical-align: middle;
                                                    width: 20px; height: auto;
                                                    border-radius: 50%;
                                                    overflow: hidden;
                                                    background-color: #ddd;
                                                }

                                                &:after {
                                                    content: " ";
                                                    display: block; 
                                                    padding-bottom: 100%;
                                                }
                                            }

                                            & > .name {
                                                & {
                                                    display: inline-block;
                                                    vertical-align: middle;
                                                    padding-left: 5px;
                                                }

                                                & > span {
                                                    & {
                                                        display: block;
                                                        font-size: #{$font-size - 2};
                                                        font-weight: bold;
                                                        color: #777;
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    &.answer {
                                        & > span {

                                            &:nth-child(1) {
                                                display: inline-block;
                                                vertical-align: middle;
                                                font-size: #{$font-size - 1};
                                                color: #777;
                                            }

                                            &:nth-child(2) {
                                                display: inline-block;
                                                vertical-align: middle;
                                                font-size: #{$font-size - 1};
                                                font-size: bold;
                                                color: #555;
                                                padding-left: 5px;
                                            }

                                        }
                                    }

                                    &.date {
                                        & > span {
                                            & {
                                                display: inline-block;
                                                vertical-align: middle;
                                                font-size: #{$font-size - 2};
                                                color: #777;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        & > .right {
                            & {
                                display: table-cell;
                                text-align: right;
                            }

                            & > ul {
                                & {
                                    display: block;
                                    list-style: none;
                                    font-size: 0;
                                }

                                & > li {
                                    & {
                                        display: inline-block;
                                        padding-right: 15px;
                                    }

                                    &:nth-last-child(1){
                                        & {
                                            padding-right: 0;
                                        }
                                    }

                                    & > button {
                                        & {
                                            display: block;
                                            outline: none; cursor: pointer;
                                            background: none; border: 0;
                                            padding: 0; margin: 0;
                                            @include transform(scale(1.0));
                                            @include transition(.2s all);
                                        }

                                        & > i {
                                            & {
                                                display: inline-block;
                                                vertical-align: middle;
                                                font-size: #{$font-size - 1};
                                                font-weight: bold;
                                                color: #555;
                                                padding-left: 7px;
                                                @include transition(.2s all);
                                            }
                                        }

                                        & > span {
                                            & {
                                                display: inline-block;
                                                vertical-align: middle;
                                                font-size: #{$font-size - 1};
                                                font-weight: bold;
                                                color: #555;
                                                @include transition(.2s all);
                                            }
                                        }

                                        &:hover {
                                            & {
                                                @include transform(scale(1.05));
                                                @include transition(.2s all);
                                            }
                                            & > i {
                                                & {
                                                    color: #333;
                                                    @include transition(.2s all);
                                                }
                                            }

                                            & > span {
                                                & {
                                                    color: #333;
                                                    @include transition(.2s all);
                                                }
                                            }
                                        }

                                        &.submit {
                                            & > i {
                                                & {
                                                    color: $bg-blue;
                                                }
                                            }

                                            & > span {
                                                & {
                                                    color: $bg-blue;
                                                }
                                            }

                                            &:hover {
                                                & > i {
                                                    & {
                                                        color: $bg-blue-bold;
                                                    }
                                                }

                                                & > span {
                                                    & {
                                                        color: $bg-blue-bold;
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

                &:hover {
                    & {
                        background-color: #f9f9f9;
                        @include transition(.2s all);
                    }
                }
            }
        }
    }
</style>
