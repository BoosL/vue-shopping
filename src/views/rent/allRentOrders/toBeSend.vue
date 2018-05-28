<template>
	<div id="toBeSend">
	
		<c-title :hide="false" text='订单详情'></c-title>
		<div style="height:40px"></div>
	
		<div class="m-header">
			<h3>{{status_name}}</h3>
			<div class="btn" v-for="btn in buttons">
				<button type="button" class="payBtn" @click="operation(btn)">{{btn.name}}</button>
			</div>
		</div>
		<div class="returnAddr">
			<div class="return addr" v-if="lease_order_return_address">
				<div class="lf">
					<span>还</span>
				</div>
				<div class="rt">
					<p>收货人：{{lease_order_return_address.realname}}&nbsp;&nbsp;&nbsp;&nbsp;{{lease_order_return_address.mobile}}</p>
					<p>归还地址：{{lease_order_return_address.address}}</p>
				</div>
			</div>
			<div class="recive addr">
				<div class="lf">
					<span>收</span>
				</div>
				<div class="rt">
					<p>收货人：{{address_info.realname}}&nbsp;&nbsp;&nbsp;&nbsp;{{address_info.mobile}}</p>
					<p>归还地址：{{address_info.address}}</p>
				</div>
			</div>
			<div class="remark">
				<i class="iconfont icon-jiage"></i>备注:</div>
		</div>
		<div class="content">
			<div class="data">
				<div class="lf">
					<i class="iconfont icon-quyufenhong"></i>
					租赁日期
				</div>
				<div class="rt">
					<p>起始：{{lease_order.start_time}}</p>
					<p>归还：{{lease_order.end_time}}</p>
					<h3>共计：{{lease_order.time_lift}}天</h3>
				</div>
			</div>
			<template v-for=" goods in has_many_order_goods">
				<div class="pro">
					<img :src="goods.thumb" alt="" />
					<div class="title">
						<p>{{goods.title}}</p>
						<b>规格:{{goods.goods_option_title}}</b>
					</div>
					<div class="rt">
						<p>x{{goods.total}}</p>
					</div>
				</div>
				<div class="money">
					<p>
						<span class="lf">租金
							<i @click="rentalTip()">?</i>
						</span>
						<span class="rt">¥{{goods.price}}</span>
					</p>
					<p>
						<span class="lf">押金
							<i @click="depositTip()">?</i>
						</span>
						<span class="rt">¥{{goods.lease_order.cash}}</span>
					</p>
	
				</div>
			</template>
			<div class="money">
				<p>
					<span class="lf">运费 </span>
					<span class="rt">¥{{dispatch_price}}</span>
				</p>
			</div>
	
			<div class="all">
				合计：
				<span>￥{{price}}</span>
			</div>
	
		</div>
		<ul class="orderDetail">
			<li>
				<span class="lf">订单编号：</span>
				<span class="rt">{{order_sn}}</span>
			</li>
			<li>
				<span class="lf">支付方式：</span>
				<span class="rt">{{pay_type_name}}</span>
			</li>
			<li>
				<span class="lf">下单时间：</span>
				<span class="rt">{{create_time}}</span>
			</li>
			<li>
				<span class="lf">付款时间：</span>
				<span class="rt">{{pay_time}}</span>
			</li>
		</ul>
	
		<!-- 弹窗 -->
		<div class="modal" v-show="rental">
			<div class="modal-dialog">
				<div class="close" @click="closeModal()">
					<img src="../../../assets/images/close.png">
				</div>
				<h1 class="title">租金说明</h1>
				<p>如果你无法简洁的表达你的想法，那么说明你还不都了解他---阿尔伯特-爱因斯坦</p>
			</div>
		</div>
		<!-- 弹窗 -->
		<div class="modal" v-show="deposit">
			<div class="modal-dialog">
				<div class="close" @click="closeModal()">
					<img src="../../../assets/images/close.png">
				</div>
				<h1 class="title">押金冻结说明</h1>
				<p>如果你无法简洁的表达你的想法，那么说明你还不都了解他---阿尔伯特-爱因斯坦</p>
			</div>
		</div>
	</div>
</template>

<script>
import toBeSend_controller from './toBeSend_controller';
export default toBeSend_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#toBeSend {
	.m-header {
		text-align: center;
		padding: 0 15px;
		background: #fff;
		clear: both;
		.money {
			text-align: right;
			float: right;
			height: 40px;
			line-height: 40px;
			color: #e51c23;
		}
		h3 {
			color: #e51c23;
			line-height: 30px;
			padding-top: 20px;
			text-align: center;
			color: #ff9500;
			font-weight: normal;
			i {
				padding-left: 10px;
				color: #919097
			}
		}
		p {
			clear: both;
			line-height: 30px;
			i {
				padding-right: 10px
			}
		}
		.btn {
			padding: 10px 0;
			button {
				width: 80px;
				height: 30px;
				border-radius: 5px;
				border: 1px solid #ccc;
				outline: 0;
				background: #fff;
			}
			.payBtn {
				color: #f15353;
				border: 1px solid #f15353
			}
		}
	}
	.returnAddr {
		margin-top: 10px;
		.addr {
			display: flex;
			flex-flow: row;
			height: 70px;
			background: #fff;
			border-bottom: 1px solid #ccc;
			div.lf {
				width: 50px;
				span {
					width: 30px;
					height: 30px;
					display: inline-block;
					text-align: center;
					line-height: 30px;
					border-radius: 50%;
					color: #fff;
					margin-top: 20px;
				}
			}
			div.rt {
				flex: 1;
				padding: 15px;
				p {
					text-align: left;
					line-height: 20px;
				}
			}
		}
		.return {
			div.lf {
				span {
					background: #ff9500;
				}
			}
			div.rt {
				color: #ff9500;
			}
		}
		.recive {
			div.lf {
				span {
					background: #666;
				}
			}
			div.rt {
				color: #101010;
			}
		}
		.remark {
			line-height: 20px;
			background: #fff;
			padding: 10px 15px;
			text-align: left;
			i {
				padding-right: 7px;
			}
		}
	}
	.content {
		background: #fff;
		margin-top: 10px;
		.all {
			border-top: 1px solid #ccc;
			padding: 10px 15px;
			text-align: right;
			height: 33px;
			line-height: 33px;
			span {
				color: #e51c23;
				font-size: 16px;
			}
		}
		.data {
			height: 60px;
			padding: 10px 15px;
			div.lf {
				line-height: 60px;
			}
			div.rt {
				text-align: right;
				h3 {
					color: #e51c23;
					font-weight: normal;
					font-size: 14px;
					padding-top: 4px;
				}
			}
		}
		.pro {
			background: #e3e3e3;
			margin-top: 10px;
			padding: 10px 15px;
			overflow: hidden;
			img {
				float: left;
				width: 70px;
				height: 70px;
				background: #fff;
			}
			.title {
				float: left;
				padding-left: 5px;
				text-align: left;
				p {
					padding-bottom: 3px;
				}
				b {
					color: #555;
					font-size: 12px;
					font-weight: normal
				}
			}
			div.rt {
				text-align: right;
				.rent {
					color: #e51c23
				}
			}
		}
		.money {
			overflow: hidden;
			padding-top: 10px;
			p {
				line-height: 25px;
				height: 25px;
				padding: 0 15px;
				span.lf {
					b {
						color: #e51c23;
						font-weight: normal;
					}
					i {
						width: 17px;
						height: 17px;
						display: inline-block;
						background: #e51c23;
						border-radius: 50%;
						line-height: 17px;
						text-align: center;
						color: #fff;
						margin-left: 5px;
						font-style: normal;
					}
				}
			}
			p:nth-child(3) {
				padding-bottom: 10px
			}
		}
	}
	.orderDetail {
		padding: 10px 15px;
		background: #fff;
		margin-top: 10px;
		li {
			height: 30px;
			line-height: 30px;
		}
	}

	/*弹窗样式*/
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .7);
		z-index: 999;
		.modal-dialog {
			width: 80%;
			height: 190px;
			background: #fff;
			border-radius: 6px;
			border-top: 10px solid #f15353;
			margin: 50% auto;
			position: relative;
			.close {
				position: absolute;
				top: -50px;
				right: 0;
			}
			.title {
				color: #666;
				font-size: 14px;
				font-weight: bold;
				line-height: 35px;
				text-align: left;
				padding-left: 25px;
				padding-top: 10px;
			}
			p {
				padding: 0 15px;
				text-align: left
			}
		}
	}
}
</style>