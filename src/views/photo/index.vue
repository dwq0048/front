<template>
    <div class="board">
        <layout-navigation />
        <layout-header />

        <div class="title"></div>
        <div class="contents" :class="{ hidden : HIDDEN }">
            <div class="board">
                <widget-skin :info="info" @active="ActReceive" @menu="MenuReceive" />
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
                HIDDEN: true
            }
        },
        methods: {
            ActReceive(ACTIVE){
                this.ACTIVE = ACTIVE;
            },
            MenuReceive(HIDDEN){
                this.HIDDEN = HIDDEN;
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
        white-space: nowrap;
        text-align: center;
        @include transition(.2s all);
    }

    &::after {
        content: " ";
        display: block;
        clear: both;
    }

    & > .board {
        & {
            width: 900px;
            height: auto;
            display: inline-block;
            margin: 0 auto;
            vertical-align: top;
            padding: 80px 30px 10px 30px;
            text-align: left;
            @include transition(.2s all);
        }
    }

    & > .nav {
        & {
            width: 300px;
            height: auto;
            display: inline-block;
            margin-top: 80px;
            overflow: hidden;
            vertical-align: top;
            text-align: left;
            @include transition(.2s all);
            @include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
        }
    }

    &.hidden {
        & > .board {
            & {
                width: 100%;
                @include transition(.2s all);
            }
        }

        & > .nav {
            & {
                width: 0px;
                @include transition(.2s all);
            }
        }
    }
}

@media (max-width: #{$media-tablet-max}) {
    .contents {
        & > .nav {
            width: 0%;
            @include transition(.2s all);
        }
    }
}

</style>
