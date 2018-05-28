<!--suppress ALL -->
<template>
	<div id="temp">
		{{jan}}{{cou}}
		<button @click="$store.commit('jia',{a:10})">+</button>
		<button @click="jian(90)">-</button>
<c-list></c-list>


	</div>
</template>
<script>
import cList from 'components/list';
	import { mapState,mapMutations } from 'vuex';
	export default {

		data() {
			return {
				message:''
			}
		},
 
		components: { cList },

		methods:mapMutations([]),
		//读取vuex的属性,html即可直接上vuex属性{{jan}}
		computed: mapState([])//直接引用vuex状态值
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	html {

	}
</style>