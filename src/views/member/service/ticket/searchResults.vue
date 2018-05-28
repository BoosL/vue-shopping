<template>
	<div id="searchResults" :class="'searchResults'+$store.state.service.lang">
		<c-title :hide="false" :text="jsonInfo.fromStation+'-'+jsonInfo.toStation"></c-title>
		<div style="height:40px"></div>
		<div class="time">
			<div class="left" @click="getYestoday">
				<i class="iconfont icon-left11" v-if="$store.state.service.lang=='ch'"></i>
				<i class="iconfont icon-right1" v-else="$store.state.service.lang=='wei'"></i>
				<span>
					{{language.yestoday}}
					<!--<br /><b>¥730</b>-->
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
					<!--<br /><b>¥730</b>-->
				</span>
			</div>
		</div>

		<ul class="flight">

			<li v-for="(item,index) in firNumber" @click="toOrder(index)">
					<div class="top">
						<div class="flightNum">
							<div>
								<span class="fromTime">{{item.depTime}}</span>
								<span class="toTime">{{item.arriTime}}</span>
							</div>
							<p>
								<span class="fromAddr">{{item.orgCityName}}</span>
								<span class="toAddr">{{item.dstCityName}}</span>
							</p>
						</div>
						<div class="price">
							<p>
								<span>¥</span>
								<span class="sortNum">{{item.parPrice}}</span>
							</p>
							<span></span>
						</div>
					</div>
					<div class="bottom">
						<span class="circle left"></span>
						<span class="circle right"></span>
						<div class="addr">
							<span>{{item.flightCompanyName}}</span>
							<span>{{item.flightNo}}</span>
							<!-- <span>|</span>-->
							<!--<span>波音701-9</span> <span>(大)</span>-->
						</div>
					</div>
			</li>

			<!--			
				<li>
					<div class="top">
						<div class="flightNum">
							<div> <span class="fromTime">22:10</span> <span class="toTime">01:10</span> </div>
							<p> <span class="fromAddr">白云机场T3</span> <span class="toAddr">首都机场T1</span> </p>
						</div>
						<div class="price">
							<p><span>¥</span><span class="sortNum">799</span></p>
							<span>总价</span>
						</div>
					</div>
					<div class="bottom">
						<span class="circle left"></span>
						<span class="circle right"></span>
						<div class="addr">
							<span>海南航空</span> <span>HU2014</span>  <span>|</span>
							<span>波音701-9</span> <span>(大)</span>
						</div>
					</div>
				</li>-->

		</ul>

		<ul class="m-footer" v-if="false">
			<li @click="chooseColor($event)" :class="{active:isColor}">
				<i class="iconfont icon-shijian"></i>
				<span>{{language.time}}</span>
			</li>
			<!--<li @click="chooseColor($event)"><i class="iconfont icon-shaixuan"></i> <span>{{language.fliter}}</span></li>
				<li @click="chooseColor($event)"><i class="iconfont icon-jiage"></i> <span>{{language.price}}</span></li>-->
		</ul>

		<mt-popup v-model="popupVisible" position="bottom">
			<div class="pop">
				<p>
					<span class="left" @click="popDisplay">{{language.cancel}}</span>
					<span @click="reseted">{{language.reseted}}</span>
					<span class="right">{{language.confirm}}</span>
				</p>
				<div class="content">
					<!--起飞时间-->
					<p>{{language.flyTime}}</p>
					<ul id="flyTime">
						<li v-for="time in times" @click="filterStyle($event)">{{time.flyTime}}</li>
					</ul>
					<!--航空公司-->
					<p>{{language.airline}}</p>
					<ul id="airline">
						<li v-for="airline in airlines" @click="filterStyle2($event)"> {{airline.line}}</li>
					</ul>
					<!--起飞机场-->
					<p>{{language.startPort}}</p>
					<ul id="startAirport">
						<li v-for="startAirport in startAirports" @click="filterStyle3($event)">{{startAirport.port}}</li>
					</ul>
					<!--到达机场-->
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
import searchResults_controller from './searchResults_controller';
export default searchResults_controller;
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

.searchResultsch {
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
				line-height: 35px;
				b {
					font-weight: normal;
					font-size: 16px;
				}
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
				line-height: 35px;
				b {
					font-weight: normal;
					font-size: 16px;
				}
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
				height: 90px;
				background: #fff;
				border-bottom: 1px dotted #ccc;
				-webkit-border-radius: 6px;
				-moz-border-radius: 6px;
				border-radius: 6px;
				.flightNum {
					width: 75%;
					float: left;

					div {
						height: 50px;
						padding: 15px 15px 0;
						line-height: 35px;
						overflow: hidden;
						font-size: 18px;
						background: url(../../../../assets/images/airline.png) no-repeat 50% 28px;
						.fromTime {
							float: left;
						}
						.toTime {
							float: right;
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
					}
				}
				.price {
					width: 25%;
					float: left;
					margin-top: 15px;
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
						padding: 0 2px
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

.searchResultswei {
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
				position: absolute;
				z-index: 66;
				right: 15px;
			}
			span {
				float: left;
				text-align: left;
				b {
					font-weight: normal;
					font-size: 16px;
				}
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
				position: absolute;
				z-index: 66;
				left: 15px;
			}
			span {
				float: right;
				text-align: right;
				b {
					font-weight: normal;
					font-size: 16px;
				}
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
				.flightNum {
					width: 75%;
					float: right;
					div {
						height: 50px;
						padding: 15px 15px 0;
						line-height: 35px;
						overflow: hidden;
						font-size: 18px;
						background: url(../../../../assets/images/airlineLeft.png) no-repeat 50% 28px;
						.fromTime {
							float: right;
						}
						.toTime {
							float: left;
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
					}
				}
				.price {
					width: 25%;
					float: right;
					margin-top: 15px;
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
						padding: 0 2px
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