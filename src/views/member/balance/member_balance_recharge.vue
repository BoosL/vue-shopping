<template >
<div id="balance_recharge">
	<c-title :hide="false" text='充值'></c-title>
	<div style="height: 50px;"></div>
	<div class="my_wrapper">
		<span>当前余额</span>
		<div class="my-value"><span>{{credit2}} </span> 元</div>
	</div>
	<mt-field label="充值金额" v-model="money" placeholder="请输入充值金额"></mt-field>

	<div style="height: 10px;"></div>

	<div id="payBtnList" v-if="recharge==1">
		<div class="mod_btns" v-for="btn in buttons">
			<a @click = "confirm(btn.value)" class="mod_btn" :class="[btnclass(btn.value)]">{{btn.name}}{{typename}}</a>
		</div>
	</div>
	<!--<mt-button type="primary" size="large" @click="confirm">确认充值</mt-button>-->
</div>
</template>
<script>
	import member_balance_recharge from './member_balance_rechargecontroller';
	export default member_balance_recharge;
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
		.mod_btn.bg_alipay {background: #FF6100;color: #fff;}
		.mod_btn.bg_ali {background: #22aaed;color: #fff;}

}}
</style>