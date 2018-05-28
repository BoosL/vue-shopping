
<template>
	<div id="microshop_apply">
		<div class="m_header">
			<span class="iconfont icon-left" @click="goBack"></span>
			<span class="title">注册协议</span>
			
		</div>

		<ul class="levelList">
<!---->
			<div v-html="signature">
			</div>

<!---->
			<!--<li v-for="(elem,index) in data">
				<section v-if="elem.not_show!=1">
					<b>{{elem.level_name}}</b>
					<br /> {{elem.has_one_goods.market_price}}元
					<br />
					<span>{{elem.has_one_goods.title}}</span>
					<div class="clickBox" @click="changeStyle($event,elem.goods_id)"></div>
	
				</section>
	
				<section class="haveLevel" v-else>
					<b>{{elem.level_name}}</b>
					<br /> {{elem.has_one_goods.market_price}}元
					<br />
					<span>{{elem.has_one_goods.title}}</span>
					<div></div>
				</section>
	
			</li>-->
		</ul>
	</div>
</template>
<script>
import micro_shop_apply_reg_info_controller from './micro_shop_apply_reg_info_controller';
export default micro_shop_apply_reg_info_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.applySucHide {
	display: none;
}



#microshop_apply {
	
	.shopKeeperInfo{
		color:#aeaeae;
		font-size:12px;
		span{
			display: inline-block;
			width: 18px;
			height: 18px;
			font-size: 18px;
			line-height: 19px;
			font-weight: 400;
			color:white;
			background: #fcc15d;
			margin: 3px 5px 8px;
			border-radius: 50%;
			position: relative;
			top:2px;
		}
	}
	.active {
		border-color: #f15959 !important;
	}
	.m_header {
		width: 100%;
		height: 45px;
		line-height: 45px;
		background: #fff;
		position: relative;
		border-bottom: 1px solid #ccc;
		span {
			display: inline-block;
			width: 16px;
			height: 24px;
			float: left;
			font-weight: normal;
			margin-left: 10px;
			font-size: 30px;
		}
		.el-button {
			width: 20%;
			float: right;
			font-size: .8rem;
			font-weight: normal;
			color: #888;
			line-height: 45px;
			padding: 0;
		}
		span.title {
			width: 60%;
			font-size: 15px;
			font-weight: bold;
			box-sizing: border-box;
			padding-left: 18%;
		}
	}
	.banner {
		width: 100%;
		height: 150px;
		background: #fff;
		img{
			height: 100%;
		}
	}
	h3 {
		font-size: 18px;
		font-weight: bold;
		text-align: left;
		padding: 15px;

		margin-top: 10px;
		;
	}
	.levelList:after {
		content: "";
		display: block;
		clear: both;
	}
	.levelList {
		padding: 15px;
		li:nth-child(3n) {
			margin-right: 0;
		}
		li {
			width: 30%;
			box-sizing: border-box;
			font-size: 0.9rem;
			line-height: 1.2rem;
			float: left;
			margin-right: 5%;
			margin-bottom: 10px;
			position: relative;

			span {
				color: gray;
				height: 18px;
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				word-break: break-all;
				font-size: 0.9rem;
			}

			.haveLevel {
				color: gray;
				b {
					color: gray;
				}
				span {
					font-size: 0.9rem;
					color: gray;
					height: 18px;
					display: block;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					word-break: break-all;
				}
				div {
					background: gray;
					opacity: 0.5;
				}
			}
			div {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 2;
				border: 1px solid #e3e5e6;
			}

			b {
				font-size: 16px;
				font-weight: 600;
				color: #fcc15d;
				font-size: 14px;
				font-weight: 600;
			}
			span {
				color: #a9a9aa;
				font-size: 14px;
			}
		}

		li:last-child {
			margin: 0;
		}
	}

	.btn {
		width: 70%;
		padding: 10px;
		font-size: 14px;
		color: #fff;
		background: #f15353;
		border-radius: 10px;
		margin: 0 auto;
		margin-top: 30px;
	}

	.success {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 6;
		height: 100%;
		background-image: url(../../../assets/images/applySuccessBg.png);
		background-size: cover;
		background-position: 0 -20px;
		padding: 50px 15px;
		box-sizing: border-box;
		.close {
			position: absolute;
			width: 30px;
			height: 30px;
			top: 30px;
			right: 15px;
			border-radius: 50%;
			i {
				width: 30px;
				height: 30px;
				color: #f25654;
				font-size: 30px;
			}
		}

		.top {
			text-align: left;
			.touxiang {
				width: 65px;
				height: 65px;
				float: left;
				margin-left: 15px;
				border-radius: 50%;
				img {
					width: 65px;
					height: 65px;
				}
			}
			.name {
				padding: 15px;
				line-height: 24px;
				font-size: 16px;
				float: left;
				color: #90886e;
				margin-left: 5px;
				span {
					font-weight: bold;
					font-size: 18px;
					color: #676047;
				}
			}
		}

		.top:after {
			content: "";
			display: block;
			clear: both;
		}


		.content {
			color: #f3635a;
			font-size: 24px;
			line-height: 200px;
			font-weight: bold;
		}


		p {
			color: #999179;
			font-size: 16px;
			line-height: 22px;
			padding: 20px;
			margin-top: 20px;
		}

		.btn {
			margin-top: 20px;

			color: #fff;
			font-size: 18px;
		}
	}
}
</style>
