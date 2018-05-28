<template>
	<div id="course">
		<c-title :hide="false" text='我的打赏'></c-title>
		<div style="height:40px;"></div>
        <div class="box01" v-for="item in rewardInfo" @click="gotoDetail(item.goods_id)">
			<span slot="text" style="line-height:36px;text-align:left;">打赏时间：{{item.created_at}}</span>
			<div style="margin-top:4px;">
				
				<div class="image">
					<img :src="item.goods_thumb" style="width:100%;height:100%;">
				</div>
				<div class="title">
				<span style="font-size:15px;">课程名称:{{item.goods_title}}</span>
				<ul style="margin-top:10px;">
					<li style="float:left;color:#999">讲师：{{item.lecturer_name}}</li>
				    <li style="float:right;right:0px;color:red;">{{item.amount}}元</li>
					
				</ul>
				</div>
			</div>
			<div class="clearfix"></div>
			
		</div>
		 <!-- <div class="box02">
			<span slot="text" style="line-height:36px;text-align:left;">打赏时间：2017-12-05&nbsp;&nbsp;14:57:30</span>
			<div  style="margin-top:4px;">
				
				<div class="image"></div>
				<div class="title">
				<span  style="font-size:15px;">课程名称:韦小宝</span>
				<ul style="margin-top:10px;">
					<li style="float:left;color:#999">讲师：李翔</li>
				    <li style="float:right;right:0px;color:red;">0.01元</li>
					
				</ul>
				</div>
			</div>
			<div class="clearfix"></div>
			
		</div> -->
		

   
	</div>
</template>

<script>
import course_reward_controller from "./course_reward_controller";
export default course_reward_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.box01{
	text-align: left;
	width:100%;
	background-color: #fff;
	padding-bottom:12px;
	padding-left:12px;
	padding-right:12px;
	border-bottom: solid 1px #e2e2e2;
	}
.image{width:64px;height:56px;float:left;}
.title{float:left;margin-left:10px;width:calc(100% - 74px);}
.clearfix{clear:both;}
.box02{margin-top:10px;text-align: left;width:100%;background-color: #fff;padding:0 12px 16px 12px;}
</style>