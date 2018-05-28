<template>
	<div id="category">
		<c-title :hide="false" text='微店分类'></c-title>
		<div style="height:40px"></div>
		<div id="category-content" ref="menucontent">
			<div id="err" v-if='err'>未检测到子分类数据!</div>
	
			<c-carcontent  :list='contentlist' v-if='!err'></c-carcontent>
	
		</div>
		<div id="rootlists" ref="menu">
			<ul id='rootList' v-if='list'>
				<li @click="bpfun" v-if="false">推荐品牌</li>
				<li @click="allList" :class="{active:active2}" v-if="false">推荐分类</li>
				<li v-for="(item,index) in list" :class="{active:active==index}" @click='tabsa(index,item)'>{{item.name}}</li>
				<div style="height: 50px;"></div>
			</ul>
		</div>
		<div style="height: 45px;"></div>
	</div>
</template>

<script>
import category from './category_controller';
export default category;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../../../assets/css/category.scss'
</style>