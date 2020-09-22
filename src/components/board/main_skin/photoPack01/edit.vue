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
					<i><font-awesome-icon :icon="faArrowsAltH" /></i>
				</button>
			</div>
		</div>
		<!-- Title End -->

		<div class="write">

			<!-- Editor Start -->
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
								<tip-tap-editor :editor="editor" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- Editor END -->

			<!-- Set Tag -->
			<div class="post-tag">
				<div class="title">
					<h1>테그 설정</h1>
				</div>
				<div class="set-tag">
					<div>
						<div>
							<ul ref="HashList">
								<li class="first">
									<button type="button">
										<div>
											<i><font-awesome-icon :icon="faHashtag" /></i>
											<span contenteditable placeholder="입력해주세요.." ref="Hash" class="text">

											</span>
										</div>
									</button>
								</li>
								<li v-for="(item, i) in StorageHashs" :key="i" class="item" :class="{ active : StorageHashs[i].active }" @click="HashOption(i)">
									<button type="button" data-submit>
										<div>
											<i><font-awesome-icon :icon="faHashtag" /></i>
											<span class="text">{{ item.text }}</span>
										</div>
										<span class="option">
											<ul>
												<li>
													<button type="button">
														<i><font-awesome-icon :icon="faPen" /></i>
													</button>
												</li>
												<li>
													<button type="button">
														<i><font-awesome-icon :icon="faTrashAlt" /></i>
													</button>
												</li>
											</ul>
										</span>
									</button>
								</li>
							</ul>
						</div>
						<button type="button">
							<span>
								<i><font-awesome-icon :icon="faTrashAlt" /></i>
							</span>
						</button>
					</div>					
					<span class="alert" ref="HashAlert">
						<p>특수문자는 입력에서 제외됩니다.</p>
					</span>
				</div>
			</div>
			<!-- Set Tag END -->

			<!-- Set Slide -->
			<div class="post-preview">
				<div class="title">
					<h1>미리보기</h1>
				</div>

				<div class="preview-none" v-if="StorageImages.length <= 0 || !StorageImages">
					<div>
						<h1>이미지를 업로드 해주세요</h1>
						<p>이미지 가로보기 , 세로보기 등을 선택 할 수 있습니다.</p>
						<button type="button" @click="ImageClick">
							업로드
						</button>
					</div>
				</div>

				<swipe-slide 
					:StorageImages="StorageImages"
					:ImagesActive="ImagesActive"
					@slide-data="SlideData"

					v-if="StorageImages.length > 0"
				/>
			</div>
			<!-- Set Slide END -->

			<!-- Fixed Menu -->
			<fixed-menu
				:option = "{ min : 0, max : 7340032 }"
				:StorageImages="StorageImages"
				:ImagesActive="ImagesActive"

				@push-image="PushImage"
				@update-image="UpdateImage"
				@update-image-active="UpdateImageActive"

				ref="fixMenu"
			/>
			<!-- Fixed Menu -->

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
								</div>
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
import SwipeSlide from '@/components/widget/slide/swipe-slide'
import FixedMenu from '@/components/board/variety/fixed-menu'

import { 
	Heading, Bold, Italic, Strike, Underline, Link,
	AlignLeft, AlignCenter, AlignRight,
	ListBullet, ListOrdered, ListItem, Blockquote, Image,
	HorizontalRule, BlankAutoLink,

	HardBreak, Search,
} from '@/components/plugin/textarea/script'
import { Placeholder } from 'tiptap-extensions'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck, faImage, faList, faEdit, faArrowsAltH, faTrashAlt, faHashtag, faPen } from '@fortawesome/free-solid-svg-icons'

const sanitizeHtml = require('sanitize-html');
const postStore = 'postStore'

export default {
    name: 'DefaultPost',
    components: {
		'swipe-slide' : SwipeSlide,
		'fixed-menu' : FixedMenu,
		'tip-tap-menu' : tipTapMenu,
		'tip-tap-editor' : tipTapEditor,
	},
	props: ['info'],
	data() {
		return {
			// Icon
			faCheck, faImage, faList, faEdit, faArrowsAltH, faTrashAlt, faHashtag, faPen,

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
					new Placeholder({
						emptyEditorClass: 'is-editor-empty',
						emptyNodeClass: 'is-empty',
						emptyNodeText: "첫줄은 제목으로 자동 인식됩니다.\n\n내용을 입력해주세요.",
						showOnlyWhenEditable: true,
						showOnlyCurrent: true,
					}),
        		],
				content: ``,
				onUpdate: ({ getHTML }) => {
					this.Post.content = getHTML();
				},
			}),

			// Storage
			StorageImages : [],
			StorageHashs : [],
			
			// State
			ImagesActive : {
				index : false,
				prev : false,
				next : false,
				ratio : 0
			},
			ImagesThumbnail : false,

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
		SlideData(option){
			this.ImagesActive = option;
		},
		PushImage(option){
			this.StorageImages.push(option);
		},
		UpdateImage(option){
			this.StorageImages = option;
		},
		UpdateImageActive(option){
			this.ImagesActive = option;
		},
		ImageClick(){
			this.$refs.fixMenu.TriggerInput("UploadImage");
		},
		AddHashs(event){
			const hash = this.$refs.Hash;
			const object = {
				text : hash.textContent,
				active : false,
			};

			this.StorageHashs.unshift(object);
			hash.innerText = '';
		},
		HashOption(option){
			this.StorageHashs.forEach((item, index) => {
				if(index == option){
					this.StorageHashs[index].active = true
				}else{
					this.StorageHashs[index].active = false
				}
			});
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
		const _this = this;
		const hash = this.$refs.Hash;
		const HashList = this.$refs.HashList;
		hash.addEventListener('keypress', (event) => {
			if (event.which === 13 || event.which === 32) {
				event.preventDefault();

				_this.AddHashs(event);
			}

			// ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ ] \ ^ _ ` { } | ~
			if (
				(event.which >= 33 && event.which <= 47) ||
				(event.which >= 58 && event.which <= 64) ||
				(event.which >= 91 && event.which <= 94) ||
				(event.which === 96) ||
				(event.which >= 123 && event.which <= 126)
			) {
				event.preventDefault();

				_this.$refs.HashAlert.classList.add("active");
				setTimeout(() => {
					_this.$refs.HashAlert.classList.remove("active");
				},1500);
			}
		});

		window.addEventListener('click', (event) => {
			const element = document.activeElement;
			const HashBtn = HashList.querySelectorAll('.item > button');
			let none = false;

			HashBtn.forEach((item, index) => {
				if(element == item){ none = true }
			});

			if(!none){ _this.HashOption(-1) }
		})
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
							width: 44px; height: 44px;
							position: absolute;
							right: 0; top: 50%;
							padding: 0 15px;
							font-weight: bold;
							color: #999;
							border-left: 1px solid #ddd;
							@include transition(.2s all);
							@include transform(translateY(-50%) scale(1));
						}

						& > i {
							& {
								position: absolute;
								left: 50%; top: 50%;
								display: inline-block;
								vertical-align: middle;
								font-size: #{$font-size - 2};
								padding-right: 10px;
								@include transform(translate(-50%, -50%));
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
								color: #777;
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
						position: relative;
					}

					& > div {
						& {
							width: 100%; height: 35px;
							padding-right: 35px;
							background-color: #f9f9f9;
							border: 1px solid #ddd;
							border-radius: 3px;
							overflow: hidden;
							position: relative;
						}

						& > div {
							& {
								width: 100%; height: 100%;
								overflow-x: scroll;
							}

							&::-webkit-scrollbar {
								display: none;
							}

							& > ul {
								& {
									font-size: 0;
									width: 100%; height: 100%;
									list-style: none;
									white-space: nowrap;
								}

								& > li {
									& {
										display: inline-block;
										width: auto; height: 100%;
										padding: 5px;
										border-radius: 3px;
										position: relative;
										@include transition(.2s all);
									}

									& > button {
										& {
											width: auto; height: 100%;
											border: 0; background: none;
											margin: 0; padding: 0;
											outline: none;
											text-align: left;
											cursor: move;
										}

										& > div {
											& {
												width: auto; height: 100%;
												background-color: $bg-blue;
												border-radius: 3px;
												display: table;
												padding-right: 5px;
												cursor: pointer;
												opacity: 0.85;
												position: relative;
												z-index:1;
												@include transition(.2s all);
											}

											& > input[type=text] {
												& {
													display: none;
												}
											}

											& > i {
												& {
													display: table-cell;
													vertical-align: middle;
													font-size: #{$font-size - 2};
													padding: 0 5px;
													color: #fff;
												}
											}

											& > span.text {
												& {
													display: table-cell;
													vertical-align: middle;
													font-size: #{$font-size - 1};
													color: #fff;
													outline: none;
													padding-right: 5px;
													letter-spacing: 1px;
													font-weight: 300;
													@include transition(.2s all);
												}
											}

											& > span[contenteditable=true]:empty:before{
												content: attr(placeholder);
												display: table-cell;
												@include transition(.2s all);
											}

										}
										&:hover {
											& {
												opacity: 1;
												@include transition(.2s all);
											}
										}
									}

									& > button > span.option {
										& {
											width: auto; height:23px;
											top: 50%; right: 0;
											position: absolute;
											opacity: 0;
											visibility: hidden;
											border-radius: 3px;
											background-color: #555;
											padding-left: 15px;
											margin-left: -15px;
											@include transform(translateY(-50%));
										}

										& > ul {
											& {
												width: auto; height: 100%;
												font-size: 0;
												list-style: none;
												white-space: nowrap;
											}

											& > li {
												& {
													vertical-align: top;
													display: inline-block;
													width: 23px; height: 100%;
												}

												& > button {
													& {
														display: block;
														width: 100%; height: 100%;
														position: relative;
														border: 0; background: none;
														margin: 0; padding: 0;
														cursor: pointer; outline: none;
													}

													& > i {
														& {
															position: absolute;
															left: 50%; top: 50%;
															font-size: #{$font-size - 1};
															color: #ccc;
															@include transform(translate(-50%, -50%));
														}
													}
												}
											}
										}
									}

									&.first {
										& > button {
											& {
												cursor: text;
											}

											& > div {
												& {
													background-color: #ccc;
													opacity: 1;
													cursor: text;
												}

												& > i {
													& {
														color: #999;
													}
												}

												& > span {
													& {
														min-width: 50px;
														color: #999;
														font-weight: bold;
														font-size: #{$font-size - 2};
													}
												}
											}
										}
									}

									&.item.active {
										& {
											padding-right: 51px;
											background-color: #555;
											@include transition(.2s all);
											cursor: move;
										}

										& > button {
											& {
												cursor: move;
											}
										}

										& > button > div {
											& {
												opacity: 1;
												
											}
										}

										& > button > span.option {
											& {
												visibility: visible;
												opacity: 1;
												right: 0;
												color: #fff;
												@include transition(.2s all);
											}
										}
									}
								}
							}
						}
						
						& > button {
							& {
								position: absolute;
								right: 0; bottom: 0;
								border: 0; background: none;
								margin: 0; padding: 0;
								cursor: pointer; outline: none;
								width: 35px; height: auto;
							}

							& > span {
								& {
									width: 100%; height: auto;
									position: relative;
									display: block;
									padding-bottom: 100%;
								}

								& > i {
									& {
										position: absolute;
										left: 50%; top: 50%;
										font-size: #{$font-size};
										color: #aaa;
										@include transform(translate(-50%, -50%));
									}
								}
							}
						}
					}

					& > span.alert {
						& {
							display: block;
							position: absolute;
							left: 0; top: 100%;
							background-color: #999;
							font-size: #{$font-size - 2};
							color: #fff;
							padding: 5px 10px;
							border-radius: 0px 30px 30px 10px;
							margin-top: 5px;
							margin-left: 20px;
							visibility: hidden;
							opacity: 0;
							@include transition(.2s all);
						}

						&:after {
							& {
                                content: " ";
                                display: block;
                                position: absolute;
                                left: 0;
                                bottom: 100%;
                                width: 0px;
                                height: 0px;
                                border-top: 8px solid transparent;
                                border-bottom: 8px solid #999;
                                border-left: 8px solid transparent;
								border-right: 8px solid transparent;
							}
						}

						&.active {
							& {
								opacity: 1;
								visibility: visible;
								@include transition(.2s all);
							}
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

				& > .preview-none {
					& {
						width: 100%; height: auto;
						padding: 0 30px;
						text-align: center;
					}

					& > div {
						& {
							width: 100%; height: auto;
							padding: 30px;
							background-color: #f1f1f1;
							border-radius: 3px;
						}

						& > h1 {
							& {
								color: #555;
								font-size: #{$font-size + 6};
								padding-bottom: 5px;
							}
						}

						& > p {
							& {
								color: #777;
								font-size: #{$font-size};
								padding-bottom: 30px;
							}
						}

						& > button {
							& {
								display: inline-block;
								border: 0; background: none;
								margin: 0; padding: 0;
								background-color: $bg-orange;
								padding: 10px 60px;
								border-radius: 3px;
								font-size: #{$font-size};
								color: #fff;
								cursor: pointer; outline: none;
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

	p.is-editor-empty:first-child::before {
		content: attr(data-empty-text);
		float: left;
		color: #aaa;
		pointer-events: none;
		height: 0;
	}
</style>
