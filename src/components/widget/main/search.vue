<template>
        <div class="search">
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
                    <input type="text">
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
            max-width: 700px;
            margin: 30px auto;
            overflow:hidden;
            border-radius:5px;
            @include box-shadow(5px 15px 15px rgba(0,0,0,0.1));
        }

        & > .menu {

            & > ul {
                & {
                    font-size: 0;
                    text-decoration: none;
                    background-color: $bg-black-light;
                }

                & > li {
                    & {
                        display: inline-block;
                        width: auto;
                        height: 40px;
                        font-size: $font-size;
                        background-color: $bg-black-light;
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
</style>
