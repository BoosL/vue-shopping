<template>
	<div id="rentCharge">
		<c-title :hide="false" text='押金充值'></c-title>
		<div style="height: 50px;"></div>
		<div class="my_wrapper">
			<span>当前押金</span>
			<div class="my-value">{{currentMoney}} 元</div>
		</div>
		<mt-field label="充值金额" v-model="recharge_money" type="number" placeholder="请输入充值金额"></mt-field>
		<div style="height: 10px;"></div>
		<div class="mod_btns">
			<a class="mod_btn bg_ali" v-if="alipay" @click="charge(2)">支付宝充值</a>
			<a class="mod_btn bg_ali" v-if="credit" @click="charge(3)">余额充值</a>
			<a class="mod_btn bg_wechat" v-if="wechat" @click="charge(1)">微信充值</a>
		</div>
	
	</div>
</template>

<script>
import rentCharge_controller from './rentCharge_controller';
export default rentCharge_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#rentCharge {
	.my_wrapper {
		background: #FFF;
		overflow: hidden;
		display: flex;
		padding: 10px;
		span {
			flex: 1;
			font-size: 16px;
			line-height: 1;
		}
		.my-value {
			flex: 2;
			text-align: left;
			span {
				color: red;
			}
		}
	}
	.mod_btns {
		margin: 10px 0;
		height: 40px;
		line-height: 40px;
		font-size: 1rem;
		.mod_btn {
			display: block;
			width: 96%;
			margin: 20px 2%;
			border-radius: 5px;
		}
		.mod_btn.bg_wechat {
			background: #26ce29;
			color: #fff;
		}
		.mod_btn.bg_ali {
			background: #22aaed;
			color: #fff;
		}
	}
}
</style>