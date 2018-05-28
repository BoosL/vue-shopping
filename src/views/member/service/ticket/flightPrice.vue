<template>
	<div id="flightPrice" :class="'flightPrice'+$store.state.service.lang">
		<c-title :hide="false" :text="jsonInfo.fromStation+' - '+jsonInfo.toStation"></c-title>
		<div style="height:40px"></div>

		<div class="flight">
			<div class="top">
				<span>{{jsonInfo.airDate}}</span>
				<span>{{week}}</span>
			</div>
			<div class="flightNum">
				<div>
					<span class="fromTime">{{flightInfo.depTime}}</span>
					<!--<span class="addOne">+1天</span>-->
					<span class="toTime">{{flightInfo.arriTime}}</span>
				</div>
				<p>
					<span class="fromAddr">{{flightInfo.orgCityName}}</span>
					<!--<span class="stopCity" @click="closeCity">经停城市</span>-->
					<span class="toAddr">{{flightInfo.dstCityName}}</span>
				</p>
			</div>
			<div class="addr">
				<span>{{flightInfo.flightCompanyName}}</span>
				<span> {{flightInfo.flightNo}}</span>
				<!--<span>准点率：</span> <span>8%</span> -->
				<span></span>
				<span>机型:{{flightInfo.planeType}}</span>
			</div>
		</div>

		<ul class="flyList">
			<li v-for="(fly,index) in flyList">
				<div class="left">
					<h2>
						<span style="color: #FF951B;">¥</span>
						<b>{{fly.parPrice}}</b>
						<span>{{fly.discount}}折</span>
					</h2>
					<p>{{fly.seatMsg}}
						<!--&nbsp;&nbsp;&nbsp;|<span @click="closeRetreat">退改签</span>-->
					</p>
				</div>
				<div class="right"  @click="toOrder(index)">
						<span>{{language.booked}}</span>
				</div>
			</li>
		</ul>

		<!--经停城市-->
		<div class="modal" v-show="city" @click="closeCity">
			<div class="modal-dialog" @click.stop>
				<h1 class="title">
					<i class="iconfont icon-tishi"></i> {{language.stopInformation}}</h1>
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
		<!--退改签-->
		<div class="modal" v-show="retreat" @click="closeRetreat">
			<div class="modal-dialog" @click.stop>
				<h1 class="title">
					<i class="iconfont icon-tishi"></i>{{language.regular}}</h1>
				<ul class="regulations">
					<li>转签规定： <br />不得转签</li>
					<li>改签规定： <br />起飞前4小时意外，收取公布运价的30% <br />起飞前4小时以内，收取公布运价的40% </li>
					<li>退票规定： <br />起飞前4小时意外，收取公布运价的30% <br />起飞前4小时以内，收取公布运价的40% </li>
				</ul>
				<span class="button" @click="closeRetreat">{{language.know}}</span>
			</div>
		</div>

	</div>
</template>

<script>
import flightPrice_controller from './flightPrice_controller';
export default flightPrice_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
* {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}


.flightPricech {
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
			margin: 50% auto;
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
				font-size: 13px;
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
	.flyList {
		li {
			padding: 10px 10px;
			margin: 5px 5px 5px 5px;
			background: #fff;
			overflow: hidden;
			.left {
				width: 70%;
				float: left;
				text-align: left;
				h2 {
					font-weight: normal;
					b {
						color: #FF951B;
						font-size: 20px;
						padding-right: 17px;
					}
					span {
						font-size: 14px;
					}
				}
				p {
					color: #666;
					font-size: 12px;
					padding-top: 5px;
					span {
						color: #1BBA9E;
						padding-left: 10px;
					}
				}
			}
			.right {
				width: 30%;
				float: left;
				text-align: right;
				line-height: 40px;
				span {
					padding: 8px 13px;
					background: #FF951B;
					color: #fff;
					border-radius: 3px;
				}
			}
		}
	}
}

.flightPricewei {
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
					float: right;
					font-size: 25px;
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
			padding-left: 15px;
			border-top-left-radius: 6px;
			border-top-right-radius: 6px;
			padding-right: 10px;
			span {
				float: right;
				padding: 0 3px;
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
			border-bottom-left-radius: 6px;
			border-bottom-right-radius: 6px;
		}
	}
	.flyList {
		li {
			padding: 10px 20px;
			margin: 10px 0;
			background: #fff;
			overflow: hidden;
			.left {
				width: 70%;
				float: right;
				text-align: right;
				h2 {
					font-weight: normal;
					b {
						color: #FF951B;
						font-size: 22px;
						;
						float: right;
					}
					span {
						font-size: 16px;
						padding-right: 17px
					}
				}
				p {
					color: #666;
					font-size: 12px;
					padding-top: 5px;
					span {
						color: #1BBA9E;
						padding-left: 10px;
					}
				}
			}
			.right {
				width: 30%;
				float: right;
				text-align: left;
				line-height: 47px;
				span {
					padding: 8px 13px;
					background: #FF951B;
					color: #fff;
					border-radius: 3px;
				}
			}
		}
	}
}
</style>





