<template>
	<div id="all">
		<c-title :hide="false" text='活动报名'></c-title>
		<div style="height: 40px;"></div>

		<template v-for=" item in conference">
			<div id="member">
				<div id="tool">
					<h3 class="c-content">{{item.title}}</h3>
					<ul style="height:130px;">
						<li>
							<dt v-if="item.thumb"><img v-lazy="item.thumb" /></dt>
							<dt v-if="!item.thumb"><img src="../../../static/app/images/coupon.png" /></dt>
						</li>
					</ul>

					<h3>
						<span>活动时间</span><span style="float:right;padding-right: 5px;font-size: 12px;color: green;">{{item.starttime}} 至 {{item.endtime}}</span>
					</h3>
					<!-- 未报名 -->
					<template v-if="item.is_enrol==0">
						<!-- 未报名 未结束-->
						<h3 class="c-button" v-if="item.is_end==0&&item.max_limit!=item.total">
							<router-link class="y8" :to="fun.getUrl('activity', {id:item.id})">
									<mt-button size="small" type="danger">我要报名</mt-button>
							</router-link>
						</h3>
						<!-- 未报名 未结束 已满园-->
						<h3 class="c-button" v-else-if="item.is_end==0&&item.max_limit==item.total">
							<mt-button size="small" type="danger" disabled>报名人数已满，请等待下次活动或者选择其他活动</mt-button>
						</h3>
						<!-- 未报名 已结束-->
						<h3 class="c-button" v-else-if="item.is_end==1">
							<mt-button size="small" type="danger" disabled>活动已过期，请等待下次活动或者选择其他活动</mt-button>
						</h3>
					</template>
					<!-- 已报名 -->
					<template v-else-if="item.is_enrol==1">
						<!-- 已报名 未结束-->
						<h3 class="c-button" v-if="item.is_end==0">
							<mt-button size="small" type="danger" @click="onActivityInfo(item.id)">已报名，点击查看报名信息</mt-button>
						</h3>
						<!-- 已报名 已结束-->
						<h3 class="c-button" v-else-if="item.is_end==1">
							<mt-button size="small" type="danger" disabled>活动已过期，请等待下次活动或者选择其他活动</mt-button>
						</h3>
					</template>

				</div>
				<div style="height: 10px;clear: both;"></div>
			</div>
		</template>

	</div>
</template>

<script>
import home from './home_controller';
export default home;

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/css/member.scss';
.c-content {
	font-size: 14px;
	border-top: 1px solid #f5f3f3;
	line-height: 40px !important;
  height: 40px !important;
}

.c-button {
	height: 60px !important;
	line-height: 60px !important;
	text-align: center !important;
	padding-left: 0px !important;
}

.mint-button--danger {
	color: #fff;
	background-color: #1cc015;
}

#tool ul li {
	width: 100% !important;
	height:35vw !important;
	padding: 0 !important;
}
#tool ul li img{
	width: 100% !important;
	height:34vw !important;
}
</style>
