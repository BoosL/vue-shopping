<template>
    <div id="love_index">
    	<c-title :hide="false" :text='coin_name' ></c-title>
    	<div style="height: 120px;"></div>
    	<center><i class="fa fa-balance-scale" ></i></center>
    	<p class="my-banlance">可用<font>{{coin_name}}</font><br /><span>￥<b>{{usable}}</b></span>
    		<br /><div id="djj">冻结{{coin_name}}{{froze}}元</div>
    	</p>
		<p>
			<el-button type="success" @click="chargeHandel" v-if="transfer_status">转账</el-button><br />
			<el-button type="success" @click="toBalance">提现到余额</el-button>
		</p>
		<div id="jh">
			<span id="jhst"><router-link :to="fun.getUrl('overseas_record')">激活记录</router-link></span>
			<span><router-link :to="fun.getUrl('overseas_list')">查看明细</router-link></span>
		</div>
		<div id="helps">
			<router-link :to="fun.getUrl('overseas_explain')"><p>?</p>{{coin_name}}说明</router-link>
		</div>
    </div>
</template>
<script>
import overseas_index_Controller from './overseas_index_Controller';
export default overseas_index_Controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#love_index{
	button{width: 70%;margin: 5px 0;}
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