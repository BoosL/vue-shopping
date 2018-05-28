<template >
<div id="balance_recharge">
	<c-title :hide="false" text='提现'></c-title>
	<div style="height: 50px;"></div>
	<div class="my_wrapper">
		<span>当前余额</span>
		<div class="my-value"><span>{{balance}} </span> 元</div>
	</div>
	<mt-field label="提现金额" v-model="info_form.balance_money" placeholder="请输入提现金额"></mt-field>
	<div style="height: 10px;"></div>

	<div style="height: 10px;">{{poundage}}</div>
	<!--<mt-button type="primary" size="large" @click="confirm">确认提现</mt-button>-->
	<div id="payBtnList">
		<div class="mod_btns" id="wechatpay">
			<a @click="confirm(1)" class="mod_btn bg_wechat" v-if="withdrawToWechat">提现到微信</a>
		</div>
		<div class="mod_btns" id="alipay">
			<a @click="confirm(2)" class="mod_btn bg_ali" v-if="withdrawToAlipay">提现到支付宝</a>
		</div>
		<div class="mod_btns" id="manual">
			<a @click="confirm(3)" class="mod_btn bg_manual" v-if="withdrawToManual">手动提现</a>
		</div>
	</div>
</div>
</template>
<script>
	import member_balance_withdrawals from './member_balance_withdrawalscontroller';
	export default member_balance_withdrawals;

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	#balance_recharge{
	.my_wrapper{background: #FFF; overflow: hidden; display: flex; padding: 15px;
	span{width:80px;text-align: left;
		font-size: 16px;line-height: 1;}
	.my-value{flex: 2;text-align: left; span{color: red;}}
	}

	}
	.mint-field .mint-cell-title {
		width: 80px;
		-webkit-box-flex: 0;
		-ms-flex: none;
		flex: none;
		text-align: left;
		margin-left: 15px;}

	#payBtnList {
	.mod_btns {  margin: 10px 0;height: 40px;  line-height: 40px;  font-size: 1rem;
	.mod_btn{display: block;width: 96%;margin: 20px 2%;border-radius: 5px;}
	.mod_btn.bg_wechat {background: #26ce29;color: #fff;}
	.mod_btn.bg_ali {background: #22aaed;color: #fff;}
	.mod_btn.bg_manual {background: #C31F2A;color: #fff;}

	}}
</style>