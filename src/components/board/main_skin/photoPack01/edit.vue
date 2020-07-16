<template>
    <div class="post">
    	<div class="post-title">
			<div class="thumbnail">
				<div>
					<i><font-awesome-icon :icon="faImage" /></i>
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
				<h1>사진 <span>업로드</span></h1>
			</div>
			<div>
				<ul>
					<li>
						<div></div>
					</li>
					<li>
						<div></div>
					</li>
					<li>
						<div></div>
					</li>
					<li>
						<div></div>
					</li>
					<li>
						<div></div>
					</li>
					<li>
						<div></div>
					</li>
				</ul>
			</div>
		</div>

		<div class="post-setting">
			<div>
				<ul>
					<li v-for="(item, i) in setting" :key="i">
						<div>
							<label>
								<input type="checkbox">
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
						</div>
					</li>
				</ul>
			</div>
		</div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

const sanitizeHtml = require('sanitize-html');

export default {
    name: 'DefaultPost',
    components: {
		FontAwesomeIcon
	},
	data() {
		return {
			faImage,

			setting : [
				{
					name: 'map',
					display: '맵 테그',
					value: false
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
		}
	},
	methods: {

	}
}
</script>

<style lang="scss" scoped>
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
							background-color: #ccc;
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
							color: #999;
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
							background-color: #f1f1f1;
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

			& > div {
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
								background-color: #ccc;
							}

							&:after {
								content: " ";
								display: block;
								padding-bottom: 100%;
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
						}
					}
				}
			}
		}
	}
</style>
