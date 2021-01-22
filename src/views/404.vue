<template>
	<div class="home">
		<layout-navigation />
		<layout-header />

		<div class="contents">
            <div class="error">
                <h1>404</h1>
                <div>
                    <div class="message">
                        <div>
                            <i><font-awesome-icon :icon="faExclamationTriangle" /></i>
                            <span>페이지를 찾을 수 없습니다.</span>
                        </div>
                        <p>존재하지 않는 URL 주소를 입력하셨거나,<br>요청하신 페이지가 변경 또는 삭제되었을 수 있습니다.</p>
                    </div>

                    <div class="btn">
                        <div>
                            <button type="button">
                                <i><font-awesome-icon :icon="faHome" /></i>
                                <span>메인으로</span>
                            </button>

                            <button type="button" class="prev">
                                <i><font-awesome-icon :icon="faLongArrowAltLeft" /></i>
                                <span>이전 페이지</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
		</div>

        <layout-footer />
	</div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faExclamationTriangle, faHome, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'

import Header from '@/components/layout/header'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'

export default {
	name: 'Home',
	components: {
		'layout-header': Header,
		'layout-navigation': Navigation,
        'layout-footer' : Footer,
    },
    data(){
        return {
            // Icon
            faExclamationTriangle, faHome, faLongArrowAltLeft
        }
    }
}

</script>

<style scoped lang="scss">
    .error {
        & {
            width: 100%; height: auto;
            max-width: $wrap;
            margin: 0 auto;
            position: absolute;
            left: 50%; top: 50%;
            @include transform(translate(-50%, -50%));
        }

        & > h1 {
            & {
                display: block;
                text-align: center;
                font-size: #{$font-size + 80};
                line-height: 1;
                letter-spacing: 15px;
            }
        }

        & > div {
            & > .message {
                & {
                    font-size: #{$font-size + 10};
                    line-height: 1;
                    text-align: center;
                    padding-top: 30px;
                }

                & > div {
                    & {
                        display: inline-block;
                    }

                    & > i {
                        & {
                            font-size: #{$font-size + 15};
                            display: inline-block;
                            vertical-align: middle;
                            padding-right: 15px;
                            color: red;
                        }
                    }

                    & > span {
                        & {
                            display: inline-block;
                            vertical-align: middle;
                            font-weight: bold;
                        }
                    }

                }

                & > p {
                    & {
                        font-size: #{$font-size + 5};
                        text-align: center;
                        line-height: 1.5;
                        padding-top: 30px;
                    }
                }
            }

            & > .btn {
                & {
                    display: block;
                    text-align: center;
                    padding-top: 30px;
                }

                & > div {
                    & {
                        display: inline-block;
                    }

                    & > button {
                        & {
                            margin: 0; padding: 0;
                            border: 0; font-size: 0;
                            outline: none; cursor: pointer;
                            background-color: $bg-blue;
                            font-size: #{$font-size + 2};
                            color: #fff;
                            padding: 10px 30px;
                            border-radius: 5px;
                            margin: 0 10px;
                            @include transition(.2s all);
                        }

                        & > i {
                            & {
                                display: inline-block;
                                padding-right: 5px;
                                @include transform(translateX(0px));
                                @include transition(.2s all);
                            }
                        }

                        & > span {
                            & {
                                display: inline-block;
                            }
                        }

                        &:hover {
                            & {
                                background-color: $bg-blue-light;
                                @include transition(.2s all);
                            }

                            & > i {
                                & {
                                    @include transform(translateX(-5px));
                                    @include transition(.2s all);
                                }
                            }
                        }

                        &.prev {
                            & {
                                background-color: #ddd;
                                color: #555;
                            }

                            &:hover {
                                & {
                                    background-color: #eee;
                                    @include transition(.2s all);
                                }
                            }
                        }

                    }
                }
            }
        }
    }
</style>
