<template>
	<div id="detailed">
		<c-title :hide="false"
		         text='我的评价'></c-title>
		<div style="height: 40px;"></div>
		<mt-navbar v-model="selected">
			<mt-tab-item id="0"
			             @click.native="swichTabTItem">待评价</mt-tab-item>
			<mt-tab-item id="1"
			             @click.native="swichTabTItem">已评价</mt-tab-item>
			<!--<mt-tab-item id="2"
				             @click.native="swichTabTItem">评价回复</mt-tab-item>-->
		</mt-navbar>
	
		<!-- tab-container -->
		<mt-tab-container v-model="selected">
	
			<mt-tab-container-item id="0"
			                       class="orderhoet">
				<div v-for="item in wait" class="listWarp">
					<div class="titleID">订单号：{{item.order_sn}}</div>
					<div class="goods"
					     v-for="good in item.has_many_order_goods">
	
						<div class="img">
							<img :src="good.thumb">
						</div>
						<div class="warp">
							<div class="inner">
								<div class="name">
									{{good.title}}
								</div>
								<div class="option">规格: {{good.goods_option_title}}</div>
							</div>
		
							<div class="price">
								<font>￥{{good.price}}
									<br/> ×{{good.total}}</font>
								<!--<span><router-link :to='{name:"evaluate",params:{order_data:1}}' >评价</router-link></span>-->
								<span @click="toComment(item.id,good)">评价</span>
							</div>
						</div>
					</div>
	
				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="1"
			                       class="orderhoet2">
				<div v-for="item in comment">
					<div class="goodsinfo"
					     v-for="good in item.has_many_order_goods">
						<div class="goods">
	
							<div class="img">
								<img :src="good.thumb">
							</div>
							
							<div class="warp">
								<div class="inner">
									<div class="name">
										{{good.title}}
									</div>
									<div class="option">规格: {{good.goods_option_title}}</div>
								</div>
		
								<div class="price">
									<font>￥{{good.price}}
										<br/> ×{{good.total}}</font>
		
								</div>
							</div>
						</div>
						<div class="butts">
							<span v-for="btn in good.buttons"
							      @click="opration(btn,good)">{{btn.name}}</span>
						</div>
					</div>
				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="2"
			                       class="orderhoet3">
				<div class="pall"
				     v-for="item in other">
					<router-link :to="{name:'othercommentdetails',params:{comment_id:1},query:{i:toi}}">
						<div class="goodsinfo">
							<!--<div class="hrt"></div>-->
							<div class="goods">
	
								<div class="img">
									<img :src="item.thumb">
								</div>
								
								<div class="warp">
									<div class="inner">
										<div class="name">
											{{item.title}}
										</div>
										<div class="option2">
											<font>￥{{item.price}}</font>
										</div>
		
									</div>
								</div>
							</div>
						</div>
					</router-link>
				</div>
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>
<script>
import myEvaluation from './myEvaluation_controller';
export default myEvaluation;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#detailed {
	a {
		color: #000;
	}
	.butts {
		text-align: right;
		/*padding-bottom: 10px;*/
		margin-top: -30px;
		span {
			border: #919191 1px solid;
			border-radius: 10px;
			padding: 3px 10px;
			margin-left: 10px;
			margin-right: 10px;
		}
	}
	.orderhoet2,
	.orderhoet3 {
		margin-bottom: 60px;
	}
	.orderhoet {
		margin-bottom: 60px;
		.titleID {
			text-align: left;
			padding-left: 10px;
			line-height: 2rem;
			background: #d6d2d2;
		}
		.listWarp :after{
			content: "";
			display: block;
			clear: both;
		}
	}
	.pj {
		background: #FFF;
		padding: 0 10px;
		p {
			text-align: left;
			margin: 0;
		}
		img {
			width: 100%;
		}
	}
	.pic {
		display: flex;
		align-items: stretch;
		flex-flow: row wrap;
		padding: 10px;
		background: #FFF;
		div {
			flex: 33% 0 0;
			img {
				width: 90%;
			}
		}
	}
	#user {
		div:nth-child(1) {
			flex: 1;
			padding: 5px 2px;
			img {
				width: 90%;
				border-radius: 50%;
			}
		}
		div:nth-child(2) {
			flex: 5;
			text-align: left;
		}
		div:nth-child(3) {
			color: #908a8a;
			font-size: .6rem;
			padding-right: 10px;
		}
	}
	.mint-navbar {
		margin-bottom: 2px;
	}
	.mint-navbar .mint-tab-item {
		padding: 14px 0;
	}
	.goodsinfo {
		padding: 0;
		background: #FFF;
		.hrt {
			border-top: #e0e0e0 1px solid;
			margin: 10px 0;
		}
	}
	.goods:after{
			content: "";
			display: block;
			clear: both;
		}
	.goods {
		/*display: flex;
		align-items: stretch;
		flex-flow: row wrap;
		background: #e0e0e0;
		padding: 5px;
		margin-bottom: 10px;
		.img {
			flex: 3;
			img {
				width: 100%;
			}
		}
		.inner {
			flex: 5;
			padding: 0 5px;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}
		.name {
			flex: 5;
			text-align: left
		}
		
		.price {
			flex: 2;
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			font {
				flex: 3;
			}
			span {
				border: solid 1px #BFCBD9;
				border-radius: 13px;
				padding: 1px 10px;
				font-size: .8rem;
				line-height: 1.2rem;
				margin: 0;
				background: #FFF;
			}
			.yijp {
				background: #888888;
				padding: 0 5px;
				color: #FFF;
			}
		}
		
		* 
		* */
		
		
		
		padding: 10px;
			width: 100%;
			box-sizing: border-box;
			background: #fafafa;
			.img {
				/*flex: 1;*/
				width: 30%;
				float: left;
				display: inline-block;
				/*background:blue;*/
				img {
					width: 100%;
				}
			}
			.warp{
				width: 70%;
				float: left;
				display: inline-block;
				.inner {
					width: 70%;
					float: left;
					box-sizing: border-box;
					padding: 0 5px;
					text-align:left;
					.name {
						text-align: left;
						color: #333333;
						margin-bottom: 10px;
					}
				}
				
				.price {
					width: 30%;
					align-items: center;
					text-align: right;
					color: #333333;
					box-sizing: border-box;
					float: left;
					padding-right: 4px;
					p {
						margin-top: 0
					}
					span {
						border: solid 1px #BFCBD9;
						border-radius: 13px;
						padding: 1px 10px;
						font-size: .8rem;
						line-height: 1.1rem;
						margin: 8px 0px 0px;
						display: inline-block;
						background: #FFF;
					}
					.yijp {
						background: #888888;
						padding: 0 5px;
						color: #FFF;
					}
				}
			}
			
			
	
		
		
		
		
		
		
		.option {
			color: #888;
			font-size: .6rem;
			flex: 1;
		}
		.option2 {
			color: #e84e40;
			font-size: .9rem;
			flex: 1;
			width: 100%;
			font {
				float: left;
			}
		}
	}
	.qtpl {
		text-align: right;
		width: 100%;
		span {
			background: #FFF;
			border: #B1A6A6 solid 1px;
			padding: 2px 20px;
			border-radius: 10px;
		}
	}
	.pall {
		margin-bottom: 10px;
	}
}
</style>