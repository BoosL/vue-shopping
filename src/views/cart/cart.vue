<template>
	<div class="cart">
		<c-title :hide="false" text='购物车'></c-title>
		<div id="edit" @click=onCartDelete v-if="isShowList">
			<i class="fa fa-pencil-square-o"></i>
			<p>{{!cartDelete?'编辑':'完成'}}</p>
		</div>
		<div class="cart_main" v-if='isShowList'>
	
			<el-checkbox-group v-model="checkList" @change="allSelectHandle">
				<div class="cart_good" v-for="good in goods" v-if="good.goods">
					<div class="ico" v-show='edit'>
						<i class="fa fa-trash-o"></i>
					</div>
					<div class="checkList">
						<el-checkbox :label=good @change="selectGood">&nbsp</el-checkbox>
					</div>
					<div class="img" @click='toGoodsInfo(good)'><img :src=good.goods.thumb></div>
					<div class="info">
						<div class="inner">
							<div class="name" @click='toGoodsInfo(good)'>
								{{good.goods.title}}
							</div>
							<div class="introduction">{{good.option_str}}</div>
						</div>
						<div class="other">
							<div class="price">￥<span>{{good.goods.price}}</span></div>
							<div class="num">
								<div class="leftnav" @click='deleteNumber(good)'>-</div>
								<input type="text" disabled=false class="shownum" v-model='good.total'>
								<div class="rightnav" @click='addNumber(good)'>+</div>
							</div>
						</div>
					</div>
				</div>
			</el-checkbox-group>
			<div class="cart_pay" v-show='!cartDelete'>
				<div class="all" sel="1">
					<div class="checkall">
	
						<el-checkbox @change="allSelect" v-model="checkAll" :checked=checkAll label="全选"></el-checkbox>
	
						<span class="t"></span>
					</div>
				</div>
				<div class="paysub " @click=submitGoods>结算(<span class="total">{{count}}</span>)</div>
				<div class="text">合计：<span>￥<span class="totalprice">{{total}}</span></span>
					<br><span style="color:#999; font-size:10px;">不含运费</span></div>
			</div>
		</div>
		<div id="nocard" v-if='!isShowList'>
			<div class="card_no"><i class="fa fa-shopping-cart" style="font-size:100px;"></i>
				<br><span style="line-height:18px; font-size:16px;">购物车快饿瘪了</span>
				<br>主人快去给我找点东西吧</div>
			<div class="card_no_menu">
	
				<!--<router-link :to="{path:'/member',query:{i:toi}}">-->
				<router-link :to="fun.getUrl('member',{})">
					<div class="card_no_nav">个人中心</div>
				</router-link>
	
				<!--<router-link :to="{path:'/home',query:{i:toi}}">-->
				<router-link :to="fun.getUrl('home',{})">
					<div class="card_no_nav">去逛逛</div>
				</router-link>
	
			</div>
		</div>
		<div class="cart_del" v-show='cartDelete'>
			<div class="checkall">
				<!--<el-checkbox-group v-model="checkList">
							<el-checkbox label="全选"></el-checkbox>
						</el-checkbox-group>-->
	
				<el-checkbox @change="allSelect" v-model="checkAll" :checked=checkAll label="全选"></el-checkbox>
			</div>
			<span @click='deleteGoods'>删除</span>
		</div>
	
	</div>
</template>

<script>
import cart from './cart_controller';
export default cart;

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/css/cart.scss'
</style>