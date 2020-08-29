<template>
	<div class="home">
		<layout-navigation />
		<layout-header />

		<div class="contents">

			<!-- Title -->
			<div class="section-1">
				<layout-search />
			</div>
			<!-- Title End -->

			<!--
			<div class="main-menu">
				<div>
					<ul>
						<li>
							<button type="button">
								<h1>홈페이지</h1>
							</button>
						</li>
						<li>
							<button type="button">
								<h1>정보</h1>
							</button>
						</li>
						<li>
							<button type="button">
								<h1>커뮤니티</h1>
							</button>
						</li>
					</ul>
				</div>
			</div>
			-->

			<!-- Pee -->
			<div class="section-2">
				<pee />
			</div>
			<!-- Pee End -->

		</div>
	</div>
</template>

<script>
import Header from '@/components/layout/header'
import Navigation from '@/components/layout/navigation'
import Search from '@/components/widget/main/search'
import Grid from '@/components/widget/main/grid-post'

export default {
	name: 'Home',
	components: {
		'layout-header': Header,
		'layout-navigation': Navigation,
		'layout-search': Search,
		'pee' : Grid
	}
}

</script>

<style scoped lang="scss">
	.section-1 {
		& {
			width: 100%;
			height: auto;
			padding: 70px;
			margin: 0 auto;
			position: relative;
		}

		& > .title {
			& {
				position: absolute;
				right: 100%; top: 50%;
				//@include transform(translateY(-50%));
			}

			& > h1 {
				font-size: 64px;
				color: $bg-orange;
				letter-spacing: -5px;
				font-family: $notoKR-B;
				display: inline-block;
				@include transform(rotate(90deg));
			}

			& > p {
				margin-top: 15px;
				line-height: 1.6;
			}
		}
	}

	.main-menu {
		& {
			width: 100%;
			height: 3px;
			background-color: $bg-orange;
		}

		& > * {
			display: none;
		}
		/*
		& {
			width: 100%;
			max-width: $wrap;
			margin: 0 auto;
			height: 50px;
			background-color: #555;
			//border: 2px solid $bg-blue;
			margin-top: 50px;
			border-radius: 5px;
            @include box-shadow(5px 5px 5px rgba(0,0,0,0.1));
		}

		& > div {
			& {
				width: 100%;
				max-width: $wrap;
				height: 100%;
				margin: 0 auto;
			}

			& > ul {
				& {
					width: 100%;
					height: 100%;
					font-size: none;
					list-style: none;
					padding-left: 15px;
				}

				& > li {
					& {
						width: auto;
						height: 100%;
						display: inline-block;
					}

					& > button {
						& {
							display: inline-block;
							margin: 0;
							padding: 0;
							width: auto;
							height: 100%;
							border: 0;
							background: none;
							outline: none;
							padding: 0 15px;
						}
						

						& > h1 {
							& {
								font-size : #{$font-size};
								color: #fff;
								font-weight: 300;
							}
						}
					}
				}
			}
		}
		*/
	}

	.section-2 {
		& {
			width: 100%;
			max-width: 1920px;
			height: auto;
			margin: 0px auto 0 auto;
		}
	}

</style>
