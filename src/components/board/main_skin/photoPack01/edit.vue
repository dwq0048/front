<template>
    <div class="post">

		<!-- Title Start -->
		<div class="send">
			<div>
				<button type="button" class="prev" title="목록으로">
					<i><font-awesome-icon :icon="faList" /></i>
					<span>목록으로</span>
				</button>
				<button type="submit" class="submit" @click="Submit()" title="넓게보기">
					<i><font-awesome-icon :icon="faBell" /></i>
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
					<h1>태그 설정</h1>
				</div>

				<hash-area
					:StorageHashs="StorageHashs"
				/>
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
					ref="SwiperSlide"
				/>
			</div>
			<!-- Set Slide END -->

			<!-- Fixed Menu -->
			<fixed-menu
				:option = "{ min : 0, max : 7340032 }"
				:StorageImages="StorageImages"
				:ImagesActive="ImagesActive"

				@update-image="UpdateImage"
				@update-image-active="UpdateImageActive"
				@resize-image="ResizeImage"

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
										<input type="checkbox" checked>
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
import HashArea from '@/components/board/variety/hash-area'

import { 
	Heading, Bold, Italic, Strike, Underline, Link,
	AlignLeft, AlignCenter, AlignRight,
	ListBullet, ListOrdered, ListItem, Blockquote, Image,
	HorizontalRule, BlankAutoLink,

	HardBreak, Search,
} from '@/components/plugin/textarea/script'
import { Placeholder } from 'tiptap-extensions'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck, faImage, faList, faEdit, faHashtag, faBell } from '@fortawesome/free-solid-svg-icons'

const sanitizeHtml = require('sanitize-html');
const postStore = 'postStore'

export default {
    name: 'DefaultPost',
    components: {
		'swipe-slide' : SwipeSlide,
		'fixed-menu' : FixedMenu,
		'hash-area' : HashArea,
		'tip-tap-menu' : tipTapMenu,
		'tip-tap-editor' : tipTapEditor,
	},
	props: ['info'],
	data() {
		return {
			// Icon
			faCheck, faImage, faList, faEdit, faHashtag, faBell,

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
		UpdateImage(option){
			this.StorageImages = option;
		},
		UpdateImageActive(option){
			this.ImagesActive = option;
		},
		ResizeImage(){
			const element = this.$refs.SwiperSlide.$refs.Preview.querySelector('ul');
			element.style.paddingbottom = `${this.ImagesActive.ratio}%`;
			element.style.transition = `.2s all`;
		},
		ImageClick(){
			this.$refs.fixMenu.TriggerInput("UploadImage");
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
							//border-left: 1px solid #ddd;
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
