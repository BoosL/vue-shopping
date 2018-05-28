<template>
	<div id="course">
		<c-title :hide="false" text='课程详情'></c-title>
		<div style="margin-top:40px;">
			<div class="box01" v-if="is_show">
				<ul class="title" style="padding-top:20px;">
					<li style="margin-bottom:10px;">{{goodTit}}</li>
					<li>售价¥ {{goodPrice}}</li>
				</ul>
				<div class="watch" @click="study()" v-if="isLook"><span style="line-height:30px;color:white;">立即观看</span> </div>
				<div class="watch" @click="buy()" v-if="!isLook"><span style="line-height:30px;color:white;">立即购买</span> </div>
			</div>
			<div class="box-con" v-if="is_vshow">
				<video width="320" height="240" controls="controls" autoplay="autoplay" style="height: auto;width: 100%;">
					<source :src="vedioSrc" type="video/ogg" />
					<source :src="vedioSrc" type="video/mp4" />
					<source :src="vedioSrc" type="video/webm" />
				</video>
			</div>
		</div>
		<div class="box02">
			<div style="font-size:15px;line-height:36px;margin-left:12px;margin-right:12px;">
				<span style="text-align:left;font-weight:bold;">目录摘要</span><span style="margin-left:4px;">共{{chapterNum}}节</span>
			</div>
			<div style="width:calc(100% - 12px);height:1px;background-color:rgba(178, 178, 178, 0.5);margin-left:12px;"></div>
			<ul style="margin-left:12px;margin-right:12px;font-size:14px;padding-top:10px;padding-bottom:10px;">
				<li style="line-height:36px;" v-for="(item,index) in chapterList" @click="viewPermission(item.id,index,item.video_address,item.course_id,item.is_audition)">
					<yd-icon slot="icon" class="icon-bofang" custom size="20px" :class='{iconBofang:index==active}'></yd-icon>
					<span :class="{iconword:index==active}">第{{index+1}}节&nbsp;&nbsp;{{item.chapter_name}}</span><span slot="right" style="color:green" v-if="item.is_audition==0?false:true">【免费试听】</span>
				</li>
			</ul>
		</div>
		<div class="box03">
			<div class="left">
				<div class="touxiang">
					<img :src="teacherImg" style="width:100%;height:100%;border-radius:24px;">
				</div>
				<ul style="float:left;">
					<li style="font-size:15px;margin-bottom:8px;color:#f15353;">讲师</li>
					<li>{{teacherName}}</li>
				</ul>
			</div>
			<div class="anniu">
				<div @click="showPopReward" v-if="rewardBtnShow">
					<yd-button class="button">
						<span class="dashang">打赏</span></yd-button>
					<yd-icon slot="icon" class="icon-giftfill" color="#ffcd00" custom size="20px" style="position:relative;left:-55px;top:2px;"></yd-icon>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
		<div class="box04" v-if="contentShow">
			<div class="jieshao">课程介绍</div>
			<div style="width:100%;height:1px;background-color:rgba(178, 178, 178, 0.5);"></div>
			<p style="margin-right:12px;margin-top:10px;" v-html="goodsContent">
			</p>
		</div>
		<div v-if="pushShow">
			<div class="box06">

				<div class="like">猜你喜欢</div>
				<div style="width:100%;height:1px;background-color:rgba(178, 178, 178, 0.5);"></div>
			</div>
			<div class="like-box">
				<div style="flex:1;margin:5px;text-align:center;" v-for="item in pushGoodList">
					<div style="width:100%;height:68px;margin-bottom:6px;">
						<img :src="item.thumb" style="width:100%;height:100%;">
					</div>
					<span style="color:#f15353;margin-top:6px;">￥{{item.price}}</span>
				</div>
			</div>
		</div>
		<div class="box05">
			<!-- <div style="flex:1;width:100%;" v-if="is_study">
				<yd-button type="primary" style="width:100%;height:44px;padding:0px;" @click.native="study">立即学习</yd-button>
			</div> -->
			<div style="flex:1;width:100%;margin-right:9px;" v-if="is_update">
				<yd-button type="danger" style="width:100%;height:44px;padding:0px;" @click.native="update">升级会员</yd-button>
			</div>
			<div style="flex:1;width:100%;" v-if="is_buy">
				<yd-button type="warning" style="width:100%;height:44px;padding:0px;" @click.native="buy">单次购买</yd-button>
			</div>
		</div>
		<yd-popup v-model="rewardShow" position="bottom" height="176px">
			<yd-cell-group title="打赏金额" style="padding-top:5px;background-color:#f5f5f5;">
				<yd-cell-item>
					<span slot="left">¥&nbsp;</span>
					<yd-input slot="right" v-model="rewardMoney" required :show-success-icon="false" :show-error-icon="false" type="number" placeholder="请输入打赏金额"></yd-input>
				</yd-cell-item>
			</yd-cell-group>
			<yd-button-group>
				<yd-button type="primary" size="large" style="height:44px;" @click.native="confirmReward">确定打赏</yd-button>
			</yd-button-group>

		</yd-popup>
		<yd-actionsheet :items="actionSheetItems" v-model="actionSheetShow" cancel="取消" size="large"></yd-actionsheet>
	</div>

</template>

<script>
	import course_detail_controller from "./course_detail_controller";
	export default course_detail_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	video::-internal-media-controls-download-button {
		display: none;
	}
	
	video::-webkit-media-controls-enclosure {
		overflow: hidden;
	}
	
	video::-webkit-media-controls-panel {
		width: calc(100% + 40px);
	}
	
	.icon-bofang {
		color: #ccc;
	}
	
	.box01 {
		width: 100%;
		height: 200px;
		background-color: green;
		margin-top: 44px;
		padding-top: 16px;
	}
	
	.box02 {
		background-color: white;
		text-align: left;
	}
	
	.title {
		color: white;
	}
	
	.watch {
		width: 210px;
		height: 30px;
		background-color: orange;
		margin: 0 auto;
		border-radius: 4px;
		margin-top: 20px;
	}
	
	.box03 {
		width: 100%;
		background-color: white;
		padding: 24px 12px 24px 12px;
		margin-top: 8px;
	}
	
	.left {
		float: left;
	}
	
	.touxiang {
		width: 48px;
		height: 48px;
		background-color: #333;
		border-radius: 24px;
		float: left;
		margin-right: 10px;
	}
	
	.clearfix {
		clear: both;
	}
	
	.anniu {
		float: right;
	}
	
	.button {
		width: 64px;
		height: 36px;
		background-color: #ff3824;
		border-radius: 6px;
		margin-top: 6px;
		margin-right: -20px;
	}
	
	.dashang {
		margin-left: 30px;
	}
	
	.box04 {
		width: 100%;
		background-color: white;
		margin-top: 8px;
		padding-bottom: 30px;
		padding-left: 12px;
		text-align: left;
	}
	
	.box05 {
		width: 100%;
		margin-top: 8px;
		padding-left: 10px;
		padding-right: 10px;
		display: flex;
	}
	
	.like {
		line-height: 36px;
		font-size: 15px;
		text-align: left;
		margin-left: 5%;
	}
	
	.jieshao {
		line-height: 36px;
		font-size: 15px;
		text-align: left;
	}
	
	.box06 {
		width: 100%;
		background-color: white;
		margin-top: 8px;
	}
	
	.like-box {
		width: 100%;
		background-color: white;
		text-align: left;
		padding-top: 12px;
		padding-bottom: 8px;
		padding-left: 12px;
		padding-right: 12px;
		display: flex;
	}
	
	.iconBofang {
		position: relative;
		top: 1px;
		color: #ff9600;
	}
	
	.iconword {
		color: #ff9600;
	}
</style>