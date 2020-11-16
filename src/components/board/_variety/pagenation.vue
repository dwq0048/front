<template>
    <div class="pagenation">
        <ul>
            <li class="btn prev" @click="Arrow(false)" :class="{ disabled : ( page == 0 ) }">
                <button type="button">
                    <div>
                        <i><font-awesome-icon :icon="faChevronLeft" /></i>
                    </div>
                </button>
            </li>

            <li v-for="(item, i) in Nation()" :key="i" :class="{ active : (page == item) }">
                <button type="button" @click="GoTo(item)">
                    <div>
                        <span>{{ item + 1 }}</span>
                    </div>
                </button>
            </li>

            <li class="btn next" @click="Arrow(true)" :class="{ disabled : ( page == (nation.max - 1) ) }">
                <button type="button">
                    <div>
                        <i><font-awesome-icon :icon="faChevronRight" /></i>
                    </div>
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default {
    name : 'pagenation',
    props : ['count', 'board'],
    data(){
        return {
            // Icon
            faChevronLeft, faChevronRight,

            // Variable
            view : 15,
            post : 0,
            page : 0,

            nation : {
                width : 10,
                index : 0,
                max : 0,
            },
        }
    },
    methods: {
        GoTo(index, item){
            if(this.page != index){
                if(index == 0){
                    this.$router.push({ path: '/' + this.board });
                }else{
                    this.$router.push({ query: { page: (index + 1 ) }});
                }
                this.WatchPage(true);
            }
        },
        Arrow(rotation){
            const page = (rotation) ? this.page + 1 : this.page - 1;
            if(page > -1 && page < this.nation.max){
                this.$router.push({ query: { page: ( page + 1 ) }});
                this.WatchPage(true);
            }
        },
        Nation(){            
            let list = [];
            for (let i=this.nation.index; i < (this.nation.width + this.nation.index); i++){ list.push(i) };
            return list;
        },
        WatchPage(event = false){
            this.post = (this.count) ? this.count : 0;
            this.page = (this.$route.query.page) ? Number(Number(this.$route.query.page) - 1) : 0;
            (isNaN(this.page)) ? this.page = 0 : undefined;
            (this.page < 0) ? this.page = 0 : undefined;

            this.nation.max = Math.ceil(Number(this.post / this.view));
            if(this.nation.max > this.nation.width){
                if(this.page > 4 && this.page < (this.nation.max - 6)){
                    this.nation.index = (this.page - 4);
                }else if(this.page > (this.nation.max - 7)){
                    this.nation.index = (this.nation.max - 10);
                }else {
                    this.nation.index = 0;
                }
            }else{
                this.nation.width = this.nation.max;
                this.nation.index = 0;
            }

            if(event){
                this.$emit('list-load');
            }
        },
    },
    created(){
        (!this.board) ? this.board = 'notice' : undefined;
        this.WatchPage();
    }
}
</script>

<style lang="scss" scoped>
    .pagenation {
        & {
            width: 100%; height: auto;
            text-align: center;
        }

        & > ul {
            & {
                display: inline-block;
                width: auto; height: auto;
                list-style: none;
                font-size: 0;
                border-radius: 3px;
                padding: 5px 5px;
                background-color: #fff;
                @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
            }

            & > li {
                & {
                    display: inline-block;
                    padding: 0 3px;
                }

                & > button {
                    & {
                        display: block;
                        position: relative;
                        outline: none; cursor: pointer;
                        background: none; border: 0;
                        margin: 0; padding: 0;
                        border-radius: 3px;
                        background-color: #fff;
                        width: auto; min-width: 35px; height: 35px;
                        @include transition(.2s all);
                    }

                    & > div {
                        & {
                            position: absolute;
                            left: 50%; top: 50%;
                            font-size: 0;
                            @include transform(translate(-50%, -50%));
                        }

                        & > span {
                            & {
                                display: inline-block;
                                vertical-align: middle;
                                font-size: #{$font-size - 2};
                                font-weight: bold;
                                color: #555;
                                line-height: 1;
                                @include transition(.2s all);
                            }
                        }

                        & > i {
                            & {
                                display: inline-block;
                                vertical-align: middle;
                                font-size: #{$font-size - 4};
                                color: #555;
                                line-height: 1;
                            }
                        }
                    }

                    &:hover {
                        & {
                            background-color: #f1f1f1;
                            @include transition(.2s all);
                        }
                    }
                }

                &.btn {
                    & > button {
                        & {
                            width: 50px;
                        }
                    }
                }

                &.disabled {
                    & > button {
                        & {
                            background-color: #eee;
                            cursor: not-allowed;
                            @include transition(.2s);
                        }
                    }
                }

                &.active {
                    & > button {
                        & {
                            background-color: $bg-blue;
                            @include transition(.2s all);
                        }

                        & > div {
                            & > span {
                                & {
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
</style>
