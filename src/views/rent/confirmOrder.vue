<template>
	<div id="confirmOrder">
		<c-title :hide="false" text='确认下单'></c-title>
		<div class="addr" @click="showAddress">
			<div class="lf">
				<p class="one">收货人:{{realname}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{mobile}}</p>
				<p class="two">
					<i class="iconfont icon-dizhi"></i>收货地址:{{address}}</p>
			</div>
			<div class="rt">
				<i class="iconfont icon-right"></i>
			</div>
		</div>
	
		<!--商品订单-->
		<div class="goods-detail">
			<div v-for=" item in order_data">
				<div class="goods-shop">
					<p>{{item.supplier.username}}</p>
				</div>
				<div class="detail_good">
					<!--	<h3><i class="fa fa-gift"></i>合利爱购</h3>-->
					<div class="goods" v-for="g in item.order.order_goods">
						<div class="img">
							<img :src="g.thumb">
						</div>
	
						<div class="warp">
							<div class="inner">
								<div class="name">{{g.title}}</div>
								<div class="option">规格: {{g.goods_option_title}}</div>
							</div>
							<div class="price">
								<p>￥{{(g.goods_price/g.total)}}</p>
								<p>×{{g.total}}</p>
							</div>
						</div>
	
					</div>
				</div>
	
				<div class="data">
					<div class="lf">
						<i class="iconfont icon-quyufenhong"></i>
						租赁日期
					</div>
					<div class="rt">
						<p>起始：{{item.order.lease_order.start_time}}</p>
						<p>归还：{{item.order.lease_order.end_time}}</p>
						<h3>共计：{{item.order.lease_order.time_lift}}</h3>
					</div>
				</div>
	
				<div class="send">
					<div class="lf">配送方式：</div>
					<div class="rt">快递</div>
				</div>
	
				<div class="money">
					<p>
						<span class="lf">租金
							<i @click="rentalTip">?</i>
						</span>
						<span class="rt">¥{{item.order.price}}</span>
					</p>
					<p>
						<span class="lf">押金
							<i @click="depositTip">?</i>
						</span>
						<span class="rt">¥{{item.order.lease_order.cash}}</span>
					</p>
				</div>
			</div>
		</div>
		<!--商品订单结束-->
	
		<div>
	
			<p class="all">
				<span class="lf">运费 </span>
				<span class="rt">¥{{dispatch_price}}</span>
			</p>
	
		</div>
	
		<div class="content">
	
			<div class="remark">
				<label for="">备注</label>
				<textarea v-model="remark" name="" rows="" cols="" placeholder="若有送货时间或者其他要，请在这里备注说明"></textarea>
				<!--<input type="text" placeholder="若有送货时间或者其他要，请在这里备注说明"/>-->
			</div>
	
		</div>
		<div class="footer">
			<div class="check">
				<input type="checkbox" v-model="checkAgree" @click="check" />我已认真阅读并同意该
				<b @click="rentPop">
					《租赁协议》</b>
			</div>
			<div class="sub">
				<span class="lf">
					合计：
					<b>¥{{price}}</b>
				</span>
				<button class="rt" @click="submit">提交订单</button>
			</div>
			<div class="alert" v-show="alert">
				<i class="iconfont icon-sousuo1"></i>请同意 《租赁协议》，再提交订单</div>
		</div>
		<!--租赁协议-->
		<mt-popup v-model="popupVisible" position="bottom" popup-transition="popup-fade">
			<div class="rentPop">
				<h3>
					<span class="lf" @click="rentPop()">取消</span>租赁协议</h3>
				<p>如果你无法简洁的表达你的想法，那么说明你还不都了解他---阿尔伯特-爱因斯坦</p>
				<button @click="rentPopVerify">阅读并同意</button>
			</div>
		</mt-popup>
		<!-- 弹窗 -->
		<div class="modal" v-show="rental">
			<div class="modal-dialog">
				<div class="close" @click="closeModal()">
					<img src="../../assets/images/close.png">
				</div>
				<h1 class="title">租金说明</h1>
				<p>如果你无法简洁的表达你的想法，那么说明你还不都了解他---阿尔伯特-爱因斯坦</p>
			</div>
		</div>
		<!-- 弹窗 -->
		<div class="modal" v-show="deposit">
			<div class="modal-dialog">
				<div class="close" @click="closeModal()">
					<img src="../../assets/images/close.png">
				</div>
				<h1 class="title">押金冻结说明</h1>
				<p>如果你无法简洁的表达你的想法，那么说明你还不都了解他---阿尔伯特-爱因斯坦</p>
			</div>
		</div>
	
		<mt-popup v-model="popupSpecs" position="bottom" class="mint-popup-4" closeOnClickModal='true'>
			<div class="add-info">
				<ul>
	
					<li v-for="item in addressData" @click="selectAddress(item)">
						<div class="liia">
							<font class="name" style="">{{item.username+" "+item.mobile}}</font>
							<br />
							<font class="address" style="">{{item.province+" "+item.city+" "+item.district}}{{item.address}}
							</font>
						</div>
						<!--<i class="fa fa-trash-o"></i>-->
					</li>
	
				</ul>
			</div>
			<button class="address-plus" @click="addAddress">新增地址</button>
	
		</mt-popup>
	
		<div id="AllGood" :class="{animation}">
			<div id="appendAddress" :class="{onclast:onclast}">
	
				<mt-header fixed title="添加地址">
					<mt-button icon="back" @click="popAddressClose" slot="left"></mt-button>
				</mt-header>
	
				<div style="height: 40px;"></div>
				<mt-field label="收件人" v-model="form.username" placeholder="请输入收件人"></mt-field>
				<mt-field label="联系电话" v-model="form.mobile" placeholder="请输入联系电话" type="tel"></mt-field>
				<div class="maleall">
					<label class="males">
						<span>设置默认地址 </span>
						<div class="address" style="">
							<mt-switch :v-model="form.isdefault"></mt-switch>
						</div>
					</label>
				</div>
				<div class="maleall">
					<label for="male" class="males">
						<span>所在省份 </span>
						<el-select v-model="provicevalue" placeholder="请选择省份" @change="selectProviceHandle">
							<el-option v-for="item in provinceoptions" :label="item.areaname" :value="item">
							</el-option>
						</el-select>
					</label>
				</div>
				<div class="maleall">
					<label for="male" class="males">
						<span>所在城市 </span>
						<el-select v-model="cityvalue" placeholder="请选择城市" @change="selectCityHandle">
							<el-option v-for="item in cityoptions" :label="item.areaname" :value="item">
							</el-option>
						</el-select>
					</label>
				</div>
				<div class="maleall">
					<label for="male" class="males">
						<span>所在街道 </span>
						<el-select v-model="regionvalue" placeholder="请选择区县" @change="selectRegionHandle">
							<el-option v-for="item in regionoptions" :label="item.areaname" :value="item">
							</el-option>
						</el-select>
					</label>
				</div>
	
				<mt-field label="" v-model="form.address" placeholder="请输入详细地址"></mt-field>
				<div style="height: 80px;"></div>
				<div class="address_addnav" @click="appendAddress">
					<i class="fa fa-plus-circle"></i>
					<span>保存</span>
				</div>
	
			</div>
		</div>
	
	</div>
</template>

<script>
import confirmOrder_controller from './confirmOrder_controller';
export default confirmOrder_controller;

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#confirmOrder {
	.mint-header{background: #FFF;color: #000;}
	#AllGood.animation {
	top: 0;
	header {
		display: flex;
	}
	.address_addnav {
		display: block;
	}
}
		.add-info {
		overflow-y: scroll;
		width: 100%;
		background: #FFF;
		max-height: 50vh;
		padding-top: 10px;
	}
	.mint-popup-4 {
		width: 100%;

		.sure {
			background: #f15353;
			height: 40px;
			line-height: 40px;
			color: #fff;
			width: 50%;
			border: 0;
			float: left;
		}
		.close {
			background: #eee;
			height: 40px;
			line-height: 40px;
			color: #333;
			width: 50%;
			border: 0;
			float: left;
		}
		.address-plus {
			background: #f15353;
			height: 40px;
			line-height: 40px;
			color: #fff;
			width: 100%;
			border: 0;
		}

		ul {
			overflow-y: scroll;
		}
		li {
			padding: 10px 0;
			display: flex;
			position: relative;
			.liia {
				flex: 9;
				text-align: left;
				padding-left: 20px;
				.name {
					font-size: 1.1rem;
					color: #222;
					line-height: 2rem;
				}
				.address {
					font-size: 0.7rem;
					color: #666;
					line-height: 2rem;
				}
			}
			i {
				flex: 1;
			}
		}
	}	
	.mint-popup-bottom {
		width: 100%;
		.rentPop {
			height: 300px;
			h3 {
				height: 33px;
				line-height: 33px;
				padding: 0 15px;
				font-weight: normal;
				margin-bottom: 30px;
				border-bottom: 1px solid #ccc;
				span {
					color: #607d8b;
					font-size: 14px;
				}
			}
			p {
				padding: 0 15px;
				text-align: left
			}
			button {
				position: fixed;
				bottom: 20px;
				left: 50%;
				transform: translateX(-50px);
				width: 100px;
				height: 30px;
				border-radius: 10px;
				color: #fff;
				border: 1px solid #f00;
				background: #e84e40;
				outline: 0;
			}
		}
	}

	.addr {
		background: #fff;
		height: 60px;
		padding: 10px 15px;
		margin-top: 40px;
		div.lf {
			width: 95%;
			p {
				line-height: 30px;
				text-align: left;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			p.one {
				padding-left: 22px;
			}
			p.two {
				i {
					padding-right: 4px;
				}
			}
		}
		div.rt {
			width: 5%;
			line-height: 60px;
		}
	}


	.goods-detail {
		background: #fff;
		.goods-shop {
			height: 35px;
			line-height: 35px;
			text-align: left;
			padding: 0 15px;
			border-top: 1px solid #ccc;
		}
		.detail_good {
			background: #e3e3e3;
			padding: 15px;
			.goods {
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				-ms-flex-flow: row;
				flex-flow: row;
				.img {
					width: 80px;
					height: 80px;
					background: #fff;
				}
				.warp {
					flex: 1;
					padding-left: 5px;
					text-align: left;
					.inner {
						width: 70%;
						float: left;
						.name {
							max-height: 60px;
							overflow: hidden;
						}
						.option {
							height: 20px;
							line-height: 20px;
							font-size: 10px;
						}
					}
					.price {
						width: 30%;
						float: left;
						text-align: right;
					}
				}
			}
		}

		.data {
			height: 60px;
			padding: 10px 15px;
			border-bottom: 1px solid #ccc;
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
		.send {
			overflow: hidden;
			height: 67px;
			line-height: 67px;
			padding: 10px 15px;
			border-bottom: 1px solid #ccc;
		}
		.remark {
			overflow: hidden;
			height: 66px;
			line-height: 33px;
			padding: 10px 15px;
			border-bottom: 1px solid #ccc;
			label {
				float: left;
				width: 20%;
				padding-right: 3%;
			}
			textarea {
				width: 77%;
				height: 60px;
				line-height: 27px;
				float: left;
				border-radius: 6px;
				outline: 0;
				border: 1px solid #ccc;
				padding-left: 4px;
				box-sizing: border-box;
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
				span.rt {
					color: #e51c23;
				}
			}
			p:nth-child(3) {
				padding-bottom: 10px
			}
		}
	}

	.all {
		border-bottom: 1px solid #ccc;
		padding: 0px 15px;
		text-align: right;
		height: 33px;
		line-height: 33px;
		background: #fff;
		span.rt {
			color: #e51c23;
		}
	}

	.content {
		background: #fff;
		.send {
			overflow: hidden;
			height: 67px;
			line-height: 67px;
			padding: 10px 15px;
			border-bottom: 1px solid #ccc;
		}
		.remark {
			overflow: hidden;
			height: 66px;
			line-height: 33px;
			padding: 10px 15px;
			border-bottom: 1px solid #ccc;
			label {
				float: left;
				width: 18%;
				padding-right: 3%;
				text-align: left;
			}
			textarea {
				width: 77%;
				height: 60px;
				line-height: 27px;
				float: left;
				border-radius: 6px;
				outline: 0;
				border: 1px solid #ccc;
				padding-left: 4px;
				box-sizing: border-box;
			}
		}
	}









	.footer {
		.check {
			overflow: hidden;
			background: #fff;
			height: 40px;
			line-height: 40px;
			margin: 10px 0;
			text-align: left;
			padding: 0 15px;
			b {
				color: #e51c23;
				font-weight: normal
			}
		}
		.sub {
			overflow: hidden;
			background: #fff;
			height: 45px;
			line-height: 40px;
			padding: 0 0 0 15px;
			b {
				color: #e51c23;
				font-weight: normal
			}
			button {
				width: 33%;
				height: 100%;
				background: #DD2727;
				color: #fff;
				border: 0;
				outline: 0;
			}
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

	.alert {
		position: fixed;
		left: 10%;
		bottom: 100px;
		width: 80%;
		height: 45px;
		text-align: center;
		line-height: 45px;
		background: #e84e40;
		color: #fff;
		border-radius: 10px;
		border: 1px solid #f00;
		i {
			padding-right: 6px;
		}
	}
.address_addnav {
	width: 100%;
	padding: 0 3% 0 6%!important;
	position: fixed;
	bottom: 0;
	left: 0;
	background: #f15353 !important;
	color: #fff !important;
	text-align: center;
	height: 44px !important;
	line-height: 44px !important;
}
	#AllGood {
		position: fixed;
		top: 200vh;
		height: 100vh;
		overflow: scroll;
		width: 100%;
		background: #FFF;
		z-index: 100;
		transition: .6s ease-out;
		display: block;
		#appendAddress .mint-field .mint-cell-title {
			text-align: left;
		}
		.address_addnav,
		header {
			display: none;
		}
		.address_addnav span {
			color: #FFF;
		}
		.address_addnav i {
			color: #fff;
			font-size: 22px;
			position: absolute;
			top: 50%;
			height: 18px;
			line-height: 18px;
			margin-left: -34px;
			margin-top: -9px;
		}

		.maleall {
			background: #FFF;
			text-align: left;
		}
		#appendAddress {}

		#appendAddress .males {

			line-height: 50px;
			display: flex;
			border-top: 1px solid #d9d9d9;
			margin-left: 10px;
			padding-right: 10px;
			position: relative;
			.address {
				display: inline-block;
				position: relative;
				width: 70%;
				float: right;
				box-sizing: border-box;
				padding-top: 8px
			}
		}

		.maleall span {
			color: #333;
			font-size: 16px;
			vertical-align: middle;
			width: 105px;
			-webkit-box-flex: 0;
			-ms-flex: none;
			flex: none;
			display: inline-block;
			line-height: 50px;
		}

		#appendAddress .maleall .males .address {
			position: absolute !important;
			right: 20px !important;
			top: 0px;
		}


		.maleall .el-select {
			width: 65%;
			float: right;
			position: relative;
		}


		#address {
			flex: 1;
			line-height: 50px;
			.mint-button--default {
				line-height: 50px;
				text-align: left;
				font-size: 16px;
			}
		}
	}
}
</style>