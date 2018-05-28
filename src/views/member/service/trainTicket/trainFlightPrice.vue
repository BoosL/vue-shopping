<template>
	<div id="trainFlightPrice" :class="'trainFlightPrice'+$store.state.service.lang">
		<c-title :hide="false" :text="jsonInfo.fromStation+' - '+jsonInfo.toStation"></c-title>
		<div style="height:40px"></div>

		<div class="flight">
			<div class="top">
				<span>{{jsonInfo.date}}</span>
				<span>{{week}}</span>
			</div>
			<div class="flightNum">
				<div>
					<span class="fromTime">{{trainTicketInfo.startTime}}</span>
					<span class="addOne">{{trainTicketInfo.trainNumber}}</span>
					<span class="toTime">{{trainTicketInfo.endTime}}</span>
				</div>
				<p>
					<span class="fromAddr">{{trainTicketInfo.currentStartStationName}}</span>
					<span class="during">{{trainTicketInfo.runTime|trainRunTime}}</span>
					<span class="toAddr">{{trainTicketInfo.currentEndStationName}}</span>
				</p>
			</div>
		</div>

		<ul class="flyList">
			<li v-for="(trainSeat,index) in trainSeats">
				<div class="left">
					<h2>¥{{trainSeat.seatPrice}}</h2>
					<p>
						<span>{{trainSeat.seatName}}</span>
						<span>|</span>
						<span>仅剩{{trainSeat.remainderTrainTickets}}张</span>
					</p>
				</div>
				<div class="right"  @click="toOrder(index)">
					
						<span cl>{{language.booked}}</span>
					
				</div>
			</li>
		</ul>

	</div>
</template>

<script>
import trainFlightPrice_controller from './trainFlightPrice_controller';
export default trainFlightPrice_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
* {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}


.trainFlightPricech {
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
					font-size: 11px;
					vertical-align: middle;
					color: #1BBA9E;
				}
			}
			p {
				padding: 0 15px;
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
	.flyList {
		li {
			padding: 10px 20px;
			margin: 10px 0;
			background: #fff;
			overflow: hidden;
			.left {
				width: 70%;
				float: left;
				text-align: left;
				h2 {
					font-weight: normal;
					color: #FF951B;
					font-size: 20px;
				}
				p {
					padding-top: 5px;
					span {
						padding-right: 5px;
						color: #666;
						font-size: 12px;
					}
				}
			}
			.right {
				width: 30%;
				float: left;
				text-align: right;
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

.trainFlightPricewei {
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
					color: #FF951B;
					font-size: 22px;
				}
				p {
					padding-top: 5px;
					span {
						padding-right: 5px;
						color: #666;
						font-size: 12px;
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





