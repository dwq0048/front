<template>
    <div class="menu" ref="TopMenu" :class="{ active : MenuFixed }">
        <div ref="TopMenuSub">
            <div class="title">
                <button type="button" class="login">
                    <span>로그인</span>
                </button>
            </div>
            <div class="navigation">
                <ul>
                    <li v-for="(item, i) in Menu.list" :key="i" :class="{ active : item.open }">
                        <button type="button" class="enable" :title="item.en" @click="MenuEnable(i)">
                            <span>
                                <i><font-awesome-icon :icon="item.icon" /></i>
                                <span>{{ item.ko }}</span>
                            </span>
                            <div>
                                <i><font-awesome-icon :icon="faCaretDown" /></i>
                            </div>
                        </button>
                        <ul>
                            <li v-for="(list, k) in item.children" :key="k">
                                <router-link :to="list.link" :title="list.en">
                                    <span>
                                        <span>{{ list.ko }}</span>
                                    </span>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="notice">
                <button type="button">
                    <i><font-awesome-icon :icon="faBell" /></i>
                    <span>알림</span>
                </button>
                <ul>
                    <li>
                        <router-link to="#">
                            <span class="news">
                                <i>N</i>
                            </span>
                            <span class="list">
                                12.08 서버 공지 사항
                            </span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="description">
                <router-link to="#">
                    이용약관
                </router-link>
                <router-link to="#">
                    개인정보취급방침
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { SET_SCRIPT } from '@/store/helper/index'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCaretDown, faHome, faInfo, faComments, faBell } from '@fortawesome/free-solid-svg-icons'

export default {
    name : 'MenuNavigation',
    data(){
        return {
            // Icon
            faCaretDown, faHome, faInfo, faComments, faBell,

            // Variable
            MenuFixed : false,
            
            Menu : {
                options : { },
                list : [
                    {
                        ko : '홈페이지', en : 'HomePage', icon : faHome, open : true,
                        children : [
                            { ko : '커뮤니티 홈', en : 'Community Home', link : '/community' },
                            { ko : '공지사항', en : 'Notice', link : '/notice' },
                        ]
                    },
                    {
                        ko : '정보' , en : 'Information', icon : faInfo, open : true,
                        children : [
                            { ko : '위키', en : 'Wiki', link : '/wiki' },
                            { ko : '질문', en : 'Question', link : '/qna' },
                        ]
                    },
                    {
                        ko : '커뮤니티', en : 'Community', icon : faComments, open : true,
                        children : [
                            { ko : '자유 게시판', en : 'Board Free', link : '/free' },
                            { ko : '이미지 게시판', en : 'Board Art', link : '/photo' },
                        ]
                    }
                ]
            }
        }
    },
    methods : {
        MenuEnable(option){
            if(typeof this.Menu.list[option] == 'object'){
                this.Menu.list[option].open = (this.Menu.list[option].open) ? false : true;
            }
        }
    },
    mounted(){
        SET_SCRIPT.optimizedResize();
        const EventMenu = () => {
            const _this = this;
            const TopMenu = _this.$refs.TopMenu;
            const TopMenuSub = _this.$refs.TopMenuSub;

            const TopElement = TopMenu.getBoundingClientRect();
            const TopPosition = {
                top: TopElement.top,
                left: TopElement.left
            }

            if(TopPosition.top < 0){
                this.MenuFixed = true;

                TopMenuSub.style.left = `${TopPosition.left}px`;
            }else {
                this.MenuFixed = false;

                TopMenuSub.style.left = ``;
            }

        }

        EventMenu();

        window.addEventListener('scroll', (data) => {
            EventMenu();
        });

        window.addEventListener("optimizedResize", function() {
			EventMenu();
		});
        
    }
}
</script>

<style lang="scss" scoped>
    .menu {
        & {
            position: relative;
            width: 300px; height: auto;
        }

        & > div {
            & {
                width: 300px; height: auto;
                background-color: #fff;
                position: relative;
                border-radius: 3px;
                overflow: hidden;
                @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
            }

            & > .title {
                & {
                    width: 100%; height: auto;
                    padding: 15px;
                }

                & > .login {
                    & {
                        display: block;
                        width: 100%; height: auto;
                        outline: none; cursor: pointer;
                        border: 0; background: none;
                        margin: 0; padding: 0;
                        background-color: $bg-orange;
                        padding: 7px 5px;
                        border-radius: 5px;
                        text-align: center;
                    }

                    & > span {
                        & {
                            display: inline-block;
                            color: #fff;
                            font-size: #{$font-size};
                            font-weight: bold;
                        }
                    }
                }
            }

            & > .navigation {
                & {
                    width: 100%; height: auto;
                }

                & > ul {
                    & {
                        display: block;
                        width: 100%; height: auto;
                        list-style: none;
                        font-size: 0;
                    }
                    
                    & > li {
                        & {
                            display: block;
                            width: 100%; height: auto;
                            border-top: 1px solid #eee;
                            overflow: hidden;
                        }

                        & > button {
                            & {
                                position: relative;
                                display: table;
                                width: 100%; height: auto;
                                outline: none; cursor: pointer;
                                border: 0; background: none;
                                padding: 0; margin: 0;
                                padding: 15px;
                                background-color: #fff;
                                border-bottom: 1px solid #eee;
                                z-index: 2;
                            }

                            & > span {
                                & {
                                    display: table-cell;
                                    vertical-align: middle;
                                    width: 100%; height: auto;
                                    text-align: left;
                                    font-size: #{$font-size};
                                    font-weight: bold;
                                    letter-spacing: 1px;
                                    color: $bg-blue;
                                }

                                & > i {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                        font-size: #{$font-size - 2};
                                        padding-right: 10px;
                                        color: $bg-blue-bold;
                                    }
                                }

                                & > span {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                    }
                                }
                            }

                            & > div {
                                & {
                                    position: relative;
                                    display: table-cell;
                                    vertical-align: middle;
                                    width: 50px; height: auto;
                                    padding: 0 10px;
                                    color: $bg-blue-light;
                                }

                                & > i {
                                    & {
                                        position: absolute;
                                        left: 50%; top: 50%;
                                        @include transform(translate(-50%, -50%) rotate(180deg));
                                        @include transition(.2s all);
                                    }
                                }

                                &:after {
                                    content: " ";
                                    display: block;
                                    padding-bottom: 100%;
                                }
                            }
                        }

                        & > ul {
                            & {
                                position: relative;
                                width: 100%; height: auto;
                                background-color: #f9f9f9;
                                display: none;
                                list-style: none;
                                overflow: hidden;
                                font-size: 0;
                            }

                            & > li {
                                & {
                                    display: block;
                                    width: 100%; height: auto;
                                }

                                & > a {
                                    & {
                                        display: block;
                                        width: 100%; height: auto;
                                        text-decoration: none;
                                        font-size: #{$font-size - 2};
                                        font-weight: bold;
                                        padding: 12px 20px;
                                        letter-spacing: 1px;
                                        background-color: #f9f9f9;
                                        color: #777;
                                        @include transition(.2s all);
                                    }

                                    &:hover {
                                        & {
                                            background-color: #f5f5f5;
                                            @include transition(.2s all);
                                        }
                                    }
                                }
                            }
                        }

                        &.active {
                            & > button {
                                & > div {
                                    & > i {
                                        & {
                                            @include transform(translate(-50%, -50%) rotate(0));
                                            @include transition(.2s all);
                                        }
                                    }
                                }
                            }

                            & > ul {
                                & {
                                    display: block;
                                }
                            }
                        }
                    }
                }
            }

            & > .notice {
                & {
                    width: 100%; height: auto;
                }

                & > button {
                    & {
                        display: block;
                        width: 100%; height: auto;
                        border: 0; background: none;
                        margin: 0; padding: 0;
                        padding: 10px 15px;
                        outline: none; cursor: pointer;
                        text-align: left;
                        color: $bg-orange;
                        border-top: 1px solid #eee;
                        border-bottom: 1px solid #eee;
                    }

                    & > i {
                        & {
                            display: inline-block;
                            vertical-align: middle;
                            padding-right: 10px;
                            font-size: #{$font-size};
                        }
                    }

                    & > span {
                        & {
                            display: inline-block;
                            vertical-align: middle;
                            font-size: #{$font-size};
                            font-weight: bold;
                            letter-spacing: 2px;
                        }
                    }
                }

                & > ul {
                    & {
                        display: block;
                        width: 100%; height: auto;
                        list-style: none;
                        font-size: 0;
                    }

                    & > li {
                        & {
                            display: block;
                            width: 100%; height: auto;
                        }

                        & > a {
                            & {
                                display: block;
                                width: 100%; height: auto;
                                font-size: #{$font-size};
                                text-decoration: none;
                                color: #333;
                                padding: 10px 15px;
                            }

                            & > span {
                                &.news {
                                    & {
                                        display: inline-block;
                                        position: relative;
                                        vertical-align: middle;
                                        width: 16px; height: auto;
                                        background-color: $bg-orange;
                                        font-size: #{$font-size};
                                        border-radius: 2px;
                                    }

                                    & > i {
                                        & {
                                            position: absolute;
                                            left: 50%; top: 50%;
                                            font-size: #{$font-size - 4};
                                            font-weight: bold;
                                            font-style: normal;
                                            color: #fff;
                                            line-height: 1;
                                            @include transform(translate(-50%, -50%));
                                        }
                                    }

                                    &:after {
                                        content: " ";
                                        display: block;
                                        padding-bottom: 100%;
                                    }
                                }

                                &.list {
                                    & {
                                        display: inline-block;
                                        vertical-align: middle;
                                        font-size: #{$font-size - 1};
                                        padding-left: 5px;
                                    }
                                }
                            }

                            &:hover {
                                & {
                                    text-decoration: underline;
                                }

                                & > .list {
                                    & {
                                        text-decoration: underline;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            & > .description {
                & {
                    display: block;
                    width: 100%; height: auto;
                    padding: 15px;
                }

                & > a {
                    & {
                        display: block;
                        width: 100%; height: auto;
                        text-decoration: none;
                        font-size: #{$font-size - 2};
                        letter-spacing: 1px;
                        line-height: 2;
                        color: #aaa;
                        text-align: left;
                    }
                }
            }
        }
        
        &.active {
            & > div {
                & {
                    position: fixed;
                    top: 0; right: 0;
                }
            }
        }

    }
</style>