<template xmlns="http://www.w3.org/1999/html">
	<div id="income">
		<c-title :hide="true" text='我的推广'></c-title>
		<!--<c-myextension v-if="!is_agent"></c-myextension>-->
		<div class="myextension" v-if="!is_agent">
			<div class="banner">
				<img :src="info_img" v-if="!(info_img=='' ||info_img==undefined||info_img==null)">
				<img src="../../assets/images/WYTG.png" v-if="(info_img=='' ||info_img==undefined||info_img==null)">
			</div>
			<div class="main">
				<!--推广条件1   申请   -->
				<div class="welcome" v-if="becomeType_1">
					<div class="text">
						<p>欢迎加入
							<span>{{become_1_info_2}}</span>，请填写申请信息</p>
						<p>邀请人：
							<span>{{become_1_info_1}}</span>&nbsp;请核实</p>
					</div>
					<div class="info">
						<input type="text" v-model="para_name" placeholder="请填写真实姓名" class="inp">
						<input type="number" v-model="para_phone" placeholder="请填写手机号码方便联系" class="inp">
						<!--<input type="text"
																														v-model="para_weixin"
																														       placeholder="请填写微信号"
																														       class="inp">-->
						<input type="submit" @click="become_1_click" value="申请推广" class="btn">
						<!--提交后跳转至success页面（同无条件申请）-->
					</div>
				</div>
				<!--推广条件2   消费达到N次   -->
				<div class="welcome" v-if="becomeType_2">
					<div class="text">
						<p>本店累计消费满
							<span>{{become_2_info_1}}</span> 次， 才可开启&lt;{{become_2_info_3}}&gt;推广中心，您已消费
							<span>{{become_2_info_2}}</span> 次，请继续努力</p>
					</div>
					<div class="info">
						<div class="btn" @click="become_2_click">
							<!--点击跳转指定商品列表页面-->
							<i class="fa fa-shopping-cart"></i> 继续去购物
						</div>
					</div>
				</div>
				<!--推广条件3   消费达到N元   -->
				<div class="welcome" v-if="becomeType_3">
					<div class="text">
						<p>本店累计消费满
							<span>{{become_3_info_1}}</span>元， 才可开启&lt;{{become_3_info_3}}&gt;推广中心，您已消费
							<span>{{become_3_info_2}}</span> 元，请继续努力</p>
					</div>
					<div class="info">
						<div class="btn" @click="become_3_click">
							<!--点击跳转指定商品列表页面-->
							<i class="fa fa-shopping-cart"></i> 继续去购物
						</div>
					</div>
				</div>
				<!--推广条件4     购买指定商品 -->
				<div class="welcome" v-if="becomeType_4">
					<div class="text">
						<p>本店需购买商品
							<span>【{{become_4_info_1}}】</span>
							<!--可以点击跳转指定商品页面-->
							才可开启&lt;{{become_4_info_2}}&gt;推广中心，请现在去购买吧！
						</p>
					</div>
					<div class="info">
						<div class="btn" @click="become_4_click(become_4_info_3)">
							<!--点击跳转指定商品页面-->
							<i class="fa fa-shopping-cart"></i> 现在去购买
						</div>
					</div>
				</div>
				<div class="vip_main" v-if="!isCheck">
					<div class="title">推广特权</div>
					<div class="vip vip1">
						<div class="ico1">
							<i class="fa fa-qrcode"></i>
						</div>
						<div class="text">
							<div class="t1">专属二维码</div>
							<div class="t2">拥有专属推广二维码，用于推广客户；</div>
						</div>
					</div>
					<div class="vip">
						<div class="ico2">
							<i class="fa fa-cny"></i>
						</div>
						<div class="text">
							<div class="t1">推广收入</div>
							<div class="t2">推广的客户购买商品后，您将获得相应的推广收入；</div>
						</div>
					</div>
				</div>
			</div>
			<!--1：无条件展示     2：申请后展示-->
			<div class="success" v-if="isCheck">
				<div class="ico">
					<i class="fa fa-check"></i>
				</div>
				<div class="text">您的申请已经提交，请等待审核！</div>
				<a @click="isCheck_click()">
					<div class="sub">去商城逛逛</div>
				</a>
			</div>
		</div>
		<div v-if="is_agent">
			<div class="header">
				<div class="back">
					<i class="mintui mintui-back" v-if="false" @click="goback"></i>
				</div>
				<div class="user">
					<div class="user-head">
						<!--<img  v-lazy="userAvatar">-->
						<img :src="userAvatar">
					</div>
					<div class="user-info">
						<div class="user-name">{{userName}}</div>
						<div class="user-other">[会员ID:{{vipId}}]</div>
						<div class="user-other">[{{level}}]
						</div>
					</div>
				</div>
			</div>
			<h4>推广收入
				<span id="pricerg">
											<font color="red">￥{{total_income}}</font>元</span>
			</h4>
			<template>
										<yd-grids-group :rows="2">
											<yd-grids-item :link="fun.getUrl('distribution',{})" v-if="unCommissionShow && isCommissionShow">
												<yd-icon slot="icon" class="icon-fenxiao" custom size="24px" color="#FF685D"></yd-icon>
												<span slot="text">{{commission_title}}
													<font>￥{{commission_income}}</font>元</span>
											</yd-grids-item>
											<yd-grids-item :link="fun.getUrl(isAreaDividendShow?'regionalAgencyCenter':'applyRegionalAgency',{})" v-if="unAreaDividendShow && isAreaDividendShow">
											<yd-icon slot="icon" class="icon-quyufenhong" custom size="24px" color="#FF685D"></yd-icon>
												<span slot="text">{{area_dividend_title}}
													<font>￥{{area_dividend_income}}</font>元</span>
											</yd-grids-item>
											<yd-grids-item :link="fun.getUrl(isTeamDividendShow?'teamAgentCenter':'',{})" v-if="unTeamDividendShow && isTeamDividendShow">
												<yd-icon slot="icon" class="icon-42baoxianxiangqing" custom size="24px" color="#FF685D"></yd-icon>
												<span slot="text">{{team_dividend_title}}
													<font>￥{{team_dividend_income}}</font>元</span>
											</yd-grids-item>
											<yd-grids-item :link="fun.getUrl(isMerchantShow?'enterprise_index':'',{})" v-if="unMerchantShow && isMerchantShow">
												<yd-icon slot="icon" class="icon-zhaoshang" custom size="24px" color="#FF685D"></yd-icon>
												<span slot="text">{{merchant_title}}
													<font>￥{{merchant_income}}</font>元</span>
											</yd-grids-item>
											<yd-grids-item :link="fun.getUrl(isMicroShow?'microShop_ShopKeeperCenter':'',{})" v-if="unMicroShow && isMicroShow">
												<yd-icon slot="icon" class="icon-weidian" custom size="24px" color="#FF685D"></yd-icon>
												<span slot="text">{{micro_title}}
													<font>￥{{micro_income}}</font>元</span>
											</yd-grids-item>
											<yd-grids-item :link="fun.getUrl(isSingleReturnShow?'single_return_center':'',{})" v-if="unSingleReturnShow && isSingleReturnShow">
												<yd-icon slot="icon" class="icon-shangchengdingdan" custom size="24px" color="#FF685D"></yd-icon>
												<span slot="text">{{singleReturn_title}}
													<font>￥{{singleReturn_income}}</font>元</span>
											</yd-grids-item>
											<yd-grids-item :link="fun.getUrl(isTeamLevelReturnShow?'teamlevel_return_center':'',{})" v-if="unTeamLevelReturnShow && isTeamLevelReturnShow">
												<yd-icon slot="icon" class="icon-tuanduifanxian" custom size="24px" color="#FF685D"></yd-icon>
												<span slot="text">{{teamLevelReturn_title}}
													<font>￥{{teamLevelReturn_income}}</font>元</span>
											</yd-grids-item>
											<yd-grids-item :link="fun.getUrl(isConsumeReturnShow?'consume_return_center':'',{})" v-if="unConsumeReturnShow && isConsumeReturnShow">
												<yd-icon slot="icon" class="icon-xiaofeifanxian" custom size="24px" color="#FF685D"></yd-icon>
												<span slot="text">{{consumeReturn_title}}
													<font>￥{{consumeReturn_income}}</font>元</span>
											</yd-grids-item>
											<yd-grids-item :link="fun.getUrl(isFullReturnShow?'full_return_center':'',{})" v-if="unFullReturnShow && isFullReturnShow">
												<yd-icon slot="icon" class="icon-manefanxian" custom size="24px" color="#FF685D"></yd-icon>
												<span slot="text">{{fullReturn_title}}
													<font>￥{{fullReturn_income}}</font>元</span>
											</yd-grids-item>
											<yd-grids-item :link="fun.getUrl(isShareholderDividend?'shareholder_dividend':'',{})" v-if="unShareholderDividend && isShareholderDividend">
												<yd-icon slot="icon" class="icon-gudongfenhong" custom size="24px" color="#FF685D"></yd-icon>
												<span slot="text">{{shareholderDividend_title}}
													<font>￥{{shareholderDividend_income}}</font>元</span>
											</yd-grids-item>
												<yd-grids-item :link="fun.getUrl(islevelReturn?'level_return':'',{})" v-if="unlevelReturn && islevelReturn">
													<yd-icon slot="icon" class="icon-dengji" custom size="24px" color="#FF685D"></yd-icon>
														<span slot="text">{{levelReturn_title}}
													<font>￥{{levelReturn_income}}</font>元</span>
												</yd-grids-item>
											
											<yd-grids-item :link="fun.getUrl(isFixedReward?'fixedReward':'',{})" v-if="unFixedReward && isFixedReward">
												<yd-icon slot="icon" class="icon-gudingjiangli" custom size="24px" color="#FF685D"></yd-icon>
												<span slot="text">{{fixedReward_title}}
													<font>￥{{fixedReward_income}}</font>元</span>
											</yd-grids-item>
											<yd-grids-item :link="fun.getUrl(isClockIn?'ClockPunch':'',{})" v-if="unClockIn && isClockIn">
												<yd-icon slot="icon" class="icon-daqia" custom size="24px" color="#FF685D"></yd-icon>
												<span slot="text">{{clockIn_title}}
													<font>￥{{clockIn_income}}</font>元</span>
											</yd-grids-item>
										
										<yd-grids-item :link="fun.getUrl(isVideoDemand?'courseIncome':'',{})" v-if="unVideoDemand && isVideoDemand">
												<yd-icon slot="icon" class="icon-jiangshifenhong" custom size="24px" color="#FF685D"></yd-icon>
												<span slot="text">{{videoDemand_title}}
													<font>￥{{videoDemand_income}}</font>元</span>
											</yd-grids-item>
										
											
										</yd-grids-group>
</template>

			<h4>更多推广权限
				<span id="pricerg"></span>
					
			</h4>
			<!-- <h3>更多推广权限</h3> -->
<template>
	<yd-grids-group :rows="2">
		<yd-grids-item :link="fun.getUrl('distribution',{})" v-if="unCommissionShow && !isCommissionShow">
			<yd-icon slot="icon" class="icon-fenxiao" custom size="24px" color="#FF685D"></yd-icon>
			<span slot="text">{{commission_title}}
													<font>￥{{commission_income}}</font>元</span>
		</yd-grids-item>
		<yd-grids-item :link="fun.getUrl(isAreaDividendShow?'regionalAgencyCenter':'applyRegionalAgency',{})" v-if="unAreaDividendShow && !isAreaDividendShow">
			<yd-icon slot="icon" class="icon-quyufenhong" custom size="24px" color="#FF685D"></yd-icon>
			<span slot="text">{{area_dividend_title}}
													<font>￥{{area_dividend_income}}</font>元</span>
		</yd-grids-item>
		<yd-grids-item :link="fun.getUrl(isTeamDividendShow?'':'teamAgentCenter',{})" v-if="unTeamDividendShow && !isTeamDividendShow">
			<yd-icon slot="icon" class="icon-42baoxianxiangqing" custom size="24px" color="#FF685D"></yd-icon>
			<span slot="text">{{team_dividend_title}}
													<font>￥{{team_dividend_income}}</font>元</span>
		</yd-grids-item>
		<yd-grids-item :link="fun.getUrl(isMerchantShow?'':'enterprise_apply',{})" v-if="unMerchantShow && !isMerchantShow">
			<yd-icon slot="icon" class="icon-zhaoshang" custom size="24px" color="#FF685D"></yd-icon>
			<span slot="text">{{merchant_title}}
													<font>￥{{merchant_income}}</font>元</span>
		</yd-grids-item>
		<yd-grids-item :link="fun.getUrl(isMicroShow?'':'microShop_apply',{})" v-if="unMicroShow && !isMicroShow">
			<yd-icon slot="icon" class="icon-weidian" custom size="24px" color="#FF685D"></yd-icon>
			<span slot="text">{{micro_title}}
													<font>￥{{micro_income}}</font>元</span>
		</yd-grids-item>
		<yd-grids-item :link="fun.getUrl(isSingleReturnShow?'':'single_return_center',{})" v-if="unSingleReturnShow && !isSingleReturnShow">
			<yd-icon slot="icon" class="icon-shangchengdingdan" custom size="24px" color="#FF685D"></yd-icon>
			<span slot="text">{{singleReturn_title}}
													<font>￥{{singleReturn_income}}</font>元</span>
		</yd-grids-item>
		<yd-grids-item :link="fun.getUrl(isTeamLevelReturnShow?'':'teamlevel_return_center',{})" v-if="unTeamLevelReturnShow && !isTeamLevelReturnShow">
			<yd-icon slot="icon" class="icon-tuanduifanxian" custom size="24px" color="#FF685D"></yd-icon>
			<span slot="text">{{teamLevelReturn_title}}
													<font>￥{{teamLevelReturn_income}}</font>元</span>
		</yd-grids-item>
		<yd-grids-item :link="fun.getUrl(isConsumeReturnShow?'':'consume_return_center',{})" v-if="unConsumeReturnShow && !isConsumeReturnShow">
			<yd-icon slot="icon" class="icon-xiaofeifanxian" custom size="24px" color="#FF685D"></yd-icon>
			<span slot="text">{{consumeReturn_title}}
													<font>￥{{consumeReturn_income}}</font>元</span>
		</yd-grids-item>
		<yd-grids-item :link="fun.getUrl(isFullReturnShow?'':'full_return_center',{})" v-if="unFullReturnShow && !isFullReturnShow">
			<yd-icon slot="icon" class="icon-manefanxian" custom size="24px" color="#FF685D"></yd-icon>
			<span slot="text">{{fullReturn_title}}
													<font>￥{{fullReturn_income}}</font>元</span>
		</yd-grids-item>
		<yd-grids-item :link="fun.getUrl(isShareholderDividend?'':'shareholder_dividend',{})" v-if="unShareholderDividend && !isShareholderDividend">
			<yd-icon slot="icon" class="icon-gudongfenhong" custom size="24px" color="#FF685D"></yd-icon>
			<span slot="text">{{shareholderDividend_title}}
													<font>￥{{shareholderDividend_income}}</font>元</span>
		</yd-grids-item>
		<yd-grids-item :link="fun.getUrl(islevelReturn?'':'level_return',{})" v-if="unlevelReturn && !islevelReturn">
			<yd-icon slot="icon" class="icon-dengji" custom size="24px" color="#FF685D"></yd-icon>
			<span slot="text">{{levelReturn_title}}
													<font>￥{{levelReturn_income}}</font>元</span>
		</yd-grids-item>
		<yd-grids-item :link="fun.getUrl(isFixedReward?'':'fixedReward',{})" v-if="unFixedReward && !isFixedReward">
			<yd-icon slot="icon" class="icon-gudingjiangli" custom size="24px" color="#FF685D"></yd-icon>
			<span slot="text">{{fixedReward_title}}
													<font>￥{{fixedReward_income}}</font>元</span>
		</yd-grids-item>
		<yd-grids-item :link="fun.getUrl(isClockIn?'':'ClockPunch',{})" v-if="unClockIn && !isClockIn">
			<yd-icon slot="icon" class="icon-daqia" custom size="24px" color="#FF685D"></yd-icon>
			<span slot="text">{{clockIn_title}}
													<font>￥{{clockIn_income}}</font>元</span>
		</yd-grids-item>
		<yd-grids-item :link="fun.getUrl(isVideoDemand?'':'courseIncome',{})" v-if="unVideoDemand && !isVideoDemand">
			<yd-icon slot="icon" class="icon-jiangshifenhong" custom size="24px" color="#FF685D"></yd-icon>
			<span slot="text">{{videoDemand_title}}
													<font>￥{{videoDemand_income}}</font>元</span>
		</yd-grids-item>
	</yd-grids-group>
</template>

			<h4>收入</h4>
<template>
	<yd-cell-group>
		<yd-cell-item arrow type="link" :href="fun.getUrl('incomedetails',{})">
			<span slot="left">收入明细</span>
			<span slot="right"></span>
		</yd-cell-item>
		<yd-cell-item arrow type="link" :href="fun.getUrl('income',{})">
			<span slot="left">收入提现</span>
			<span slot="right"></span>
		</yd-cell-item>
	</yd-cell-group>
</template>
		</div>
		<div style="height:60px"></div>

	</div>
</template>

<script>
	import index_controller from "./index_controller";
	export default index_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	@font-face {
		font-family: "iconfont";
		/* project id 432132 */
		src: url("//at.alicdn.com/t/font_432132_vo5ucd8n7xbhuxr.eot");
		src: url("//at.alicdn.com/t/font_432132_vo5ucd8n7xbhuxr.eot?#iefix") format("embedded-opentype"), url("//at.alicdn.com/t/font_432132_vo5ucd8n7xbhuxr.woff") format("woff"), url("//at.alicdn.com/t/font_432132_vo5ucd8n7xbhuxr.ttf") format("truetype"), url("//at.alicdn.com/t/font_432132_vo5ucd8n7xbhuxr.svg#iconfont") format("svg");
	}
	#income {
		.header {
			height: auto;
			background: #f15353;
			background-size: 100% 100%;
			padding: 10px;
			position: relative;
		}
		.header .user {
			height: 120px;
			text-align: center;
		}
		.header .user .user-head {
			box-sizing: content-box;
			height: 48px;
			width: 48px;
			background: #fff;
			border-radius: 50%;
			border: 2px solid #fff;
			margin: 6px auto;
		}
		.header .user .user-head img {
			height: 48px;
			width: 48px;
			border-radius: 50%;
		}
		.header .user .user-info {
			height: 48px;
			width: 100%;
			float: left;
			color: #fff;
		}
		.header .user .user-info .user-name {
			height: 24px;
			width: auto;
			font-size: 0.8rem;
			line-height: 20px;
		}
		.header .user .user-info .user-other {
			height: 20px;
			width: auto;
			font-size: 0.8rem;
			opacity: 0.8;
		}
		.header .user-gold {
			height: 35px;
			width: 94%;
			padding: 5px 3%;
			border-bottom: 1px solid #e3e3e3;
			background: #fff;
			font-size: 0.8rem;
			line-height: 35px;
		}
		.header .user-gold .title {
			height: 35px;
			width: auto;
			float: left;
			color: #666;
		}
		.header .user-gold .num {
			height: 35px;
			width: auto;
			float: left;
			color: #f90;
		}
		.header .user-gold .draw {
			width: 80px;
			height: 30px;
			background: #6c9;
			float: right;
		}
		.header .user .set {
			position: absolute;
			right: 10px;
			top: 10px;
			color: #fff;
			font-size: 0.9rem;
		}
		.header .user-op {
			height: 35px;
			width: 94%;
			padding: 5px 3%;
			border-bottom: 1px solid #e3e3e3;
			background: #fff;
			font-size: 0.8rem;
			line-height: 35px;
		}
		h3 {
			background: #fff;
			margin: 10px 0 0;
			font-weight: normal;
			font-size: 0.9rem;
			height: 2.5rem;
			box-sizing: border-box;
			line-height: 2.5rem;
			color: #f15353;
			border-bottom: 1px solid #ddd;
			span {
				color: #999;
			}
		}
		h4 {
			background: #f5f5f5;
			text-align: left;
			font-weight: normal;
			font-size: 0.8rem;
			height: 2.3rem;
			box-sizing: border-box;
			line-height: 2.3rem;
			color: #333;
			border-bottom: 1px solid #eee;
			padding: 0 10px;
			span {
				color: #999;
			}
		}
		#gongge {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			align-items: center;
			justify-content: space-between;
			background: #fff;
			column-count: 3;
			padding: 10px 0;
			margin-bottom: 10px;
			li {
				flex: 33%;
				padding: 0 10px;
				border: 1px solid #ccc;
				margin: 3px;
				border-radius: 5px;
				i {
					font-size: 34px;
					color: #eb3943;
					margin: 10px 0;
				}
				a {
					color: #333;
					font-size: 0.9rem;
					img {
						width: 23px;
						margin: 5px 0;
					}
					font {
						color: #e84e40;
						font-size: 0.8rem;
						padding-top: 5px;
					}
				}
			}
		}
		#un-gongge {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			background: #fff;
			column-count: 3;
			padding: 10px 0;
			li {
				flex: 25%;
				padding: 0 10px;
				i {
					font-size: 34px;
					margin: 15px 0;
				}
				a {
					color: #333;
					font-size: 0.8rem;
					img {
						width: 23px;
						margin: 5px 0;
					}
					font {
						color: #e84e40;
						font-size: 0.8rem;
						padding-top: 5px;
					}
				}
			}
		}
		#pricerg {
			text-align: right;
			float: right;
		}
		.mszf {
			background: #fff;
			padding: 0 10px;
			margin: 0;
			text-align: left;
			overflow: hidden;
			margin-top: 10px;
			height: 44px;
			box-sizing: border-box;
			line-height: 44px;
			font-size: 0.857rem;
			color: #333;
			i {
				font-size: 17px;
				float: right;
				line-height: 44px;
				color: #999;
			}
			span {
				float: left;
			}
			a {
				color: #000000;
				display: block;
			}
		}
	}
	a {
		text-decoration: none;
		color: #222;
	}
	input {
		border-width: 0;
	}
	.myextension .banner img {
		width: 100%;
	}
	.myextension .main {
		position: relative;
		top: -4px;
	}
	.welcome {
		padding: 10px;
		background: #ffffff;
		.text {
			p {
				font-size: 0.8rem;
				color: #666;
				line-height: 1.2rem;
				span {
					color: #f55955;
				}
			}
		}
		.info {
			margin-top: 10px;
			input {
				display: block;
				margin-bottom: 8px;
				width: 100%;
				height: 2rem;
				border-radius: 5px;
				padding: 0 5px;
				box-sizing: border-box;
				outline: none;
			}
			.inp {
				border: 1px solid #b8b8b8;
			}
			.inp:focus {
				border-color: #f55955;
				box-sizing: border-box;
			}
			span {
				color: #f55955;
			}
			.btn {
				background: #f55955;
				color: #ffffff;
				margin-bottom: 8px;
				width: 100%;
				height: 2rem;
				border-radius: 5px;
				padding: 0 5px;
				box-sizing: border-box;
				text-align: center;
				font-size: 0.8rem;
				line-height: 2rem;
				i {
					display: inline-block;
				}
			}
			.btn:focus {
				background: #d8403c;
			}
		}
	}
	.myextension .main .vip_main {
		background: #ffffff;
		margin: 15px 0;
		.title {
			padding: 10px;
			font-size: 0.8rem;
			border-bottom: 1px solid #eeeeee;
			text-align: center;
		}
		.vip {
			padding: 15px 10px;
			overflow: hidden;
			font-size: 0.8rem;
			color: #999;
			.ico1,
			.ico2 {
				width: 15%;
				float: left;
			}
			.ico1 {
				i {
					background: #32cd32;
				}
			}
			.ico2 {
				i {
					background: #fece00;
				}
			}
			.text {
				float: left;
				width: 85%;
				.t1 {
					font-size: 0.95rem;
					color: #333;
					margin-bottom: 5px;
					text-align: left;
				}
				.t2 {
					text-align: justify;
				}
			}
			i {
				background: #32cd32;
				height: 36px;
				width: 36px;
				border-radius: 18px;
				color: #fff;
				text-align: center;
				line-height: 38px;
				font-size: 1.2rem;
			}
		}
		.vip1 {
			border-bottom: 1px solid #eeeeee;
		}
	}
	.myextension .success {
		height: 200px;
		padding-top: 65px;
		background: #ffffff;
		.ico {
			height: 65px;
			width: 65px;
			margin: auto;
			border: 3px solid #32cd32;
			border-radius: 4rem;
			color: #32cd32;
			font-size: 2.3rem;
			text-align: center;
			line-height: 4rem;
		}
		.text {
			height: 2rem;
			margin-top: 30px;
			color: #666;
			line-height: 1.6rem;
			text-align: center;
		}
		a .sub {
			height: 2rem;
			width: 80%;
			background: #f55955;
			margin: 20px auto;
			border-radius: 2rem;
			color: #fff;
			line-height: 2rem;
			text-align: center;
			font-size: 0.9rem;
			margin-bottom: 20px;
		}
		a .sub:focus {
			background: #d8403c;
		}
	}
</style>
