<template >
<div id="evaluate">
	<c-title :hide="false" text='评价'></c-title>
	<div style="height: 42px;"></div>
	<div id="shop">
            <div class="goods">
                <div class="img"><img src="http://www.heliaigou.com/attachment/images/0/2016/12/Nw93tt3t5T9v3C5527Rjw9Xwwr22W9.jpg"></div>
                <div class="inner">
                    <div class="name">奥康增高男鞋 新款真皮系带隐形内增高皮鞋韩版休闲鞋透气低帮鞋</div>     
                    <div class="option">规格:  兰色+37</div>
                </div>
                <div class="price">
                    ￥299<br/>   ×1
                </div>
            </div>
    </div>        
	<div id="pjall">
		<div id="pj"><span>评分:</span><el-rate v-model="star" show-text @change="getStar"></el-rate></div>
		<div style="height:10px"></div>
		<el-input
type="textarea"
  :rows="2"
  placeholder="请输入评论内容"
  v-model="comment">
</el-input>
		<!--<textarea placeholder="这次买的商品满意吗？写点心得给其他顾客参考吧。长度在5-100字之间" type="textarea" rows="4" v-model="comment"></textarea>-->
		
	</div>
	<el-button type="primary" @click="toComment">提交评价</el-button>
</div>
</template>
<script>
import order_list_evaluatecontroller from './order_list_evaluatecontroller';
export default order_list_evaluatecontroller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#evaluate{
	#shop{background: #FFF;padding: 10px;}
	.goods{display: flex;align-items: stretch;  flex-flow: row wrap;background: #efeded;padding: 5px;margin-bottom: 5px;
		
		.img{flex:3; img{width: 100%;}}
		.inner{flex: 5;padding: 0 5px;display: flex;flex-direction:column;align-items: flex-start;}
		.name{flex: 5; text-align: left}
		.price{flex: 2;align-items:center;}
		.option{color: #888;font-size: .6rem;flex: 1;}
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