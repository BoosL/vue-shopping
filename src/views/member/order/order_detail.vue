<template v-title="订单详情">
    
    <div id="goodsinfo">
    	<c-title :hide="false" text='订单详情'></c-title>

    	<div style="height: 42px;"></div>
    	<div class="addr" v-if="pay_type_id == '' && orderType == 'shop' && order_data.is_virtual == 0">
    		<i class="fa fa-map-marker"></i>
			<ul class="addr-info">
    		<li style="margin-bottom:8px;font-size:14px;">收件人：{{receiver}}&nbsp;&nbsp;&nbsp;（{{mobile}}）</li>
    		<li style="color:#888">{{address}}</li>
			</ul>
			<div class="clearfix"></div>
    	</div>
    	<div class="detail_good">
    		<h3></h3>
            <div class="goods" v-for="good in order_data.has_many_order_goods" @click="toGoodsDetail(good, order_data.is_virtual,good.is_course)">
                <div class="img"><img  v-lazy="good.thumb"></div>
                <ul class="inner">
                    <li class="name">{{good.title}}</li>     
                    <li class="option" v-show="order_data.is_virtual == 0">规格:  {{good.goods_option_title}}</li>
                </ul>
                <ul class="price">
                    <li class="money">￥{{good.goods_price}}</li>   
					<li class="option">×{{good.total}}</li>
                </ul>
            </div>
    	</div>
    	<div class="detail_good" v-if="0">
    		<h3><i class="fa fa-truck"></i>发货信息</h3>
    		<div class="content" >
    			1、激活码：553321  中国移动：135 911 234 56  链接：<a href="#">点攻击链接</a><br />
    			2、激活码：967454  中国移动：137 334 234 56  链接：<a href="#">点攻击链接</a><br />
    		</div>
    	</div>	
    	<div class="tbs">
			<div class="tbs-number-tra">
			<ul class="number">
			<li class="left">订单编号:</li>
			<li class="right">{{order_data.order_sn}}</li>
			<div class="clearfix"></div>
			</ul>
			<ul class="tra">
			<li class="left">交易状态:</li>
			<li class="right">{{order_data.status_name}}</li>
			<div class="clearfix"></div>
			</ul>
			</div>
			<template v-if="order_data.cashier_order">
				<div class="left">下单时间:</div>
				<div class="right">{{order_data.cashier_order.created_at}}</div>
				<div class="left">姓名:</div>
				<div class="right">{{order_data.cashier_order.realname}}</div>
				<div class="left">电话:</div>
				<div class="right">{{order_data.cashier_order.mobile}}</div>
			</template>
			
			<template v-if="order_data.has_one_pay_type">
				<ul class="Pay-method">
				<li class="left">支付方式:</li>
				<li class="right">{{order_data.has_one_pay_type.name}}</li>
				</ul>
			</template>
			
			<template  v-for="info in order_data.order_discount">
				<ul class="Discount">
				<li class="left">{{info.name}}:</li>
			    <li class="right">￥{{info.amount}}</li>
				</ul>
			</template>
			<!--<div class="left">总抵扣:</div>
			<div class="right">￥{{order_data.deduction_price}}</div>
			<div class="left">总优惠:</div>
			<div class="right">￥{{order_data.discount_price}}</div>-->
			<template  v-if="pay_type_id == '' && orderType == 'shop'">
			<ul class="Fre">
			<li class="left">运费:</li>
			<li class="right">￥{{order_data.dispatch_price}}</li>
			</ul>
			</template>
			<ul class="Sub">
			<li class="left">商品小计:</li>
			<li class="right">￥{{order_data.goods_price}}</li>
			</ul>
			<ul class="Real-pay">
			<li class="left">实付费(含运费):</li>
			<li class="right">￥{{order_data.price}}</li>	
			</ul>	
    	</div>
		<div class="detail_pay">
		    <div class="order_delete" v-for="(item,index) in order_data.button_models" @click="operation(item,order_data)" >{{item.name}}</div>
		</div>
		<div class="qrcode">
		<mt-popup v-model="showQrcode" position="right" modal="false">
			<img :src="qrcode" style="width:100%">
			<div style="height: 30px;">请核销员扫码</div>
		</mt-popup>
		</div>
    </div>

</template>
<script>
import order_detailcontroller from './order_detailcontroller';
export default order_detailcontroller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.qrcode{
		width:100%;
		margin: 0 auto;
	}
#goodsinfo{
	.addr{text-align: left;padding:0 12px;background: #FFF; border-bottom: #e2e2e2 1px solid; margin-bottom: 4px; padding-top: 12px; padding-bottom: 12px;
		i{font-size: 16px;color:#333;float:left;margin-right: 10px;margin-top: 1px;}
		p{text-align: left; span{color: #858585;font-size: .6rem;}}
	.addr-info{
		float:left;
	}
	.clearfix{clear:both;}
	}
	.detail_good{background: #FFF;overflow: hidden;
		.content{text-align: left;background: #efeded;padding: 10px;color: #8C6700;}
		a{color: #000000;}
		h3{text-align: left;margin: 9px 0; i{font-size:20px;padding-right: 5px;}}
		.goods{display: flex;align-items: stretch;  flex-flow: row wrap;
				padding:12px 12px;
			.img{flex:3; img{width: 100%;height:100%;}}
			.inner{flex: 5;padding: 0 5px;display: flex;flex-direction:column;align-items: flex-start;}
			.name{ text-align: left;margin-bottom:10px;}
			.money{margin-bottom:10px;}
			.price{flex: 2;align-items:center;text-align: right;}
			.option{color: #888;font-size: .6rem;flex: 1;}
			}
		}
	.tbs{ display: flex;align-items:center; background: #FFF;
		 flex-flow: row wrap;line-height: 1.5rem;border-bottom:solid 1px #e2e2e2;
		.left{float: left;flex: 40%;color:#858585;}
		.right{float: right;flex: 60%;}
		.tbs-number-tra{
			width:100%;
			border-bottom: solid 1px #e2e2e2;
			border-top: solid 1px #e2e2e2;
			padding:0px 12px;
		}
		.Sub,.Real-pay,.Fre{
			width:100%;
			border-top: solid 1px #e2e2e2;
			padding:6px 12px;
		}
	
		.Real-pay{
			font-size:14px;
			.right{color:#f15353;font-weight: bold;font-size: 16px;}
		}
		.Fre{
			margin-top: 6px;
		}
		.Discount{
			line-height: 28px;
			width:100%;
			padding:0px 12px;
		}
		.number,.tra{
			line-height: 28px;
		.clearfix{clear:both;}
		}
	   	.Pay-method{
			   width:100%;
			padding:6px 12px;
			border-bottom: solid 1px #e2e2e2;
		   }
	}
.detail_pay { height: 3rem; width: 100%; background: #fff; padding: 0px 12px; margin-top: 30px; border-top: 1px solid #eaeaea;
    position: fixed; bottom: 0px; box-sizing: border-box;
    .order_delete {height: 1.5rem;width:25%; margin-left: 10px; background: #fff; padding: 0px 10px; margin-top: 12px; border-radius: 12px; color: #333;
    line-height: 1.5rem; float: right; border: 1px solid #b1a6a6;}
    }	
}
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
	.mint-header{	background: none;color: #666;}
	.is-fixed .mint-header-title{font-weight: bold;}
	.mint-header.is-fixed{border-bottom: 1px solid #e8e8e8;background: #FFF;z-index: 99;}
	.is-right a{font-size: .6rem;}
</style>