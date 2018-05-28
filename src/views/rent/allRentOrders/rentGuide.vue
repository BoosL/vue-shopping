<template>
	<div id="rentGuide">
		<c-title :hide="false" text='租赁指南'></c-title>
		<div style="height:40px"></div>
		<div>
			<h3>一、什么是转赠？</h3>
			<p>转赠人在前端输入受赠人ID（即会员ID）、姓名、电话、地址，受赠人接受转赠后，该租赁订单即可转赠到指定会员的【待归还】租赁订单中，获得该订单中商品的所有使用权，包括归还商品、继续转赠，押金也同时转让到该会员的押金冻结账户上等。</p>
			
			<h3>二、租金怎么计算？</h3>
			<p>转赠人在前端输入受赠人ID（即会员ID）、姓名、电话、地址，受赠人接受转赠后，该租赁订单即可转赠到指定会员的【待归还】租赁订单中，获得该订单中商品的所有使用权，包括归还商品、继续转赠，押金也同时转让到该会员的押金冻结账户上等。</p>
			
			<h3>三、押金冻结说明</h3>
			<p>租客下单，支付押金之后，这笔钱就会被冻结，不能提现，待商品归还成功之后押金解冻，这笔钱就会退还到租客押金账户上。</p>
			
			<h3>四、逾期扣费说明</h3>
			<p>逾期扣费金额从押金冻结账户上扣除费用</p>
			<p>逾期扣费金额=按照逾期天数*每日租金，默认24小时为一天，7天为一周，30天为一个月，365天为一年。不足24小时，按照24小时计算</p>
			<p>计算实例：发财树的年租价为20元/天，押金1000元，租客一共租赁1棵发财树，租期为2年，逾期4天未还，
			逾期扣费金额=20元/天*4天=80元</p>

		</div>
	</div>
</template>

<script>
	import cTitle from 'components/title';
	export default{
		components: { cTitle },
		data(){
			return{
				
			}
		}
	}
	

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	#rentGuide{
		padding:10px 15px;
		background:#fff;
		h3{text-align:left;margin-top:20px;color:#101010;
		font-weight:normal;font-size:16px;line-height:35px;}
		p{text-align:left;color:#8a8a8a;line-height:24px;}
	}
</style>