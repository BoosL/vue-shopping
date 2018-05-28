<template>
	<div class="myextension">
		<div class="banner">
			<img src="../assets/images/myextension.png">
		</div>
	
		<div class="main">
			<!--推广条件1   申请   -->
			<div class="welcome"
			     v-if="becomeType_1">
				<div class="text">
					<p>欢迎加入<span>{{become_1_info_2}}</span>，请填写申请信息</p>
					<p>邀请人：<span>{{become_1_info_1}}</span>&nbsp;请核实</p>
				</div>
				<div class="info">
					<input type="text"
					       v-model="para_name"
					       placeholder="请填写真实姓名"
					       class="inp">
					<input type="number"
					       v-model="para_phone"
					       placeholder="请填写手机号码方便联系"
					       class="inp">
					<!--<input type="text"
						v-model="para_weixin"
						       placeholder="请填写微信号"
						       class="inp">-->
					<input type="submit"
					       @click="become_1_click"
					       value="申请推广"
					       class="btn">
					<!--提交后跳转至success页面（同无条件申请）-->
				</div>
			</div>
	
			<!--推广条件2   消费达到N次   -->
			<div class="welcome"
			     v-if="becomeType_2">
				<div class="text">
					<p>本店累计消费满 <span>{{become_2_info_1}}</span> 次， 才可开启&lt;{{become_2_info_3}}&gt;推广中心，您已消费 <span>{{become_2_info_2}}</span> 次，请继续努力</p>
				</div>
				<div class="info">
					<div class="btn"
					     @click="become_2_click">
						<!--点击跳转指定商品列表页面-->
						<i class="fa fa-shopping-cart"></i> 继续去购物
					</div>
				</div>
			</div>
	
			<!--推广条件3   消费达到N元   -->
			<div class="welcome"
			     v-if="becomeType_3">
				<div class="text">
					<p>本店累计消费满 <span>{{become_3_info_1}}</span>元， 才可开启&lt;{{become_3_info_3}}&gt;推广中心，您已消费 <span>{{become_3_info_2}}</span> 元，请继续努力</p>
				</div>
				<div class="info">
					<div class="btn"
					     @click="become_3_click">
						<!--点击跳转指定商品列表页面-->
						<i class="fa fa-shopping-cart"></i> 继续去购物
					</div>
				</div>
			</div>
	
			<!--推广条件4     购买指定商品 -->
			<div class="welcome"
			     v-if="becomeType_4">
				<div class="text">
					<p>本店需购买商品
						<a href=""><span>【{{become_4_info_1}}】</span></a>
						<!--可以点击跳转指定商品页面-->
						才可开启&lt;{{become_4_info_2}}&gt;推广中心，请现在去购买吧！
					</p>
				</div>
				<div class="info">
	
					<div class="btn"
					     @click="become_4_click(become_4_info_3)">
						<!--点击跳转指定商品页面-->
						<i class="fa fa-shopping-cart"></i> 现在去购买
					</div>
				</div>
			</div>
	
			<div class="vip_main"
			     v-if="!isCheck">
				<div class="title">推广特权</div>
				<div class="vip vip1">
					<div class="ico1"><i class="fa fa-qrcode"></i></div>
					<div class="text">
						<div class="t1">专属二维码</div>
						<div class="t2">拥有专属推广二维码，用于推广客户；</div>
					</div>
				</div>
				<div class="vip">
					<div class="ico2"><i class="fa fa-cny"></i></div>
					<div class="text">
						<div class="t1">推广收入</div>
						<div class="t2">推广的客户购买商品后，您将获得相应的推广收入；</div>
					</div>
				</div>
	
			</div>
		</div>
	
		<!--1：无条件展示     2：申请后展示-->
		<div class="success"
		     v-if="isCheck">
			<div class="ico"><i class="fa fa-check"></i></div>
			<div class="text">您的申请已经提交，请等待审核！</div>
			<a @click="isCheck_click()">
				<div class="sub">去商城逛逛</div>
			</a>
		</div>
	
	</div>
</template>

<script>

import myextension_controller from './myextension_controller';
export default myextension_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
a {
	text-decoration: none;
	color: #222
}

input {
	border-width: 0
}

.myextension .banner img {
	width: 100%
}

.myextension .main .welcome {
	padding: 10px;
	background: #ffffff;
	.text {
		p {
			font-size: 0.8rem;
			color: #666;
			line-height: 1.2rem;
			span {
				color: #F55955;
			}
		}
	}
	.info {
		margin-top: 10px;
		input {
			display: block;
			margin-bottom: 8px;
			width: 100%;
			height: 2rem;
			border-radius: 5px;
			padding: 0 5px;
			box-sizing: border-box;
			outline: none;
		}

		.inp {
			border: 1px solid #b8b8b8;
		}
		.inp:focus {
			border-color: #F55955;
			box-sizing: border-box;
		}
		span {
			color: #F55955;
		}
		.btn {
			background: #f55955;
			color: #ffffff;
			margin-bottom: 8px;
			width: 100%;
			height: 2rem;
			border-radius: 5px;
			padding: 0 5px;
			box-sizing: border-box;
			text-align: center;
			font-size: .8rem;
			line-height: 2rem;
			i {
				display: inline-block
			}
		}
		.btn:focus {
			background: #d8403c;
		}
	}
}

.myextension .main .vip_main {
	background: #ffffff;
	margin: 15px 0;
	.title {
		padding: 10px;
		font-size: .8rem;
		border-bottom: 1px solid #eeeeee;
		text-align: center
	}
	.vip {
		padding: 15px 10px;
		overflow: hidden;
		font-size: .8rem;
		color: #999;
		.ico1,
		.ico2 {
			width: 15%;
			float: left;
		}
		.ico1 {
			i {
				background: #32cd32;
			}
		}
		.ico2 {
			i {
				background: #fece00;
			}
		}
		.text {
			float: left;
			width: 85%;
			.t1 {
				font-size: .95rem;
				color: #333;
				margin-bottom: 5px;
				text-align: left;
			}
			.t2 {
				text-align: justify;
			}
		}
		i {
			background: #32cd32;
			height: 36px;
			width: 36px;
			border-radius: 18px;
			color: #fff;
			text-align: center;
			line-height: 38px;
			font-size: 1.2rem;
		}
	}
	.vip1 {
		border-bottom: 1px solid #eeeeee;
	}
}

.myextension .success {
	height: 200px;
	padding-top: 65px;
	background: #ffffff;
	.ico {
		height: 65px;
		width: 65px;
		margin: auto;
		border: 3px solid #32cd32;
		border-radius: 4rem;
		color: #32cd32;
		font-size: 2.3rem;
		text-align: center;
		line-height: 4rem;
	}
	.text {
		height: 2rem;
		margin-top: 30px;
		color: #666;
		line-height: 1.6rem;
		text-align: center;
	}
	a .sub {
		height: 2rem;
		width: 80%;
		background: #f55955;
		margin: 20px auto;
		border-radius: 2rem;
		color: #fff;
		line-height: 2rem;
		text-align: center;
		font-size: .9rem;
		margin-bottom: 20px;
	}
	a .sub:focus {
		background: #d8403c;
	}
}
</style>