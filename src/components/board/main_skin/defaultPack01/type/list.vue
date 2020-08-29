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
                <p><router-link :to="'/'+info.board+'/post/'+item._id">{{ item.title }}</router-link></p>
            </div>
            <div class="date">
                <p>{{ item.state.displayDate }}</p>
            </div>
            <div class="user">
                <p>{{ item.user.name }}</p>
            </div>
        </li>
    </ul>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart as faHeartR } from '@fortawesome/free-regular-svg-icons'

export default {
    name: 'list',
    props: ['list', 'info', 'page'],
    data(){
        return {
            faHeartR
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
                    width: 7%;
                    height: auto;
                    display: table-cell;
                }

                & > p {
                    & {
                        vertical-align: middle;
                        text-align: center;
                        padding-right: 10px;
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
                    width: 63%;
                    height: auto;
                    display: table-cell;   
                }

                & > p {
                    & > a {
                        text-decoration: none;
                        color: $font-color;
                        font-size: #{$font-size + 2};
                        font-weight: bold;
                        display: block;
                    }
                }
            }

            & > .date {
                width: 10%;
                height: auto;
                display: table-cell;
            }

            & > .user {
                width: 20%;
                height: auto;
                display: table-cell;
            }

            &:hover {
                & > .title {
                    & > p {
                        & > a {
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
    }
</style>
