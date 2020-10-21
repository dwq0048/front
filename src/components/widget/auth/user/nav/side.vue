<template>
    <div class="menu">
        <div>
            <div class="profile" v-if="menu.options.profile">
                <div>
                    <div class="img">

                    </div>
                    <div class="description">
                        <h1>대충 이름</h1>
                        <span class="level">레밸 : <span>1</span></span>
                    </div>
                </div>
                <button type="button" class="btn">
                    <span>로그아웃</span>
                </button>
            </div>
            <div class="nav">
                <ul>
                    <li v-for="(item, i) in menu.children" :key="i">
                        <router-link :to="item.link" :title="item.ko">
                            <div>
                                <i><font-awesome-icon :icon="item.icon" /></i>
                                <span>{{ item.ko }}</span>
                            </div>
                        </router-link>
                        <ul>
                            <li v-for="(list, k) in item.children" :key="k">
                                <button type="button" :title="list.ko">
                                    <span>{{ list.ko }}</span>
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
    name : 'AuthSide',
    props : [ 'menu' ],
}
</script>

<style lang="scss" scoped>
    .menu {
        & {
            display: table-cell;
            width: 300px; height: auto;
            vertical-align: top;
            padding: 5px 10px;
        }

        & > div {
            & {
                display: block;
                width: 100%; height: auto;
                padding: 10px;
                background-color: #f9f9f9;
                border-radius: 3px;
                @include box-shadow(2px 2px 5px rgba(0,0,0,0.1));
            }

            & > .profile {
                & {
                    display: block;
                    width: 100%; height: auto;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #eee;
                }

                & > div {
                    & {
                        display: table;
                        width: 100%; height: auto;
                    }

                    & > .img {
                        & {
                            display: table-cell;
                            position: relative;
                            vertical-align: top;
                            width: 50px; height: auto;
                            border-radius: 3px;
                            background-color: #ccc;
                        }

                        &:after {
                            content: " ";
                            display: block;
                            padding-bottom: 100%;
                        }
                    }

                    & > .description {
                        & {
                            display: table-cell;
                            vertical-align: top;
                            width: auto; height: auto;
                            padding: 5px 10px;
                        }

                        & > h1 {
                            & {
                                display: block;
                                font-size: #{$font-size + 2};
                                font-weight: bold;
                                line-height: 1;
                                color: #555;
                                padding-bottom: 5px;
                            }
                        }

                        & > span {
                            & {
                                display: block;
                                font-size: #{$font-size - 2};
                                font-weight: normal;
                                color: #aaa;
                            }
                        }
                    }
                }

                & > button.btn {
                    & {
                        display: block;
                        width: 100%; height: 30px;
                        border: 0; background: none;
                        margin: 0; padding: 0;
                        outline: none; cursor: pointer;
                        background-color: $bg-orange;
                        margin-top: 15px;
                        border-radius: 3px;
                        font-size: #{$font-size - 2};
                        letter-spacing: 1px;
                        color: #fff;
                        @include transition(.2s all);
                    }

                    &:hover {
                        & {
                            background-color: $bg-orange-bold;
                            @include transition(.2s all);
                        }
                    }
                }
            }

            & > .nav {
                & {
                    display: block;
                    width: 100%; height: auto;
                }

                & > ul {
                    & {
                        display: block;
                        width: 100%; height: auto;
                        font-size: 0;
                        list-style: none;
                    }

                    & > li {
                        & {
                            width: 100%; height: auto;
                            border-top: 1px solid #eee;
                            padding: 5px 0;
                        }

                        &:nth-child(1){
                            & {
                                padding-top: 0;
                                border-top: 0;
                            }
                        }

                        & > a {
                            & {
                                display: table;
                                width: 100%; height: 40px;
                                text-decoration: none;
                                padding: 0 10px;
                                border-radius: 3px;
                            }

                            & > div {
                                & {
                                    display: table-cell;
                                    vertical-align: middle;
                                    width: 100%; height: auto;
                                    font-size: #{$font-size + 4};
                                    color: #555;
                                }

                                & > i {
                                    & {
                                        padding-right: 10px;
                                    }
                                }

                                & > span {
                                    & {
                                        font-weight: bold;
                                    }
                                }
                            }
                        }

                        & > ul {
                            & {
                                display: block;
                                width: 100%; height: auto;
                                font-size: 0;
                                list-style: none;
                                padding: 5px;
                            }

                            & > li {
                                & {
                                    display: block;
                                    width: 100%; height: auto;
                                }

                                & > button {
                                    & {
                                        display: block;
                                        width: 100%; height: 35px;
                                        border: 0; background: none;
                                        margin: 0; padding: 0;
                                        outline: none; cursor: pointer;
                                        text-align: left;
                                        padding: 0 10px;
                                        font-size: #{$font-size};
                                        color: #666;
                                    }
                                }
                            }
                        }

                        &.active {
                            & > a {
                                & {
                                    background-color: #eee;
                                }

                                & > div{
                                    & {
                                        color: #333;
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
