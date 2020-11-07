<template>
    <ul class="grid">
        <li v-for="(item, i) in list" :key="i">
            <div>
                <div class="love">
                    <div>
                        <i><font-awesome-icon :icon="faHeartR" /></i>
                        <span>{{ item.like_count }}</span>
                    </div>
                </div>
                <div class="list">
                    <div class="title">
                        <h1>{{ item.title }}<span>[{{ (item.comment)?item.comment:0 }}]</span></h1>
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
                        <i v-if="(item.meta.thumbnail == undefined) ? true : false">
                            <font-awesome-icon :icon="faImage" />
                        </i>
                    <img
                        :src="`http://127.0.0.1:3000/images/${item.images[item.meta.thumbnail]}?resize=480`"
                        v-if="(item.meta.thumbnail != undefined) ? true : false"
                    />
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartR } from '@fortawesome/free-regular-svg-icons'

export default {
    name: 'grid',
    props: ['list', 'info'],
    data(){
        return {
            faHeartR, faImage
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
        }

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
</style>
