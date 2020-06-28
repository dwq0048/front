<template>
    <div class="board">
        <default-header />
        <side-navigation />

        <div class="title"></div>
        <div class="contents">
            <div class="nav">
                
            </div>
            <div class="board">
                
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Header from '@/components/layout/header'
import SideNavigation from '@/components/layout/side'

export default {
        name: 'notice',
        props: ['option'],
        components: {
            'default-header': Header,
            'side-navigation': SideNavigation
        },
        /*
        created(){
            Vue.component('widget', () => import(`@/components/board/main/${this.option}/index`))
        }
        */
}
</script>

<style lang="scss" scoped>
    @import './style.scss';
</style>
