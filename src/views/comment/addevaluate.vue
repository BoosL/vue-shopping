<template >
<div id="addevaluate">
	<c-title :hide="false" text='追加评价'></c-title>
	<div style="height: 42px;"></div>
	<div id="shop">
            <div class="goods">
                <div class="img"><img :src="good.thumb"></div>
                <div class="inner">
                    <div class="name">已好评<br/>
                    <el-rate v-model="value" disabled text-color="#ff9900" text-template="很好"></el-rate>
                    </div>     
                    
                </div>

            </div>
            <div class="option">{{comment}}</div>
    </div>        
	<div id="pjall">
		<div id="pj" ><span>追加评价:</span></div>
		
		<textarea v-model="reComment" placeholder="这次买的商品满意吗？不满意可意追加评价内容。长度在5-100字之间" type="textarea" rows="4"></textarea>
		
	</div>
	<el-button type="primary" @click="toReComment">发表追评</el-button>
</div>
</template>
<script>
import order_list_addevaluatecontroller from './addevaluatecontroller';
export default order_list_addevaluatecontroller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#addevaluate{
	#shop{background: #FFF;padding: 10px;
	  .option{color: #888;font-size: .6rem;text-align: left;}
	}
	.goods{display: flex;align-items: stretch;  flex-flow: row wrap;background: #efeded;padding: 5px;margin-bottom: 5px;
		
		.img{flex:1; img{width: 100%;}}
		.inner{flex: 5;padding: 0 5px;display: flex;flex-direction:column;align-items: flex-start;}
		.name{flex: 3; text-align: left; color: #FF5757;}
		.price{flex: 2;align-items:center;color: #858585;}
		
	}
	#pjall{ background: #FFF;padding: 15px;
		textarea{width: 87%;margin-top: 10px;padding: 10px;}
		
		#pj{text-align: left;
			span{float: left;font-size: 14px;padding-right: 10px;}
		}
	}
	button{width: 100%;}
}
</style>