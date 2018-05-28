<template>
	<transition name="fade">
		<div id="goods">
			<div id="hoid"
			     @click="goto"
			     :class="{hoet:hoet}">
				<div id="back"><i class="mintui mintui-back"></i></div>
			</div>
			<mt-loadmore :top-method="loadTop"
			             @top-status-change="handleTopChange"
			             :bottom-method="loadBottom"
			             :bottom-all-loaded="allLoaded"
			             ref="loadmore"
			             topPullText=''
			             topDropText=''
			             topLoadingText=''
			             bottomPullText=''
			             bottomDropText=''
			             bottomLoadingText=''>
	
				<mt-swipe :auto="0"
				          @change="handleChange">
					<mt-swipe-item v-for="thumb in goodsInfo.thumb_url">
						<img :src="thumb">
					</mt-swipe-item>
				</mt-swipe>
				<el-row>
					<el-col :span="19"
					        :offset="1"
					        id='tilie'>{{goodsInfo.title}}</el-col>
					<el-col :span="4">
						<div id='share' @click="shareWeixin()">
							<i class="fa fa-share-alt"
							   aria-hidden="true"></i>
							<br/><span>分享</span>
						</div>
					</el-col>
				</el-row>
	
				<el-row>
					<el-col :span="10"
					        :offset="1"
					        id='price'>￥<span id="price-num">{{(goodsInfo.has_option==1?goodsInfo.min_price+"-"+goodsInfo.max_price:goodsInfo.price)}}</span></el-col>
					<el-col :span="13"
					        id='stockcontainer'>库存:{{goodsInfo.stock}} 销量:{{goodsInfo.show_sales}}</el-col>
					<!--	<el-col :span="24"
						        id='other'><i class="fa fa-cube"></i> 积分抵扣 <span style="color:#ff6600">20.00</span> 元</el-col>-->
				</el-row>
	
				<!--<mt-button @click.native="popupVisible4 = true" size="large" class="good_speci"> <span id="optiondiv">请选择商品规格及数量</span>
						 <i class="fa fa-angle-right" style="float:right; line-height:44px; font-size:26px; color: #666;"></i>
						</mt-button>-->
	
				<div id="poeg">
					<div class="title">继续拖动，查看图文详情</div>
					<div class="spas"></div>
				</div>
				<div style="height: 60px"></div>
			</mt-loadmore>
			<mt-popup v-model="popupSpecs"
			          position="bottom"
			          class="mint-popup-4"
			          closeOnClickModal='true'>
				<div class="specifications">
					<div class="shopimg">
						<div id="chooser_img">
							<img :src="popThumb">
						</div>
						<div class="right">
							<div class="price">￥<span id="option_price">{{popPrice}}</span></div>
							<div class="option">库存{{popStock}}{{goodsInfo.sku}}</div>
							<div class="option">{{goodsDescription}}</div>
						</div>
					</div>
	
					<div class="shopinfo">
						<dl v-for="specs in goodsInfo.has_many_specs">
							<dt>{{specs.title}}</dt>
							<dd>
								<el-radio-group v-model="specs.description"
								                size='small'
								                fill='#f15353'
								                @change="selectSpecs">
									<el-radio-button :disabled=specitem.c
									                 v-for="specitem in specs.specitem"
									                 :label="specitem">{{specitem.title}}</el-radio-button>
								</el-radio-group>
							</dd>
						</dl>
	
					</div>
	
					<el-row>
						<el-col :span="12"
						        id='num'>购买数量：</el-col>
						<el-col :span="12">
							<div class="num">
								<button id="btn_minus"><i class="fa fa-minus"
									   @click="reduceGoods"></i></button>
								<input type="text"
								       id="total"
								       disabled="false"
								       v-model="goodsCount">
								<button id="btn_plus"><i class="fa fa-plus"
									   @click="addGoods"></i></button>
							</div>
						</el-col>
	
					</el-row>
					<el-button size='small'
					           id='btsmall'
					           type='danger'
					           @click="submitAction">确认</el-button>
				</div>
			</mt-popup>
	
			<el-row id='foot'>
				<el-col :span="8">
					<div class="addfav" :class="{'nocar':!isGoods}" 
					     type="info">
						<template v-if="!favorite"><i class="fa fa-star normal"
							   @click="onFavorite(favorite)"></i> </br> 收藏</i>
						</template>
						<template v-if="favorite"><i class="fa fa-star active"
							   @click="onFavorite(favorite)"></i> </br> 收藏</i>
						</template>
					</div>
				</el-col>
				<el-col :span="8">
					<div :class="{'cart':true,'cell':true,'nocar':!isGoods}" 
					     @click="addCart">加入购物车</div>
				</el-col>
				<el-col :span="8">
					<div class="buy cell" :class="{'nocar':!isGoods}" 
					     @click="buyNow">立即购买</div>
				</el-col>
			</el-row>
	
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