<template>
    
    <div id="details">
    	<c-title :hide="false" text='提现详情'></c-title>
    	<div style="height: 45px;"></div>
		<div class="tbs">
			<div class="left" style="flex: 100%;">提现编号  {{withdraw_sn}}</div>
			<div class="left" style="flex: 20%;"><span class="">提现类型</span></div>
			<div class="right" style="flex: 80%;"><span class="red">{{type_name}}</span></div>
			<div class="left">提现金额</div>
			<div class="right">{{amounts}}元</div>
			<div class="left" style="flex: 20%;">提现时间</div>
			<div class="right" style="flex: 80%;">{{created_at}}</div>	
			<div class="left">提现手续费</div>
			<div class="right">{{actual_poundage}}元</div>
			<div class="left">打款金额</div>
			<div class="right">{{actual_amounts}}元</div>	
		</div>
		<div class="tbs" v-for=" item in incomes">
			<!--<div class="left" style="flex: 60%;">订单编号  {{item.order_sn}}</div>
			<div class="right" style="flex: 40%;">订单金额  {{item.price}}元</div>-->
			<div class="left"style="flex: 40%;">计算金额:  {{item.commission_amount}}元</div>
			<div class="right" style="flex: 60%;">结算方式: {{item.formula}}</div>
			<div class="left"style="flex: 40%;">佣金:  {{item.commission}}元</div>
			<div class="right" style="flex: 60%;">比例: {{item.commission_rate}}%</div>
			
			<!--<div class="goods">
				<div class="img"><img src="http://www.heliaigou.com/attachment/images/0/2016/12/Nw93tt3t5T9v3C5527Rjw9Xwwr22W9.jpg"></div>
				<div class="name"><font>奥康增高男鞋 新款真皮系带隐形内增高皮鞋韩版休闲鞋透气低帮鞋</font><span>收入类型：51.01元</span></div>
				<div class="option"><font>1级</font><span class="red">已审核</span></div>
			</div>-->
		</div>
		<!--<div class="tbs">
			<div class="left" style="flex: 60%;">订单编号  1181559382029</div>
			<div class="right" style="flex: 40%;">订单金额  200.00元</div>
			<div class="left"style="flex: 40%;">申请金额  100元</div>
			<div class="right" style="flex: 60%;">审核通过金额 86.00元</div>
			
			<div class="goods">
				<div class="img"><img src="http://www.heliaigou.com/attachment/images/0/2016/12/Nw93tt3t5T9v3C5527Rjw9Xwwr22W9.jpg"></div>
				<div class="name"><font>奥康增高男鞋 新款真皮系带隐形内增高皮鞋韩版休闲鞋透气低帮鞋</font><span>收入类型：51.01元</span></div>
				<div class="option"><font>1级</font><span class="red">已审核</span></div>
			</div>
			<div class="goods">
				<div class="img"><img src="http://www.heliaigou.com/attachment/images/0/2016/12/Nw93tt3t5T9v3C5527Rjw9Xwwr22W9.jpg"></div>
				<div class="name"><font>奥康增高男鞋 新款真皮系带隐形内增高皮鞋韩版休闲鞋透气低帮鞋</font><span>收入类型：51.01元</span></div>
				<div class="option"><font>1级</font><span class="red">已审核</span></div>
			</div>			
		</div> 		-->
    </div>
   
</template>
<script>
import member_income_presentationRecord_presentationDetails_controller from './member_income_presentationRecord_presentationDetails_controller';
export default member_income_presentationRecord_presentationDetails_controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#details{
	.tbs{ display: flex;align-items:center; background: #FFF; flex-flow: row wrap; padding:10px; line-height: 1.5rem; margin-bottom: 10px;
		.left{text-align: left;flex: 65%;color:#000;}
		.right{text-align: right;flex: 35%;}
		.red{color: red;}
		.goods{display: flex;align-items:stretch; flex-flow: row wrap;background: #e6e6e6;padding: 5px;margin-top: 5px;}
		.img{flex: 25%; img{width: 100%;margin-top: 7px;}}
		.name{flex: 60%;text-align: left;padding:0 10px;box-sizing: border-box;display: flex;flex-direction:column;align-items: flex-start;
		font{flex: 5;} span{flex: 1;}
		}
		.option{flex: 15%;display: flex;flex-direction:column;align-items: flex-start; 
			font{flex: 5; text-align: right;width: 100%;}
			.red{flex: 1;text-align: right;width: 100%;}
			}
			
	}
}
</style>