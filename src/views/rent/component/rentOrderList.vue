<template>
    <div id="rentOrderList">
       
            <div class="shop">
            	<div class="item" v-for="item in datasource">
            		<div class="rentDate">
                		<p v-if="item.lease_order"><i class="iconfont icon-shijian"></i>&nbsp;距离归还日期还剩 &nbsp;&nbsp;{{item.lease_order.time_lift}}</p>
	                </div>
	                
	                <div class="rentDetail" @click="routeJump(item)" v-for="goods in item.has_many_order_goods">
                		<img :src="goods.thumb" alt="图片" />
                		<div class="title">
                			{{goods.title}}
                		</div>
	                </div>
	                
	                <div class="rentTotal">
	                	<span>{{item.status_name}}</span>
	                	合计: <b>￥{{item.price}}</b>
	                </div>
	                <div class="btns">
	                	<button  v-for="bt in item.button_models" class="rt"
	                		@click="operation(bt,item)">{{bt.name}}</button>
	                </div>
            	</div>
            </div>
    </div>
</template>
<script>
import rentOrderList_controller from './rentOrderList_controller';
export default rentOrderList_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.olis{height: 100vh;}
#rentOrderList{
.shop {
    .item{
    	margin:10px 0;
    	.rentDate{
    		background: #FFF;
    		padding:5px;
    		text-align:left;
    		p{
    			line-height:30px;text-align:left;line-height:30px;
    			i{font-size:16px;vertical-align: middle;
    			}	
    		}
    		h3{
    			font-size:14px;
    			font-weight:normal;
    			color:#ff9800;
    		}
    	}
    	.rentDetail{
    		background: #f8f8f8;
    		padding:10px;
    		overflow:hidden;
    		display: flex;
    		flex-flow: row;
    		img{
    			width:70px;
    			height:70px;
    		}
    		.title{
    			text-align:left;
    			flex: 1;
    			margin:0 10px;
    		}
    	}
    	.rentTotal{
    		background: #FFF;
    		height:40px;
    		line-height:40px;
    		text-align:right;
    		padding-right:15px;
    		span{
				padding:1px 4px;
				border-radius:6px;
				background:#2baf2b;
				font-size:12px;
				font-weight:normal;
				display:inline-block;
				margin:10px 3px;
				color:#fff;
				float:left;
				line-height:20px;
    			}
    	}
    	.btns{
    		background: #FFF;
    		height:40px;
    		padding-right:15px;
    		button{
    			padding:4px 6px;
    			border-radius:6px;
    			margin-right:10px;
    			outline:0;
    			border:1px solid #bbb;
    		}
    	}
    }
    
}
}
</style>
