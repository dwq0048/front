<template>
	<div class="setting">
		<layout-navigation />
		<layout-header />

		<div class="contents">
            <div>
                <div class="main">
					<router-view />
                </div>
                <div class="nav">
                    <div class="list">
                        <ul>
                            <li>
                                <div>
                                    <router-link to="#">
                                        <div>
			                                <i><font-awesome-icon :icon="faUser" /></i>
                                            <span>내정보 수정</span>
                                        </div>
                                    </router-link>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <router-link to="#">
                                        <div>
			                                <i><font-awesome-icon :icon="faIdCard" /></i>
                                            <span>프로필 설정</span>
                                        </div>
                                    </router-link>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <router-link to="#">
                                        <div>
			                                <i><font-awesome-icon :icon="faInfo" /></i>
                                            <span>개인정보 설정</span>
                                        </div>
                                    </router-link>
                                    <button type="button">
                                        <div>
			                                <i><font-awesome-icon :icon="faChevronDown" /></i>
                                        </div>
                                    </button>
                                </div>
                                <ul>
                                    <li>
                                        <div>
                                            <router-link to="#">
                                                <div>
			                                        <i><font-awesome-icon :icon="faEnvelope" /></i>
                                                    <span>이메일 변경</span>
                                                </div>
                                            </router-link>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <router-link to="#">
                                                <div>
			                                        <i><font-awesome-icon :icon="faKey" /></i>
                                                    <span>비밀번호 변경</span>
                                                </div>
                                            </router-link>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <div>
                                    <router-link to="#">
                                        <div>
			                                <i><font-awesome-icon :icon="faLockOpen" /></i>
                                            <span>공개 설정</span>
                                        </div>
                                    </router-link>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <router-link to="#">
                                        <div>
			                                <i><font-awesome-icon :icon="faBell" /></i>
                                            <span>알림 설정</span>
                                        </div>
                                    </router-link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
		</div>

		<layout-footer />
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { IS_MOBILE } from '@/store/helper/'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faLockOpen, faInfo, faChevronDown, faKey } from '@fortawesome/free-solid-svg-icons'
import { faUser, faIdCard, faBell, faEnvelope } from '@fortawesome/free-regular-svg-icons'

import Header from '@/components/layout/header'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'

export default {
	name: 'ProfileIndex',
	components: {
		'layout-header': Header,
		'layout-navigation': Navigation,
        'layout-footer' : Footer,
	},
	data(){
		return {
			// Icons
			faUser, faIdCard, faLockOpen, faBell, faInfo, faChevronDown, faEnvelope, faKey,
		}
	},
	methods : {
		is_mobile(){ return IS_MOBILE() },
	},
}

</script>

<style scoped lang="scss">
    .contents {
        & {
            display: block;
            width: 100%; height: auto;
            max-width: $wrap;
            margin: 15px auto 0 auto;
        }

        & > div {
            & {
                display: table;
                width: 100%; height: auto;
                font-size: 0;    
            }

            & > .main {
                & {
                    display: table-cell;
                    vertical-align: top;
                    padding-right: 25px;
                }
            }

            & > .nav {
                & {
                    display: table-cell;
                    vertical-align: top;
                    width: 265px; height: auto;
                }

                & > .list {
                    & {
                        display: block;
                        width: 100%; height: auto;
                        background-color: #fff;
                        border-radius: 5px;
						@include box-shadow(2px 2px 5px rgba(0,0,0,0.1));
                    }

                    & > ul {
                        & {
                            position: relative;
                            display: block;
                            width: 100%; height: auto;
                            font-size: 0;
                            list-style: none;
                            padding: 10px 0;
                        }

                        &:after {
                            content: " ";
                            display: inline-block;
                            position: absolute;
                            width: 92%; height: 2px;
                            left: 50%; bottom: 0;
                            background-color: #ddd;
                            border-radius: 2px;
                            @include transform(translateX(-50%));
                        }

                        &:nth-last-child(1):after{
                            display: none;
                        }

                        & > li {
                            & {
                                display: block;
                                width: 100%; height: auto;
                            }

                            & > div {
                                & {
                                    display: table;
                                    width: 100%; height: auto;
                                }

                                &:after {
                                    content: " ";
                                    width: 0; height: 50px;
                                    display: table-cell;
                                }

                                & > a {
                                    & {
                                        display: table-cell;
                                        vertical-align: middle;
                                        width: 100%; height: auto;
                                        text-decoration: none;
                                        color: #555;
                                        padding-left: 5px;
                                    }

                                    & > div {
                                        & > span {
                                            & {
                                                display: inline-block;
                                                vertical-align: middle;
                                                font-size: #{$font-size};
                                                font-weight: bold;
                                                line-height: 1;
                                            }
                                        }

                                        & > i {
                                            & {
                                                display: inline-block;
                                                vertical-align: middle;
                                                width: 35px;
                                                font-size: #{$font-size};
                                                text-align: center;
                                                line-height: 1;
                                            }
                                        }
                                    }
                                }

                                & > button {
                                    & {
                                        position: relative;
                                        display: table-cell;
                                        vertical-align: middle;
                                        width: 50px; height: auto;
                                        background: none; border: 0;
                                        padding: 0; margin: 0;
                                        outline: none; cursor: pointer;
                                        font-size: 0;
                                        white-space: nowrap;
                                    }

                                    &:after {
                                        content: " ";
                                        display: block;
                                        padding-bottom: 100%;
                                    }

                                    & > div {
                                        & {
                                            display: block;
                                            position: absolute;
                                            left: 50%; top: 50%;
                                            color: #555;
                                            @include transform(translate(-50%, -50%));
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

                                        & > i {
                                            & {
                                                display: inline-block;
                                                vertical-align: middle;
                                                font-size: #{$font-size};
                                                font-weight: bold;
                                                line-height: 1;
                                            }
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
                                    background-color: #f1f1f1;
                                    padding: 5px 0;
                                }

                                & > li {
                                    & {
                                        display: block;
                                        width: 100%; height: auto;
                                    }

                                    & > div {
                                        & {
                                            display: table;
                                            width: 100%; height: auto;
                                        }

                                        &:after {
                                            content: " ";
                                            display: table-cell;
                                            vertical-align: middle;
                                            width: auto; height: 40px;
                                        }

                                        & > a {
                                            & {
                                                display: table-cell;
                                                vertical-align: middle;
                                                width: 100%; height: auto;
                                                text-decoration: none;
                                                padding: 0 15px;
                                                color: #777;
                                            }

                                            & > div {
                                                & > span {
                                                    & {
                                                        display: inline-block;
                                                        vertical-align: middle;
                                                        font-size: #{$font-size - 1};
                                                    }
                                                }

                                                & > i {
                                                    & {
                                                        display: inline-block;
                                                        vertical-align: middle;
                                                        font-size: #{$font-size - 1};
                                                        padding-right: 10px;
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
            }
        }
    }
</style>
