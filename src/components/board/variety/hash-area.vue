<template>
    <div class="set-tag">
        <div>
            <div>
                <button type="button" class="first">
                    <div>
                        <i><font-awesome-icon :icon="faHashtag" /></i>
                        <span contenteditable placeholder="입력해주세요.." ref="Hash" class="text" @keypress="PostPress"></span>
                    </div>
                </button>
                <draggable tag="ul" ref="HashList" v-model="SubStorageHashs" draggable=".item" handle=".active" @change="HashEnd">
                    <li v-for="(item, i) in SubStorageHashs" :key="i" :data-index="i" class="item" :class="{ active : item.active }" @click="HashOption(i)">
                        <button type="button">
                            <div>
                                <i><font-awesome-icon :icon="faHashtag" /></i>
                                <span class="text" @keypress="EditPress($event, i)" contenteditable="false">{{ item.text }}</span>
                            </div>
                            <span class="option">
                                <ul>
                                    <li>
                                        <button type="button" @click="HashEdit(i)">
                                            <i><font-awesome-icon :icon="faPen" /></i>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" @click="HashRemove(i)">
                                            <i><font-awesome-icon :icon="faTrashAlt" /></i>
                                        </button>
                                    </li>
                                </ul>
                            </span>
                        </button>
                    </li>
                </draggable>
            </div>
        </div>	
        <button type="button" title="모두 삭제" @click="HashDelete">
            <span>
                <i><font-awesome-icon :icon="faTrashAlt" /></i>
            </span>
        </button>				
        <span class="alert" ref="HashAlert">
            <p>특수문자는 입력에서 제외됩니다.</p>
        </span>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHashtag, faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons'

import draggable from 'vuedraggable'

export default {
    name: 'HashArea',
    props: ['StorageHashs'],
    components: {
        draggable
    },
    data(){
        return {
            // Icon
            faHashtag, faTrashAlt, faPen,

            // Plugin
            draggable,

            // Use
            SubStorageHashs : [],
        }
    },
    methods: {
		AddHashs(event){
			const hash = this.$refs.Hash;
			const object = {
				text : hash.textContent,
				active : false,
			};

            this.SubStorageHashs.unshift(object);
			hash.innerText = '';
		},
		EditHashs(event, index){
            const hash = this.$refs.HashList.$el;
            const item = hash.querySelector(`li[data-index='${index}']`);
            const focus = item.querySelector('button > div > span');

            this.SubStorageHashs[index].text = focus.innerText;
            focus.setAttribute('contenteditable',false);
		},
		HashOption(option){
			this.SubStorageHashs.forEach((item, index) => {
				if(index == option){
					this.SubStorageHashs[index].active = true
				}else{
					this.SubStorageHashs[index].active = false
				}
            });
        },
        PostPress(event){
            this.EnterChars(event);
            this.SpecialChars(event);
        },
        EditPress(event, index){
            this.EnterChars(event, index);
            this.SpecialChars(event);
        },
        HashEdit(index){
            const hash = this.$refs.HashList.$el;
            const item = hash.querySelector(`li[data-index='${index}']`);
            const focus = item.querySelector('button > div > span');
            focus.setAttribute('contenteditable',true);
            focus.focus();
        },
        HashRemove(index){
            this.SubStorageHashs.splice(index, 1);
        },
        EnterChars(event, edit=undefined){
            // enter, spacebar
			if (event.keyCode === 13 || event.keyCode === 32) {
                event.preventDefault();
                if(edit == undefined){
				    this.AddHashs(event);
                }else{
                    this.EditHashs(event, edit);
                }
			}
        },
        SpecialChars(event){
            // ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ ] \ ^ ` { } | ~
			if (
				(event.keyCode >= 33 && event.keyCode <= 47) ||
				(event.keyCode >= 58 && event.keyCode <= 64) ||
				(event.keyCode >= 91 && event.keyCode <= 94) ||
				(event.keyCode === 96) ||
				(event.keyCode >= 123 && event.keyCode <= 126)
			) {
                event.preventDefault();
				this.$refs.HashAlert.classList.add("active");
				setTimeout(() => {
					this.$refs.HashAlert.classList.remove("active");
				},1500);
			}
        },
        HashDelete(){
            this.SubStorageHashs = [];
        },
        HashEnd(evt){
            const hash = this.$refs.HashList.$el;
            const item = hash.querySelectorAll(`li > button > div > span`);

            item.forEach((item, index) => {
                item.innerText = this.SubStorageHashs[index].text;
            });
        }
    },
    created(){
        this.SubStorageHashs = this.StorageHashs;
    },
	mounted(){
		const _this = this;
		const hash = this.$refs.Hash;
        const HashList = this.$refs.HashList.$el;

		window.addEventListener('click', (event) => {
			const element = document.activeElement;
            const HashBtn = HashList.querySelectorAll('.item > button');
            const HashSpan = HashList.querySelectorAll('.item > button > div > span');
			let none = false;

			HashBtn.forEach((item, index) => {
				if(element == item){ none = true }
            });
            
            HashSpan.forEach((item, index) => {
                if(element == item){ none = true }
            });

			if(!none){
                _this.HashOption(-1);
                HashSpan.forEach((item, index) => {
                    item.setAttribute('contenteditable',false);
                    item.innerText = this.SubStorageHashs[index].text;
                });
            }
		})
	}
}
</script>

<style lang="scss" scoped>
    .set-tag {
        & {
            width: 100%; height: auto;
            position: relative;
        }

        & > div {
            & {
                width: 100%; height: 35px;
                padding-right: 35px;
                background-color: #f9f9f9;
                border: 1px solid #ddd;
                border-radius: 3px;
                overflow: hidden;
                position: relative;
                overflow-x: scroll;
            }

            &::-webkit-scrollbar {
                display: none;
            }

            & > div {
                & {
                    width: 100%; height: 100%;
                    display: table;
                    font-size: 0;
                }

                & > button.first {
                    & {
                        width: auto; height: 33px;
                        border: 0; background: none;
                        margin: 0; padding: 0;
                        cursor: text; outline: none;
                        display: table-cell;
                        text-align: left;
                        white-space: nowrap;
                        padding: 0 5px;
                    }

                    & > div {
                        & {
                            background-color: #ccc;
                            opacity: 1;
                            cursor: text;
                            padding: 3px;
                            border-radius: 3px;
                        }

                        & > i {
                            & {
                                display: inline-block;
                                color: #999;
                                vertical-align: middle;
                                font-size: #{$font-size - 2};
                                padding: 0 5px;
                            }
                        }

                        & > span {
                            & {
                                display: inline-block;
                                min-width: 50px;
                                color: #999;
                                font-weight: bold;
                                font-size: #{$font-size - 2};
                                vertical-align: middle;
                                outline: none;
                                padding-right: 10px;
                            }

                            &[contenteditable=true]:empty:before{
                                content: attr(placeholder);
                                display: table-cell;
                                @include transition(.2s all);
                            }
                        }
                    }
                }

                & > ul {
                    & {
                        display: table-cell;
                        font-size: 0;
                        width: 100%; height: 33px;
                        list-style: none;
                        white-space: nowrap;
                        padding-right: 33px;
                    }

                    & > li {
                        & {
                            display: inline-block;
                            width: auto; height: 100%;
                            padding: 5px;
                            border-radius: 3px;
                            position: relative;
                            vertical-align: top;
                            @include transition(.2s all);
                        }

                        & > button {
                            & {
                                width: auto; height: 100%;
                                border: 0; background: none;
                                margin: 0; padding: 0;
                                outline: none;
                                text-align: left;
                                cursor: pointer;
                                vertical-align: top;
                            }

                            & > div {
                                & {
                                    width: auto; height: 100%;
                                    background-color: $bg-blue;
                                    border-radius: 3px;
                                    display: table;
                                    padding-right: 5px;
                                    opacity: 0.85;
                                    position: relative;
                                    z-index:1;
                                    @include transition(.2s all);
                                }

                                & > i {
                                    & {
                                        display: table-cell;
                                        vertical-align: middle;
                                        font-size: #{$font-size - 2};
                                        padding: 0 5px;
                                        color: #fff;
                                    }
                                }

                                & > span.text {
                                    & {
                                        display: table-cell;
                                        vertical-align: middle;
                                        font-size: #{$font-size - 2};
                                        color: #fff;
                                        outline: none;
                                        padding-right: 5px;
                                        letter-spacing: 1px;
                                        font-weight: 300;
                                        @include transition(.2s all);
                                    }
                                }

                            }

                            &:hover {
                                & > div {
                                    opacity: 1;
                                    @include transition(.2s all);
                                }
                            }
                        }

                        & > button {
                            & > span.option {
                                & {
                                    width: auto; height:23px;
                                    top: 50%; right: 0;
                                    position: absolute;
                                    opacity: 0;
                                    visibility: hidden;
                                    border-radius: 3px;
                                    background-color: #555;
                                    padding-left: 15px;
                                    margin-left: -15px;
                                    @include transform(translateY(-50%));
                                }

                                & > ul {
                                    & {
                                        width: auto; height: 100%;
                                        font-size: 0;
                                        list-style: none;
                                        white-space: nowrap;
                                    }

                                    & > li {
                                        & {
                                            vertical-align: top;
                                            display: inline-block;
                                            width: 23px; height: 100%;
                                        }

                                        & > button {
                                            & {
                                                display: block;
                                                width: 100%; height: 100%;
                                                position: relative;
                                                border: 0; background: none;
                                                margin: 0; padding: 0;
                                                cursor: pointer; outline: none;
                                            }

                                            & > i {
                                                & {
                                                    position: absolute;
                                                    left: 50%; top: 50%;
                                                    font-size: #{$font-size - 1};
                                                    color: #ccc;
                                                    @include transform(translate(-50%, -50%));
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        &.item.active {
                            & {
                                padding-right: 51px;
                                background-color: #555;
                                @include transition(.2s all);
                            }

                            & > button {
                                & {
                                    cursor: move;
                                }

                                & > div {
                                    & {
                                        opacity: 1;
                                        
                                    }
                                }

                                & > span.option {
                                    & {
                                        visibility: visible;
                                        opacity: 1;
                                        right: 0;
                                        color: #fff;
                                        @include transition(.2s all);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        & > button {
            & {
                position: absolute;
                right: 1px; top: 50%;
                border: 0; background: none;
                margin: 0; padding: 0;
                cursor: pointer; outline: none;
                width: 33px; height: auto;
                z-index: 1;
                background-color: #f9f9f9;
                @include transform(translateY(-50%));
            }

            & > span {
                & {
                    width: 100%; height: auto;
                    position: relative;
                    display: block;
                    padding-bottom: 100%;
                }

                & > i {
                    & {
                        position: absolute;
                        left: 50%; top: 50%;
                        font-size: #{$font-size};
                        color: #aaa;
                        @include transform(translate(-50%, -50%));
                    }
                }
            }
        }

        & > span.alert {
            & {
                display: block;
                position: absolute;
                left: 0; top: 100%;
                background-color: #999;
                font-size: #{$font-size - 2};
                color: #fff;
                padding: 5px 10px;
                border-radius: 0px 30px 30px 10px;
                margin-top: 5px;
                margin-left: 20px;
                visibility: hidden;
                opacity: 0;
                @include transition(.2s all);
            }

            &:after {
                & {
                    content: " ";
                    display: block;
                    position: absolute;
                    left: 0;
                    bottom: 100%;
                    width: 0px;
                    height: 0px;
                    border-top: 8px solid transparent;
                    border-bottom: 8px solid #999;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                }
            }

            &.active {
                & {
                    opacity: 1;
                    visibility: visible;
                    @include transition(.2s all);
                }
            }
        }
    }
</style>
