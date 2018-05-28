<template>
	<div id="OtherCommentDetails">
		<c-title :hide="false" text='其它评价'></c-title>
		<div style="height: 40px;"></div>
		<div class="all">
		<div class="pjgoods">
			<div class="goods">
				<div class="img">
					<router-link :to='{name:"goods",params:{id:1},query:{i:toi}}'> <img src="http://www.heliaigou.com/attachment/images/0/2016/12/Nw93tt3t5T9v3C5527Rjw9Xwwr22W9.jpg"></router-link>
				</div>
				<div class="inner">
					<div class="name">
						<router-link :to='{name:"goods",params:{id:1},query:{i:toi}}'> 奥康增高男鞋 新款真皮系带隐形内增高皮鞋韩版休闲鞋透气低帮鞋</router-link>
					</div>
					<div class="option">规格: 兰色+37</div>
				</div>
	
				<div class="price">
					<font>￥299
						<br/> ×1</font>
					<!--<span><router-link :to='{name:"evaluate",params:{order_data:1}}' >评价</router-link></span>-->
					<span @click="">评价</span>
				</div>
			</div>
		</div>	

	</div>
	
		<div class="allpl">
	
		<div class="pj">
					<div layout="row"
					     layout-align="start center"
					     id="user">
						<div class="userimg"><img src="https://sfault-avatar.b0.upaiyun.com/726/291/726291045-57fdead795d4e_big64" /></div>
						<div>jan横雅</div>
						<div class="spaet">2017.03.12 09:12:37</div>						
					</div>
					<p>快递太慢，人员不足，卖家不在线~~~~~！！！！无人处理！</p>
		</div>	
		<div class="pjhf" layout="row" layout-align="start center">
			<div class="pjtime">2017.03.12 09:12:37</div>
			<span>回复</span>
		</div>
		<div class="othepj" v-for="n in 3">
			<div class="pj" style="background: #efedf5;">
				<div layout="row"
				     layout-align="start center"
				     id="user">
					<div class="userimg"><img src="https://sfault-avatar.b0.upaiyun.com/726/291/726291045-57fdead795d4e_big64" /></div>
					<div>jan横雅</div>
					<div class="spaet">2017.03.12 09:12:37</div>						
				</div>
				<p>快递太慢，人员不足，卖家不在线~~~~~！！！！无人处理！</p>
				<div class="pjhf" layout="row" layout-align="start center">
					<div class="pjtime">2017.03.12 09:12:37</div>
					<span>回复</span>
				</div>	
			</div>					
		</div>		
		</div>
		<div id="callback" layout="row" layout-align="start center">
			<input type="" placeholder="回复@昵称:"/>
			<button>提交</button>
		</div>
	</div>
</template>
<script>
	import cTitle from 'components/title';
	export default {

		//name: 'login',
		data() {
			return {
				
			}
		},
		components:{cTitle}
		}

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#OtherCommentDetails {
	a {	color: #000;}
	.all{background: #FFF;padding: 0 10px;}
	#callback{
		position: fixed;bottom: 0;width: 100%;background: #FFF;padding:10px 0;
		input{flex: 5; border: #919191 solid 1px;border-radius: 5px;line-height: 30px;padding-left: 5px;margin-left: 5px;}
		button{flex: 1;border: #dd191d solid 1px;border-radius: 5px;background: #e84e40;color: #FFF;line-height: 30px;margin: 0 10px;}
	}
	.userimg{border: solid 1px #666666;border-radius: 10px;overflow: hidden; width: 20px; margin-right: 10px;
		img{display: block;width: 50px;}
	}
	.zp{
		span{color: #e84e40;}
	}
	#zjpj{border-bottom: #e8e8e8 solid 1px;background: #FFF;padding: 10px 0;}
	.spaet{color: #919191;flex: 3;text-align: right;}
	.pj {border-bottom: #e8e8e8 solid 1px;background: #FFF;padding: 10px 0;
		p {text-align: left;margin: 0;}
		img {width: 100%;}
	}
	.pic {display: flex;align-items: stretch;flex-flow: row wrap;padding: 10px;background: #FFF;
		div {flex: 33%;
			img {width: 90%;}
		}
	}.pjgoods{padding: 10px 0;background: #FFF;}
	.goods {display: flex;align-items: stretch;flex-flow: row wrap;background: #e0e0e0;	padding: 5px;
		.img {flex: 3;
			img {width: 100%;}
		}
		.inner {flex: 5;padding: 0 5px;display: flex;flex-direction: column;align-items: flex-start;}
		.name {	flex: 5;text-align: left}
		.price {flex: 2;display: flex;flex-direction: column;align-items: flex-end;
			font {flex: 3;}
			span {border: solid 1px #BFCBD9;border-radius: 13px;padding: 1px 10px;font-size: .8rem;line-height: 1.2rem;	margin: 0;background: #FFF;}
			.yijp {	background: #888888;padding: 0 5px;color: #FFF;	}
		}
		.option {color: #888;font-size: .6rem;flex: 1;}
		.option2 {color: #e84e40;font-size: .9rem;flex: 1;width: 100%;
				font {float: left;}
		}
	}
	.allpl{margin-top: 10px;margin-bottom: 50px;background: #FFF;padding: 10px;
		.tilse{text-align: left;line-height: 2rem;border-bottom: #e8e8e8 solid 1px;}
		.pjhf{padding: 10px 0;
			.pjtime{color: #919191;flex: 5;text-align: left;}
			span{padding: 1px 10px;border: solid 1px #BFCBD9; border-radius: 13px;}
		}
		.othepj{background: #efedf5;padding-left: 30px;padding-right: 10px;}
	}		
}
</style>