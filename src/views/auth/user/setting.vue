<template>
    <div class="setting">
        <!-- 사이드 -->
        <widget-side :menu="MenuSide"/>

        <div class="wrap">
            <div class="title">
                <h1>
                    <i><font-awesome-icon :icon="faAddressCard" /></i>
                    <span>프로필 수정</span>
                </h1>
            </div>

            <!-- 프로필 설정 -->
            <div class="section">
                <div class="title">
                    <h1>프로필 설정</h1>
                    <div class="btn">
                        <button type="button" @click="ProfileEdit('introduce')">
                            <i><font-awesome-icon :icon="faPen" /></i>
                            <span>수정</span>
                        </button>
                    </div>
                </div>
                <div class="set private-set">
                    <widget-introduce v-if="!Edit.introduce" />
                    <widget-introduce-edit v-if="Edit.introduce" />
                </div>
            </div>
            
            <!-- 공개 설정 -->
            <div class="section">
                <div class="title">
                    <h1>공개 설정</h1>
                    <div class="btn">
                        <button type="button">
                            <i><font-awesome-icon :icon="faPen" /></i>
                            <span>수정</span>
                        </button>
                    </div>
                </div>
                <div class="set private-set">
                    <widget-open />
                </div>
            </div>

            <!-- 알림 설정 -->
            <div class="section">
                <div class="title">
                    <h1>알림 설정</h1>
                    <div class="btn">
                        <button type="button">
                            <i><font-awesome-icon :icon="faPen" /></i>
                            <span>수정</span>
                        </button>
                    </div>
                </div>
                <div class="set private-set">
                    <widget-notice />
                </div>
            </div>

            <!-- 이메일 / 비밀번호 변경 -->
            <div class="section">
                <div class="title">
                    <h1>이메일 / 비밀번호 변경</h1>
                </div>
                <div class="set private-set">
                    <widget-secret />
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPen, faFeatherAlt, faPalette, faChartBar, } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-regular-svg-icons'

import Introduce from '@/views/auth/user/setting/introduce'
import IntroduceEdit from '@/views/auth/user/setting/introduce.edit'
import Open from '@/views/auth/user/setting/open'
import Notice from '@/views/auth/user/setting/notice'
import Secret from '@/views/auth/user/setting/secret'

import Side from '@/components/widget/auth/user/nav/side'

export default {
    name: 'AuthSetting',
    components: {
        'widget-side' : Side,
        'widget-introduce' : Introduce,
        'widget-open' : Open,
        'widget-notice' : Notice,
        'widget-secret' : Secret,

        'widget-introduce-edit' : IntroduceEdit,
    },
    data(){
        return {
            // Icon
            faPen, faAddressCard, faFeatherAlt, faChartBar,

            Edit : {
                introduce : false,
            },

            MenuSide : {
                options : {
                    profile : true
                },
                children : [
                    {
                        ko : '프로필 수정', en : 'Edit Profile', icon : faAddressCard, link : '#', type : 'link',
                        children : [
                            { ko : '프로필 설정', en : 'Setting Profile', link : '#', type : 'link' },
                            { ko : '공개 설정', en : 'Setting Open', link : '#', type : 'link' },
                            { ko : '알림 설정', en : 'Setting Notice', link : '#', type : 'link' },
                            { ko : '이메일/비밀번호 변경', en : 'Edit Email/Password', link : '#', type : 'link' }
                        ]
                    },
                    {
                        ko : '내 프로필', en : 'My Profile', icon : faFeatherAlt, link : '#', type : 'link',
                        children : [
                            { ko : '테마 설정', en : 'Setting Thema', link : '#', type : 'link' },
                            { ko : '아트박스', en : 'ArtBox', link : '#', type : 'link' }
                        ]
                    },
                    {
                        ko : '세부 정보', en : 'Description', icon : faChartBar, link : '#', type : 'link',
                        children : [
                            { ko : '통계', en : 'Statistics', link : '#', type : 'link' },
                            { ko : '로그', en : 'Log', link : '#', type : 'link' }
                        ]
                    }
                ]
            }
        }
    },
    methods: {
        ProfileEdit(data){
            this.Edit[data] = true;
        }
    },
}
</script>

<style lang="scss" scoped>
    .setting {
        & {
            display: table;
            width: 100%; height: auto;
            margin: 0 auto;
            padding: 10px 0;
        }

        & > .wrap {
            & {
                display: table-cell;
                width: auto; height: auto;
                vertical-align: top;
            }

            & > .title {
                & {
                    display: block;
                }

                & > h1 {
                    & {
                        font-size: #{$font-size + 8};
                        font-weight: bold;
                        line-height: 1;
                        padding: 20px;
                        color: $bg-blue;
                    }

                    & > i {
                        & {
                            display: inline-block;
                            font-size: #{$font-size + 4};
                            padding-right: 10px;
                        }
                    }
                }
            }

            & > .section {
                & {
                    width: 100%; height: auto;
                    display: inline-block;
                    padding: 0 15px;
                }

                & > .title {
                    & {
                        display: table;
                        width: 100%; height: auto;
                        border-bottom: 1px solid #ddd;
                        padding: 10px 15px;
                    }
                    
                    & > h1 {
                        & {
                            display: table-cell;
                            font-size: #{$font-size + 4};
                            font-weight: bold;
                            color: #333;
                        }
                    }

                    & > .btn {
                        & {
                            display: table-cell;
                            text-align: right;
                        }

                        & > button {
                            & {
                                display: inline-block;
                                border: 0; background: none;
                                margin: 0; padding: 0;
                                outline: none; cursor: pointer;
                                color: $bg-blue;
                                font-size: 0;
                                @include transform(scale(1));
                                @include transition(.2s all);
                            }

                            & > i {
                                & {
                                    display: inline-block;
                                    vertical-align: middle;
                                    font-size: #{$font-size - 4};
                                    padding-right: 5px;
                                    line-height: 1;
                                }
                            }

                            & > span {
                                & {
                                    display: inline-block;
                                    vertical-align: middle;
                                    font-size: #{$font-size};
                                    font-weight: bold;
                                    line-height: 1;
                                }
                            }

                            &:hover {
                                & {
                                    color: $bg-blue-bold;
                                    @include transform(scale(1.05));
                                    @include transition(.2s all);
                                }
                            }
                        }
                    }
                }

                & > .set {
                    & {
                        display: block;
                        width: 100%; height: auto;
                    }
                }
            }

            &:after {
                & {
                    content: " ";
                    display: block;
                    clear: both;
                }
            }
        }
    }
</style>

<style lang="scss">
.setting .set.private-set{
    & > .profile {
        & {
            display: table;
            width: 100%; height: auto;
            padding: 15px;
        }

        & > .xs {
            & {
                width: 100px;
                display: table-cell;
                position: relative;
                background-color: #555;
                border-radius: 5px;
                vertical-align: middle;
            }

            &:after {
                content: " ";
                display: block;
                padding-bottom: 100%;
            }
        }

        & > .intro {
            & {
                display: table-cell;
                width: auto; height: auto;
                vertical-align: top;
                padding: 10px 15px;
                min-height: 120px;
            }

            & > h1 {
                & {
                    font-size: #{$font-size + 4};
                    font-weight: bold;
                    color: #333;
                    line-height: 1;
                }
            }

            & > .text {
                & {
                    font-size: #{$font-size};
                    font-weight: normal;
                    color: #666;
                    padding-top: 10px;
                }
            }
        }
    }

    & > table {
        & {
            font-size: #{$font-size};
            padding: 15px;
            letter-spacing: 1px;
            width: 100%;
        }

        & > tr {

            & > td:nth-child(1) {
                & {
                    padding: 15px 0;
                }

                & > h1 {
                    & {
                        font-size: #{$font-size + 4};
                        font-weight: bold;
                        line-height: 1;
                        color: #333;
                    }
                }

                & > p {
                    & {
                        font-size: #{$font-size};
                        font-weight: bold;
                        line-height: 1;
                        padding-top: 10px;
                        color: #555;
                    }
                }
            }

            & > td:nth-child(2){
                & {
                    text-align: right;
                }
            }
        }
    }
}
</style>
