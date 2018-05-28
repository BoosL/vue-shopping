<template>
    <div id="refundApplication"  :class="'refundApplication'+$store.state.service.lang">
        <c-title :hide="false" text='退票申请'></c-title>
        <div style="height:40px"></div>
        
        <div class="orderStates">
			<div class="booking"> <span class="state">预计退还</span> <span class="right">¥750</span> </div>
			<p> <span class="left"><b>订单号</b>1234567</span> 
				<span class="right" @click="closeDetails">明细
					<i class='iconfont icon-down'></i>
				</span> 
			</p>
		</div>
        
		<div class="flight">
			<div class="top"><span>04-20</span> <span>周一</span> <span>海南航空</span> <span>HU2014</span> </div>
			<div class="flightNum">
				<div> <span class="fromTime">22:10</span> <span class="addOne" v-show="false">+1天</span> <span class="toTime">01:10</span> </div>
				<p> <span class="fromAddr">白云机场T3</span> <span class="stopCity" @click="closeCity">经停城市</span> <span class="toAddr">首都机场T1</span> </p>
			</div>
			<div class="addr">
				<span>准点率：</span> <span>8%</span> <span>|</span>
				<span>波音701-9</span> <span>(大型机)</span>
			</div>
		</div>

		
		<div class="passenger">
		  		<p class="control">选择需要退票的乘机人</p>
		  		<ul>
		  			<li v-for="(airMan,index) in airMans">
		  				<div class="left">
	  						<p>姓名：{{airMan.name}}</p>
	  						<p>身份证号：{{airMan.num}}</p>
		  				</div>
		  				<div class="right">
		  					<div class="circle" :class="{active:airMans[index].choose}" @click="chooseCircle($event)" :data-index="index"></div>
		  				</div>
		  			</li>
		  		</ul>
		  	</div>
		

        <div class="m-footer">
        	<router-link :to="fun.getUrl('changeAgreement')">
            	<div class="left">退改协议</div>
            </router-link>
            
            <router-link :to="fun.getUrl('ticketOrderDetail')">
            	<div class="right">申请退票</div>
            </router-link>
        </div>
        
        <!--明细-->
		<div class="modalDetail" v-show="details" @click="closeDetails">
			 <div class="modal-dialog" @click.stop>
			 	<div class="booking"> <span class="state">预计退还</span> <span class="right">¥750</span> </div>
				<p> <span class="left"><b>订单号</b>1234567</span> 
					<span class="right" @click="closeDetails">明细
						<i class='iconfont icon-up'></i>
					</span> 
				</p>
				<ul>
					<li class="title">机票总价</li>
					<li> <span>成人票</span> <span class="center">￥750</span> <span class="right">x1人</span></li>
				</ul>
				<ul>
					<li class="line"> <span>机建+燃油</span> <span class="center">￥50</span> <span  class="right">x1人</span></li>
					<!--<li class="title">其他</li>-->
					<!--<li> <span>延误险</span> <span class="center">￥20</span> <span class="right">x1人</span></li>
					<li class="line"> <span>意外险</span> <span class="center">￥30</span> <span class="right">x1人</span></li>-->
					<li class="title"> <span class="left">总额</span> <span class="right">¥850</span> </li>
					<li class="title big"> <span class="left">支付方式</span> <span class="right">支付宝</span> </li>
				</ul>
			 </div>
		</div>
		
		<!--经停城市-->
		<div class="modal" v-show="city" @click="closeCity">
			 <div class="modal-dialog" @click.stop>
				<h1 class="title"> <i class="iconfont icon-tishi"></i>  {{language.stopInformation}}</h1>
				<ul class="content">
					<li> <span>{{language.stopCity}}</span> <span>天津</span> </li>
					<li> <span>{{language.stopTime}}</span> <span>00:30</span> </li>
					<li> <span>{{language.startFly}}</span> <span>30分钟</span> </li>
					<li> <span>{{language.endFly}}</span> <span>00:30</span> </li>
				</ul>
				<span class="button" @click="closeCity">{{language.know}}</span>
			 </div>
		</div>
    </div>
</template>

<script>
import  refundApplication_controller from './refundApplication_controller';
export default refundApplication_controller;	
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
*{-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
box-sizing: border-box;}
.refundApplicationch{
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
	        background:#fff;
	        z-index: 1200;
	        top: 40px;
	        position: absolute;
	        padding:10px 0;
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
				padding: 0 15px 25px;
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
				.stopCity{color:#1BBA9E}
			}
		}
		.addr{
			background: #fff;
			height: 35px;
			font-size: 10px;
			border-bottom-left-radius: 6px;
			border-bottom-right-radius: 6px;
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
    
    .passenger{
    	padding:0 15px;
    	background: #fff;
    	.control{
    		height:40px;
    		line-height: 40px;
    		text-align: left;
    	}
    	ul{
    		padding-bottom: 10px;
    		li{text-align: left; border-top:1px solid #eee; height: 50px;padding-top: 5px;	
    			.left{
    				width:90% ; float: left;
    				p{color:#7c7c7c;height: 25px;font-size: 12px;}
    			}
    			.right{
    				width: 10%; float: left;
    				.circle{
	                    width:20px;
	                    height:20px;
	                    line-height:20px;
	                    text-align:center;
	                    display:inline-block;
	                    border:1px solid #aaa;
	                    border-radius:50%;
	                    margin-top:10px;
	                    float:right;
	                }
	                .active{
	                    border:1px solid #36d2b6;
	                    background:url(../../../../assets/images/mark.png) no-repeat 3px 4px;
	                }
    			}
    		}
    	}
    }
    
    .m-footer{
        width:100%;
        height:45px;
        line-height:45px;
        background:#fff;
        position:fixed;
        bottom:0;
        left:0;
        border-top:1px solid #ccc;
        a{color: #333;}
        div{width:50%;float: left;height: 45px;}
        div.left{border-right:1px solid #ccc;}
    }
}

.refundApplicationwei{
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
	        	text-align: right;
	        	i{color:#FF951B;float: right; font-size: 25px;}
	            color:#666;
	         	font-weight: normal;
	            font-size: 14px;
	            line-height:35px;
	            text-align:right;
	            padding-right:25px;
	            border-bottom:1px solid #ccc;
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
	        background:#fff;
	        z-index: 1200;
	        top: 40px;
	        position: absolute;
	        padding:10px 0;
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
				line-height: 16px;
				padding: 0 15px 25px;
				border-bottom: 1px solid #e7e7e7;
				.left{float: right; b{float: right;font-weight: normal;}}
				.right{float: left;}
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
			span{float: right; padding-left: 5px;}
		}
		.flightNum{
			background: #fff;
			height: 70px;
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
				.stopCity{color:#1BBA9E}
			}
		}
		.addr{
			background: #fff;
			height: 35px;
			font-size: 10px;
			border-bottom-left-radius: 6px;
			border-bottom-right-radius: 6px;
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
				float: right;
			}
			.right{
				float: left;
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
    
    .passenger{
    	padding:0 15px;
    	background: #fff;
    	.control{
    		height:40px;
    		line-height: 40px;
    		text-align: right;
    	}
    	ul{
    		padding-bottom: 10px;
    		li{text-align: right; border-top:1px solid #eee; height: 50px;padding-top: 5px;	
    			.left{
    				width:90% ; float: right;
    				p{color:#7c7c7c;height: 25px;font-size: 12px;}
    			}
    			.right{
    				width: 10%; float: right;
    				.circle{
	                    width:20px;
	                    height:20px;
	                    line-height:20px;
	                    text-align:center;
	                    display:inline-block;
	                    border:1px solid #aaa;
	                    border-radius:50%;
	                    margin-top:10px;
	                    float:right;
	                }
	                .active{
	                    border:1px solid #36d2b6;
	                    background:url(../../../../assets/images/mark.png) no-repeat 3px 4px;
	                }
    			}
    		}
    	}
    }
    
    .m-footer{
        width:100%;
        height:45px;
        line-height:45px;
        background:#fff;
        position:fixed;
        bottom:0;
        left:0;
        border-top:1px solid #ccc;
        a{color: #333;}
        div{width:50%;float: left;height: 45px;}
        div.left{border-right:1px solid #ccc;}
    }
}
</style>