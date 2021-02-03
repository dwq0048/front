<template>
	<div class="profile">
		<layout-navigation />
		<layout-header />

		<div class="contents">
			<div>
				<div class="profile">
					<div>
						<div class="info">
							<div>
								<div class="image">
									<div>

									</div>
								</div>
								<div class="description">
									<div class="name">
										<h1>닉네임</h1>
									</div>
								</div>
							</div>
						</div>
						<div class="state">
							<div>

							</div>
						</div>
					</div>
				</div>

				<div class="main">
					<div>
						<div class="info">
							<div>
								<router-view/>
							</div>
						</div>
						<div class="nav">
							<div>
								<div class="list open">
									<div>
										<button type="button">
											<div>
												<i><font-awesome-icon :icon="faLockOpen" /></i>
												<span>공개 게시글</span>
											</div>
										</button>
									</div>
									<ul>
										<li>
											<router-link to="#">
												<i><font-awesome-icon :icon="faChartBar" /></i>
												<div>
													<span>DashBoard</span>
												</div>
											</router-link>
										</li>
										<li>
											<router-link :to="`/profile/${this.$route.params.id}/post`">
												<i><font-awesome-icon :icon="faClone" /></i>
												<div>
													<span>게시글</span>
													<b>[52]</b>
												</div>
											</router-link>
										</li>
										<li>
											<router-link :to="`/profile/${this.$route.params.id}/image`">
												<i><font-awesome-icon :icon="faImages" /></i>
												<div>
													<span>이미지</span>
													<b>[102]</b>
												</div>
											</router-link>
										</li>
										<li>
											<router-link to="#">
												<i><font-awesome-icon :icon="faBookmark" /></i>
												<div>
													<span>북마크</span>
													<b>[69]</b>
												</div>
											</router-link>
										</li>
										<li>
											<router-link :to="`/profile/${this.$route.params.id}/visit`">
												<i><font-awesome-icon :icon="faCat" /></i>
												<div>
													<span>방명록</span>
													<b>[999+]</b>
												</div>
											</router-link>
										</li>
									</ul>
								</div>

								<div class="tag-list">
									<div class="title">
										<div>
											<button type="button">
												<div>
													<i><font-awesome-icon :icon="faHashtag" /></i>
													<span>자주 사용한 태그</span>
												</div>
											</button>
										</div>
									</div>
									<div class="list">
										<ul>
											<li>
												<div>
													<i><font-awesome-icon :icon="faHashtag" /></i>
													<span>대충 해시 여러개</span>
												</div>
											</li>
											<li>
												<div>
													<i><font-awesome-icon :icon="faHashtag" /></i>
													<span>대충 해시 여러개</span>
												</div>
											</li>
											<li>
												<div>
													<i><font-awesome-icon :icon="faHashtag" /></i>
													<span>대충 해시 여러개</span>
												</div>
											</li>
										</ul>
									</div>
								</div>
								
								<div class="list">
									<div>
										<button type="button">
											<div>
												<i><font-awesome-icon :icon="faLock" /></i>
												<span>비공개 게시글</span>
											</div>
										</button>
									</div>
									<ul>
										<li>
											<router-link to="#">
												<i><font-awesome-icon :icon="faBell" /></i>
												<div>
													<span>알림</span>
													<b>[0]</b>
												</div>
											</router-link>
										</li>
										<li>
											<router-link to="#">
												<i><font-awesome-icon :icon="faHeart" /></i>
												<div>
													<span>좋아요</span>
													<b>[31]</b>
												</div>
											</router-link>
										</li>
										<li>
											<router-link to="#">
												<i><font-awesome-icon :icon="faWheelchair" /></i>
												<div>
													<span>팔로우</span>
													<b>[3]</b>
												</div>
											</router-link>
										</li>
										<li>
											<router-link to="#">
												<i><font-awesome-icon :icon="faComments" /></i>
												<div>
													<span>댓글</span>
													<b>[1375]</b>
												</div>
											</router-link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<layout-footer />
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { IS_MOBILE } from '@/store/helper/'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChartBar, faLockOpen, faHashtag, faLock, faWheelchair, faCat } from '@fortawesome/free-solid-svg-icons'
import { faBookmark, faClone, faImages, faComments, faBell, faHeart } from '@fortawesome/free-regular-svg-icons'

import Header from '@/components/layout/header'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'

const postStore = 'postStore'

export default {
	name: 'ProfileIndex',
	components: {
		'layout-header': Header,
		'layout-navigation': Navigation,
        'layout-footer' : Footer,
	},
	data(){
		return {
			// Icons
			faChartBar, faClone, faBookmark, faImages, faLockOpen, faHashtag, faLock, faComments, faBell, faHeart, faWheelchair, faCat,

			list : []
		}
	},
	methods : {
        ...mapActions(postStore, [
            'POST_LIST'
        ]),
		is_mobile(){ return IS_MOBILE() },
	},
}

</script>

<style scoped lang="scss">
	.contents {
		& {
			position: relative;
			width: 100%; height: auto;
		}

		& > div {
			& {
				position: relative;
				display: block;
				width: 100%; height: auto;
				max-width: $wrap;
				margin: 30px auto 0 auto;
			}

			& > .profile {
				& {
					display: block;
					width: 100%; height: auto;
					border-radius: 5px;
					padding: 15px;
					background-color: #fff;
					@include box-shadow(2px 2px 5px rgba(0,0,0,0.1));
				}

				& > div {
					& {
						display: table;
						width: 100%; height: auto;
						font-size: 0;
					}

					& > .info {
						& {
							display: table-cell;
							vertical-align: middle;
						}

						& > div {
							& {
								display: table;
								width: 100%; height: auto;
							}

							& > .image {
								& {
									position: relative;
									display: table-cell;
									vertical-align: top;
									width: 120px; height: auto;
									background-color: #ddd;
									overflow: hidden;
									border-radius: 5px;
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
										left: 0; top: 0;
										width: 100%; height: 100%;
										object-fit: cover;
									}
								}
							}

							& > .description {
								& {
									display: table-cell;
									vertical-align: top;
									padding: 10px 15px;
								}

								& > .name {
									& {
										display: block;
										width: 100%; height: auto;
									}

									& > h1 {
										& {
											display: block;
											width: 100%; height: auto;
											font-size: #{$font-size + 2};
											font-weight: bold; 
											color: #333;
											line-height: 1;
										}
									}
								}
							}
						}
					}

					& > .state {
						& {
							display: table-cell;
							vertical-align: middle;
							width: 250px; height: auto;
						}

						& > div {
							& {
								display: block;
								width: 100%; height: 120px;
								background-color: #ddd;
								border-radius: 5px;
								
							}
						}
					}
				}
			}
			/* Profile End */

			/* Main Start */
			& > .main {
				& {
					position: relative;
					display: block;
					width: 100%; height: auto;
					margin-top: 25px;
				}

				& > div {
					& {
						position: relative;
						display: table;
						width: 100%; height: auto;
					}

					& > .info {
						& {
							display: table-cell;
							vertical-align: top;
							padding-right: 25px;
						}

						& > div {
							& {
								display: block;
								width: 100%; height: auto;
								border-radius: 5px;
								padding: 15px;
								background-color: #fff;
								@include box-shadow(2px 2px 5px rgba(0,0,0,0.1));
							}
						}
					}

					& > .nav {
						& {
							display: table-cell;
							vertical-align: top;
							width: 265px; height: auto;
						}

						& > div {
							& {
								background-color: #f9f9f9;
								width: 100%; height: auto;
								border-radius: 5px;
								@include box-shadow(2px 2px 5px rgba(0,0,0,0.1));
							}

							/* Open Nan Start */
							& > .list {
								& {
									display: block;
									width: 100%; height: auto
								}

								& > div {
									& {
										position: relative;
										display: block;
										width: 100%; height: auto;
										background-color: #fff;
										border-top: 1px solid #ddd;
										border-bottom: 1px solid #ddd;
									}

									&:after {
										content: " ";
										display: block;
										position: absolute;
										width: 3px; height: 100%;
										left: 0; top: 0;
										background-color: #ddd;
									}

									& > button {
										& {
											display: block;
											width: 100%; height: auto;
											border: 0; background: none;
											margin: 0; padding: 0;
											outline: none; cursor: pointer;
											font-size: 0;
											padding: 10px 15px;
											text-align: left;
										}

										& > div {
											& {
												display: block;
												width: 100%; height: auto;
												white-space: nowrap;
											}

											& > i {
												& {
													display: inline-block;
													vertical-align: middle;
													font-size: #{$font-size + 1};
													padding-right: 10px;
													color: #ddd;
												}
											}

											& > span {
												& {
													display: inline-block;
													vertical-align: middle;
													font-size: #{$font-size + 1};
													font-weight: bold;
													color: #999;
												}
											}

										}
									}
								}

								& > ul {
									& {
										display: block;
										width: 100; height: auto;
										list-style: 0;
										font-size: 0;
									}

									& > li {
										& {
											display: block;
											width: 100%; height: auto;
										}

										& > a {
											& {
												display: block;
												width: 100%; height: auto;
												text-decoration: none;
												padding: 15px;
											}

											& > i {
												& {
													display: inline-block;
													vertical-align: middle;
													font-size: #{$font-size + 2};
													color: #555;
													line-height: 1;
													padding-right: 10px;
												}
											}

											& > div {
												& {
													display: inline-block;
													vertical-align: middle;
													font-size: 0;
													font-weight: bold;
													color: #555;
													line-height: 1;
													white-space: nowrap;
												}

												& > span {
													& {
														display: inline-block;
														vertical-align: middle;
														font-size: #{$font-size};
													}
												}

												& > b {
													& {
														display: inline-block;
														vertical-align: middle;
														padding-left: 5px;
														font-size: #{$font-size};
														color: $bg-blue;
													}
												}
											}
										}
									}
								}

								&.open {
									& > div {
										&:after {
											content: " ";
											display: block;
											position: absolute;
											width: 3px; height: 100%;
											left: 0; top: 0;
											background-color: $bg-blue;
										}

										& > button {
											& > div {
												& > i {
													& {
														color: $bg-blue;
													}
												}
											}
										}
									}
								}
							}
							/* Open Nan End */

							/* Tag List Start */
							& > .tag-list {
								& {
									display: block;
									width: 100%; height: auto;
								}

								& > .title {
									& {
										display: block;
										width: 100%; height: auto;
									}

									& > div {
										& {
											position: relative;
											display: block;
											width: 100%; height: auto;
											border-top: 1px solid #ddd;
											border-bottom: 1px solid #ddd;
											background-color: #fff;
										}

										&:after {
											content: " ";
											display: block;
											position: absolute;
											width: 3px; height: 100%;
											left: 0; top: 0;
											background-color: $bg-orange;
										}

										& > button {
											& {
												display: block;
												width: 100%; height: auto;
												border: 0; background: none;
												padding: 0; margin: 0;
												outline: none; cursor: pointer;
												text-align: left;
												font-size: 0;
												padding: 10px 15px;
											}

											& > div {
												& {
													display: block;
													width: 100%; height: auto;
													white-space: nowrap;
												}

												& > i {
													& {
														display: inline-block;
														vertical-align: middle;;
														font-size: #{$font-size + 1};
														color: $bg-orange;
														padding-right: 10px;
													}
												}

												& > span {
													& {
														display: inline-block;
														vertical-align: middle;
														font-size: #{$font-size + 1};
														font-weight: bold;
														color: #999;
													}
												}
											}
										}
									}
								}

								& > .list {
									& {
										display: block;
										width: 100%; height: auto;
										padding: 15px 0;
									}

									& > ul {
										& {
											display: block;
											width: 100%; height: auto;
											list-style: none;
											font-size: 0;
											text-align: center;
										}

										& > li {
											& {
												display: inline-block;
												vertical-align: middle;
												padding: 5px;
											}

											& > div {
												& {
													white-space: nowrap;
													padding: 5px 10px;
													border-radius: 3px;
													background-color: #555;
												}

												& > i {
													& {
														display: inline-block;
														vertical-align: middle;
														font-size: #{$font-size - 2};
														padding-right: 5px;
														color: #f1f1f1;
													}
												}

												& > span {
													& {
														display: inline-block;
														vertical-align: middle;
														font-size: #{$font-size - 2};
														font-weight: bold;
														color: #f1f1f1;
													}
												}
											}
										}
									}
								}
							}
							/* Tag List End */

						}
					}
				}
			}
		}
	}
</style>
