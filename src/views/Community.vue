<template>
    <div class="community">
        <layout-navigation />
        <layout-header />

        <div class="title"></div>
        <div class="contents">
            <div class="main">
                <!-- SECTION 1 -->
                <div class="section">
                    <div class="widget list half">
                        <div>
                            <div class="title">
                                <h1>공지사항</h1>
                                <button type="button">
                                    <i><font-awesome-icon :icon="faPlus" /></i>
                                </button>
                            </div>
                            <ul>
                                <li v-for="(item, i) in TempList" :key="i">
                                    <div class="text">
                                        <div class="title">
                                            <h1>{{ item.title }}</h1>
                                            <span>[ {{ item.count }} ]</span>
                                        </div>
                                        <div class="profile">
                                            <div>
                                                <div class="img"></div>
                                                <div class="name">
                                                    <span>{{ item.name }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="widget list half">
                        <div>
                            <div class="title">
                                <h1>자유게시판</h1>
                                <button type="button">
                                    <i><font-awesome-icon :icon="faPlus" /></i>
                                </button>
                            </div>
                            <ul>
                                <li v-for="(item, i) in TempList" :key="i">
                                    <div class="text">
                                        <div class="title">
                                            <h1>{{ item.title }}</h1>
                                            <span>[ {{ item.count }} ]</span>
                                        </div>
                                        <div class="profile">
                                            <div>
                                                <div class="img"></div>
                                                <div class="name">
                                                    <span>{{ item.name }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- SECTION 1 END -->

                <!-- SECTION 2 -->
                <div class="section section-2">
                    <div class="widget grid">
                        <ul>
                            <li v-for="(item, i) in TempImage" :key="i">
                                <div>
                                    <router-link to="/">
                                        <i><font-awesome-icon :icon="faImage" /></i>
                                        <div class="hidden">

                                            <div class="background"></div>
                                            <div class="profile">
                                                <div>
                                                    <div class="img"></div>
                                                    <span>{{ item.name }}</span>
                                                </div>
                                            </div>

                                            <div class="content">
                                                <div>
                                                    <div class="title">
                                                        <h1>{{ item.title }}</h1>
                                                    </div>
                                                    <div class="options">
                                                        <div class="profile">
                                                            <div class="img"></div>
                                                            <div class="name">
                                                                <span>{{ item.name }}</span>
                                                            </div>
                                                        </div>
                                                        <div class="hash">
                                                            <ul>
                                                                <li v-for="(list, k) in item.tag" :key="k">
                                                                    <button type="button">
                                                                        <i><font-awesome-icon :icon="faHashtag" /></i>
                                                                        <span>{{ list.ko }}</span>
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </router-link>
                                </div>
                            </li>
                        </ul>
                        <div class="btn">
                            <router-link to="/photo">
                                <span>이미지 더보기</span>
                                <i><font-awesome-icon :icon="faArrowRight" /></i>
                            </router-link>
                        </div>
                    </div>
                </div>
                <!-- SECTION 2 END -->
                
                <!-- SECTION 3 -->
                <div class="section section-3">
                    <div class="widget qna">
                        <div>
                            <div class="title">
                                <h1>질문 게시판</h1>
                                <button type="button">
                                    <i><font-awesome-icon :icon="faPlus" /></i>
                                </button>
                            </div>
                            <ul>
                                <li v-for="(item, i) in TempQna" :key="i">
                                    <div>
                                        <div class="text">
                                            <div class="title">
                                                <h1>{{ item.title }}</h1>
                                            </div>
                                            <div class="content">
                                                <div>{{ item.content }}</div>
                                            </div>
                                            <div class="tag">
                                                <ul>
                                                    <li v-for="(list, k) in item.hash" :key="k">
                                                        <button type="button">
                                                            <i><font-awesome-icon :icon="faHashtag" /></i>
                                                            <span>{{ list.ko }}</span>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="option">
                                            <div class="profile">
                                                <div class="img"></div>
                                                <span class="name">{{ item.name }}</span>
                                            </div>
                                            <div class="answer">
                                                <b>답변 :</b>
                                                <span>{{ item.answer }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- SECTION 3 END -->


            </div>
            <div class="nav">
                <menu-skin />
            </div>
        </div>

        <layout-footer />
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faImage, faHashtag, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import Header from '@/components/layout/header'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'

import MenuSkin from '@/components/board/menu_skin/side_pack_01'

export default {
    name: 'Community',
    components: {
        'layout-header': Header,
        'layout-navigation': Navigation,
        'layout-footer' : Footer,

        'menu-skin' : MenuSkin,
    },
    data(){
        return {
            // Icons
            faPlus, faImage, faHashtag, faArrowRight,

            TempList : [
                {
                    title : '2020.12.01 공지사항 입니다.',
                    name : '관리자',
                    date : '방금전',
                    count: '4',
                    image: false,
                },
                {
                    title : 'VRCHAT API 사용법!!',
                    name : '관리자',
                    date : '방금전',
                    count : '2',
                    image : false,
                },
                {
                    title : '자유게시판 이용 공지입니다.',
                    name : '관리자',
                    date : '방금전',
                    count : '2',
                    image : false,
                },
                {
                    title : '마인크래프트 하실분',
                    name : '관리자',
                    date : '방금전',
                    count : '32',
                    image : false,
                },
                {
                    title : '아주긴 제목입니다. 하하 이것도 너프해보시지 ㅋㅋ 호롤ㄹ롤롤롤로',
                    name : '관리자',
                    date : '방금전',
                    count : '32',
                    image : false,
                },
            ],

            TempQna : [
                {
                    title : '이거시 궁금합니다.',
                    text : '이렁허ㅣㅜㅇ후잌쿠틏ㅁㄴㅇㅁ나ㅓㅣㅏㅇ러ㅣ아널미ㅏㄴ이루ㅜ츹,ㅡ풑,ㅡ춮,퉆ㅌ 츠ㅜㅍㅌ',
                    name : '관리자',
                    answer : '0',
                    hash : [
                        { ko : '태그 1' },
                        { ko : '태그 2' },
                        { ko : '태그 3' },
                    ]
                },
                {
                    title : '이거시 궁금합니다.',
                    text : '이렁허ㅣㅜㅇ후잌쿠틏ㅁㄴㅇㅁ나ㅓㅣㅏㅇ러ㅣ아널미ㅏㄴ이루ㅜ츹,ㅡ풑,ㅡ춮,퉆ㅌ 츠ㅜㅍㅌ',
                    name : '관리자',
                    answer : '0',
                    hash : [
                        { ko : '태그 1' },
                        { ko : '태그 2' },
                        { ko : '태그 3' },
                    ]
                },
                {
                    title : '이거시 궁금합니다.',
                    text : '이렁허ㅣㅜㅇ후잌쿠틏ㅁㄴㅇㅁ나ㅓㅣㅏㅇ러ㅣ아널미ㅏㄴ이루ㅜ츹,ㅡ풑,ㅡ춮,퉆ㅌ 츠ㅜㅍㅌ',
                    name : '관리자',
                    answer : '0',
                    hash : [
                        { ko : '태그 1' },
                        { ko : '태그 2' },
                        { ko : '태그 3' },
                    ]
                },
                {
                    title : '이거시 궁금합니다.',
                    text : '이렁허ㅣㅜㅇ후잌쿠틏ㅁㄴㅇㅁ나ㅓㅣㅏㅇ러ㅣ아널미ㅏㄴ이루ㅜ츹,ㅡ풑,ㅡ춮,퉆ㅌ 츠ㅜㅍㅌ',
                    name : '관리자',
                    answer : '0',
                    hash : [
                        { ko : '태그 1' },
                        { ko : '태그 2' },
                        { ko : '태그 3' },
                    ]
                },
            ],

            TempImage : [
                {
                    title : '이미지 입니다.',
                    name : '관리자',
                    tag : [
                        { ko : 'Vrchat' },
                        { ko : '게임' },
                    ]
                },
                {
                    title : '이미지 입니다.',
                    name : '관리자',
                    tag : [
                        { ko : 'Vrchat' },
                        { ko : '게임' },
                    ]
                },
                {
                    title : '이미지 입니다.',
                    name : '관리자',
                    tag : [
                        { ko : 'Vrchat' },
                        { ko : '게임' },
                    ]
                },
                {
                    title : '이미지 입니다.',
                    name : '관리자',
                    tag : [
                        { ko : 'Vrchat' },
                        { ko : '게임' },
                    ]
                },
                {
                    title : '이미지 입니다.',
                    name : '관리자',
                    tag : [
                        { ko : 'Vrchat' },
                        { ko : '게임' },
                    ]
                },
                {
                    title : '이미지 입니다.',
                    name : '관리자',
                    tag : [
                        { ko : 'Vrchat' },
                        { ko : '게임' },
                    ]
                },
                {
                    title : '이미지 입니다.',
                    name : '관리자',
                    tag : [
                        { ko : 'Vrchat' },
                        { ko : '게임' },
                    ]
                },
                {
                    title : '이미지 입니다.',
                    name : '관리자',
                    tag : [
                        { ko : 'Vrchat' },
                        { ko : '게임' },
                    ]
                },
                {
                    title : '이미지 입니다.',
                    name : '관리자',
                    tag : [
                        { ko : 'Vrchat' },
                        { ko : '게임' },
                    ]
                },
                {
                    title : '이미지 입니다.',
                    name : '관리자',
                    tag : [
                        { ko : 'Vrchat' },
                        { ko : '게임' },
                    ]
                },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
    .community {
        & > .title {
            & {
                width: 100%;
                height: 200px;
                background-color: #ccc;
            }
        }

        & > .contents {
            & {
                width: 100%;
                max-width: $wrap;
                height: auto;
                margin: -100px auto;
                text-align: center;
                @include transition(.2s all);
            }

            & > .main {
                & {
                    width: 900px;
                    height: auto;
                    display: inline-block;
                    margin: 0 auto;
                    vertical-align: top;
                    padding: 80px 10px 10px 10px;
                    text-align: left;
                    @include transition(.2s all);
                }

                & > .section {
                    & {
                        display: block;
                        width: 100%; height: auto;
                        font-size: 0;
                    }

                    &:after {
                        & {
                            content: " ";
                            display: block;
                            clear: both;
                        }
                    }

                    & > .widget {
                        & {
                            display: inline-block;
                            width: 100%; height: auto;
                            padding: 0 15px;
                        }

                        &.qna {
                            & {
                                padding-top: 15px;
                            }

                            & > div {
                                & {
                                    display: block;
                                    background-color: #fff;
                                    border-radius: 5px;
                                    padding: 10px;
                                    @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
                                }

                                & > .title {
                                    & {
                                        display: block;
                                        position: relative;
                                        width: 100%; height: auto;
                                        padding: 10px;
                                        background-color: #eee;
                                        border-radius: 3px;
                                    }

                                    & > h1 {
                                        & {
                                            display: block;
                                            font-size: #{$font-size + 2};
                                            font-weight: bold;
                                            color: #333;
                                            line-height: 1;
                                            text-align: left;
                                        }
                                    }

                                    & > button {
                                        & {
                                            display: block;
                                            position: absolute;
                                            right: 15px; top: 50%;
                                            outline: none; cursor: pointer;
                                            background: none; border: none;
                                            margin: 0; padding: 0;
                                            font-size: #{$font-size - 2};
                                            color: $bg-blue;
                                            @include transform(translateY(-50%));
                                        }
                                    }
                                }
                            }
                        }

                        &.grid {
                            & {
                                padding-top: 15px;
                                margin-left: -10px;
                                padding-right: 0;
                            }

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
                                        vertical-align: top;
                                        width: 20%; height: auto;
                                        padding: 10px;
                                    }

                                    & > div {
                                        & {
                                            display: block;
                                            width: 100%; height: auto;
                                        }

                                        & > a {
                                            & {
                                                display: block;
                                                position: relative;
                                                width: 100%; height: auto;
                                                padding-bottom: 100%;
                                                border-radius: 5px;
                                                background-color: #ddd;
                                                overflow: hidden;
                                                text-decoration: none;
                                                outline: none; cursor: pointer;
                                                @include box-shadow(3px 3px 2px rgba(0,0,0,0.1));
                                            }

                                            & > .hidden {
                                                & {
                                                    position: absolute;
                                                    visibility: hidden;
                                                    left: 0; top: 0;
                                                    width: 100%; height: 100%;
                                                    z-index: 3;
                                                    @include transition(.2s all);
                                                }

                                                & > .background {
                                                    & {
                                                        position: absolute;
                                                        left: 0; top: 0;
                                                        width: 100%; height: 100%;
                                                        background-color: rgba(0,0,0,0);
                                                        z-index: 4;
                                                        @include transition(.2s all);
                                                    }
                                                }

                                                & > .profile {
                                                    & {
                                                        position: absolute;
                                                        right: 0; top: 0;
                                                        width: 100%; height: auto;
                                                        z-index: 5;
                                                        @include transform(translateY(-100%));
                                                    }

                                                    & > div {
                                                        & {
                                                            display: block;
                                                            width: 100%; height: auto;
                                                            text-align: left;
                                                            font-size: 0;
                                                            padding-left: 5px;
                                                            padding-top: 5px;
                                                        }

                                                        & > .img {
                                                            & {
                                                                position: relative;
                                                                display: inline-block;
                                                                vertical-align: middle;
                                                                width: 18px; height: auto;
                                                                background-color: #ddd;
                                                                border-radius: 50%;
                                                                overflow: hidden;
                                                            }

                                                            &:after {
                                                                content: " ";
                                                                display: block;
                                                                padding-bottom: 100%;
                                                            }
                                                        }

                                                        & > span {
                                                            & {
                                                                display: inline-block;
                                                                vertical-align: middle;
                                                                font-size: #{$font-size - 2};
                                                                font-weight: bold;
                                                                padding-left: 7px;
                                                                color: #fff;
                                                            }
                                                        }
                                                    }
                                                }

                                                & > .content {
                                                    & {
                                                        position: absolute;
                                                        left: 0; bottom: 0;
                                                        width: 100%; height: auto;
                                                        z-index: 5;
                                                        @include transform(translateY(100%));
                                                        @include transition(.2s all);
                                                    }

                                                    & > div {
                                                        & {
                                                            display: block;
                                                            width: 100%; height: auto;
                                                        }

                                                        & > .title {
                                                            & {
                                                                display: block;
                                                                padding: 10px 5px 0px 5px;
                                                            }

                                                            & > h1 {
                                                                & {
                                                                    display: block;
                                                                    font-size: #{$font-size - 2};
                                                                    font-weight: bold;
                                                                    color: #fff;
                                                                    text-align: left;
                                                                    line-height: 1;
                                                                }
                                                            }
                                                        }

                                                        & > .options {
                                                            & {
                                                                display: table;
                                                                padding: 5px;
                                                            }

                                                            & > .hash {
                                                                & {
                                                                    display: table-cell;
                                                                    vertical-align: middle;
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
                                                                            padding-right: 5px;
                                                                        }

                                                                        & > button {
                                                                            & {
                                                                                display: block;
                                                                                outline: none; cursor: pointer;
                                                                                background: none; border: 0;
                                                                                margin: 0; padding: 0;
                                                                                font-size: 0;
                                                                            }

                                                                            & > i {
                                                                                & {
                                                                                    display: inline-block;
                                                                                    vertical-align: middle;
                                                                                    font-size: #{$font-size - 4};
                                                                                    color: #ddd;
                                                                                }
                                                                            }

                                                                            & > span {
                                                                                & {
                                                                                    display: inline-block;
                                                                                    vertical-align: middle;
                                                                                    font-size: #{$font-size - 4};
                                                                                    color: #ddd;
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

                                            & > i {
                                                & {
                                                    position: absolute;
                                                    left: 50%; top: 50%;
                                                    font-size: #{$font-size + 12};
                                                    color: #aaa;
                                                    line-height: 1;
                                                    z-index: 1;
                                                    @include transform(translate(-50%, -50%));
                                                }
                                            }

                                            & > img {
                                                & {
                                                    position: absolute;
                                                    left: 50%; top: 50%;
                                                    width: 100%; height: 100%;
                                                    object-fit: cover;
                                                    z-index: 2;
                                                    @include transform(translate(-50%, -50%));
                                                }
                                            }
                                        }
                                    }

                                    &:hover {
                                        & > div {
                                            & > a {
                                                & > .hidden {
                                                    & {
                                                        visibility: visible;
                                                        @include transition(.2s all);
                                                    }

                                                    & > .background {
                                                        & {
                                                            background-color: rgba(0,0,0,0.6);
                                                            @include transition(.2s all);
                                                        }
                                                    }

                                                    & > .profile {
                                                        & {
                                                            @include transform(translateY(0));
                                                            @include transition(.2s all);
                                                        }
                                                    }

                                                    & > .content {
                                                        & {
                                                            @include transform(translateY(0));
                                                            @include transition(.2s all);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            & > .btn {
                                & {
                                    display: block;
                                    width: 100%; height: auto;
                                    text-align: right;
                                }

                                & > a {
                                    & {
                                        display: inline-block;
                                        text-align: right;
                                        font-size: 0;
                                        text-decoration: none;
                                        padding: 10px;
                                    }

                                    & > span {
                                        & {
                                            display: inline-block;
                                            vertical-align: middle;
                                            font-size: #{$font-size + 2};
                                            font-weight: bold;
                                            color: $bg-blue;
                                            padding-right: 10px;
                                        }
                                    }

                                    & > i {
                                        & {
                                            position: relative;
                                            display: inline-block;
                                            vertical-align: middle;
                                            font-size: #{$font-size};
                                            color: $bg-blue;
                                            left: 0px;
                                            @include transition(.2s all);
                                        }
                                    }

                                    &:hover {
                                        & > i {
                                            & {
                                                left: 7px;
                                                @include transition(.2s all);
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        &.list {
                            & > div {
                                & {
                                    display: block;
                                    background-color: #fff;
                                    border-radius: 5px;
                                    padding: 10px;
                                    @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
                                }

                                & > .title {
                                    & {
                                        display: block;
                                        position: relative;
                                        width: 100%; height: auto;
                                        padding: 10px;
                                        background-color: #eee;
                                        border-radius: 3px;
                                    }

                                    & > h1 {
                                        & {
                                            display: block;
                                            font-size: #{$font-size + 2};
                                            font-weight: bold;
                                            color: #333;
                                            line-height: 1;
                                            text-align: left;
                                        }
                                    }

                                    & > button {
                                        & {
                                            display: block;
                                            position: absolute;
                                            right: 15px; top: 50%;
                                            outline: none; cursor: pointer;
                                            background: none; border: none;
                                            margin: 0; padding: 0;
                                            font-size: #{$font-size - 2};
                                            color: $bg-blue;
                                            @include transform(translateY(-50%));
                                        }
                                    }
                                }

                                & > ul {
                                    & {
                                        display: block;
                                        width: 100%; height: auto;
                                        list-style: none;
                                        font-size: 0;
                                    }

                                    & > li {
                                        & {
                                            display: block;
                                            width: 100%; height: auto;
                                            border-bottom: 1px solid #eee;
                                        }

                                        &:nth-last-child(1){
                                            & {
                                                border-bottom: 0;
                                            }
                                        }

                                        & > .text {
                                            & {
                                                display: block;
                                                width: 100%; height: auto;
                                                padding: 10px;
                                            }

                                            & > .title {
                                                & {
                                                    display: table-cell;
                                                    vertical-align: middle;
                                                    width: 100%; height: auto;
                                                }

                                                & > h1 {
                                                    & {
                                                        display: inline-block;
                                                        vertical-align: middle;
                                                        font-size: #{$font-size};
                                                        font-weight: bold;
                                                        color: #555;
                                                        line-height: 1;
                                                    }
                                                }

                                                & > span {
                                                    & {
                                                        display: inline-block;
                                                        vertical-align: middle;
                                                        font-size: #{$font-size - 1};
                                                        font-weight: bold;
                                                        color: $bg-blue;
                                                        line-height: 1;
                                                        padding-left: 5px;
                                                    }
                                                }
                                            }

                                            & > .profile {
                                                & {
                                                    display: table-cell;
                                                    vertical-align: middle;
                                                    width: auto; height: auto;
                                                    font-size: 0;
                                                    text-align: right;
                                                }

                                                & > div {
                                                    & {
                                                        display: block;
                                                        width: 80px; height: auto;
                                                        text-align: right;
                                                        font-size: 0;
                                                    }

                                                    & > .img {
                                                        & {
                                                            display: inline-block;
                                                            vertical-align: middle;
                                                            position: relative;
                                                            width: 18px; height: auto;
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
                                                            font-size: 0;
                                                            padding-left: 5px;
                                                        }

                                                        & > span {
                                                            & {
                                                                display: inline-block;
                                                                vertical-align: middle;
                                                                font-size: #{$font-size - 3};
                                                                font-weight: bold;
                                                                color: #aaa;
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

                    & > .half {
                        & {
                            width: 50%;
                        }
                    }
                }
            }

            & > .nav {
                & {
                    width: 300px;
                    height: auto;
                    display: inline-block;
                    margin-top: 80px;
                    vertical-align: top;
                    text-align: left;
                    @include transition(.2s all);
                }
            }
        }
    }
</style>
