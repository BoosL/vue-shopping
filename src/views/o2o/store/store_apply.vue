<template>
	<div id="income">
		<div class="supplier">
			 <c-title :hide="false" text='门店申请'></c-title>
			 <div style="height: 40px;"></div>
			<div class="banner">
				<img src="../../../assets/images/MDSQ.png">
			</div>
	
			<div class="main" v-if="o2o_status==1">
				<!--申请   -->
				<div class="welcome">
					<div class="text">
						<p>请填写申请信息</p>
					</div>
					<div class="info">
						<input type="text" placeholder="设置账号" class="inp" v-model="applyModel.username">
						<input type="password" placeholder="设置密码" class="inp" v-model="applyModel.password">
						<input type="text" placeholder="请填写真实姓名" class="inp" v-model="applyModel.realname">
						<input type="number" placeholder="请填写手机号码" class="inp" v-model="applyModel.mobile">
	
						<input type="submit" value="申请" class="btn" @click="setApplyData">
					</div>
				</div>
	
				<!--文字说明；后台设置-->
				<div class="vip_main" v-if="!(o2o_info==null||o2o_info==''||o2o_info==undefined)">
					<div class="title">门店说明</div>
					<div class="vip">
						<div class="text">
							<div id="t1" v-html='o2o_info'></div>
							
							<!--<div class="t2">拥有专属推广二维码，用于推广客户；</div>-->
						</div>
					</div>
	
				</div>
			</div>
	
			<!--申请后展示-->
			<div class="success" v-if="o2o_status==2">
				<div class="ico"><i class="fa fa-check"></i></div>
				<div class="text">您的申请已经提交，请等待审核！</div>
				<a @click="goHome()">
					<div class="sub">去商城逛逛</div>
				</a>
			</div>
	
			<!--审核通过后展示，文字后台设置 -->
			<div class="success" v-if="o2o_status==3">
				<div class="ico"><i class="fa fa-check"></i></div>
				<div class="text">您已通过审核</div>
				<a @click="goHome()">
					<div class="sub">去商城逛逛</div>
				</a>
			</div>
		</div>
	
	</div>
</template>
<script>
import store_apply_controller from './store_apply_controller';
export default store_apply_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.el-input__icon.el-icon-caret-top {
	color: #b8b8b8;
}

.el-input__inner {
	border: 1px solid #b8b8b8;
	font-size: 12px;
}

.el-select {
	display: block;
	margin-bottom: 8px;
	width: 100%;
	height: 2rem;
	border-radius: 5px;
	box-sizing: border-box;
	outline: none;
}

#income {



	h3 {
		background: #f5f5f5;
		margin: 0;
		padding: 0 10px;
		text-align: left;
		font-weight: normal;
		font-size: .8rem;
		height: 2rem;
		box-sizing: border-box;
		line-height: 2rem;
		span {
			color: #999;
		}
	}
}

a {
	text-decoration: none;
	color: #222
}

input {
	border-width: 0
}

.supplier .banner img {
	width: 100%
}

.supplier .main {
	position: relative;
	top: -4px;
}

.welcome {
	padding: 10px;
	background: #ffffff;
	.text {
		p {
			font-size: 0.8rem;
			color: #666;
			line-height: 1.2rem;
			margin-top: 0;
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

.supplier .main .vip_main {
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

.supplier .success {
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

