<template>
	<div id="footprint">
		<c-title :hide="false"
		         text='我的足迹'></c-title>
		<div style="height: 40px;"></div>
	
		<!--<mt-cell-swipe
				      v-for="n in 10"
				      :right="rightButtons"
				      title="swipe me">
				    </mt-cell-swipe>-->
		<div class="tbs"
		     v-for="(item,index) in datas" v-if='item.goods' @click="toItem(item.goods)">
			<mt-cell-swipe :right="[{content: '删除', style: {  color: '#fff' },
		      handler: () => {delteteItem(item,index)}
		    }]">
				<div class="li2" v-if='item.goods.thumb'><img :src="item.goods.thumb" /></div>
				<div class="li2" v-if='!item.goods.thumb'><img src="../../../assets/images/img_default.png" /></div>
				<div class="li3">
					<div class="product-name">{{item.goods.title}}</div>
					<p class="product-price">￥ <span>{{item.goods.price}}</span></p>
				</div>
			</mt-cell-swipe>
		</div>
	
		<!--<div id="foota"
			     style="display: none;">
				<el-checkbox v-model="checkAll"
				             @change="handleCheckAllChange">全选</el-checkbox>
				<span class="dels">删除</span>
			</div>-->
	</div>
</template>

    
   

<script>
import footprintcontroller from './footprintcontroller';
export default footprintcontroller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#footprint {
	.tbs {
		display: flex;
		align-items: center;
		background: #FFF;
		flex-flow: row wrap;
		border-bottom: #f5f5f5 1px solid;
		margin-bottom: 6px;
		.li1 {
			flex: 10%;
			padding: 5px 0;
		}
		.li2 {
			flex: 20%;
			padding: 5px 0;
			img {
				width: 25vw;
				height: 25vw;
			}
		}
		.li3 {
			flex: 60%;
			display: flex;
			flex-direction: column;
			text-align: left;
			padding: 5px 10px;
			box-sizing: border-box;
			.product-name {
				flex: 5;
				font-size: .9rem;
				color: #666;
				text-align: justify;
				line-height: 5vw;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				margin-bottom: 18px;
			}
			.product-price {
				flex: 1;
				color: #f15353;
				text-align: right;
				margin: 0;
				font-size: .8rem;
				span {
					font-size: 1.1rem;
				}
			}
		}
		.li4 {
			flex: 10%;
		}
	}
	#foota {
		position: fixed;
		bottom: 0;
		background: #FFF;
		width: 100%;
		display: flex;
		align-items: center;
		.el-checkbox {
			flex: 5;
			text-align: left;
			padding-left: 15px;
		}
		.dels {
			flex: 3;
			border-radius: 4px;
			border: solid 1px red;
			background: red;
			color: #FFF;
			padding: 10px;
		}
	}
}
</style>