<template >
<div id="refund">
	<c-title :hide="false" :text="title"></c-title>
	<div style="height: 42px;"></div>
	<font>提示：您可退款的最大金额为{{money}}元</font>
	<div class="my_wrapper">
		<span>退款金额</span>
		<div class="my-value">{{money}}元</div>
	</div>
	<div class="my_wrapper">
		<span>处理方式</span>
		<div class="my-value">
			  <el-select v-model="form.refund_type" placeholder="请选择">
    				<el-option v-for="item in refundTypes"  :label="item.name" :value="item.value"></el-option>
  			  </el-select>
		</div>
	</div>
	<!--<div class="my_wrapper" v-show="value=='B'">
		<span>快递单号</span>
		<div class="my-value">
			<el-input v-model="express_number" placeholder="请输入快递单号"></el-input>
		</div>
	</div>	-->
	<div class="my_wrapper">
		<span>退款原因</span>
		<div class="my-value">
			  <el-select v-model="form.reason" placeholder="请选择">
    				<el-option v-for="item in reasons"  :label="item" :value="item"></el-option>
  			  </el-select>
		</div>
	</div>
	<mt-field  v-model="form.content" label="退款说明" placeholder="请输入退款说明" type="textarea" rows="1"></mt-field>
	<div style="height: 10px;"></div>
	<mt-button type="primary" size="large" @click="confirmRefund">提交申请</mt-button>
</div>
</template>
<script>
import order_list_refundcontroller from './order_list_refundcontroller';
export default order_list_refundcontroller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#refund{    text-align: left;
	font{background: #FFF;display: block;color: #f15353;line-height: 2rem;padding: 0 10px;font-size: .7rem;}
	.my_wrapper{background: #FFF; overflow: hidden; display: flex; padding: 10px; align-items: center;
		span{width:105px;flex: none;font-size: 16px;line-height: 1;}
		.my-value{flex: 2;text-align: left; span{color: red;}}
		.mint-popup{width: 100%;}
	}
	
}
</style>