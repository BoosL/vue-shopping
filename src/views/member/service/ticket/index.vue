<template>
	<div id="ticket" :class="'ticket'+$store.state.service.lang">
		<c-title :hide="false" :text='language.title'></c-title>
		<div style="height: 40px;"></div>
		<p class="title">{{language.oneWay}}</p>
		<div class="line"></div>

		<div id="sosoall" :class="{onbts:loding}">
			<div class="tip">
				<span class="left">{{language.start}}</span>
				<span class="right">{{language.end}}</span>
			</div>
			<div class="search-city">
				<div class="city-item-input" @click="selectCity('from')" id="go">{{language.readonly}}</div>
				<i class="icon iconfont icon-fanzhuan" @click="changes"></i>
				<div class="city-item-input" @click="selectCity('to')" id="to">{{language.readonlyto}}</div>
			</div>
			<div class="search-date">
					<el-date-picker v-model="dataModel" @change='dataOnChange' type="date" :placeholder="language.startDate" :picker-options="pickerOptions0">
				</el-date-picker>
			</div>
			<span class="buttons" @click="submit">{{language.startSearch}}</span>
		</div>

		<mt-popup v-model="popupSpecs" class="mint-popup-3" position="right" closeOnClickModal='true' modal='false' style="z-index:2004;">

			<div class="city-info">
				<mt-header fixed title="城市">
					<mt-button icon="back" @click="popCityClose" slot="left"></mt-button>
				</mt-header>
				<div>
					<div class="input">
						<input type="text" placeholder="城市首字母" v-model="sokey" />
					</div>
					<div style="height: 40px;"></div>

					<mt-tab-container v-model="selected">

						<mt-tab-container-item id="1">
							<!-- right fixed -->
							<ul class="innerRig">
								<li class="letter" v-for="item in allCitys" @click="goSoso(item.key)">{{item.key}}</li>

							</ul>
							<!-- left inner -->
							<div class="content">
								<div class="list" v-for="item in searchData">
									<p class="title">{{item.key}}</p>
									<ul>
										<li v-for="city in item.data" @click="chooseCity($event,city)">{{city.name}}</li>
									</ul>
								</div>
							</div>
						</mt-tab-container-item>

					</mt-tab-container>
				</div>
			</div>

		</mt-popup>
	</div>
</template>

<script>
import index_controller from './index_controller';
export default index_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.ticketch {
	height: 100vh;
	background: #FFF;
	.city-info {
		overflow-y: scroll;
		width: 100vw;
		height: 100vh;
		background: #FFF;
	}
	.input {
		margin-top: 40px;
		padding: 10px 5%;
		position: fixed;
		z-index: 999;
		background: #eee;
		width: 90%;
		input {
			width: 90%;
			height: 30px;
			border-radius: 5px;
			padding-left: 30px;
			border: 0;
			outline: 0;
			background: url(../../../../assets/images/search.png) no-repeat 8px 10px #fff;
		}
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
	.innerRig {
		position: fixed;
		width: 40px;
		z-index: 99;
		right: 0;
		top: 92px;
		bottom: 0;
		padding-top: 5px;
		padding-bottom: 5px;
		margin-top: 0px;
		margin-bottom: 0px;
		display: flex;
		flex-direction: column;
		color: #1bba9e;
		background: #FFF;
		font-size: 12px;
		li {
			flex: 1;
		}
	}
	.content {
		margin-top: 50px;
		padding-top: 10px;
		text-align: left;
		.location {
			padding: 0 15px;
			.title {
				color: #666;
				font-size: 12px;
				line-height: 30px;
			}
			div {
				width: 30%;
				height: 30px;
				background: #fff;
				font-size: 16px;
				color: #333;
				line-height: 30px;
				text-align: center;
				border-radius: 4px;
			}
		}
		.list {
			.title {
				padding-top: 3px;
				padding-bottom: 3px;
				background: #eee;
				color: #1bba9e;
				font-size: 12px;
				line-height: 20px;
				height: 20px;
				padding-left: 15px;
			}
			ul {
				padding-left: 16px;
				background: #fff;
				li {
					width: 100%;
					height: 30px;
					line-height: 30px;
					border-bottom: 1px solid #ccc;
					color: #333;
				}
				li:last-child {
					border: 0
				}
			}
		}
	}
	.title {
		font-size: 18px;
		color: #1bba9e;
		height: 35px;
		line-height: 35px;
	}
	.line {
		width: 100%;
		height: 10px;
		background: #eee;
		padding: 0;
	}
	#sosoall.onbts {
		.buttons {
			background: #ccc;
		}
	}
	#sosoall {
		width: 100%;
		box-sizing: border-box;
		padding: 15px;
		.buttons {
			border-radius: .2rem;
			font-weight: 400;
			vertical-align: middle;
			white-space: nowrap;
			background-color: #ff9914;
			border-color: #ff9914;
			display: block;
			font-size: 1.1rem;
			color: #fff;
			padding: 8px;
			margin-top: 25px;
		}
		.search-date {
			margin: 15px 0;
			display: -ms-flexbox;
			display: flex;
			align-items: center;
			i {
				font-size: 2rem;
				color: #CCC;
				flex: 1;
			}
		}
	}
	#swipes {
		height: 110px;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.tip {
		width: 100;
		height: 30px;
		line-height: 30px;
		color: #1bba9e;
		.left {
			float: left;
		}
		.right {
			float: right;
		}
	}
	.search-city {
		display: flex;
		align-items: center;
		width: 100%;
		padding-bottom: 15px;
		i {
			font-size: 2rem;
			color: #CCC;
			flex: 1;
		}
		.city-item-input {
			flex: 3;
			border-bottom: 1px solid #CCCCCC;
			overflow: hidden;
			line-height: 2rem;
			font-size: 1.2rem;
			text-align: left;
		}
		.city-item-input:nth-child(3) {
			text-align: right;
		}
	}
}


.ticketwei {
	height: 100vh;
	background: #FFF;
	.title {
		font-size: 22px;
		color: #1bba9e;
		height: 45px;
		line-height: 45px;
	}
	.line {
		width: 100%;
		height: 10px;
		background: #eee;
		padding: 0;
	}
	#sosoall {
		width: 100%;
		box-sizing: border-box;
		padding: 15px;
		.buttons {
			border-radius: .2rem;
			font-weight: 400;
			vertical-align: middle;
			white-space: nowrap;
			background-color: #ff9914;
			border-color: #ff9914;
			display: block;
			font-size: 1.1rem;
			color: #fff;
			padding: 8px;
			margin-top: 25px;
		}
		.search-date {
			margin: 15px 0;
			display: -ms-flexbox;
			display: flex;
			flex-direction: row-reverse;
			align-items: center;
			i {
				font-size: 2rem;
				color: #CCC;
				flex: 1;
			}
		}
	}
	#swipes {
		height: 110px;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.tip {
		width: 100;
		height: 30px;
		line-height: 30px;
		color: #f15353;
		.left {
			float: right;
		}
		.right {
			float: left;
		}
	}
	.search-city {
		display: -ms-flexbox;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		width: 100%;
		padding: 15px 0;
		i {
			font-size: 2rem;
			color: #CCC;
			flex: 1;
		}
		.city-item-input {
			flex: 3;
			border-bottom: 1px solid #CCCCCC;
			overflow: hidden;
			line-height: 2rem;
			font-size: 1.2rem;
			text-align: right;
		}
		.city-item-input:nth-child(3) {
			text-align: left;
		}
	}
}
</style>