<template >
	<div id="logistics">
		<c-title :hide="false"
		         text='物流详情'></c-title>
		<div style="height: 42px;"></div>
	
		<div class="my_wrapper">
			<span><img :src="thumb"/></span>
			<div class="my-value">
				<p><b> 物流状态</b>
					<font>{{status_name}}</font>
				</p>
				<p>承运公司：{{company_name}}</p>
				<p>运单编号：{{express_sn}}</p>
				<p>官方电话：{{tel}}</p>
			</div>
		</div>
		<ul id="wlinfo">
			<!--time: "2017-03-31 15:59:56", ftime: "2017-03-31 15:59:56", context: "[广东广州白云区公司]快件已被 已签收 签收", location: "广东广州白云区公司"-->
			<li v-for="item in express_info">
				{{item.context}}
				<br /><span>{{item.ftime}}</span></li>
			
		</ul>
	
		<div style="height: 10px;"></div>
	
	</div>
</template>
<script>
import order_list_logisticscontroller from './order_list_logisticscontroller';
export default order_list_logisticscontroller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#logistics {
	.my_wrapper {
		background: #FFF;
		overflow: hidden;
		display: flex;
		padding: 10px;
		align-items: center;
		span {
			flex: 1;
			font-size: 16px;
			line-height: 1;
			img {
				width: 100%;
			}
		}
		.my-value {
			flex: 3;
			text-align: left;
			color: #8C8C8C;
			b {
				color: #000000;
				font-size: .9rem;
			}
			font {
				font-size: .9rem;
				margin-left: 5px;
				color: #259B24
			}
			p {
				margin: 0;
				font-size: .6rem;
			}
		}
	}
	#wlinfo {
		background: #FFF;
		margin-top: 10px;
		color: #8C8C8C;
		padding-top: 10px;
		li {
			border-left: 2px solid #BBBBBB;
			text-align: left;
			padding: 0 10px 10px 20px;
			margin-left: 20px;
			position: relative;
			span {
				font-size: .6rem;
				border-bottom: #dcdcdc 1px solid;
				display: block;
				line-height: 1.5rem;
			}
		}
		li:after {
			content: '.';
			border-radius: 50%;
			background: #8C8C8C;
			width: 10px;
			height: 10px;
			display: block;
			position: absolute;
			top: 2px;
			left: -6px;
		}
		li:first-child {
			color: #259B24;
		}
		li:first-child:after {
			background: #259B24;
			border: #42B983 4px solid;
			left: -10px;
			top: 0px;
		}
	}
}
</style>