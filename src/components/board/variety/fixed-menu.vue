<template>
    <div class="post-menu" :class="{ active : MenuFixed.BottomMenu }" ref="BottomMenu">
        <div ref="BottomMenuSub">
            <button type="button" title="고정하기" :class="{ active : FixedMenu }" @click="Fixed" ref="FixedMenu">
                <span>
                    <i><font-awesome-icon :icon="faThumbtack" /></i>
                    <i><font-awesome-icon :icon="faThumbtack" /></i>
                </span>
            </button>

            <div>
                <div class="title" ref="TitleMenu">
                    <ul>
                        <li v-for="(item, i) in EditorMenu" :key="i" :data-index="i" :class="{ 'is-active' : EditorMenu[i].active }" @click="EditorActive(i)" ref="EditorHover">
                            <button type="button" :title="item.ko">
                                <i><font-awesome-icon :icon="item.icon" /></i>
                            </button>
                        </li>
                        <div class="active" ref="EditorActive"></div>
                    </ul>
                </div>

                <div class="list">
                    <ul ref="EditorList">
                        <li :class="{ active : EditorMenu[0].active }">
                            <!-- <div class="list" ref="ImageSwiper" v-swiper:ImageSwiper="ImageSwipeOption"> -->
                            <div class="list" ref="Wrapper">
                                <input type="file" @change="UpdateFile('UploadImage')" multiple="multiple" ref="UploadImage"/>
                                <button type="button" class="move left" @click="FixedMove(false)" ref="FixedLeft">
                                    <span>
                                        <i><font-awesome-icon :icon="faChevronLeft" /></i>
                                    </span>
                                </button>
                                <button type="button" class="move right" @click="FixedMove(true)" ref="FixedRight">
                                    <span>
                                        <i><font-awesome-icon :icon="faChevronRight" /></i>
                                    </span>
                                </button>
                                <draggable tag="ul" v-model="StorageImages" draggable=".item" :move="ImageDrag" @end="ImageDrop">
                                    <li class="item" v-for="(item, i) in StorageImages" :key="i">
                                        <div>
                                            <img :src="item.base">
                                        </div>
                                    </li>
                                    <li class="btn" v-if="StorageImages.length <= 0">
                                        <button type="button" class="none" title="사진추가" @click="TriggerInput('UploadImage')">
                                            <span class="image"><i><font-awesome-icon :icon="faImage" /><span>사진 추가</span></i></span>
                                            <span class="plus"><i><font-awesome-icon :icon="faPlus" /></i></span>
                                        </button>
                                    </li>
                                </draggable>
                            </div>
                            <div class="options">
                                <div class="upload">
                                    <button type="button" @click="TriggerInput('UploadImage')">
                                        <span>사진 업로드</span>
                                    </button>
                                </div>
                                <div class="progress" ref="Progress">
                                    <div class="bar">
                                        <div class="bar" ref="SizeImages"></div>
                                    </div>
                                    <div class="info" ref="ProgressMb">
                                        <div>
                                            <span>{{ BytesToSize(MinSizeImages) }}</span> / <span>{{ BytesToSize(MaxSizeImages) }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
//import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
//import Swipe from 'swipejs'
import { SET_SCRIPT } from '@/store/helper/index'
import { SET_BOARD } from '@/store/helper/index'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faImage, faVideo, faSmile, faFileUpload, faThumbtack, faPlus, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'

//import { Cropper } from 'vue-advanced-cropper'
import draggable from 'vuedraggable'

export default {
    name: 'FixedMenu',
    props: ['StorageImages', 'ImagesActive', 'option'],
    components: {
        draggable
		//Swiper,
        //SwiperSlide,
    },
	//directives: { swiper: directive },
    data(){
        return {
            // Icon
            faImage, faVideo, faYoutube, faSmile, faFileUpload, faThumbtack, faPlus, faChevronLeft, faChevronRight,

            // Plugin
            draggable,

            // Editor
			EditorMenu : [
				{
					ko : '사진',
					en : 'Photo',
					icon : faImage,
					auth : 1,
					active : false,
				},
				{
					ko : '동영상',
					en : 'Vidio',
					icon : faVideo,
					auth : 2,
					active : false,
				},
				{
					ko : '유튜브',
					en : 'Youtube',
					icon : faYoutube,
					auth : 1,
					active : false,
				},
				{
					ko : '이모티콘',
					en : 'Emoticon',
					icon : faSmile,
					auth : 1,
					active : false,
				},
				{
					ko : '파일',
					en : 'File',
					icon : faFileUpload,
					auth : 2,
					active : false,
				},

            ],
            MenuFixed : { BottomMenu : false },
            FixedMenu : false,
            
            MinSizeImages : 0,
            MaxSizeImages : 0,

            SubStorageImages : []
            
			//ImageSwipeOption : {},
        }
    },
    methods : {
		Fixed(type) {
            this.FixedMenu = (this.FixedMenu) ? false : true
        },
        FixedMove(option) {
            const Wrap = this.$refs.Wrapper.querySelector('ul');
            const WrapOption = {
                width : Wrap.clientWidth,
                left : Wrap.scrollLeft,
                object : Wrap.querySelector('li').clientWidth
            };

            if(!option){
                let Move = Math.round(WrapOption.left / WrapOption.object) - 1;
                Move = (Move < 0) ? 0 : Move;
                const To = (Move * WrapOption.object);
                
                Wrap.scrollLeft = To;
                this.FixedDisabled(To);
            }else{
                let Move = Math.round(WrapOption.left / WrapOption.object) + 1;
                Move = (Move < 0) ? 0 : Move;
                const To = (Move * WrapOption.object);

                Wrap.scrollLeft = To;
                this.FixedDisabled(To);
            }
        },
        FixedDisabled(ScrollLeft = undefined) {
            const Wrap = this.$refs.Wrapper.querySelector('ul');
            const WrapOption = {
                left : Wrap.scrollLeft,
                scroll : Wrap.scrollWidth,
                width : Wrap.clientWidth,
            }

            if(ScrollLeft == undefined){
                if(WrapOption.left <= 0){
                    this.$refs.FixedLeft.classList.add('disable');
                }else{
                    this.$refs.FixedLeft.classList.remove('disable');
                }

                if((WrapOption.left + WrapOption.width) >= WrapOption.scroll ){
                    this.$refs.FixedRight.classList.add('disable');
                }else{
                    this.$refs.FixedRight.classList.remove('disable');
                }
            }else{
                if(ScrollLeft <= 0){
                    this.$refs.FixedLeft.classList.add('disable');
                }else{
                    this.$refs.FixedLeft.classList.remove('disable');
                }

                if((ScrollLeft + WrapOption.width) >= WrapOption.scroll ){
                    this.$refs.FixedRight.classList.add('disable');
                }else{
                    this.$refs.FixedRight.classList.remove('disable');
                }
            }
        },

		ImageDrop(evt){
            this.$emit('update-image', this.StorageImages);
        },
		ImageDrag(evt){
            console.log(evt.draggedContext);
		},
		EditorActive(index){
			this.EditorMenu.map(item => {
				if (item.active == true){
					item.active = false;
				}
			})

			this.EditorMenu[index].active = true;
        },
        EventMenu() {
            const BottomMenu = this.$refs.BottomMenu;
            const BottomMenuSub = this.$refs.BottomMenuSub;
            const WinHeight = window.innerHeight;

            const BottomElement = BottomMenu.getBoundingClientRect();
            const BottomPosition = {
                bottom: WinHeight - BottomElement.bottom,
                left: BottomElement.left
            }
            
            BottomMenu.style.paddingTop = `${BottomMenuSub.offsetHeight}px`;

            if(!this.FixedMenu){
                if(BottomPosition.bottom < 0){
                    BottomMenuSub.style.left = `${BottomPosition.left}px`;
                    BottomMenu.style.paddingTop = `${BottomMenuSub.offsetHeight}px`;
                    this.MenuFixed.BottomMenu = true;
                }else{
                    BottomMenuSub.style.left = ``;
                    this.MenuFixed.BottomMenu = false;
                }
            }else{
                BottomMenuSub.style.left = ``;
                this.MenuFixed.BottomMenu = false;
            }
        },
        ProgressSet() {
            const Progress = this.$refs.Progress;
            const ProgressMb = this.$refs.ProgressMb;
            const ProgressMbSize = { width: ProgressMb.clientWidth };
            const Padding = 30;

            Progress.style.paddingRight = `${ProgressMbSize.width + Padding}px`;
        },
		BytesToSize(bytes) {
			const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
			if (bytes == 0) return '0 MB';
			let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
			if (i == 0) return bytes + ' ' + sizes[i];
			return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
		},
		TriggerInput(type){
			try{
				this.$refs[type].click();
			} catch(err) {
				console.log('Undefined Element');
			}
		},
		UpdateFile(type){
			const _this = this;
			const ref = _this.$refs;

			const Spend = {
				async UploadImage(type){
					const files = ref[type].files;
					const storage = [];

					files.forEach(item => {
						switch(item.type){
							case 'image/jpeg':
								storage.push(item);
								break;
							case 'image/png':
								storage.push(item);
								break;
							default:
						}
					});

					for await (const item of storage){
						const src = await SET_BOARD.encodeBase64ImageFile(item);
						const options = await SET_SCRIPT.getImageDimensions(src);
						const position = {
							width: options.w,
							height: options.h,
							ratio: (options.h / options.w) * 100
						}

                        _this.$emit('push-image', {
							base : src,
							type : item.type,
							size : item.size,
							name : item.name,
							position : position,
							state : {
								active : false,
								thumbnail : false,
							}
						});
					}

                    _this.MinSizeImages = 0;
					_this.StorageImages.forEach((item, index) => {
                        _this.MinSizeImages += item.size;
						_this.StorageImages[index].state.active = (index == 0) ? true : false;
						_this.StorageImages[index].state.thumbnail = (index == 0) ? true : false;

						(index == 0) ? _this.ImagesActive.index = index : false;
						(index == 0) ? _this.ImagesActive.ratio = _this.StorageImages[index].position.ratio : 0;
						(index == 0) ? _this.ImagesThumbnail = index : false;
					});

                    const CurrentSize = (Number(_this.MinSizeImages) / Number(_this.MaxSizeImages) * 100).toFixed(4);
                    ref['SizeImages'].style.width = `${CurrentSize}%`;
                    
                    
			        _this.EditorActive(0);
                    _this.FixedDisabled();
                    _this.$emit('update-image-active', _this.ImagesActive);
                    _this.$emit('update-image', _this.StorageImages);
				},
			}

			try{
				Spend[type](type);
			} catch(err) {
				console.log(err);
			}
        },
    },
    created(){
        this.MinSizeImages = (this.option.min) ? this.option.min : 0;
        this.MaxSizeImages = (this.option.max) ? this.option.max : 0;
    },
    mounted(){
        const _this = this;
        SET_SCRIPT.optimizedResize();

        this.FixedDisabled();

		// Add Style
		let EditorStyle = '';
		this.EditorMenu.forEach((item, index) => {
			const element = document.querySelector(`.post > .write > .post-menu > div > div > .title > ul > li:nth-child(${index + 1})`);
			const width = element.clientWidth;
			const left = element.offsetLeft;

			EditorStyle += `
				.post > .write > .post-menu > div > div > .title > ul > li.is-active:nth-child(${index + 1}) ~ .active {
					left: ${left}px;
					width: ${width}px;
					transition: .2s all;
					-webkit-transition: .2s all;
					-moz-transition: .2s all;
					-ms-transition: .2s all;
					-o-transition: .2s all;
				}
			`;
		});
		this.styleTag = document.createElement('style');
		this.styleTag.appendChild(document.createTextNode(EditorStyle));
		document.head.appendChild(this.styleTag);
        // Add Style END

        this.$refs.Wrapper.querySelector('ul').addEventListener('scroll', (data) => {
            _this.FixedDisabled();
        });

		// SET Scroll
        window.addEventListener('scroll', function() {
            _this.EventMenu();
            _this.ProgressSet();
        });

        window.addEventListener("optimizedResize", function() {
            _this.EventMenu();
            _this.ProgressSet();
        });

        this.$refs.TitleMenu.addEventListener("click", function() {
            _this.EventMenu();
            _this.ProgressSet();
        });

        this.$refs.FixedMenu.addEventListener("click", function() {
            _this.EventMenu();
            _this.ProgressSet();
        });
		// SET Scroll END	
    }
}
</script>

<style lang="scss" scoped>
    .post-menu {
        & {
            width: 100%; height: auto;
            position: relative;
            z-index: 10;
            padding-top: 46px;
        }

        & > div {
            & {
                border: 1px solid #ddd;
                border-left: 0;
                border-right: 0;
                position: absolute;
                left: 0; bottom: 0;
                width: 100%;
                background-color: #fff;
            }

            & > button {
                & {
                    position: absolute;
                    right: 0; top: 0;
                    width: 48px; height: 48px;
                    border: 0;
                    background: none;
                    outline: none;
                    cursor: pointer;
                    @include transition(.2s all);
                    z-index: 10;
                }

                & > span {
                    & {
                        display: block;
                        position: relative;
                        width: 100%; height: 100%;
                    }

                    & > i {
                        & {
                            position: absolute;
                            left: 50%; top: 50%;
                            font-size: #{$font-size + 4};
                            color: #ccc;
                            @include transform(translate(-50%, -50%));
                        }

                        &:nth-child(2){
                            & {
                                margin-top: -3px;
                                margin-left: -3px;
                                color: $bg-blue-light;
                                @include transition(.2s all);
                            }
                        }
                    }
                }

                &:hover {
                    & > span {
                        & > i:nth-child(2) {
                            margin-top: 0px;
                            margin-left: 0px;
                            @include transition(.2s all);
                        }
                    }
                }

                &.active {
                    & > span {
                        & > i:nth-child(2) {
                            margin-top: 0px;
                            margin-left: 0px;
                            color: $bg-orange;
                            @include transition(.2s all);
                        }
                    }
                }
            }

            & > div {
                & {
                    width: 100%; height: auto;
                    overflow:hidden;
                }

                & > .title {
                    & {
                        width: 100%;
                        height: auto;
                        padding: 0 15px;
                        z-index: 1;
                    }

                    & > ul {
                        & {
                            width: auto; height: auto;
                            list-style: none;
                            font-size: 0;
                            position: relative;
                            overflow: hidden;
                        }

                        & > .active {
                            & {
                                position: absolute;
                                width: 52px; height: 3px;
                                background-color: $bg-blue;
                                left: -100px; bottom: 0;
                                @include transition(.2s all);
                            }
                        }

                        & > li {
                            & {
                                display: inline-block;
                            }

                            & > button {
                                & {
                                    display: block;
                                    margin: 0; padding: 0;
                                    border: 0; background: none;
                                    font-size: #{$font-size + 8};
                                    padding: 10px 15px;
                                    color: #999;
                                    outline: none;
                                    cursor: pointer;
                                    @include transition(.2s all);
                                }

                                &:hover {
                                    & {
                                        color: $bg-blue;
                                        @include transition(.2s all);
                                    }
                                }
                            }

                            &.is-active {
                                & > button {
                                    & {
                                        color: $bg-blue;
                                        @include transition(.2s all);
                                    }
                                }
                            }
                        }
                    }
                }

                & > .list {
                    & {
                        width: 100%; height: auto;
                        border-top: 1px solid #ddd;
                        margin: 0;
                    }

                    & > ul {
                        & {
                            width: 100%; height: auto;
                            font-size: 0;
                            list-style: none;
                        }

                        & > li {
                            & {
                                width: 100%; height: auto;
                                display: none;
                                position: relative;
                                background-color: #fff;	
                                font-size: 0;
                                white-space: nowrap;
                                overflow: hidden;
                                padding: 15px;
                            }

                            &.active {
                                & {
                                    display: block;
                                }
                            }

                            & > .options {
                                & {
                                    width: 100%; height: auto;
                                    display: block;
                                    font-size: 0;
                                    padding-top: 15px;
                                }

                                & > .upload {
                                    & {
                                        width: 15%; height: auto;
                                        display: inline-block;
                                        vertical-align: middle;
                                        padding-right: 15px;
                                    }

                                    & > button {
                                        & {
                                            display: block;
                                            width: 100%; height: 30px;
                                            border: 0; background: none;
                                            margin: 0; padding: 0;
                                            text-align: center;
                                            cursor: pointer; outline: none;
                                            background-color: $bg-orange;
                                            color: #fff;
                                            border-radius: 5px;
                                            font-size: #{$font-size - 2};
                                            @include transition(.2s all);
                                        }

                                        &:hover {
                                            & {
                                                background-color: #ea915e;
                                                @include transition(.2s all);
                                            }
                                        }
                                    }
                                }

                                & > .progress {
                                    & {
                                        width: 85%; height: auto;
                                        display: inline-block;
                                        position: relative;
                                        padding-right: 100px;
                                        //margin-top: 10px;
                                        vertical-align: middle;
                                    }

                                    & > .info {
                                        & {
                                            position: absolute;
                                            right: 0; top: 50%;
                                            @include transform(translateY(-50%));
                                            text-align: right;
                                        }

                                        & > div {
                                            & {
                                                font-size: #{$font-size - 1};
                                                font-weight: bold;
                                                color: #999;
                                                margin-top: -3px;
                                            }

                                            & > span {
                                                &:nth-child(1){
                                                    & {
                                                        color: $bg-orange;
                                                    }
                                                }

                                                &:nth-child(2){
                                                    & {
                                                        color: #555;
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    & > .bar {
                                        & {
                                            width: 100%; height: 16px;
                                            background-color: #ddd;
                                            border-radius: 15px;
                                            position: relative;
                                            padding: 4px 5px;
                                        }

                                        & > .bar {
                                            & {
                                                width: 0px; height: 100%;
                                                background-color: $bg-orange;
                                                position: relative;
                                                border-radius: 15px;
                                            }
                                        }
                                    }
                                }


                            }

                            & > ul.upload {
                                & {
                                    width: 15%;
                                    font-size: 0;
                                    list-style: none;
                                    display: inline-block;
                                    position: relative;
                                    background-color: #fff;
                                    z-index: 10;
                                    vertical-align: top;
                                }

                                &:after {
                                    content: " ";
                                    display: block;
                                    padding-bottom: 100%;
                                }
                            }

                            & > .list {
                                & {
                                    display: inline-block;
                                    width: 100%; height: auto;
                                    font-size: 0;
                                    list-style: none;
                                    position: relative;
                                    vertical-align: top;
                                    padding: 0 45px;
                                }

                                & > input {
                                    & {
                                        display: none;
                                    }
                                }

                                & > button.move {
                                    & {
                                        position: absolute;
                                        width: 40px; height: 100%;
                                        left: 0; top: 0;
                                        border: 0; background: none;
                                        margin: 0; padding: 0;
                                        background-color: rgba(95,164,233,0.8);
                                        cursor: pointer; outline: none;
                                        z-index: 10;
                                        border-radius: 1px;
                                        @include transition(.2s all);
                                    }

                                    & > span {
                                        & {
                                            position: relative;
                                            width: 100%; height: 100%;
                                            @include transition(.2s all);
                                            @include transform(scale(1));
                                        }

                                        & > i {
                                            & {
                                                position: absolute;
                                                left: 50%; top: 50%;
                                                font-size: #{$font-size + 4};
                                                color: #fff;
                                                @include transform(translate(-50%, -50%));
                                            }
                                        }
                                    }

                                    &.right {
                                        & {
                                            left: 100%;
                                            @include transform(translateX(-100%));
                                        }
                                    }

                                    &:hover {
                                        & {
                                            background-color: rgba(95,164,233,1);
                                            @include transition(.2s all);
                                        }

                                        & > span {
                                            & {
                                                @include transition(.2s all);
                                                @include transform(scale(1.05));
                                            }
                                        }
                                    }

                                    &.disable {
                                        & {
                                            background-color: #ddd;
                                            @include transition(.2s all);
                                        }
                                    }
                                }

                                & > ul {
                                    & {
                                        display: inline-block;
                                        width: 100%; height: auto;
                                        font-size: 0;
                                        list-style: none;
                                        position: relative;
                                        vertical-align: top;
                                        overflow-x: scroll;
                                        scroll-behavior: smooth;
                                    }

                                    &::-webkit-scrollbar {
                                        display: none;
                                    }

                                    & > li.btn {
                                        & {
                                            display: inline-block;
                                            width: 17%; height: auto;
                                            padding: 0 5px;
                                            vertical-align: top;
                                        }

                                        & > button {
                                            & {
                                                display: block;
                                                width: 100%; height: auto;
                                                border: 0; background: none;
                                                margin: 0; padding: 0;
                                                position: relative;
                                                border: 2px dashed #ddd;
                                                background-color: #f1f1f1;
                                                border-radius: 3px;
                                                overflow: hidden;
                                                outline: none;
                                                cursor: pointer;
                                            }

                                            &:after {
                                                & {
                                                    content: " ";
                                                    display: block;
                                                    padding-bottom: 100%;
                                                }
                                            }

                                            & > span {
                                                & {
                                                    display: block;
                                                    position: absolute;
                                                    left: 50%; top: 50%;
                                                    @include transform(translate(-50%, -50%));
                                                }

                                                &.image {
                                                    & {
                                                        opacity: 1;
                                                        @include transition(.2s all);
                                                        text-align: center;
                                                    }

                                                    & > i {
                                                        & {
                                                            font-size: #{$font-size + 4};
                                                            color: #999;
                                                        }

                                                        & > span {
                                                            & {
                                                                display: block;
                                                                font-size: #{$font-size - 2};
                                                                font-style: normal;
                                                                font-weight: bold;
                                                            }
                                                        }
                                                    }
                                                }

                                                &.plus {
                                                    & {
                                                        opacity: 0;
                                                        @include transition(.2s all);
                                                    }

                                                    & > i {
                                                        & {
                                                            font-size: #{$font-size + 4};
                                                            color: $bg-orange;
                                                        }
                                                    }
                                                } 
                                            }

                                            &:hover {
                                                & {
                                                    border: 2px dashed $bg-orange;
                                                    @include transition(.2s all);
                                                }

                                                & > span {
                                                    &.image {
                                                        & {
                                                            opacity: 0;
                                                            @include transition(.2s all);
                                                        }
                                                    }

                                                    &.plus {
                                                        & {
                                                            opacity: 1;
                                                            @include transition(.2s all);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    & > li {
                                        & {
                                            display: inline-block;
                                            width: 17%!important; height: auto;
                                            padding: 0 5px;
                                            vertical-align: top;
                                        }

                                        & > div {
                                            & {
                                                display: block;
                                                width: 100%; height: auto;
                                                position: relative;
                                                background-color: #ddd;
                                                overflow: hidden;
                                                border: 1px solid #ddd;
                                                border-radius: 3px;
                                            }

                                            &:after {
                                                content: " ";
                                                display: block;
                                                padding-bottom: 100%;
                                            }

                                            & > img {
                                                & {
                                                    display: block;
                                                    position: absolute;
                                                    width: 100%; height: 100%;
                                                    left: 0; top: 0;
                                                    object-fit: cover;
                                                }
                                            }
                                        }
                                    }

                                }
                            }
                        }
                    }
                }
            }
        }

        &.active {
            & > div {
                & {
                    position: fixed;
                    left: 0; bottom: 0;
                    width: 100%; max-width: 838px;
                }
            }
        }
    }
</style>
