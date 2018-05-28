<template>  
<div id="evaluationDetails">
	<c-title :hide="false" text='评价详情'></c-title>
	<div style="height: 42px;"></div>
<div class="pj">
    <div layout="row" layout-align="start center" id="user">
 	 <div><img src="https://sfault-avatar.b0.upaiyun.com/726/291/726291045-57fdead795d4e_big64"/></div>
 	 <div>jan横雅</div>
 	 <div>2017.03.12 09:12:37</div>
	</div>
	<p>快递太慢，人员不足，卖家不在线~~~~~！！！！无人处理！</p>
	<img src="https://imgsa.baidu.com/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=09cb7f2fb33533fae1bb9b7cc9ba967a/7c1ed21b0ef41bd5bd7d1ed553da81cb39db3de0.jpg"/>
</div>
<div class="ChaseRatings">
	<h3>用户当天追评</h3>
	<p>快递太慢，人员不足，卖家不在线~~~~~！！！！无人处理！<br />
	<img src="https://imgsa.baidu.com/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=09cb7f2fb33533fae1bb9b7cc9ba967a/7c1ed21b0ef41bd5bd7d1ed553da81cb39db3de0.jpg"/>
	<img src="https://imgsa.baidu.com/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=09cb7f2fb33533fae1bb9b7cc9ba967a/7c1ed21b0ef41bd5bd7d1ed553da81cb39db3de0.jpg"/>
	<img src="https://imgsa.baidu.com/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=09cb7f2fb33533fae1bb9b7cc9ba967a/7c1ed21b0ef41bd5bd7d1ed553da81cb39db3de0.jpg"/>
	</p>
            <div class="goods">
            	  
                <div class="img"><router-link :to='{name:"goods",params:{id:1}}' > <img src="http://www.heliaigou.com/attachment/images/0/2016/12/Nw93tt3t5T9v3C5527Rjw9Xwwr22W9.jpg"></router-link></div>
                <div class="inner">
                    <div class="name"><router-link :to='{name:"goods",params:{id:1}}' > 奥康增高男鞋 新款真皮系带隐形内增高皮鞋韩版休闲鞋透气低帮鞋</router-link></div>     
                    <div class="option">规格:  兰色+37</div>
                </div>
                
                <div class="price">
                    	<font>￥299<br/>   ×1</font>
                    	
                </div>
            </div>           
</div>

<div class="AllComments">
<h3><i class="fa fa-comment-o"></i>全部评论</h3>
<div class="pj">
    <div layout="row" layout-align="start center" id="user">
 	 <div><img src="https://sfault-avatar.b0.upaiyun.com/726/291/726291045-57fdead795d4e_big64"/></div>
 	 <div>jan横雅</div>
 	 <div>2017.03.12 09:12:37</div>
	</div>
	<p>快递太慢，人员不足，卖家不在线~~~~~！！！！无人处理！</p>
	<img src="https://imgsa.baidu.com/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=09cb7f2fb33533fae1bb9b7cc9ba967a/7c1ed21b0ef41bd5bd7d1ed553da81cb39db3de0.jpg"/>
</div>
<div class="hf"><span @click="Reply">回复</span></div>
 </div>   

</div>
   
</template>
<script>
import evaluationDetailsController from './evaluationDetailsController';
export default evaluationDetailsController;

</script>
<style lang="scss" rel="stylesheet/scss" >
#evaluationDetails{
	#user {
		div:nth-child(1){flex: 1; padding: 5px 2px; img{width: 90%;border-radius: 50%;}}
		div:nth-child(2){flex: 5; text-align: left;}
		div:nth-child(3){color: #908a8a; font-size: .6rem;padding-right: 10px;}
	}
	.pj{background: #FFF;padding: 0 10px;
			p{text-align: left;margin: 0;}
			img{width: 100%;}
		}
	.ChaseRatings{ background: #FFF;padding: 10px 0;
		h3{color: #e84e40;text-align: left;font-weight: normal;border-top: #e8e8e8 1px solid;margin: 0 10px;}
		p{text-align: left;margin: 0;margin: 0 10px;border-bottom: #e8e8e8 1px solid; img{width: 30%;margin-left: 5px;}}
	}
		.goods{display: flex;align-items: stretch;  flex-flow: row wrap;background: #e0e0e0;padding: 5px;margin: 10px;
		a{color: #000;}
		.img{flex:3; img{width: 100%;}}
		.inner{flex: 5;padding: 0 5px;display: flex;flex-direction:column;align-items: flex-start;}
		.name{flex: 5; text-align: left}
		.price{flex: 2; display: flex;flex-direction:column;align-items: flex-end;
			font{flex: 3;}
		 	span{border: solid 1px #BFCBD9;border-radius: 13px;padding: 1px 10px;font-size: .8rem;line-height: 1.2rem;margin: 0;background: #FFF;}
		 	}
		.option{color: #888;font-size: .6rem;flex: 1;}
	}
	.AllComments{ margin-top: 10px;background: #FFF;
		h3{ text-align: left;line-height: 2rem;padding-left: 10px;}
	}
	.hf{border-top: #e8e8e8 1px solid;margin: 10px;text-align: right;padding: 15px 0;
		span{border: #B1A6A6 1px solid;padding: 4px 20px;border-radius: 9px;}
	}
}
</style>