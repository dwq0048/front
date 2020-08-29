<template>
    <ul class="grid">
        <li v-for="(item, i) in list" :key="i">
            <div class="num">
                <p>
                    <i><font-awesome-icon :icon="faHeartR" /></i>
                    <span>0</span>
                </p>
            </div>
            <div class="title">
                <p class="king"><router-link :to="'/'+info.board+'/post/'+item._id">{{ item.title }}</router-link></p>
                <div class="info">
                    <p class="date">{{ item.state.displayDate }}</p>
                    <p class="name">{{ item.user.name }}</p>
                </div>
            </div>
            <div class="thumbnail">
                <div>
                
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart as faHeartR } from '@fortawesome/free-regular-svg-icons'

export default {
    name: 'grid',
    props: ['list', 'info'],
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
            & > .title {
                & {
                    width: 82%;
                    padding: 10px 0;
                }

                & > .king {
                    & {
                        display: block;
                        width: 100%;
                    }

                    & > a {
                        display: block;
                        text-decoration: none;
                        color: #333;
                        font-weight: bold;
                        font-size: #{$font-size + 2};
                        padding-bottom: 10px;
                    }
                }

                & > .info {
                    & {
                        display: block;
                        font-size: #{$font-size};
                        color: #555;
                    }

                    & > .date {
                        & {
                            display: inline-block;
                            padding-right: 30px;
                        }
                    }

                    & > .name {
                        & {
                            display: inline-block;
                        }
                    }
                }
            }

            & > .thumbnail {
                & {
                    width: 10%;
                    height: auto;
                    display: table-cell;
                    padding: 15px;
                }

                & > div {
                    & {
                        width: 100px;
                        height: auto;
                        position: relative;
                        overflow: hidden;
                        border-radius: 1px;
                        background-color: #ccc;
                    }

                    &:after {
                        content: " ";
                        display: block;
                        padding-bottom: 80%;
                    }
                }
            }
        }
    }
</style>
