<template>
	<div class="setting">
		<layout-navigation />
		<layout-header />

		<div class="contents">
            <div>
                <div class="main">
					<router-view />
                </div>
                <div class="nav">
                    <div class="list">

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
import { faChartBar } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'

import Header from '@/components/layout/header'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'

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
			faChartBar, faBookmark, 
		}
	},
	methods : {
		is_mobile(){ return IS_MOBILE() },
	},
}

</script>

<style scoped lang="scss">
    .contents {
        & {
            display: block;
            width: 100%; height: auto;
            max-width: $wrap;
            margin: 15px auto 0 auto;
        }

        & > div {
            & {
                display: table;
                width: 100%; height: auto;
                font-size: 0;    
            }

            & > .main {
                & {
                    display: table-cell;
                    vertical-align: middle;
                    padding-right: 25px;
                }
            }

            & > .nav {
                & {
                    display: table-cell;
                    vertical-align: middle;
                    width: 265px; height: auto;
                }

                & > .list {
                    & {
                        display: block;
                        width: 100%; height: auto;
                        background-color: #fff;
                        border-radius: 5px;
						@include box-shadow(2px 2px 5px rgba(0,0,0,0.1));
                    }
                }
            }
        }
    }
</style>
