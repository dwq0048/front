<template>
    <div id="header">
        <div class="top-bar">
            <div>
                <div class="logo">
                    <router-link to="/" title="홈으로"><span>VV</span></router-link>
                </div>
                <div class="menu" title="메뉴">
                    <router-link to="/login" title="로그인" v-if="!GET_LOGIN" class="btn">로그인</router-link>
                    <router-link to="/login" title="로그인" v-if="GET_LOGIN" class="btn">안녕하세요</router-link>
                    <a class="ham" v-on:click="Navigation(true)">
                        <div></div>
                        <div></div>
                        <div></div>
                    </a>
                </div>
            </div>
        </div>
        <div class="nav">

        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

const userStore = 'userStore';

export default {
    name: 'default-header',
    computed: {
        ...mapGetters([
            'GET_NAVIGATION'
        ]),
        ...mapGetters(userStore, [
            'GET_LOGIN'
        ])
    },
    methods : {
        ...mapActions([
            'ON_NAVIGATION'
        ]),
        Navigation : function(value){
            this.ON_NAVIGATION(true)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #header {
        & {
            width: 100%;
            height: auto;
            background-color: $bg-black-light;
        }

        & > .top-bar {
            & {
                width: 100%;
                max-width: $wrap;
                height: 50px;
                display: table;
                margin: 0 auto;
                overflow: hidden;
            }

            &:after {
                @include after();
            }

            & > div {
                & {
                    display: table-cell;
                    vertical-align: middle;
                }

                & > .logo {
                    & {
                        height: 50px;
                        background-color: $bg-blue;
                        display: table;
                        vertical-align: middle;
                        float: left;
                        @include box-shadow(5px 5px 15px rgba(0,0,0,0.1));
                    }

                    & > a{
                        & {
                            color: #fff;
                            font-size: 18px;
                            font-weight: 300;
                            display: table-cell;
                            vertical-align: middle;
                            padding: 0 20px;
                            letter-spacing: 1px;
                            text-decoration: none;
                        }

                        & > span {
                            color: #fff;
                            font-size: 20px;
                            font-family: $notoKR-B;
                            letter-spacing: -3px;
                            display: block;
                            @include transform(rotate(90deg));
                        }
                    }
  
                }

                & > .menu {
                    & {
                        float: right;
                        display: table;
                        height: 50px;
                        width: auto;
                    }

                    & > a{
                        & {
                            display: table-cell;
                            width: 100px;
                            height: 35px;
                            vertical-align: middle;
                            text-decoration: none;
                            color: #f1f1f1;
                            text-align: center;
                            font-size: 13px;
                            padding: 0;
                            margin: 0;
                            letter-spacing: 1px;
                            cursor: pointer;
                            @include transform(scale(1));
                            @include transition(all .2s);
                        }

                        &.btn {
                            width: auto;
                            padding-right:30px;
                        }

                        &:hover {
                            color: #fff;
                            @include transform(scale(1.1));
                            @include transition(all .2s);
                        }
                    }

                    & > a.ham {
                        & {
                            width: 50px;
                            background-color: $bg-blue;
                            border:none;
                            @include box-shadow(5px 5px 15px rgba(0,0,0,0.1));
                        }

                        & > div {
                            & {
                                width: 20px;
                                height: 2px;
                                margin: 6px auto;
                                background-color: #fff;
                                display:block;
                                border-radius: 5px;
                            }
                        }
                    }
                }
            }
        }

        & > .nav {
            & {
                width: 100%;
                height: 5px;
                background-color: $bg-orange;
                border-bottom: 2px solid $bg-orange;
            }

            & > ul {
                & {
                    width: 100%;
                    max-width: $wrap;
                    height: 100%;
                    margin: 0 auto;
                    font-size: 0;
                }

                & > li {
                    & {
                        width: auto;
                        height: 100%;
                        display: inline-block;
                        list-style: none;
                        font-size: 14px;
                    }

                    & > a {
                        & {
                            color: #fff;
                            font-weight: 100;
                            text-decoration: none;
                            height: 100%;
                            display: table;
                            padding: 0 15px;
                        }

                        & > span {
                            & {
                                display: table-cell;
                                vertical-align: middle;
                                letter-spacing: 0.6px;
                            }
                        }

                    }
                }
            }
        }
    }
</style>
