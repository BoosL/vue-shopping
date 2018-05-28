<template >
	<div id="evaluate">
		<c-title :hide="false"
		         text='评价'></c-title>
		<div style="height: 42px;"></div>
		<div id="shop">
			<div class="goods">
				<div class="img"><img :src="good.thumb"></div>
				
				<div class="warp">
					<div class="inner">
						<div class="name">{{good.title}}</div>
						<div class="option">规格: {{good.goods_option_title}}</div>
					</div>
					<div class="price">
						￥{{good.goods_price}}
						<br/> ×{{good.total}}
					</div>
				</div>
			</div>
	
			<div id="pjall">
				<div id="pj"><span>评分:</span>
					<el-rate v-model="level"
					         show-text
					         @change="getStar"></el-rate>
				</div>
				<div style="height:10px"></div>
				<el-input type="textarea"
				          :rows="2"
				          placeholder="请输入评论内容"
				          v-model="comment">
				</el-input>
				
				<!--<ul class="upfile">
					<li><img src="../../assets/images/img_default.png"/></li>
					<li><i class="fa fa-camera"></i></li>
				</ul>-->
			</div>
			<el-button type="primary"
			           @click="toComment(good)" style='background: red;border: 0;'>提交评价</el-button>
		</div>
	
	</div>
</template>
<script>
import order_list_evaluatecontroller from './evaluatecontroller';
export default order_list_evaluatecontroller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#evaluate {
	#shop {
		background: #FFF;
		padding: 10px;
	}
	
	
	.goods:after{
			content: "";
			display: block;
			clear: both;
		}
	
	
	.goods {
		/*display: flex;
		align-items: stretch;
		flex-flow: row wrap;
		background: #efeded;
		padding: 5px;
		margin-bottom: 5px;
		.img {
			flex: 3;
			img {
				width: 100%;
			}
		}
		.inner {
			flex: 5;
			padding: 0 5px;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}
		.name {
			flex: 5;
			text-align: left
		}
		.price {
			flex: 2;
			align-items: center;
		}*/
		
		
		
		
		
		
		
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
		
		
		
		
		
		.option {
			color: #888;
			font-size: .6rem;
			flex: 1;
		}
	}
	#pjall {
		background: #FFF;
		padding: 15px;
		.upfile{text-align: left; margin-top: 10px;
			li{width: 20vw; float: left; height: 20vw; line-height: 20vw;}
			i{font-size: 1rem;border: 1px dashed #919191;font-weight: normal;color: #919191;padding: 10px;}
			img{width: 100%;}
		}
		textarea {
			width: 87%;
			margin-top: 10px;
			padding: 10px;
		}
		#pj {
			text-align: left;
			span {
				float: left;
				font-size: 14px;
				padding-right: 10px;
			}
		}
	}
	button {
		width: 100%;
	}
}
</style>