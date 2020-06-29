<template>
    <div class="board">
        <side-navigation />
        <default-header />

        <div class="title"></div>
        <div class="contents">
            <div class="nav">
                <side-menu />
            </div>
            <div class="board">
                <widget />
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Header from '@/components/layout/header'
import SideNavigation from '@/components/layout/side'
import Menu from '@/components/board/menu/side'

import widget from '@/components/board/notice'

export default {
        name: 'notice',
        props: ['option'],
        components: {
            'default-header': Header,
            'side-navigation': SideNavigation,
            'side-menu' : Menu,
            'widget' : widget
        },
        /*
        created(){
            Vue.component('widget', () => import(`@/components/board/main/${this.option}/index`))
        }*/
}
</script>

<style lang="scss" scoped>
    @import './style.scss';
</style>
