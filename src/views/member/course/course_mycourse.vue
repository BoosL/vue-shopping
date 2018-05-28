<template>
	<div id="course">
		<c-title :hide="false" text='我的课程'></c-title>
		<div class="course-content">
         <div class="box01" v-for="item in myCourseInfo" @click="goToDetail(item.goods_id)">
			<span slot="text" style="line-height:40px;text-align:left;font-size:15px;">订单号：{{item.order_sn}}</span>
			<div>
				
				<div class="image">
					<img :src="item.goods_thumb" style="width:100%;hieght:100%;">
				</div>
				<div class="title">
				<span style="font-size:15px;">课程名称:{{item.goods_title}}</span>
				<ul style="margin-top:10px;">
					<li style="color:#999">{{item.created_at}}</li>
				</ul>
				</div>
				<yd-icon slot="icon" class="icon-bofang" custom size="24px" style="float:right;line-height:48px;color:#ff9600;" ></yd-icon>
			</div>
			<div class="clearfix"></div>
			
		</div>
		</div>
		<!-- <div class="box02">
			<span slot="text" style="line-height:40px;text-align:left;font-size:15px;">订单号：SN20171205164568TY</span>
			<div>
				
				<div class="image"></div>
				<div class="title">
				<span style="font-size:15px;">课程名称:韦小宝</span>
				<ul style="margin-top:10px;">
					<li style="color:#999"></li>
				</ul>
				</div>
				<yd-icon slot="icon" class="icon-bofang" custom size="24px" style="float:right;line-height:48px;color:#ff9600;"></yd-icon>
			</div>
			<div class="clearfix"></div>
			
		</div> -->

   
	</div>
</template>

<script>
import course_mycourse_controller from "./course_mycourse_controller";
export default course_mycourse_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.course-content{
	padding-top:40px;
}
.box01{
	border-bottom:solid 1px #e2e2e2;
	text-align: left;
	width:100%;
	background-color: #fff;
	padding-bottom:12px;
	padding-left:12px;
	padding-right:12px;
	}
.image{
	width:64px;
	height:64px;
	background-color: #333;
	float:left;
	}
.title{
	float:left;
	margin-left:10px;
	}
.clearfix{
	clear:both;
	}

</style>