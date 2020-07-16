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
                <widget-skin />
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/layout/header'
import Navigation from '@/components/layout/navigation'

import MenuSkin from '@/components/board/menu_skin/sidePack01'
import WidgetSkin from '@/components/board/main_skin/photoPack01/edit'

const config = {
    info : {
        board: 'photo'
    }
}

export default {
        name: 'BoardPhotoEdit',
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

    // 카테고리
    // 썸네일      /      글( 채팅 )
    // 사진 리스트

    // 체크박스
        // 맵
        // 언급
        // 테그

        // 작성자 비공개
        // 댓글 비공개
        // 게시글 비공개



    // 출석 땅파기



    // min 이미지 4 x { ... }
    // wrap 이미지 10 x { ... }
    // max 이미지 100 x { ... }

    //저주 / 축복

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