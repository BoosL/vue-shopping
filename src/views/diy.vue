<template>
	<div id="all">
		
		<div class="temp" v-if='temp.item'>
			<div class="home" v-if='temp.item.pageinfo'>
				<template v-if="temp.item.pageinfo.temp=='topbar'">
					<!-- 浮动按钮 -->
					<div class="fe-floatico" v-if="temp.item.pageinfo.params.floatico==1" :style="{'position':'fixed','width':temp.item.pageinfo.params.floatwidth,'top':temp.item.pageinfo.params.floattop}" :class="{'fe-floatico-right':temp.item.pageinfo.params.floatstyle=='right'}">
						<a :href="temp.item.pageinfo.params.floathref"><img :src="temp.item.pageinfo.params.floatimg || './static/app/app/images/init-image-7.png'" style="height:100%; width: 100%;" /></a>
						</div>
				</template>
				<div class="home" v-if="temp.item.data">
					<template v-for="item in temp.item.data">
						<component :is="item.temp" :datas='item'></component>
					</template>
					<div style="height: 53px;"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import diy from './diy_controller';
	export default diy;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	@import '../assets/css/index.scss';
</style>