<template>
	<div id="orderDetailsPaied" :class="'orderDetailsPaied'+$store.state.service.lang">
		<c-title :hide="false" :text='language.title'></c-title>
		<div style="height:40px"></div>

		<template>
			<div class="list" @click="goToPetroleum()">
				<div class="left">
					<img src="../../../../assets/images/petrocleum.png" alt="" />
				</div>

				<span class="iconfont icon-right" v-if="$store.state.service.lang=='ch'"></span>
				<span class="iconfont icon-left" v-else="$store.state.service.lang=='wei'"></span>

				<div class="content">
					{{language.petroleum}}<br />
					<span>{{language.petroleumDetail}}</span>
				</div>
			</div>
		</template>

		<template>
			<div class="list" @click="goToSinopec()">
				<div class="left">
					<img src="../../../../assets/images/petrochemical.png" alt="" />
				</div>

				<span class="iconfont icon-right" v-if="$store.state.service.lang=='ch'"></span>
				<span class="iconfont icon-left" v-else="$store.state.service.lang=='wei'"></span>

				<div class="content">
					{{language.sinopec}}<br />
					<span>{{language.sinopecDetail}}</span>
				</div>
			</div>
</template>
	</div>
	
</template>

<script>

import cardServer_controller from './cardServer_controller';
export default cardServer_controller;

</script>

<style  lang="scss" rel="stylesheet/scss" scoped>
* {
	box-sizing: border-box;
}

.orderDetailsPaiedch {
	.list {
		padding: 15px;
		margin: 15px 0;
		height: 80px;
		background: #fff;
		text-align: left;
		.iconfont {
			font-size: 40px;
			float: right;
		}
		.left {
			width: 70px;
			height: 50px;
			float: left;
			img {
				width: 70px;
				vertical-align: middle;
			}
		}
		.content {
			line-height: 25px;
			height: 50px;
			font-size: 14px;
			color: #212121;
			margin-left: 20px;
			float: left;
			font-weight: 500;
			span {
				font-size: 12px;
				color: #9e9e9e;
			}
		}
		span {
			color: #333;
		}
	}
}

.orderDetailsPaiedwei {
	.list {
		padding: 15px;
		margin: 15px 0;
		height: 80px;
		background: #fff;
		text-align: left;
		.iconfont {
			font-size: 40px;
			float: left;
		}
		.left {
			width: 70px;
			height: 50px;
			float: right;
			img {
				width: 70px;
				vertical-align: middle;
			}
		}
		.content {
			line-height: 25px;
			height: 50px;
			font-size: 14px;
			color: #212121;
			margin-left: 20px;
			float: left;
			font-weight: 500;
			text-align: right;
			span {
				font-size: 12px;
				color: #9e9e9e;
			}
		}
		span {
			color: #333;
		}
	}
}
</style>
