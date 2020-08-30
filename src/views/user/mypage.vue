<template>
    <div class="mypage">
        <layout-navigation />
		<layout-header />

        <div class="dashboard">
            <div class="dash_nav">
                <div>
                    <div class="profile">
                        <div>
                            <div class="img">
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div class="nav">
                        <div>
                            <button type="button" data-name="dashboard"></button>
                            <button type="button" data-name="vrchatApi"></button>
                            <button type="button" data-name="post"></button>
                            <button type="button" data-name="vrchatApi"></button>
                            <button type="button" data-name="setting"></button>
                            <button type="button" data-name="password"></button>
                            <button type="button" data-name="signOut"></button>

                            <ul>
                                <li>
                                    <button type="button">
                                        <span>Dashboard</span>
                                    </button>
                                </li>
                                <li>
                                    <button type="button">
                                        <span>Vrchat API</span>
                                    </button>
                                </li>
                                <li>
                                    <button type="button">
                                        <span>내 게시글</span>
                                    </button>
                                </li>
                                <li>
                                    <button type="button">
                                        <span>프로필 설정</span>
                                    </button>
                                </li>
                                <li>
                                    <button type="button">
                                        <span>비밀번호 변경</span>
                                    </button>
                                </li>
                                <li>
                                    <button type="button">
                                        <span>회원 탈퇴</span>
                                    </button>
                                </li>
                            </ul>
                            <div class="active">
                                <div class="hidden">
                                    <div class="circle"></div>
                                    <div class="radius top"></div>
                                    <div class="radius bottom"></div>
                                </div>
                                <div class="arrow">
                                    <ul>
                                        <li>
                                            <button type="button">
                                                <span>Dashboard</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button">
                                                <span>Vrchat API</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button">
                                                <span>내 게시글</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button">
                                                <span>프로필 설정</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button">
                                                <span>비밀번호 변경</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button">
                                                <span>회원 탈퇴</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="widget">
                    
                    </div>
                </div>
            </div>
        </div>

        <default-footer />        
    </div>
</template>

<script>
import Header from '@/components/layout/header'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'

export default {
    name: 'userMypage',
    components: {
		'layout-header': Header,
        'layout-navigation': Navigation,
        'default-footer': Footer,
    }
}
</script>

<style lang="scss" scoped>
    .mypage {
        & > .dashboard {
            & {
                width: 100%;
                max-width: $wrap;
                height: auto;
                margin: 50px auto;
                background-color: #fff;
                padding: 30px 0;
                border-radius: 15px;
                @include box-shadow(5px 5px 15px rgba(0,0,0,0.1));
            }

            &:after {
                content: " ";
                display: block;
                clear: both;
            }

            & > .dash_nav {
                & {
                    width: 300px;
                    height: 100%;
                    margin-right: 10px;
                    float: right;
                }

                & > div {
                    & {
                        width: 100%;
                        height: 100%;
                        background-color: #fff;
                    }

                    & > .profile {
                        & {
                            width: 100%;
                            height: auto;
                            padding: 30px 15px;
                        }

                        & > div {
                            & > .img {
                                & > div {
                                    & {
                                        width: 50px;
                                        height: auto;
                                        position: relative;
                                        border-radius: 50%;
                                        background-color: #999;
                                        overflow: hidden;
                                    }

                                    &:after {
                                        content: " ";
                                        display: block;
                                        padding-bottom: 100%;
                                    }
                                }
                            }


                        }
                    }

                    & > .nav {
                        & {
                            width: 100%; height: auto;
                            background-color: $bg-orange;
                            font-size: 0;
                            padding: 50px 0;
                            border-radius: 10px;
                        }

                        & > div {
                            & {
                                display: block;
                                position: relative;
                                width: 100%; height: auto;
                                background-color: $bg-orange;
                                font-size: 0;
                            }

                            & > button {
                                & {
                                    width: 100%;
                                    height: 40px;
                                    border: none;
                                    background: none;
                                    outline: none;
                                    padding: 0;
                                    margin: 0;
                                    cursor: pointer;
                                    position: relative;
                                    z-index: 10;
                                }
                            }

                            & > ul {
                                & {
                                    position: absolute;
                                    left: 0; top: 0;
                                    width: 100%;
                                    height: auto;
                                    font-size: 0;
                                    list-style: none;
                                    background-color: $bg-orange;
                                }

                                & > li {
                                    & > {
                                        display: block;
                                        width: 100%;
                                        height: auto;
                                    }

                                    & > button {
                                        & {
                                            width: 100%;
                                            height: 40px;
                                            border: 0;
                                            background: none;
                                            outline: none;
                                            margin: 0;
                                            padding: 0;
                                            cursor: pointer;
                                            font-size: #{$font-size};
                                            color: #fff;
                                            text-align: left;
                                            padding-left: 20%;
                                        }
                                    }
                                }
                            }

                            & > .active {
                                & {
                                    display: block;
                                    width: 90%; height: 40px;
                                    position: absolute;
                                    top: 0; right: 0;
                                    @include transition(.2s all);
                                }

                                & > .hidden {
                                    & {
                                        position: absolute;
                                        width: 100%; height: 100%;
                                    }

                                    & > .circle {
                                        & {
                                            display: inline-block;
                                            width: 40px; height: 40px;
                                            font-size: 0;
                                            border-radius: 50%;
                                            overflow: hidden;
                                            position: absolute;
                                            left: 0; top: 0;
                                            background-color: #fff;
                                            @include transform(translateX(-50%));
                                        }
                                    }

                                    & > .radius {
                                        & {
                                            display: inline-block;
                                            position: absolute;
                                            width: 40px; height: 40px;
                                            right: 0;
                                            background-color: #fff;
                                            overflow: hidden;
                                        }

                                        &.top {
                                            & {
                                                bottom: 100%;
                                            }
                                        }

                                        &.top:after {
                                            content: " ";
                                            display: block;
                                            width: 80px; height: 80px;
                                            background-color: $bg-orange;
                                            border-radius: 50%;
                                            position: absolute;
                                            right:0;bottom:0;
                                        }

                                        &.bottom {
                                            & {
                                                top: 100%;
                                            }
                                        }
                                        
                                        &.bottom:after {
                                            content: " ";
                                            display: block;
                                            width: 80px; height: 80px;
                                            background-color: $bg-orange;
                                            border-radius: 50%;
                                            position: absolute;
                                            right:0;top:0;
                                        }
                                    }
                                }

                                & > .arrow {
                                    & {
                                        position: absolute;
                                        width: 100%; height: 100%;
                                        background-color: #fff;
                                        overflow: hidden;
                                    }

                                    & > ul {
                                        & {
                                            display: block;
                                            position: absolute;
                                            width: 111%; height: auto;
                                            left: -11%; top: 0;
                                            font-size: 0;
                                            list-style: none;
                                            @include transition(.2s all);
                                        }

                                        & > li {
                                            & {
                                                display: block;
                                                width: 100%; height: auto;
                                            }

                                            & > button {
                                                & {
                                                    width: 100%;
                                                    height: 40px;
                                                    border: 0;
                                                    background: none;
                                                    outline: none;
                                                    margin: 0;
                                                    padding: 0;
                                                    cursor: pointer;
                                                    font-size: #{$font-size};
                                                    color: $bg-black-light;
                                                    padding-left: 20%;
                                                    text-align: left;
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            & > button:hover ~ div.active {
                                & {
                                    @include transition(.2s all);
                                }

                                & > .arrow {
                                    & > ul {
                                        & {
                                            @include transition(.2s all);
                                        }
                                    }
                                }
                            }

                            & > button:nth-child(1):hover ~ div.active {
                                & {
                                    top: 0px;
                                }

                                & > .arrow {
                                    & > ul {
                                        & {
                                            top: 0px;
                                        }
                                    }
                                }
                            }

                            & > button:nth-child(2):hover ~ div.active {
                                & {
                                    top: 40px;
                                }

                                & > .arrow {
                                    & > ul {
                                        & {
                                            top: -40px;
                                        }
                                    }
                                }
                            }

                            & > button:nth-child(3):hover ~ div.active {
                                & {
                                    top: 80px;
                                }

                                & > .arrow {
                                    & > ul {
                                        & {
                                            top: -80px;
                                        }
                                    }
                                }
                            }

                            & > button:nth-child(4):hover ~ div.active {
                                & {
                                    top: 120px;
                                }

                                & > .arrow {
                                    & > ul {
                                        & {
                                            top: -120px;
                                        }
                                    }
                                }
                            }

                            & > button:nth-child(5):hover ~ div.active {
                                & {
                                    top: 160px;
                                }

                                & > .arrow {
                                    & > ul {
                                        & {
                                            top: -160px;
                                        }
                                    }
                                }
                            }

                            & > button:nth-child(6):hover ~ div.active {
                                & {
                                    top: 200px;
                                }

                                & > .arrow {
                                    & > ul {
                                        & {
                                            top: -200px;
                                        }
                                    }
                                }
                            }

                            & > button:nth-child(7):hover ~ div.active {
                                & {
                                    top: 240px;
                                }

                                & > .arrow {
                                    & > ul {
                                        & {
                                            top: -240px;
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
