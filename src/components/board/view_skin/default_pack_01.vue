<template>
    <div class="default">
        <div class="contents">
            <!-- Title Start -->
            <div class="nav">
                <div class="select">
                    <div>
                        <ul>
                            <li class="active">
                                <div class="list">
                                    <button type="button">
                                        <span>제목 1</span>
                                    </button>
                                    <button type="button">
                                        <i><font-awesome-icon :icon="faTimes" /></i>
                                    </button>
                                </div>
                                <div class="option">
                                    <div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <div>
                                        <div></div>
                                        <div></div>
                                    </div>
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

            <!-- Info Start -->
            <div class="info">
                <div class="title" v-if="post">
                    <h1>{{ post.title }}</h1>
                </div>
                <div class="display" v-if="post">
                    <div class="left">
                        <span>{{ post.board.name }}</span>
                        <span>{{ post.state.date_display }}</span>
                        <span>{{ post.users.nickname }}</span>
                        <!--
                        -->
                    </div>
                    <div class="right">
                        <span>조회수 : {{ post.views_count }}</span>
                        <span>댓글수 : {{ post.comment }}</span>
                        <span>좋아요 : {{ post.like_count }}</span>
                    </div>
                </div>
            </div>
            <!-- Info End -->

            <div class="post" v-if="post">
                <div v-html="post.post" class="editor-post"></div>
            </div>

            <!-- Card -->
            <card-skin v-if="post" :count="post.comment" :users="post.users" :Like="Like" @click-love="LoveSubmit()" />
            <!-- Card End -->

            <div class="setting">
                <div class="default_btn">
                    <button type="button">신고</button>
                    <button type="button">공유하기</button>
                    <button type="button">수정하기</button>
                </div>
            </div>
        </div>

        <div class="comment">
            <comment-skin :comment="comment" :count="post.comment" @comment-submit="CommentSubmit" ref="commentRef"/>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';
import { mapActions, mapGetters } from 'vuex'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faList, faCaretLeft, faCaretRight, faShareSquare, faPlus, faArrowLeft, faArrowRight, faEllipsisH, faTimes } from '@fortawesome/free-solid-svg-icons'

import { SET_TIME, SET_BOARD, SET_SCRIPT } from '@/store/helper'

import SettingPop from '@/components/board/_variety/setting-edit'
import CardSkin from '@/components/board/_variety/fix_card'
import CommentSkin from '@/components/board/comment_skin/chat_pack_01'

const socket = io('http://localhost:3000');
const postStore = 'postStore'

export default {
    name: 'DefaultMain',
    props: ['info'],
    data() {
        return {
            id: this.$route.params.id,
            board: this.info.board,
            post: false,
            comment: false,
            socket: "",

            // Icon
            faList, faCaretLeft, faCaretRight, faShareSquare, faPlus, faArrowLeft, faArrowRight, faEllipsisH, faTimes,

            // Variable
            Like : { love : false, count : 0 }
        }
    },
    components: {
        'setting-pop' : SettingPop,
        'comment-skin' : CommentSkin,
        'card-skin' : CardSkin,
    },
    methods : {
        ...mapActions(postStore, [ 'POST_VIEW', 'POST_LIKE', 'POST_LIKE_READ', 'COMMENT_LIST', 'COMMENT_POST' ]),

        // 좋아요 입력
        LoveSubmit(){
            this.Like.love = (this.Like.love) ? false : true;
            const data = { index : this.id, state : this.Like.love };
            this.POST_LIKE(data).then((req) => {
                console.log(req);
            }).catch((err) => {
                console.log(err);
            })
        },

        // 댓글 입력
        CommentSubmit(content){
            this.COMMENT_POST({ board: this.info.board, index: this.id, comment: content }).then((payload) => {
                socket.emit(this.id, { payload });
                this.$refs.commentRef.content = "";
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    created(){
        const data = { index: this.id, board: this.board }

        // 포스트 불러오기
        this.POST_VIEW(data).then((req) => {
            this.post = req;

            this.Like.love = (this.post.like_check) ? true : false;
            this.Like.count = (this.post.like_count) ? this.post.like_count : 0;
        }).catch((err) => {
            console.log(err)
        });

        // 댓글 불러오기
        this.COMMENT_LIST({ board : this.info.board, index: this.id }).then((req) => {
            const Temp = req;
            const Comment = [];

            Temp.map((item) => {
                let NoneObject = true;
                let UseObject = {};
                Comment.forEach((items, index) => {               
                    if(SET_SCRIPT.CalculationDate(item.state.date) == items.date){
                        NoneObject = false;
                        UseObject = { index: index };
                    }else{
                        NoneObject = true;
                    }
                })

                if(NoneObject){
                    Comment.push({
                        user : item.users._id,
                        date : SET_SCRIPT.CalculationDate(item.state.date),
                        post : item,
                        array : new Array( item.post )
                    });
                }else{
                    Comment[UseObject.index].array.push( item.post )
                }
            });

            this.comment = Comment;

            // 불러온 뒤 소켓 연결
            socket.on(this.id, (data) => {
                data.state.date_display = SET_TIME(data.state.date_fix)
                const object = {
                    user : data.users._id,
                    date : SET_SCRIPT.CalculationDate(data.state.date),
                    post : data,
                    array : new Array( data.post )
                }

                if(this.comment){
                    if(this.comment.length > 0){
                        if(typeof this.comment[0].date == 'string'){
                            if(this.comment[0].date == SET_SCRIPT.CalculationDate(data.state.date)){
                                this.comment[0].array.unshift(data.post);
                            }else{
                                this.comment.unshift(object);
                            }
                        }else{
                            this.comment.unshift(object);
                        }
                    }else{
                        this.comment.unshift(object);
                    }
                }else{
                    this.comment.unshift(object);
                }
            });
        }).catch((err) => {
            console.log(err);
        });
    }
}
</script>

<style lang="scss" scoped>
    .default {
        & {
            width: 100%;
            height: auto;
            padding-bottom: 15px;
        }

        & > .contents {
            & {
                background-color: #fff;
                border-radius: 5px;
                overflow: hidden;
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
            
            & > .info {
                & {
                    padding: 15px 30px;
                    border-bottom: 1px solid #eee;
                }

                & > .title {
                    & {
                        padding: 10px 15px;
                    }

                    & > h1 {
                        font-size: #{$font-size + 8};
                        font-weight: bold;
                        line-height: 1;
                    }
                }

                & > .display {
                    & {
                        display: table;
                        width: 100%; height: auto;
                        padding: 10px 15px;
                        text-align: right;
                    }

                    & > .left {
                        & {
                            display: table-cell;
                            vertical-align: middle;
                            font-size: 0;
                            text-align: left;
                        }

                        & > span {
                            & {
                                display: inline-block;
                                font-size: #{$font-size - 2};
                                color: #bbb;
                                padding-right: 30px;
                            }

                            &:nth-last-child(1){
                                & {
                                    padding-right: 0;
                                }
                            }
                        }
                    }

                    & > .right {
                        & {
                            display: table-cell;
                            vertical-align: middle;
                            font-size: 0;
                            text-align: right;
                        }

                        & > span {
                            & {
                                display: inline-block;
                                font-size: #{$font-size - 2};
                                color: #aaa;
                                padding-left: 30px;
                            }

                            &:nth-child(1){
                                & {
                                    padding-left: 0;
                                }
                            }
                        }
                    }
                }

                & > .line {
                    & {
                        width: 100%; height: 0;
                        padding: 10px 0px;
                    }

                    & > span {
                        & {
                            display: block;
                            width: 100%; height: 100%;
                            border-bottom: 1px solid #eee;
                        }
                    }
                }
            }

            & > .post {
                & {
                    padding: 15px 45px 50px 45px;
                    min-height: 425px;
                }
            }

            & > .setting {
                & {
                    background-color: #f9f9f9;
                    border-top: 1px solid #f1f1f1;
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
    }
</style>

<style lang="scss">
    .editor-post {
        & > div {
            & {
                font-size: #{$font-size};
                color: $font-color;
                line-height: 1.7;
            }

            h1 {
                & {
                    font-size: #{$font-size + 12};
                    font-weight: normal;
                }
            }
            h2 {
                & {
                    font-size: #{$font-size + 10};
                    font-weight: normal;
                }
            }
            h3 {
                & {
                    font-size: #{$font-size + 8};
                    font-weight: normal;
                }
            }
            h4 {
                & {
                    font-size: #{$font-size + 6};
                    font-weight: normal;
                }
            }
            h5 {
                & {
                    font-size: #{$font-size + 4};
                    font-weight: normal;
                }
            }
            h6 {
                & {
                    font-size: #{$font-size + 2};
                    font-weight: normal;
                }
            }

            img {
                & {
                    width: 100%;
                }
            }

            ul {
                & {
                    list-style-position: inside;
                    padding-left: 5px;
                    margin: 15px 0;
                }

                & > li {
                    & > p {
                        display: inline-block;
                    }
                }
            }

            ol {
                & {
                    list-style-position: inside;
                    padding-left: 5px;
                    margin: 15px 0;
                }

                & > li {
                    & > p {
                        display: inline-block;
                    }
                }
            }

            blockquote {
                & {
                    background-color: #f1f1f1;
                    padding: 15px;
                    padding-left: 20px;
                    position: relative;
                    margin: 15px 0;
                }

                &:after {
                    content: " ";
                    display: block;
                    position: absolute;
                    width: 5px;
                    height: 100%;
                    left: 0;
                    top: 0;
                    background-color: #b9b9b9;
                }
            }

            hr {
                & {
                    border-top: 1px solid #ddd;
                    margin: 30px 0;
                }
            }
        }
    }
</style>
