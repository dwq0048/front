<template>
    <div class="post">

		<!-- Title Start -->
		<div class="send">
			<div>
				<button type="button" class="prev" title="목록으로">
					<i><font-awesome-icon :icon="faList" /></i>
					<span>목록으로</span>
				</button>

				<setting-pop />
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
			<fixed-menu
				:Volume = "{ min : 0, max : 7340032 }"
				:StorageImages="StorageImages"
				:ImagesActive="ImagesActive"
				:ImagesThumbnail="ImagesThumbnail"

				:editor="editor"

				@update-image="UpdateImage"
				@update-image-active="UpdateImageActive"
				@update-thumbnail="UpdateThumbnail"

				ref="fixMenu"
			/>
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
										<input type="checkbox" v-model="CheckSetting.search">
										<div>
											<span></span>
										</div>
										<span>검색 허용</span>
									</label>
								</div>
								<div>
									<label class="checkbox">
										<input type="checkbox" v-model="CheckSetting.anonymous">
										<div>
											<span></span>
										</div>
										<span>글쓴이 익명</span>
									</label>
								</div>
								<div>
									<label class="checkbox">
										<input type="checkbox" v-model="CheckSetting.private">
										<div>
											<span></span>
										</div>
										<span>게시글 비공개</span>
									</label>
								</div>
							</td>
						</tr>
						<tr class="set-tag">
							<td>태그 설정</td>
							<td>
								<div>
									<hash-area
										:StorageHashs="StorageHashs"
										ref="HashArea"
									/>
								</div>
							</td>
						</tr>
					</table>
				</div>
				<div class="post-submit">
					<button type="button">
						<i><font-awesome-icon :icon="faQuestionCircle" /></i>
						<span>저장하기</span>
						<div class="help">
							<p>로컬에 저장하고,<br>현재 게시글을 자동으로 불러옵니다</p>
						</div>
					</button>

					<button type="button" @click="Submit">
						<i><font-awesome-icon :icon="faEdit" /></i>
						<span>글쓰기</span>
					</button>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import { SET_SCRIPT, SET_BOARD } from '@/store/helper/index'
import { mapActions, mapGetters } from 'vuex'

import tipTapEditor from '@/components/plugin/textarea/tiptap-board/index'
import tipTapMenu from '@/components/plugin/textarea/tiptap-board/menu'
import HashArea from '@/components/board/_variety/hash-disabled-area'
import SettingPop from '@/components/board/_variety/setting-edit'
import FixedMenu from '@/components/board/_variety/fixed-menu'

import { Editor } from 'tiptap'
import { Placeholder } from 'tiptap-extensions'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faFileUpload, faFile, faChevronLeft, faCheck, faImage, faSmile, faVideo, faList, faEdit, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'

import { 
	Heading, Bold, Italic, Strike, Underline, Link,
	AlignLeft, AlignCenter, AlignRight,
	ListBullet, ListOrdered, ListItem, Blockquote, Image,
	HorizontalRule, BlankAutoLink,

	HardBreak, Search,
} from '@/components/plugin/textarea/script'

const sanitizeHtml = require('sanitize-html');
const postStore = 'postStore'

export default {
    name: 'DefaultPost',
    components: {
		Swiper,
		SwiperSlide,
		'hash-area' : HashArea,
		'setting-pop' : SettingPop,
		'tip-tap-menu' : tipTapMenu,
		'tip-tap-editor' : tipTapEditor,
		'fixed-menu' : FixedMenu,
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
					new Placeholder({
						emptyEditorClass: 'is-editor-empty',
						emptyNodeClass: 'is-empty',
						emptyNodeText: '내용을 입력해주세요...',
						showOnlyWhenEditable: true,
						showOnlyCurrent: true,
					}),
        		],
				content: ``,
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
			faYoutube, faQuestionCircle,

			MenuFixed : {
                BottomMenu : false
            },

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
			ImagesThumbnail : undefined,
			
			CheckSetting : { search : true, anonymous : false, private : false },

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
		UpdateImage(option){
			this.StorageImages = option;
		},
		UpdateImageActive(option){
			this.ImagesActive = option;
		},
		UpdateThumbnail(option){
			this.ImagesThumbnail = option;
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
			this.StorageHashs = this.$refs.HashArea.SubStorageHashs;

			const ImageList = [];
			const data = {
				title : this.Post.title,
				content : ContentFixed,
				board : this.info.board,
				meta : {
					category : 'default',
					openSetting : this.CheckSetting,
					hash : this.StorageHashs,
				},
			}

			this.StorageImages.map(item => {
				const toFile = SET_BOARD.dataURLtoFile(item.base, item.name);
				ImageList.push(toFile);
			});

			const ImageRequest = new FileListItems(ImageList);

			const fs = new FormData();
			fs.append('board', data.board);
			fs.append('title', data.title);
			fs.append('content', data.content);
			fs.append('meta', JSON.stringify(data.meta));

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

						& > input[type=checkbox], & > input[type=radio] {
							& {
								display: none;
							}
						}

						& > div {
							& {
								display: inline-block;
								width: 16px;
								height: 16px;
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

							& > span {
								& {
									position: absolute;
									display: block;
									left: 50%; top: 50%;
									width: 9px; height: 9px;
									background-color: $bg-blue;
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
						
						input[type=radio]:checked ~ div{
							& > span {
								& {
									border-radius: 50%;
									width: 8px; height: 8px;
								}
							}
						}

						& > input[type=checkbox]:checked ~ div, input[type=radio]:checked ~ div{
							& > i {
								& {
									opacity: 1;
									@include transition(.2s all);
								}
							}

							& > span {
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
									width: 15%;
									vertical-align: top;
									font-size: #{$font-size + 1};
									font-weight: bold;
								}

								&:nth-child(2){
									width: 85%;
								}
							}

							&.open, &.view {
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

							/*
							&.set-tag {
								& > td:nth-child(2){
									& > div {
										& {
											overflow-x: scroll;
										}
									}
								}
							}
							*/

							&.view {
								& > td:nth-child(2) {
									& > div {
										& > label {
											& > div {
												& {
													border-radius: 50%;
												}
											}
										}
									}
								}
							}
						}
					}
				}

				& > .post-submit {
					& {
						width: 100%; height: auto;
						font-size: 0;
						text-align: right;
					}

					& > button {
						& {
							display: inline-block;
							position: relative;
							border: 0; background: none;
							padding: 0; margin: 0;
							padding: 10px 30px;
							border-radius: 3px;
							background-color: $bg-blue;
							cursor: pointer; outline: none;
							font-size: #{$font-size - 1};
							color: #fff;
							@include transition(.2s all);
						}

						& > i{
							& {
								display: inline-block;
								vertical-align: middle;
								padding-right: 10px;
							}
						}

						& > span {
							& {
								display: inline-block;
								vertical-align: middle;
							}
						}

						& > .help {
							& {
								display: block;
								position: absolute;
								top: 100%; left: 0;
								padding: 10px;
								border-radius: 3px;
								background-color: #555;
								color: #fff;
								opacity: 0;
								white-space: nowrap;
								text-align: left;
								visibility: hidden;
								@include transition(.2s all);
							}
						}

						&:hover {
							& {
								background-color: $bg-blue-light;
								@include transition(.2s all);
							}

							& > .help {
								& {
									opacity: 0.9;
									visibility: visible;
									@include transition(.2s all);
								}
							}
						}

						&:nth-child(1){
							& {
								background-color: #ccc;
								margin-right: 15px;
							}

							&:hover {
								& {
									background-color: #ddd;
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
	p.is-editor-empty:first-child::before {
		content: attr(data-empty-text);
		float: left;
		color: #aaa;
		pointer-events: none;
		height: 0;
	}
</style>
