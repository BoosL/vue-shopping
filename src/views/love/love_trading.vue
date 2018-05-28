<template>
	<div id="love_list">
		<c-title :hide="false"
				 :text='love_name+"交易中心"'></c-title>

		<div style="height: 40px;"></div>
		<mt-navbar v-model="selected">
			<mt-tab-item id="0"
						 @click.native="switchItem">全部交易</mt-tab-item>
			<mt-tab-item id="1"
						 @click.native="switchItem">交易中</mt-tab-item>
			<mt-tab-item id="2"
						 @click.native="switchItem">已完成</mt-tab-item>
			<mt-tab-item id="3"
						 @click.native="switchItem">我的交易</mt-tab-item>

		</mt-navbar>
		<!--<mt-loadmore v-if="goload"
                     :top-method="loadTop"
                     :bottom-method="loadBottom"
                     :bottom-all-loaded="allLoaded"
                     ref="coupon_loadmore"
                     bottomPullText=''
                     bottomDropText='下拉加载...'
                     bottomLoadingText=''
                     :autoFill='true'
                     id='olis'>-->
		<mt-tab-container v-model="selected">

			<div class="coupon_card">
				<mt-tab-container-item id="0">
					<!--全部-->
					<div class="tbs"
						 v-for='(item,index) in wait_used'>
						<div class="left titles">{{love_name}}：{{item.amount}}元</div>
						<div class="right reds">{{item.type_name}}-{{item.status_name}}</div>
						<div class="left">{{item.created_at}}</div>
						<div class="right" v-if="item.status==0 && item.own" @click="revoke(item.id)">点击撤回</div>
						<div class="right" v-if="item.status==0 && !item.own" @click="purchase(item.id)">点击购买</div>
					</div>
				</mt-tab-container-item>

				<mt-tab-container-item id="1">
					<!--进行中-->
					<div class="tbs"
						 v-for='(item,index) in underway'>
						<div class="left titles">{{love_name}}：{{item.amount}}元</div>
						<div class="right reds">{{item.type_name}}-{{item.status_name}}</div>
						<div class="left">{{item.created_at}}</div>
						<div class="right" v-if="item.status==0 && item.own" @click="revoke(item.id)">点击撤回</div>
						<div class="right" v-if="item.status==0 && !item.own" @click="purchase(item.id)">点击购买</div>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="2">
					<!--已完成-->
					<div class="tbs"
						 v-for='(item,index) in done'>
						<div class="left titles">{{love_name}}：{{item.amount}}元</div>
						<div class="right reds">{{item.type_name}}-{{item.status_name}}</div>
						<div class="left">{{item.created_at}}</div>
					</div>

				</mt-tab-container-item>
				<mt-tab-container-item id="3">
					<!--自己的-->
					<div class="tbs"
						 v-for='(item,index) in own'>
						<div class="left titles">{{love_name}}：{{item.amount}}元</div>
						<div class="right reds">{{item.type_name}}-{{item.status_name}}</div>
						<div class="left">{{item.created_at}}</div>
						<div class="right" v-if="item.status==0 && item.own" @click="revoke(item.id)">点击撤回</div>
					</div>

				</mt-tab-container-item>
			</div>

		</mt-tab-container>
		<!--</mt-loadmore>-->

	</div>
</template>
<script>
    import love_trading_controller from './love_trading_controller';
    export default love_trading_controller;

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	@import '../../assets/css/love_list.scss'
</style>