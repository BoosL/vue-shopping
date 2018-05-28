<style lang="scss" rel="stylesheet/scss" scoped>
p,
ul,
li {
	margin: 0;
	padding: 0;
}

li {
	list-style: none;
}

#share {

	.m_header {
		width: 100%;
		height: 45px;
		padding-right: 15px;
		box-sizing: border-box;
		background: #fff;
		line-height: 45px;
		font-size: 18px;
		span {
			display: inline-block;
			width: 16px;
			height: 24px;
			float: left;
			margin-left: 10px;
			font-size: 30px;
		}
		i {
			font-size: 16px;
			float: right;
			font-style: normal;
		}
	}
	.top {
		text-align: left;
		height: 95px;
		padding: 15px;
		background: #fff;
		position: relative;
		text-align: center;
		margin: 15px 0;
		i {

			font-style: normal;
			font-size: 16px;
			display: block;
		}
		.content {

			width: 120px;
			margin: 0 auto;
			font-size: 16px;
			text-align: center;
			span {
				font-size: 28px;
				color: green;
				display: inline-block;
				padding-top: 12px;
				margin-bottom: 5px;
			}
			b {
				line-height: 24px;
				font-weight: normal;
				color: #fff;
				background: #f15353;
				width: 60px;
				height: 24px;
				display: inline-block;
			}
		}
	}
	.middle,
	.bott {
		text-align: left;
		padding: 15px 15px;
		line-height: 32px;
		color: #343434;
		background: #fff;
		margin-bottom: 8px;
	}
	.middle {
		display: flex;
		flex-wrap: wrap;
		.lrest {
			flex: 50%
		}
		.resot {
			flex: 50%;
			text-align: right;
		}
	}
}
</style>
<template>
	<div id="share">
		<div>
	
			<c-title :hide="false" text='收入详情'></c-title>
			<div style="height:40px"></div>
			<div class="top">
				<i>{{module1.title}}</i>
				<div class="content">
					<span>{{module1.money}}</span>元
					<br />
					<b>{{module1.status}}</b>
				</div>
			</div>
			<div class="middle">
				<template v-for=" item in module2">
					<div class="lrest">{{item.name}}</div>
					<div class="resot">{{item.value}}</div>
				</template>
			</div>
			<div class="middle">
				<template v-for=" item in module3">
					<div class="lrest">{{item.name}}</div>
					<div class="resot">{{item.value}}</div>
				</template>
			</div>
		</div>
	</div>
</template>


<script>
import shareDetail_controller from './shareDetail_controller';
export default shareDetail_controller;
</script>