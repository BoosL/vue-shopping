<template>
    <div id="love_transfer">
    	<c-title :hide="false" :text='love_name +"转账"' ></c-title>
    	<div style="height: 60px;"></div>
    	<center><i class="fa fa-heart" ></i></center>
    	<p class="my-banlance">激活{{love_name}}<br /><span>￥<b>{{usable}}</b></span></p>
    	<mt-field label="会员ID" v-model="recharge_id" placeholder="请输入您要转账的会员ID" id='love_id'></mt-field>
    	<div class="inputs">
    	<label for="male">{{love_name}}</label>
    	<input type="text" v-model="recharge_value" :placeholder="'请输入您要转账的'+love_name" id="male"/>
    	</div>
    	<!--<mt-field :label="love_name" v-model.lazy="recharge_value" :placeholder="'请输入您要转账的'+love_name" ></mt-field>-->
		<p><el-button type="success" @click="getBalance">确认转账</el-button><br /></p>
		<p>注：转账{{love_name}}不能小于{{transfer_fetter}},且为{{transfer_multiple}}的整数倍。<br />转让手续费比率为{{ratio}}%，<br />您实际转账到数为：{{(recharge_value-recharge_value*ratio/100)}}</p>
    </div>
</template>
<script>
import love_transfer_controller from './love_transfer_controller';
export default love_transfer_controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#love_transfer{
	.inputs{background: #FFF;width: 100%;padding: 10px 10px; box-sizing: border-box; display: flex;
		input{border: 0;    -webkit-appearance: none;-moz-appearance: none;
    appearance: none; border-radius: 0; -webkit-box-flex: 1; -ms-flex: 1; flex: 1;outline: 0;line-height: 1.6; font-size: inherit;font-size: 16px;}
		label{font-size: 16px;line-height: 1.6;  width: 105px;display: block;}
	}
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