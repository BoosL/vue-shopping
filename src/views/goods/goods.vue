<template>
	<transition name="fade2">
		<div id="goods">
			<div id="hoid" @click="goto" :class="{hoet:hoet}">
				<div id="back">
					<i class="mintui mintui-back"></i>
				</div>
			</div>
			<div id="cart" @click="gotoCart" :class="{hoet:hoet}">
				<div id="back">
					<i class="fa fa fa-cart-plus"></i>
				</div>
			</div>
			<div id="member" @click="gotoMember" :class="{hoet:hoet}">
				<div id="back">
					<i class="fa fa-user"></i>
				</div>
			</div>

			<c-myswipe style="height: 100vw;" :pagination-visible="true" :slides="goodsInfo.thumb_url" :repeating="true" :auto="0">

				<div v-for="(ithumb,index) in goodsInfo.thumb_url" :key="index">
					<template v-if='ithumb'>
						<img :src="ithumb" width="100%">
					</template>
					<template v-if='!ithumb'>
						<img src="../../assets/images/img_default.png" width="100%">
					</template>
				</div>
			</c-myswipe>

			<el-row>
				<el-col :span="21" id='tilie'>{{goodsInfo.title}}</el-col>
				<el-col :span="3">
					<div id='share' @click="shareWeixin()">
						<i class="fa fa-share-alt" aria-hidden="true"></i>
						<br/>
						<span>分享</span>
					</div>
				</el-col>
			</el-row>

			<el-row>
				<el-col :span="24" id='price' v-if="!isGoodsLove">￥
					<span id="price-num">{{(goodsInfo.has_option==1?goodsInfo.min_price+"-"+goodsInfo.max_price:goodsInfo.price)}}</span>
				</el-col>

				<div :span="24" id='price'  v-if="isGoodsLove">
						<div id="price-num" style="position:absolute;top:0;color: #ff0000;font-size: 20px;font-weight: 600;text-align: left;width: 120px;">￥{{goodsInfo.price}}</div>
                        <div id="price-num" style="position:relative; left : 5px;font-size: 0.8rem; top: 20px; text-align: left;color:#000">原价:￥{{market_price}}</div>
					
						<div id="price-num" style="font-size: 0.8rem;position:absolute;left:120px;top: 5px;color: #ff9500;" v-if="reward_love>0">
							赠送<!--{{goods_love_name}}-->积分&nbsp;<span style="font-size: 1rem !important;color: ;">{{reward_love}}</span>
						</div>
						<div id="price-num" style="font-size: 0.8rem;position:absolute;left:240px;top: 5px;color: #ff9500;"  v-if="deduction_love>0">
							抵扣<!--{{goods_love_name}}-->积分&nbsp;<span style="font-size: 1rem !important;color: ;">{{deduction_love}}</span>
						</div>
					
				</div>
				<div style="height: 20px"></div>

				<!--<el-col :span="24" id='price' v-if="!isGoodsLove">￥
					<span id="price-num">{{(goodsInfo.has_option==1?goodsInfo.min_price+"-"+goodsInfo.max_price:goodsInfo.price)}}</span>
				</el-col>

				<el-col :span="24" id='price' style="background: #f2efef;" v-if="isGoodsLove">
					<el-col :span="5" style="    background: #ffe000;padding: 8px;color: #000;">
						<div id="price-num" style="font-size: 0.8rem;font-weight: 600;text-align: center;">天天兑价</div>
						<div id="price-num" style="font-size: 0.8rem;font-weight: 600;text-align: center;">￥{{goodsInfo.price}}</div>
					</el-col>

					<el-col :span="19" class="sale" style="text-align:left;padding-left:10px;">
						<div id="price-num" style="font-size: 0.8rem;font-weight: 600;text-align: left;    margin-bottom: 5px;margin-top: 5px;">￥{{goods_love_cash+" + "+goods_love_deduction+goods_love_name}}</div>
						<div id="price-num" style="font-size: 0.8rem;font-weight: 600;text-align: left;color:#000">原价:￥{{goodsInfo.price}}</div>
					</el-col>
				</el-col>-->
				<el-col :span="24" id='stockcontainer'>
					<el-col :span="12" style="padding-left: 5px;">库存:{{goodsInfo.stock}}</el-col>
					<el-col :span="12" class="sale">销量:{{goodsInfo.show_sales}}</el-col>
				</el-col>

			</el-row>

			<mt-button class="good_speci" v-if="!is_o2o&&isGoods&&goodsInfo.has_option!=1" @click="buyNow">
				<span id="optiondiv">{{(goodsCount>0)?"已添加"+goodsCount+goodsInfo.sku:"请选择商品数量"}}</span>
				<i class="fa fa-angle-right" style="margin-right:0px;float:right; line-height:44px; font-size:26px; color: #666;"></i>
			</mt-button>

			<mt-popup v-model="popupSpecs" position="bottom" class="mint-popup-4" closeOnClickModal='true'>
				<div class="specifications">
					<div class="shopimg">
						<div id="chooser_img">
							<img :src="popThumb">
						</div>
						<div class="right">
							<div class="price">￥
								<span id="option_price">{{popPrice}}</span>
							</div>
							<div class="option">库存{{popStock}}{{goodsInfo.sku}}</div>
							<div class="option">{{goodsDescription}}</div>
						</div>
					</div>

					<div class="shopinfo">
						<dl v-for="specs in goodsInfo.has_many_specs">
							<dt>{{specs.title}}</dt>
							<dd>
								<el-radio-group v-model="specs.description" size='small' fill='#f15353' @change="selectSpecs">
									<el-radio-button :disabled=specitem.c v-for="specitem in specs.specitem" :label="specitem">{{specitem.title}}</el-radio-button>
								</el-radio-group>
							</dd>
						</dl>

					</div>

					<el-row>
						<el-col :span="12" id='num'>购买数量：</el-col>
						<el-col :span="11">
							<div class="num">

								<div class="leftnav" @click='reduceGoods'>-</div>
								<input type="text" disabled=false class="shownum" v-model='goodsCount'>
								<div class="rightnav" @click='addGoods'>+</div>
							</div>
						</el-col>
					</el-row>
					<el-button size='small' id='btsmall' type='danger' @click="submitAction">确认</el-button>
				</div>
			</mt-popup>

			<mt-popup v-model="popupSpecs2" position="bottom" class="mint-popup-4" closeOnClickModal='true'>
				<div class="specifications">
					<div class="shopimg">
						<div id="chooser_img">
							<img :src="popThumb">
						</div>
						<div class="right">
							<div class="price">￥
								<span id="option_price">{{popPrice}}</span>
							</div>
							<div class="option">库存{{popStock}}{{goodsInfo.sku}}</div>
							<div class="option">{{goodsDescription}}</div>
						</div>
					</div>

					<el-row>
						<el-col :span="12" id='num'>购买数量：</el-col>
						<el-col :span="11">
							<div class="num">

								<div class="leftnav" @click='reduceGoods'>-</div>
								<input type="text" disabled=false class="shownum" v-model='goodsCount'>
								<div class="rightnav" @click='addGoods'>+</div>
							</div>
						</el-col>

					</el-row>
					<el-button size='small' id='btsmall' type='danger' @click="buyNowNew">确认</el-button>
				</div>
			</mt-popup>

			<div id="foot">
				<div class="addfav" :class="{'nocar':!isGoods}" type="info" v-if="!is_o2o">
					<template v-if="!favorite">
						<i class="fa fa-star normal" @click="onFavorite(favorite)"></i>收藏
					</template>
					<template v-if="favorite">
						<i class="fa fa-star active" @click="onFavorite(favorite)"></i>收藏
					</template>
				</div>
				<div class="addfav" type="info" v-if="!is_o2o">
					<template>
						<i class="fa fa-cart-plus active" @click="gotoCart()"></i>购物车
					</template>
				</div>
				<div class="cservice" v-if="!is_o2o&&cservice">
					<a :href="cservice">
						<i class="iconfont icon-kefu"></i>客服</a>
				</div>
				<div :class="{'cart':true,'cell':true,'nocar':!isGoods||!isAddCart}" @click="addCart">加入购物车</div>
				<div class="buy cell" :class="{'nocar':!isGoods}" v-if="!is_o2o" @click="buyNow">立即购买</div>
			</div>

			<div style="height: 10px;"></div>
			<div id="shopInfo" ref='goodinfo' :class="{goodTop:goodTop==true}">
				<div id="tabs">
					<el-tabs v-model="activeName" @tab-click="handleClick">
						<el-tab-pane label="商品介绍" name="first">
							<div id="goods_content" v-html='first_content'></div>
						</el-tab-pane>
						<el-tab-pane label="商品参数" name="second">
							<div class="parameter" v-for="item in second_content">
								<div class="par-info">
									<span class="name">{{item.title}}</span>
									<span class="value">{{item.value}}</span>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane label="用户评价" name="third">
							<div style="margin-bottom: 50px;">
								<div class="pj" v-for="n in third_content">
									<div layout="row" layout-align="start center" id="user">
										<div>
											<img :src="n.head_img_url" />
										</div>
										<div>{{n.nick_name}}</div>
										<div>{{n.created_at}}</div>
									</div>
									<el-rate v-model="n.level" disabled show-text text-color="#ff9900" text-template="{value}">
									</el-rate>
									<p>{{n.content}}</p>

									<div v-if="n.append">
										<p class="last_day">追评
											<span>{{n.append.created_at}}</span>
										</p>
										<p class="">{{n.append.content}}</p>
									</div>

									<div class="comment">
										<span @click='toContentInfo(n)'>评论数:{{n.reply_count}}</span>
									</div>
								</div>
							</div>

						</el-tab-pane>
					</el-tabs>
				</div>
				<div style="height: 60px"></div>
			</div>

		</div>

	</transition>
</template>

<script>
	import goods from './goods_controller';
	export default goods;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	@import '../../assets/css/goods.scss'
</style>