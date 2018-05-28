<template>
	<div id="rentMyOrder">
		<c-title :hide="false" text='我的订单'></c-title>
		<div style="height:40px;"></div>
		<div class="grandparent">
			<div class="allTitle">
				<mt-navbar v-model="selected" id='tabcon'>
					<mt-tab-item id="0" @click.native="swichTabTItem">全部</mt-tab-item>
					<mt-tab-item id="1" @click.native="swichTabTItem">待付款</mt-tab-item>
					<mt-tab-item id="2" @click.native="swichTabTItem">待发货</mt-tab-item>
					<mt-tab-item id="3" @click.native="swichTabTItem">待收货</mt-tab-item>
					<mt-tab-item id="4" @click.native="swichTabTItem">待归还</mt-tab-item>
					<mt-tab-item id="5" @click.native="swichTabTItem">归还中</mt-tab-item>
					<mt-tab-item id="6" @click.native="swichTabTItem">已完成</mt-tab-item>
					<mt-tab-item id="7" @click.native="swichTabTItem">已转租</mt-tab-item>
					<mt-tab-item id="8" @click.native="swichTabTItem">已取消</mt-tab-item>
				</mt-navbar>
	
			</div>
		</div>
	
		<div style="height:45px;"></div>
	
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='false' id='olis'>
			<mt-tab-container v-model="selected">
				<mt-tab-container-item id="0">
					<cOrderList :datasource="orderList" :status="0" class='osll'></cOrderList>
				</mt-tab-container-item>
				<mt-tab-container-item id="1">
					<cOrderList :datasource="orderList" :status="1" class='osll'></cOrderList>
				</mt-tab-container-item>
	
				<mt-tab-container-item id="2">
					<cOrderList :datasource="orderList" :status="2" class='osll'></cOrderList>
				</mt-tab-container-item>
	
				<mt-tab-container-item id="3">
					<cOrderList :datasource="orderList" :status="3" class='osll'></cOrderList>
				</mt-tab-container-item>
	
				<mt-tab-container-item id="4">
					<cOrderList :datasource="orderList" :status="4" class='osll'></cOrderList>
				</mt-tab-container-item>
	
				<mt-tab-container-item id="5">
					<cOrderList :datasource="orderList" :status="5" class='osll'></cOrderList>
				</mt-tab-container-item>
	
				<mt-tab-container-item id="6">
					<cOrderList :datasource="orderList" :status="6" class='osll'></cOrderList>
				</mt-tab-container-item>
	
				<mt-tab-container-item id="7">
					<cOrderList :datasource="orderList" :status="7" class='osll'></cOrderList>
				</mt-tab-container-item>
				<mt-tab-container-item id="8">
					<cOrderList :datasource="orderList" :status="8" class='osll'></cOrderList>
				</mt-tab-container-item>
			</mt-tab-container>
		</mt-loadmore>
		<div class="loadNomore" v-show='allLoaded'>
			<img src="assets/images/no-more-product.png" />
		</div>
		<div style="height:70px"></div>
		<c-Footer></c-Footer>
	</div>
</template>
<script>
import rentMyOrderController from './rentMyOrderController';
export default rentMyOrderController;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.osll {
	min-height: 100vh;
}

.contes {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 35px;
	background: #FFF;
	line-height: 35px;
	border-top: #e2e2e2 solid 1px;
	text-align: right;
	button {
		border: solid 1px #f15353;
		background: #FFF;
		border-radius: 14px;
		margin-right: 5px;
		color: #f15353;
	}
}

.loadNomore img {
	width: 20%;
}

#rentMyOrder {
	box-sizing: border-box;
	overflow-x: hidden;
	overflow-y: hidden;

	.grandparent {
		width: 100%;
		height: 45px;
		overflow-x: auto;
		overflow-y: hidden;
		position: fixed;
		z-index: 9;
		.allTitle {
			width: 150%;
			height: 45px;
			background: #f00;
			.mint-navbar {
				top: 40px;
				width: 150%;
			}
		}
	}
}
</style>