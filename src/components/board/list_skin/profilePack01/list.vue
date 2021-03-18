<template>    
    <ul class="list" v-if="list">
        <li v-for="(item, i) in list" :key="i" :class="{ image : item.images.length > 0, text : item.images.length <= 0 }">
            <div>
                <div>
                    <div v-if="item.images.length > 0">
                        <div class="img">
                            <div v-if="typeof item.meta.thumbnail == 'number' || typeof item.meta.thumbnail == 'string'">
                                <img :src="`http://127.0.0.1:3000/images/${item.images[item.meta.thumbnail]}?resize=480`">
                            </div>
                        </div>
                        <div class="info">
                            <div>
                                <div class="title">
                                    <h1 v-html="item.title"></h1>
                                    <span>[{{ item.comment }}]</span>
                                </div>
                                <div class="last">                               
                                    <ul class="left">
                                        <li>
                                            <i><font-awesome-icon :icon="faHeart" /></i>
                                            <span>{{ item.like_count }}</span>
                                        </li>
                                        <li>
                                            <i><font-awesome-icon :icon="faCommentAlt" /></i>
                                            <span>{{ item.comment }}</span>
                                        </li>
                                        <li>
                                            <i><font-awesome-icon :icon="faEye" /></i>
                                            <span>{{ item.views_count }}</span>
                                        </li>
                                    </ul>
                                    <ul class="right">
                                        <li>{{ item.board }}</li>
                                        <li>{{ item.state.displayDate }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="data">
                            <div>
                                <div class="title">
                                    <h1>{{ item.title }}</h1>
                                    <span>[{{ item.comment }}]</span>
                                </div>
                                <p>{{ item.post }}</p>
                            </div>
                        </div>
                        <div class="info">
                            <ul class="left">
                                <li>
                                    <i><font-awesome-icon :icon="faHeart" /></i>
                                    <span>{{ item.like_count }}</span>
                                </li>
                                <li>
                                    <i><font-awesome-icon :icon="faCommentAlt" /></i>
                                    <span>{{ item.comment }}</span>
                                </li>
                                <li>
                                    <i><font-awesome-icon :icon="faEye" /></i>
                                    <span>{{ item.views_count }}</span>
                                </li>
                            </ul>
                            <ul class="right">
                                <li>{{ item.board }}</li>
                                <li>{{ item.state.displayDate }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart, faEye, faCommentAlt } from '@fortawesome/free-regular-svg-icons'

export default {
    name : 'profile_list',
    props: ['list'],
    data(){
        return {
            // Icons
            faHeart, faEye, faCommentAlt,
        }
    },
    created(){
        console.log('asjdlkasjdlkasjdlas');
        console.log(this.list);
    }
}
</script>

<style lang="scss" scoped>
ul.list {
    & {
        display:block;
        width: 100%; height: auto;
        list-style: none;
        font-size: 0;
    }

    & > li {
        & {
            display: inline-block;
            vertical-align: top;
            width: 33.333%; height: auto;
            padding: 10px;
        }

        & > div {
            & {
                position: relative;
                display: block;
                width: 100%; height: auto;
                background-color: #f1f1f1;
                border-radius: 5px;
            }

            &:after {
                content: " ";
                display: block;
                padding-bottom: 70%;
            }

            & > div {
                & {
                    position: absolute;
                    display: block;
                    width: 100%; height: 100%;
                    left: 0; top: 0;
                    padding: 10px;
                }
            }
        }

        &.image {
            & > div {
                & > div {
                    & > div {
                        & {
                            position: relative;
                            display: block;
                            width: 100%; height: 100%;
                        }

                        & > .img {
                            & {
                                position: absolute;
                                display: block;
                                width: 100%; height: 65%;
                                left: 0; top: 0;
                                border-radius: 3px;
                                overflow: hidden;
                                background-color: #ccc;
                            }

                            & > div {
                                & {
                                    position: relative;
                                    display: block;
                                    width: 100%; height: 100%;
                                }

                                & > img {
                                    & {
                                        position: absolute;
                                        display: block; 
                                        width: 100%; height: 100%;
                                        left: 0; top: 0;
                                        object-fit: cover;
                                    }
                                }
                            }
                        }

                        & > .info {
                            & {
                                position: absolute;
                                display: block;
                                width: 100%; height: 35%;
                                left: 0; top: 65%;
                                padding-top: 10px;
                            }

                            & > div {
                                & {
                                    position: relative;
                                    display: table;
                                    width: 100%; height: 100%;
                                }

                                & > .title {
                                    & {
                                        display: block;
                                        width: 100%; height: auto;
                                        overflow: hidden;
                                        font-size: 0;
                                    }

                                    & > h1 {
                                        & {
                                            display: inline-block;
                                            vertical-align: middle;
                                            font-size: #{$font-size + 1};
                                            font-weight: bold;
                                            line-height: 1;
                                            color: #333;
                                            padding-right: 5px;
                                        }
                                    }

                                    & > span {
                                        & {
                                            display: inline-block;
                                            vertical-align: middle;
                                            font-size: #{$font-size + 1};
                                            font-weight: bold;
                                            line-height: 1;
                                            color: $bg-blue;
                                        }
                                    }
                                }

                                & > div.last {
                                    & {
                                        position: absolute;
                                        display: table;
                                        left: 0; bottom: 0;
                                        width: 100%; height: auto;
                                    }

                                    & > ul.right {
                                        & {
                                            display: table-cell;
                                            vertical-align: middle;
                                            width: 50%; height: auto;
                                            list-style: none;
                                            white-space: nowrap;
                                            font-size: 0;
                                            text-align: right;
                                        }

                                        & > li {
                                            & {
                                                display: inline-block;
                                                font-size: #{$font-size - 2};
                                                font-weight: bold;
                                                text-align: right;
                                                padding: 0;
                                                padding-left: 15px;
                                            }

                                            &:nth-child(1){
                                                & {
                                                    padding-left: 0;
                                                }
                                            }
                                        }
                                    }

                                    & > ul.left {
                                        & {
                                            display: table-cell;
                                            vertical-align: middle;
                                            width: 50%; height: auto;
                                            font-size: 0;
                                            list-style: none;
                                            white-space: nowrap;
                                        }

                                        & > li {
                                            & {
                                                display: inline-block;
                                                white-space: nowrap;
                                                width: 33.3333%; height: auto;
                                                font-size: 0;
                                                padding: 0;
                                            }

                                            & > i {
                                                & {
                                                    display: inline-block;
                                                    vertical-align: middle;
                                                    font-size: #{$font-size - 2};
                                                    color: #333;
                                                    line-height: 1;
                                                    padding-right: 5px;
                                                }
                                            }

                                            & > span {
                                                & {
                                                    display: inline-block;
                                                    vertical-align: middle;
                                                    font-size: #{$font-size - 2};
                                                    font-weight: bold;
                                                    color: #333;
                                                    line-height: 1;
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

        &.text {
            & > div {
                & > div {
                    & > div {
                        & {
                            position: relative;
                            display: block;
                            width: 100%; height: 100%;
                            padding-bottom: 10px;
                        }

                        & > .data {
                            & {
                                position: absolute;
                                display: block;
                                width: 100%; height: 100%;
                                left: 0; top: 0;
                                padding-bottom: 30px;
                            }

                            & > div {
                                & {
                                    display: block;
                                    width: 100%; height: 100%;
                                    overflow: hidden;
                                }

                                & > .title {
                                    & {
                                        display: block;
                                        width: 100%; height: auto;
                                        overflow: hidden;
                                        font-size: 0;
                                        padding-top: 10px;
                                    }

                                    & > h1 {
                                        & {
                                            display: inline-block;
                                            vertical-align: middle;
                                            font-size: #{$font-size + 1};
                                            font-weight: bold;
                                            line-height: 1;
                                            color: #333;
                                            padding-right: 5px;
                                        }
                                    }

                                    & > span {
                                        & {
                                            display: inline-block;
                                            vertical-align: middle;
                                            font-size: #{$font-size + 1};
                                            font-weight: bold;
                                            line-height: 1;
                                            color: $bg-blue;
                                        }
                                    }
                                }

                                & > p {
                                    & {
                                        display: block;
                                        width: 100%; padding-top: 5px;
                                        font-size: #{$font-size};
                                        font-weight: normal;
                                        line-height: 1.6;
                                        letter-spacing: 1px;
                                    }
                                }

                            }
                        }

                        & > .info {
                            & > ul.right {
                                & {
                                    position: absolute;
                                    bottom: 0; right: 0;
                                    font-size: 0;
                                    list-style: none;
                                    white-space: nowrap;
                                }

                                & > li {
                                    & {
                                        display: inline-block;
                                        font-size: #{$font-size - 2};
                                        font-weight: bold;
                                        padding: 5px;
                                    }
                                }
                            }

                            & > ul.left {
                                & {
                                    position: absolute;
                                    bottom:0; left: 0;
                                    font-size: 0;
                                    list-style: none;
                                    white-space: nowrap;
                                }

                                & > li {
                                    & {
                                        display: inline-block;
                                        font-size: 0;
                                        padding: 5px;
                                        white-space: nowrap;
                                    }

                                    & > i {
                                        & {
                                            display: inline-block;
                                            vertical-align: middle;
                                            font-size: #{$font-size - 2};
                                            color: #333;
                                            line-height: 1;
                                            padding-right: 5px;
                                        }
                                    }

                                    & > span {
                                        & {
                                            display: inline-block;
                                            vertical-align: middle;
                                            font-size: #{$font-size - 2};
                                            font-weight: bold;
                                            color: #333;
                                            line-height: 1;
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
</style>
