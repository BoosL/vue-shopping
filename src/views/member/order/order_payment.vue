<template >
	<div id="balance_recharge">
		<c-title :hide="false" text='订单支付'></c-title>
		<div style="height: 50px;"></div>
		<div class="my_wrapper">
			<span>账户余额</span>
			<div class="my-value">{{balance}} 元</div>
		</div>
		<div class="my_wrapper">
			<span>支付流水号</span>
			<div class="my-value">{{order_sn}}</div>
		</div>
		<div class="my_wrapper">
			<span>支付金额</span>
			<div class="my-value">
				<span>{{money}} </span> 元</div>
		</div>
		<div style="height: 10px;"></div>
		<div id="payBtnList">
			<div class="mod_btns" v-for="btn in buttons">
				<a @click="confirm(btn)" class="mod_btn" :class="[btnclass(btn.value)]">{{btn.name}}{{typename}}</a>
			</div>
		</div>

	

		<yd-keyboard v-model="popupSpecs" title="安全键盘" input-text="请输入支付密码" :callback="keyboardDone" ref="keyboardDemo1"></yd-keyboard>

		<!--<mt-button type="primary"
																			           size="large"
																			           @click="getWeChatPayParams">微信支付</mt-button>-->
	</div>
</template>
<script>
import order_paymentcontroller from './order_paymentcontroller';
export default order_paymentcontroller;

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#balance_recharge {
	.my_wrapper {
		background: #FFF;
		overflow: hidden;
		display: flex;
		padding: 10px;
		span {
			flex: 1;
			font-size: 16px;
			line-height: 1;
		}
		.my-value {
			flex: 2;
			text-align: left;
			span {
				color: red;
			}
		}
	}
}

#payBtnList {
	.mod_btns {
		margin: 10px 0;
		height: 40px;
		line-height: 40px;
		font-size: 1rem;
		.mod_btn {
			display: block;
			width: 96%;
			margin: 20px 2%;
			border-radius: 5px;
		}
		.mod_btn.bg_wechat {
			background: #26ce29;
			color: #fff;
		}
		.mod_btn.bg_alipay {
			background: #FF6100;
			color: #fff;
		}
		.mod_btn.bg_ali {
			background: #22aaed;
			color: #fff;
		}
		.mod_btn.bg_cash {
			background: #FB0207;
			color: #fff;
		}
	}
}

.pay-psw-info {
	overflow-y: scroll;
	width: 100vw;
	height: auto;
	background: #FFF;
	max-height: 80vh;
	padding-top: 10px;
}

footer {
	position: absolute;
	bottom: 0;
	width: 100vw;
	font-weight: 600;
}

.pay_btn {
	border-top: 1px solid #ddd;
	width: 100vw;
	height: auto;
}


.pay_btn li {
	width: 33%;
	float: left;
	height: 3rem;
	line-height: 3rem;
	text-align: center;
	background: #fff;
	font-size: .90rem;
	border-right: 1px solid #ddd;
	border-bottom: 1px solid #ddd;
}


.pay_btn li:active {
	background: #C2C2C2;
}

.b9:active {
	background: #fff !important;
}

.b9 {
	background: #C2C2C2 !important;
}

.pay_content {
	width: 100vw;
	height: 50px;
	margin-bottom: 10px;
}

.pay_content_title {
	width: 100vw;
	height: 30px;
	line-height: 30px;
	margin-bottom: 10px;
	font-size: 18px;
}

.pay_content_view {
	width: 100vw;
	height: 50px; // margin-left: 2px;
	border-bottom: 1px solid #ddd;
	border-top: 1px solid #ddd;
	border-right: 1px solid #ddd;
}

.ipt_pay_p {
	line-height: 50px;
	height: 50px;
	font-size: 20px;
}

.ipt_pay {
	float: left;
	width: 16.27%;
	height: 50px;
	text-align: center;
	border-left: 1px solid #ddd;
}
</style>