<template>
    <ul class="grid">
        <li v-for="(item, i) in list" :key="i">
            <div>
                <div class="thumbnail">
                    <div>
                        <router-link :to="'/'+info.board+'/'+item._id">
                            <img
                                :src="`http://127.0.0.1:3000/images/${item.images[item.meta.thumbnail]}?resize=480`"
                                v-if="(item.meta.thumbnail != undefined) ? true : false"
                            />
                        </router-link>
                    </div>
                </div>
                <div class="info">
                    <div class="title">
                        <router-link :to="'/'+info.board+'/'+item._id">
                            <h1 v-html="item.title"></h1>
                        </router-link>
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
    },
}
</script>

<style lang="scss" scoped>
    ul.grid {
        & {
            font-size: 0;
            list-style: none;
            padding: 5px 0;
            margin-left: -10px;
            margin-right: -10px;
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

                        & > a {
                            & {
                                display: block;
                                width:100%; height: 100%;
                                position: absolute;
                                left: 0; top: 0;
                            }

                            & > img {
                                & {
                                    width: 100%; height: 100%;
                                    object-fit: cover;
                                }
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

                        & > a {
                            & {
                                display: block;
                                text-decoration: none;
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

                            &:hover {
                                & {
                                    text-decoration: underline;
                                    text-decoration-color: #555;
                                }
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

                & > .thumbnail:hover ~ .info > .title > a {
                    & {
                        text-decoration: underline;
                        text-decoration-color: #555;
                    }
                }
            }
        }

    }
</style>
