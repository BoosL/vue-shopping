<template >
<div id="balance_recharge">
	<c-title :hide="false" text='转账'></c-title>
	<div style="height: 50px;"></div>
	<div class="my_wrapper">
		<span>当前余额</span>
		<div class="my-value"><span>{{balance}} </span> 元</div>
	</div>
	<mt-field label="受让人ID" v-model.lazy="transfer_id" placeholder="请输入受让人ID"></mt-field>
	<mt-field label="转账金额" v-model="info_form.transfer_money" placeholder="请输入转账金额"></mt-field>
	<div style="height: 10px;"></div>
	<div class="my_wrapper" v-if="memberInfo">
		<span>昵称</span>
		<div class="my-value">{{memberInfo.nickname}}</div>
	</div>
	<div class="my_wrapper" v-if="memberInfo">
		<span>姓名</span>
		<div class="my-value">{{memberInfo.realname}}</div>
	</div>

	<div style="height: 10px;"></div>
	<mt-button type="primary" size="large" @click="confirm">确认转账</mt-button>
</div>
</template>
<script>
	import member_balance_transfer from './member_balance_transfercontroller';
	export default member_balance_transfer;
 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#balance_recharge{
	.my_wrapper{background: #FFF; overflow: hidden; display: flex; padding: 15px;
		span{width: 80px;
			text-align: left;
			font-size: 16px;
			/*line-height: 1;*/}
		.my-value{flex: 2;text-align: left; span{color: red;}}
	}
	
}

</style>