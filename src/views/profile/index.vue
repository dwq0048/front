<template>
	<div class="profile">
		<layout-navigation />
		<layout-header />

		<div class="contents">
            
		</div>

		<layout-footer />
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { IS_MOBILE } from '@/store/helper/'

import Header from '@/components/layout/header'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'


const postStore = 'postStore'

export default {
	name: 'Home',
	components: {
		'layout-header': Header,
		'layout-navigation': Navigation,
        'layout-footer' : Footer,
	},
	data(){
		return {
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

</style>
