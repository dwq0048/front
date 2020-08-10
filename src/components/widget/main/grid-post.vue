<template>
    <div class="pee">
        <div class="grid" ref="element">
            <div class="grid__item" v-for="(item, i) in list" :key="i">
                <a href="img/original/1.jpg" class="img-wrap" 
                    :data-radio="(item.ImageMeta[item.meta.thumbnail.num].meta.height / item.ImageMeta[item.meta.thumbnail.num].meta.width) * 100"
                    :data-width="300"
                    :data-height="((item.ImageMeta[item.meta.thumbnail.num].meta.height / item.ImageMeta[item.meta.thumbnail.num].meta.width)) * 300"
                >
                    <img :src="'http://127.0.0.1:3000/images/'+item.images[item.meta.thumbnail.num]" alt="img01" />

                    <div class="background">
                        <div class="black">

                        </div>
                    </div>
                </a>
            </div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { SET_BOARD, SET_TIME } from '@/store/helper/'

const postStore = 'postStore';

// 250 / X =  300

export default {
    name: 'GridPost',
    data() {
        return {
            Screen: 0,
            cntWidth: 0,
            ElementCnt: 0,
            imgWidth: 0,
            bottom: 15,
            option: [],
            min: [],
            max: [],
            man: [],

            list: []
        }
    },
    methods: {
        ...mapActions(postStore, [
            'POST_LIST'
        ]),
        LoadEvent(){
            window.addEventListener('load', () => {
                this.ResizeEvent();
            });
        },
        ResizeEvent(){
            let element = this.$refs.element;
            element = element.childNodes;

            this.Screen = window.innerWidth;
            this.cntWidth = Math.floor(this.Screen / 300);
            this.ElementCnt = element.length;
            this.imgWidth = 300;
            this.margin = 0;
            this.option = [];
            this.min = [];

            for(let i=0; i<this.ElementCnt; i++){
                element[i].style.left = ``;
                element[i].style.top = ``;
            }

            for(let i=0; i<this.cntWidth; i++){
                this.option.push({ name: i, height: 0, meta: [] })
            }

            this.min = this.option[0];
            this.max = this.option[0];
            for(let i=0; i<this.ElementCnt; i++){
                for(let j=0; j<this.option.length; j++){
                    if((this.min.height >= this.option[j].height)){
                        this.min = this.option[j];
                    }

                    if(this.max.height < this.option[j].height){
                        this.max = this.option[j];
                    }
                }

                if(this.min.name != 0){
                    element[i].style.left = `${ ( this.min.name * this.imgWidth ) }px`;
                }

                if(this.option[this.min.name].height != 0){
                    element[i].style.top = `${ Number(this.option[this.min.name].height) }px`;
                }

                this.option[this.min.name].height = Number(this.option[this.min.name].height) + Number(element[i].querySelector(`[data-height]`).getAttribute("data-height"));
                this.option[this.min.name].meta.push( i );
            }

            document.querySelector('.pee > .grid').style.width = `${ this.imgWidth * this.option.length }px`;
            document.querySelector('.pee > .grid').style.height = `${ this.max.height }px`;
        }
    },  
    created(){
        const data = {
            board: 'photo',
            page: 0,
            view: 100
        }

        this.POST_LIST(data).then((req) => {
            this.list = req;

            this.LoadEvent();
        }).catch((err) => {
            console.log(err);
        })
    },
    mounted(){
        window.addEventListener('resize', () => {
            this.ResizeEvent();
        });

        /*

        window.addEventListener('click', () => {
            this.Screen = window.innerWidth;
            this.cntWidth = Math.floor(this.Screen / 300);
            this.ElementCnt = element.length;
            this.imgWidth = 300;
            this.margin = 50;
            this.option = [];

            ResizeEvent();
        });

        */

    }
}
</script>

<style lang="scss" scoped>
    .pee {
        & {
            position:relative;
        }

        & > .grid {
            & {
                font-size: 0;
                margin: 0 auto;
                position: relative;
            }

            & > .grid__item {
                & {
                    width: 300px;
                    display: inline-block;
                    vertical-align: top;
                    position:absolute;
                    left:0;
                    top:0;
                    padding: 15px;
                    @include transform(scale(1));
                    @include transition(all .2s);
                    cursor: pointer;
                }

                & > a {
                    & {
                        display: block;
                        border: 1px solid #eee;
                        border-radius: 5px;
                        overflow: hidden;
                        position: relative;
                    }

                    & > img {
                        & {
                            width: 100%;
                        }
                    }

                    & > div.background {
                        & {
                            position: absolute;
                            left: 0; top: 0;
                            width: 100%;
                            height: 100%;
                            z-index: 1;
                        }

                        & > .black {
                            & {
                                position: absolute;
                                left: 0; top: 0;
                                width: 100%;
                                height: 100%;
                                background-color: rgba(0,0,0,0);
                                @include transition(all .2s);
                                z-index: 2;
                            }
                        }
                    }
                }

                &:hover {
                    & {
                        @include transform(scale(1.05));
                        @include transition(all .2s);
                    }

                    & > a {
                        & > div.background {
                            & > .black {
                                background-color: rgba(0,0,0,0.5);
                                @include transition(all .2s);
                            }
                        }
                    }
                }
            }
        }
    }
</style>
