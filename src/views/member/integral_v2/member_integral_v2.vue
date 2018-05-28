<template>
    <div id="balance">
    	<c-title :hide="false" text='积分' tolink='integrallist' totext='积分明细'></c-title>
    	<div style="height: 70px;"></div>
    	<center><i class="fa fa-diamond" ></i></center>
    	<p class="my-banlance">我的积分<br /><span><b>{{credit1}}</b></span></p>
		<p>
			<el-button v-if="false" type="success" @click="chargeHandel">充值</el-button><br />
			<el-button type="danger" @click="transferHandel">转账</el-button><br />
			<el-button  v-if="false" type="info" :plain="true" @click="withdrawHandel">提现</el-button>
		</p>
    </div>
</template>
<script>
import member_integral_v2Controller from './member_integral_v2Controller';
export default member_integral_v2Controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>

	button{width: 90%;margin: 5px;}
	i{font-size: 70px;  color: #666;}
	.my-banlance{margin: 20px 0;font-size: .9rem;  color: #333;line-height: 2rem;}
	.my-banlance span{font-size: .9rem;color: #f15353;margin-top:10px; }
	.my-banlance span b{font-size: 1.6rem;}
</style>