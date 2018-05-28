<template>
	<div class="comment_allgoods"
	     id="comment-goods">
		<div class="comment_item"
		     v-for="(good,good_index) in has_many_order_goods">
			<div class="goods">
				<a 
				   class="content">
					<img class="image"
					     v-lazy="good.thumb"
					     width="50">
					<p class="name">{{good.title}}</p>
					<p class="price">¥{{good.goods_price}}</p>
				</a>
			</div>
			<div class="foot">
				<div class="action">
					<span class="btn btn_1"
					      @click="goEvaluate($event,index)">{{iscomment?'填写评价':'查看评价'}}<i class='fa' :class="{'fa-angle-down':index==display,'fa-angle-right':index!=display}"></i></span>
				</div>
			</div>
	
			<div class="inner"
			     :class="{display: index==display}">
				<i class="arrow"></i>
				<div class="comment_view">
					<template v-if='iscomment'>
						<span class="label">评分：</span>
						<div class="stars"
						     data-tag="comment-scores">
							<el-rate v-model="level"
							         show-text
							         @change="getStar"></el-rate>
						</div>
					</template>
					<template v-if='!iscomment'>
						<span class="label"><el-rate v-model="comments[good_index]" disabled text-color="#ff9900" text-template="很好"></el-rate></span>
					</template>
				</div>
				<div class="comment_textarea">
					<div class="textarea_wrap">
						<template v-if='!disabled[good_index]'>
							<el-input :disabled="disabled[good_index]"
							          type="textarea"
							          :rows="2"
							          placeholder="请输入评论内容，长度在5-100字之间"
							          v-model="comments[good_index]"></el-input>
						</template>
						<template v-if='disabled[good_index]'>
							<div class="option">{{comments[good_index]}}</div>
						</template>
					</div>
				</div>
				<!--<div class="comment_images comment_images_row">
							<span class="label">添加图片  <small>（您最多可以上传3张图片）</small></span>
							<ul class="images">
								<li >
									<a href="javascript:;" class="btn_add">
										<i class="fa fa-plus"></i>
									</a>
								</li>
							</ul>
						</div>-->
				<template v-if='!disabled[good_index]'>
					<div class="mod_btns">
						<button :class="btn_class[good_index]"
						        @click="toComment(good,good_index)">发表评价</button>
					</div>
				</template>
			</div>
	
		</div>
	
		<div class="sure"
		     style="display: none;">
			<a href=""
			   class="btn-sure">确认发表</a>
		</div>
	</div>
</template>

    
   

<script>
import comment_controller from './comment_controller';
export default comment_controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
a {
	text-decoration: none;
	color: #222
}

.comment_item {
	background: #fff;
	margin-bottom: 15px;
	position: relative;
	overflow: hidden;
	a {
		position: relative;
		display: block;
		padding: 0px 10px 12px 70px;
		background: #fafafa;
		overflow: hidden;
		text-align: justify;
		img {
			position: absolute;
			left: 10px;
			top: 15px;
			display: block;
			width: 50px;
			height: 50px;
			border: 1px solid #ddd;
		}
		.name {
			font-size: 12px;
			height: 3em;
			line-height: 1.5em;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.price {
			font-size: 12px;
			color: #e4393c;
		}
	}
}

#comment-goods .foot {
	position: relative;
	margin: 0 10px;
	padding: 10px 0;
	height: 30px;
	.action {
		position: absolute;
		top: 10px;
		right: 0;
		overflow: hidden;
		.btn {
			height: 30px;
			font-size: 12px;
			background: #8476f3;
			color: #fff;
			padding: 0;
			width: 80px;
			line-height: 30px;
			border-radius: 5px;
			text-align: center;
			float: right;
			padding-right: 10px;
			i {
				display: inline-block;
				position: absolute;
				width: 5px;
				height: 5px;
				vertical-align: 3px;
				margin-left: 5px;
				border-color: #333;
				top: 10px;
			}
		}
		.btn_1 {
			background: #F15353;
			color: #fff;
			border: 1px solid transparent;
		}
	}
}

#comment-goods .inner.display {
	display: block;
}

#comment-goods .inner {
	position: relative;
	background: #f8f8f8;
	padding: 0 10px 1px;
	margin: 5px 10px 10px;
	font-size: 12px;
	color: #999;
	display: none;
	.arrow {
		z-index: 1;
		background: #f8f8f8;
		position: absolute;
		top: -8px;
		right: 30px;
		border-top: 1px solid #ddd;
		border-left: 1px solid #ddd;
		width: 16px;
		height: 16px;
		-webkit-transform: rotate(45deg) scale(0.5);
		transform: rotate(45deg) scale(0.5);
	}
	.comment_view {
		position: relative;
		overflow: hidden;
		height: 25px;
		line-height: 25px;
		.label {
			font-size: 14px;
			color: #333;
			position: absolute;
			left: 0;
		}
		.stars {
			position: absolute;
			left: 45px;
			top: 0px;
			font-size: 18px;
			i.active {
				color: #f7ba2a;
			}
		}
		.stars-finish {
			position: absolute;
			left: 0px;
			top: 0;
			font-size: 18px;
			i.active {
				color: #f7ba2a;
			}
		}
	}
	p {
		text-align: justify;
		margin-bottom: 10px
	}
	.comment_textarea {
		position: relative;
		overflow: hidden;
		.textarea_wrap {
			padding: 10px;
			background: #fff;
			position: relative;
			.option {
				text-align: left;
			}
			textarea {
				resize: none;
				width: 100%;
				height: 70px;
				border: none;
				background: none;
				font-size: 12px;
				-webkit-appearance: none;
				-webkit-border-radius: 0;
			}
		}
	}
	.comment_images_row {
		padding: 0;
		position: relative;
		.label {
			display: block;
			position: static;
			margin: 10px 0;
			left: 0;
			top: 50%;
			font-size: 14px;
			color: #333;
			small {
				font-size: 10px;
				color: #999;
			}
		}
		.images {
			margin-bottom: 20px;
			height: 50px;
			li {
				position: relative;
				float: left;
				margin-right: 10px;
				width: 50px;
				height: 50px;
				.btn_add {
					position: relative;
					display: block;
					width: 48px;
					height: 48px;
					background: #fff;
					border: 1px dashed #ddd;
					padding: 0;
					i {
						font-size: 20px;
						background-position: -40px -20px;
						position: absolute;
						top: 50%;
						left: 50%;
						margin: -10px 0 0 -10px;
						color: #dddddd;
					}
				}
			}
		}
		.images-finish {
			margin: 10px 10px 10px 0;
			height: 50px;
		}
	}
	.mod_btns {
		overflow: hidden;
		margin: 10px 10px;
		.gray {
			background: #CCC;
			display: block;
			width: 100%;
			height: 40px;
			line-height: 40px;
			text-align: center;
			font-size: 14px;
			-webkit-border-radius: 2px;
			border-radius: 2px;
			position: relative;
			padding: 0;
			color: #ffffff;
			border: 1px solid #CCC;
		}
		.mod_btn {
			display: block;
			width: 100%;
			height: 40px;
			line-height: 40px;
			text-align: center;
			font-size: 14px;
			-webkit-border-radius: 2px;
			border-radius: 2px;
			position: relative;
			padding: 0;
			background: #F15353;
			color: #ffffff;
			border: 1px solid #F15353;
		}
	}
}

#comment-goods .sure .btn-sure {
	display: block;
	height: 40px;
	line-height: 40px;
	text-align: center;
	font-size: 14px;
	-webkit-border-radius: 2px;
	border-radius: 2px;
	position: relative;
	padding: 0;
	background: #ffffff;
	color: #F15353;
	border: 1px solid #F15353;
	margin: 10px 10px 30px;
	font-weight: bold;
}
</style>