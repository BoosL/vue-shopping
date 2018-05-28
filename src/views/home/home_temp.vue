<template>
	<div class="home">
		<template v-for="item in tempData">
			<component :is="item.temp" :datas='item'></component>
		</template>
		<div style="height: 53px;"></div>
	</div>
</template>
<script>
	import home_temp from './home_temp_controller';
	export default home_temp;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>

</style>