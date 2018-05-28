<template>
	<div id="commission">
		<c-title :hide="false"
		         text='未提现佣金'></c-title>
		<div style="height: 40px;"></div>
	
		<div v-for="item in datas">
	
			<div class="tbs">
				<div class="item1">{{item.order_sn}}
					<br/>{{item.price}}元</div>
				<div class="item2"><span class="reg">佣金   +{{item.commission}}</span>
					<br />{{item.created_at}}</div>
			</div>
	
		</div>
	
		<!--<div class="times">2017年3月</div>
			<router-link :to="{ name: 'notPresentDetails', params: { id: 12 }}">
				<div class="tbs">
					<div class="item1">商品名字
						<br/>984.15元</div>
					<div class="item2"><span class="reg">佣金   +3.00</span>
						<br />2013.09.05 09:51:05</div>
				</div>
			</router-link>-->
	
	</div>
</template>
<script>
import notPresent_controller from './notPresent_controller';
export default notPresent_controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#commission {
	.times {
		text-align: left;
		text-indent: 10px;
		line-height: 2rem;
		background: #dddddd;
	}
	.tbs {
		background: #FFF;
		overflow: hidden;
		display: flex;
		align-items: center;
		padding: 10px 0;
		border-bottom: 1px solid #D9D9D9;
		.item1 {
			color: #000;
			flex: 50%;
			text-align: left;
			padding-left: 15px;
		}
		.item2 {
			flex: 50%;
			text-align: right;
			color: #a79d9d;
			padding-right: 15px;
			.reg {
				color: #259B24;
			}
		}
	}
}
</style>