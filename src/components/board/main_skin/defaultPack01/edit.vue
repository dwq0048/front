<template>
    <div class="post">
		<div class="post-head">
			<div class="post-title">
				<input type="text" placeholder="제목" v-model="postTitle">
			</div>
			<div class="post-select">
				<div>
					<select v-model="postPosition">
						<option v-for="option in postPositionOptions" v-bind:value="option.value" :key="option.value" :selected="postPosition == option.value">
							{{ option.text }}
						</option>
					</select>
				</div>
			</div>
		</div>

		<tip-tap-editor ref="edit"/>

		<div class="post-file-title" @click="file()">
			<div>
				<input type="file" ref="fileSelect" @change="fileTemp($event.target.name, $event.target.files)">
				<span><font-awesome-icon :icon="faFileUpload" /></span>
				<p>파일 업로드<span>5MB이하로 업로드가 가능합니다.</span></p>
			</div>
		</div>
		<div class="post-files">
			<div v-for="(item, i) in fileBox" :key="i">
				<div class="file-plus">
					<div>
						<font-awesome-icon :icon="faPlus" />
					</div>
				</div>
				<div class="file-list">
					<div>
						<span><font-awesome-icon :icon="faFile" /></span>
						<p>{{item.name}}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="post-footer">
			<div class="post-disabled">
				<button type="button">취소</button>
			</div>
			<div class="post-submit" @click="submit()">
				<button type="button">작성완료</button>
			</div>
		</div>
    </div>
</template>

<script>
import tipTapEditor from '@/components/plugin/textarea/tiptap'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faFileUpload, faFile } from '@fortawesome/free-solid-svg-icons'

const sanitizeHtml = require('sanitize-html');

export default {
    name: 'DefaultPost',
    components: {
		FontAwesomeIcon,
		'tip-tap-editor' : tipTapEditor
	},
	data() {
		return {
			faPlus, faFileUpload, faFile,
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
		/*
		submit: function(){
			const fs = new FormData();

			fs.append('position', this.postPosition);
			fs.append('title', this.postTitle);
			fs.append('post', this.postData);
			console.log(this.fileBox);
			for(let i=0;i<this.fileBox.length;i++){
				fs.append(`files[]`, this.fileBox[i]);
			}

			this.$axios({
				method: 'post',
				url: `/api/1/board/post`,
				data: fs,
				headers: {'Content-Type': 'multipart/form-data'},
				withCredentials : true
			}).then((req) => {
				console.log(req);
				console.log(fs);
                //this.$store.commit('tokenStatus', req.data.info);
                //this.$router.push({ path: '/' });
            })
            .catch((err) => {
				console.log(err);
            })
		},
		*/
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

		& > .post-head {
			&:after {
				content: " ";
				display: block;
				clear: both;
			}

			& > .post-title {
				& {
					width: 80%;
					height: 40px;
					border: 1px solid #ccc;
					border-radius: 2px;
					overflow: hidden;
					float: right;
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
				}
			}

			& > .post-select {
				& {
					width: 20%;
					height: 40px;
					float: left;
					padding-right: 10px;
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
							color: $font-color;
						}

						& > option {
							color: $font-color;
						}
					}
					
				}

			}
		}

		& > .post-file-title {
			& {
				width: 100%;
				height: auto;
				margin-top: 30px;
				margin-bottom: 15px;
				padding: 0 15px;
				cursor: pointer;
			}

			& > div {
				& > input[type=file] {
					display: none;
				}

				& > span {
					font-size: #{$font-size + 4};
					color: #aaa;
					display: inline-block;
					@include transition(all .2s);
				}

				& > p {
					& {
						font-size: #{$font-size + 4};
						color: #aaa;
						display: inline-block;
						padding-left: 15px;
						@include transition(all .2s);
					}

					& > span {
						font-size: #{$font-size - 2};
						color: #aaa;
						vertical-align: bottom;
						padding-left: 5px;
						@include transition(all .2s);
					}
				}
			}

			&:hover {
				& > div {
					& > span {
						color: #333;
						@include transition(all .2s);
					}

					& > p {
						& {
							color: #333;
							@include transition(all .2s);
						}

						& > span {
							color: #333;
							@include transition(all .2s);
						}
					}
				}

			}
		}

		& > .post-files {
			& {
				width: 100%;
				height: auto;
			}

			& > div {

				& {
					padding: 0px 15px 0px 15px;
				}


				& > div {
					display: inline-block;
				}

				& > .file-plus {
					& {
						padding-right: 15px;
						cursor: pointer;
					}

					& > div {
						font-size: #{$font-size};
						@include transform(rotate(45deg));
						color: #aaa;
						@include transition(all .2s);
					}
				}

				& > .file-plus:hover {
					& > div {
						@include transform(rotate(225deg));
						color: #333;
						@include transition(all .2s);
					}
				}

				& > .file-list {
					& > div {
						& {
							font-size: #{$font-size};
							color: #aaa;
							border-bottom: 2px solid #ccc;
							padding: 15px 30px 15px 10px;
							@include transition(all .2s);
						}

						& > p {
							display: inline-block;
							padding: 0 15px;
						}
					}
				}

				& > .file-list:hover {
					& > div {
						& {
							color: #555;
							@include transition(all .2s);
						}
					}
				}

			}
		}

		& > .post-footer {
			& {
				width: 100%;
				height: auto;	
				margin-top: 50px;
			}

			&:after {
				content: " ";
				display: block;
				clear: both;
			}

			& > div {
				& {
					padding: 8px 30px;
					border-radius: 5px;
					cursor: pointer;
				}

				&.post-disabled {
					& {
						float: left;
						border: 1px solid #ccc;
						background-color: #fff;
						@include transition(.2s);
					}

					& > button {
						color: $font-color;
					}
				}

				&.post-disabled:hover {
					& {
						background-color: #f1f1f1;
						@include transition(.2s);
					}
				}

				&.post-submit {
					& {
						float: right;
						border: 1px solid $bg-orange;
						background-color: $bg-orange;
						@include transition(.2s);
					}

					& > button {
						color: #fff;
					}
				}

				&.post-submit:hover {
					& {
						background-color: $bg-orange-bold;
						border: 1px soild $bg-orange-bold;
						@include transition(.2s);
					}
				}

				& > button {
					width: 100%;
					height: 100%;
					background: none;
					border: none;
					padding: 0;
					cursor: pointer;
					margin: 0;
				}
			}
		}

	}
</style>
