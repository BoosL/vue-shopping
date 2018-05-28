<template>
	<div id="addCard" :class="'addCard'+$store.state.service.lang">

		<c-title :hide="false" :text='language.title'></c-title>
		<div style="height:40px"></div>
		<div class="form-group">
			<label class="form-help" for="">{{title}}</label>
		</div>
		<div class="content">
			<form action="" method="" class="form">
				<div class="form-group">
					<label class="form-help" for="">{{language.name}}</label>
					<input class="form-controler" type="text" name="" :placeholder="language.placeName" v-model="userName">
				</div>
				<div class="form-group">
					<label class="form-help" for="">{{language.tele}}</label>
					<input class="form-controler" type="text" name="" :placeholder="language.placeTele" v-model="phone">
				</div>
				<div class="form-group">
					<label class="form-help" for="">{{language.oilCard}}</label>
					<input class="form-controler" type="text" name="" :placeholder="language.placeOilCard" v-model="cardNum">
				</div>
			</form>
		</div>

		<!-- <router-link :to="fun.getUrl('oilRecharge',{cardCode:cardNum})"> -->
		<!-- <button class="btn">{{language.btn}}</button>
			</router-link> -->

		<button class="btn" @click="submit">{{language.btn}}</button>
		<div class="footer">
			<span>{{language.tips}}</span>
			<p>{{language.content}}</p>
		</div>
		<!--弹窗-->
		<div class="modal" :class="{hidePopup:hide}">
			<div class="modal-dialog">
				<div class="top">
					<i class="el-icon-warning"></i>
					<img src="" alt="" />{{language.modelTip}}
				</div>
				<div class="text">{{language.modelContent}}</div>
				<div class="btn1" @click="hidePop">{{language.modelBtn}}</div>
			</div>
		</div>

	</div>
</template>

<script>
import addCard_controller from './addCard_controller';
export default addCard_controller;
</script>

<style  lang="scss" rel="stylesheet/scss" scoped>
.addCardch {
	/*弹窗样式*/
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .7);
		z-index: 999;
		.modal-dialog {
			width: 80%;
			height: 160px;
			background: #fff;
			border-radius: 6px;
			margin: 50% auto;
			position: relative;
			.top {
				padding-left: 25px;
				line-height: 34px;
				text-align: left;
				border-bottom: 1px solid #ededed;
			}
			.text {
				line-height: 70px;
				padding-left: 25px;
				text-align: left;
			}
			.btn1 {
				width: 80%;
				height: 30px;
				line-height: 30px;
				text-align: center;
				font-size: 14px;
				font-weight: 400;
				color: #fff;
				margin: 5px auto;
				border-radius: 5px;
				background: #ff951b;
			}
		}
	}

	.content {
		background: #fff;
		.form {
			.form-group {
				padding: 0 15px;
				height: 45px;
				margin: 4px;
				border-bottom: 1px solid #ccc;
				display: -webkit-flex;
				/* Safari */
				display: flex;
				flex-flow: row;
				.form-help {
					width: 80px;
					height: 45px;
					line-height: 45px;
					text-align: left;
				}
				.form-controler {
					flex: 1;
					height: 40px;
					float: left;
					border: 0;
					outline: 0;
				}
			}
		}
	}
	.btn {
		width: 80%;
		height: 44px;
		line-height: 44px;
		text-align: center;
		font-size: 16px;
		font-weight: 600;
		color: #fff;
		margin: 23px auto;
		border-radius: 5px;
		background: #ff951b;
		border: 0;
		outline: 0;
	}
	.footer {
		margin-top: 20px;
		padding: 15px;
		text-align: left;
		span {
			color: #34c1a8;
			font-size: 16px;
		}
		p {
			font-size: 14px;
			line-height: 20px;
			margin-top: 10px;
			color: #7e7e7f;
		}
	}
	.hidePopup {
		display: none;
	}
}


.addCardwei {
	/*弹窗样式*/
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .7);
		z-index: 999;
		.modal-dialog {
			width: 80%;
			height: 160px;
			background: #fff;
			border-radius: 6px;
			margin: 50% auto;
			position: relative;
			.top {
				padding-left: 25px;
				line-height: 34px;
				text-align: left;
				border-bottom: 1px solid #ededed;
			}
			.text {
				line-height: 70px;
				padding-left: 25px;
				text-align: left;
			}
			.btn1 {
				width: 80%;
				height: 30px;
				line-height: 30px;
				text-align: center;
				font-size: 14px;
				font-weight: 400;
				color: #fff;
				margin: 5px auto;
				border-radius: 5px;
				background: #ff951b;
			}
		}
	}
	.content {
		background: #fff;
		.form {
			.form-group {
				padding: 0 15px;
				height: 45px;
				margin: 4px;
				border-bottom: 1px solid #ccc;
				display: -webkit-flex;
				/* Safari */
				display: flex;
				flex-flow: row;
				.form-help {
					order: 2;
					width: 80px;
					height: 45px;
					line-height: 45px;
					text-align: right;
				}
				.form-controler {
					order: 1;
					flex: 1;
					height: 40px;
					text-align: right;
					border: 0;
					outline: 0;
				}
			}
		}
	}
	.btn {
		width: 80%;
		height: 44px;
		line-height: 44px;
		text-align: center;
		font-size: 16px;
		font-weight: 600;
		color: #fff;
		margin: 23px auto;
		border-radius: 5px;
		background: #ff951b;
		border: 0;
		outline: 0;
	}
	.footer {
		margin-top: 20px;
		padding: 15px;
		text-align: right;
		span {
			color: #34c1a8;
			font-size: 16px;
		}
		p {
			font-size: 14px;
			line-height: 20px;
			margin-top: 10px;
			color: #7e7e7f;
		}
	}
	.hidePopup {
		display: none;
	}
}
</style>-->
