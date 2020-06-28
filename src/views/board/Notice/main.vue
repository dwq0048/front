<template>
    <div class="notice">
        <default-header />
        <side-navigation />

        <div class="contents">
            <div class="nav">
                sadasdadasljdkajdlskj
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

export default {
        name: 'notice',
        props: ['option'],
        components: {
            'default-header': Header,
            'side-navigation': SideNavigation
        },
        created(){
            Vue.component('widget', () => import(`@/components/board/main/${this.option}/index.vue`))
        }
}
</script>

<style lang="scss" scoped>
    .contents {
        & {
            width: 100%;
            max-width: $wrap;
            height: auto;
            margin: 0 auto;
        }

        &:after {
            content: " ";
            display: block;
            clear: both;
        }

        & > .board {
            width: 900px;
            height: 300px;
            float: left;
        }

        & > .nav {
            width: 300px;
            height: 300px;
            background-color: #ccc;
            float: right;
        }
    }
</style>
