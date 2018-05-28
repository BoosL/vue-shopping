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
			flex: 70%
		}
		.resot {
			flex: 30%;
			text-align: right;
		}
	}
}
</style>
<template>
	<div id="share">
		<div>
	
			<c-title :hide="false" :text='mailTeamReturnTitle'></c-title>
			<div style="height:40px"></div>
			<div class="top">
				<i>{{mailTeamAmount}}</i>
				<div class="content">
					<span>{{return_amount}}</span>元
					<br />
				</div>
			</div>
			<div class="middle">
				<template>
					<div class="lrest">商城总销售额</div>
					<div class="resot">{{mall_amount}}</div>

					<div class="lrest">{{mailTeamReturnRate}}</div>
					<div class="resot">{{rate}}%</div>
					<template v-for="elem in power_data">
						<div class="lrest">{{elem.level}}</div>
						<div class="resot">{{elem.level_num}}</div>
						<div class="lrest">{{elem.team}}</div>
						<div class="resot">{{elem.team_num}}</div>
					</template>


					<!--<div style="width:100%">-->
					<!--<ul class='rationList'>-->
						<!--<li v-for="elem in power_data" class="recordList">-->
							<!--<div>-->
							<!--<div class="lrest">{{elem.level}}</div>-->
							<!--<div class="resot">{{elem.level_num}}</div>-->
							<!--</div>-->
							<!--<div>-->
								<!--<div class="lrest">{{elem.team}}</div>-->
								<!--<div class="resot">{{elem.team_num}}</div>-->
							<!--</div>-->
						<!--</li>-->
					<!--</ul>-->
					<!--</div>-->
					<div class="lrest">总权益</div>
					<div class="resot">{{power_total}}</div>

				</template>
			</div>
			<div class="middle">
				<template>
					<div class="lrest">{{mailTeamReturnName}}ID</div>
					<div class="resot">{{id}}</div>

					<div class="lrest" style="flex: 30%">{{mailTeamReturnName}}时间</div>
					<div class="resot" style="flex: 70%;">{{created_at}}</div>
				</template>
			</div>
		</div>
	</div>
</template>


<script>
import single_return_list_info_controller from './teamlevel_return_list_info_controller';
export default single_return_list_info_controller;
</script>