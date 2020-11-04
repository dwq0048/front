<template>
    <div class="like">
        <widget-side :menu="MenuSide" />

        <div class="wrap">

            <div class="title">
                <h1>
                    <i><font-awesome-icon :icon="faHeartR" /></i>
                    <span>좋아요 리스트</span>
                </h1>
            </div>

            <!-- 게시글 리스트 -->
            <div class="section">
                <div class="title">
                    <h1>게시글</h1>
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

        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faThLarge, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartR } from '@fortawesome/free-regular-svg-icons'

import Side from '@/components/widget/auth/user/nav/side'

import List from '@/components/board/list_skin/auth_list'

export default {
    name : 'AuthLike',
    components: {
        'widget-side' : Side,

        'widget-list' : List,
    },
    data(){
        return {
            // Icon
            faThLarge, faPlus, faHeartR,

            MenuSide : {
                options : {
                    profile : true
                },
                children : [
                    {
                        ko : '좋아요 리스트', en : 'My Like', icon : faHeartR, link : '#', type : 'link',
                        children : [
                            { ko : '게시글', en : 'Post', link : '#', type : 'link' },
                            { ko : '이미지', en : 'Images', link : '#', type : 'link' },
                            { ko : '댓글', en : 'Comment', link : '#', type : 'link' },
                        ]
                    },
                    {
                        ko : '모아보기', en : 'Laboratory', icon : faThLarge, link : '#', type : 'link',
                        children : [
                            { ko : '최신 순', en : 'New', link : '#', type : 'link' },
                            { ko : '랜덤', en : 'Random', link : '#', type : 'link' }
                        ]
                    },
                ]
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .like {
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
