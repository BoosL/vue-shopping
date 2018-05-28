<template>
	<div id="all">
		<mt-loadmore :top-method="loadTop" :top-status.sync="topStatus" @top-status-change="handleTopChange" ref="loadmore">

			<div id="member">
				<c-title :hide="true" text='home'></c-title>
				<div class="header">
					<!--<div class="back"><i class="mintui mintui-back" @click="goback"></i></div>-->
					<div class="user">
						<div class="user-head">
							<img v-lazy="avatar">
						</div>
						<div class="user-info">
							<div class="user-name">{{nickname}}</div>
							<div class="user-name">[{{$store.state.langService.language.langMember.langMemberId}}:{{uid}}]</div>
							<div class="user-other" v-if="MyReferrer.is_show=='1'">[推荐人:{{MyReferrer.nickname}}]
							</div>

							<div class="user-other" v-if="level_name">[{{level_name}}]
								<!--{{validity_value}}-->
								<!-- BossL 区代理有效期 -->
							</div>
							<div class="user-name" v-if="is_custom">{{custom_title}}:{{custom_value}}
							</div>
						</div>
						<div class="set" v-if="member_item">
							<router-link :to="fun.getUrl('info',{item:member_item})">
								<i class="fa fa-gear"></i>
							</router-link>
						</div>
					</div>
				</div>
				<div id="userinfo">
					<ul>
						<li>
							<router-link :to="fun.getUrl('balance')">
								<span>￥{{credit.data}}</span>
								<br>{{credit.text}}</router-link>
						</li>
						<li v-if="isLove">
							<router-link :to="fun.getUrl('love_index')">
								<span><!--{{integral.data}}-->{{credit.usable}}</span>
								<br>
								<!--{{integral.text}}-->{{love_name}}</router-link>
						</li>
						<li>
							<router-link :to="fun.getUrl('income')">
								<span>￥{{coupon}}</span>
								<br>提现</router-link>

						</li>
					</ul>
				</div>

				<div class="cart">
					<!--<router-link to="/member/marketing">
													<div class="list1" ><div class="ico marketing"></div>
														营销工具
														<i class="fa fa-angle-right" ></i></div>
												</router-link>-->
					<!--<router-link to=""><div class="list1" style="margin:0px;"><i class="iconfont icon-article"></i>我的消息<i class="fa fa-angle-right" style="color:#999; font-size:26px; float:right; line-height:44px;"></i></div></router-link>-->
					<router-link v-if="conference.length > 0" :to="fun.getUrl('conferenceList')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-baomingguanli" custom size="20px" color="#FF685D" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">活动报名</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>
					<router-link v-if="store_set && store_set.is_open_cashier==1" :to="fun.getUrl('cashier')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-shouyintai1" custom size="20px" color="#FF685D" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">收银台</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>
					<router-link :to="fun.getUrl('extension')" v-if="is_extension">
						<div class="list1">
							<yd-icon slot="icon" class="icon-circle-bell" custom size="20px" color="#FF685D" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">我的推广</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>

					<router-link v-if="haveShop==1" :to="fun.getUrl('microShop_home')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-weidian" custom size="20px" color="#FF685D" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">微店中心</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>
					<router-link v-else-if="haveShop==0" :to="fun.getUrl('microShop_apply')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-dianpu1" custom size="20px" color="#FF685D" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">我要开店</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>

					<!--<div id="service">
								<router-link :to= "fun.getUrl('service')">
									<div class="list1">
										<div class="ico extension"></div>我的服务
										<i class="fa fa-angle-right"></i></div>
								</router-link>
							</div>-->

					<div id="service" v-if="isELive">
						<router-link :to="fun.getUrl('lifeService')">
							<div class="list1">
								<yd-icon slot="icon" class="icon-shenghuojiaofei" custom size="20px" color="#FF685D" style="margin-right:6px"></yd-icon>
								<span slot="text" style="height:44px;line-height:44px;">生活缴费</span>
								<i class="fa fa-angle-right"></i>
							</div>
						</router-link>
					</div>

					<router-link :to="fun.getUrl('supplier')" v-if="supplier">
						<div class="list1">
							<yd-icon slot="icon" class="icon-shenqing1" custom size="20px" color="#FF685D" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">{{supplier.value}}</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>

					<router-link v-if="isLove" :to="fun.getUrl('love_index')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-duihuan1" custom size="20px" color="#FF685D" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">{{love_name}}</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>
					<router-link v-if="coin" :to="fun.getUrl('overseas_index')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-huobi" custom size="20px" color="#FF685D" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">{{coin_name}}</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>

					<router-link v-if="isStroe" :to="fun.getUrl('storeApply')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-mendian2" custom size="20px" color="#FF685D" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;"><!--门店申请-->我要开店</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>

					<router-link v-if="is_credit" :to="fun.getUrl('creditInfo')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-xinyong" custom size="20px" color="#FF685D" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">信用值</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>

					<router-link v-if="is_ranking" :to="fun.getUrl('rankingIndex')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-paihangbang" custom size="20px" color="#FF685D" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">排行榜</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>

					<!-- 帮助中心 BossL -->
					<!--<router-link v-if="is_notice" :to="fun.getUrl('notice',{id:'0'})">  
						<div class="list1">
							<yd-icon slot="icon" class="icon-yijiwu" custom size="20px" color="#FF685D" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">{{notice_title}}</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>-->

					<router-link v-if="is_clockin" :to="fun.getUrl('ClockPunch')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-daqia" custom size="20px" color="#FF685D" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">{{is_clockin_title}}</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>

					<router-link v-if="is_recharge_code" :to="fun.getUrl('rechargeCode')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-chongzhi" custom size="20px" color="#FF685D" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">充值码</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>
					<router-link v-if="is_stroeWithdraw" :to="fun.getUrl('storeManage')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-tixian" custom size="20px" color="#FF685D" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">门店提现</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>

					<router-link :to="fun.getUrl('CourseManage')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-kechengzhongxin" custom size="20px" color="#FF685D" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">课程中心</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>
					
					<a href="https://gas.xnzct.cn/addons/yun_shop/?menu#/articleContent/1?i=4&type=1&mid=null&shop_id">
						<div class="list1" style="position: relative;margin-left: 5px;">
							<img src="../../views/member/img/zhuanzhang.png" style="position: relative;left:-2px;top: 5px;width: 20px; height: 20px;">&nbsp;&nbsp;线下转账
							<i class="fa fa-angle-right" style="position: absolute;right: 4px;"></i>
						</div>
					</a>

					<!--<router-link :to= "fun.getUrl('rentIndex')">
					>>>>>>> b4c7a576a544b0f0d41c76a862a815c179930c5f
											<div class="list1">
												<div class="ico extension"></div>租赁中心
												<i class="fa fa-angle-right"></i></div>
										</router-link>-->

					<!--<router-link to="/member/alipay">
													<div class="list1" ><div class="ico newsetting"></div>支付宝测试
														<i class="fa fa-angle-right" ></i></div>
												</router-link>-->
				</div>

				<div style="height: 10px"></div>

				<div id="tool">
					<h3>基础工具</h3>
					<ul>
						<!--<li v-for="item in plugins">
													<router-link :to="{ name:item.to,params:{selected:'1'},query:{i:toi}}"><img :src="item.icon" />
														<br>{{item.name}}</router-link>
												</li>-->
						<!--<li>
							<router-link :to="fun.getUrl('collection',{selected:'1'})">
								<yd-icon class="iconfont icon-shoucang1" custom size="26px" color="#ffcd00"></yd-icon>
								</router-link>
								<div style="color=#8c8c8c;">收藏</div>
						</li>
						<li>
							<router-link :to="fun.getUrl('footprint',{selected:'1'})">
								<yd-icon class="iconfont icon-zuji" custom size="26px" color="#16de9a"></yd-icon>
								</router-link>
								<div style="color=#8c8c8c;">足迹</div>
						</li>
						<li>
							<router-link :to="fun.getUrl('myEvaluation',{selected:'1'})">
								<yd-icon class="iconfont icon-pinglun" custom size="26px" color="#3fcdf6"></yd-icon>
								</router-link>
								<div style="color=#8c8c8c;">评论</div>
						</li>-->
						<li>
							<router-link :to="fun.getUrl('myRelationship',{selected:'1'})">
								<yd-icon class="iconfont icon-guanxi" custom size="26px" color="#f97855" style="width:25%"></yd-icon>
							</router-link>
							<div style="color=#8c8c8c;">关系</div>
						</li>
						<li>
							<router-link :to="fun.getUrl('address',{selected:'1'})">
								<yd-icon class="iconfont icon-dizhi" custom size="26px" color="#51adf6"></yd-icon>
							</router-link>
							<div style="color=#8c8c8c;">地址管理</div>
						</li>
						<li>
							<router-link :to="fun.getUrl('coupon',{selected:'1'})">
								<yd-icon class="iconfont icon-youhuiquan" custom size="26px" color="#fc6060"></yd-icon>
							</router-link>
							<div style="color=#8c8c8c;">优惠券</div>
						</li>
						<li @click="openQrCode('block')" v-if="relation_switch">

							<yd-icon class="iconfont icon-erweima" custom size="26px" color="#51adf6"></yd-icon>
							<div style="color=#8c8c8c;">二维码</div>
						</li>
						<li v-if="isApp">
							<router-link :to="fun.getUrl('message',{selected:'1'})">
								<img src="../../../static/app/images/message.png">
								<br>消息通知</router-link>
						</li>
					</ul>
				</div>

				<!-- <div style="height: 10px;clear: both;"></div>

					<template>
					    <yd-cell-group>
					        <yd-cell-item arrow>
					            <yd-icon slot="icon" name="order" size=".42rem"></yd-icon>
					            <span slot="left">我的订单</span>
					            <span slot="right">查看全部订单</span>
					        </yd-cell-item>

					        <yd-cell-item arrow>
					            <img slot="icon" src="http://static.ydcss.com/ydui/img/logo.png">
					            <span slot="left">图标</span>
					            <span slot="right">图标是image</span>
					        </yd-cell-item>
					    </yd-cell-group>
					</template> -->

				<div id="orderlist">
					<div class="ordertltie">
						<!--to="/member/orderList/0"-->
						<router-link :to="fun.getUrl('orderlist',{ status:'0' })">
							<div class="ordername">我的订单</div>
							<div class="">
								<i class="fa fa-angle-right"></i>
							</div>
						</router-link>
					</div>
					<div class="order_all">
						<router-link :to="fun.getUrl('orderlist',{ status:'1'})">
							<div class="order_pub">
								<div class="badge">{{waitPay==0?'':waitPay}}</div>
								<i class="fa money"></i>
								<br>待付款
							</div>
						</router-link>
						<router-link :to="fun.getUrl('orderlist',{ status:'2' })">

							<div class="order_pub">
								<div class="badge ">{{waitSend==0?'':waitSend}}</div>
								<i class="fa box"></i>
								<br>待发货
							</div>
						</router-link>
						<router-link :to="fun.getUrl('orderlist',{ status:'3'})">

							<div class="order_pub">
								<div class="badge ">{{waitReceive==0?'':waitReceive}}</div>
								<i class="fa car"></i>
								<br>待收货
							</div>

						</router-link>
						<!--aftersaleslist-->
						<router-link :to="fun.getUrl('aftersaleslist')">
							<div class="order_pub">
								<div class="badge">{{waitrRefund==0?'':waitrRefund}}</div>
								<i class="fa refun"></i>
								<br>待退款
							</div>
						</router-link>
					</div>

				</div>

				<div style="height: 10px;clear: both;"></div>
				<mt-button type="primary" size="large" @click="outInfo($event)" v-if="myType==5">退出登录</mt-button>
				<div id="copyright">©{{copyright}}&nbsp;</div>

				<div style="height: 60px;clear: both;"> </div>
				<!--<div slot="top" class="mint-loadmore-top">
												<span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
												<span v-show="topStatus === 'loading'">Loading...</span>
											</div>-->
			</div>
		</mt-loadmore>
		<div id="ewm" ref="hook" @click="openQrCode('none')">

			<div class="pic">

				<img :src="poster" alt="">

			</div>

		</div>
		<div id="jpg"></div>
	</div>
</template>

<script>
	import member from "./membercontroller";
	export default member;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	@import "../../assets/css/member.scss";
</style>