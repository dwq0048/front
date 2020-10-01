<template>
    <button type="submit" class="setting" @click="Setting()" :class="{ active : SettingPop }" ref="SettingPop">
        <i><font-awesome-icon :icon="faCog" /></i>
        <div class="menu">
            <ul>
                <li>
                    <button type="button">
                        <i>
                            <div>
                                <div>
                                    <font-awesome-icon :icon="faEyeSlash" />
                                </div>
                            </div>
                        </i>
                        <span>
                            <div>
                                <div>
                                    메뉴 숨기기
                                </div>
                            </div>
                        </span>
                    </button>
                </li>
                <li>
                    <button type="button">
                        <i>
                            <div>
                                <div>
                                    <font-awesome-icon :icon="faExpandAlt" />
                                </div>
                            </div>
                        </i>
                        <span>
                            <div>
                                <div>
                                    넓게보기
                                </div>
                            </div>
                        </span>
                    </button>
                </li>
            </ul>
        </div>
    </button>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCog, faEyeSlash, faExpandAlt } from '@fortawesome/free-solid-svg-icons'

export default {
    name : 'SettingEdit',
    data(){
        return {
            // Icon
            faCog, faEyeSlash, faExpandAlt,

            SettingPop : false,
        }
    },
    methods : {
		Setting(){
			this.SettingPop = (this.SettingPop) ? false : true;
		}
    },
	mounted(){
		const _this = this;
		window.addEventListener("click", function() {
			const element = document.activeElement;
			const SetSetting = _this.$refs.SettingPop;

			
			if(_this.SettingPop){
				if(element != SetSetting){
					_this.SettingPop = false;
				}
			}
		});
	}
}
</script>

<style lang="scss" scoped>
    .setting {
        & {
            width: 44px; height: 44px;
            position: absolute;
            right: 0; top: 50%;
            padding: 0 15px;
            font-weight: bold;
            color: #999;
            z-index: 100;
            @include transition(.2s all);
            @include transform(translateY(-50%));
        }

        & > i {
            & {
                position: absolute;
                left: 50%; top: 50%;
                display: inline-block;
                vertical-align: middle;
                font-size: #{$font-size};
                padding-right: 10px;
                color: #666;
                @include transform(translate(-50%, -50%));
            }
        }

        & > span {
            & {
                display: inline-block;
                vertical-align: middle;
                font-size: #{$font-size - 2};
            }
        }

        & > div.menu {
            & {
                display: block;
                position: absolute;
                right: 0; top: 100%;
                background-color: #666;
                border-radius: 3px;
                overflow: hidden;
                opacity: 0;
                visibility: hidden;
                @include transition(.2s all);
            }

            & > ul {
                & {
                    font-size: 0;
                    list-style: none;
                    white-space: nowrap;
                }

                & > li {
                    & {
                        display: block;
                    }

                    & > button {
                        & {
                            display: block;
                            text-align: left;
                            border: 0; background: none;
                            margin: 0; padding: 0;
                            width: 100%; height: 40px;
                            padding: 0 15px;
                            cursor: pointer; outline: none;
                            background-color: #666;
                            @include transition(.2s all);
                        }

                        & > i {
                            & {
                                display: inline-block;
                                vertical-align: middle;
                                height: 40px;
                                font-size: #{$font-size};
                                color: #fff;
                                padding-right: 10px;
                            }

                            & > div {
                                & {
                                    display: table;
                                    height: 100%;
                                }

                                & > div {
                                    & {
                                        display: table-cell;
                                        vertical-align: middle;
                                    }
                                }
                            }
                        }

                        & > span {
                            & {
                                display: inline-block;
                                vertical-align: middle;
                                height: 40px;
                                font-size: #{$font-size};
                                color: #fff;
                            }

                            & > div {
                                & {
                                    display: table;
                                    height: 100%;
                                }

                                & > div {
                                    & {
                                        display: table-cell;
                                        vertical-align: middle;
                                    }
                                }
                            }
                        }

                        &:hover {
                            & {
                                background-color: #777;
                                @include transition(.2s all);
                            }
                        }
                    }
                }
            }
        }

        &:hover {
            & > i {
                color: #777;
                @include transition(.2s all);
            }
        }

        &.active {
            & {
                & > div.menu {
                    & {
                        visibility: visible;
                        opacity: 1;
                        @include transition(.2s all);
                    }
                }
            }
        }
    }
</style>
