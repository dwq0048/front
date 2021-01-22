<template>
    <div class="board" v-if="!is_mobile()">
        <layout-navigation />
        <layout-header />

        <div class="title" >
            <div class="background"></div>
            <div class="bg" :style="'background-image:url(' + require(`@/assets/bg.png`)+ ')'"></div>
        </div>
        
        <div class="contents">
            <div class="board">
                <board-skin :info="info" />
            </div>
            <div class="nav">
                <menu-skin />
            </div>
        </div>

        <layout-footer />
    </div>

    <div class="board mobile" v-else>
        <layout-navigation />
        <layout-header />
        
        <div class="contents">
            <div class="board">
                <board-skin :info="info" />
            </div>
        </div>

        <layout-footer />
    </div>
</template>

<script>
import { IS_MOBILE } from '@/store/helper/'

import Header from '@/components/layout/header'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'

import MenuSkin from '@/components/board/menu_skin/side_pack_01'
import BoardSkin from '@/components/board/edit_skin/default_pack_01'

import { Free } from '../config'

export default {
    name: 'BoardFreeEdit',
    props: ['option'],
    components: {
        'layout-header': Header,
        'layout-navigation': Navigation,
        'layout-footer' : Footer,
        
        'menu-skin' : MenuSkin,
        'board-skin' : BoardSkin
    },
    data(){
        return {
            info: Free,
        }
    },
    methods : {
        is_mobile(){ return IS_MOBILE() }
    }
}
</script>

<style lang="scss" scoped>
    @import '../style.scss';
</style>
