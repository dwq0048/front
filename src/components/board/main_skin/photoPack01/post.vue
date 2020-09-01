<template>
    <div class="default">
        <div class="contents" ref="content">
            <div class="title">
                <div class="left">
                    <button type="button" class="list" title="목록으로">
                        <i><font-awesome-icon :icon="faList" /></i>
                        <span>목록으로</span>
                    </button>
                </div>
                <div class="right">
                    <button type="button" title="펼쳐보기" class="list">
                        <div><div><div></div><div></div><div></div><div></div></div></div>
                    </button>
                    <button type="button" title="이전글" class="prev">
                        <i><font-awesome-icon :icon="faChevronLeft" /></i>
                    </button>
                    <button type="button" title="다음글" class="next">
                        <i><font-awesome-icon :icon="faChevronRight" /></i>
                    </button>
                </div>
            </div>
            <div class="post">
                <div class="view">
                    <div ref="ImgPost">
                        <img :src="`http://127.0.0.1:3000/images/${post.images[CurImg]}`" alt="">
                    </div>
                </div>
                <div class="arrow">
                    <button type="button">
                        <i><font-awesome-icon :icon="faChevronLeft" /></i>
                    </button>
                    <button type="button">
                        <i><font-awesome-icon :icon="faChevronRight" /></i>
                    </button>
                </div>
                <div class="slide">
                    <ul>
                        <li v-for="(item, i) in post.images" :key="i">
                            <div :class="{ active : (CurImg == i) }">
                                <img :src="`http://127.0.0.1:3000/images/${item}`" alt="">
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="intro">
                <div>
                    <h1>이거슨 제목 입니다.</h1>
                    <div class="post">
                        글을 읽으면 아무런 뜻이 없는것을<br>
                        알 수 있다... 이건 그냥 탬플릿 사진과 탬플릿 글이다<br><br>
                        아래에는 테그가 있다.
                    </div>
                    <div class="tag">
                        <ul>
                            <li>
                                <a href="#">
                                    # 게임<span>#Game</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    # Vrchat
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    # 사람들<span>#people</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="writer">
                <div class="title">
                    <h1>작가의 다른 사진</h1>
                </div>
                <div class="content">
                    <div class="user">
                        <div class="img">

                        </div>
                        <div class="intro">
                            <p>관리자</p>
                        </div>
                    </div>
                    <div class="list">
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
                            <li>
                                <div></div>
                            </li>
                            <li>
                                <div></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="setting">
                <div class="default_btn">
                    <button type="button">공유하기</button>
                    <button type="button">신고</button>
                </div>
            </div>
        </div>

        <div class="other">
            <div class="list">
                <div>
                    <h1>목록</h1>
                </div>
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
                    <li>
                        <div></div>
                    </li>
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

        <div class="good">
            <div class="users">
                <h1>추천 게시글</h1>
            </div>
            <div class="widget">
                <widget-grid :grid="grid"/>
            </div>
        </div>
    </div>
</template>

<script>
import Grid from '@/components/widget/main/grid-post'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft, faChevronRight, faList } from '@fortawesome/free-solid-svg-icons'

import { SET_TIME } from '@/store/helper'
import { SET_BOARD } from '@/store/helper'

export default {
    name: 'DefaultPhoto',
    props: ['info', 'post'],
    data() {
        return {
            faChevronLeft, faChevronRight, faList,

            side: false,
            CurImg: 0,
            grid: {
                width: 800,
                max: 1650,
                min: 1330,
                img: 'auto'
            }
        }
    },
    components: {
        'widget-grid': Grid,
    },
    created() {
        console.log(this.post);
    },
    mounted() {
        const cont = this.$refs.content;

        window.addEventListener('scroll', (data) => {
            //console.log(window.scrollY);
            const el = cont.getBoundingClientRect();
            const top = el.top;
            const left = el.left;
            if(top <= 0){
                this.side = true;
            }else{
                this.side = false;
            }

            this.$emit('childs-event', this.side)
        });

        const radio = (this.post.ImageMeta[0].meta.height / this.post.ImageMeta[0].meta.width) * 100;
        this.$refs.ImgPost.style.paddingBottom = `${radio}%`;
    }
}
</script>

<style lang="scss" scoped>
    .default {
        & {
            width: 100%;
            height: auto;
        }

        & > .contents {
            & {
                background-color: #fff;
                @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
            }
            
            & > .title {
                & {
                    width:100%; height: 45px;
                    border-bottom: 1px solid #ddd;
                    position: relative;
                }

                & > .left {
                    & {
                        width: auto; height: 100%;
                    }

                    & > button {
                        & {
                            width: auto; height: 100%;
                            border: 0;
                            background: none;
                            border-right: 1px solid #ddd;
                            background-color: #fff;
                            padding: 0 15px;
                        }
                        
                        & > i {
                            & {
                                font-size: #{font-size + 2};
                                color: #555;
                                padding-left: 0;
                                display: inline-block;
                                vertical-align: middle;
                            }
                        }

                        & > span {
                            & {
                                padding-left: 15px;
                                color: #555;
                                display: inline-block;
                                font-size: #{$font-size - 2};
                                vertical-align: middle;
                            }
                        }
                    }
                }

                & > .right {
                    & {
                        position: absolute;
                        right: 0; top: 50%;
                        @include transform(translateY(-50%));
                        font-size: 0;
                    }

                    & > button {
                        & {
                            width: 45px; height:auto;
                            border: 0;
                            padding: 0; margin: 0;
                            background: none;
                            outline: none;
                            border-left: 1px solid #ddd;
                            position: relative;
                            color: #999;
                            cursor: pointer;
                        }

                        &:after {
                            content: " ";
                            display: block;
                            padding-bottom: 100%;
                        }

                        &.list {
                            & > div {
                                &  {
                                    position: absolute;
                                    left: 50%; top: 50%;
                                    @include transform(translate(-50%, -50%));
                                }

                                & > div {
                                    & {
                                        position: relative;
                                    }

                                    & > div {
                                        & {
                                            position: absolute;
                                            left: 50%; top: 50%;
                                            width: 20px; height: 15px;
                                            //border-radius: 2px;
                                            background-color: #999;
                                            @include transition(.2s all);
                                            @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
                                        }

                                        /*
                                        &:after {
                                            content: " ";
                                            display: block;
                                            width: 80%; height: 1px;
                                            background-color: #f1f1f1;
                                            border-radius: 1px;
                                            margin: 0 auto;
                                            margin-top: 4px;
                                        }
                                        
                                        &:before {
                                            content: " ";
                                            display: block;
                                            width: 80%; height: 1px;
                                            background-color: #f1f1f1;
                                            border-radius: 1px;
                                            margin: 0 auto;
                                            margin-top: 4px;
                                        }
                                        */
                                    }

                                    & > div:nth-child(1){
                                        & {
                                            @include transform(translate(-50%, -50%));
                                            z-index: 3;
                                        }
                                    }

                                    & > div:nth-child(2){
                                        & {
                                            width: 18px; height: 10px;
                                            background-color: #bbb;
                                            @include transform(translate(-50%, 30%));
                                            z-index: 2;
                                        }
                                    }

                                    & > div:nth-child(3){
                                        & {
                                            width: 18px; height: 10px;
                                            background-color: #bbb;
                                            @include transform(translate(-50%, -130%));
                                            z-index: 1;
                                        }
                                    }
                                    
                                    & > div:nth-child(4){
                                        & {
                                            width: 18px; height: 10px;
                                            background-color: #bbb;
                                            @include transform(translate(-50%, -50%));
                                            z-index: 0;
                                        }
                                    }
                                }
                            }

                            &:hover {
                                & > div {
                                    & > div {
                                        & > div {
                                            & {
                                                @include transition(.2s all);
                                            }
                                        }

                                        & > div:nth-child(1) {
                                            & {
                                                width: 18px; height: 10px;
                                                background-color: #bbb;
                                                @include transform(translate(-50%, 30%));
                                                z-index: 1;
                                            }
                                        }

                                        & > div:nth-child(2) {
                                            & {
                                                width: 18px; height: 10px;
                                                background-color: #bbb;
                                                @include transform(translate(-50%, -50%));
                                                z-index: 0;
                                            }
                                        }

                                        & > div:nth-child(3) {
                                            & {
                                                width: 20px; height: 15px;
                                                background-color: #999;
                                                @include transform(translate(-50%, -50%));
                                                z-index: 3;
                                            }
                                        }

                                        & > div:nth-child(4) {
                                            & {
                                                width: 18px; height: 10px;
                                                background-color: #bbb;
                                                @include transform(translate(-50%, -130%));
                                                z-index: 2;
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
                                @include transform(translate(-50%, -50%));
                            }
                        }
                    }
                }

            }

            & > .post {
                & {
                    position: relative;
                }

                & > .view {
                    & {
                        width: 100%;
                        height: auto;
                        background-color: #ccc;
                        cursor: w-resize;
                        cursor: grab;
                        position: relative;
                    }

                    & > div {
                        & {
                            width: 100%;
                            height: auto;
                            overflow: hidden;
                        }

                        & > img {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            left: 0; top: 0;
                        }
                    }
                }

                & > .arrow {
                    & {
                        width: 100%;
                        height: 100%;
                        opacity: 1;
                        @include transition(.2s all);
                    }

                    & > button {
                        & {
                            display: block;
                            background: none;
                            border: none;
                            cursor: pointer;
                            outline: none;
                            position: absolute;
                            top: 50%;
                            @include transform(translateY(-50%));
                            font-size: #{$font-size + 30};
                            color: rgba(255,255,255,0.5);
                            height: 100%;
                            z-index: 1;
                            padding: 0 10px;
                        }

                        &:nth-child(1){
                            left: 0;
                        }

                        &:nth-child(2){
                            right: 0;
                        }
                    }
                }

                & > .slide {
                    & {
                        width: 100%;
                        height: auto;
                        position: absolute;
                        left: 0; bottom: 0;
                        opacity: 1;
                        background-color: rgba(0,0,0,0.5);
                        @include transition(.2s all);
                        cursor: w-resize;
                        cursor: grab;
                        z-index: 2;
                    }

                    & > ul {
                        & {
                            width: 100%;
                            height: auto;
                            font-size: 0;
                            padding: 20px 15px;
                            white-space: nowrap;
                            overflow: hidden;
                        }

                        & > li {
                            & {
                                display: inline-block;
                                width: 10%;
                                height: auto;
                                padding-right: 15px;
                                cursor: pointer;
                            }

                            & > div {
                                & {
                                    width: 100%;
                                    height: auto;
                                    background-color: #555;
                                    position: relative;
                                    border: 1px solid #555;
                                    border-radius: 3px;
                                    overflow: hidden;
                                }

                                &:after {
                                    content: " ";
                                    display: block;
                                    padding-bottom: 100%;
                                }

                                & > img {
                                    & {
                                        width: 100%;
                                        height: 100%;
                                        position: absolute;
                                        left: 0; top: 0;
                                        object-fit: cover;
                                    }
                                }

                                &.active {
                                    & {
                                        border: 1px solid $bg-orange;
                                    }
                                }
                            }
                        }
                    }
                }

                &:hover {
                    & > .slide {
                        & {
                            opacity: 0;
                            @include transition(.2s all);
                        }
                    }

                    & > .arrow {
                        & {
                            opacity: 0;
                            @include transition(.2s all);
                        }
                    }
                }

                & > .slide:hover {
                    & {
                        opacity: 1;
                        @include transition(.2s all);
                    }
                }

                & > .arrow:hover {
                    & {
                        opacity: 1;
                        @include transition(.2s all);
                    }
                }                
            }

            & > .intro {
                & {
                    width: 100%; height: auto;
                    padding: 30px;
                }
                & > div {
                    & > h1 {
                        & {
                            padding-bottom: 15px;
                        }
                    }

                    & > .tag {
                        & {
                            padding-top: 50px;
                        }

                        & > ul {
                            & {
                                font-size: 0;
                                list-style: none;
                            }

                            & > li {
                                & {
                                    display: inline-block;
                                    padding-right: 10px;
                                }

                                & > a {
                                    & {
                                        display: block;
                                        text-decoration: none;
                                        color: $bg-blue;
                                        font-size: #{$font-size - 2};
                                        font-weight: bold;
                                    }

                                    & > span {
                                        & {
                                            padding-left: 3px;
                                            vertical-align: bottom;
                                            font-size: #{$font-size - 4};
                                            font-weight: 300;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            & > .writer {
                & {
                    padding: 5px 50px 30px 50px;
                }
                & > .title {
                    & > h1 {
                        & {
                            font-size: #{$font-size + 2};
                            font-weight: bold;
                            color: #666;
                        }
                    }
                }

                & > .content {
                    & > .user {
                        & {
                            font-size: 0;
                            width: 100%; height: auto;
                            display: none;
                        }

                        & > .img {
                            & {
                                display: inline-block;
                                width: 30px; height: auto;
                                position: relative;
                                border-radius: 50%;
                                overflow: hidden;
                                background-color: #ccc;
                                vertical-align: middle;
                            }

                            &:after {
                                content: " ";
                                display: block;
                                padding-bottom: 100%;
                            }
                        }

                        & > .intro {
                            & {
                                display: inline-block;
                                padding-left: 5px;
                                color: #999;
                                font-size: #{$font-size};
                                padding-left: 10px;
                                vertical-align: middle;
                            }
                        }
                    }
                    & > .list {
                        & > ul {
                            & {
                                font-size: 0;
                                list-style: none;
                                margin-left: -15px;
                            }

                            & > li {
                                & {
                                    display: inline-block;
                                    width: 20%;
                                    height: auto;
                                    padding: 15px;
                                }

                                & > div {
                                    & {
                                        width: 100%; height: auto;
                                        background-color: #ccc;
                                        position: relative;
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
                        }
                    }
                }
            }

            & > .setting {
                & {
                    background-color: #f9f9f9;
                    border-top: 1px solid #ddd;
                    padding: 15px 15px;
                    text-align: right;
                }

                & > .default_btn {
                    & {
                        display: inline-block;
                    }

                    & > button {
                        & {
                            display: inline-block;
                            font-size: #{$font-size - 2};
                            color: #999;
                            margin-left: 15px;
                            padding: 0 15px;
                            border:none;
                            background: none;
                            cursor: pointer;
                        }
                    }
                }
            }

            &.active {
                & > .comet {
                    & {
                        position: fixed;
                        top: 0;
                        right: 0;
                    }
                }
            }
        }

        & > .other {
            & {
                width: 100%;
                height: auto;
                padding-top: 40px;
            }

            & > .list {
                & {
                    width: 100%;
                    height: auto;
                }

                & > div:nth-child(1) {
                    & {
                        display: block;
                    }

                    & > h1 {
                        & {
                            font-size: #{$font-size + 2};
                            color: $font-color;
                            font-weight: bold;
                            margin: 0;
                            padding: 0;
                        }
                    }
                }

                & > ul {
                    & {
                        width: 100%;
                        height: auto;
                        list-style: none;
                        font-size: 0;
                        white-space: nowrap;
                        padding-top: 15px;
                        margin-left: -15px;
                    }

                    & > li {
                        & {
                            width: calc(100% / 7);
                            height: auto;
                            padding: 0 15px;
                            display: inline-block;
                        }
                        
                        & > div {
                            & {
                                width: 100%;
                                height: auto;
                                background-color: #333;
                                position: relative;
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

        & > .good {
            & {
                width: 100%;
                height: auto;
                margin-top: 40px;
            }

            & > .users {
                & {
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                & > h1 {
                    & {
                        font-size: #{$font-size + 2};
                        color: $font-color;
                        font-weight: bold;
                        margin: 0;
                        padding: 0;
                    }
                }
            }

            & > .widget {
                & {
                    padding-top: 15px;
                    margin-left: -15px;
                }
            }
        }
    }

    @media (max-width: 1650px) {
        .default {
            & > .contents {
                & > .post {
                    & > .slide {
                        & > ul {
                            & > li {
                                & {
                                    width: 15%;
                                }
                            }
                        }
                    }
                }
            }
        }
    }


    @media (max-width: 740px) {
        .default {
            & > .contents {
                & > .post {
                    & > .slide {
                        & > ul {
                            & > li {
                                & {
                                    width: 20%;
                                }
                            }
                        }
                    }
                }
            }

            & > .other {
                & > .list {
                    & > ul {
                        & > li {
                            & {
                                width: 25%;
                            }
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 520px) {
        .default {
            & > .other {
                & > .list {
                    & > ul {
                        & > li {
                            & {
                                width: 33.3333%;
                            }
                        }
                    }
                }
            }
        }
    }

</style>

<style lang="scss">
    .pee {
        & > .grid {
            margin: 0!important;
        }
    }
</style>