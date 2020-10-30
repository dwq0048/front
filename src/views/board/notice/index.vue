<template>
    <div class="board">
        <layout-navigation />
        <layout-header />

        <div class="title"></div>
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
import BoardSkin from '@/components/board/main_skin/default_pack_01'

import { Notice } from '../config'

export default {
    name: 'BoardNotice',
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
            info: Notice,
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../style.scss';
</style>
