<template>
    <div class="post">

		<!-- Title Start -->
		<div class="send">
			<div>
				<button type="button" class="prev" title="목록으로">
					<i><font-awesome-icon :icon="faList" /></i>
					<span>목록으로</span>
				</button>
				<button type="submit" class="submit" @click="Submit()">
					<i><font-awesome-icon :icon="faEdit" /></i>
					<span>글쓰기</span>
				</button>
			</div>
		</div>
		<!-- Title End -->

		<div class="write">

			<div class="post-thumb">
				<div class="title">
					<h1>내용</h1>
				</div>
				<div class="list">
					<div class="title">
						<div>
							<div>
								<span class="no">
									<i><font-awesome-icon :icon="faImage" /></i>
									<span>썸네일이 없어요</span>
								</span>
							</div>
						</div>
					</div>
					<div class="textarea">
						<div>
							<div>
								<!-- Editor Start -->
								<tip-tap-editor :editor="editor" />
								<!-- Editor End -->
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="post-tag">
				<div class="title">
					<h1>테그 설정</h1>
				</div>
				<div class="set-tag">
					<div></div>
				</div>
			</div>

			<div class="post-preview">
				<div class="title">
					<h1>미리보기</h1>
				</div>
				<div class="list" ref="Preview">
					<ul v-if="StorageImages.length > 0" :style="`padding-bottom:${ImagesActive.ratio}%`">
						<li v-for="(item, i) in StorageImages" :key="i" :class="{ active : i ==  ImagesActive.index }">
							<div class="image">
								<img :src="item.base">
							</div>
						</li>
						<button type="button" class="move left">
							<span>
								<i><font-awesome-icon :icon="faChevronLeft" /></i>
							</span>
						</button>
						<button type="button" class="move right">
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
				</div>
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

			<!-- 작은 메뉴 Start -->
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
										<ul class="upload">
											<li>
												<input type="file" @change="UpdateFile('UploadImage')" multiple="multiple" ref="UploadImage"/>
												<button type="button" class="none" title="사진추가" @click="TriggerInput('UploadImage')">
													<span class="image">
														<i>
															<font-awesome-icon :icon="faImage" />
															<span>사진 추가</span>
														</i>
													</span>
													<span class="plus">
														<i>
															<font-awesome-icon :icon="faPlus" />
														</i>
													</span>
												</button>
											</li>
										</ul>
										<div class="list" ref="ImageSwiper" v-swiper:ImageSwiper="ImageSwipeOption">
											<ul class="swiper-wrapper">
												<li class="swiper-slide" v-for="(item, i) in StorageImages" :key="i">
													<div>
														<img :src="item.base">
													</div>
												</li>
											</ul>
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
									</li>
								</ul>
							</div>
						</div>

				</div>
			</div>
			<!-- 작은 메뉴 End -->

			<!-- Option Start -->
			<div class="post-option">
				<div class="post-setting">
					<table>
						<tr class="category">
							<td>카테고리</td>
							<td>
								<div class="select">
									<div>
										<select name="" id="">
											<option value="default">카테고리가 없음</option>
										</select>
									</div>
								</div>
							</td>
						</tr>
						<tr class="open">
							<td>공개 설정</td>
							<td>
								<div>
									<label class="checkbox">
										<input type="checkbox">
										<div>
											<i><font-awesome-icon :icon="faCheck" /></i>
										</div>
										<span>검색 허용</span>
									</label>
								</div>

								<div>
									<label class="checkbox">
										<input type="checkbox">
										<div>
											<i><font-awesome-icon :icon="faCheck" /></i>
										</div>
										<span>글쓴이 익명</span>
									</label>
								</div
								>
								<div>
									<label class="checkbox">
										<input type="checkbox">
										<div>
											<i><font-awesome-icon :icon="faCheck" /></i>
										</div>
										<span>게시글 비공개</span>
									</label>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</div>
			<!-- Option End -->
		</div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Editor, EditorMenuBar } from 'tiptap'
import tipTapEditor from '@/components/plugin/textarea/tiptap-board/index'
import tipTapMenu from '@/components/plugin/textarea/tiptap-board/menu'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'

import { SET_SCRIPT } from '@/store/helper/index'
//import Swipe from 'swipejs'


import { 
	Heading, Bold, Italic, Strike, Underline, Link,
	AlignLeft, AlignCenter, AlignRight,
	ListBullet, ListOrdered, ListItem, Blockquote, Image,
	HorizontalRule, BlankAutoLink,

	HardBreak, Search,
} from '@/components/plugin/textarea/script'


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faFileUpload, faFile, faChevronLeft, faChevronRight, faCheck, faImage, faSmile, faVideo, faList, faEdit, faThumbtack } from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'

import { SET_BOARD } from '@/store/helper/index'

const sanitizeHtml = require('sanitize-html');
const postStore = 'postStore'

export default {
    name: 'DefaultPost',
    components: {
		Swiper,
		SwiperSlide,
		'tip-tap-menu' : tipTapMenu,
		'tip-tap-editor' : tipTapEditor,
	},
	props: ['info'],
	directives: {
		swiper: directive
	},
	data() {
		return {
			//Editor
			editor: new Editor({
    			extensions: [
					new Heading({ levels: [1, 2, 3, 4, 5, 6] }),
					new Bold(),
					new Italic(),
					new Strike(),
					new Underline(),
					new Link(),

					new AlignLeft(),
					new AlignCenter(),
					new AlignRight(),

					new ListBullet(),
					new ListOrdered(),
					new ListItem(),
					new Blockquote(),
					new Image(),

					new HorizontalRule(),
					new BlankAutoLink(),

					new HardBreak(),
					new Search(),
        		],
				content: `<h1>첫줄은 제목으로 자동 인식됩니다.</h1><p>알잘딱깔센하게 쓰세요</p>`,
				onUpdate: ({ getHTML }) => {
					this.Post.content = getHTML();
				},
			}),

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

			// Swiper
			ImageSwipeOption : {

			},
			
			// Icon
			faPlus, faFileUpload, faFile, faChevronLeft, faChevronRight,
			faCheck, faImage, faSmile, faList, faEdit, faVideo,
			faYoutube, faThumbtack,

			MenuFixed : {
                BottomMenu : false
			},
			
			TimeWaiting : {
				Bottom : true
			},

			// Storage
			StorageImages : [],
			MaxSizeImages : 7340032,
			MinSizeImages : 0,
			
			// State
			FixedMenu : false,
			ImagesActive : {
				index : false,
				ratio : 0
			},
			ImagesThumbnail : false,
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

			// Post
			Post : {
				title : '',
				content : '',
			},
		}
	},
	methods: {
		...mapActions(postStore, [
			'POST'
		]),
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
						const index = _this.StorageImages.length;
						const position = {
							width: options.w,
							height: options.h,
							ratio: (options.h / options.w) * 100
						}

						_this.StorageImages.push({
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

					// SET ACTIVE
					//ref['PreUl'].style.paddingbottom = `${_this.StorageImages[_this.ImagesActive].position.ratio}px`;
				},
			}

			try{
				Spend[type](type);
			} catch(err) {
				console.log(err);
			}
		},
		EditorActive(index){
			this.EditorMenu.map(item => {
				if (item.active == true){
					item.active = false;
				}
			})

			this.EditorMenu[index].active = true;
		},
		BytesToSize(bytes) {
			const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
			if (bytes == 0) return '0 MB';
			let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
			if (i == 0) return bytes + ' ' + sizes[i];
			return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
		},
		dataURLtoFile(dataurl, fileName) {
			var arr = dataurl.split(','),
				mime = arr[0].match(/:(.*?);/)[1],
				bstr = atob(arr[1]), 
				n = bstr.length, 
				u8arr = new Uint8Array(n);
				
			while(n--){
				u8arr[n] = bstr.charCodeAt(n);
			}
			
			return new File([u8arr], fileName, {type:mime});
		},
		SetHtml(content) {
			return sanitizeHtml(content ,{
				allowedTags: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'b', 'i', 's', 'a', 'p', 'hr', 'br', 'ul', 'ol', 'li', 'blockquote', 'img', 'iframe' ],
				allowedAttributes: {
					'a': [ 'href', 'name', 'target' ],
					'*': [ 'style' ],
					'img': [ 'data-index', 'src' ]
				},
				allowedStyles: {
					'*': {
						'text-align': [/^left$/, /^right$/, /^center$/]
					}
				},
				allowedIframeHostnames: ['www.youtube.com'],
				transformTags: {
					'img': function(tagName, attribs) {
						let imageIndex = attribs['data-index'];

						return {
							tagName: 'img',
							attribs: {
								'data-index': imageIndex
							}
						};
					}
				}
			});
		},
		Fixed() {
			this.FixedMenu = (this.FixedMenu) ? false : true
		},
		Submit() {
			const FileListItems = (files) => {
				var b = new ClipboardEvent("").clipboardData || new DataTransfer()
				for (var i = 0, len = files.length; i<len; i++) b.items.add(files[i])
				return b.files
			}

			const ContentFixed = this.SetHtml(this.Post.content);

			const ImageList = [];
			const data = {
				title : this.Post.title,
				content : ContentFixed,
				board : this.info.board,
				meta : {
					category : 'vrchat',
					setting : {
						search : true,
						anonymous : false,
						private : false,
					},
					tag : {},
				},
			}

			this.StorageImages.map(item => {
				const toFile = this.dataURLtoFile(item.base, item.name);
				ImageList.push(toFile);
			});

			const ImageRequest = new FileListItems(ImageList);

			const fs = new FormData();
			fs.append('board', data.board);
			fs.append('title', data.title);
			fs.append('content', data.content);
			fs.append('meta', data.meta);

			for(let i=0;i<ImageRequest.length;i++){
				fs.append('images', ImageRequest[i]);
			}

			this.POST(fs).then((req) => {
				console.log(req);
			}).catch((err) => {
				console.log(err);
			});
		}
	},
	mounted(){
		SET_SCRIPT.optimizedResize();

		// 슬라이드 이벤트
		// 슬라이드 엑티브
		// 슬라이드 버튼

		// 메뉴 이미지 이동
		// 메뉴 이미지 썸네일
		// 썸네일이 없어요 부분에 썸네일 등록
		// 메뉴 이미지 삭제

		// 슬라이드 스와이프
		// 메뉴 이미지 스와이프

		// 테그 스페이스바 또는 엔터 또는 또는 ,로 분류
		// 테그 JSON으로 저장

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


		// SET Scroll
        const BottomMenu = this.$refs.BottomMenu;
		const BottomMenuSub = this.$refs.BottomMenuSub;
		const WinHeight = window.innerHeight;

		const Progress = this.$refs.Progress;
		const ProgressMb = this.$refs.ProgressMb;

		const EventMenu = () => {
            const BottomElement = BottomMenu.getBoundingClientRect();
            const BottomPosition = {
                bottom: WinHeight - BottomElement.bottom,
                left: BottomElement.left
			}

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

		}

		const ProgressSet = () => {
			const ProgressMbSize = { width: ProgressMb.clientWidth };
			const Padding = 30;

			Progress.style.paddingRight = `${ProgressMbSize.width + Padding}px`;
		}

        window.addEventListener('scroll', (data) => {
			BottomMenu.style.paddingTop = `${BottomMenuSub.offsetHeight}px`;
			EventMenu();
			ProgressSet();
		});

		window.addEventListener("optimizedResize", function() {
			BottomMenu.style.paddingTop = `${BottomMenuSub.offsetHeight}px`;
			EventMenu();
			ProgressSet();
		});

		this.$refs.TitleMenu.addEventListener("click", function() {
			BottomMenu.style.paddingTop = `${BottomMenuSub.offsetHeight}px`;
			EventMenu();
			ProgressSet();
		});

		this.$refs.FixedMenu.addEventListener("click", function() {
			BottomMenu.style.paddingTop = `${BottomMenuSub.offsetHeight}px`;
			EventMenu();
			ProgressSet();
		});
		// SET Scroll END
		

		// 밑에는 꾸욱 클릭하는 이벤트
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
							//Able.y = ((this.$refs.Preview.offsetHeight/2) < position.y) ? true : false;

							this.$refs.Able.classList.add('active');
							this.$refs.Able.style.left = `${position.x}px`;
							this.$refs.Able.style.top = `${position.y}px`;

							if(Able.x){
								this.$refs.Able.classList.add('x');
							}

							//if(Able.y){
							//	this.$refs.Able.classList.add('y');
							//}
						}
					},1000)
				}
			},500);
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
	.post {
		& {
			background-color: #fff;
			border:1px solid #ccc;
			@include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
			position: relative;
		}

		& > .send {
			& {
				width: 100%;
				height: 45px;
				background-color: #fff;
				border-bottom: 1px solid #ddd;
			}

			& > div {
				& {
					width: 100%;
					height: 100%;
					position: relative;
				}

				& > button {
					& {
						border: 0;
						background: none;
						outline: none;
						font-size: #{$font-size};
						padding:0; margin: 0;
						color: #fff;
						cursor: pointer;
					}

					& > i {
						& {
							display: inline-block;
							font-size: #{$font-size - 2};
							padding-left: 7px;
						}
					}

					& > span {
						& {
							display: inline-block;
							vertical-align: middle;
							font-size: #{$font-size - 2};
						}
					}

					&.submit {
						& {
							height: 100%;
							position: absolute;
							right: 0; top: 50%;
							padding: 0 30px;
							font-weight: bold;
							color: $bg-blue;
							@include transition(.2s all);
							@include transform(translateY(-50%) scale(1));
						}

						& > i {
							& {
								display: inline-block;
								vertical-align: middle;
								font-size: #{$font-size - 2};
								padding-right: 10px;
							}
						}

						& > span {
							& {
								display: inline-block;
								vertical-align: middle;
								font-size: #{$font-size - 2};
							}
						}

						&:hover {
							& {
								color: $bg-blue-bold;
								@include transform(translateY(-50%) scale(1.1));
								@include transition(.2s all);
							}
						}
					}

					&.prev {
						& {
							width: auto; height: 100%;
							border-right: 1px solid #ddd;
							background-color: #fff;
							padding: 0 15px;
						}

						& > i {
							& {
								font-size: #{font-size + 2};
								color: #555;
								padding-left: 0;
								display: inline-block;
								vertical-align: middle;
							}
						}

						& > span {
							& {
								padding-left: 15px;
								color: #555;
								display: inline-block;
								font-size: #{$font-size - 2};
								vertical-align: middle;
							}
						}
					}
				}
			}
		}

		& > .write {

			& > .post-thumb {
				& {
					width: 100%; height: auto;
					padding: 25px;
				}

				& > .title {
					& > h1 {
						& {
							font-size: #{$font-size + 2};
							color: $font-color;
							padding-left: 10px;
							padding-bottom: 10px;
						}
					}
				}
				
				& > .list {
					& {
						width: 100%; height: auto;
						font-size: 0;
					}

					& > .title{
						& {
							width: 20%; height: auto;
							position: relative;
							display: inline-block;
						}

						&:after {
							content: " ";
							display: block;
							padding-top: 100%;
						}

						& > div {
							& {
								position: absolute;
								left: 0; top: 0;
								width: 100%; height: 100%;
								padding: 5px;
								overflow: hidden;
							}

							& > div {
								& {
									width: 100%; height: 100%;
									background-color: #f1f1f1;
									border: 2px dashed #ddd;
									border-radius: 3px;
									position: relative;
									cursor: pointer;
								}

								& > span.no {
									& {
										position: absolute;
										left: 50%; top: 50%;
										display: block;
										text-align: center;
										white-space: nowrap;
										@include transform(translate(-50%, -50%));
									}

									& > i {
										& {
											display: block;
											font-size: #{$font-size + 12};
											color: #aaa;
										}
									}

									& > span {
										& {
											display: block;
											font-size: #{$font-size - 2};
											font-weight: bold;
											color: #aaa;
										}
									}
								}
							}
						}
					}

					& > .textarea{
						& {
							width: 80%; height: auto;
							position: relative;
							display: inline-block;
						}

						&:after {
							content: " ";
							display: block;
							padding-top: 25%;
						}

						& > div {
							& {
								position: absolute;
								left: 0; top: 0;
								width: 100%; height: 100%;
								padding: 5px;
							}

							& > div {
								& {
									width: 100%; height: 100%;
									background-color: #f9f9f9;
									border-radius: 3px;
									overflow: hidden;
									border: 1px solid #ddd;
								}

								& > .editor {
									& {
										padding: 0;
										min-height: 100%;
									}

									& > .editor-content {
										& {
											min-height: 100%;
										}
									}
								}
							}
						}
					}
				}
			}

			& > .post-tag {
				& {
					width: 100%; height: auto;
					padding: 0px 30px 0 30px;
				}

				& > .title {
					& > h1 {
						& {
							font-size: #{$font-size + 2};
							color: $font-color;
							padding-left: 5px;
							padding-bottom: 10px;
						}
					}
				}

				& > .set-tag {
					& {
						width: 100%; height: auto;
					}

					& > div {
						& {
							width: 100%; height: 35px;
							background-color: #ccc;
							border-radius: 3px;
							overflow: hidden;
						}
					}
				}
			}

			& > .post-preview {
				& {
					width: 100%; height: auto;
					padding: 30px 0 30px 0;
				}

				& > .title {
					& > h1 {
						& {
							font-size: #{$font-size + 2};
							color: $font-color;
							padding-left: 35px;
							padding-bottom: 10px;
						}
					}
				}

				& > .list {
					& {
						margin: 0 30px;
						background-color: $bg-black-light;
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
								left: 0; top: 0;
								overflow: hidden;
								opacity: 0;
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
									opacity: 1;
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

				& > .pre-list {
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
			}

			& > .post-menu {
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

									& > .progress {
										& {
											width: 100%; height: auto;
											position: relative;
											padding-right: 100px;
											margin-top: 10px;
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

										& > li {
											& {
												display: block;
												position: absolute;
												width: 100%; height: 100%;
												left: 50%; top: 50%;
												@include transform(translate(-50%, -50%));
												padding: 5px;
											}

											& > input {
												& {
													display: none;
												}
											}

											& > button {
												& {
													
													display: block;
													width: 100%; height: 100%;
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
									}

									& > .list {
										& {
											display: inline-block;
											width: 100%; height: auto;
											font-size: 0;
											list-style: none;
											position: relative;
											vertical-align: top;
										}

										& > ul {
											& {
												display: inline-block;
												width: 100%; height: auto;
												font-size: 0;
												list-style: none;
												position: relative;
												vertical-align: top;
											}

											& > li {
												& {
													display: inline-block;
													width: 15%!important; height: auto;
													padding: 5px;
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

			& > .post-option {
				& {
					width: 100%; height: auto;
					padding: 30px 30px 50px 30px;
				}

				& > .post-setting {
					& {
						width: 100%;
						height: auto;
					}

					& .checkbox {
						& {
							display: block;
							cursor: pointer;
							font-size: 0;
						}

						& > input[type=checkbox] {
							& {
								display: none;
							}
						}

						& > div {
							& {
								display: inline-block;
								width: 15px;
								height: 15px;
								border: 1px solid #ccc;
								background-color: #f9f9f9;
								position: relative;
								vertical-align: middle;
								overflow: hidden;
								@include transition(.2s all);
							}

							& > i {
								& {
									position: absolute;
									left: 50%; top: 50%;
									font-size: #{$font-size - 4};
									color: #666;
									opacity: 0;
									@include transition(.2s all);
									@include transform(translate(-50%, -50%));
								}
							}
						}

						& > span {
							& {
								display: inline-block;
								font-size: #{$font-size - 1};
								color: #666;
								vertical-align: middle;
								padding-left: 7px;
							}
						}

						& > input[type=checkbox]:checked ~ div {
							& > i {
								& {
									opacity: 1;
									@include transition(.2s all);
								}
							}
						}

						&:hover {
							& > div {
								& {
									background-color: #f1f1f1;
									@include transition(.2s all);
								}
							}

							& > span {
								& {
									color: #333;
								}
							}
						}
					}

					& .select {
						& {
							width: 300px;
							height: 30px;
							font-size: #{$font-size - 2};
						}

						& > div {
							& {
								width: 100%;
								height: 100%;
								border: 1px solid #ccc;
								border-radius: 2px;
								overflow: hidden;
							}

							& > select {
								& {
									width: 100%;
									height: 100%;
									background-color: #fff;
									border:none;
									outline: none;
									padding: 5px;
									margin: 0;
									cursor: pointer;
									color: #666;
								}

								& > option {
									color: #666;
								}
							}
							
						}
					}

					& > table {
						& {
							width: 100%;
							height: auto;
						}

						& > tr {

							& > td {
								& {
									padding-bottom: 15px;
								}

								&:nth-child(1){
									width: 100px;
									vertical-align: top;
									font-size: #{$font-size + 1};
									font-weight: bold;
								}
							}

							&.open {
								& > td:nth-child(2) {
									& > div {
										& {
											display: inline-block;
											vertical-align: middle;
											padding-right: 15px;
										}

										&:nth-last-child(1){
											& {
												padding-right: 0;
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
</style>

<style lang="scss">
	.ProseMirror {
		& {
			min-height: 100%;
		}

		& h1 {
			& {
				font-weight: bold;
				padding-bottom: 20px;
				font-size: #{$font-size + 2};
			}
		}
	}

	.editor {
		& > .editor-content {
			& {
				min-height: 160px;
			}

			& > div {
				& {
					min-height: 160px!important;
				}
			}
		}
	}
</style>
