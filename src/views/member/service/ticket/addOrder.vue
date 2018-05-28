<template>
	<div id="addOrder" :class="'addOrder'+$store.state.service.lang">
		<c-title :hide="false" :text="jsonInfo.fromStation+'-'+jsonInfo.toStation"></c-title>
		<div style="height:40px"></div>

		<div class="flight">
			<div class="top">
				<span>{{jsonInfo.airDate}}</span>
				<span id="week">{{week}}</span>
				<!--<span>{{card.week}}</span> <span>海南航空</span> <span>HU2014</span>-->
			</div>
			<div class="flightNum">
				<div>
					<span class="fromTime">{{flightInfo.depTime}}</span>
					<!--<span class="addOne" v-show="false">+1天</span>-->
					<span class="toTime">{{flightInfo.arriTime}}</span>
				</div>
				<p>
					<span class="fromAddr">{{flightInfo.orgCityName}}</span>
					<!--<span class="stopCity" @click="closeCity">{{language.stopPort}}</span>-->
					<span class="toAddr">{{flightInfo.dstCityName}}</span>
				</p>
			</div>
			<div class="addr">
				<span>{{flightInfo.flightCompanyName}}</span>
				<span> {{flightInfo.flightNo}}</span>
				<!--<span>准点率：</span> <span>8%</span> <span>|</span>
															<span>波音701-9</span> <span>(大型机)</span>-->
				<span></span>
				<span>机型:{{flightInfo.planeType}}</span>
			</div>
		</div>
		<div class="information">
			<div class="trainprice">
				<span>{{flyListItem.seatMsg}}</span>
				<b>¥{{flyListItem.settlePrice}}</b>
			</div>
			<div class="trainprice1">
				<span>机建燃油</span>
				<b>¥{{flightInfo.adultFuelTax}} ¥{{flightInfo.adultAirportTax}}</b>
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
					<div class='name'>
						<span class="left">{{language.contacts}}</span>

						<input type="text" :placeholder="language.linkmanName" v-model="linkmanName" />
					</div>
					<div class="phone">
						<span class="left">{{language.phone}}</span>
						<input type="text" :placeholder="language.linkmanPhone" v-model="linkmanPhone" />
					</div>
				</div>
				<!--<ul class="safe">
											                    <li>
											                        <div class="left">
											                            <h3><span>{{language.flightDelays}}</span><i class="iconfont icon-tishi" @click="closedelayRisk"></i></h3>
											                            <p><span>最高赔付200元</span><span>¥20</span>
											                            	<span>X</span> <span>1份</span> </p>
											                        </div>
											                        <div class="circle" :class="{active:chooseed}" @click="chooseCircle1"></div>
											                    </li>
											                    <li>
											                        <div class="left">
											                            <h3><span>{{language.casualty}}</span><i class="iconfont icon-tishi" @click="closeCasualty"></i></h3>
											                            <p><span>百万保额护行程</span><span>¥30</span>
											                            	<span>X</span> <span>1份</span> </p>
											                        </div>
											                        <div class="circle" :class="{active:chooseed2}" @click="chooseCircle2"></div>
											                    </li>
											                </ul>-->

				<!--<div class="integral">
											                    <span class="left">{{language.reimbursementVoucher}}</span>
											                    <mt-switch class="right" v-model="useScore"></mt-switch>
											                </div>-->
			</div>
			<div class="m-footer">
				<div class="clear"></div>
				<div class="amount">
					<span class="left">{{language.total}} ¥
						<b>{{count*(flyListItem.settlePrice+flightInfo.adultFuelTax+flightInfo.adultAirportTax)|calculate}}</b>
						<i>{{language.all}}
							<b>{{count}}</b>{{language.people}}</i>
					</span>

					<button class="right" :class="{des:isDes}" type="button" @click="submit">{{language.submitOrder}}</button>

					<!--<span class="right" @click="closeDetails">{{language.detail}}
											                    	<i class="iconfont icon-down" v-show="!details"></i>
											                    	<i class="iconfont icon-up" v-show="details"></i>
											                    </span>-->
				</div>
			</div>
		</div>

		<!--延误险-->
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
		<!--意外险-->
		<div class="modal" v-show="casualty">
			<div class="modal-dialog">
				<h1 class="title">
					<i class="iconfont icon-tishi"></i> {{language.accidentInsurance}}</h1>
				<ul class="regulations">
					<li>转签规定： <br />不得转签</li>
					<li>改签规定： <br />起飞前4小时意外，收取公布运价的30% <br />起飞前4小时以内，收取公布运价的40% </li>
					<li>退票规定： <br />起飞前4小时意外，收取公布运价的30% <br />起飞前4小时以内，收取公布运价的40% </li>
				</ul>
				<span class="button" @click="closeCasualty">{{language.know}}</span>
			</div>
		</div>
		<!--经停城市-->
		<div class="modal" v-show="city" @click="closeCity">
			<div class="modal-dialog" @click.stop>
				<h1 class="title">
					<i class="iconfont icon-tishi"></i>{{language.stopInformation}}</h1>
				<ul class="content">
					<li>
						<span>{{language.stopCity}}</span>
						<span>天津</span>
					</li>
					<li>
						<span>{{language.stopTime}}</span>
						<span>00:30</span>
					</li>
					<li>
						<span>{{language.startFly}}</span>
						<span>30分钟</span>
					</li>
					<li>
						<span>{{language.endFly}}</span>
						<span>00:30</span>
					</li>
				</ul>
				<span class="button" @click="closeCity">{{language.know}}</span>
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
							<router-link :to="fun.getUrl('')">
								<div class="icon">
									<i class="iconfont icon-liuyan"></i>
								</div>
							</router-link>
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
					<li class="line">
						<span>机建+燃油</span>
						<span class="center">￥50</span>
						<span class="right">x1人</span>
					</li>
					<li>
						<span>延误险</span>
						<span class="center">￥20</span>
						<span class="right">x1人</span>
					</li>
					<li>
						<span>意外险</span>
						<span class="center">￥30</span>
						<span class="right">x1人</span>
					</li>
				</ul>
			</div>
		</div>

	</div>
</template>
<script>
import addOrder_controller from './addOrder_controller';
export default addOrder_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
b {
	font-weight: normal;
	color: #1E1E1E;
}

.addOrderch {

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
			height: 70px;
			div {
				padding: 5px 15px 0;
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
					font-size: 12px;
					vertical-align: middle;
				}
			}
			p {
				padding: 0 15px;
				font-size: 11px;
				.fromAddr {
					float: left;
				}
				.toAddr {
					float: right;
				}
				.stopCity {
					color: #1BBA9E
				}
			}
		}
		.addr {
			font-size: 10px;
			background: #fff;
			height: 32px;
			line-height: 32px;
			border-bottom-left-radius: 6px;
			border-bottom-right-radius: 6px;
		}
	}

	.information {
		.trainprice {
			height: 40px;
			line-height: 40px;
			padding: 0 15px;
			background: #fff;
			margin-bottom: 0px;
			span {
				float: left;
			}
			b {
				float: right;
				font-size: 16px;
				color: #FF951B;
			}
		}
		.trainprice1 {
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
		padding-top: 5px;
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
							font-size: 14px;
							font-weight: normal;
						}
						p {
							font-size: 11px;
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
				.name {
					height: 45px;
					line-height: 45px;
					padding: 0 15px;
					span {
						float: left;
						padding-right: 5px;
					}
					input {
						margin-left: 10px;
						float: left;
						width: 70%;
						flex: 1;
						height: 42px;
						line-height: 42px;
						float: left;
						border: 0;
						outline: 0;
						text-align: left;
						i {
							font-size: 23px;
							float: right;
						}
					}
					button {
						float: right;
					}
				}
				.phone {
					height: 45px;
					line-height: 45px;
					border-top: 1px solid #ccc;
					padding: 0 15px;
					span {
						float: left;
						padding-right: 5px;
					}
					b {
						float: left;
					}
					input {
						margin-left: 10px;
						float: left;
						width: 70%;
						flex: 1;
						height: 42px;
						line-height: 42px;
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
			/*.safe{
                background:#fff;
                li{
                    padding:0 15px;
                    border-bottom:1px solid #ccc;
                    height:70px;
                    text-align:left;
                    div.left{
                    	float: left;
                    	h3{
                    		font-weight: normal;
                    		overflow: hidden;
	                        span{
	                            font-size:16px;
	                            width:100px;
	                            height:20px;
	                            display:inline-block;
	                            float: left;
	                        }
	                        i{color:#FF951B;font-size: 25px;float: left;}
	                        padding-top:15px;
	                        padding-bottom:10px;
	                        color:#lelele;
	                    }
	                    p{
	                        color:#666;
	                        font-size:12px;
	                        span{padding-right: 4px;}
	                    }
                    }
                    .circle{
                        width:20px;
                        height:20px;
                        line-height:20px;
                        text-align:center;
                        display:inline-block;
                        border:1px solid #aaa;
                        border-radius:50%;
                        margin-top:20px;
                        float:right;
                    }
                    .active{
                        border:1px solid #36d2b6;
                        background:url(../../../../assets/images/mark.png) no-repeat 4px 4px;
                    }
                }
                li:last-child{
                    border-bottom:none;
                }
            }*/
			.integral {
				background: #fff;
				padding: 0 15px;
				height: 45px;
				line-height: 45px;
				margin-top: 15px;
				.left {
					float: left;
				}
				.right {
					float: right;
				}
			}
		}
		.m-footer {
			width: 100%;
			position: fixed;
			bottom: 0;
			padding-left: 10px;
			padding-right: 10px;
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
					margin-right: 10px;
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
				button.right.des {
					float: right;
					width: 105px;
					margin-right: 10px;
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
		padding: 0 10px;
		a {
			color: #333
		}
		.control {
			height: 35px;
			line-height: 35px;
			.left {
				float: left;
				font-size: 13px;
			}
			.right {
				float: right;
				color: #36d2b6;
				font-size: 13px;
			}
		}
		ul {
			li {
				text-align: left;
				border-bottom: 1px solid #eee;
				height: 50px;
				margin-top: 5px;
				margin-bottom: 5px;
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
			width: 90%;
			height: 30px;
			line-height: 30px;
			border: 1px solid #dfdfdf;
			display: block;
			margin: 10px auto;
			-webkit-border-radius: 6px;
			-moz-border-radius: 6px;
			border-radius: 6px;
		}
	}
}


.addOrderwei {
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
			text-align: left;
			padding-right: 15px;
			border-top-left-radius: 6px;
			border-top-right-radius: 6px;
			span {
				float: right;
				padding-left: 4px;
			}
		}
		.flightNum {
			background: #fff;
			height: 70px;
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
		.addr {
			background: #fff;
			height: 35px;
			font-size: 10px;
			border-bottom-left-radius: 6px;
			border-bottom-right-radius: 6px;
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
					float: left;
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
						float: right;
						background: url(../../../../assets/images/delete.png) no-repeat 20px 15px;
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
				.name {
					height: 45px;
					line-height: 45px;
					padding: 0 15px;
					span {
						float: right;
						padding-left: 8px;
					}
					b {
						float: right;
					}
					button {
						float: left;
					}
				}
				.phone {
					height: 45px;
					line-height: 45px;
					border-top: 1px solid #ccc;
					padding: 0 15px;
					span {
						float: right;
						padding-left: 8px;
					}
					b {
						float: right;
					}
				}
			}
			/*.safe{
                background:#fff;
                li{
                    padding:0 15px;
                    border-bottom:1px solid #ccc;
                    height:70px;
                    text-align:left;
                    div.left{
                    	float: right;
                    	h3{
                    		font-weight: normal;
                    		text-align: right;
                    		overflow: hidden;
	                        span{
	                            font-size:16px;
	                            height:20px;
	                            display:inline-block;
	                            float: right;
	                        }
	                        i{color:#FF951B;font-size: 25px;vertical-align: bottom;float:right;}
	                        padding-top:15px;
	                        color:#lelele;
	                    }
	                    p{
	                        color:#666;
	                        font-size:12px;
	                        line-height: 22px;
	                        span{padding-right: 5px; float: right;}
	                    }
                    }
                    .circle{
                        width:20px;
                        height:20px;
                        line-height:20px;
                        text-align:center;
                        display:inline-block;
                        border:1px solid #aaa;
                        border-radius:50%;
                        margin-top:20px;
                        float:left;
                    }
                    .active{
                        border:1px solid #36d2b6;
                        background:url(../../../../assets/images/mark.png) no-repeat 4px 4px;
                    }
                }
                li:last-child{
                    border-bottom:none;
                }
            }*/
			.integral {
				background: #fff;
				padding: 0 15px;
				height: 45px;
				line-height: 45px;
				margin-top: 15px;
				.left {
					float: right;
				}
				.right {
					float: left;
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