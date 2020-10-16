<template>
    <div class="board">
        <layout-navigation />
        <layout-header />

        <div class="title"></div>
        <div class="contents">
            <div class="nav">
                <menu-skin />
            </div>
            <div class="board">
                <widget-skin :info="info" />
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/layout/header'
import Navigation from '@/components/layout/navigation'

import MenuSkin from '@/components/board/menu_skin/sidePack01'
import WidgetSkin from '@/components/board/main_skin/defaultPack01/post'

import { config } from './config'

export default {
        name: 'BoardFreePost',
        props: ['option'],
        components: {
            'layout-header': Header,
            'layout-navigation': Navigation,
            'menu-skin' : MenuSkin,
            'widget-skin' : WidgetSkin
        },
        data(){
            return {
                info: config
            }
        }
}
</script>

<style lang="scss" scoped>
    @import '../Notice/style.scss';
</style>
