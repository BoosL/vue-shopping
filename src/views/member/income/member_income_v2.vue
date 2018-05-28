<template>
	<div id="income">
		<c-title :hide="false" text='收入'></c-title>
		<div style="height: 40px;"></div>
		<div id="userinfo">
			<ul>
				<li>
					<span>￥{{total_income}}</span>
					<br>累计收入</li>
				<li>
					<span>￥{{income}}</span>
					<br>可提现收入</li>
				<li>
					<span class="tixi" @click="gotoIncome">
						提现
					</span>
				</li>
			</ul>
		</div>
		<h3>未提现收入</h3>
		<!--ico : "ico-commission" income : 0 title : "分销商" type : "commission" type_name : "分销佣金"-->
		<!-- <ul id="gongge"> -->
		<template>
			<yd-grids-group :rows="3">
					<yd-grids-item  :link="fun.getUrl('',{})" v-for="plug in plugs">
						<yd-icon slot="icon" :class="plug.ico" custom size="24px" color="#FF685D"></yd-icon>
							<!-- <yd-icon slot="icon" :name="plug.ico" custom size="24px" color="#FF685D"></yd-icon> -->
							<span slot="text">{{plug.type_name}} <font>￥{{plug.income}}</font>元</span>
					</yd-grids-item>
			</yd-grids-group>
		</template>
			<!-- <li v-for="plug in plugs">
				<i :class="plug.ico"></i>
				<yd-icon slot="icon" name="shouyintai" custom size="24px" color="#FF685D"></yd-icon>
				<br />{{plug.type_name}}
				<br />
				<font>￥{{plug.income}}</font>元
			</li> -->
		<!-- </ul> -->
		<p class="mszf">
			<router-link :to="fun.getUrl('presentationRecord')">提现明细
				<span></span>
				<i class="fa fa-angle-right"></i>
			</router-link>
		</p>
	</div>
</template>
<script>
import member_incomecontroller from './member_income_v2_controller';
export default member_incomecontroller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#income {
	#userinfo {
		background: #FFF;
		margin-bottom: 10px;
		ul {
			display: flex;
			align-items: center;
		}
		ul li:last-child {
			border: 0;
		}
		ul li {
			color: #8c8c8c;
			text-align: center;
			display: block;
			flex: 1;
		}
		ul li span {
			color: #222;
			font-size: 1.1rem;
			margin-bottom: 5px;
			display: inline-block;
		}
		ul li {
			width: 33.3333%;
			margin: 10px 0;
			box-sizing: border-box;
			font-size: .8rem;
		}
		.tixi {
			color: #FFF;
			font-size: .9rem;
			border: 1px solid #ff5757;
			border-radius: 14px;
			background: #ff5757;
			padding: 3px 16px;
			a {
				color: #FFF;
			}
		}
	}
	h3 {
		background: #f5f5f5;
		margin: 0;
		padding: 0 10px;
		text-align: left;
		font-weight: normal;
		font-size: .8rem;
		height: 2rem;
		box-sizing: border-box;
		line-height: 2rem;
	}
	#gongge {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		background: #FFF;
		padding: 10px 0;
		li {
			flex: 33% 0 0;
			flex-direction: row;
			i {
				font-size: 34px;
				color: #CCCCCC;
				margin: 10px 0;
			}
			font {
				color: #e84e40
			}
			a {
				color: #000000;
				img {
					width: 23px;
					margin: 5px 0;
				}
			}
		}
	}
	.mszf {
		background: #FFF;
		padding: 0 10px;
		margin: 0;
		text-align: left;
		overflow: hidden;
		margin-top: 10px;
		height: 44px;
		box-sizing: border-box;
		line-height: 44px;
		font-size: .857rem;
		color: #333;
		i {
			font-size: 17px;
			float: right;
			line-height: 44px;
		}
		span {
			float: left;
		}
		a {
			color: #000000;
			display: block;
		}
	}
}
</style>
