<template>
    <div class="board">
        <layout-navigation />
        <layout-header />

        <div class="contents" v-bind:class="{ active : side }">
            <div class="photo">
                <board-skin :info="info" :post="post" @childs-event="parentsMethod" v-if="post"/>
            </div>
        </div>

        <layout-footer />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Header from '@/components/layout/header'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'

import BoardSkin from '@/components/board/view_skin/photo_pack_01'

import { Photo } from '../config'

const postStore = 'postStore'

export default {
    name: 'BoardNoticePost',
    props: ['option'],
    components: {
        'layout-header': Header,
        'layout-navigation': Navigation,
        'layout-footer' : Footer,
        
        'board-skin' : BoardSkin,
    },
    data(){
        return {
            info: Photo,
            post: false,


            side: false,
            left: '',
        }
    },
    methods: {
        ...mapActions(postStore, [
            'POST_VIEW'
        ]),
        parentsMethod(data){
            this.side = data;
            const el = this.$refs.comet
            const left = el.getBoundingClientRect().left;
            if(this.side){
                el.querySelector('.comment').style.left = `${left}px`;
            }else {
                el.querySelector('.comment').style.left = '';
            }
        }
    },
    created(){
        let info = this.info;
        info.index = this.$route.params.id;

        this.POST_VIEW(info).then((req) => {
            this.post = req;

        }).catch((err) => {
            console.log(err)
        })
    }

}

</script>

<style lang="scss" scoped>
    @import '../style.scss';

    .board {
        & > .contents {
            & {
                position: relative;
                width: 100%; height:auto;
                max-width: $wrap;
                font-size: 0;
                margin: 35px auto 0 auto;
            }
        }

        @media (max-width: 1650px) {

        }

        @media (max-width: 1330px) {

        }
    }
    
</style>
