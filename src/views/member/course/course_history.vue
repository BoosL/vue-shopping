<template>
	<div id="course">
		<!-- <c-title :hide="false" text='观看历史' tolink="CourseHistory" totext='清除'></c-title> -->
		<mt-header fixed title="观看历史">
			<!--onclick="window.history.go(-1)"v-on:等价于@  -->
			<mt-button icon="back" @click="goBack" slot="left"></mt-button>
			<span slot="right" @click="clearData()">清除</span>
		</mt-header>
		<mt-loadmore v-if="goload" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="coupon_loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='false' id='olis'>
			<div class="content">
				<div class="box" v-for="item in histroyInfo" @click="gotoDetail(item.course_goods_id)">
					<div class="image">
						<img :src="item.course_thumb">
					</div>
					<ul class="title">
						<li style="font-size:15px;">课程名称：{{item.course_title}}</li>
						<li class="jie">
							<yd-icon slot="icon" class="icon-bofang1" custom size="16px"></yd-icon>
							观看至{{item.chapter_name}}
						</li>
					</ul>
				</div>
			</div>
			
		</mt-loadmore>
	</div>
</template>

<script>
	import course_history_controller from "./course_history_controller";
	export default course_history_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.content {
		width:100%;
		height:100%;
		margin-top: 40px;
		background-color: #fff;
	}
	.box {
		width: 100%;
		display: flex;
		padding-bottom: 12px;
		padding-top: 12px;
		border-bottom: solid 1px #e2e2e2;
		padding-left: 12px;
	}
	.image {
		width: 100px;
		margin-right: 8px;
		flex: 1;
		height: 64px;
		background-color: green;
	}
	.image img {
		width: 100%;
		height: 100%;
	}
	.title {
		flex: 3;
		text-align: left;
	}
	.jie {
		color: #8c8c8c;
		margin-top: 10px;
	}
	.mint-header {
		background: none;
		color: #666;
	}
	.is-fixed .mint-header-title {
		font-weight: bold;
	}
	.mint-header.is-fixed {
		border-bottom: 1px solid #e8e8e8;
		background: #FFF;
		z-index: 99;
	}
	.is-right a {
		font-size: .6rem;
	}
	a {
		color: #333;
	}
	.mint-navbar {
		margin-bottom: 2px;
	}
	.mint-navbar .mint-tab-item {
		padding: 14px 0;
	}
</style>