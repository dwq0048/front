<template>
    <ul>
        <li v-for="(item, i) in list" :key="i">
            <div class="num">
                <p>
                    <i><font-awesome-icon :icon="faHeartR" /></i>
                    <span>{{ ((page * 15)+i)+1 }}</span>
                </p>
            </div>
            <div class="title">
                <router-link :to="'/'+info.board+'/post/'+item._id">
                    <h1>{{ item.title }}</h1>
                    <i v-if="(item.meta.thumbnail != undefined) ? true : false">
                        <font-awesome-icon :icon="faImage" />
                    </i>
                    <span>[0]</span>
                </router-link>
            </div>
            <div class="date">
                <p>{{ item.state.displayDate }}</p>
            </div>
            <div class="user">
                <p>{{ item.users.nickname }}</p>
            </div>
        </li>
    </ul>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartR } from '@fortawesome/free-regular-svg-icons'

export default {
    name: 'list',
    props: ['list', 'info', 'page'],
    data(){
        return {
            faHeartR, faImage
        }
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
                width: 100%;
                height: 45px;
                display: table;
                list-style: none;
                font-size: #{$font-size};
                border-bottom: 1px solid #f1f1f1;
                padding: 0 10px;
            }

            & > div {
                vertical-align: middle;
            }

            & > .num {
                & {
                    width: 8%;
                    height: auto;
                    display: table-cell;
                }

                & > p {
                    & {
                        vertical-align: middle;
                        text-align: center;
                        padding-right: 10px;
                        color: #999;
                    }

                    & > i {
                        & {
                            font-size: #{$font-size - 4};
                            display: inline-block;
                            vertical-align: middle;
                            padding-right: 5px;
                        }
                    }

                    & > span {
                        & {
                            display: inline-block;
                            vertical-align: middle;
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
                        text-decoration: none;
                        color: $font-color;
                        font-size: #{$font-size + 1};
                        font-weight: bold;
                        display: block;
                        line-height: 1;
                    }

                    & > h1 {
                        & {
                            display: inline-block;
                            vertical-align: middle;
                            color: #555;
                            font-size: #{$font-size + 1};
                            margin: 0; padding: 0;
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

            & > .date {
                width: 10%;
                height: auto;
                display: table-cell;
                color: #999;
                font-size: #{$font-size};
            }

            & > .user {
                width: 20%;
                height: auto;
                display: table-cell;
                color: #999;
                font-size: #{$font-size};
            }
        }
    }
</style>
