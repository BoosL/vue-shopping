<template>
	<div id="paymentRecord">
		<c-title :hide="false" text='缴费记录'></c-title>
		<div style="height:40px"></div>
		
		<ul>
			<li v-for="pay in payments">
				<!--后台配合改变-->
				<label :class=" 'a'+pay.icon "><i :class=" 'iconfont '+pay.icon "></i></label>
				<div>
					<p> <span class="left">水费</span> <i class="right">充值成功</i></p>
					<p> <b class="left">2017-05-01 11:00:00</b> <span class="right">¥99.50</span></p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import cTitle from 'components/title';
export default {
	components: { cTitle },
	data() {
		return {
			payments:[
				{icon:"icon-guhua",name:"水费",state:"待付款",data:"2017-05-01 11:00:00",price:"¥99.50"},
				{icon:"icon-dianfei",name:"电费",state:"待付款",data:"2017-05-01 11:00:00",price:"¥99.50"},
				{icon:"icon-ranqifei",name:"燃气费",state:"待付款",data:"2017-05-01 11:00:00",price:"¥99.50"},
			]
			
//icon-shuifei   icon-dianfei  icon-ranqifei  icon-guhua  icon-kuandai
		}
	},
	
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#paymentRecord{
	li{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-flow: row;
		flex-flow: row;
		height: 60px;
		font-size: 16px;
		background: #fff;
		margin-bottom: 5px;
		padding-right: 15px;
		label{
			width: 33px;
			height: 33px;
			line-height: 33px;
			-webkit-border-radius: 50%;
			-moz-border-radius: 50%;
			border-radius: 50%;
			margin: 13px 15px;
			/*background: #f00;*/
			i{font-size: 25px;color: #fff;}
		}
		div{
			flex: 1;
			margin-top: 12px;
			p{
				height:20px;
				line-height: 20px;
				span{font-size: 16px; color: #333;}
				i{font-style:normal; font-size: 12px; color: #FF951B;}
				b{font-weight: normal; font-size: 12px; color: #999;}
				.left{float: left;}
				.right{float: right;}
			}

		}
		
		.aicon-shuifei{background:#6FB0D5;}
		.aicon-dianfei{background:#F0A85F;}
		.aicon-ranqifei{background:#E98488;}
		.aicon-guhua{background:#5CBA8E;}
		.aicon-kuandai{background:#D2A2EE;}
	}
	
}
</style>