<template>
	<div id="rentDeposit">
		<c-title :hide="false" text='押金提现'></c-title>
		<div style="height: 50px;"></div>
		<div class="my_wrapper">
			<span>当前押金</span>
			<div class="my-value">{{deposit}} 元</div>
		</div>
		<div class="my_wrapper">
			<!--<span>提现金额</span>-->
			<!--<div class="my-value">
				<span>{{chargeMoney}}</span> 元</div>-->
				<mt-field label="提现金额" v-model="withdraw_money" type="number" placeholder="请输入提现金额"></mt-field>
		</div>
		<div style="height: 10px;"></div>
		<div class="mod_btns">
			<a class="mod_btn bg_ali" v-if="alipay" @click="withdraw(2)">提现到支付宝</a>
			<a class="mod_btn bg_ali" v-if="balance" @click="withdraw(3)">提现到余额</a>
			<a class="mod_btn bg_wechat" v-if="wechat" @click="withdraw(1)">提现微信</a>
		</div>
	
	</div>
</template>

<script>
import rentDeposit_controller from './rentDeposit_controller';
export default rentDeposit_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#rentDeposit {
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