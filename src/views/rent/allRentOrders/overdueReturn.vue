<template>
	<div id="overdueReturn">
		<c-title :hide="false" text='订单详情'></c-title>
		<div style="height:40px"></div>
		
		<div class="m-header">
			<router-link :to= "fun.getUrl('transferRecord')">
					<div class="money">转赠记录</div>
			</router-link>
			<h3>逾期未归还 </h3>
			<p><i class="iconfont icon-tishi"></i>您已逾期{{returned.day}}天{{returned.time}}未归还租物，请尽快归还！</p>
			<div class="btn">
				<button type="button" @click="checkDetail()">查看详情</button>
				<button type="button" @click="retu()">归还</button>
			</div>
			<!--归还弹出-->
			<mt-popup
			  	v-model="zhong" position="bottom"  closeOnClickModal='true'>
			    <div class="alertDeposit">
			    	<div class="title"><span class="lf" @click="retu()">取消</span>转赠<span class="rt">确定</span></div>
			    	<div class="maleall">
						<label for="male" class="males">
							<span>所在省份 </span>
							<el-select placeholder="请选择快递公司" >
							</el-select>
						</label>
					</div>
					<div class="maleall">
						<label for="male" class="males">
							<span>所在省份 </span>
							<input class="input" type="text" placeholder="请输入快递单号"/>
						</label>
					</div>
					<div class="addr">
						<p>收货人：{{returned.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{returned.tel}}</p>
						<p>归还地址：{{returned.addr}}</p>
					</div>
			    </div>
			</mt-popup>
		</div>
		<div class="returnAddr">
			<div class="return addr">
				<div class="lf"><span>还</span></div>
				<div class="rt">
					<p>收货人：{{returned.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{returned.tel}}</p>
					<p>归还地址：{{returned.addr}}</p>
				</div>
			</div>
			<div class="recive addr">
				<div class="lf"><span>收</span></div>
				<div class="rt">
					<p>收货人：{{returned.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{returned.tel}}</p>
					<p>归还地址：{{returned.addr}}</p>
				</div>
			</div>
			<div class="remark"><i class="iconfont icon-jiage"></i>备注：请于五月二号上午送达，下午无人在公司</div>
		</div>
		<div class="content">
			<div class="data">
				<div class="lf">
					<i class="iconfont icon-quyufenhong"></i>
					租赁日期
				</div>
				<div class="rt">
					<p>起始：{{returned.startTim}}</p>
					<p>归还：{{returned.endTim}}</p>
					<h3>共计：{{returned.day}}天</h3>
				</div>
			</div>
			<div class="pro">
				<img src="" alt="" />
				<div class="title">
					<p>{{returned.name}}</p>
					<b>颜色：{{returned.color}}</b>
				</div>
				<div class="rt">
					<p class="rent">租金：¥{{returned.send}}/天</p>
					<p>押金：¥{{returned.rental}}</p>
					<p>x{{returned.num}}</p>
				</div>
			</div> 
			<div class="money">
				<p><span class="lf">租金 <i @click="rentalTip()">?</i></span> <span class="rt">¥{{returned.rental}}</span></p>
				<p><span class="lf">押金 <b>(冻结)</b><i @click="depositTip()">?</i></span> <span class="rt">¥{{returned.deposit}}</span></p>
				<p><span class="lf">运费 </span> <span class="rt">¥{{returned.send}}</span></p>
				<div class="all">
					合计：<span>￥{{returned.send}}</span>
				</div>
			</div>
		</div>
		<div class="overdueDescription">
			<div class="title">
				<span class="lf">逾期扣费说明<i @click="overdue()">?</i></span>
				<i class="iconfont icon-right rt" @click="extendOverdu($event)"></i>
			    <span class="rt">累计：<b>-¥3000.00</b></span>
			</div>
			<table class="extendBox" style="display:none">
				<tr v-for="item in overdueDes">
					<td>{{item.time}}</td>
					<td>{{item.everyRent}}</td>
					<td>{{item.deductions}}</td>
					<td>{{item.exerRent}}</td>
				</tr>
			</table>          
		</div>
		
		<ul class="orderDetail">
			<li><span class="lf">订单编号：</span> <span class="rt">14143213123123131</span></li>
			<li><span class="lf">支付方式：</span> <span class="rt">微信支付</span></li>
			<li><span class="lf">下单时间：</span> <span class="rt">{{returned.startTim}}</span></li>
			<li><span class="lf">付款时间：</span> <span class="rt">{{returned.startTim}}</span></li>
		</ul>
		
		<!-- 租金弹窗 -->
      	<div class="modal" v-show="rental">
	 		<div class="modal-dialog">
		 		<div class="close" @click="closeModal()">
		 			<img src="../../../assets/images/close.png">
		 		</div>
				<h1 class="title">租金说明</h1>
				<p>如果你无法简洁的表达你的想法，那么说明你还不都了解他---阿尔伯特-爱因斯坦</p>
	 		</div>
	 	</div>
	 	<!-- 押金弹窗 -->
      	<div class="modal" v-show="deposit">
	 		<div class="modal-dialog">
		 		<div class="close" @click="closeModal()">
		 			<img src="../../../assets/images/close.png">
		 		</div>
				<h1 class="title">押金冻结说明</h1>
				<p>如果你无法简洁的表达你的想法，那么说明你还不都了解他---阿尔伯特-爱因斯坦</p>
	 		</div>
	 	</div>
	 	<!-- 逾期扣费弹窗 -->
      	<div class="modal" v-show="overdues">
	 		<div class="modal-dialog">
		 		<div class="close" @click="closeModal()">
		 			<img src="../../../assets/images/close.png">
		 		</div>
				<h1 class="title">逾期扣费说明</h1>
				<p>如果你无法简洁的表达你的想法，那么说明你还不都了解他---阿尔伯特-爱因斯坦</p>
	 		</div>
	 	</div>
	</div>
</template>

<script>
import overdueReturn_controller from './overdueReturn_controller';
export default overdueReturn_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

.alertDeposit .males {
	line-height: 50px;
	display: flex;
	border-top: 1px solid #d9d9d9;
	margin-left: 10px;
	padding-right: 10px;
	border-top:0;
	.address {
		display: inline-block;
		position: relative;
		width: 100%;
		float: right;
		box-sizing: border-box;
		padding-top: 8px
	}
}
	.alertDeposit .input{
		width:100%;
		height:33px;
		border-radius:5px;
		border: 1px solid #ccc;
		outline:0;
		padding-left:6px;
		margin-top:7px;
	}
	.maleall span {
		color: #333;
		font-size: 14px;
		vertical-align: middle;
		width: 105px;
		-webkit-box-flex: 0;
		-ms-flex: none;
		flex: none;
		line-height: 50px;
	}
	#overdueReturn .alertDeposit .addr{
		height:70px;
		margin-top:30px;
		padding-top:20px;
		border-top:1px solid #ccc;
		text-align:left;
		padding-left:35px;
		color:rgb(51, 51, 51);
	}

#overdueReturn{
	.m-header{
		text-align:center;
		padding:0 15px;
		background:#fff;
		clear:both;
		.mint-popup-bottom{
			width:100%;
			.alertRental,.alertDeposit{	
				font-size:14px;
				.title{
					height:33px;
					line-height:33px;
					background:#eee;
					padding:0 15px;
					span.rt{
						color:#f15353;
					}
					span.lf{
						color:#8c7d8b;
					}
				}
				.information{
					text-align:left;
					color:#e51c23;
					padding:0 15px;
					line-height:30px;
				}
				
				
			}
		}

		.money{
			text-align: right;
			float:right;
			height:40px;
			line-height:40px;
			color:#e51c23;
		}
		h3{
			line-height:30px;
			padding-top:20px;
			text-align:center;
			padding-left:40px;
			color:#ff9500;
			font-weight:normal;
		}
		p{
			clear:both;
			line-height:30px;
			i{padding-right:10px}
		}
		.btn{
			padding:10px 0;
			button{
				width:80px;
				height:30px;
				border-radius: 5px;
				border:1px solid #ccc;
				outline:0;
				background: #fff;
			}
			button:last-child{
				border:1px solid #f15353;
				color:#f15353;
			}
		}
	}
	.returnAddr{
		margin-top:10px;
		.addr{
			display:flex;
			flex-flow:row;
			height:70px;
			background:#fff;
			border-bottom:1px solid #ccc;
			div.lf{
				width:50px;
				span{
					width:30px;
					height:30px;
					display:inline-block;
					text-align:center;
					line-height:30px;
					border-radius:50%;
					color:#fff;
					margin-top:20px;
				}
			}
			div.rt{
				flex:1;
				padding:15px;
				p{
					text-align:left;
					line-height:20px;
				}
			}
		}
		.return{
			div.lf{
				span{
					background:#ff9500;
				}
			}
			div.rt{
				color:#ff9500;
			}
		}
		.recive{
			div.lf{
				span{
					background:#666;
				}
			}
			div.rt{
				color:#101010;
			}
		}
		.remark{
			line-height:20px;
			background:#fff;
			padding:10px 15px;
			text-align:left;
			i{padding-right:8px;}
		}
	}
	.content{
		background:#fff;
		margin-top:10px;
		.data{
			height:60px;
			padding:10px 15px;
			div.lf{
				line-height:60px;
			}
			div.rt{
				text-align:right;
				h3{
					color:#e51c23;
					font-weight:normal;
					font-size:14px;
					padding-top:4px;
				}
			}
		}
		.pro{
			background:#e3e3e3;
			margin-top:10px;
			padding:10px 15px;
			overflow:hidden;
			img{
				float:left;
				width:70px;
				height:70px;
				background:#fff;
			}
			.title{
				float:left;
				padding-left:5px;
				text-align:left;
				p{
					padding-bottom:3px;
				}
				b{color:#555;font-size:12px;font-weight:normal}
			}
			div.rt{
				text-align:right;
				.rent{color:#e51c23}
			}
		}
		.money{
			overflow:hidden;
			padding-top:10px;
			p{
				line-height:25px;
				height:25px;
				padding:0 15px;
				span.lf{
					b{
						color:#e51c23;
						font-weight:normal;
					}
					i{
						width:17px;
						height:17px;
						display:inline-block;
						background:#e51c23;
						border-radius:50%;
						line-height:17px;
						text-align:center;
						color:#fff;
						margin-left:5px;
						font-style:normal;
					}
				}
			}
			p:nth-child(3){padding-bottom:10px}
			.all{border-top:1px solid #ccc;padding:10px 15px;text-align:right;height:33px;line-height:33px;span{color:#e51c23;font-size:16px;}}
		}
	}
	.overdueDescription{
		margin-top:10px;
		background:#fff;
		.title{
			height:50px;
			line-height:50px;
			padding:0 15px;
			i.rt{
				font-size:30px;
			}
			span.lf{
				i{
					width:17px;
					height:17px;
					display:inline-block;
					background:#e51c23;
					border-radius:50%;
					line-height:17px;
					text-align:center;
					color:#fff;
					margin-left:5px;
					font-style:normal;
				}
			}
			span.rt{
				padding-right:10px;
				b{
					color:#e51c23;
					font-weight:normal
				}
			}
		}
		.extendBox{
			tr{
				
				td{
					width:25%;
					border-top:1px solid #ccc;
					padding:10px 3px !important;
					color:#aaa;
				}
			}
		}
	}
	
	.orderDetail{
		padding:10px 15px;
		background:#fff;
		margin-top:10px;
		li{
			height:30px;
			line-height:30px;
		}
	}
	
	/*弹窗样式*/
	.modal{
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background:rgba(0,0,0,.7);
        z-index:999;
        .modal-dialog{
            width:80%;
            height:190px;
            background:#fff;
            border-radius:6px;
            border-top:10px solid #f15353;
            margin:50% auto;
            position:relative;
            .close{
                position:absolute;
                top:-50px;
                right:0;
            }
            .title{
                color:#666;
                font-size:14px;
                font-weight:bold;
                line-height:35px;
                text-align:left;
                padding-left:25px;
                padding-top:10px;
            }
            p{padding:0 15px;text-align:left}
        }
    }
}
</style>