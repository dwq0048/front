<template>
    <div class="menu">
        <ul>
            <li class="title">
                <router-link to="/login">로그인</router-link>
            </li>
        </ul>
        <ul>
            <li>
                <div>홈</div>
                <ul>
                    <li>
                        <router-link to="/notice">공지사항</router-link>
                        <router-link to="/">버그 리포트</router-link>
                    </li>
                </ul>
            </li>
        </ul>
        <ul>
            <li>
                <div>정보</div>
                <ul>
                    <li>
                        <router-link to="/">WIKI</router-link>
                        <router-link to="/">질문</router-link>
                    </li>
                </ul>
            </li>
        </ul>
        <ul>
            <li>
                <div>커뮤니티</div>
                <ul>
                    <li>
                        <router-link to="/free">자유게시판</router-link>
                        <router-link to="/">VR 포토</router-link>
                        <router-link to="/">VR 영상</router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .menu {
        & {
            width: 300px;
            background-color: #fff;
            position: relative;
            left: 0;
            @include transition(.2s all);
        }

        & > ul {
            & {
                border-bottom: 1px solid #f1f1f1;
                width: 100%;
            }

            & > li {
                & {
                    padding: 20px 20px;
                    display: block;
                }

                & > div {
                    font-size: #{$font-size - 2};
                    font-weight: bold;
                }

                & > ul {
                    & {
                        font-size: 0;
                        text-decoration: none;
                    }

                    & > li {
                        & {
                            padding: 5px 0px;
                        }

                        & > a {
                            display: block;
                            padding: 7px 20px;
                            font-size: #{$font-size};
                            text-decoration: none;
                            color: #333;
                            @include transition(all .2s)
                        }

                        & > a:hover {
                            background-color: #f9f9f9;
                            @include transition(all .2s);
                        }
                    }
                }
            }

            & > .title {
                & {
                    padding: 20px 10px;    
                }
                
                & > a {
                    width: 90%;
                    height: auto;
                    display: block;
                    margin: 0 auto;
                    text-align: center;
                    vertical-align: middle;
                    background-color: #{$bg-orange};
                    color: #fff;
                    padding: 10px 0;
                    cursor: pointer;
                    text-decoration: none;
                    border-radius: 5px;
                    @include transition(all .2s);
                }

                & > a:hover {
                    background-color: #{$bg-orange-bold};
                    @include transition(all .2s);
                }
            }
        }
        
    }

/*
@keyframes menu {
    100% {

    }

    0% {
        display: none;
    }
}
*/
</style>