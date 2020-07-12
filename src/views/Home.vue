<template>
	<div class="home">
		<layout-navigation />
		<layout-header />

		<div class="contents">

			<!-- Title -->
			<div class="section-1">
				<div class="title">
					<h1>VV</h1>
				</div>
				<layout-search />
			</div>
			<!-- Title End -->

			<!-- Pee -->
			<div class="section-2">
				<div class="title">
					<!--
					<div>
						<h1>찰칵찰칵</h1>
						<router-link to="/vrchat/post" title="업로드">업로드 하기</router-link>
					</div>
					-->
				</div>

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
			max-width: $wrap;
			height: auto;
			margin: 40px auto 0 auto;
		}

		& > .title {
			& {
				text-align: center;
			}
			& > h1 {
				text-align: center;
				font-size: 64px;
				color: $bg-orange;
				letter-spacing: -5px;
				font-family: $notoKR-B;
				display:inline-block;
				@include transform(rotate(90deg));
			}

			& > p {
				margin-top: 15px;
				line-height: 1.6;
			}
		}
	}

	.section-2 {
		& {
			width: 100%;
			max-width: 1920px;
			height: auto;
			margin: 40px auto 0 auto;
		}

		& > .title{
			& {
				width: 100%;
				max-width: $wrap;
				height: auto;
				margin: 0 auto 30px auto;
			}

			& > div{
				& {
					padding: 0 15px;
				}

				&:after{
					content: " ";
					display:block;
					clear: both;
					display: table;
				}

				& > h1 {
					display: table-cell;
					font-size: 32px;
					float:left;
					vertical-align: middle;
				}

				& > a {
					display: table-cell;
					border: 1px solid $bg-orange-bold;
					padding: 7px 20px;
					float: right;
					vertical-align: middle;
					background-color: $bg-orange;
					text-decoration: none;
					font-size: #{$font-size};
					color: $bg-light;
					border-radius: 5px;
				}	
			}
		}

	}

</style>
