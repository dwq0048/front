<template>
    <div class="board">
        <layout-navigation />
        <layout-header />

        <div class="title"></div>
        <div class="contents" :class="{ hidden : HIDDEN }">
            <div class="board">
                <widget-skin :info="info" @menu="MenuReceive" />
            </div>
            <div class="nav">
                <menu-skin />
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/layout/header'
import Navigation from '@/components/layout/navigation'

import MenuSkin from '@/components/board/menu_skin/sidePack01'
import WidgetSkin from '@/components/board/main_skin/photoPack01'

import { config } from './config'

export default {
        name: 'BoardPhoto',
        props: ['option'],
        components: {
            'layout-header': Header,
            'layout-navigation': Navigation,
            'menu-skin' : MenuSkin,
            'widget-skin' : WidgetSkin
        },
        data(){
            return {
                info: config,
                ACTIVE: {},
                HIDDEN: false
            }
        },
        methods: {
            MenuReceive(HIDDEN){
                this.HIDDEN = HIDDEN;
            }
        },
        created(){
            console.log(this.$route.prevRoute);
            
            if(!this.HIDDEN){
                setTimeout(() => {
                    this.HIDDEN = true;
                },0);
            }
        }
}
</script>

<style lang="scss" scoped>
    @import '../Notice/style.scss';
</style>
