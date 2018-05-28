<template>
	<div id="trainSearchResults" :class="'trainSearchResults'+$store.state.service.lang">
		<c-title :hide="false" :text="jsonInfo.fromStation+' - '+jsonInfo.toStation"></c-title>
		<div style="height:40px"></div>
		<div class="time">
			<div class="left" @click="getYestoday">
				<i class="iconfont icon-left11" v-if="$store.state.service.lang=='ch'"></i>
				<i class="iconfont icon-right1" v-else="$store.state.service.lang=='wei'"></i>
				<span>
					{{language.yestoday}}
				</span>
			</div>
			<div class="center">
				<i class="iconfont icon-rili"></i>
				<span id="lang0">{{time}}</span>
				<span id="week">{{week}}</span>
			</div>
			<div class="right" @click="getNextday">
				<i class="iconfont icon-right1" v-if="$store.state.service.lang=='ch'"></i>
				<i class="iconfont icon-left11" v-else="$store.state.service.lang=='wei'"></i>
				<span>
					{{language.nextDay}}
				</span>
			</div>
		</div>

		<ul class="flight">

			<li v-for="(item,index) in trainNumber" @click="toOrder(index)">
					<div class="top">
						<h4 v-if="false">
							<span>车次：</span>
							<span>{{item.trainNumber}}</span>
						</h4>
						<div class="flightNum">
							<div>
								<span class="fromTime">{{item.startTime}}</span>
								<span class="addone">{{item.trainNumber}}</span>
								<span class="toTime">{{item.endTime}}</span>
							</div>
							<p>
								<span class="fromAddr">{{item.currentStartStationName}}</span>
								<span class="during">{{item.runTime|trainRunTime}}</span>
								<span class="toAddr">{{item.currentEndStationName}}</span>
							</p>
						</div>
						<div class="price" v-if="item.min_price">
							<p>
								<span>¥</span>
								<span class="sortNum">{{item.min_price}}</span>
							</p>
							<span>起</span>
						</div>
					</div>
					<div class="bottom">
						<span class="circle left"></span>
						<span class="circle right"></span>
						<div class="addr">
							<template v-for="seat in item.trainSeats.trainSeat">
								<span>{{seat.seatName}}</span>
								<span>({{seat.remainderTrainTickets}})</span>
							</template>

						</div>
					</div>
			</li>

		</ul>

		<ul class="m-footer" v-if="false">
			<li @click="chooseColor($event)" class="active">
				<i class="iconfont icon-shijian"></i>
				<span>{{language.time}}</span>
			</li>
			<li @click="chooseColor($event)" v-if="false">
				<i class="iconfont icon-shaixuan"></i>
				<span>{{language.fliter}}</span>
			</li>
			<li @click="chooseColor($event)">
				<i class="iconfont icon-shijian"></i>
				<span>{{language.runTime}}</span>
			</li>
		</ul>

		<mt-popup v-model="popupVisible" position="bottom">
			<div class="pop">
				<p>
					<span class="left" @click="popDisplay">{{language.cancel}}</span>
					<span @click="reseted">{{language.reseted}}</span>
					<span class="right">{{language.confirm}}</span>
				</p>
				<div class="content">
					<!--车型选择-->
					<p>{{language.flyTime}}</p>
					<ul id="flyTime">
						<li v-for="time in times" @click="filterStyle($event)">{{time.flyTime}}</li>
					</ul>
					<!--出发时间-->
					<p>{{language.airline}}</p>
					<ul id="airline">
						<li v-for="airline in airlines" @click="filterStyle2($event)"> {{airline.line}}</li>
					</ul>
					<!--出发车站-->
					<p>{{language.startPort}}</p>
					<ul id="startAirport">
						<li v-for="startAirport in startAirports" @click="filterStyle3($event)">{{startAirport.port}}</li>
					</ul>
					<!--到达车站-->
					<p>{{language.endPort}}</p>
					<ul id="endAirport">
						<li v-for="endAirport in endAirports" @click="filterStyle4($event)">{{endAirport.port}}</li>
					</ul>
				</div>
			</div>
		</mt-popup>
	</div>
</template>

<script>
import trainSearchResults_controller from './trainSearchResults_controller';
export default trainSearchResults_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.active {
	color: #1BBA9E;
}

.fliterActive {
	background: #1BBA9E;
	color: #fff
}

* {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

.trainSearchResultsch {

	.time {
		padding: 10px;
		background: #fff;
		overflow: hidden;
		height: 55px;
		background: #1BBA9E;
		color: #fff;
		.left {
			width: 22%;
			float: left;
			margin-right: 3%;
			i {
				float: left;
				line-height: 35px;
				color: #55E6CD;
			}
			span {
				float: right;
				text-align: right;
				line-height: 34px;
			}
		}
		.center {
			width: 50%;
			height: 35px;
			line-height: 35px;
			-webkit-border-radius: 5px;
			-moz-border-radius: 5px;
			border-radius: 5px;
			float: left;
			background: #158D78;
		}
		.right {
			width: 22%;
			float: left;
			margin-left: 3%;
			i {
				float: right;
				line-height: 35px;
				color: #55E6CD;
			}
			span {
				float: left;
				text-align: left;
				line-height: 34px;
			}
		}
	}

	.flight {
		margin-bottom: 5px;
		a {
			color: #333
		}
		li {
			padding: 0 5px;
			margin: 5px 0;
			.top {
				height: 70px;
				background: #fff;
				border-bottom: 1px dotted #ccc;
				-webkit-border-radius: 6px;
				-moz-border-radius: 6px;
				border-radius: 6px;
				padding: 5px 10px;
				h4 {
					font-weight: normal;
					text-align: left;
					color: #49c6b0;
				}
				.flightNum {
					width: 75%;
					float: left;
					div {
						height: 35px;
						line-height: 35px;
						overflow: hidden;
						font-size: 16px;
						background: url(../../../../assets/images/airline.png) no-repeat 50% 13px;
						.fromTime {
							float: left;
						}
						.toTime {
							float: right;
						}
						.addone {
							color: #49c6b0;
							font-size: 10px;
							position: absolute;
							top: -10px;
							left: 50%;
							-webkit-transform: translateX(-50%);
							-moz-transform: translateX(-50%);
							-ms-transform: translateX(-50%);
							-o-transform: translateX(-50%);
							transform: translateX(-50%);
						}
						position: relative;
					}
					p {
						padding: 1px 5px;
						font-size: 13px;
						.fromAddr {
							float: left;
						}
						.toAddr {
							float: right;
						}
						.during {
							position: absolute;
							top: -10px;
							left: 50%;
							-webkit-transform: translateX(-50%);
							-moz-transform: translateX(-50%);
							-ms-transform: translateX(-50%);
							-o-transform: translateX(-50%);
							transform: translateX(-50%);
						}
						position: relative;
					}
				}
				.price {
					width: 25%;
					float: left;
					text-align: right;
					p {
						line-height: 35px;
						font-size: 16px;
						color: #FF951B;
					}
				}
			}
			.bottom {
				background: #fff;
				height: 30px;
				line-height: 30px;
				-webkit-border-radius: 6px;
				-moz-border-radius: 6px;
				border-radius: 6px;
				position: relative;
				.circle {
					width: 20px;
					height: 20px;
					display: inline-block;
					-webkit-border-radius: 50%;
					-moz-border-radius: 50%;
					border-radius: 50%;
					background: #eee;
					position: absolute;
				}
				.left {
					top: -10px;
					left: -10px
				}
				.right {
					right: -10px;
					top: -10px
				}
				.addr {
					span {
						font-size: 12px;
					}
					span:nth-child(2n) {
						padding-right: 7px;
					}
				}
			}
		}
	}

	.m-footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 40px;
		line-height: 40px;
		background: #fff;
		li {
			flex: 1;
			width: 50%;
			float: left;
		}
	}

	.pop {
		p {
			text-align: center;
			height: 40px;
			line-height: 40px;
			padding: 0 15px;
			background: #F3F5F7;
			.left {
				float: left
			}
			.right {
				float: right;
				color: #1BBA9E
			}
		}
		.content {
			margin-bottom: 10px;
			p {
				height: 25px;
				line-height: 25px;
				color: #999999;
				font-size: 12px;
				text-align: left;
				background: #fff;
			}
			ul {
				overflow: hidden;
				padding: 0 15px;
				margin-bottom: 10px;
				li {
					height: 26px;
					line-height: 26px;
					border: 1px solid #ccc;
					-webkit-border-radius: 6px;
					-moz-border-radius: 6px;
					border-radius: 6px;
					padding: 0 18px;
					display: inline-block;
					float: left;
					margin-right: 10px;
					margin-top: 10px;
				}
			}
		}
	}
}

.trainSearchResultswei {
	.time {
		padding: 15px;
		background: #fff;
		overflow: hidden;
		height: 65px;
		background: #1BBA9E;
		color: #fff;
		.left {
			width: 22%;
			float: right;
			margin-left: 3%;
			i {
				float: right;
				line-height: 35px;
				color: #55E6CD;
			}
			span {
				float: left;
				text-align: left;
				line-height: 34px;
			}
		}
		.center {
			width: 50%;
			height: 35px;
			line-height: 35px;
			-webkit-border-radius: 5px;
			-moz-border-radius: 5px;
			border-radius: 5px;
			float: right;
			background: #158D78;
		}
		.right {
			width: 22%;
			float: right;
			margin-right: 3%;
			i {
				float: left;
				line-height: 35px;
				color: #55E6CD;
			}
			span {
				float: right;
				text-align: right;
				line-height: 34px;
			}
		}
	}

	.flight {
		margin-bottom: 70px;
		a {
			color: #333
		}
		li {
			padding: 0 15px;
			margin: 10px 0;
			.top {
				height: 90px;
				background: #fff;
				border-bottom: 1px dotted #ccc;
				-webkit-border-radius: 6px;
				-moz-border-radius: 6px;
				border-radius: 6px;
				padding: 5px 15px;
				h4 {
					font-weight: normal;
					text-align: right;
					color: #49c6b0;
				}
				.flightNum {
					width: 75%;
					float: right;
					div {
						height: 35px;
						line-height: 35px;
						overflow: hidden;
						font-size: 18px;
						background: url(../../../../assets/images/airline.png) no-repeat 50% 13px;
						.fromTime {
							float: left;
						}
						.toTime {
							float: right;
						}
						.addone {
							font-size: 10px;
							position: absolute;
							top: -10px;
							left: 50%;
							-webkit-transform: translateX(-50%);
							-moz-transform: translateX(-50%);
							-ms-transform: translateX(-50%);
							-o-transform: translateX(-50%);
							transform: translateX(-50%);
						}
						position: relative;
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
						.during {
							position: absolute;
							top: -10px;
							left: 50%;
							-webkit-transform: translateX(-50%);
							-moz-transform: translateX(-50%);
							-ms-transform: translateX(-50%);
							-o-transform: translateX(-50%);
							transform: translateX(-50%);
						}
						position: relative;
					}
				}
				.price {
					width: 25%;
					float: right;
					text-align: left;
					p {
						line-height: 35px;
						font-size: 16px;
						color: #FF951B;
					}
				}
			}
			.bottom {
				background: #fff;
				height: 30px;
				line-height: 30px;
				-webkit-border-radius: 6px;
				-moz-border-radius: 6px;
				border-radius: 6px;
				position: relative;
				.circle {
					width: 20px;
					height: 20px;
					display: inline-block;
					-webkit-border-radius: 50%;
					-moz-border-radius: 50%;
					border-radius: 50%;
					background: #eee;
					position: absolute;
				}
				.left {
					top: -10px;
					left: -10px
				}
				.right {
					right: -10px;
					top: -10px
				}
				.addr {
					span {
						font-size: 12px;
					}
					span:nth-child(2n) {
						padding-left: 7px;
					}
				}
			}
		}
	}

	.m-footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 40px;
		line-height: 40px;
		background: #fff;
		li {
			flex: 1;
			width: 33.3%;
			float: left;
		}
	}

	.pop {
		p {
			text-align: center;
			height: 40px;
			line-height: 40px;
			padding: 0 15px;
			background: #F3F5F7;
			.left {
				float: right
			}
			.right {
				float: left;
				color: #1BBA9E
			}
		}
		.content {
			margin-bottom: 10px;
			p {
				height: 25px;
				line-height: 25px;
				color: #999999;
				font-size: 12px;
				text-align: right;
				background: #fff;
			}
			ul {
				overflow: hidden;
				padding: 0 15px;
				margin-bottom: 10px;
				li {
					height: 26px;
					line-height: 26px;
					border: 1px solid #ccc;
					-webkit-border-radius: 6px;
					-moz-border-radius: 6px;
					border-radius: 6px;
					padding: 0 18px;
					display: inline-block;
					float: right;
					margin-right: 10px;
					margin-top: 10px;
				}
			}
		}
	}
}
</style>