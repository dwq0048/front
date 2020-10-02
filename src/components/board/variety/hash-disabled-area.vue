<template>
    <div class="tags">
        <div ref="Hash">
            <i v-for="(item, i) in SubStorageHashs" :key="i" :data-index="i" class="disabled" contenteditable="false" :class="{ active : HashActive == i }">
                <i><font-awesome-icon :icon="faHashtag" /></i>
                <span class="text" @keypress="PostPress($event, (HashActive == i) ? 'edit' : false )">{{ item.hash }}</span>
                <button type="button" :title="( HashActive == i ) ? '삭제' : '수정'" @click="HashChange(i)">
                    <i><font-awesome-icon :icon="faPen" /></i>
                    <i><font-awesome-icon :icon="faTimes" /></i>
                </button>
            </i>
            <span contenteditable @keypress="PostPress($event, true)" class="enable" placeholder="태그를 입력해주세요"></span>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHashtag, faTimes, faPen } from '@fortawesome/free-solid-svg-icons'

export default {
    name: 'HashDisabled',
    data(){
        return {
            // Icon
            faHashtag, faTimes, faPen,

            // Storage
            SubStorageHashs : [],

            // Variable
            HashActive : undefined,
        }
    },
    methods: {
        PostPress(event, able){
            if(able){
                this.EnterChars(event, able);
                this.SpecialChars(event, able);
            }
        },
        EnterChars(event){
            // enter, spacebar
			if (event.keyCode === 13 || event.keyCode === 32) {
                event.preventDefault();
                const Node = this.$refs.Hash;
                const Span = Node.querySelector('.enable');

                this.SubStorageHashs.push({ hash : Span.innerText });
                Span.innerText = '';
                Span.focus();
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
                console.log('특수문자는 입력에서 제외됩니다.');
			}
        },
        HashChange(index){
            const Node = document.querySelector(`.disabled[data-index='${index}']`);
            const Span = Node.querySelector('.text');
            this.HashActive = index;

            Span.setAttribute('contenteditable', 'true');
            Span.focus();
        }
    },
    mounted(){
        const _this = this;
        const Node = this.$refs.Hash;
        const Span = Node.querySelector('.enable');


        Node.addEventListener('click', (event) => {
            let use = 0;
            const element = document.activeElement;
            const btn = this.$refs.Hash.querySelectorAll('i.disabled > span');

            try{
                btn.forEach((item, index) => { if(item == element){ use++ } });
                if(use <= 0){ Span.focus() };
            } catch(err){
                Span.focus();
            }
        });

        window.addEventListener('click', (event) => {
            let use = 0;
			const element = document.activeElement;
            const btn = this.$refs.Hash.querySelectorAll('i.disabled > span');

            try{
                btn.forEach((item, index) => { if(item == element){ use++ } });
                if(use <= 0){ this.HashActive = undefined };
            } catch(err){
                this.HashActive = undefined;          
            }
        });

        Span.addEventListener('keydown', (event) => {
            if(Span.innerText == '' || Span.innerText == undefined || !Span.innerText){
                if(event.keyCode === 8){
                    if(this.HashActive != undefined){
                        if(this.HashActive == Number(this.SubStorageHashs.length - 1)){
                            this.SubStorageHashs.splice(this.HashActive, 1);
                        }
                    }
                    if(this.SubStorageHashs.length <= 0){
                        this.HashActive = undefined;
                    }else{
                        this.HashActive = this.SubStorageHashs.length - 1;
                    }
                }else{
                    this.HashActive = undefined;
                }
            }
        });
    }
}
</script>

<style lang="scss" scoped>
    .tags {
        & {
            width: 100%; height: 30px;
            border: 1px solid #ddd;
            border-radius: 3px;
            padding: 0 5px;
            display: table;
        }

        & > div {
            & {
                width: 100%; height: 100%;
                display: table-cell;
                vertical-align: middle;
                cursor: text; outline: none;
                font-size: #{$font-size - 1};
                color: #555;
            }

            & > .disabled {
                & {
                    background-color: #f1f1f1;
                    border-radius: 3px;
                    padding: 0 5px;
                    margin: 3px 2px;
                    display: inline-block;
                    vertical-align: middle;
                    color: #555;
                    font-weight: bold;
                    font-style: normal;
                    font-size: #{$font-size};
                    cursor: default;
                    @include transition(.2s all);
                }

                & > i {
                    & {
                        display: inline-block;
                        vertical-align: middle;
                        font-size: #{$font-size - 4};
                        padding-right: 5px;
                    }
                }

                & > span {
                    & {
                        display: inline-block;
                        vertical-align: middle;
                        padding-right: 5px;
                        line-height: 25px;
                    }
                }

                & > button {
                    & {
                        display: inline-block;
                        vertical-align: middle;
                        border: 0; background: none;
                        margin: 0; padding: 0;
                        outline: none; cursor: pointer;
                        font-size: #{$font-size - 2};
                        margin-top: 2px;
                        color: #aaa;
                        padding: 0 5px;
                        position: relative;
                        @include transition(.2s all);
                    }

                    & > i {
                        &:nth-child(1) {
                            & {
                                display: block;
                            }
                        }

                        &:nth-child(2) {
                            & {
                                display: none;
                            }
                        }
                    }

                    &:hover {
                        & {
                            color: #555;
                            @include transition(.2s all);
                        }
                    }
                }

                &.active {
                    & {
                        background-color: $bg-blue;
                        color: #fff;
                        @include transition(.2s all);
                    }

                    & > button {
                        & {
                            color: #ddd;
                            @include transition(.2s all);
                        }

                        & > i {
                            &:nth-child(1){
                                & {
                                    display: none;
                                }
                            }

                            &:nth-child(2){
                                & {
                                    display: block;
                                }
                            }
                        }
                    }
                }
            }

            & > .enable {
                & {
                    outline: none;
                    display: inline-block;
                    vertical-align: middle;
                    color: #555;
                    font-weight: bold;
                    font-size: #{$font-size};
                    padding: 0 5px;
                }

                &[contenteditable=true]:empty:before{
                    content: attr(placeholder);
                    color: #aaa;
                }
            }
        }

    }
</style>

<style lang="scss">
            .disabled.private {
                & {
                    background-color: #f1f1f1;
                    border-radius: 3px;
                    padding: 0 5px;
                    margin: 0 2px;
                }
            }
</style>
