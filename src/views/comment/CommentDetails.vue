<template>
	<div id="commentDetails">
		<c-title :hide="false" text='评价详情'></c-title>
		<div style="height: 40px;"></div>
		<div class="all">
		<div class="pj">
					<div layout="row"
					     layout-align="start center"
					     id="user">
						<div class="userimg"><img :src="head_img_url" /></div>
						<div>{{nick_name}}</div>
						<div class="spaet">{{created_at}}</div>						
					</div>
					<p>{{content}}</p>
		</div>
		<div id="zjpj" v-if="append">
			<div class="zp" layout="row">
				<span>追评</span>
				<div class="spaet">{{append.created_at}}</div>
			</div>
			<p>{{append.content}}</p>
			<div class="pic" v-for="item in append.images">
				<div><img :src="item" /></div>
				
			</div>
		</div>
		<div class="pjgoods" v-if="has_one_order_goods">
			<div class="goods">
				<div class="img">
					 <img :src="has_one_order_goods.thumb">
				</div>
				<div class="warp">
				<div class="inner">
					<div class="name">
						 {{has_one_order_goods.title}}
					</div>
					<div class="option">规格: {{has_one_order_goods.goods_option_title}}</div>
				</div>
	
				<div class="price">
					<font>￥{{has_one_order_goods.price}}
						<br/> ×{{has_one_order_goods.total}}</font>
					<!--<span><router-link :to='{name:"evaluate",params:{order_data:1}}' >评价</router-link></span>-->
					<!--<span @click="">评价</span>-->
				</div>
				</div>
			</div>
		</div>	

	</div>
	
		<div class="allpl" v-if="has_many_reply.length>0">
			<div class="tilse"><i class="fa fa-comment-o" style="font-size:19px;"></i>全部评论</div>
			
		<div class="pj">
					<div layout="row"
					     layout-align="start center"
					     id="user">
						<div class="userimg"><img :src="head_img_url" /></div>
						<div>{{nick_name}}</div>
						<div class="spaet">{{created_at}}</div>						
					</div>
					<p>{{content}}</p>
		</div>	
		<div class="pjhf" layout="row" layout-align="start center">
			<div class="pjtime">{{created_at}}</div>
			<span @click="submitReplyForComment">回复</span>
		</div>
		<div class="othepj" v-if="has_many_reply.length>0">
			<div v-for="item in has_many_reply" class="pj" style="background: #efedf5;">
				<div layout="row"
				     layout-align="start center"
				     id="user">
					<div class="userimg"><img :src="item.head_img_url" /></div>
					<div>{{item.nick_name}}</div>
					<div class="spaet">{{item.created_at}}</div>						
				</div>
				<p>{{item.nick_name}}回复{{item.reply_name}}:{{item.content}}</p>
				<div class="pjhf" layout="row" layout-align="start center">
					<div class="pjtime">{{item.created_at}}</div>
					<span @click="replyToSomeOne(item)">回复</span>
				</div>	
			</div>					
		</div>		
		</div>
		<div v-if="has_many_reply.length>0" id="callback" layout="row" layout-align="start center">
			<input v-model="reply_content" type="" :placeholder="reply_placeholder"/>
			<button @click="submitReply">提交</button>
		</div>		
	</div>
</template>
<script>
//CommentDetailsController
import CommentDetailsController from './CommentDetailsController';
export default CommentDetailsController;


</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#commentDetails {
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
	


.goods:after{
            content: "";
            display: block;
            clear: both;
        }
        .goods {
            /*display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: stretch;
            -ms-flex-align: stretch;
            align-items: stretch;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            -ms-flex-flow: row wrap;
            flex-flow: row wrap;
            */
            padding: 10px;
            width: 100%;
            box-sizing: border-box;
            background: #fafafa;
            .img {
                /*flex: 1;*/
                width: 30%;
                float: left;
                display: inline-block;
                /*background:blue;*/
                img {
                    width: 100%;
                }
            }
            .warp{
                width: 70%;
                float: left;
                display: inline-block;
                .inner {
                    width: 70%;
                    float: left;
                    box-sizing: border-box;
                    padding: 0 5px;
                    text-align:left;
                    .name {
                        text-align: left;
                        color: #333333;
                        margin-bottom: 10px;
                    }
                }
                
                .price {
                    width: 30%;
                    align-items: center;
                    text-align: right;
                    color: #333333;
                    box-sizing: border-box;
                    float: left;
                    padding-right: 4px;
                    p {
                        margin-top: 0
                    }
                }
            }
            


	/*	.price {flex: 2;display: flex;flex-direction: column;align-items: flex-end;
			font {flex: 3;}
			span {border: solid 1px #BFCBD9;border-radius: 13px;padding: 1px 10px;font-size: .8rem;line-height: 1.2rem;	margin: 0;background: #FFF;}
			.yijp {	background: #888888;padding: 0 5px;color: #FFF;	}
		}*/
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