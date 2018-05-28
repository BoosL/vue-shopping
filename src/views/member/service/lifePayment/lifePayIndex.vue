<template>
	<div id="lifePayIndex">
		<c-title :hide="false" text='生活缴费' tolink='paymentRecord' totext='缴费记录'></c-title>
		<div style="height:40px"></div>
		<ul class="plocyDetail">
			<li>
				<label><i class="iconfont icon-shuifei"></i></label>
				<div>水费
					<router-link :to="fun.getUrl('waterFee')">
						<i class="iconfont icon-right" v-if="$store.state.service.lang=='ch'"></i>
	          			<i class="iconfont icon-left" v-else="$store.state.service.lang=='wei'"></i>
	          		</router-link>
				</div>
			</li>
			<li>
				<label><i class="iconfont icon-dianfei"></i></label>
				<div>电费
					<router-link :to="fun.getUrl('electricity')">
						<i class="iconfont icon-right" v-if="$store.state.service.lang=='ch'"></i>
	          			<i class="iconfont icon-left" v-else="$store.state.service.lang=='wei'"></i>
	          		</router-link>
				</div>
			</li>
			<li>
				<label><i class="iconfont icon-ranqifei"></i></label>
				<div>燃气费
					<router-link :to="fun.getUrl('gasCosts')">
						<i class="iconfont icon-right" v-if="$store.state.service.lang=='ch'"></i>
	          			<i class="iconfont icon-left" v-else="$store.state.service.lang=='wei'"></i>
	          		</router-link>
				</div>
			</li>
			<li>
				<label><i class="iconfont icon-guhua"></i></label>
				<div>固话
					<router-link :to="fun.getUrl('fixedTelephone')">
						<i class="iconfont icon-right" v-if="$store.state.service.lang=='ch'"></i>
	          			<i class="iconfont icon-left" v-else="$store.state.service.lang=='wei'"></i>
	          		</router-link>
				</div>
			</li>
			<li>
				<label><i class="iconfont icon-kuandai"></i></label>
				<div>宽带
					<router-link :to="fun.getUrl('broadband')">
						<i class="iconfont icon-right" v-if="$store.state.service.lang=='ch'"></i>
	          			<i class="iconfont icon-left" v-else="$store.state.service.lang=='wei'"></i>
	          		</router-link>
				</div>
			</li>
		</ul>
		  
	</div>
</template>

<script>
import cTitle from 'components/title';
export default {
	components: { cTitle },
	data() {
		return {
			
		}
	},
	
}
	
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#lifePayIndex{
	background: #fff;
	li{
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-flow: row;
		flex-flow: row;
		height: 60px;
		line-height: 60px;
		font-size: 16px;
		label{
			width: 33px;
			height: 33px;
			line-height: 33px;
			-webkit-border-radius: 50%;
			-moz-border-radius: 50%;
			border-radius: 50%;
			margin: 13px 15px;
			i{font-size: 25px;color: #fff;}
		}
		div{
			flex: 1;
			text-align: left;
			border-bottom: 1px solid #ccc;
			color: #505050;
			i{font-size: 25px;float: right;padding-right: 15px; color: #CCCCCC;}
		}
	}
	li:first-child{label{background:#6FB0D5;}}
	li:nth-child(2){label{background:#F0A85F;}}
	li:nth-child(3){label{background:#E98488;}}
	li:nth-child(4){label{background:#5CBA8E;}}
	li:nth-child(5){label{background:#D2A2EE;} div{border-bottom: none;}}
}

</style>