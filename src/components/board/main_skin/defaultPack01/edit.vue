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

		<!-- Editor Menu Start -->
		<tip-tap-menu :editor="editor" />
		<!-- Editor Menu ENd -->

		<div class="write">
			<div class="post-head">
				<div class="post-title">
					<input type="text" v-model="Post.title" placeholder="제목을 입력해주세요">
				</div>
			</div>

			<!-- Editor Start -->
			<tip-tap-editor :editor="editor" />
			<!-- Editor End -->

			<!-- 작은 메뉴 Start -->
			<div class="post-menu" :class="{ active : MenuFixed.BottomMenu }" ref="BottomMenu">
				<div ref="BottomMenuSub">
					<button type="button" title="크게보기">
						<i><font-awesome-icon :icon="faPlus" /></i>
					</button>

					<EditorMenuBar :editor="editor" v-slot="{ commands }">
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
										<input type="file" @change="UpdateFile('UploadImage', commands.image)" multiple="multiple" ref="UploadImage"/>
										<div class="list" ref="ImageSwiper" v-swiper:ImageSwiper="ImageSwipeOption">
											<ul class="swiper-wrapper">
												<li class="btn">
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
					</EditorMenuBar>
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
						<tr class="tag">
							<td>테그 설정</td>
							<td><input type="text"></td>
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
import { faPlus, faFileUpload, faFile, faChevronLeft, faCheck, faImage, faSmile, faVideo, faList, faEdit } from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'

import { SET_BOARD } from '@/store/helper/index'

const sanitizeHtml = require('sanitize-html');
const postStore = 'postStore'

export default {
    name: 'DefaultPost',
    components: {
		Swiper,
		SwiperSlide,
		EditorMenuBar,
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
				content: `<h1>타이틀 1</h1><h2>타이틀2</h2><p><strong><s>여러가지 스타일</s></strong></p><p></p><p></p><p style="text-align:center"></p><p>중간</p><p></p><p></p><p style="text-align:right"></p><p>오른쪽</p><p></p><p></p><p></p><ul><li><p>리스트 1</p></li><li><p>리스트 2</p></li></ul><ol><li><p>숫자 1</p></li><li><p>숫자 2</p></li></ol><p></p><blockquote><p>인용<strong>띠용</strong></p></blockquote><p></p><p>밑에 줄</p><hr /><p></p><h3>링크</h3><p></p><p><a href="http://naver.com" target="_blank">http://naver.com</a></p><p><a href="http://youtube.com" target="_blank">이것도 링크 유투브</a></p><p></p><p></p>`,
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
			faPlus, faFileUpload, faFile, faChevronLeft,
			faCheck, faImage, faSmile, faList, faEdit, faVideo,
			faYoutube,

			MenuFixed : {
                BottomMenu : false
            },

			// Storage
			StorageImages : [],
			MaxSizeImages : 7340032,
			MinSizeImages : 0,

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
		UpdateFile(type, command){
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
						const index = _this.StorageImages.length;

						_this.StorageImages.push({
							base : src,
							type : item.type,
							size : item.size,
							name : item.name,
						});

						command({ src, index });
					}

					_this.MinSizeImages = 0;
					_this.StorageImages.forEach(item => {
						_this.MinSizeImages += item.size
					});

					const CurrentSize = (Number(_this.MinSizeImages) / Number(_this.MaxSizeImages) * 100).toFixed(4);
					ref['SizeImages'].style.width = `${CurrentSize}%`;
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


			if(BottomPosition.bottom <= 0){
                this.MenuFixed.BottomMenu = true;
                BottomMenuSub.style.left = `${BottomPosition.left}px`;
                BottomMenu.style.paddingTop = `${BottomMenuSub.offsetHeight}px`;
            }else{
				this.MenuFixed.BottomMenu = false;
                BottomMenuSub.style.left = ``;
                BottomMenu.style.paddingTop = ``;
			}
		}

		const ProgressSet = () => {
			const ProgressMbSize = { width: ProgressMb.clientWidth };
			const Padding = 30;

			Progress.style.paddingRight = `${ProgressMbSize.width + Padding}px`;
		}

        window.addEventListener('scroll', (data) => {
			EventMenu();
			ProgressSet();
		});

		window.addEventListener("optimizedResize", function() {
			EventMenu();
			ProgressSet();
		});

		this.$refs.TitleMenu.addEventListener("click", function() {
			EventMenu();
			ProgressSet();
		});

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

			& > .post-head {
				& {
					padding: 30px 30px 0 30px;
				}

				& > .post-title {
					& {
						width: 100%;
						height: 45px;
						border-bottom: 1px solid #ddd;
						overflow: hidden;
					}

					& > input {
						width: 100%;
						height: 100%;
						background-color: #fff;
						border: none;
						outline: none;
						padding: 0;
						margin: 0;
						padding: 0 15px;
						font-size: #{$font-size + 2};
					}

					& > input::placeholder {
						& {
							color: #999;
						}
					}
				}
			}

			& > .post-menu {
				& {
					width: 100%; height: auto;
					position: relative;
					z-index: 10;
				}

				& > div {
					& {
						border: 1px solid #ddd;
						border-left: 0;
						border-right: 0;
						position: relative;
						background-color: #fff;
					}

					& > button {
						& {
							position: absolute;
							right: 0; top: 0;
							width: auto; height: auto;
							border: 0;
							background: none;
							outline: none;
							color: #999;
							$font-size: #{$font-size + 8};
							padding: 15px 30px;
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

								& > li.btn {
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
