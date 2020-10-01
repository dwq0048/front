<template>
    <div class="tags">
        <div placeholder="태그를 입력해주세요" ref="Hash" @keypress="PostPress" contenteditable>
            <i v-for="(item, i) in SubStorageHashs" :key="i" class="disabled" contenteditable="false">
                {{ item.hash }}
            </i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HashDisabled',
    data(){
        return {
            SubStorageHashs : []
        }
    },
    methods: {
        setCaret(node){
            var caretID = 'caret';
            var cc = document.createElement('span');
            cc.id = caretID;
            window.getSelection().getRangeAt(0).insertNode(cc);
            node.blur();
        },
        getCaret(node){
            var caretID = 'caret';

            node.focus();

            var range = document.createRange();
            var cc = document.getElementById(caretID);
            range.selectNode(cc);
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            range.deleteContents();
        },
        PostPress(event){
            this.EnterChars(event);
            this.SpecialChars(event);
        },
        BackSpace(event){
            if(event.keyCode != 8){
                event.preventDefault();
            }
        },
        EnterChars(event){
            // enter, spacebar
			if (event.keyCode === 13 || event.keyCode === 32) {
                event.preventDefault();
                /*
                const Node = this.$refs.Hash;
                let hashString = '';
                if(typeof Node.childNodes == 'object'){
                    Node.childNodes.forEach((item, index) => {
                        if(typeof item.nodeName == 'string'){
                            if(item.nodeName == '#text'){
                                if(typeof item.textContent == 'string'){ hashString = item.textContent }else{ hashString = item.nodeValue }
                            }
                        }
                    });
                }

                this.SubStorageHashs.push({ hash : hashString });

                this.SubStorageHashs.forEach(item => {
                    const span = document.createElement('i');
                    span.setAttribute('class','disabled private');
                    span.setAttribute('contenteditable','false');
                    span.appendChild(document.createTextNode(item.hash));
                    Node.appendChild(span);
                })

                this.setCaret(Node);
                console.log(Node.innerHTML);
                Node.innerHTML = Node.innerHTML.replace(/<[/]?span[^i|>]*>/g, "");
                this.getCaret(Node);
                */

                const node = this.$refs.Hash;
                let hashString = '';
                let Delete = [];
                if(typeof this.$refs.Hash.childNodes == 'object'){
                    this.$refs.Hash.childNodes.forEach((item, index) => {
                        if(typeof item.nodeName == 'string'){
                            if(item.nodeName == '#text'){
                                if(typeof item.textContent == 'string'){ hashString = item.textContent }else{ hashString = item.nodeValue }
                                Delete.push(item);
                            }
                        }
                    });
                }

                this.SubStorageHashs.push({ hash : hashString });
                
                Delete.forEach(item => {
                    item.remove();
                });

                const Span = document.createElement('span');
                span.id = 'SubHash';
                window.getSelection().getRangeAt(0).insertNode(cc);
                Node.blur();

                /*
                this.setCaret(node);
                node.innerHTML = node.innerHTML.replace(/<[/]?span[^i|>]*>/g, "");
                this.getCaret(node);
                */
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
    }
}
</script>

<style lang="scss" scoped>
    .tags {
        & {
            width: 100%; height: 30px;
            border: 1px solid #ddd;
            border-radius: 3px;
            padding: 0 10px;
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

            &[contenteditable=true]:empty:before{
                content: attr(placeholder);
                color: #aaa;
            }

            & > .disabled {
                & {
                    background-color: #f1f1f1;
                    border-radius: 3px;
                    padding: 0 5px;
                    margin: 0 2px;
                }
            }

            & > .enable {
                & {
                    outline: none;
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
