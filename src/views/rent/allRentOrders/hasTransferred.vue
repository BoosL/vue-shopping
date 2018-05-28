<template>
	<div id="hasTransferred">
		
		<c-title :hide="false" text='我的订单'></c-title>
<div style="height:40px"></div>


		<div class="m-header">
			<h3>已转赠</h3>
			<p>您的订单已转赠，您可以查看转赠详情！</p>
			<div class="btn">
				<router-link :to= "fun.getUrl('transferRecord')">
					<button type="button">查看详情</button>
				</router-link>
			</div>
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
	
	</div>
</template>

<script>
	import cTitle from 'components/title';
export default{
	components: { cTitle },
	data(){
		return{
			rental:false,
			deposit:false,
			returned:{
				day:"2",
				time:"16:56",
				name:"李天一",
				tel:"13234454546",
				addr:"广东省广州市白云区云霄路",
				startTim:"2017-05-02 00:00",
				endTim:"2018-07-04 00:00",
				day:"2",
				send:"10.00",
				rental:"22000.00",
				deposit:"1000.00",
				num:"10",
				color:"白色"
			}
		}
	},
	methods:{
		//租金
		rentalTip(){
			this.rental=!this.rental;
		},
		//押金
		depositTip(){
			this.deposit=!this.deposit;
		},
		//关闭
		closeModal(){
			this.rental=false;
			this.deposit=false;
			this.overdues=false;
		}
	}
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>

#hasTransferred{
	.m-header{
		text-align:center;
		padding:0 15px;
		background:#fff;
		clear:both;
		h3{
			color:#ff9500;
			line-height:30px;
			padding-top:10px;
			text-align:center;
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