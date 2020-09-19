<template>
    <div class="list" ref="Preview">
        <ul v-if="StorageImages.length > 0" :style="`padding-bottom:${ImagesActive.ratio}%`">
            <li v-for="(item, i) in StorageImages" :key="i" :class="{ active : i ==  ImagesActive.index }">
                <div class="image">
                    <img :src="item.base">
                </div>
            </li>
            <button type="button" class="move left" @click="SlideBtn(false)">
                <span>
                    <i><font-awesome-icon :icon="faChevronLeft" /></i>
                </span>
            </button>
            <button type="button" class="move right" @click="SlideBtn(true)">
                <span>
                    <i><font-awesome-icon :icon="faChevronRight" /></i>
                </span>
            </button>
            <div class="isDown" ref="isDown">
                <div>
                    <div></div>
                </div>
            </div>
            <div class="nav" ref="Able">
                <div>
                    <button type="button" :class="{ active : ImagesClose.state }">닫기</button>
                    <ul>
                        <li v-for="(item, i) in ImagesNav" :key="i">
                            <button type="button" :data-en="item.en" :class="{ active : item.state }">{{ item.ko }}</button>
                        </li>
                    </ul>
                </div>
            </div>
        </ul>

        <!--
        <div class="pre-list">
            <div>
                <ul v-if="StorageImages.length > 0">
                    <li v-for="(item, i) in StorageImages" :key="i" :class="{ active : i ==  ImagesActive.index }">
                        <div class="image">
                            <img :src="item.base">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        -->
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

export default {
    name: 'SwipeSlide',
    props: ['StorageImages', 'ImagesActive'],
    data(){
        return {
            faChevronLeft, faChevronRight,

			ImagesClose : {
				en : 'close',
				ko : '닫기',
				state : true
			},
			ImagesNav : [
				{
					en : 'original',
					ko : '원본보기',
					state : false
				},
				{
					en : 'sizeUp',
					ko : '크게보기',
					state : false
				},
				{
					en : 'download',
					ko : '다운로드',
					state : false
				}
			],
        }
    },
    methods : {
		SlideBtn(btn){
            this.$emit('btn-click', true);
			switch(btn){
				case true:
					this.SlideOption(btn);
					break;
				case false:
					this.SlideOption(btn);
					break;
			}
		},
		SlideOption(move){
			const Images = this.StorageImages;
			const Size = Images.length - 1;
			const Current = this.ImagesActive.index;
			const Pin = (move) ? 1 : -1;

			let Next = (Current + Pin < 0) ? Size : Current + Pin;
			Next = (Next > Size) ? 0 : Next;

			const option = {
				move : move,
				next : {
					index : Next,
					ratio : this.StorageImages[Next].position.ratio
				}
			}

			this.SlideAnimate(option);
		},
		SlideAnimate(option){
			const refs = this.$refs.Preview;
			const Element = refs.querySelector('ul');
			const ElementCurrent = refs.querySelector('ul > li.active');
			const ElementNext = refs.querySelector(`ul > li:nth-child(${option.next.index + 1})`);
			Element.style.paddingBottom = `${option.next.ratio}%`;
			Element.style.transition = `.2s all`;

			if(option.move){
				ElementCurrent.classList.add('left');
				ElementNext.classList.add('next-left');
			}else{
				ElementCurrent.classList.add('right');
				ElementNext.classList.add('next-right-before');
				setTimeout(() => {
					ElementNext.classList.add('next-right');
				},10);
			};

			setTimeout(() => {
                this.$emit('slide-data', option.next);
			},200);
		},
    },
    mounted(){
        let isDown = false;
		let isAble = false;
		let Able = {
			x : false,
			y : false
		}

		let offsetDown = {
			x : 0,
			y : 0
		}

		this.$refs.Preview.addEventListener("mousedown", (e) => {
            if(e.path[0].nodeName == 'img' || e.path[0].nodeName == 'IMG'){
                isDown = true;
                isAble = false;
                const position = {
                    x : e.offsetX,
                    y : e.offsetY
                }
                offsetDown = position;

                setTimeout(() => {
                    if(isDown){
                        this.$refs.isDown.style.left = `${position.x}px`;
                        this.$refs.isDown.style.top = `${position.y}px`;
                        this.$refs.isDown.classList.add('active');

                        setTimeout(() => {
                            if(isDown){
                                isAble = true;
                                this.$refs.isDown.classList.add('nav');
                                Able.x = ((this.$refs.Preview.offsetWidth/2) < position.x) ? true : false;

                                this.$refs.Able.classList.add('active');
                                this.$refs.Able.style.left = `${position.x}px`;
                                this.$refs.Able.style.top = `${position.y}px`;

                                if(Able.x){
                                    this.$refs.Able.classList.add('x');
                                }
                            }
                        },1000)
                    }
                },500);
            }
		});

		this.$refs.Preview.addEventListener("mousemove", (e) => {
			if(isDown){
				if(!isAble){
					isDown = false;
					this.$refs.isDown.classList.remove('active');
					this.$refs.isDown.classList.remove('nav');

					this.$refs.Able.classList.remove('active');
					setTimeout(() => {
						this.$refs.Able.classList.remove('x');
						this.$refs.Able.classList.remove('y');
					},200)
				}else {
					setOfsset(e.offsetY);
				}
			}
		});

		this.$refs.Preview.addEventListener("mouseup", (e) => {
			if(isDown){
				if(isAble){
					console.log(setOfsset(e.offsetY));
				}
				isDown = false;
				isAble = false;
				this.$refs.isDown.classList.remove('active');
				this.$refs.isDown.classList.remove('nav');

				this.$refs.Able.classList.remove('active');

				this.ImagesClose.state = true;
				this.ImagesNav.forEach((item, index) => {
					this.ImagesNav[index].state = false;
				})
				setTimeout(() => {
					this.$refs.Able.classList.remove('x');
					this.$refs.Able.classList.remove('y');
				},200)
			}
		});

		const setOfsset = (yyy) => {
			if((offsetDown.y + (35 * 1)) >= yyy){
				this.ImagesClose.state = true;
				this.ImagesNav.forEach((item, index) => {
					this.ImagesNav[index].state = false;
				});

				return false;
			}else if((offsetDown.y + (35 * 1)) < yyy && (offsetDown.y + (35 * 2)) >= yyy){
				this.ImagesClose.state = false;
				this.ImagesNav.forEach((item, index) => {
					if(item.en == 'original'){
						this.ImagesNav[index].state = true;
					}else{
						this.ImagesNav[index].state = false;
					}
				});

				return 'original';
			}else if((offsetDown.y + (35 * 2)) < yyy && (offsetDown.y + (35 * 3)) >= yyy){
				this.ImagesClose.state = false;
				this.ImagesNav.forEach((item, index) => {
					if(item.en == 'sizeUp'){
						this.ImagesNav[index].state = true;
					}else{
						this.ImagesNav[index].state = false;
					}
				});

				return 'sizeUp';
			}else if((offsetDown.y + (35 * 3)) < yyy){
				this.ImagesClose.state = false;
				this.ImagesNav.forEach((item, index) => {
					if(item.en == 'download'){
						this.ImagesNav[index].state = true;
					}else{
						this.ImagesNav[index].state = false;
					}
				});

				return 'download';
			}else {
				return false;
			}
		}
    }
}
</script>

<style lang="scss" scoped>
    .list {
        & {
            margin: 0 30px;
        }

        & > ul {
            & {
                width: 100%; height: auto;
                display: block; position: relative;
                font-size: 0;
                list-style: none;
                white-space: nowrap;
                border-radius: 3px;
                overflow: hidden;
                @include no-drag();
            }

            & > .nav {
                & {
                    position: absolute;
                    left: 0; top: 0;
                    width: auto; height: auto;
                    overflow: hidden;
                    border-radius: 3px;
                    visibility: hidden;
                    @include no-drag();
                }

                & > div {
                    & {
                        white-space: nowrap;
                        @include transform(translateY(-100%));
                        @include transition(.2s all);
                    }

                    & > button {
                        & {
                            display: block;
                            width: 150px; height: 35px;
                            border: 0; background: none;
                            margin: 0; padding: 0;
                            outline: none;
                            text-align: center;
                            font-size: #{$font-size - 2};
                            color: #aaa;
                            background-color: #fff;
                            font-weight: bold;
                            @include transition(.2s all);
                        }

                        &.active {
                            & {
                                background-color: $bg-blue;
                                color: #fff;
                                @include transition(.2s all);
                            }
                        }
                    }

                    & > ul {
                        & {
                            width: auto; height: auto;
                            list-style: none;
                            font-size: 0;
                            @include no-drag();
                        }

                        & > li {
                            & {
                                display: block;
                                width: auto; height: 35px;
                            }

                            & > button {
                                & {
                                    display: block;
                                    width: 150px; height: 35px;
                                    border: 0; background: none;
                                    margin: 0; padding: 0;
                                    outline: none;
                                    text-align: center;
                                    font-size: #{$font-size - 2};
                                    color: #aaa;
                                    background-color: #fff;
                                    font-weight: bold;
                                    @include transition(.2s all);
                                }

                                &.active {
                                    & {
                                        background-color: $bg-blue;
                                        color: #fff;
                                        @include transition(.2s all);
                                    }
                                }
                            }
                        }
                    }
                }

                &.active {
                    & {
                        visibility: visible;
                    }

                    & > div {
                        & {
                            @include transform(translateY(0));
                            @include transition(.2s all);
                        }
                    }
                }

                &.x {
                    & {
                        @include transform(translateX(-100%));
                    }
                }

                &.y {
                    & {
                        @include transform(translateY(-100%));
                    }
                }
            }

            & > .isDown {
                & {
                    position: absolute;
                    left: 0; top: 0;
                    width: 70px; height: auto;
                    opacity: 0;
                    visibility: hidden;
                    @include no-drag();
                    @include transform(translate(-50%, -50%));
                    @include transition(.2s opacity);
                }

                & > div {
                    & {
                        position: relative;
                        width: 100%; height: auto;
                        padding-bottom: 100%;
                        border-radius: 50%;
                        background-color: rgba(255,255,255,0.5);
                    }

                    & > div {
                        & {
                            position: absolute;
                            width: 0px; height: auto;
                            left: 50%; top: 50%;
                            background-color: rgba(255,255,255,0.4);
                            border-radius: 50%;
                            overflow: hidden;
                            @include transform(translate(-50%, -50%));
                            @include transition(.2s all);
                        }

                        &:after {
                            & {
                                content: " ";
                                display: block;
                                padding-bottom: 100%;
                            }
                        }
                    }
                }

                &.active {
                    & {
                        visibility: visible;
                        opacity: 1;
                        @include transition(.2s opacity);
                    }

                    & > div {
                        & > div {
                            & {
                                width: 100%;
                                @include transition(1s all);
                            }
                        }
                    }

                    &.nav {
                        & {
                            visibility: hidden;
                            opacity: 0;
                            @include transition(.2s opacity);
                        }

                        & > div {
                            & > div {
                                & {
                                    width: 0%;
                                    @include transition(.2s all);
                                }
                            }
                        }
                    }
                }
            }

            & > button.move {
                & {
                    position: absolute;
                    width: 50px; height: 100%;
                    left: 0; top: 0;
                    border: none; background: none;
                    padding: 0; margin: 0;
                    background-color: rgba(0,0,0,0.3);
                    outline: none; cursor: pointer;
                    font-size: #{$font-size + 4};
                    opacity: 0;
                    @include transform(sacle(1));
                    @include transition(.2s all);
                }

                &.right {
                    & {
                        left: 100%;
                        @include transform(translateX(-100%));
                    }
                }

                & > span {
                    & {
                        position: relative; display: block;
                        width: 100%; height: 100%;
                        @include transform(scale(1));
                        @include transition(.2s all);
                    }

                    & > i {
                        & {
                            position: absolute;
                            left: 50%; top: 50%;
                            font-size: #{$font-size + 8};
                            color: #fff;
                            @include transform(translate(-50%, -50%));
                        }
                    }
                }

                &:hover {
                    & {
                        background-color: rgba(0,0,0,0.4);
                    }

                    & > span {
                        & {
                            @include transform(scale(1.2));
                            @include transition(.2s all);
                        }
                    }
                }
            }

            & > li {
                & {
                    display: block;
                    position: absolute;
                    width: 100%; height: 100%;
                    left: 100%; top: 0;
                    overflow: hidden;
                    border-radius: 5px;
                    @include no-drag();
                    @include box-shadow(5px 5px 5px rgba(0,0,0,0.1));
                }
                
                & > div.image {
                    & {
                        position: relative;
                        width: 100%; height: 100%;
                        background-color: #f9f9f9;
                        @include no-drag();
                    }

                    & > img {
                        & {
                            width: 100%; height: 100%;
                            left: 50%; top: 50%;
                            position: absolute;
                            object-fit: cover;
                            -webkit-user-drag: none;
                            @include no-drag();
                            @include transform(translate(-50%, -50%));
                        }
                    }
                }

                &.active {
                    & {
                        left: 0;
                    }
                }

                &.left {
                    & {
                        left: -100%;
                        @include transition(.2s all);
                    }
                }

                &.next-left {
                    & {
                        left: 0;
                        @include transition(.2s all);
                    }
                }

                &.right {
                    & {
                        left: 100%;
                        @include transition(.2s all);
                    }
                }

                &.next-right-before {
                    & {
                        left: -100%;
                    }
                }

                &.next-right {
                    & {
                        left: 0;
                        @include transition(.19s all);
                    }
                }
            }

            &:hover {
                & > button.move {
                    & {
                        opacity: 1;
                        @include transition(.2s all);
                    }
                }
            }
        }
    }

    .pre-list {
        & {
            width: 100%; height: auto;
            padding: 0 30px;
        }

        & > div {
            & {							
                padding: 15px 5px;
                overflow: hidden;
                background-color: $bg-black-light;
            }

            & > ul {
                & {
                    width: 100%; height: auto;
                    list-style: 0;
                    font-size: 0;
                    white-space: nowrap;
                    overflow: hidden;
                    padding: 0px 10px;
                }

                & > li {
                    & {
                        display: inline-block;
                        width: 14.3%; height: auto;
                        padding: 0 10px;
                    }

                    & > div {
                        & {
                            display: block;
                            width: 100%; height: auto;
                            position: relative;
                            border-radius: 3px;
                            overflow: hidden;
                            border: 1px solid #ddd;
                            background-color: #ddd;
                        }

                        &:after {
                            & {
                                content: " ";
                                display: block;
                                padding-bottom: 100%;
                            }
                        }

                        & > img {
                            & {
                                width: 100%; height: 100%;
                                position: absolute;
                                left: 50%; top: 50%;
                                object-fit: cover;
                                @include transform(translate(-50%, -50%));
                            }
                        }
                    }
                }
            }
        }
    }
</style>
