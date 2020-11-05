<template>
    <ul>
        <li v-for="(item, i) in list" :key="i" :class="{ active : options }">
            <div class="num">
                <div v-if="!options">
                    <div>
                        <i><font-awesome-icon :icon="faHeartR" /></i>
                        <span>{{ item.like.count }}</span>
                    </div>
                </div>
                <div v-if="options">
                    <div>
                        <i><font-awesome-icon :icon="faFlag" /></i>
                    </div>
                </div>
            </div>
            <div class="title">
                <router-link :to="'/'+info.board+'/'+item._id">
                    <div>
                        <h1>{{ item.title }}</h1>
                        <i v-if="(item.meta.thumbnail != undefined) ? true : false">
                            <font-awesome-icon :icon="faImage" />
                        </i>
                        <span>[{{ (item.comment)?item.comment:0 }}]</span>
                    </div>
                </router-link>
            </div>
            <div class="views">
                <i><font-awesome-icon :icon="faEye" /></i>
                <span>0</span>
            </div>
            <div class="date">
                <span>{{ item.state.displayDate }}</span>
            </div>
            <div class="user">
                <span>{{ item.users.nickname }}</span>
            </div>
        </li>
    </ul>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faImage, faFlag } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartR, faEye } from '@fortawesome/free-regular-svg-icons'

export default {
    name: 'list',
    props: ['list', 'info', 'page', 'option'],
    data(){
        return {
            faHeartR, faImage, faFlag, faEye,

            options : false
        }
    },
    created(){
        this.options = (this.option)?true:false;
    }
}
</script>

<style lang="scss" scoped>
    ul {
        & {
            font-size: 0;
            list-style: none;
        }

        & > li {
            & {
                width: 100%; height: auto;
                display: table;
                list-style: none;
                font-size: #{$font-size};
                padding: 0 10px;
                border-bottom: 1px solid #f1f1f1;
            }

            & > div {
                & {
                    vertical-align: middle;
                }
            }

            & > .num {
                & {
                    width: 8%; height: auto;
                    display: table-cell;
                    text-align: center;
                }

                & > div {
                    & {
                        display: table;
                        width: 100%; height: auto;
                        padding-right: 10px;
                        text-align: center;
                        color: #999;
                    }

                    & > div {
                        & {
                            display: table-cell;
                            vertical-align: middle;
                        }

                        & > i {
                            & {
                                display: inline-block;
                                vertical-align: middle;
                                font-size: #{$font-size - 4};
                                padding-right: 5px;
                                line-height: 1;
                            }
                        }

                        & > span {
                            & {
                                display: inline-block;
                                vertical-align: middle;
                                line-height: 1;
                            }
                        }

                    }
                }
            }

            & > .title {
                & {
                    width: 62%;
                    height: auto;
                    display: table-cell;   
                }

                & > a {
                    & {
                        display: table;
                        width: 100%; height: auto;
                        font-size: #{$font-size + 1};
                        text-decoration: none;
                        color: $font-color;
                        font-weight: bold;
                        line-height: 1;
                        padding: 12px 0;
                    }

                    & > div {
                        & {
                            display: table-cell;
                            vertical-align: middle;
                        }

                        & > h1 {
                            & {
                                display: inline-block;
                                vertical-align: middle;
                                color: #555;
                                font-size: #{$font-size + 1};
                                margin: 0; padding: 0;
                                line-height: 1;
                            }
                        }

                        & > span {
                            & {
                                display: inline-block;
                                vertical-align: middle;
                                color: $bg-blue;
                                padding-left: 5px;
                            }
                        }

                        & > i {
                            & {
                                display: inline-block;
                                vertical-align: middle;
                                color: $bg-blue;
                                padding-left: 5px;
                                font-size: #{$font-size};
                            }
                        }
                    }
                }
            }

            & > .views {
                & {
                    display: table-cell;
                    width: auto; height: auto;
                    color: #999;
                    font-size: #{$font-size};
                    text-align: right;
                    padding: 0 15px;
                }

                & > i {
                    & {
                        display: inline-block;
                        vertical-align: middle;
                        font-size: #{$font-size - 4};
                    }
                }

                & > span {
                    & {
                        display: inline-block;
                        vertical-align: middle;
                        font-weight: bold;
                        padding-left: 7px;
                    }
                }
            }

            & > .date {
                & {
                    display: table-cell;
                    width: 10%; height: auto;
                    font-size: #{$font-size};
                    color: #999;
                }
            }

            & > .user {
                & {
                    display: table-cell;
                    width: 10%; height: auto;
                    padding: 0 15px;
                    font-size: #{$font-size};
                    color: #999;
                    text-align: right;
                }
            }

            &.active {
                & {
                    background-color: #86b6e6;
                    border-bottom: 1px solid $bg-blue-light;
                }

                &:nth-last-child(1){
                    & {
                        border-bottom: 0;
                    }
                }

                & > .num {
                    & > div {
                        color: #f1f1f1;
                    }
                }

                & > .title {
                    & > a {
                        & {
                            color: #fff;
                            padding: 10px 0;
                        }

                        & > div {
                            & > h1 {
                                & {
                                    color: #fff;
                                    font-size: #{$font-size};
                                }
                            }

                            & > span {
                                & {
                                    color: #f1f1f1;
                                    font-size: #{$font-size - 1};
                                }
                            }
                        }
                    }
                }

                & > .date {
                    & {
                        color: #f1f1f1;
                        font-size: #{$font-size - 1};
                        font-weight: bold;
                    }
                }

                & > .views {
                    & {
                        color: #f1f1f1;
                        font-size: #{$font-size - 1};
                        font-weight: bold;
                    }

                    & > span {
                        & > span{
                            & {
                                font-size: #{$font-size};
                            }
                        }
                    }
                }

                & > .user {
                    & {
                        color: #f1f1f1;
                        font-size: #{$font-size - 1};
                        font-weight: bold;
                    }
                }
            }
        }
    }
</style>
