<template>
    <div class="board">
        <default-header />
        <side-navigation />

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

export default {
        name: 'notice',
        props: ['option'],
        components: {
            'default-header': Header,
            'side-navigation': SideNavigation,
            'side-menu' : Menu
        },
        /*
        created(){
            Vue.component('widget', () => import(`@/components/board/post/${this.option}/index`))
        }
        */
}
</script>

<style lang="scss" scoped>
    @import './style.scss';

</style>
