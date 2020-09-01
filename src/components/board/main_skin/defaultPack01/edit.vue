<template>
    <div class="post">

		<!-- Title Start -->
		<div class="send">
			<div>
				<button type="button" class="prev" title="목록으로">
					<i><font-awesome-icon :icon="faList" /></i>
					<span>목록으로</span>
				</button>
				<button type="button" class="submit">
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
					<input type="text" placeholder="제목을 입력해주세요" v-model="postTitle">
				</div>
			</div>

			<!-- Editor Start -->
			<tip-tap-editor :editor="editor" />
			<!-- Editor End -->

			<!-- 작은 메뉴 Start -->
			<div class="post-menu">
				<button type="button" title="크게보기">
					<i><font-awesome-icon :icon="faPlus" /></i>
				</button>
				<div class="title">
					<ul>
						<li>
							<button type="button" title="사진">
								<i><font-awesome-icon :icon="faImage" /></i>
							</button>
						</li>
						<li>
							<button type="button" title="동영상">
								<i><font-awesome-icon :icon="faVideo" /></i>
							</button>
						</li>
						<li>
							<button type="button" title="유튜브">
								<i><font-awesome-icon :icon="faYoutube" /></i>
							</button>
						</li>
						<li>
							<button type="button" title="이모티콘">
								<i><font-awesome-icon :icon="faSmile" /></i>
							</button>
						</li>
						<li>
							<button type="button" title="이모티콘">
								<i><font-awesome-icon :icon="faFileUpload" /></i>
							</button>
						</li>
					</ul>
				</div>
				<div class="list">
					<ul>
						<li></li>
					</ul>
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
import { Editor } from 'tiptap'
import tipTapEditor from '@/components/plugin/textarea/tiptap-board/index'
import tipTapMenu from '@/components/plugin/textarea/tiptap-board/menu'

import { Blockquote, CodeBlock, HardBreak, Heading, OrderedList, BulletList, ListItem, TodoItem, TodoList, Bold, Code, Italic, Link, Strike, Underline, History, Image } from 'tiptap-extensions'
import AlignLeft from '@/components/plugin/textarea/tiptap/AlignLeft'
import AlignRight from '@/components/plugin/textarea/tiptap/AlignRight'
import AlignCenter from '@/components/plugin/textarea/tiptap/AlignCenter'
import LineBreak from '@/components/plugin/textarea/tiptap/LineBreak'
import CheckItem from '@/components/plugin/textarea/tiptap/CheckItem'
import CheckList from '@/components/plugin/textarea/tiptap/CheckList'
import HyperLink from '@/components/plugin/textarea/tiptap/HyperLink'
import Images from '@/components/plugin/textarea/tiptap/Images'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faFileUpload, faFile, faChevronLeft, faCheck, faImage, faSmile, faVideo, faList, faEdit } from '@fortawesome/free-solid-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'

const sanitizeHtml = require('sanitize-html');

export default {
    name: 'DefaultPost',
    components: {
		'tip-tap-menu' : tipTapMenu,
		'tip-tap-editor' : tipTapEditor
	},
	data() {
		return {
			editor: new Editor({
    			extensions: [
					new Heading({ levels: [1, 2, 3, 4, 5, 6] }),
					new Bold(),
					new Italic(),
					new Strike(),
					new Blockquote(),
					new CodeBlock(),
					new HardBreak(),
					new BulletList(),
					new OrderedList(),
					new ListItem(),
					new TodoItem(),
					new TodoList(),
					new Code(),
					new Link(),
					new Underline(),
					new History(),
					new AlignLeft(),
					new AlignRight(),
					new AlignCenter(),
					new LineBreak(),
					new CheckItem(),
					new CheckList(),
					new HyperLink(),
					new Images()
        		],
				content: ``,
				onUpdate: ({ getHTML }) => {
					this.postData = getHTML();
				},
			}),
			
			faPlus, faFileUpload, faFile, faChevronLeft, faCheck, faImage, faSmile, faYoutube, faVideo, faList, faEdit,
			fileBox: [],
			postTitle: '',
			postPosition: 'notice',
			postPositionOptions: [
				{ text : '공지사항', value : 'notice' },
				{ text : '자유게시판', value : 'free' }
			]
		}
	},
	methods: {
		file: function(){
			const elem = this.$refs.fileSelect;

			elem.click();
		},
		fileTemp: function(name, file){
			for(let i=0;i<file.length;i++){
				this.fileBox.push(file[i]);
			}

			this.temp();
		},
		submit: function(){
			const data = {
				position: this.postPosition,
				title: this.postTitle,
				post: this.$refs.edit.postData
			}

			data.post = sanitizeHtml(data.post ,{
				allowedTags : false , 
				allowedAttributes : false ,
				transformTags: {
					'img': function(tagName, attribs) {
						return {
							tagName: 'img',
							attribs: {
								'src': '',
								'data-index': attribs['data-index']
							}
						};
					}
				}
			});

			let imageStorage = this.$refs.edit.imageStorage;
			for(let i=0;i<imageStorage.length;i++){
				delete imageStorage[i].base64;
			}

			const fs = new FormData();
			fs.append('position', data.position);
			fs.append('title', data.title);
			fs.append('post', data.post);
			//fs.append('meta', {});
			for(let i=0;i<imageStorage.length;i++){
				fs.append('images', imageStorage[i]);
			}

			this.$axios({
				method: 'post',
				url: `/api/1/board/post`,
				data: fs,
				headers: {'Content-Type': 'multipart/form-data'},
				withCredentials: true
			})
			.then((req) => {
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
					border: 1px solid #ddd;
					border-left: 0;
					border-right: 0;
					position: relative;
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

				& > .title {
					& {
						width: 100%;
						height: auto;
						padding: 0 15px;
					}

					& > ul {
						& {
							width: auto; height: auto;
							list-style: none;
							font-size: 0;
						}

						& > li {
							& {
								display: inline-block;
							}

							& > button {
								& {
									display: block;
									margin: 0; padding: 0;
									border: 0;
									background: none;
									font-size: #{$font-size + 8};
									padding: 10px 15px;
									color: #999;
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
						}
					}
				}

				& > .list {
					& {
						display: none;
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
