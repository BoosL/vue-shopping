<template>
	<div id="newAddPassenger" :class="'newAddPassenger'+$store.state.service.lang">
		<c-title :hide="false" :text="language.title"></c-title>
		<div style="height:40px"></div>

		<ul class="content">
			<li @click="choosePassanger" v-if="false">
				<label>{{language.passangeType}}</label>{{passanger}}
				<i class="iconfont icon-right" v-if="$store.state.service.lang=='ch'"></i>
				<i class="iconfont icon-left" v-else="$store.state.service.lang=='wei'"></i>
			</li>

			<div class="form-group">
				<label class="form-help">{{language.name}}</label> <input class="form-controler" type="text" :placeholder="language.placeNameTip" v-model="name" />
			</div>

			<li @click="chooseCrad" v-if="false">
				<label>{{language.cardType}}</label>{{card}}
				<i class="iconfont icon-right" v-if="$store.state.service.lang=='ch'"></i>
				<i class="iconfont icon-left" v-else="$store.state.service.lang=='wei'"></i>
			</li>

			<div class="form-group">
				<label class="form-help">{{language.cardId}}</label> <input class="form-controler" type="number" :placeholder="language.placeCardTip" v-model="cardId" />
			</div>

		</ul>

		<span class="btn" @click="confirm">{{language.btn}}</span>

		<mt-popup v-model="popupVisible" position="bottom">
			<div class="popUp">
				<div class="title">
					<span class="left" @click="choosePassanger">{{language.cancle}}</span>{{language.passangeType}}
					<span class="right" @click="choosePassanger">{{language.btn}}</span>
				</div>
				<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
			</div>
		</mt-popup>

		<mt-popup v-model="popupVisible2" position="bottom">
			<div class="popUp">
				<div class="title">
					<span class="left" @click="chooseCrad">{{language.cancle}}</span>{{language.cardType}}
					<span class="right" @click="chooseCrad">{{language.btn}}</span>
				</div>
				<mt-picker :slots="slots2" @change="onValuesChange2"></mt-picker>
			</div>
		</mt-popup>

	</div>
</template>

<script>
import newAddPassenger_controller from './newAddPassenger_controller';
export default newAddPassenger_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.newAddPassengerch {
	.content {
		li {
			height: 45px;
			line-height: 45px;
			padding: 0 15px;
			margin-top: 10px;
			background: #fff;
			text-align: left;
			label {
				width: 25%;
				float: left;
				text-align: left;
			}
			i {
				font-size: 25px;
				float: right;
			}
			input {
				border: 0;
				outline: 0;
				float: left;
				width: 75%;
				height: 45px;
				line-height: 45px;
			}
		}

		.form-group {
			padding: 0 10px;
			height: 45px;
			margin-top: 10px;
			background: #FFF;
			border-top: 1px solid #FFF;
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
				height: auto;
				line-height: 45px;
				float: left;
				border: 0;
				outline: 0;
				text-align: left;
				i {
					font-size: 23px;
					float: right;
				}
			}
		}
	}

	.btn {
		width: 80%;
		height: 40px;
		line-height: 40px;
		border: 1px solid #dfdfdf;
		display: block;
		margin: 10px auto;
		-webkit-border-radius: 6px;
		-moz-border-radius: 6px;
		border-radius: 6px;
		background: #FF951B;
		color: #fff;
		font-size: 16px;
		margin-top: 30px;
	}
	.popUp {
		width: 100%;
		background: #fff;
		.title {
			height: 45px;
			line-height: 45px;
			border-bottom: 1px solid #f3f5f7;
			padding: 0 15px;
			.left {
				float: left;
			}
			.right {
				float: right;
				color: #1bba9e;
			}
		}
	}
}



.newAddPassengerwei {
	.content {
		li {
			height: 45px;
			line-height: 45px;
			padding: 0 15px;
			margin-top: 10px;
			background: #fff;
			text-align: right;
			label {
				width: 25%;
				float: right;
				text-align: right;
			}
			i {
				font-size: 25px;
				float: left;
			}
			input {
				border: 0;
				outline: 0;
				float: right;
				width: 75%;
				height: 40px;
			}
		}
	}

	.btn {
		width: 80%;
		height: 40px;
		line-height: 40px;
		border: 1px solid #dfdfdf;
		display: block;
		margin: 10px auto;
		-webkit-border-radius: 6px;
		-moz-border-radius: 6px;
		border-radius: 6px;
		background: #FF951B;
		color: #fff;
		font-size: 16px;
		margin-top: 30px;
	}
	.popUp {
		width: 100%;
		background: #fff;
		.title {
			height: 45px;
			line-height: 45px;
			border-bottom: 1px solid #f3f5f7;
			padding: 0 15px;
			.left {
				float: right;
			}
			.right {
				float: left;
				color: #1bba9e;
			}
		}
	}
}
</style>