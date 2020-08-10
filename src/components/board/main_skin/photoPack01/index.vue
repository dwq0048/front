<template>
    <div class="default">
        <div class="nav" :class="{ active: ACTIVE.wild  }">
            <div class="title">
                <h1>{{ title }}</h1>
            </div>
            <div class="menu">
                <ul>
                    <li>
                        <button type="button">최신</button>
                    </li>
                    <li>
                        <button type="button">인기</button>
                    </li>
                </ul>
                <ul class="right">
                    <li>
                        <button type="button" title="와일드" :class="{ active: ACTIVE.wild  }" @click="postType('wild')">
                            <i><font-awesome-icon :icon="faTh" /></i>
                        </button>
                        <button type="button" title="그리드" :class="{ active: ACTIVE.grid  }" @click="postType('grid')">
                            <i><font-awesome-icon :icon="faThLarge" /></i>
                        </button>
                        <button type="button" title="메뉴 숨기기" class="menu-hidden" :class="{ active: HIDDEN }" @click="menuType()">
                            <i :class="{ active: HIDDEN }"><font-awesome-icon :icon="faCaretSquareDown" /></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <ul class="grid" :class="{ active: ACTIVE.grid, hidden : HIDDEN }">
                <li v-for="(item, i) in list" :key="i">
                    <div>
                        <div class="photo">
                            <div>
                                <img :src="'http://127.0.0.1:3000/images/'+item.images[item.meta.thumbnail.num]+'/thumbnail'">
                            </div>
                        </div>
                        <div class="info">
                            <div>
                                <div class="comment">
                                    <div v-html="item.post"></div>
                                </div>
                                <div class="profile">
                                    <div class="image">
                                        <div>

                                        </div>
                                    </div>
                                    <div class="name">
                                        <p>{{ item.users[0].nickname }}</p>
                                    </div>
                                </div>
                                <div class="status">
                                    <p><i><font-awesome-icon :icon="faHeartR" /></i><span>1</span></p>
                                    <p><i><font-awesome-icon :icon="faCommentAlt" /></i><span>1</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { SET_BOARD, SET_TIME } from '@/store/helper/'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faThLarge, faThList, faTable, faTh, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartR, faCommentAlt } from '@fortawesome/free-regular-svg-icons'

const postStore = 'postStore'

export default {
    name: 'DefaultMain',
    props: ['info'],
    data() {
        return {
            list : [],
            page : 0,
            title: '',
            ACTIVE: {
                wide: false,
                grid: true
            },
            HIDDEN: false,

            faTable,
            faTh,
            faThLarge,
            faThList,
            faHeartR,
            faCommentAlt,
            faCaretSquareDown
        }
    },
    methods : {
        ...mapActions(postStore, [
            'POST_LIST'
        ]),
        postType(type) {
            this.ACTIVE['wide'] = false;
            this.ACTIVE['grid'] = false;

            this.ACTIVE[type] = true;

            this.$emit("active", this.ACTIVE);
        },
        menuType() {
            if(this.HIDDEN){
                this.HIDDEN = false;
            }else {
                this.HIDDEN = true;
            }

            this.$emit("menu", this.HIDDEN);
        }
    },
    created: function(){
        this.title = SET_BOARD.category(this.info.board);

        const data = {
            board: this.info.board,
            page: this.page,
            view: 15
        }

        this.POST_LIST(data).then((req) => {
            this.list = req;

            console.log(this.list);
        }).catch((err) => {
            console.log(err);
        })

    }
}
</script>

<style lang="scss" scoped>
    .default {
        & {
            width: 100%;
            height: auto;
        }

        & > .nav {
            & {
                background-color: #fff;
                @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
            }

            & > .title {
                & {
                    padding: 15px 30px;
                }

                & > h1 {
                    font-size: #{$font-size + 6};
                }
            }

            & > .menu {
                &:after {
                    content: " ";
                    display: block;
                    clear: both;
                }

                & > ul {
                    & {
                        font-size: 0;
                        float: left;
                    }

                    & > li {
                        & {
                            display: inline-block;
                            list-style: none;
                            font-size: #{$font-size + 6};
                            height: 45px;
                        }

                        & > button {
                            & {
                                border: none;
                                background: none;
                                outline: none;
                                padding:0 30px;
                                height: 100%;
                                cursor: pointer;
                            }
                        }
                    }

                    &.right {
                        & {
                            float: right;
                            padding-right: 15px;
                        }

                        & > li {
                            & > button {
                                & {
                                    font-size: #{$font-size};
                                    color: #999;
                                    padding: 0 15px;
                                    @include transition(.2s all);
                                }

                                &.active {
                                    color: #555;
                                    @include transition(.2s all);
                                }

                                &.menu-hidden {
                                    & {
                                        color: #555;
                                    }

                                    & > i {
                                        display: block;
                                        font-size: #{$font-size + 2};
                                        @include transform(rotate(-90deg));
                                        @include transition(.2s all);
                                    }
                                }

                                &.menu-hidden.active {
                                    & {
                                        color: #999;
                                    }

                                    & > i {
                                        @include transform(rotate(90deg));
                                        @include transition(.2s all);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            &.active {
                & {
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                }
            }
        }

        & > div {

            & > .grid {

                & {
                    padding-top: 15px;
                    font-size: 0;
                    display: none;
                    white-space: normal;
                    position: relative;
                    left: 10px;
                }

                & > li {
                    & {
                        width: 25%;
                        height: auto;
                        padding: 0 10px 10px 0;
                        display: inline-block;
                        vertical-align: top;
                    }

                    & > div {
                        & { 
                            width: 100%;
                            height: auto;
                            background-color: #fff;
                            border-radius: 5px;
                            overflow: hidden;
                            padding: 10px;
                            @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
                        }

                        & > .photo {
                            & {
                                width: 100%;
                                height: auto;
                                position: relative;
                                background-color: #ccc;
                            }

                            &:after {
                                display: block;
                                content: " ";
                                padding-bottom: 100%;
                            }

                            & > div {
                                & {
                                    position: absolute;
                                    width: 100%;
                                    height: 100%;
                                }

                                & > img {
                                    & {
                                        position: absolute;
                                        width: 100%;
                                        height: 100%;
                                        object-fit: cover;
                                    }
                                }
                            }
                        }

                        & > .info {
                            & {
                                width: 100%;
                                height: auto;
                                padding: 10px 0;
                                background-color: #fff;
                                font-size: #{$font-size};
                            }

                            & > div {
                                & {
                                    font-size: 0;
                                }

                                & > .comment {
                                    & {
                                        width: 100%;
                                        height: auto;
                                        padding-bottom: 10px;
                                        display: block;
                                    }

                                    & > div {
                                        & {                                    
                                            font-size: #{$font-size};
                                            font-weight: bold;
                                            color: #555;
                                            overflow: hidden;
                                            text-overflow:ellipsis;
                                            white-space:nowrap;
                                        }
                                    }
                                }

                                & > .profile {
                                    & {
                                        width: 60%;
                                        display: inline-block;
                                        vertical-align: middle;
                                        font-size: 0;
                                    }

                                    & > .image {
                                        & {
                                            width: 22px;
                                            height: auto;
                                            position: relative;
                                            background-color: #ccc;
                                            overflow: hidden;
                                            border-radius: 50%;
                                            border: 1px solid $bg-orange;
                                            display: inline-block;
                                            vertical-align: middle;
                                        }

                                        &:after {
                                            content: " ";
                                            display: block;
                                            padding-bottom: 100%;
                                        }
                                    }

                                    & > .name {
                                        & {
                                            font-size: #{$font-size};
                                            color: #999;
                                            display: inline-block;
                                            vertical-align: middle;
                                            padding-left: 5px;
                                            font-weight: bold;
                                        }
                                    }
                                }

                                & > .status {
                                    & {
                                        width: 40%;
                                        display: inline-block;
                                        text-align: right;
                                        vertical-align: middle;
                                    }

                                    & > p {
                                        & {
                                            font-size: #{$font-size - 2};
                                            display: inline-block;
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
                                                padding-left: 5px;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                &.active {
                    & {
                        display: block;
                        margin-left: -10px;
                    }
                }

                &.hidden {
                    & > li{
                        width: 20%;
                    }
                }
            }
        }
    }
</style>
