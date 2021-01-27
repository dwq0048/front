<template>
    <div class="default">
        <div class="contents" ref="content">
            <div class="wrap">
                <!-- Title Start -->
                <div class="nav">
                    <div class="select">
                        <div>
                            <ul>
                                <li class="active">
                                    <div class="list">
                                        <button type="button">
                                            <span>뭘봐</span>
                                        </button>
                                        <button type="button">
                                            <i><font-awesome-icon :icon="faTimes" /></i>
                                        </button>
                                    </div>
                                    <div class="option">
                                        <div><div></div><div></div></div>
                                        <div><div></div><div></div></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="option">
                        <div class="left">
                            <ul>
                                <li>
                                    <button type="button" title="다음 글">
                                        <i><font-awesome-icon :icon="faArrowLeft" /></i>
                                    </button>
                                </li>
                                <li>
                                    <button type="button" title="이전 글">
                                        <i><font-awesome-icon :icon="faArrowRight" /></i>
                                    </button>
                                </li>
                                <li>
                                    <button type="button" title="목록">
                                        <i><font-awesome-icon :icon="faList" /></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div class="bar">
                            <div>5f942ced4f54ae0ad006a7c4</div>
                        </div>
                        <div class="right">
                            <ul>
                                <li>
                                    <button type="button" title="메뉴">
                                        <i><font-awesome-icon :icon="faEllipsisH" /></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- Title End -->

                <!-- Post Start -->
                <!-- If Slide --> 
                <div class="post" v-if="Slide.active">
                    <div class="view">
                        <div class="img-post" ref="ImgPost">
                            <img :src="`http://127.0.0.1:3000/images/${post.images[Slide.current]}`" alt="">
                        </div>
                        <div class="arrow">
                            <button type="button" class="left" @click="SlideBtn(false)">
                                <i><font-awesome-icon :icon="faChevronLeft" /></i>
                            </button>
                            <button type="button" class="right" @click="SlideBtn(true)">
                                <i><font-awesome-icon :icon="faChevronRight" /></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="slide">
                        <ul>
                            <li v-for="(item, i) in post.images" :key="i">
                                <div :class="{ active : (Slide.current == i) }" @click="SlideIndex(i)">
                                    <img :src="`http://127.0.0.1:3000/images/${item}`" alt="img">
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Else Slide -->
                <div class="post" v-else>
                    <ul class="list">
                        <li v-for="(item, i) in post.images" :key="i">
                            <img :src="`http://127.0.0.1:3000/images/${item}`" alt="img">
                        </li>
                    </ul>
                </div>

                <!-- Introduce Start -->
                <div class="intro">
                    <div>
                        <h1 v-html="post.title"></h1>
                        <div class="post" v-html="post.post"></div>

                        <div class="tag">
                            <ul>
                                <li v-for="(item, i) in post.meta.hash" :key="i">
                                    <a href="#">
                                        # {{ item.item }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- Introduce End -->

                <!-- Other Options -->
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
                <!-- Other Options End -->
            </div>

            <!-- Comment Start -->
            <div class="comment">
                <comment-skin :info="info" :post="post" v-if="post"/>
            </div>
            <!-- Comment End -->

        </div>
        <!-- Post End -->
    </div>
</template>

<script>
import Grid from '@/components/widget/main/grid-post'
import CommentSkin from '@/components/board/comment_skin/chat_pack_02'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft, faChevronRight, faList, faCaretLeft, faCaretRight, faTimes, faArrowLeft, faArrowRight, faEllipsisH } from '@fortawesome/free-solid-svg-icons'

import { SET_TIME } from '@/store/helper'
import { SET_BOARD } from '@/store/helper'

export default {
    name: 'DefaultPhoto',
    props: ['info', 'post'],
    components: {
        'widget-grid': Grid,
        'comment-skin' : CommentSkin,
    },
    data() {
        return {
            faChevronLeft, faChevronRight, faList, faCaretLeft, faCaretRight, faTimes, faArrowLeft, faArrowRight, faEllipsisH,

            Slide: {
                option : false,
                current : 0,
                prev : undefined,
                next : undefined,
                active : false,
            },

            grid: {
                width: 800,
                max: 1650,
                min: 1330,
                img: 'auto'
            },
        }
    },
    methods : {
        SlideBtn(option){
            (option) ? this.SlideIndex(this.Slide.next) : this.SlideIndex(this.Slide.prev);
        },
        SlideIndex(option){
            if(this.post.images.length > 1){
                this.Slide.current = option;

                // Next
                if(this.Slide.current >= this.post.images.length - 1){
                    this.Slide.next = 0;
                }else{
                    this.Slide.next = this.Slide.current + 1;
                }

                // Prev
                if(this.Slide.current <= 0){
                    this.Slide.prev = this.post.images.length - 1;
                }else{
                    this.Slide.prev = this.Slide.current - 1;
                }

                const radio = (this.post.ImageMeta[option].meta.height / this.post.ImageMeta[option].meta.width) * 100;
                this.$refs.ImgPost.style.paddingBottom = `${radio}%`;
                this.$refs.ImgPost.style.transition = `.2s all`;
            }

            console.log(this.Slide);
        }
    },
    created(){
        if(this.post){
            if(typeof this.post.meta == 'object'){
                if(typeof this.post.meta.mod == 'string'){
                    if(this.post.meta.mod == 'horizontal'){
                        this.Slide.active = (this.post.images.length > 1) ? true : false;
                        (this.Slide.next == undefined) ? this.Slide.next = this.Slide.current + 1 : undefined;
                        (this.Slide.prev == undefined) ? this.Slide.prev = this.post.images.length - 1 : undefined;
                    }
                }
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', (data) => {
            const el = this.$refs.content.getBoundingClientRect();
            const top = el.top;
            const left = el.left;
            if(top <= 0){ this.Side.option = true }
            else{ this.Slide.option = false };

            this.$emit('childs-event', this.Slide);
        });

        if(this.Slide.active){
            const radio = (this.post.ImageMeta[0].meta.height / this.post.ImageMeta[0].meta.width) * 100;
            this.$refs.ImgPost.style.paddingBottom = `${radio}%`;
        }
    }
}
</script>

<style lang="scss" scoped>
    .default {
        & {
            position: relative;
            width: 100%; height: auto;
        }

        & > .contents {
            & {
                position: relative;
                width: 100%; height: auto;
                font-size: 0;
            }

            & > .wrap {
                & {
                    width: 100%; height: auto;
                    max-width: 850px;
                    background-color: #fff;
                    border-radius: 5px;
                    overflow: hidden;
                    text-align: left;
                    font-size: #{$font-size};
                    @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
                }
                
                & > .nav {
                    & {
                        width: 100%; height: auto;
                        background-color: #fff;
                        border-bottom: 1px solid #ddd;
                    }

                    & > .select {
                        & {
                            width: 100%; height: auto;
                            display: none;
                        }

                        & > div {
                            & {
                                width: 100%; height: auto;
                                background-color: #f1f1f1;
                            }

                            & > ul {
                                & {
                                    display: block;
                                    width: 100%; height: auto;
                                    list-style: none;
                                    font-size: 0;
                                    padding: 0 14px;
                                    padding-top: 7px;
                                }

                                & > li {
                                    & {
                                        position: relative;
                                        display: inline-block;
                                        width: auto; height: auto;
                                        background-color: #f1f1f1;
                                        border-radius: 7px 7px 0px 0px;
                                    }

                                    &:after {
                                        content: " ";
                                        display: block;
                                        position: absolute;
                                        border-right: 1px solid #ddd;
                                        width: 0px; height: 100%;
                                        right: 0; top: 0;
                                    }

                                    & > .list {
                                        & {
                                            display: table;
                                            width: 100%; height: auto;
                                            white-space: nowrap;
                                        }

                                        & > button {
                                            & {
                                                display: table-cell;
                                                vertical-align: middle;
                                                outline: none; cursor: pointer;
                                                border: 0; background: none;
                                                margin: 0; padding: 0;
                                                text-align: left;
                                                padding: 7px 15px;
                                            }

                                            &:nth-child(1){
                                                & {
                                                    width: 120px;
                                                }

                                                & > span {
                                                    & {
                                                        display: block;
                                                        letter-spacing: 1px;
                                                        font-size: #{$font-size - 2};
                                                        width: 100%;
                                                    }
                                                }
                                            }

                                            &:nth-child(2){
                                                & {
                                                    width: auto;
                                                    color: #aaa;
                                                    font-size: #{$font-size - 4};
                                                    padding: 0 15px;
                                                }

                                            }
                                        }
                                    }

                                    & > .option {
                                        & {
                                            display: none;
                                        }

                                        & > div {
                                            &:nth-child(1){
                                                & > div {
                                                    right: 100%;
                                                }
                                            }

                                            &:nth-child(2){
                                                & > div {
                                                    left: 100%;
                                                }
                                            }

                                            & > div {
                                                & {
                                                    position: absolute;
                                                    width: 14px; height: 100%;
                                                }

                                                &:nth-child(1){
                                                    & {
                                                        top: 0; z-index: 9;
                                                        background-color: #f1f1f1;
                                                        border-radius: 7px;
                                                    }
                                                }

                                                &:nth-child(2){
                                                    & {
                                                        bottom: 0; z-index: 8;
                                                        width: 3px; height: 50%;
                                                        background-color: #fff;
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    &.active {
                                        & {
                                            background-color: #fff;
                                            border-right: 0;
                                            z-index: 10;
                                        }

                                        &:after {
                                            border-right: 0;
                                        }

                                        & > .list {
                                            & > button {
                                                &:nth-child(1){
                                                    & > div {
                                                        & > span {
                                                            & {
                                                                font-weight: bold;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        & > .option {
                                            & {
                                                display: block;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    & > .option {
                        & {
                            display: table;
                            position: relative;
                            width: 100%; height: auto;
                        }

                        & > .left {
                            & {
                                display: table-cell;
                                vertical-align: middle;
                            }

                            & > ul {
                                & {
                                    display: block;
                                    white-space: nowrap;
                                    list-style: none;
                                    font-size: 0;
                                }

                                & > li {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                    }

                                    & > button {
                                        & {
                                            display: block;
                                            position: relative;
                                            outline: none; cursor: pointer;
                                            border: 0; background: none;
                                            padding: 0; margin: 0;
                                            padding: 15px;
                                        }

                                        & > i {
                                            & {
                                                display: block;
                                                line-height: 1;
                                                color: #aaa;
                                                font-size: #{$font-size};
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        & > .bar {
                            & {
                                display: table-cell;
                                vertical-align: middle;
                                width: 100%;
                            }

                            & > div {
                                & {
                                    display: block;
                                    padding: 7px 15px;
                                    font-size: #{$font-size - 2};
                                    letter-spacing: 1px;
                                    font-weight: bold;
                                    text-align: left;
                                    background-color: #f1f1f1;
                                    border-radius: 15px;
                                }
                            }
                        }

                        & > .right {
                            & {
                                display: table-cell;
                                vertical-align: middle;
                            }

                            & > ul {
                                & {
                                    display: block;
                                    white-space: nowrap;
                                    font-size: 0;
                                    list-style: none;
                                }

                                & > li {
                                    & {
                                        display: inline-block;
                                        font-size: #{$font-size};
                                        color: #aaa;
                                    }

                                    & > button {
                                        & {
                                            display: block;
                                            border: 0; background: none;
                                            padding:0; margin: 0;
                                            cursor: pointer; outline: none;
                                            padding: 15px;
                                        }

                                        & > i {
                                            & {
                                                font-size: #{$font-size};
                                                color: #aaa;
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
                        position: relative;
                    }

                    & > ul.list {
                        & {
                            display: block;
                            margin: 0; padding: 0;
                            list-style: none;
                            font-size: 0;
                        }

                        & > li {
                            & {
                                display: block;
                                width: 100%; height: auto;
                            }

                            & > img {
                                & {
                                    display: block;
                                    width: 100%; height: auto;
                                }
                            }
                        }
                    }

                    & > .view {
                        & {
                            position: relative;
                            width: 100%; height: auto;
                            background-color: #ccc;
                        }

                        & > .img-post {
                            & {
                                width: 100%; height: auto;
                                overflow: hidden;
                                cursor: grab;
                            }

                            & > img {
                                position: absolute;
                                width: 100%; height: 100%;
                                object-fit: cover;
                                left: 0; top: 0;
                            }
                        }

                        & > .arrow {
                            & > button {
                                & {
                                    position: absolute;
                                    display: table;
                                    width: auto; height: 100%;
                                    top: 0;
                                    cursor: pointer; outline: none;
                                    border: 0; background: none;
                                    padding: 0; margin: 0;
                                    background-color: rgba(0,0,0,0.2);
                                    opacity: 1;
                                    @include transition(.2s all);
                                }

                                &.left {
                                    & {
                                        left: 0;
                                    }
                                }

                                &.right {
                                    & {
                                        right: 0;
                                    }
                                }

                                & > i {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                        font-size: #{$font-size + 20};
                                        padding: 0 15px;
                                        color: rgba(255,255,255,0.6);
                                        @include transition(.2s all);
                                    }
                                }

                                &:hover {
                                    & {
                                        background-color: rgba(0,0,0,0.4);
                                        @include transition(.2s all);
                                    }

                                    & > i {
                                        & {
                                            color: rgba(255,255,255,0.8);
                                            @include transition(.2s all);
                                        }
                                    }
                                }
                            }
                        }

                        & > .img-post:hover ~ .arrow > button {
                            & {
                                opacity: 0;
                                @include transition(.2s all);
                            }
                        }
                    }

                    & > .slide {
                        & {
                            width: 100%;
                            height: auto;
                            left: 0; bottom: 0;
                            opacity: 1;
                            background-color: #f9f9f9;
                            @include transition(.2s all);
                            z-index: 2;
                            cursor: w-resize;
                            cursor: grab;
                            @include box-shadow(1px 1px 2px rgba(0,0,0,0.1));
                        }

                        & > ul {
                            & {
                                width: 100%;
                                height: auto;
                                font-size: 0;
                                padding: 15px;
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
                                        border-radius: 3px;
                                        overflow: hidden;
                                        @include box-shadow(2px 2px 2px rgba(0,0,0,0.3));
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
                                            border: 2px solid $bg-orange;
                                        }
                                    }
                                }
                            }
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
                        padding: 5px 35px 30px 35px;
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
                                    margin-left: -10px;
                                    margin-right: -10px;
                                }

                                & > li {
                                    & {
                                        display: inline-block;
                                        width: calc(100% / 7);
                                        height: auto;
                                        padding: 10px;
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
            }
            & > .comment {
                & {
                    position: absolute;
                    display: inline-block;
                    width: 100%; height: auto;
                    max-width: 320px;
                    top: 0; right: 0; bottom: 0;
                    text-align: left;
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
                                    //width: 15%;
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