<template>
    <div class="post">
		<input type="file" ref="UploadImage" multiple @change="UpdateImage($event.target.name, $event.target.files)">
    	<div class="post-title">
			<div class="thumbnail" v-if="!thumbnail">
				<div>
					<i><font-awesome-icon :icon="faImage" /></i>
				</div>
			</div>

			<div class="thumbnail" v-if="thumbnail">
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
				<h1>사진 리스트</h1>
				<button type="button" title="사진 추가" @click="tempImage">
					<i><font-awesome-icon :icon="faPlus" /></i>
				</button>
			</div>
			<div class="list">
				<ul>
					<li v-for="(item, i) in imageStorage" :key="i">
						<div>
							<img :src="item.base" />
						</div>
					</li>
					<li class="active" @click="tempImage">
						<div title="사진 추가">
							<i><font-awesome-icon :icon="faImages" /></i>
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
										<div>
											<div v-for="(tags, i) in item.array" :key="i">
												<p><span>#</span>{{ tags.name }}</p>
											</div>
											<div v-on:keydown.32.capture="displayTag(item.name)" class="active">
												<p><span>#</span><i placeholder="입력해주세요..." contenteditable></i></p>
											</div>
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
import { faImage, faImages, faPlus } from '@fortawesome/free-solid-svg-icons'

import { SET_BOARD } from '@/store/helper'

const sanitizeHtml = require('sanitize-html');

export default {
    name: 'DefaultPost',
    components: {
		FontAwesomeIcon
	},
	data() {
		return {
			faImage, faPlus, faImages,

			imageStorage: [],
			baseStorage: [],
			thumbnail: false,

			setting : [
				{
					name: 'tag',
					display: '테그 설정',
					child: [
						{
							name: 'map',
							display: '맵 테그',
							value: true,
							array: [{
								name: 'Vrchat'
							}]
						},
						{
							name: 'player',
							display: '플레이어 테그 / 언급',
							value: false
						},
						{
							name: 'tag',
							display: '자유 테그',
							value: false
						},
					]
				},
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
				& {
					float: left;
				}

				&.thumbnail {
					& {
						width: 20%;
						height: auto;
					}

					& > div {
						& {
							width: 100%;
							position: relative;
							overflow: hidden;
							background-color: #f1f1f1;
							border: 2px solid #ccc;
							border-style: dashed;
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
							font-size: #{$font-size + 15};
							color: #ccc;
						}

						& > img {
							position: absolute;
							left: 50%; top: 50%;
							@include transform(translate(-50%, -50%));
							height: 100%;
						}
					}

				}
				
				&.textarea {
					& {
						width: 80%;
						height: auto;
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

			& > .list {
				& > ul {
					& {
						width: 100%;
						font-size: 0;
						text-decoration: none;
						white-space: nowrap;
						overflow-x: hidden;
					}

					& > li {
						& {
							width: 20%;
							height: auto;
							display: inline-block;
							margin-right:15px;
						}

						& > div {
							& {
								width: 100%;
								height: auto;
								position: relative;
								background-color: #f1f1f1;
								overflow: hidden;
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
													& > p {
														background-color: $bg-orange;
														min-width: 15px;
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
