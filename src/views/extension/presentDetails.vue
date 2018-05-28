<template>
    <div id="commission">
    	<c-title :hide="false" text='已提现佣金详情'></c-title>
    	<div style="height: 40px;"></div>
    <div class="atitem">
	    <div class="times">预计收入  <font>+3</font></div>
	    <div class="tbs">
	    	<div class="item1">分销等级</div>
	    	<div class="item2">等级名称  一级</div>
	    	<div class="item1">结算佣金</div>
	    	<div class="item2">5%</div>
	    	<div class="item1">结算天数</div>
	    	<div class="item2">5</div>
	    	<div class="item1">分佣时间</div>
	    	<div class="item2">--</div>
	    	<div class="item1">提现时间</div>
	    	<div class="item2">--</div>
	    	<div class="item1">提现方式</div>
	    	<div class="item2">--</div>		    	
	    </div>
	</div>

    <div class="atitem">
    	<div class="goods">
    		<b><img src="../../assets/images/forecast.png"/></b>
    		<font>商品名称</font>
    		<span>500</span>
    	</div>
	    <div class="tbs">
	    	<div class="item1">订单号</div>
	    	<div class="item2">SHE91234656165456451335</div>
	    	<div class="item1">支付金额</div>
	    	<div class="item2">500.45</div>
	    	<div class="item1">确认收货时间</div>
	    	<div class="item2">2017.09.11 09:32:22</div>    	
	    </div>
	</div>

    </div>
   
</template>
<script>
import presentDetails from './presentDetails_controller';
export default presentDetails;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#commission{
	.times{text-align: left;text-indent: 10px;line-height: 2rem; border-bottom: #D9D9D9 solid 1px; font-weight: bold; font-size: 1rem; 
		font{color: #008000;padding-left: 13px;};
		}
	.atitem{padding: 10px;background: #FFF;margin-bottom: 10px;}
	.goods{display: flex;align-items:center;flex-wrap:wrap;
		b{flex: 2; img{width: 80%;}}
		font{flex: 5;text-align: left;}
		span{flex: 1;text-align: right;}
	}
	.tbs{
		background: #FFF;overflow: hidden;display: flex;align-items:center;flex-wrap:wrap; padding: 10px 0;line-height: 1.5rem;
		.item1{ color: #a79d9d;flex:35%;text-align: left;padding-left: 15px;box-sizing: border-box;}
		.item2{flex:65%;text-align: left;color: #000;
			.reg{color:#259B24;}
		}
	}
}
</style>