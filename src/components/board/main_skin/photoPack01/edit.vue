<template>
    <div class="post">
		<input type="file" ref="UploadImage" multiple @change="UpdateImage($event.target.name, $event.target.files)">
    	<div class="post-title">
			<div class="title">
				<h1>내용</h1>
				<button type="button" title="사진 추가" @click="tempImage">
					<i><font-awesome-icon :icon="faPlus" /></i>
				</button>
			</div>

			<div class="thumbnail" v-if="!thumbnail" title="이미지 업로드">
				<div>
					<i class="img"><font-awesome-icon :icon="faImage" /></i>
					<i class="upload"><font-awesome-icon :icon="faFileUpload" /></i>
					<div>
						<p>이미지<br>업로드</p>
					</div>
				</div>
			</div>

			<div class="thumbnail active" v-if="thumbnail">
				<div>
					<img :src="imageStorage[thumbnail.num].base" />
				</div>
			</div>

			<div class="textarea">
				<div>
					<textarea placeholder="내용을 입력해 주세요...."></textarea>
				</div>
			</div>
		</div>

		<div class="post-photo">
			<div class="title">
				<h1>사진 수정</h1>
				<button type="button" title="사진 추가" @click="tempImage">
					<i><font-awesome-icon :icon="faPlus" /></i>
				</button>
			</div>
			<div class="setting">
				<button type="button">
					<i><font-awesome-icon :icon="faTrashAlt" /></i>
					<span>선택 삭제</span>
				</button>
				<button type="button">
					<i><font-awesome-icon :icon="faExclamationCircle" /></i>
					<span>선택 해제</span>
				</button>
				<button type="button">
					<i><font-awesome-icon :icon="faCheckCircle" /></i>
					<span>모두 선택</span>
				</button>
			</div>
			<div class="list">
				<ul>
					<li v-for="(item, i) in imageStorage" :key="i">
						<div>
							<div>
								<img :src="item.base" />
								<div class="bg"></div>
								<div class="setting">
									<button type="button" title="이미지 사이즈 변경">
										<span><i><font-awesome-icon :icon="faCropAlt" /></i></span>
									</button>
									<button type="button" title="대표 이미지 선택">
										<span><i><font-awesome-icon :icon="faCrown" /></i></span>
									</button>
									<button type="button" title="순서 변경">
										<span><i><font-awesome-icon :icon="faArrowsAlt" /></i></span>
									</button>
								</div>
								<label class="check">
									<input type="checkbox">
									<div>
										<i><font-awesome-icon :icon="faCheck" /></i>
									</div>
								</label>
							</div>
						</div>
					</li>
					<li class="active" @click="tempImage">
						<div title="사진 추가">
							<div>
								<i><font-awesome-icon :icon="faImages" /></i>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<div class="post-setting">
			<div v-for="(title, i) in setting" :key="i">
				<div class="title">
					<h1>{{ title.display }}</h1>
				</div>
				<ul>
					<li v-for="(item, i) in title.child" :key="i">
						<div>
							<label>
								<input type="checkbox" v-model="item.value">
								<div class="setting">
									<p>{{ item.display }}</p>
								</div>
								<div>
									<div>
										<span></span>
										<div>
											<div></div>
										</div>
										<span></span>
									</div>
								</div>
							</label>
							<div class="child tag" v-if="item.value">
								<div>
									<label>
										<div contenteditable>
											<div v-for="(tags, i) in item.array" :key="i">
												<p><span>#</span>{{ tags.name }}</p>
											</div>
											<!--
											<div v-on:keydown.32.capture="displayTag(item.name)" ref="listag" class="active">
												<p><span>#</span><i contenteditable></i></p>
											</div>
											-->
										</div>
									</label>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faImage, faImages, faFileUpload, faPlus, faCropAlt, faCheck, faCrown, faCheckCircle, faExclamationCircle, faTrashAlt, faArrowsAlt } from '@fortawesome/free-solid-svg-icons'

import { SET_BOARD, SET_SCRIPT } from '@/store/helper'

const sanitizeHtml = require('sanitize-html');

export default {
    name: 'DefaultPost',
    components: {
		FontAwesomeIcon
	},
	data() {
		return {
			faImage, faPlus, faImages, faFileUpload, faCropAlt, faCheck, faCrown, faCheckCircle, faExclamationCircle, faTrashAlt, faArrowsAlt,

			imageStorage: [],
			baseStorage: [],
			thumbnail: false,

			setting : [
				{
					name: 'detail',
					display: '세부 설정',
					child: [
						{
							name: 'PrivateUser',
							display: '작성자 비공개',
							value: false
						},
						{
							name: 'PrivateComment',
							display: '댓글 비공개',
							value: false
						},
						{
							name: 'PrivatePost',
							display: '게시글 비공개',
							value: false
						},
					]
				}
			]
		}
	},
	methods: {
		displayTag(payload){
			this.setting[0].child.map((item) => {
				if(item.name == payload){
					const object = {
						name: event.target.innerText
					}

					item.array.push(object);
				}
			});

			event.target.innerText = '';
		},
		tempImage(){
			const elem = this.$refs.UploadImage;
			elem.click();
		},
		UpdateImage(name, file){
			for(let i=0;i<file.length;i++){
				this.SETBASE(file[i]);
			}
		},
		async SETBASE(payload){
			return await SET_BOARD.encodeBase64ImageFile(payload).then((req) => {
				if(this.thumbnail == false){ this.thumbnail = { num : 0 }; }
				payload.base = req;
				this.imageStorage.push(payload);	
			});

		},
	},
	mounted() {
		/*
		const tag = this.$refs.listag[0];
		tag.addEventListener('focusin', () => {
			console.log('in')
			SET_SCRIPT.addClass({ el: tag, class: 'focused' })
		});
		
		tag.addEventListener('focusout', () => {
			console.log('out');
			SET_SCRIPT.removeClass({ el: tag, class: 'focused' })
		});
		*/
	}
}
</script>

<style lang="scss" scoped>
	input[type=file] {
		display: none;
	}

	.post {
		& {
			background-color: #fff;
			border:1px solid #ccc;
			@include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
			padding: 30px;
		}

		& > .post-title {
			& {
				width: 100%;
				height: auto;
			}

			&:after {
				content: " ";
				display: block;
				clear: both;
			}

			& > div {

				&.title {
					& > h1 {
						font-size: #{$font-size + 4};
						color: #555;
						font-weight: bold;
						padding-bottom: 15px;
						display: inline-block;
					}

					& > button {
						& {
							font-size: #{$font-size + 2};
							border: none;
							background: none;
							outline: none;
							float: right;
							color: #ccc;
							cursor: pointer;
							padding: 10px 15px;
						}
					}
				}

				&.thumbnail {
					& {
						width: 20%;
						height: auto;
						cursor: pointer;
						float: left;
					}

					& > div {
						& {
							width: 100%;
							position: relative;
							overflow: hidden;
							background-color: #f1f1f1;
							border: 2px solid #ccc;
							border-style: dashed;
							@include transition(.2s all);
						}

						&:after {
							content: " ";
							display: block;
							padding-bottom: 100%;
						}

						& > i {
							position: absolute;
							left: 50%; top: 50%;
							font-size: #{$font-size + 15};
							color: #ccc;
							opacity: 1;
							@include transform(translate(-50%, -50%));
							@include transition(.2s all);
						}

						& > i.upload {
							opacity: 0;
						}

						& > img {
							height: 100%;
							position: absolute;
							left: 50%; top: 50%;
							@include transform(translate(-50%, -50%));
						}

						& > div {
							& {
								width: 100%; height: 100%;
								position: absolute;
								left: 50%; top: 50%;
								background-color: rgba(0,0,0,0.5);
								opacity: 0;
								@include transition(.2s all);
								@include transform(translate(-50%, -50%));
							}

							& > p {
								& {
									position: absolute;
									left: 50%; top: 50%;
									font-size: #{$font-size + 2};
									color: #f1f1f1;
									font-weight: bold;
									@include transform(translate(-50%, -50%));
								}
								
							}
						}
					}

					&.active {
						& > div {
							& {
								border: 1px solid #ddd;
								border-radius: 3px;
							}
						}
					}

					&:hover {
						& > div {
							& {
								border: 2px solid $bg-orange;
								border-style: dashed;
								@include transition(.2s all);
							}

							& > i {
								& {
									@include transition(.2s all);
								}

								&.img {
									opacity: 0;
								}

								&.upload {
									color: $bg-orange;
									opacity: 1;
								}
							}

							& > div {
								opacity: 0;
								display: none;
								@include transition(.2s all);
							}
						}
					}

				}
				
				&.textarea {
					& {
						width: 80%;
						height: auto;
						float: left;
					}

					& > div {
						& {
							width: 100%;
							background-color: #f5f5f5;
							position: relative;
							overflow: hidden;
						}

						&:after {
							content: " ";
							display: block;
							padding-bottom: 25%;
						}

						& > textarea {
							position: absolute;
							width: 100%;
							height: 100%;
							background: none;
							border: none;
							display: block;
							outline: none;
							left: 0; top: 0;
							resize: none;
							padding: 15px;
							font-size: #{$font-size};
						}
					}
				}
			}
		}

		& > .post-photo {
			& {
				width: 100%;
				margin-top: 30px;
			}

			& > .title {
				& > h1 {
					font-size: #{$font-size + 4};
					color: #555;
					font-weight: bold;
					padding-bottom: 15px;
					display: inline-block;
				}

				& > button {
					& {
						font-size: #{$font-size + 2};
						border: none;
						background: none;
						outline: none;
						float: right;
						color: #ccc;
						cursor: pointer;
						padding: 10px 15px;
					}
				}
			}

			& > .setting {
				& {
					width: 100%;
					padding-bottom: 15px;
				}

				&:after {
					content: " ";
					display: block;
					clear: both;
				}

				& > button {
					& {
						float: right;
						border: 0;
						background: none;
						outline: none;
						font-size: #{$font-size};
						font-weight: bold;
						color: #999;
						cursor: pointer;
						@include transition(.2s all);
					}

					& > i {
						& {
							vertical-align: middle;
						}
					}

					& > span {
						& {
							padding-left: 7px;
							vertical-align: middle;
							font-size: #{$font-size - 2};
						}
					}

					&:hover {
						& {
							color: #555;
							@include transition(.2s all);
						}
					}
				}
			}

			& > .list {

				& > ul {
					& {
						width: 100%;
						font-size: 0;
						text-decoration: none;
						margin-left: -15px;
					}

					& > li {
						& {
							width: 20%;
							height: auto;
							display: inline-block;
							padding-left: 15px;
							padding-bottom: 15px;
						}

						& > div {
							& {
								width: 100%;
								height: auto;
								background-color: #ddd;
								border-radius: 3px;
							}

							& > div:nth-child(1) {
								& {
									width: 100%;
									height: auto;
									position: relative;
									background-color: #f1f1f1;
									overflow: hidden;
									border: 1px solid #ddd;
									border-radius: 3px;
								}

								&:after {
									content: " ";
									display: block;
									padding-bottom: 100%;
								}

								& > i {
									position: absolute;
									left: 50%; top: 50%;
									@include transform(translate(-50%, -50%));
									font-size: #{$font-size + 20};
									color: #ccc;
								}

								& > img {
									height: 100%;
									position: absolute;
									left: 50%; top: 50%;
									@include transform(translate(-50%, -50%));
									object-fit: cover;
								}

								& > div.bg {
									& {
										position: absolute;
										left: 50%; top: 50%;
										width: 100%; height: 100%;
										background-color: rgba(0,0,0,0.5);
										z-index: 1;
										opacity: 0;
										@include transform(translate(-50%, -50%));
										@include transition(.2s all);
									}
								}

								& > div.setting {
									& {
										position: absolute;
										width: 100%; height: auto;
										padding: 5px;
										left: 0; bottom: 0;
										z-index: 3;
										background-color: rgba(0,0,0,0.3);
									}

									&:after {
										content: " ";
										display: block;
										clear: both;
									}

									& > button {
										& {
											border: 0;
											padding: 3px 10px;
											background: none;
											outline: none;
											cursor: pointer;
											float: right;
										}

										& > span {
											& {
												position: relative;
												display: inline-block;
												color: #fff;
											}

											& > i {
												display: inline-block;
												@include transform(scale(1));
												@include transition(.2s all);
											}
										}

										&:hover {
											& > span > i {
												@include transform(scale(1.1));
												@include transition(.2s all);
											}
										}
									}
								}

								& > label {
									& {
										display: block;
										cursor: pointer;
										width: 100%; height: 100%;
										position: absolute;
										left: 50%; top: 50%;
										z-index: 2;
										@include transform(translate(-50%, -50%));
									}

									&:after {
										content: " ";
										display: block;
										clear: both;
									}

									& > input[type=checkbox] {
										display: none;
									}

									& > div {
										& {
											background: none;
											border: none;
											outline: none;
											width: 23px;
											height: 23px;
											background-color: #f9f9f9;
											border: 2px solid #ddd;
											border-radius: 50%;
											float: right;
											margin-right: 10px;
											margin-top: 10px;
											position: relative;
											@include box-shadow(3px 3px 3px rgba(0,0,0,0.1));
											@include transition(.2s all);
										}

										& > i {
											& {
												position: absolute;
												font-size: #{$font-size};
												color: #f1f1f1;
												left: 50%; top: 50%;
												@include transform(translate(-50%, -50%));
											}
										}
									}

									& > input[type=checkbox]:checked + div {
										border: 1px solid $bg-orange!important;
										@include transition(.2s all);
									}

									& > input[type=checkbox]:checked + div > i {
										color: $bg-orange!important;
										@include transition(.2s all);
									}
								
								}

								&:hover{
									& > div {
										&.bg {
											& {
												opacity: 1;
												@include transition(.2s all);
											}
										}

										&.setting {
											& {
												background-color: #333;
												@include transition(.2s all);
											}
										}
									}

									& > label {
										& > div {
											& {
												background-color: #fff;
												@include transition(.2s all);
											}
											
											& > i {
												& {
													color: #ccc;
													@include transition(.2s all);
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
									cursor: pointer;
									border: 2px solid #ccc;
									border-style: dashed;
								}
							}
						}

					}
				}
			}
		}

		& > .post-setting {
			& {
				width: 100%;
				margin-top: 30px;
			}

			& > div {

				& > .title {
					& {
						padding-top: 30px;
						padding-bottom: 15px;
					}

					& > h1 {
						& {
							font-size: #{$font-size + 4};
							color: #555;
							font-weight: bold;
						}
					}
				}

				&:nth-child(1) > .title {
					& {
						padding-top: 0;
					}
				}

				& > ul {
					& {
						font-size: 0;
						width: 100%;
					}

					& > li {
						& {
							display: block;
							width: 100%;
							border-bottom: 1px solid #f1f1f1;
						}

						&:nth-last-child(1) {
							border: none;
						}

						& > div {
							& > label {
								& {
									cursor: pointer;
									display: block;
									padding: 15px 30px;
									background-color: #fff;
									@include transition(.2s all);
								}

								&:after {
									content: " ";
									display: block;
									clear: both;
								}
						
								&:hover {
									background-color: #f1f1f1;
									@include transition(.2s all);
								}

								& > input {
									display: none;
								}

								& > div {
									& {
										float: left;
										font-size: #{$font-size};
									}

									&.setting {
										& {
											font-weight: bold;
										}
									}

									&:nth-last-child(1) {
										& {
											float: right;
											padding-right: 20px;
										}

										& > div {
											& {
												background-color: #fff;
												width: 30px;
												height: 26px;
												position: relative;
												border: 2px solid #ccc;
												z-index: 1;
												@include transition(.2s all);
											}

											& > span {
												display: block;
												position: absolute;
												width: 26px;
												height: 26px;
												background-color: #fff;
												border-radius: 50%;
												border: 2px solid #ccc;
												@include transition(.2s all);
											}

											& > span:nth-child(1){
												left: 0; top: 50%;
												@include transform(translate(-50%, -50%));
											}

											& > span:nth-last-child(1){
												right: 0; top: 50%;
												@include transform(translate(50%, -50%));
											}

											& > div {
												& {
													width: 100%;
													height: 100%;
													position: absolute;
													z-index: 1;
													left: 0; top: 0;
													background-color: #fff;
												}

												& > div {
													width: 28px;
													height: 28px;
													background-color: #ccc;
													border-radius:50%;
													position: absolute;
													left:0; top: 50%;
													@include transform(translate(-50%, -50%));
													@include box-shadow(3px 3px 5px rgba(0,0,0,0.2));
													@include transition(.2s all);
													z-index: 2;
												}
											}
										}
									}
								}

								& > input:checked ~ div:nth-last-child(1) > div {
									border: 2px solid $bg-orange;
									@include transition(.2s all);
								}

								& > input:checked ~ div:nth-last-child(1) > div > span {
									border: 2px solid $bg-orange;
									@include transition(.2s all);
								}

								& > input:checked ~ div:nth-last-child(1) > div > div > div {
									left: 100%; top: 50%;
									background-color: $bg-orange;
									@include transition(.2s all);
								}
							}

							& > div.child {
								& {
									width: 100%;
									padding-bottom: 15px;
								}

								&.tag {
									& > div {
										& {
											width: 100%;
											padding: 0 30px;	
										}

										& > label {
											cursor: text;
											display: block;
										}

										& > label > div {
											& {
												width: 100%;
												border: 1px solid #ccc;
												outline: none;
												border-radius: 5px;
												font-size: #{$font-size};
												color: $font-color;
												padding: 3px 15px;
												margin-bottom: 5px;
												background-color: #f1f1f1;
											}

											& > div {
												& {
													display: inline-block;
													width: auto;
													height: 100%;
													padding-right: 15px;
													line-height: 2.5;
												}

												& > p {
													& {
														display: inline;
														font-size: #{$font-size - 2};
														font-weight: bold;
														background-color: $bg-blue;
														padding: 5px 12px;
														color: #f1f1f1;
														border-radius: 5px;
													}

													& > span {
														display: inline-block;
														padding-right: 5px;
													}

													& > i {
														display: inline-block;
														outline: none;
													}
												}

												&.active {
													& {
														opacity: 0;
														@include transition(.2s all);
													}

													& > p {
														background-color: $bg-orange;
														min-width: 15px;
													}
												}

												&.focused {
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
						}
					}
				}
			}
		}
	}
</style>
