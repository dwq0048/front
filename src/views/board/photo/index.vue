<template>
    <div class="board">
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
</template>

<script>
import Header from '@/components/layout/header'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'

import MenuSkin from '@/components/board/menu_skin/side_pack_01'
import BoardSkin from '@/components/board/main_skin/photo_pack_01'

import { Photo } from '../config'

export default {
    name: 'BoardPhoto',
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
            info: Photo,
        }
    },
}
</script>

<style lang="scss" scoped>
    @import '../style.scss';
</style>
