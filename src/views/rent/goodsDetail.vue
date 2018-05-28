<template>
	<transition name="fade2">
		<div id="goods">
			<div id="hoid" @click="goto" :class="{hoet:hoet}">
				<div id="back">
					<i class="mintui mintui-back"></i>
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
				<el-col :span="21" id='tilie'>1{{goodsInfo.title}}</el-col>
				<el-col :span="3">
					<div id='share' @click="shareWeixin" class="rt">
						<i class="fa fa-share-alt" aria-hidden="true"></i>
						<br/>
						<span>分享</span>
					</div>
				</el-col>
			</el-row>
	
			<el-row>
				<el-col :span="24" id='price'>￥
					<span id="price-num">{{(goodsInfo.has_option==1?goodsInfo.min_price+"-"+goodsInfo.max_price:goodsInfo.price)}}</span>
				</el-col>
				<el-col :span="24" id='stockcontainer'>
					<el-col :span="12" v-if="isLeaseGoods">押金：{{cash}}</el-col>
					<el-col :span="12" class="sale">库存:{{goodsInfo.stock}}&nbsp;&nbsp;销量:{{goodsInfo.show_sales}}</el-col>
				</el-col>
				<el-col :span="24" class="trans" v-if="isCanPresended">支持转赠
					<i class="iconfont icon-tishi" @click="changeTransfer"></i>
				</el-col>
			</el-row>
	
			<!-- 弹窗 -->
			<div class="modal" v-show="transfer">
				<div class="modal-dialog">
					<div class="close" @click="changeTransfer">
						<img src="../../assets/images/close.png">
					</div>
					<h1 class="title">转赠说明</h1>
					<p>如果你无法简洁的表达你的想法，那么说明你还不都了解他---阿尔伯特-爱因斯坦</p>
				</div>
			</div>
	
			<mt-popup v-model="popupSpecs" position="bottom" class="mint-popup-4" closeOnClickModal='true'>
				<div class="specifications">
					<div class="shopimg">
						<div id="chooser_img">
							<img :src="popThumb">
						</div>
						<div class="right">
							<div class="price">￥
								<span id="option_price">{{popPrice}}1</span>
							</div>
							<div class="option">库存{{popStock}}{{goodsInfo.sku}}</div>
							<div class="option">{{goodsDescription}}</div>
						</div>
					</div>
	
					<div class="shopdata">
						<ul v-if="false">
							<li v-for="(shopdata,index) in shopdatas">
								{{shopdata.title}}租：{{shopdata.day}}元/天
								<span class="rt">{{shopdata.tip}}</span>
							</li>
						</ul>
	
						<template>
							<el-radio-group v-model="shopdatasItem" size='small' fill='#f15353' @change="selectRentType">
								<!--@change="selectSpecs">-->
								<el-radio-button :disabled="item.c" v-for="(item,index) in shopdatas" :label="item">{{item.name+" "+item.value+"/"+item.time_unit}}</el-radio-button>
							</el-radio-group>
						</template>
	
						<!--日期-->
						<div class="block">
							<span class="demonstration lf">起借日期</span>
							<el-date-picker v-model="rentDate" type="date" placeholder="选择日期" :picker-options="pickerOptions0" :editable="false" format="yyyy-MM-dd" @change="rentDateChange">
							</el-date-picker>
						</div>
	
						<el-row>
							<el-col :span="8" id='num'>租赁周期：</el-col>
							<el-col :span="13">
								<div class="num">
									<div class="leftnav" @click='reduceDays'>-</div>
									<input type="text" disabled=false class="shownum" v-model='rentDay'>
									<div class="rightnav" @click='addDays'>+</div>
								</div>
							</el-col>
							<el-col :span="2">
								<span>{{rentDayType}}</span>
							</el-col>
						</el-row>
					</div>
	
					<div class="shopinfo" v-if="has_option">
						<dl v-for="specs in goodsInfo.has_many_specs">
							<dt>{{specs.title}}</dt>
							<dd>
								<el-radio-group v-model="specs.description" size='small' fill='#f15353' @change="selectSpecs">
									<!--@change="selectSpecs">-->
									<el-radio-button :disabled="specitem.c" v-for="(specitem,index) in specs.specitem" :label="specitem">{{specitem.title}}</el-radio-button>
								</el-radio-group>
							</dd>
						</dl>
	
					</div>
	
					<div class="shopcount">
						<el-row>
							<el-col :span="12" id='num'>租赁数量：</el-col>
							<el-col :span="11">
								<div class="num">
	
									<div class="leftnav" @click='reduceGoods'>-</div>
									<input type="text" disabled=false class="shownum" v-model='goodsCount'>
									<div class="rightnav" @click='addGoods'>+</div>
	
								</div>
							</el-col>
						</el-row>
					</div>
	
					<div class="shopconf">
						<div class="allMoney lf" v-if="false">
							<span>合计：
								<b>{{}}</b>
							</span>
						</div>
						<div class="confirm rt" @click='confirm'>确定</div>
						<!--<router-link :to="fun.getUrl('confirmOrder')">
									<div class="confirm rt">确定</div>
								</router-link>-->
	
					</div>
	
				</div>
			</mt-popup>
			<div id="foot">
				<div class="addfav" type="info" @click="btnsPop=false">
					<template>
						<i class="iconfont icon-guhua"></i>热线
					</template>
					<div class="modal" v-show="btnsPop" @click.stop="btnsPop=false">
						<div class="btns" @click.stop>
							<button>呼叫</button>
							<button>添加到通讯录</button>
						</div>
					</div>
				</div>
				<div class="cservice">
					<a :href="$store.state.cservice">
						<i class="iconfont icon-kefu"></i>客服</a>
				</div>
	
				<!--<router-link :to="fun.getUrl('rentCenter')">-->
				<div class="buy cell" @click="buyNow">立即租</div>
				<!--</router-link>-->
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
										<span @click=''>评论数:{{n.reply_count}}</span>
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
import goods from './goodsDetail_controller';
export default goods;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/css/goods.scss';
.active {
	background: #f15353;
	border: 1px solid #f15353;
	color: #fff
}

.trans {
	text-align: left;
	color: #999;
	height: 26px;
	line-height: 26px;
	i {
		margin-left: 5px;
		font-size: 20px;
		color: #f15353;
		vertical-align: middle;
	}
}

.addfav {
	i {
		font-size: 30px;
		margin: 0;
		padding: 0;
		display: block;
		color: #f15353;
	}
}

#goods .specifications {
	.shopdata {
		border-bottom: 1px dotted #ccc;
		ul {
			padding: 7px 15px;
			li {
				height: 20px;
				line-height: 20px;
				border: 1px solid #ccc;
				border-radius: 6px;
				margin: 7px 0;
				padding: 4px 10px;
				text-align: left;
			}
		}
		.block {
			line-height: 30px;
			padding: 0 15px;
			display: flex;
			flex-flow: flex;
			span {
				width: 90px;
				text-align: left
			}
			.el-date-editor.el-input {
				flex: 1;
			}
		}
		.num {
			margin-top: 3px
		}
	}
	.shopinfo {
		margin: 7px 0 0 0;
		padding-left: 15px;
	}
	.shopcount {
		#num {
			padding: 0 5px;
			color: #333
		}
		.el-row {
			padding: 0px 10px 10px 10px;
		}
	}
}

#goods .shopdata .el-row {
	padding: 5px;
	line-height: 28px;
	#num {
		color: #333
	}
	span {
		font-size: 12px;
		color: #e51c23;
		text-align: center;
	}
}

.allMoney {
	height: 45px;
	line-height: 45px;
	text-align: left;
	border-top: 1px solid #ccc;
	width: 67%;
	padding-left: 15px;
	box-sizing: border-box;
	b {
		color: #f15353;
		font-weight: normal;
	}
}

.confirm {
	height: 45px;
	width: 33%;
	border-top: 1px solid #ccc;
	background: #f15353;
	color: #fff;
	line-height: 45px;
}




/*弹窗样式*/

.modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, .7);
	z-index: 999;
	.btns {
		margin: 60% 15%;
		width: 70%;
		button {
			width: 100%;
			height: 35px;
			text-align: left;
			line-height: 35px;
			background: #fff;
			border: 0;
			outline: 0
		}
		button:first-child {
			border-bottom: 1px solid #ccc;
		}
	}
	.modal-dialog {
		width: 80%;
		height: 190px;
		background: #fff;
		border-radius: 6px;
		border-top: 10px solid #f15353;
		margin: 50% auto;
		position: relative;
		.close {
			position: absolute;
			top: -50px;
			right: 0;
		}
		.title {
			color: #666;
			font-size: 14px;
			font-weight: bold;
			line-height: 35px;
			text-align: left;
			padding-left: 25px;
			padding-top: 10px;
		}
		p {
			padding: 0 15px;
			text-align: left
		}
	}
}
</style>