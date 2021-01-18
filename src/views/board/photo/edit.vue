<template>
    <div class="board">
        <layout-navigation />
        <layout-header />

        <div class="title" >
            <div class="background"></div>
            <div class="bg" :style="'background-image:url(' + require(`@/assets/bg.png`)+ ')'"></div>
        </div>
        
        <div class="contents">
            <div class="nav">
                <menu-skin />
            </div>
            <div class="board">
                <board-skin :info="info"/>
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
import BoardSkin from '@/components/board/edit_skin/photo_pack_01'

import { Photo } from '../config'

export default {
    name: 'BoardPhotoEdit',
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
    }
}
</script>

<style lang="scss" scoped>
.title {
    width: 100%;
    height: 200px;
    background-color: #ccc;
}

.contents {
    & {
        width: 100%;
        max-width: $wrap;
        height: auto;
        margin: -100px auto;
    }

    &::after {
        content: " ";
        display: block;
        clear: both;
    }

    & > .board {
        width: 900px;
        height: auto;
        float: left;
        padding: 80px 30px 10px 30px;
    }

    & > .nav {
        width: 300px;
        height: auto;
        background-color: #fff;
        float: right;
        margin-top: 80px;
        @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
    }
}
</style>