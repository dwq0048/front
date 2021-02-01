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
										<router-link to="#">
                                			<i><font-awesome-icon :icon="faAddressCard" /></i>
											<div>
												<span>게시글</span>
												<b>[52]</b>
											</div>
										</router-link>
									</li>
									<li>
										<router-link to="#">
                                			<i><font-awesome-icon :icon="faBookOpen" /></i>
											<div>
												<span>라이브러리</span>
												<b>[69]</b>
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

		<layout-footer />
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { IS_MOBILE } from '@/store/helper/'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChartBar, faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-regular-svg-icons'

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
			faChartBar, faAddressCard, faBookOpen,

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
								background-color: #fff;
								width: 100%; height: auto;
								border-radius: 5px;
								@include box-shadow(2px 2px 5px rgba(0,0,0,0.1));
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
						}
					}
				}
			}
		}
	}
</style>
