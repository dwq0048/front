<template>
    <div class="post" ref="post">
		<!--
    	<div class="pop" :class="{ active : pop.active, background : pop.background }" >
			<div class="crop" :class="{ active : pop.crop }">
				<div class="content">
					<div>
						<cropper
							classname="cropper"
							:src="cropImage"
							:stencilProps="{
								minAspectRatio: 8/8,
								maxAspectRatio: 8/8
							}"
							ref="cropper"
						></cropper>
					</div>
				</div>
				<div class="nav">
					<button type="button">닫기</button>
					<button type="button">적용</button>
				</div>
			</div>
			<div class="background"></div>
		</div>
		-->

		<input type="file" ref="UploadImage" multiple @change="UpdateImage($event.target.name, $event.target.files)">
    	<div class="content" ref="postContent" :class="{ display : slide.content.display, move : slide.content.move, absolute : slide.content.absolute }">
			<div class="post-nav">
				<div>
					<button type="button" class="prev" title="목록으로">
						<i><font-awesome-icon :icon="faAngleLeft" /></i>
					</button>
					<div>
						<h1>새 게시물</h1>
					</div>
					<button type="button" class="write" title="공유하기" @click="submit()">
						<i><font-awesome-icon :icon="faEdit" /></i>
					</button>
				</div>
			</div>

			<div class="post-title">
				<div class="title">
					<h1>내용</h1>
					<button type="button" title="사진 추가" @click="tempImage">
						<i><font-awesome-icon :icon="faPlus" /></i>
					</button>
				</div>

				<div class="thumbnail" v-if="!thumbnail" title="사진 추가" @click="tempImage()">
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
						<textarea placeholder="내용을 입력해 주세요...." v-model="message"></textarea>
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
					<button type="button" @click="CheckDelete()">
						<i><font-awesome-icon :icon="faTrashAlt" /></i>
						<span>선택 삭제</span>
					</button>
					<button type="button" @click="CheckDisabled()">
						<i><font-awesome-icon :icon="faExclamationCircle" /></i>
						<span>선택 해제</span>
					</button>
					<button type="button" @click="CheckAll()">
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
										<button type="button" title="이미지 사이즈 변경" @click="crop(i)">
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
										<input type="checkbox" v-model="photoList" :value="i" @change="CheckChange(i)">
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
									<i class="img"><font-awesome-icon :icon="faImages" /></i>
									<i class="upload"><font-awesome-icon :icon="faFileUpload" /></i>
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
		<div class="crop" ref="postCrop" :class="{ display : slide.crop.display, move : slide.crop.move, absolute : slide.crop.absolute }">
			<div class="post-nav">
				<div>
					<button type="button" class="prev" title="닫기" @click="cropToggle(false)">
						<i><font-awesome-icon :icon="faAngleLeft" /></i>
					</button>
					<div>
						<h1>이미지 자르기</h1>
					</div>
					<button type="button" class="write">
						<p>적용하기</p>
					</button>
				</div>
			</div>
			<div class="post-content">
				<div>
					<div class="background" :style="{backgroundImage: 'url('+ cropImage +')'}"></div>
					<cropper
						classname="cropper"
						:src="cropImage"
						:stencilProps="{
							minAspectRatio: 8/8,
							maxAspectRatio: 8/8
						}"
						ref="cropper"
					></cropper>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faImage, faImages, faFileUpload, faPlus, faCropAlt, faCheck, faCrown, faCheckCircle, faExclamationCircle, faTrashAlt, faArrowsAlt, faAngleLeft, faEdit } from '@fortawesome/free-solid-svg-icons'

import { Cropper } from 'vue-advanced-cropper'
import { SET_BOARD, SET_SCRIPT } from '@/store/helper'

const postStore = 'postStore';

export default {
    name: 'DefaultPost',
    components: {
		FontAwesomeIcon
	},
	data() {
		return {
			faImage, faPlus, faImages, faFileUpload, faCropAlt, faCheck, faCrown, faCheckCircle, faExclamationCircle, faTrashAlt, faArrowsAlt, faAngleLeft, faEdit,

			imageStorage: [],
			baseStorage: [],
			thumbnail: false,

			Cropper,
			cropImage: '',

			slide: {
				content : {
					move : false,
					display : false,
					absolute : false,
				},
				crop : {
					move : false,
					display : false,
					absolute : false,
				}
			},
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
			],
			photoList: [],
			message: ''
		}
	},
	methods: {
		...mapActions(postStore, [
			'POST'
		]),
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
		CheckAll(){
			let index = 0;
			this.imageStorage.map(item => {
				this.photoList.push(index);
				item.checked = true;
				index++;
			})

		},
		CheckDisabled(){
			this.imageStorage.map(item => {
				if(item.checked == true){
					item.checked = false;
				}
			})
			this.photoList = [];
		},
		CheckChange(index){
			if(this.imageStorage[index].checked == true){
				this.imageStorage[index].checked = false
			}else {
				this.imageStorage[index].checked = true
			}
		},
		CheckDelete(){
			for(let i=0; i<this.photoList.length; i++){
				this.imageStorage.splice(this.photoList[i], 1);
			}
			this.CheckDisabled();

			console.log(this.imageStorage);
		},
		crop(index){
			const crop = this.imageStorage[index];
			this.cropImage = crop.base;
			this.$refs.cropper.setCoordinates([
				(coordinates, imageSize) => ({
					width: (imageSize.width > imageSize.height) ? imageSize.height : imageSize.width,
					height: (imageSize.width < imageSize.height) ? imageSize.width : imageSize.height,
				}),
				(coordinates, imageSize) => ({
					left: imageSize.width/2 - coordinates.width/2,
					top: imageSize.height/2 - coordinates.height/2,
				})
			])

			this.cropToggle(true);
		},
		cropToggle(payload){
			if(payload == false){
				this.$refs.post.style.height = this.$refs.postCrop.offsetHeight+'px';
				//this.$refs.post.style.transition = '.5s all';

				this.slide.crop.move = false;
				this.slide.content.display = false;
				this.slide.content.absolute = true;
				this.slide.content.move = false;
				this.slide.crop.absolute = true;
				setTimeout(() => {
					this.$refs.post.style.height = this.$refs.postContent.offsetHeight+'px';


					this.slide.content.absolute = false;
					this.slide.crop.display = true;
					this.slide.crop.absolute = false;
				},500, () => {
					this.$refs.post.style.height = '';
				})
			}else {
				this.$refs.post.style.height = this.$refs.postContent.offsetHeight+'px';
				//this.$refs.post.style.transition = '.5s all';

				this.slide.crop.move = true;
				this.slide.content.move = true;
				this.slide.crop.display = true;
				setTimeout(() => {
					this.$refs.post.style.height = this.$refs.postCrop.offsetHeight+'px';
					this.slide.content.display = true;
				},500, () => {
					this.$refs.post.style.height = '';
				})
			}
		},
		UpdateImage(name, file){
			this.CheckDisabled();
			for(let i=0;i<file.length;i++){
				this.SETBASE(file[i]);
			}
		},
		async SETBASE(payload){
			return await SET_BOARD.encodeBase64ImageFile(payload).then((req) => {
				if(this.thumbnail == false){ this.thumbnail = { num : 0 }; }
				payload.base = req;
				payload.checked = false;
				this.imageStorage.push(payload);
			});

		},
		submit() {
			const data = {
				position: 'photo',
				title: '',
				post: message
			}

			const IMG = this.imageStorage;

			const fs = new FormData();
			fs.append('position', data.position);
			fs.append('title', data.title);
			fs.append('post', data.post);
			for(let i=0;i<IMG.length;i++){
				delete IMG[i].base;
				delete IMG[i].checked;
				fs.append('images', IMG[i]);
			}

			this.POST(fs).then((req) => {
				console.log(req);
			}).catch((err) => {
				console.log(err);
			});
		}
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
			white-space: nowrap;
			overflow: hidden;
			height: auto;
			position: relative;
			@include box-shadow(2px 2px 2px rgba(0,0,0,0.1));
			@include transition(.2s all);
		}

		& > .content {
			& {
				width: 100%;
				height: auto;
				display: inline-block;
				position: relative;
				left: 0%;
				vertical-align: top;
				@include transition(.5s all);
			}

			& > .post-nav {
				& {
					width: 100%;
					height: 50px;
					border-bottom: 1px solid #ccc;
				}

				& > div {
					& {
						width: 100%;
						height: 100%;
						position: relative;
					}

					& > div {
						& {
							position: absolute;
							width: 100%;
							height: 100%;
							left: 0; top: 0;
							z-index: 1;
						}

						& > h1 {
							& {
								font-size: #{$font-size + 2};
								font-weight: bold;
								text-align: center;
								line-height: 49px;
								vertical-align: middle;
							}
						}
					}
					& > button {
						& {
							border: none;
							background: none;
							outline: none;
							cursor: pointer;
							font-size: #{$font-size + 8};
							color: #999;
							z-index: 2
						}

						&.prev {
							& {
								width: 50px;
								height: 100%;
								border-right: 1px solid #ccc;
								position: absolute;
								left: 0; top: 0;
								@include transition(.2s all);
							}
						}

						&.write {
							& {
								width: 70px;
								height: 100%;
								position: absolute;
								right: 0; top: 0;
								font-size: #{$font-size + 4};
								color: $bg-blue;
								@include transition(.2s all);
							}
						}

						&:hover {
							&.prev {
								color: #555;
								@include transition(.2s all);
							}

							&.write {
								color: $bg-blue-bold;
								@include transition(.2s all);
							}
						}
					}
				}
			}

			& > .post-title {
				& {
					width: 100%;
					height: auto;
					padding: 30px 30px 0 30px;
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
								width: 100%;
								height: 100%;
								position: absolute;
								left: 50%; top: 50%;
								object-fit: cover;
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
					padding: 0 30px;
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
										width: 100%;
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

									& > div {
										& {
											border: 0;
										}

										& > .img {
											& {
												opacity: 1;
												@include transition(.2s all);
											}
										}

										& > .upload {
											& {
												opacity: 0;
												@include transition(.2s all);
												color: $bg-orange;
											}
										}
									}

									&:hover {
										& {
											border: 2px solid $bg-orange;
											border-style: dashed;
										}

										& > div {
											& > .img {
												& {
													opacity: 0;
													@include transition(.2s all);
												}
											}

											& > .upload {
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

			& > .post-setting {
				& {
					width: 100%;
					margin-top: 30px;
					padding: 0 30px;
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

			&.move {
				& {
					left: -100%;
					position: absolute;
					@include transition(.5s all);
				}
			}

			&.display {
				& {
					display: none;
				}
			}

			&.absolute {
				& {
					position: absolute;
					left: 0%;
					@include transition(.5s all);
				}
			}
		}

		& > .crop {
			& {
				width: 100%;
				left: 100%;
				display: none;
				position: relative;
				vertical-align: top;
				@include transition(.5s all);
			}

			& > .post-nav {
				& {
					width: 100%;
					height: 50px;
					border-bottom: 1px solid #ccc;
				}

				& > div {
					& {
						width: 100%;
						height: 100%;
						position: relative;
					}

					& > div {
						& {
							position: absolute;
							width: 100%;
							height: 100%;
							left: 0; top: 0;
							z-index: 1;
						}

						& > h1 {
							& {
								font-size: #{$font-size + 2};
								font-weight: bold;
								text-align: center;
								line-height: 49px;
								vertical-align: middle;
							}
						}
					}
					& > button {
						& {
							border: none;
							background-color: none;
							outline: none;
							cursor: pointer;
							font-size: #{$font-size + 8};
							color: #999;
							z-index: 2
						}

						&.prev {
							& {
								width: 50px;
								height: 100%;
								border-right: 1px solid #ccc;
								position: absolute;
								left: 0; top: 0;
								@include transition(.2s all);
							}
						}

						&.write {
							& {
								width: auto;
								position: absolute;
								right: 0; top: 50%;
								font-size: #{$font-size - 2};
								color: #fff;
								margin-right: 10px;
								background-color: $bg-blue;
								border-radius: 5px;
								padding: 7px 20px;
								@include transform(translateY(-50%));
								@include transition(.2s all);
							}
						}

						&:hover {
							&.prev {
								color: #555;
								@include transition(.2s all);
							}

							&.write {
								background-color: $bg-blue-bold;
								@include transition(.2s all);
							}
						}
					}
				}
			}

			& > .post-content {
				& {
					padding: 30px;
				}

				& > div {
					& {
						width: 100%; height: 100%;
						position: relative;
						overflow: hidden;
						border: 2px solid #ccc;
					}

					& > div.background {
						& {
							width: 100%;
							height: 100%;
							background-size: cover;
							background-position: 50% 50%;
							filter: blur(5px);
							position: absolute;
							left: 0; top: 0;
						}

						&:after {
							content: " ";
							display: block;
							background-color: rgba(0,0,0,0.5);
							width: 100%; height: 100%;
							left: 0; top: 0;
							position: absolute;
						}
					}
				}
			}

			& > .nav {
				width: 100%;
			}

			& > .content {
				width: 100%;
			}

			&.display {
				display: inline-block;
				position: relative;
			}

			&.move {
				left: 0%;
				position: absolute;
				@include transition(.5s all);
			}
		}

	}
</style>
