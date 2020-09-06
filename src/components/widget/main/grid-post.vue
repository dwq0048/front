<template>
    <div class="pee">
        <div class="grid" ref="element">
            <div class="grid__item" v-for="(item, i) in list" :key="i" :style="`width: ${imgWidth}px`">
                <a href="img/original/1.jpg" class="img-wrap" 
                    :data-radio="(item.ImageMeta[item.meta.thumbnail.num].meta.height / item.ImageMeta[item.meta.thumbnail.num].meta.width) * 100"
                    :data-width="imgWidth"
                    :data-height="((item.ImageMeta[item.meta.thumbnail.num].meta.height / item.ImageMeta[item.meta.thumbnail.num].meta.width)) * (imgWidth)"
                >
                    <img :src="`${SERVER}/images/${item.images[item.meta.thumbnail.num]}`" />

                    <div class="background">
                        <div class="black">

                        </div>
                        <div class="status">
                            <span>
                                <i><font-awesome-icon :icon="faHeart" /></i>
                                <p>0</p>
                            </span>
                            <span>
                                <i><font-awesome-icon :icon="faComment" /></i>
                                <p>0</p>
                            </span>
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

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons'

const postStore = 'postStore';

// 250 / X =  300

export default {
    name: 'GridPost',
    props: ['grid'],
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

            faHeart, faComment,

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

            if(!this.grid){
                this.imgWidth = 300;
                this.Screen = window.innerWidth;
            }else {
                if(this.grid.img == 'auto'){
                    //this.Screen = this.$refs.element.clientWidth;
                    this.Screen = window.innerWidth;

                    if(this.Screen > 1650){
                        this.Screen = 1170;
                    }else if(this.Screen > 1330 && this.Screen <= 1649){
                        this.Screen = 850;
                    }else if(this.Screen > 1024 && this.Screen <= 1329){
                        this.Screen = 1024;
                    
                    }
                    this.Screen = Number(this.Screen) - 30;

                    if(window.innerWidth > 1650){
                        this.imgWidth = Math.floor(this.Screen / 4);
                    }else if(window.innerWidth > 1330 && this.Screen <= 1649){
                        this.imgWidth = Math.floor(this.Screen / 3);
                    }else if(this.Screen > 840 && this.Screen <= 1329){
                        this.imgWidth = Math.floor(this.Screen / 3);
                    }else{
                        this.imgWidth = Math.floor(this.Screen / 2);
                    }
                }else{
                    this.Screen = this.$refs.element.clientWidth;
                    this.imgWidth = this.grid.img;
                }
            }

            this.cntWidth = Math.floor(this.Screen / this.imgWidth);
            this.ElementCnt = element.length;
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
    computed: {
        ...mapGetters({
            SERVER : 'GET_SERVER'
        })
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
        });
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

    },
    updated() {
        this.ResizeEvent();
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
                        //border: 1px solid #eee;
                        border-radius: 5px;
                        overflow: hidden;
                        position: relative;
                        @include box-shadow(5px 5px 5px rgba(0,0,0,0.1));
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

                        & > .status {
                            & {
                                position: absolute;
                                left: 50%; top: 50%;
                                z-index: 3;
                                opacity: 0;
                                @include transform(translate(-50%, -50%));
                                @include transition(.2s all);
                            }

                            & > span {
                                & {
                                    color: #fff;
                                    font-size: #{$font-size + 2};
                                    vertical-align: middle;
                                    padding-left: 20px;
                                }

                                &:nth-child(1){
                                    & {
                                        padding-left: 0;
                                    }
                                }

                                & > p {
                                    & {
                                        display: inline-block;
                                        padding-left: 10px;
                                        font-weight: bold;
                                    }
                                }

                                & > i {
                                    & {
                                        display: inline-block;
                                    }
                                }
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

                            & > .status {
                                & {
                                    opacity: 1;
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
