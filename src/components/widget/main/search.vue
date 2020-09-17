<template>
    <div class="search">
        <!--
        <div class="title">
            <h1>V<span>R</span></h1>
            <h1>V<span>IEWER</span></h1>
        </div>
        -->
        <div class="box">
            <div class="menu">
                <ul>
                    <li v-for="list in this.lists" :key="list.ko" v-bind:class="{ active : list.isActive }">
                        <div>
                            <a href="#">{{ list.ko }}</a>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="form">
                <div class="submit">
                    <input type="submit" value="검색">
                </div>
                <div class="input">
                    <input type="text" placeholder="# 아아.. 이건 검색이라고 한단다.." >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'search',
    data: function(){
        return {
            lists : {
					"all": {
						"ko": "통합",
                        "link": "http://naver.com",
                        "isActive" : true
					},
					"user": {
						"ko": "유저",
                        "link": "http://naver.com"
					},
					"map": {
						"ko": "맵",
						"link": "http://naver.com"
					},
					"other": {
						"ko": "기타",
						"link": "http://naver.com"
					}
				}
        }
    }
}
</script>

<style lang="scss">
    .search {
        & {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            position: relative;
            @include box-shadow(5px 5px 5px rgba(0,0,0,0.1));
        }

        & > .title {
            & {
                position: absolute;
                right: 100%; top: 50%;
                padding-right: 70px;
                white-space: nowrap;
                margin-top: -10px;
                @include transform(translateY(-50%));
            }

            & > h1 {
                & {
                    font-size: #{$font-size + 50};
                    color: $bg-orange;
                    font-family: $notoKR-B;
                    display: inline-block;
                    line-height: 1;
                    position: relative;
                    margin-left: -5px;
                }

                &:nth-child(1){
                    & {
                        margin-left: 0;
                    }
                }

                & > span {
                    & {
                        font-size: #{$font-size + 5};
                        position: absolute;
                        left: 10px; top: 100%;
                    }
                }
			}
        }

        & > .box {
            & {
                width: 100%;
                margin: 0 auto;
                overflow:hidden;
                border-radius:5px;
                position: relative;
                @include box-shadow(5px 5px 5px rgba(0,0,0,0.1));
            }

            & > .menu {

                & > ul {
                    & {
                        font-size: 0;
                        text-decoration: none;
                        background-color: #333;
                    }

                    & > li {
                        & {
                            display: inline-block;
                            width: auto;
                            height: 40px;
                            font-size: $font-size;
                            background-color: #333;
                        }

                        &.active {
                            & {
                                background-color: $bg-orange;
                            }
                        }

                        & > div {
                            & {
                                display:table;
                                width:100%;
                                height:100%;
                            }

                            & > a {
                                font-size: #{$font-size - 1};
                                text-decoration: none;
                                color: #fff;
                                display: table-cell;
                                width: auto;
                                height: 100%;
                                padding: 0 15px;
                                vertical-align: middle;
                                cursor:pointer;
                            }
                        }
                    }
                }
            }

            & > .form {
                & {
                    position: relative;
                }

                & > .input {
                    & {
                        height: 50px;
                        border: 2px solid $bg-orange;
                        display: block;
                        margin-right:100px;
                    }
                    & > input {
                        width: 100%;
                        height: 100%;
                        background-color: #fff;
                        border: none;
                        outline: none;
                        padding: 0 15px;
                    }
                }

                & > .submit {
                    & {
                        width: 100px;
                        height: 50px;
                        display: block;
                        float: right;
                        background-color: $bg-orange;
                    }

                    & > input[type=submit] {
                        width: 100%;
                        height: 100%;
                        display: block;
                        cursor: pointer;
                        background: none;
                        border: none;
                        color: #fff;
                    }
                }

                &:after {
                    content: " ";
                    display: block;
                    clear: both;
                }
            }
        }
    }
</style>
