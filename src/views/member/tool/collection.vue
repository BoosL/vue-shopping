<template>
<div id="footprint">
	<c-title :hide="false" text='我的收藏'></c-title>
	<div style="height: 40px;"></div>
	<div class="tbs" v-for="(item,index) in datas" v-if="item.goods" @click="toItem(item.goods)">
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

</div>
	
	<!--<div id="footprint">
	    	<c-title :hide="false" text='我的收藏'></c-title>
	    	<div style="height: 40px;"></div>
			<el-checkbox-group v-model="checkList">
				<div class="tbs" v-for="item in datasoruce">
					<div class="li1">
						<el-checkbox :label=item  @change="handleCheckedChange">""</el-checkbox>
					</div>
					<div class="li2"><img src="https://m.360buyimg.com/mobilecms/jfs/t4210/92/1988384105/28689/4d53c00e/58c9f630N84d4d1a6.png!q70.jpg"/></div>
					<div class="li3">
						<div class="product-name">小米（MI）小米AIR 13.3英寸全金属超轻薄笔记本（I5-6200U 8G 256G PCIE SSD 940MX 独显 FHD）银色</div>
						<font class="product-price">￥954.45</font>
					</div>
					<div class="li4"><i class="fa fa-trash-o" @click="delteteItem(item)"></i></div>		
				</div>	
			</el-checkbox-group>
			<div id="foota">
				<el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
				<span class="dels" @click="delteteAll">删除</span>
			</div>
	    </div>-->
</template>
<script>
import collectioncontroller from './collectioncontroller';
export default collectioncontroller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#footprint {
	
	.mint-cell.mint-cell-swipe,.mint-cell-value{width: 100%;}
	.mint-cell-value,.tbs {
		display: flex;
		align-items: center;
		background: #FFF;
		flex-flow: row wrap;
		border-bottom: #f5f5f5 1px solid;
		margin-bottom: 6px;
		.li1 {
			flex: 10%;
		}
		.li2 {
			flex: 20%;
			img {
				width: 25vw;
				height: 25vw;
			}
		}
		.li3 {
			flex: 60%;
			display: flex;
			flex-direction: column;
			text-align: justify;
			margin-left: 10px;
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