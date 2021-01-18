<template>
    <ul class="grid">
        <li v-for="(item, i) in list" :key="i">
            <div>
                <div class="thumbnail">
                    <div>
                        <img
                            :src="`http://127.0.0.1:3000/images/${item.images[item.meta.thumbnail]}?resize=480`"
                            v-if="(item.meta.thumbnail != undefined) ? true : false"
                        />
                    </div>
                </div>
                <div class="info">
                    <div class="title">
                        <h1 v-html="item.title"></h1>
                    </div>
                    <div class="info">
                        <div>
                            <p class="nickname">닉네임</p>
                            <p class="date">2 일전</p>
                        </div>
                        <ul>
                            <li>
                                <i><font-awesome-icon :icon="faHeartR" /></i>
                                <span>0</span>
                            </li>
                            <li>
                                <i><font-awesome-icon :icon="faComment" /></i>
                                <span>0</span>
                            </li>
                            <li>
                                <i><font-awesome-icon :icon="faEye" /></i>
                                <span>0</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!--
            <div>
                <div class="love">
                    <div>
                        <i><font-awesome-icon :icon="faHeartR" /></i>
                        <span>{{ item.like_count }}</span>
                    </div>
                </div>
                <div class="list">
                    <div class="title">
                        <router-link :to="'/'+info.board+'/'+item._id">
                            <h1>{{ item.title }}<span>[{{ (item.comment)?item.comment:0 }}]</span> 허헣 ㅓ허허 ㅓ하핳</h1>
                        </router-link>
                    </div>
                    <div class="options">
                        <ul>
                            <li class="date">
                                <span>{{ item.state.displayDate }}</span>
                            </li>
                            <li class="user">
                                <span>{{ item.users.nickname }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="thumbnail">
                    <router-link :to="'/'+info.board+'/'+item._id">
                        <i v-if="(item.meta.thumbnail == undefined) ? true : false">
                            <font-awesome-icon :icon="faImage" />
                        </i>
                        <img
                            :src="`http://127.0.0.1:3000/images/${item.images[item.meta.thumbnail]}?resize=480`"
                            v-if="(item.meta.thumbnail != undefined) ? true : false"
                        />
                    </router-link>
                </div>
            </div>
            -->
        </li>
    </ul>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartR, faEye, faComment } from '@fortawesome/free-regular-svg-icons'

export default {
    name: 'grid',
    props: ['list', 'info'],
    data(){
        return {
            faHeartR, faImage, faEye, faComment
        }
    }
}
</script>

<style lang="scss" scoped>
    ul.grid {
        & {
            font-size: 0;
            list-style: none;
            padding: 5px 0;
            margin-left: -10px;
        }

        & > li {
            & {
                display: inline-block;
                width: 25%; height: auto;
                vertical-align: top;
                position: relative;
                padding: 10px;
            }

            & > div {
                & {
                    display: block;
                    width: 100%; height: auto;
                    position: relative;
                    background-color: #fff;
                    border-radius: 3px;
                    @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
                }

                & > .thumbnail {
                    & {
                        display: block;
                        width: 100%; height: auto;
                        padding: 5px;
                    }

                    & > div {
                        & {
                            display: block;
                            width: 100%; height: auto;
                            position: relative;
                            border-radius: 3px;
                            overflow: hidden;
                        }

                        &:after {
                            & {
                                content: " ";
                                display: block;
                                padding-bottom: 100%;
                            }
                        }

                        & > img {
                            & {
                                width: 100%; height: 100%;
                                position: absolute;
                                object-fit: cover;
                            }
                        }
                    }
                }

                & > .info {
                    & > .title {
                        & {
                            width: 100%; height: auto;
                            font-size: #{$font-size};
                            line-height: 1;
                            padding: 5px 5px;
                        }

                        & > h1 {
                            & {
                                display: block;
                                font-size: #{$font-size};
                                margin:0; padding:0;
                                line-height: 1;
                                color: #555;
                                font-size: #{$font-size};
                            }
                        }
                    }

                    & > .info {
                        & {
                            display: block;
                            width: 100%; height: auto;
                            font-size: #{$font-size};
                        }

                        & > div {
                            & {
                                width: 100%; height: auto;
                                display: table;
                                padding: 5px 5px 0 5px;
                            }

                            & > .nickname {
                                & {
                                    display: table-cell;
                                    margin:0; padding:0;
                                    font-size: #{$font-size - 2};
                                    font-weight: bold;
                                    color: #999;
                                }
                            }

                            & > .date {
                                & {
                                    display: table-cell;
                                    margin:0; padding: 0;
                                    font-size: #{$font-size - 2};
                                    text-align: right;
                                    font-weight: bold;
                                    color: #999;
                                }
                            }
                        }

                        & > ul {
                            & {
                                display: block;
                                width: 100%; height: auto;
                                list-style: 0;
                                font-size: 0;
                                text-align: right;
                                padding-bottom: 10px;
                            }

                            & > li {
                                & {
                                    display: inline-block;
                                    font-size: #{$font-size - 2};
                                    padding: 0 5px;
                                    color: #999;
                                }

                                & > i {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                        font-size: #{$font-size};
                                        padding-right: 3px;
                                    }
                                }

                                & > span {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                        font-size: #{$font-size - 1};
                                        font-weight: bold;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        /*
        & > li {
            & {
                display: block;
                width: 100%; height: auto;
                padding: 5px 10px;
                border-bottom: 1px solid #ddd;
            }

            &:nth-last-child(1){
                & {
                    border-bottom: 0;
                }
            }

            & > div {
                & {
                    display: table;
                    width: 100%; height: auto;
                    font-size: 0;
                }

                & > .love {
                    & {
                        display: table-cell;
                        vertical-align: middle;
                        width: 50px; height: auto;
                        text-align: center;
                    }

                    & > div {
                        & {
                            display: inline-block;
                            text-align: center;
                        }

                        & > i {
                            & {
                                display: block;
                                font-size: #{$font-size};
                                color: #aaa;
                            }
                        }

                        & > span {
                            & {
                                display: block;
                                font-size: #{$font-size - 2};
                                color: #aaa;
                                font-weight: bold;
                                padding-top: 3px;
                            }
                        }
                    }
                }

                & > .list {
                    & {
                        display: table-cell;
                        vertical-align: middle;
                        padding-left: 10px;
                    }

                    & > .title {
                        & {
                            display: block;
                        }

                        & > a {
                            & {
                                text-decoration: none;
                                color: #555;
                                display: block;
                            }

                            & > h1 {
                                & {
                                    font-size: #{$font-size + 1};
                                    color: #555;
                                    font-weight: bold;
                                    margin: 0; padding: 0;
                                    line-height: 1.3;
                                }

                                & > span {
                                    & {
                                        color: $bg-blue;
                                        font-weight: bold;
                                        padding-left: 5px;
                                    }
                                }
                            }
                        }
                    }

                    & > .options {
                        & {
                            display: block;
                            padding-top: 5px;
                        }

                        & > ul {
                            & {
                                display: block;
                                font-size: 0;
                                list-style: 0;
                            }

                            & > li {
                                & {
                                    display: inline-block;
                                    font-size: #{$font-size - 2}; 
                                    color: #aaa;
                                    padding-right: 10px;
                                }

                                &.user {
                                    & {
                                        font-weight: bold;
                                    }
                                }
                            }
                        }
                    }
                }

                & > .thumbnail {
                    & {
                        display: table-cell;
                        width: 80px; height: auto;
                        position: relative;
                        background-color: #ddd;
                        vertical-align: middle;
                        border-radius: 1px;
                        overflow: hidden;
                    }

                    &:after {
                        & {
                            content: " ";
                            display: block;
                            padding-bottom: 80%;
                        }
                    }

                    & > a {
                        & > i {
                            & {
                                position: absolute;
                                color: #bbb;
                                font-size: #{$font-size + 4};
                                left: 50%; top: 50%;
                                @include transform(translate(-50%, -50%));
                            }
                        }

                        & > img {
                            & {
                                position: absolute;
                                display: block;
                                width: 100%; height: 100%;
                                left: 50%; top: 50%;
                                object-fit: cover;
                                @include transform(translate(-50%, -50%));
                            }
                        }
                    }
                }
            }
        }
        */
    }
</style>
