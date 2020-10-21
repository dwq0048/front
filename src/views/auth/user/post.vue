<template>
    <div class="post">
        <widget-side :menu="MenuSide" />

        <div class="wrap">

            <div class="title">
                <h1>
                    <i><font-awesome-icon :icon="faUserEdit" /></i>
                    <span>내 게시글</span>
                </h1>
            </div>

            <!-- 게시글 리스트 -->
            <div class="section">
                <div class="title">
                    <h1>게시글 리스트</h1>
                    <div class="btn">
                        <router-link to="#">
                            <div>
                                <i><font-awesome-icon :icon="faPlus" /></i>
                                <span>더보기</span>
                            </div>
                        </router-link>
                    </div>
                </div>

                <!-- Widget -->
                <widget-list />
            </div>
            
            <!-- 댓글 리스트 -->
            <div class="section">
                <div class="title">
                    <h1>댓글 리스트</h1>
                    <div class="btn">
                        <router-link to="#">
                            <div>
                                <i><font-awesome-icon :icon="faPlus" /></i>
                                <span>더보기</span>
                            </div>
                        </router-link>
                    </div>
                </div>

                <!-- Widget -->
                <widget-comment />
            </div>

            <!-- 이미지 리스트 -->
            <div class="section">
                <div class="title">
                    <h1>이미지 리스트</h1>
                    <div class="btn">
                        <router-link to="#">
                            <div>
                                <i><font-awesome-icon :icon="faPlus" /></i>
                                <span>더보기</span>
                            </div>
                        </router-link>
                    </div>
                </div>

                <!-- Widget -->
                <widget-grid />
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserEdit, faFlask, faPlus } from '@fortawesome/free-solid-svg-icons'

import Side from '@/components/widget/auth/user/nav/side'
import List from '@/components/widget/list/auth_pack/list'
import Comment from '@/components/widget/list/auth_pack/comment'
import Grid from '@/components/widget/list/auth_pack/grid'

export default {
    name: 'AuthPost',
    components: {
        'widget-side' : Side,
        'widget-list' : List,
        'widget-comment' : Comment,
        'widget-grid' : Grid,
    },
    data(){
        return {
            // Icon
            faPlus, faUserEdit, faFlask,

            MenuSide : {
                options : {
                    profile : true
                },
                children : [
                    {
                        ko : '내 게시글', en : 'My Post', icon : faUserEdit, link : '#', type : 'link',
                        children : [
                            { ko : '게시글 리스트', en : 'Post List', link : '#', type : 'link' },
                            { ko : '댓글 리스트', en : 'Comment List', link : '#', type : 'link' },
                            { ko : '이미지 리스트', en : 'Art List', link : '#', type : 'link' },
                        ]
                    },
                    {
                        ko : '실험실', en : 'Laboratory', icon : faFlask, link : '#', type : 'link',
                        children : [
                            { ko : '블로그', en : 'Blog', link : '#', type : 'link' },
                            { ko : '헤시 태그', en : 'Hash Tag', link : '#', type : 'link' }
                        ]
                    },
                ]
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .post {
        & {
            display: table;
            width: 100%; height: auto;
            margin: 0 auto;
            padding: 10px 0;
        }

        & > .wrap {
            & {
                display: table-cell;
                width: auto; height: auto;
                vertical-align: top;
            }

            & > .title {
                & {
                    display: block;
                }

                & > h1 {
                    & {
                        font-size: #{$font-size + 8};
                        font-weight: bold;
                        line-height: 1;
                        padding: 20px;
                        color: $bg-blue;
                    }

                    & > i {
                        & {
                            display: inline-block;
                            font-size: #{$font-size + 4};
                            padding-right: 10px;
                        }
                    }
                }
            }

            & > .section {
                & {
                    display: block;
                    width: 100%; height: auto;
                    padding: 0 15px;
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
                            vertical-align: middle;
                            font-size: #{$font-size + 4};
                            color: #333;
                            line-height: 1;
                            font-weight: bold;
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
                                text-decoration: none;
                                color: $bg-blue;
                                @include transform(scale(1));
                                @include transition(.2s all);
                            }

                            & > div {
                                & {
                                    display: block;
                                    font-size: 0;
                                }

                                & > i {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                        font-size: #{$font-size - 2};
                                        line-height: 1;
                                        padding-right: 5px;
                                    }
                                }

                                & > span {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                        font-size: #{$font-size};
                                        font-weight: bold;
                                        line-height: 1;
                                        letter-spacing: 1px;
                                    }
                                }
                            }

                            &:hover {
                                &{
                                    @include transform(scale(1.05));
                                    @include transition(.2s all);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
