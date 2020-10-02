<template>
    <div class="tags">
        <div ref="Hash">
            <i v-for="(item, i) in SubStorageHashs" :key="i" :data-index="i" class="disabled" contenteditable="false" :class="{ active : HashActive == i }">
                <i><font-awesome-icon :icon="faHashtag" /></i>
                <span class="text" @keypress="PostPress($event, (HashActive == i) ? i : undefined )">{{ item.hash }}</span>
                <button type="button" :title="( HashActive == i ) ? '삭제' : '수정'" @click="HashChange(i)">
                    <i><font-awesome-icon :icon="faPen" /></i>
                    <i><font-awesome-icon :icon="faTimes" /></i>
                </button>
            </i>
            <span contenteditable @keypress="PostPress($event)" class="enable" placeholder="태그를 입력해주세요"></span>
            <div class="alert" :class="{ active : AlertMessage.use }">{{ AlertMessage.message }}</div>
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
            AlertMessage : {
                use : false,
                message : ''
            }
        }
    },
    methods: {
        PostPress(event, able='Enter'){
            if(able != undefined){
                this.EnterChars(event, able);
                this.SpecialChars(event, able);
            }
        },
        EnterChars(event, able){
            // enter, spacebar
			if (event.keyCode === 13 || event.keyCode === 32) {
                event.preventDefault();

                if(able != 'Enter'){
                    const Node = this.$refs.Hash;
                    const ital = Node.querySelector(`.disabled[data-index='${able}'] > span`);

                    const object = { hash : ital.innerText };
                    if(this.Duplicate(object.hash)){
                        this.SubStorageHashs.splice(able, 1, object);
                        this.SpanReset();
                    }
                }else{
                    const Node = this.$refs.Hash;
                    const Span = Node.querySelector('.enable');

                    if(this.Duplicate(Span.innerText)){
                        this.SubStorageHashs.push({ hash : Span.innerText });
                        this.SpanReset();
                    }
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
                this.TextAlert('특수문자는 입력에서 제외됩니다.');
			}
        },
        Duplicate(text){
            let duplicate = false;
            if(text == '' || text == undefined || !text){
                this.TextAlert('태그를 입력해 주세요');
                return false;
            }

            this.SubStorageHashs.map(item => {
                if(item.hash == text){
                    duplicate = true;
                }
            });

            if(duplicate){
                this.TextAlert('중복된 태그가 있습니다.');
                return false;
            }else {
                return true;
            }

            this.TextAlert('ㅁ.. 뭔가 잘못됨');
            return false;
        },
        TextAlert(alt){
            this.AlertMessage.use = true;
            this.AlertMessage.message = alt;
            setTimeout(() => {
                this.AlertMessage.use = false;
            }, 1000);
        },
        SpanReset(){
            const Node = this.$refs.Hash;
            const ital = Node.querySelectorAll(`.disabled > span`);
            const Span = Node.querySelector('.enable');

            ital.forEach((item, index) => {
                item.innerText = this.SubStorageHashs[index].hash;
                item.setAttribute('contenteditable', 'false');
            });

            this.HashActive = undefined;
            Span.innerText = '';
            Span.focus();

        },
        HashChange(index){
            if(this.HashActive != index){            
                const Node = document.querySelector(`.disabled[data-index='${index}']`);
                const btn = this.$refs.Hash.querySelectorAll('i.disabled > span');
                const Span = Node.querySelector('.text');
                this.HashActive = index;

                btn.forEach((item, index) => {
                    item.setAttribute('contenteditable', 'false');
                });

                Span.setAttribute('contenteditable', 'true');
                Span.focus();
            }else{
                this.SubStorageHashs.splice(index, 1);
                this.SpanReset();
            }
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
                btn.forEach((item, index) => {
                    if(item == element){ use++ }
                });
                if(use <= 0){ Span.focus() };
            } catch(err){
                Span.focus();
            }
        });

        window.addEventListener('click', (event) => {
            if(this.HashActive != undefined){
                let use = 0;
                const element = document.activeElement;
                const btn = this.$refs.Hash.querySelectorAll('i.disabled > span');
                try{
                    btn.forEach((item, index) => {
                        item.innerText = this.SubStorageHashs[index].hash;
                        if(item == element){
                            use++
                        }
                    });
                    if(use <= 0){ this.HashActive = undefined };
                } catch(err){
                    this.HashActive = undefined;          
                }
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
                position: relative;
            }

            & > .alert {
                & {
                    position: absolute;
                    left: 0; top: 100%;
                    display: block;
                    font-size: #{$font-size};
                    font-weight: bold;
                    color: red;
                    padding-top: 10px;
                    letter-spacing: 1px;
                    opacity: 0;
                    @include transition(.2s all);
                }

                &.active {
                    & {
                        opacity: 1;
                        @include transition(.2s all);
                    }
                }
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
                        outline: none;
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
                            color: #fff;
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

                        & > span {
                            & {
                                cursor: text;
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
