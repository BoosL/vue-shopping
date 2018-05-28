<template>
	<div id="trainOrderDetail"  :class="'trainOrderDetail'+$store.state.service.lang">
        <c-title :hide="false" :text="language.title"></c-title>
		<div style="height:40px"></div>
		
		<div class="orderStates">
			<div class="booking"> <span class="state">订票成功</span> <span class="right">¥750</span> </div>
			<p> <span class="left">{{language.orderNum}}1234567</span> 
				<span class="right" @click="closeDetails">{{language.details}}
					<i class='iconfont icon-down'></i>
				</span> 
			</p>
		</div>
		
		<div class="flight">
			<div class="top"><span>04-20</span> <span>周一</span> <span>海南航空</span> <span>HU2014</span> </div>
			<div class="flightNum">
				<div> <span class="fromTime">22:10</span> <span class="addOne" v-show="false">+1天</span> <span class="toTime">01:10</span> </div>
				<p> <span class="fromAddr">广州</span>  <span class="toAddr">北京西</span> </p>
			</div>
		</div>
		
		<div class="orderContent">
			<div class="passenger">
				<label>{{language.passenger}}</label>
				<ul>
					<li>
						<p> <span>{{language.name}}</span> <span>某某</span></p>
						<p> <span>{{language.cardId}}</span><span>123456789</span></p>
						<p> <span>{{language.ticketNum}}</span><span>123456</span> </p>
					</li>
					<li>
						<p> <span>{{language.name}}</span> <span>某某</span></p>
						<p> <span>{{language.cardId}}</span><span>123456789</span></p>
						<p> <span>{{language.ticketNum}}</span><span>123456</span> </p>
					</li>
				</ul>
			</div>
			
			<div class="contact">
				<label>{{language.contactPerson}}</label>
				<ul>
					<li>
						<p> <span>{{language.name}}</span> <span>某某</span> </p>
						<p> <span>{{language.tele}}</span> <span>123456</span> </p>
					</li>
				</ul>
			</div>
			
			<p class="order insurance"> 
				<span class="left">保险{{language.insurance}}</span> 
				<router-link :to="fun.getUrl('policy')">
					<i class="iconfont icon-right right" v-if="$store.state.service.lang=='ch'"></i> 
					<i class="iconfont icon-left right" v-else="$store.state.service.lang=='wei'"></i> 
				</router-link>
			</p>
			
			<p class="order gift"> <span class="left">{{language.giftPoints}}</span> <b class="right">{{language.orderAfter}}200{{language.score}}</b></p>
			
			<div class="refunds">
				<router-link :to="fun.getUrl('trainRefundApplication')">
					<span>{{language.refunds}}</span> 
			   </router-link>
				<!--<span @click="changeSign" class="right">{{language.changeSign}}</span>-->
			</div>
			
			<p class="order total"> <span class="left"><b>{{language.total}}</b>¥705</span> <span class="right">{{language.toPay}}</span> </p>
		</div> 
		<!--明细-->
		<div class="modalDetail" v-show="details" @click="closeDetails">
			 <div class="modal-dialog" @click.stop>
			 	<div class="booking"> <span class="state">订票成功</span> <span class="right">¥750</span> </div>
				<p> <span class="left">{{language.orderNum}}1234567</span> 
					<span class="right" @click="closeDetails">{{language.details}}
						<i class='iconfont icon-up'></i>
					</span> 
				</p>
				<ul>
					<li class="title">{{language.airTotal}}</li>
					<li> <span>成人票</span> <span class="center">￥750</span> <span class="right">x1人</span></li>
				</ul>
				<ul>
					<li class="line"> <span>乘意险</span> <span class="center">￥50</span> <span  class="right">x1人</span></li>
					<li class="title"> <span class="left">{{language.all}}</span> <span class="right">¥850</span> </li>
					<li class="title big"> <span class="left">{{language.payStyle}}</span> <span class="right">支付宝</span> </li>
				</ul>
			 </div>
		</div>
		
	</div>
</template>

<script>
import  trainOrderDetail_controller from './trainOrderDetail_controller';
export default trainOrderDetail_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.trainOrderDetailch{
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
	       	padding-bottom:20px ;
	        background:#fff;
	        border-radius:6px;
	        margin:30% auto;
	        position:relative;
	        .title{
	        	i{color:#FF951B}
	            color:#666;
	         	font-weight: normal;
	            font-size: 14px;
	            line-height:35px;
	            text-align:left;
	            padding-left:25px;
	            border-bottom:1px solid #ccc;
	        }
	        .content{
	       		padding: 10px;
	       		li{
	       			width: 50%;
	       			line-height: 30px;
	       			float: left;
	       			text-align: left;
	       		}
	       	}
	       	.content:after{
	   			display: table;
	   			content: '';
	   			clear: both;
	   		}
	       	.button{
	       		display: block;
	       		width: 80%;
	       		height:35px ;
	       		line-height: 35px;
	       		background:#FF951B ;
	       		-webkit-border-radius: 5px;
	       		-moz-border-radius: 5px;
	       		border-radius: 5px;
	       		color: #fff;
	       		margin:0 auto;
	       	}
	    }
	}
	/*明细弹窗*/
	.modalDetail{
		position:fixed;
	    top:0;
	    left:0;
	    right:0;
	    bottom:0;
	    background:rgba(0,0,0,.7);
	    z-index:70;
	    .modal-dialog{
	        width:100%;
	       	padding-bottom:20px ;
	        background:#fff;
	        z-index: 1200;
	        top: 40px;
	        position: absolute;
	        padding-top: 10px;
	        .booking{
				height: 30px;
				line-height: 30px;
				color: #FF951B;
				font-size: 16px;
				padding: 0 15px;
				.state{
					float: left;
				}
				.right{
					float: right;
				}
			}
			p{
				color: #666666;
				font-size: 12px;
				height: 16px;
				padding: 0 15px 10px;
				border-bottom: 1px solid #e7e7e7;
				.left{float: left;}
				.right{float: right;}
			}
	        ul{
	        	li{
	        		padding: 0 15px;
	        		height:22px;
	        		line-height: 22px;
	        		span{width: 33.3%;display: inline-block;float: left;text-align: left;}
	        		.center{text-align: center;}
	        		.right{text-align: right;}
	        	}
	        	.line{border-bottom: 1px solid #eee;padding-bottom: 10px;}
	        	.title{
	        		height: 33px;
	        		line-height: 33px;
	        		text-align: left;
	        		font-size: 16px;
	        		color: #a2a2a2;
	        		.right{float: right;}
	        	}
	        }
	   }
	}
	
	.orderStates{
		background: #fff;
		padding: 10px 15px;
		.booking{
			height: 30px;
			line-height: 30px;
			color: #FF951B;
			font-size: 16px;
			.state{
				float: left;
			}
			.right{
				float: right;
			}
		}
		p{
			color: #666666;
			font-size: 12px;
			.left{float: left;}
			.right{float: right;}
		}
		p:after{
			display: table;
			content:'';
			clear:both;
		}
	}
	
	.flight{
		margin: 10px 15px;
		border-radius: 6px;
		box-shadow:2px 2px 2px 0 #aaa;
		.top{
			background:#1BBA9E;
			height: 30px;
			line-height: 30px;
			color:#fff;
			text-align: left;
			padding-left: 15px;
			border-top-left-radius: 6px;
			border-top-right-radius: 6px;
		}
		.flightNum{
			background: #fff;
			height: 70px;
			border-bottom-left-radius: 6px;
			border-bottom-right-radius: 6px;
			div{
				padding:10px 15px 0;
				line-height: 35px;
				overflow: hidden;
				font-size: 22px;
				background:url(../../../../assets/images/airline.png) no-repeat 50% 28px;
				.fromTime{float: left;}
				.toTime{float: right;}
				.addOne{font-size: 12px;vertical-align: middle;}
			}
			p{
				padding: 0 15px;
				font-size: 13px;
				.fromAddr{float: left;}
				.toAddr{float: right;}
			}
		}
	}
	
	.orderContent{
		.passenger,.contact{
			background: #fff;
			padding: 10px 15px;
			display: flex;
			flex-flow: row;
			label{
				width: 60px;
				text-align: left;
				font-size: 16px;
			}
			ul{
				flex: 1;
				li{
					border-bottom:1px solid #e5e5e5; margin-bottom: 5px; padding-bottom: 5px;
					p{color: #666; font-size: 12px;
					text-align: left;height: 22px;line-height: 22px;}
				}
				li:last-child{border-bottom: 0;}
			}
		}
		.passenger{padding-bottom: 15px;}
		.order{
			background: #fff;
			margin-top: 10px;
			padding: 0 15px;
			.left{float: left;font-size: 16px;}
			.right{float: right;}
			i.right{font-size: 21px; color: #ccc;}
			b.right{font-size: 12px; color: #000;font-weight: normal;}
			span.right{-webkit-border-radius: 6px;
			-moz-border-radius: 6px;
			border-radius: 6px; border:1px solid #FF951B; color:#FF951B;
			display: inline-block ; height: 28px;line-height: 28px; width: 70px;margin-top: 20px;}
		}
		.insurance{height: 45px; line-height: 45px;}
		.gift{height: 36px; line-height: 36px;}
		.total{height: 65px;.left{ line-height: 65px;}}
		.refunds{
			span{
				height: 28px;
				line-height: 26px;
				width: 40%;
				border:1px solid #ccc;
				-webkit-border-radius: 6px;
				-moz-border-radius: 6px;
				border-radius: 6px;
				display: inline-block;
				margin-top:10px;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;
				color: #666666;
				font-size: 12px;
				background: #fff;
			}
		}
	}
}



.trainOrderDetailwei{
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
	       	padding-bottom:20px ;
	        background:#fff;
	        border-radius:6px;
	        margin:30% auto;
	        position:relative;
	        .title{
	        	i{color:#FF951B;float: right; font-size: 25px;}
	            color:#666;
	         	font-weight: normal;
	            font-size: 14px;
	            line-height:35px;
	            text-align:left;
	            padding-right:25px;
	            border-bottom:1px solid #ccc;
	            text-align: right;
	        }
	        .content{
	       		padding: 10px;
	       		li{
	       			width: 50%;
	       			line-height: 30px;
	       			float: right;
	       			text-align: right;
	       			span{float: right;}
	       		}
	       	}
	       	.content:after{
	   			display: table;
	   			content: '';
	   			clear: both;
	   		}
	       	.button{
	       		display: block;
	       		width: 80%;
	       		height:35px ;
	       		line-height: 35px;
	       		background:#FF951B ;
	       		-webkit-border-radius: 5px;
	       		-moz-border-radius: 5px;
	       		border-radius: 5px;
	       		color: #fff;
	       		margin:0 auto;
	       	}
	    }
	}
	/*明细弹窗*/
	.modalDetail{
		position:fixed;
	    top:0;
	    left:0;
	    right:0;
	    bottom:0;
	    background:rgba(0,0,0,.7);
	    z-index:70;
	    .modal-dialog{
	        width:100%;
	       	padding-bottom:20px ;
	        background:#fff;
	        z-index: 1200;
	        top: 40px;
	        position: absolute;
	        padding-top: 10px;
	        .booking{
				height: 30px;
				line-height: 30px;
				color: #FF951B;
				font-size: 16px;
				padding: 0 15px;
				.state{
					float: right;
				}
				.right{
					float: left;
				}
			}
			p{
				color: #666666;
				font-size: 12px;
				height: 16px;
				padding: 0 15px 10px;
				border-bottom: 1px solid #e7e7e7;
				.left{float: right;}
				.right{float: left;}
			}
	        ul{
	        	li{
	        		padding: 0 15px;
	        		height:22px;
	        		line-height: 22px;
	        		span{width: 33.3%;display: inline-block;float: right;text-align: right;}
	        		.center{text-align: center;}
	        		.right{text-align: left;}
	        	}
	        	.line{border-bottom: 1px solid #eee;padding-bottom: 10px;}
	        	.title{
	        		height: 33px;
	        		line-height: 33px;
	        		text-align: right;
	        		font-size: 16px;
	        		color: #a2a2a2;
	        		.right{float: left;}
	        	}
	        }
	   }
	}
	
	.orderStates{
		background: #fff;
		padding: 10px 15px;
		.booking{
			height: 30px;
			line-height: 30px;
			color: #FF951B;
			font-size: 16px;
			.state{
				float: left;
			}
			.right{
				float: right;
			}
		}
		p{
			color: #666666;
			font-size: 12px;
			.left{float: right;}
			.right{float: left;}
		}
		p:after{
			display: table;
			content:'';
			clear:both;
		}
	}
	
	.flight{
		margin: 10px 15px;
		border-radius: 6px;
		box-shadow:2px 2px 2px 0 #aaa;
		.top{
			background:#1BBA9E;
			height: 30px;
			line-height: 30px;
			color:#fff;
			text-align: left;
			padding-right: 15px;
			border-top-left-radius: 6px;
			border-top-right-radius: 6px;
			span{float: right;padding-left: 4px;}
		}
		.flightNum{
			background: #fff;
			height: 70px;
			border-bottom-left-radius: 6px;
			border-bottom-right-radius: 6px;
			div{
				padding:10px 15px 0;
				line-height: 35px;
				overflow: hidden;
				font-size: 22px;
				background:url(../../../../assets/images/airlineLeft.png) no-repeat 50% 28px;
				.fromTime{float: right;}
				.toTime{float: left;}
				.addOne{font-size: 12px;vertical-align: middle;}
			}
			p{
				padding: 0 15px;
				font-size: 13px;
				.fromAddr{float: right;}
				.toAddr{float: left;}
			}
		}
	}
	
	.orderContent{
		.passenger,.contact{
			background: #fff;
			padding: 10px 15px;
			display: flex;
			flex-flow: row;
			label{
				width: 80px;
				text-align: right;
				font-size: 16px;
				order:2;
			}
			ul{
				flex: 1;
				order:1;
				li{
					border-bottom:1px solid #e5e5e5; margin-bottom: 5px; padding-bottom: 5px;
					p{color: #666; font-size: 12px;
					text-align: right; height: 22px;line-height: 22px;}
				}
				li:last-child{border-bottom: 0;}
			}
		}
		.passenger{padding-bottom: 15px; span{float: right;}}
		.contact{span{float: right;}}
		.order{
			background: #fff;
			margin-top: 10px;
			padding: 0 15px;
			.left{float: right;font-size: 16px; b{float: right;font-weight: normal;}}
			.right{float: left;}
			i.right{font-size: 21px; color: #ccc;}
			b.right{font-size: 12px; color: #000;font-weight: normal;}
			span.right{-webkit-border-radius: 6px;
			-moz-border-radius: 6px;
			border-radius: 6px; border:1px solid #FF951B; color:#FF951B;
			display: inline-block ; height: 28px;line-height: 28px; width: 70px;margin-top: 20px;}
		}
		.insurance{height: 45px; line-height: 45px;}
		.gift{height: 36px; line-height: 36px;}
		.total{height: 65px;.left{ line-height: 65px;}}
		.refunds{
			span{
				height: 28px;
				line-height: 26px;
				width: 40%;
				border:1px solid #ccc;
				-webkit-border-radius: 6px;
				-moz-border-radius: 6px;
				border-radius: 6px;
				display: inline-block;
				margin-top:10px;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;
				color: #666666;
				font-size: 12px;
				background: #fff;
			}
		}
	}
	
	
}
</style>