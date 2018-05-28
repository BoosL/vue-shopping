<template>
	<div id="trainAddOrder" :class="'trainAddOrder'+$store.state.service.lang">
		<c-title :hide="false" :text="jsonInfo.fromStation+' - '+jsonInfo.toStation"></c-title>
		<div style="height:40px"></div>

		<div class="flight">
			<div class="top">
				<span>{{jsonInfo.date}}</span>
				<span id="week">{{week}}</span>
			</div>

			<div class="flightNum">
				<div>
					<span class="fromTime">{{trainInfo.startTime}}</span>
					<span class="addOne">{{trainInfo.trainNumber}}</span>
					<span class="toTime">{{trainInfo.endTime}}</span>
				</div>
				<p>
					<span class="fromAddr">{{trainInfo.currentStartStationName}}</span>
					<span class="during">{{trainInfo.runTime|trainRunTime}}</span>
					<span class="toAddr">{{trainInfo.currentEndStationName}}</span>
				</p>
			</div>
		</div>

		<div class="information">
			<div class="trainprice">
				<span>{{trainNumberItem.seatName}}</span>
				<b>¥{{trainNumberItem.seatPrice}}</b>
			</div>

			<div class="opportunity">
				<div class="add">
					<span class="left">{{language.flight}}</span>
					<button class="right" type="button" @click="passenger">{{language.addFlight}}</button>
				</div>
				<ul class="people">
					<li v-for="(airMan,index) in tempSelectAirMans">
						<div class="left" @click="removePeople(airMan)"></div>
						<div class="airman">
							<h3>姓名:{{airMan.username}}</h3>
							<p>身份证:{{airMan.ids}}</p>
						</div>
					</li>
				</ul>
			</div>
			<div class="content">
				<div class="linkman">
					<label>联系人</label> <input type="text" placeholder="用于接收通知" v-model="linkmanName"/>
				</div>
				<div class="linkman1">
					<label>联系手机</label> <input type="text" placeholder="用于接收通知" v-model="linkmanPhone"/>
				</div>
				<ul class="safe" v-if="false">
					<li>
						<div class="left">
							<h3>
								<span>乘意险</span>
								<i class="iconfont icon-tishi" @click="closedelayRisk"></i>
							</h3>
							<p>
								<span>最高赔付200元</span>
								<span>¥20</span>
								<span>X</span>
								<span>1份</span>
							</p>
						</div>
						<div class="circle" :class="{active:chooseed}" @click="chooseCircle1"></div>
					</li>
				</ul>
			</div>
			<div class="m-footer">
				<div class="score" v-if="false">
					<div class="left">
						<b>{{language.score}}</b>
						<span>{{language.useScore}}
							<i>{{score}}</i>{{language.scoreDeductible}}
							<i>{{scoreMoney}}</i>{{language.yuan}}</span>
					</div>
					<mt-switch class="right" v-model="useScore"></mt-switch>
				</div>
				<div class="clear"></div>
				<div class="amount">
					<span class="left">{{language.total}} ¥
						<b>{{count*(trainNumberItem.seatPrice)|calculate}}</b>
						<i>{{language.all}}
							<b>{{count}}</b>{{language.people}}</i>
					</span>

					<button class="right" type="button" @click="submit">{{language.submitOrder}}</button>

				</div>
			</div>
		</div>

		<!--乘意险-->
		<div class="modal" v-show="delayRisk">
			<div class="modal-dialog">
				<h1 class="title">
					<i class="iconfont icon-tishi"></i> {{language.delayInsurance}}</h1>
				<ul class="regulations">
					<li>转签规定： <br />不得转签</li>
					<li>改签规定： <br />起飞前4小时意外，收取公布运价的30% <br />起飞前4小时以内，收取公布运价的40% </li>
					<li>退票规定： <br />起飞前4小时意外，收取公布运价的30% <br />起飞前4小时以内，收取公布运价的40% </li>
				</ul>
				<span class="button" @click="closedelayRisk">我知道了</span>
			</div>
		</div>

		<!--增加乘机人-->
		<mt-popup v-model="addPassenger" position="bottom">
			<div class="passenger">
				<p class="control">
					<span class="left" @click="closeAirMans">{{language.cancle}}</span>
					<span class="right" @click="addAirMans">{{language.confirm}}
						<b>({{this.count}}</b>/
						<b>{{airMans.length}})</b>
					</span>
				</p>
				<ul>
					<li v-for="(airMan,index) in airMans">
						<div class="left">

							<div class="icon">
								<i class="iconfont icon-liuyan"></i>
							</div>

							<div class="infom">
								<p>
									<span>{{language.name}}</span>
									<span>{{airMan.username}}</span>

								</p>
								<p>
									<span>{{language.IDCard}}</span>
									<span>{{airMan.ids}}</span>
								</p>
							</div>
						</div>
						<div class="right">
							<div class="circle" :class="{active:airMans[index].choose}" @click="chooseCircle(index)"></div>
						</div>
					</li>
				</ul>
				<span class="btn" @click="newAddPassenger">{{language.btnAddFlight}}</span>
			</div>
		</mt-popup>

		<!--新增加乘机人-->
		<mt-popup v-model="newAddPassengerPop" class="mint-popup-3" position="right" closeOnClickModal='true' modal='false' style="z-index:2004;">
			<div class="new-add-passenger">
				<mt-header fixed :title="language.addTitle">
					<mt-button icon="back" @click="closeNewAddPassenger" slot="left"></mt-button>
				</mt-header>

				<ul class="content1">

					<div class="form-group">
						<label class="form-help">{{language.name}}</label> <input class="form-controler" type="text" :placeholder="language.placeNameTip" v-model="name" />
					</div>

					<div class="form-group">
						<label class="form-help">{{language.cardId}}</label> <input class="form-controler" type="number" :placeholder="language.placeCardTip" v-model="cardId" />
					</div>

					<div class="form-group">
						<label class="form-help">{{language.phoneNumber}}</label> <input class="form-controler" type="number" :placeholder="language.placePhoneNumberTip" v-model="phoneNumber" />
					</div>

				</ul>

				<span class="btn1" @click="confirmAddPassenger">{{language.btn}}</span>
			</div>
		</mt-popup>

		<!--明细-->
		<div class="modalDetail" v-show="details" @click="closeDetails">
			<div class="modal-dialog" @click.stop>
				<ul>
					<li>
						<span>成人票</span>
						<span class="center">￥750</span>
						<span class="right">x1人</span>
					</li>
				</ul>
				<ul>
					<li>
						<span>乘意险</span>
						<span class="center">￥20</span>
						<span class="right">x1人</span>
					</li>
				</ul>
			</div>
		</div>

	</div>
</template>
<script>
import trainAddOrder_controller from './trainAddOrder_controller';
export default trainAddOrder_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
b {
	font-weight: normal;
	color: #1E1E1E;
}

.trainAddOrderch {

	.new-add-passenger {
		overflow-y: scroll;
		width: 100vw;
		height: 100vh;
		background: #e8e8e8;
	}
	.mint-header {
		background: none;
		color: #666;
	}

	.is-fixed .mint-header-title {
		font-weight: bold;
	}

	.mint-header.is-fixed {
		border-bottom: 1px solid #e8e8e8;
		background: #FFF;
		z-index: 99;
	}

	.is-right a {
		font-size: .6rem;
	}

	.content1 {
		margin-top: 50px;
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

	.btn1 {
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
	/*明细弹窗*/
	.modalDetail {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .7);
		z-index: 70;
		.modal-dialog {
			width: 100%;
			padding-bottom: 20px;
			background: #fff;
			z-index: 1200;
			bottom: 98px;
			position: absolute;
			padding-top: 10px;
			ul {
				li {
					padding: 0 15px;
					height: 22px;
					line-height: 22px;
					span {
						width: 33.3%;
						display: inline-block;
						float: left;
						text-align: left;
					}
					.center {
						text-align: center;
					}
					.right {
						text-align: right;
					}
				}
			}
		}
	}
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
			padding-bottom: 20px;
			background: #fff;
			border-radius: 6px;
			margin: 30% auto;
			position: relative;
			.title {
				i {
					color: #FF951B
				}
				color:#666;
				font-weight: normal;
				font-size: 14px;
				line-height:35px;
				text-align:left;
				padding-left:25px;
				border-bottom:1px solid #ccc;
			}
			.content {
				padding: 10px;
				li {
					width: 50%;
					line-height: 30px;
					float: left;
					text-align: left;
				}
			}
			.content:after {
				display: table;
				content: '';
				clear: both;
			}
			.regulations {
				padding: 10px;
				li {
					text-align: left;
					padding-top: 5px;
				}
			}
			.button {
				display: block;
				width: 80%;
				height: 35px;
				line-height: 35px;
				background: #FF951B;
				-webkit-border-radius: 5px;
				-moz-border-radius: 5px;
				border-radius: 5px;
				color: #fff;
				margin: 0 auto;
			}
		}
	}

	.flight {
		margin: 5px 5px;
		border-radius: 6px;
		box-shadow: 2px 2px 2px 0 #aaa;
		.top {
			background: #1BBA9E;
			height: 30px;
			line-height: 30px;
			color: #fff;
			text-align: left;
			padding-left: 15px;
			border-top-left-radius: 6px;
			border-top-right-radius: 6px;
		}
		.flightNum {
			background: #fff;
			height: 80px;
			border-bottom-left-radius: 6px;
			border-bottom-right-radius: 6px;
			div {
				padding: 10px 10px 0;
				line-height: 35px;
				overflow: hidden;
				font-size: 22px;
				background: url(../../../../assets/images/airline.png) no-repeat 50% 28px;
				.fromTime {
					float: left;
				}
				.toTime {
					float: right;
				}
				.addOne {
					color: #1BBA9E;
					font-size: 12px;
					vertical-align: middle;
				}
			}
			p {
				line-height: 20px;
				padding: 0 10px;
				margin-top: 5px;
				font-size: 13px;
				.fromAddr {
					float: left;
				}
				.during {
					margin-left: 25px;
					font-size: 11px;
				}
				.toAddr {
					float: right;
				}
				.stopCity {
					color: #1BBA9E
				}
			}
		}
	}

	.information {
		margin-top: 10px;
		button {
			width: 89px;
			height: 27px;
			line-height: 27px;
			height: 27px;
			color: #fff;
			text-align: center;
			background: #ff951b;
			margin-top: 9px;
			border: 0;
			outline: 0;
			border-radius: 5px;
		}
		.trainprice {
			height: 40px;
			line-height: 40px;
			padding: 0 15px;
			background: #fff;
			margin-bottom: 10px;
			span {
				float: left;
			}
			b {
				float: right;
				font-size: 16px;
				color: #FF951B;
			}
		}
		.opportunity {
			background: #fff;
			.add {
				padding: 0 15px;
				height: 45px;
				line-height: 45px;
				.left {
					float: left;
				}
				.right {
					float: right
				}
			}
			.people {
				border-top: 1px solid #ccc;
				li {
					padding: 0 15px;
					height: 60px;
					display: flex;
					flex-flow: row;
					div.left {
						width: 40px;
						float: left;
						background: url(../../../../assets/images/delete.png) no-repeat 0 15px;
					}
					.airman {
						flex: 1;
						height: 100%;
						text-align: left;
						h3 {
							height: 35px;
							line-height: 35px;
							color: #1E1E1E;
							font-size: 16px;
							font-weight: normal;
						}
						p {
							font-size: 12px;
							color: #666;
						}
					}
				}
			}
		}
		.content {
			margin-bottom: 150px;
			.linkman {
				margin-top: 15px;
				background: #fff;
				margin-bottom: 15px;
				height: 40px;
				line-height: 40px;
				padding: 0 15px;
				display: flex;
				flex-flow: row;
				label {
					width: 80px;
					text-align: left;
				}
				input {
					flex: 1;
					border: 0;
					outline: 0;
				}
			}
			.linkman1 {
				margin-top: 5px;
				background: #fff;
				margin-bottom: 15px;
				height: 40px;
				line-height: 40px;
				padding: 0 15px;
				display: flex;
				flex-flow: row;
				label {
					width: 80px;
					text-align: left;
				}
				input {
					flex: 1;
					border: 0;
					outline: 0;
				}
			}
			.safe {
				background: #fff;
				li {
					padding: 0 15px;
					border-bottom: 1px solid #ccc;
					height: 70px;
					text-align: left;
					div.left {
						float: left;
						h3 {
							font-weight: normal;
							overflow: hidden;
							span {
								font-size: 16px;
								width: 100px;
								height: 20px;
								display: inline-block;
								float: left;
							}
							i {
								color: #FF951B;
								font-size: 25px;
								float: left;
							}
							padding-top:15px;
							color:#lelele;
						}
						p {
							color: #666;
							font-size: 12px;
							span {
								padding-right: 4px;
							}
						}
					}
					.circle {
						width: 20px;
						height: 20px;
						line-height: 20px;
						text-align: center;
						display: inline-block;
						border: 1px solid #aaa;
						border-radius: 50%;
						margin-top: 20px;
						float: right;
					}
					.active {
						border: 1px solid #36d2b6;
						background: url(../../../../assets/images/mark.png) no-repeat 4px 4px;
					}
				}
				li:last-child {
					border-bottom: none;
				}
			}
		}
		.m-footer {
			width: 100%;
			position: fixed;
			bottom: 0;
			background: #fff;
			z-index: 200;
			.score {
				height: 45px;
				line-height: 45px;
				padding: 0 13px;
				div.left {
					float: left;
					b {
						color: #lelele;
						font-size: 16px;
						font-weight: noraml;
					}
					span {
						color: #lelele;
						font-size: 12px;
						i {
							font-style: normal;
						}
					}
				}
				.right {
					float: right;
				}
			}
			.amount {
				margin-top: 5px;
				height: auto;
				line-height: 40px;
				padding-right: 5px;
				padding-left: 5px;
				margin-bottom: 0;
				box-sizing: border-box;
				span.left {
					float: left;
					color: #333;
					font-size: 16px;
					i {
						font-style: normal;
						padding-left: 10px;
						color: #666;
						font-size: 12px;
					}
				}
				button.right {
					float: right;
					width: 105px;
					margin-right: 0px;
					height: 40px;
					line-height: 40px;
					margin-bottom: 5px;
					color: #fff;
					font-size: 16px;
					background: #ff951b;
					border: 0;
					border-radius: 3px;
					margin-top: 0px;
				}
				span.right {
					float: right;
					padding-right: 10px;
					height: 50px;
					line-height: 50px;
					i {
						font-size: 20px;
						vertical-align: middle;
					}
				}
			}
		}
	}
	.passenger {
		padding: 0 15px;
		a {
			color: #333
		}
		.control {
			height: 40px;
			line-height: 40px;
			.left {
				float: left;
				font-size: 14px;
			}
			.right {
				float: right;
				color: #36d2b6;
				font-size: 14px;
			}
		}
		ul {
			li {
				text-align: left;
				border-bottom: 1px solid #eee;
				height: 50px;
				margin-top: 5px;
				.left {
					width: 90%;
					float: left;
					.icon {
						height: 50px;
						float: left;
						line-height: 50px;
						padding: 0 10px;
						i {
							color: #ccc;
							width: 30px;
							font-size: 30px;
						}
					}
					.infom {
						float: left;
						p {
							color: #7c7c7c;
							height: 25px;
							line-height: 25px;
							font-size: 12px;
						}
					}
				}
				.right {
					width: 10%;
					float: left;
					.circle {
						width: 20px;
						height: 20px;
						line-height: 20px;
						text-align: center;
						display: inline-block;
						border: 1px solid #aaa;
						border-radius: 50%;
						margin-top: 10px;
						float: right;
					}
					.active {
						border: 1px solid #36d2b6;
						background: url(../../../../assets/images/mark.png) no-repeat 4px 4px;
					}
				}
			}
		}
		.btn {
			width: 100%;
			height: 40px;
			line-height: 40px;
			border: 1px solid #dfdfdf;
			display: block;
			margin: 8px auto;
			-webkit-border-radius: 6px;
			-moz-border-radius: 6px;
			border-radius: 6px;
		}
	}
}


.trainAddOrderwei {
	/*明细弹窗*/
	.modalDetail {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .7);
		z-index: 70;
		.modal-dialog {
			width: 100%;
			padding-bottom: 20px;
			background: #fff;
			z-index: 1200;
			bottom: 96px;
			position: absolute;
			padding-top: 10px;
			ul {
				li {
					padding: 0 15px;
					height: 22px;
					line-height: 22px;
					span {
						width: 33.3%;
						display: inline-block;
						float: right;
						text-align: right;
					}
					.center {
						text-align: center;
					}
					.right {
						text-align: left;
					}
				}
				.line {
					border-bottom: 1px solid #eee;
					margin-bottom: 10px;
					padding-bottom: 10px;
				}
			}
		}
	}
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
			padding-bottom: 20px;
			background: #fff;
			border-radius: 6px;
			margin: 30% auto;
			position: relative;
			.title {
				i {
					color: #FF951B;
					font-size: 25px;
					float: right;
				}
				color:#666;
				font-weight: normal;
				font-size: 14px;
				line-height:35px;
				text-align:right;
				padding-right:25px;
				border-bottom:1px solid #ccc;
			}
			.content {
				padding: 10px;
				li {
					width: 50%;
					line-height: 30px;
					float: right;
					span {
						float: right;
					}
				}
			}
			.content:after {
				display: table;
				content: '';
				clear: both;
			}
			.regulations {
				padding: 10px;
				li {
					text-align: right;
					padding-top: 5px;
				}
			}
			.button {
				display: block;
				width: 80%;
				height: 35px;
				line-height: 35px;
				background: #FF951B;
				-webkit-border-radius: 5px;
				-moz-border-radius: 5px;
				border-radius: 5px;
				color: #fff;
				margin: 0 auto;
			}
		}
	}

	.flight {
		margin: 10px 15px;
		border-radius: 6px;
		box-shadow: 2px 2px 2px 0 #aaa;
		.top {
			background: #1BBA9E;
			height: 30px;
			line-height: 30px;
			color: #fff;
			text-align: right;
			padding-right: 15px;
			border-top-left-radius: 6px;
			border-top-right-radius: 6px;
			span {
				float: right;
			}
		}
		.flightNum {
			background: #fff;
			height: 70px;
			border-bottom-left-radius: 6px;
			border-bottom-right-radius: 6px;
			div {
				padding: 10px 15px 0;
				line-height: 35px;
				overflow: hidden;
				font-size: 22px;
				background: url(../../../../assets/images/airlineLeft.png) no-repeat 50% 28px;
				.fromTime {
					float: right;
				}
				.toTime {
					float: left;
				}
				.addOne {
					font-size: 12px;
					vertical-align: middle;
				}
			}
			p {
				padding: 0 15px;
				font-size: 13px;
				.fromAddr {
					float: right;
				}
				.toAddr {
					float: left;
				}
				.stopCity {
					color: #1BBA9E
				}
			}
		}
	}

	.information {
		button {
			width: 89px;
			height: 27px;
			line-height: 27px;
			height: 27px;
			color: #fff;
			text-align: center;
			background: #ff951b;
			margin-top: 9px;
			border: 0;
			outline: 0;
			border-radius: 5px;
		}
		.trainprice {
			height: 40px;
			line-height: 40px;
			padding: 0 15px;
			background: #fff;
			margin-bottom: 10px;
			span {
				float: right;
			}
			b {
				float: left;
				font-size: 16px;
				color: #FF951B;
			}
		}
		.opportunity {
			background: #fff;
			.add {
				padding: 0 15px;
				height: 45px;
				line-height: 45px;
				.left {
					float: right;
				}
				.right {
					float: left
				}
			}
			.people {
				border-top: 1px solid #ccc;
				li {
					padding: 0 15px;
					height: 60px;
					display: flex;
					flex-flow: row;
					div.left {
						width: 40px;
						order: 2;
						background: url(../../../../assets/images/delete.png) no-repeat 15px 15px;
					}
					.airman {
						flex: 1;
						order: 1;
						height: 100%;
						text-align: right;
						h3 {
							height: 35px;
							line-height: 35px;
							color: #1E1E1E;
							font-size: 16px;
							font-weight: normal;
						}
						p {
							font-size: 12px;
							color: #666;
						}
					}
				}
			}
		}
		.content {
			margin-bottom: 150px;
			.linkman {
				margin-top: 15px;
				background: #fff;
				margin-bottom: 15px;
				height: 40px;
				line-height: 40px;
				padding: 0 15px;
				display: flex;
				flex-flow: row;
				label {
					width: 80px;
					text-align: right;
					order: 2;
				}
				input {
					flex: 1;
					order: 1;
					border: 0;
					outline: 0;
				}
			}
			.safe {
				background: #fff;
				li {
					padding: 0 15px;
					border-bottom: 1px solid #ccc;
					height: 70px;
					text-align: right;
					div.left {
						float: right;
						h3 {
							font-weight: normal;
							overflow: hidden;
							span {
								font-size: 16px;
								width: 100px;
								height: 20px;
								display: inline-block;
								float: right;
							}
							i {
								color: #FF951B;
								font-size: 25px;
								float: left;
							}
							padding-top:15px;
							color:#lelele;
						}
						p {
							color: #666;
							font-size: 12px;
							span {
								padding-right: 4px;
							}
						}
					}
					.circle {
						width: 20px;
						height: 20px;
						line-height: 20px;
						text-align: center;
						display: inline-block;
						border: 1px solid #aaa;
						border-radius: 50%;
						margin-top: 20px;
						float: left;
					}
					.active {
						border: 1px solid #36d2b6;
						background: url(../../../../assets/images/mark.png) no-repeat 4px 4px;
					}
				}
				li:last-child {
					border-bottom: none;
				}
			}
		}
		.m-footer {
			width: 100%;
			position: fixed;
			bottom: 0;
			background: #fff;
			z-index: 200;
			.score {
				height: 45px;
				padding: 0 13px;
				div.left {
					float: right;
					width: 82%;
					b {
						color: #lelele;
						font-size: 16px;
						font-weight: noraml;
						float: right;
						line-height: 45px;
					}
					span {
						color: #lelele;
						font-size: 12px;
						padding-right: 10px;
						line-height: 22px;
						i {
							font-style: normal;
						}
					}
				}
				.right {
					float: left;
					width: 18%;
				}
			}
			.amount {
				height: 50px;
				line-height: 50px;
				/*padding:0 0 0 13px;*/
				margin-bottom: 0;
				box-sizing: border-box;
				span.left {
					float: left;
					color: #333;
					font-size: 16px;
					i {
						font-style: normal;
						padding-left: 10px;
						color: #666;
						font-size: 12px;
					}
				}
				button.right {
					float: right;
					width: 105px;
					height: 40px;
					color: #fff;
					font-size: 16px;
					background: #ff951b;
					border: 0;
					border-radius: 3px;
					margin-top: 9px;
				}
				span.right {
					float: right;
					/*padding-right:10px;*/
					height: 50px;
					line-height: 50px;
					i {
						font-size: 20px;
						vertical-align: middle;
					}
				}
			}
		}
	}
	.passenger {
		padding: 0 15px;
		a {
			color: #333
		}
		.control {
			height: 40px;
			line-height: 40px;
			.left {
				float: right;
			}
			.right {
				float: left;
				color: #36d2b6;
			}
		}
		ul {
			li {
				text-align: right;
				border-bottom: 1px solid #eee;
				height: 50px;
				margin-top: 5px;
				.left {
					width: 90%;
					float: right;
					.icon {
						height: 50px;
						float: right;
						line-height: 50px;
						padding: 0 10px;
						i {
							color: #ccc;
							width: 30px;
							font-size: 30px;
						}
					}
					.infom {
						float: right;
						p {
							color: #7c7c7c;
							height: 25px;
							font-size: 12px;
							span {
								float: right;
							}
						}
					}
				}
				.right {
					width: 10%;
					float: right;
					.circle {
						width: 20px;
						height: 20px;
						line-height: 20px;
						text-align: center;
						display: inline-block;
						border: 1px solid #aaa;
						border-radius: 50%;
						margin-top: 10px;
						float: right;
					}
					.active {
						border: 1px solid #36d2b6;
						background: url(../../../../assets/images/mark.png) no-repeat 4px 4px;
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
		}
	}
}
</style>