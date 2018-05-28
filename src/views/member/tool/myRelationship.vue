<template>
	<div id="myrelationship">
		<c-title :hide="false" text='我的关系'></c-title>
		<div style="height: 40px;"></div>
		<h3 class="h3">我的推荐人</h3>
		<!--avatar:'', level:'', nickname:'', uid:'-->
		<div class="tbs imgst">
			<div class="left img"><img :src="avatar" /></div>
			<div class="right">{{nickname}}</div>
		</div>
		<div class="tbs">
			<div class="left id">会员id：{{uid}}</div>
			<div class="right level">会员等级：{{level}}</div>
		</div>

		<div class="tbs" style="margin-top: 10px;">
			<div class="left relation">我推荐的人</div>
			<!--<div class="right"><router-link to="/member/offlineSearch"><i class="fa fa-search"></i></router-link></div>-->
		</div>
		<!--agent_total : null avatar : null nickname : null order_price : null order_total : null uid : null-->
		<div v-for=" (item,index) in my_agent">
			<div class="tbs" @click='toggle($event,index)'>
				<div class="li1"><img :src="item.avatar" /></div>
				<div class="li2">{{item.nickname}}</div>
				<div class="li3">
					<span>聊天</span>
				</div>
				<div class="li4">
					<i class='fa' :class="{'fa-angle-down':sort==index,'fa-angle-right':sort!=index}"></i>
				</div>
			</div>
			<transition name="fade">
				<div class="tbs2" v-show='sort==index'>
					<div class="left">会员id：{{item.uid}}</div>
					<div class="right">订单：{{item.order_total}}</div>
					<div class="left">金额：{{item.order_price}}元</div>
					<div class="right">粉丝数量：{{item.agent_total}}</div>
				</div>
			</transition>
		</div>

	</div>
</template>
<script>
import myRelationship_Controller from './myRelationship_Controller';
export default myRelationship_Controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#myrelationship {
	.h3 {
		color: #666;
		font-size: .8rem;
		margin: 0;
		padding: 10px;
		text-align: left;
		font-weight: normal;
		background: #FFF;
	}
	.tbs2 {
		background: #f5f5f5;
		align-items: center;
		border-bottom: #e8e8e8 1px solid;
		padding: 0 10px;
		box-sizing: border-box;
		.left {
			width: 46%;
			text-align: left;
			height: 45px;
			display: inline-block;
			line-height: 45px;
			img {
				width: 30%;
			}
		}
		.right {
			/*flex: 50%;*/
			width: 46%;
			display: inline-block;
			text-align: right;
		}
	}
	.tbs {
		display: flex;
		align-items: center;
		background: #FFF;
		flex-flow: row wrap;
		border-bottom: #e8e8e8 1px solid;
		padding: 0 10px;
		box-sizing: border-box;
		.left {
			font-size: .8rem;
			box-sizing: border-box;
			width: 50%;
			flex: 50%;
			text-align: left;
			height: 45px;
			line-height: 45px;
			float: left;
			img {
				width: 30%;
				float: left;
			}
		}
		.right {
			width: 50%;
			text-align: right;
		}
		a {
			color: #000;
		}
		.relation {
			color: #666;
		}
		.id,
		.level {
			font-size: .9rem;
			line-height: 45px;
		}
		.fa.fa-search {
			color: #999;
			font-size: 20px;
		}
		i {
			font-size: 24px;
		}
		.img {
			margin: 10px 0;
		}
		.li1 {
			flex: 15%;
			width: 15%;
			img {
				width: 100%;
				margin: 10px 0;
			}
		}
		.li2 {
			flex: 45%;
			width: 45%;
			text-align: left;
			padding-left: 10px;
			box-sizing: border-box;
		}
		.li3 {
			flex: 30%;
			width: 30%;
			span {
				border: #B1A6A6 solid 1px;
				padding: 5px 20px;
				border-radius: 7px;
				display: none;
			}
		}
		.li4 {
			flex: 5%;
			width: 5%;
		}
	}
	.tbs2 {
		padding: 10px 20px;
	}
	.imgst {
		background: #f5f5f5;
	}
	.fade-enter-active {
		transition: .5s;
	}
	.fade-enter,
	.fade-leave-active {
		opacity: 0;
		height: 0px;
	}
}
</style>