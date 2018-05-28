<style lang="scss" rel="stylesheet/scss" scoped>
#shopKeeperCenter {
	#tabs {
		margin-top: 40px;
		.conte {
			width: 100%;
			.list {
				margin-bottom: 10px;
				padding-bottom: 5px;
				background: #fff;
				.title1 {
					background: #fff;
					padding: 15px;
					font-size: 14px;
					text-align: left;
					padding: 15px;
					margin-bottom: 1px;
					.status1 {
						display: inline-block;
						width: 60px;
						color: #fff;
						text-align: center;
						float: right;
						line-height: 24px;
						background: green;
					}
					.status2 {
						display: inline-block;
						width: 60px;
						color: #fff;
						text-align: center;
						float: right;
						line-height: 24px;
						background: #f15353;
					}
				}


				.middle {
					padding: 15px;
					background: #f0f0f0;
					text-align: left;
					float: left;
					width: 100%;
					box-sizing: border-box;
					margin-bottom: 6px;
					.img {
						width: 65px;
						height: 65px;
						float: left;
						background: grey;
						img {
							width: 65px;
							vertical-align: middle;
						}
					}
					.orderNum {
						height: 65px;
						margin-left: 15px;
						float: left;
						line-height: 22px;
					}
				}

				.date {
					padding: 20px 15px;
					background: #fff;
					text-align: left;
					color: #555555;
					line-height: 26px;
					b {
						color: red;
						font-size: 17px;
					}
					span {
						color: #ff9800;
						font-size: 12px;
					}
					.left {
						width: 50%;
						float: left;
						text-align: left;
						color: #d2d2d2;
						font-size: 12px;
					}
					.right {
						width: 50%;
						float: right;
						text-align: right;
						color: #d2d2d2;
						font-size: 12px;
					}
				}
			}
			.list:after {
				content: "";
				display: block;
				clear: both;
			}
		}
	}
}
</style>
<template>
	<div id="shopKeeperCenter">
	
		<c-title :hide="false" text=' 店主中心'></c-title>
		<div style="margin-top:40px"></div>
	
		<div id="tabs">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="全部" name="first">
					<div class="conte">
						<div v-for="elem in first_content" class="list">
	
							<div class="title1">订单号：{{elem.order_sn}}
								<span v-if="elem.status_name=='已完成'" class="status1">{{elem.status_name}}</span>
								<span v-else class="status2">{{elem.status_name}}</span>
							</div>
	
							<div class="middle">
								<div class="img">
									<img :src="elem.goods_thumb" alt="" />
								</div>
								<div class="orderNum">
									{{elem.goods_title}}
									<br /> X{{elem.goods_total}}
									<br /> 付款金额：￥{{elem.goods_price}}
								</div>
							</div>
	
							<div class="date">
								共计{{elem.goods_total}}件商品，预计分红&nbsp;
								<b>￥ {{elem.bonus_money}}</b>
								<br />
								<span>个别店主预计分红可能存在误差，以最终结算分红为准</span>
								<br clear="all" />
								<div class="left">{{elem.order_time}}</div>
								<!--<div class="right">完成：{{elem.complete_time}}</div>-->
							</div>
	
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="已付款" name="second">
					<div class="conte">
	
						<div v-for="elem in second_content" class="list">
	
							<div class="title1">订单号：{{elem.order_sn}}
								<span v-if="elem.status_name=='已完成'" class="status1">{{elem.status_name}}</span>
								<span v-else class="status2">{{elem.status_name}}</span>
							</div>
	
							<div class="middle">
								<div class="img">
									<img :src="elem.goods_thumb" alt="" />
								</div>
								<div class="orderNum">
									{{elem.goods_title}}
									<br /> X{{elem.goods_total}}
									<br /> 付款金额：￥{{elem.goods_price}}
								</div>
							</div>
	
							<div class="date">
								共计{{elem.goods_total}}件商品，预计分红&nbsp;
								<b>￥ {{elem.bonus_money}}</b>
								<br />
								<span>个别店主预计分红可能存在误差，以最终结算分红为准</span>
								<br clear="all" />
								<div class="left">{{elem.order_time}}</div>
								<!--<div class="right">完成：{{elem.complete_time}}</div>-->
							</div>
	
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="已完成" name="third">
					<div class="conte">
	
						<div v-for="elem in third_content" class="list">
	
							<div class="title1">订单号：{{elem.order_sn}}
								<span v-if="elem.status_name=='已完成'" class="status1">{{elem.status_name}}</span>
								<span v-else class="status2">{{elem.status_name}}</span>
							</div>
	
							<div class="middle">
								<div class="img">
									<img :src="elem.goods_thumb" alt="" />
								</div>
								<div class="orderNum">
									{{elem.goods_title}}
									<br /> X{{elem.goods_total}}
									<br /> 付款金额：￥{{elem.goods_price}}
								</div>
							</div>
	
							<div class="date">
								共计{{elem.goods_total}}件商品，预计分红&nbsp;
								<b>￥ {{elem.bonus_money}}</b>
								<br />
								<span>个别店主预计分红可能存在误差，以最终结算分红为准</span>
								<br clear="all" />
								<div class="left">{{elem.order_time}}</div>
								<!--<div class="right">完成：{{elem.complete_time}}</div>-->
							</div>
	
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="已失效" name="fourth">
					<div class="conte">
	
						<div v-for="elem in fourth_content" class="list">
	
							<div class="title1">订单号：{{elem.order_sn}}
								<span v-if="elem.status_name=='已完成'" class="status1">{{elem.status_name}}</span>
								<span v-else class="status2">{{elem.status_name}}</span>
							</div>
	
							<div class="middle">
								<div class="img">
									<img :src="elem.goods_thumb" alt="" />
								</div>
								<div class="orderNum">
									{{elem.goods_title}}
									<br /> X{{elem.goods_total}}
									<br /> 付款金额：￥{{elem.goods_price}}
								</div>
							</div>
	
							<div class="date">
								共计{{elem.goods_total}}件商品，预计分红&nbsp;
								<b>￥ {{elem.bonus_money}}</b>
								<br />
								<span>个别店主预计分红可能存在误差，以最终结算分红为准</span>
								<br clear="all" />
								<div class="left">{{elem.order_time}}</div>
								<!--<div class="right">完成：{{elem.complete_time}}</div>-->
							</div>
	
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	
	</div>
</template>


<script>
import orderDetail_controller from './orderDetail_controller';
export default orderDetail_controller;
</script>




























<!--<style  lang="scss" rel="stylesheet/scss" scoped>
	
</style>

<template>
   
</template>

<script>
    
</script>
-->
