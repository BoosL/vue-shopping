<template>
    <div id="love_transfer">
    	<c-title :hide="false" :text='coin_name +"转账"' ></c-title>
    	<div style="height: 120px;"></div>
    	<center><i class="fa fa-balance-scale" ></i></center>
    	<p class="my-banlance">可用{{coin_name}}<br /><span>￥<b>{{usable}}</b></span></p>
    	<mt-field label="会员ID" v-model="recharge_id" placeholder="请输入您要转账的会员ID" id='love_id'></mt-field>
    	<mt-field :label="coin_name" v-model="recharge_value" :placeholder="'请输入您要转账的'+coin_name"></mt-field>
		<p><el-button type="success" @click="getBalance">确认转账</el-button><br /></p> 
		<p>注：转让手续费比率为{{ratio}}%，<br />您实际转账到数为：{{arrival_count}}</p>
    </div>
</template>
<script>
import overseas_transfer_controller from './overseas_transfer_controller';
export default overseas_transfer_controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#love_transfer{
	#love_id{border-bottom: 1px solid #CCCCCC;}
	button{width: 70%;margin: 15px;}
	i{font-size: 70px;  color: #666;}
	.my-banlance{margin: 20px 0;font-size: .9rem;  color: #333;line-height: 2rem;}
	.my-banlance span{font-size: .9rem;color: #f15353;margin-top:10px; }
	.my-banlance span b{font-size: 1.6rem;}
	#djj{margin: 15px 0;    font-size: 1.1rem;}
	#jh{
		#jhst{border-right: 1px solid #8C8C8C;padding-right: 15px;}
		span{padding: 0 15px;}
	}
	#helps{
		position: fixed;bottom: 0;left: 0;right: 0;    
		a{color:#607d8b;font-size: 0.8rem;}
		p{background: #e51c23;color: #FFF;border-radius: 50%;width: 20px;height: 20px;line-height: 20px;margin:0 auto;}
		
	}
}
</style>