<style lang="scss" rel="stylesheet/scss" scoped>
* {
	box-sizing: border-box;
}

#share {
	#tabs {
		margin-top: 40px;
		.shareList {
			li {
				background: #fff;
				height: 80px;
				padding: 10px 15px;
				margin-bottom: 7px;
				line-height: 30px;
				div.lf {
					text-align: left;
					span {
						color: #484848;
					}
					p {
						color: #a8a8a8;
						font-size: 12px
					}
				}
				div.rt {
					text-align: right;
					color: #a8a8a8;
					font-size: 12px;
					span {
						color: #f15353;
						font-size: 14px;
					}
				}
			}
		}
	}
}
</style>
<template>
	<div id="share">
	
		<c-title :hide="false" text='店主中心'></c-title>
	
		<div id="tabs">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="全部" name="first">
					<ul class="shareList">
						<li v-if="first_content" v-for="elem in first_content" @click="toInfo(elem.id)">
	
							<div class="lf">
								<span>{{elem.mode_type}}</span>
								<p>{{elem.created_at}}</p>
							</div>
							<div class="rt">
								<span>￥{{elem.is_lower==1?elem.lower_level_bonus_money:elem.bonus_money}}</span>
								<br /> {{elem.status_name}}
							</div>
	
						</li>
					</ul>
					<div v-if="!first_content">您还未下订单，赶快去商城选购吧~</div>
				</el-tab-pane>
				<el-tab-pane label="未结算" name="second">
					<ul class="shareList">
						<li v-if="second_content" v-for="elem in second_content" @click="toInfo(elem.id)">
	
							<div class="lf">
								<span>{{elem.mode_type}}</span>
								<p>{{elem.created_at}}</p>
							</div>
	
							<div class="rt">
								<span>￥{{elem.is_lower==1?elem.lower_level_bonus_money:elem.bonus_money}}</span>
								<br /> {{elem.status_name}}
							</div>
	
						</li>
					</ul>
					<div v-if="!second_content">您还未下订单，赶快去商城选购吧~</div>
				</el-tab-pane>
				<el-tab-pane label="已结算" name="third">
					<ul class="shareList">
						<li v-if="third_content" v-for="elem in third_content" @click="toInfo(elem.id)">
	
							<div class="lf">
								<span>{{elem.mode_type}}</span>
								<p>{{elem.created_at}}</p>
							</div>
	
							<div class="rt">
								<span>￥{{elem.is_lower==1?elem.lower_level_bonus_money:elem.bonus_money}}</span>
								<br /> {{elem.status_name}}
							</div>
	
						</li>
					</ul>
	
					<div v-if="!third_content">您还未下订单，赶快去商城选购吧~</div>
				</el-tab-pane>
				<el-tab-pane label="已失效" name="fourth">
					<ul class="shareList">
						<li v-if="fourth_content" v-for="elem in fourth_content" @click="toInfo(elem.id)">
	
							<div class="lf">
								<span>{{elem.mode_type}}</span>
								<p>{{elem.created_at}}</p>
							</div>
	
							<div class="rt">
								<span>￥{{elem.is_lower==1?elem.lower_level_bonus_money:elem.bonus_money}}</span>
								<br /> {{elem.status_name}}
							</div>
	
						</li>
					</ul>
	
					<div v-if="!fourth_content">您还未下订单，赶快去商城选购吧~</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>


<script>
import shareList_controller from './shareList_controller';
export default shareList_controller;
</script>




























<!--<style  lang="scss" rel="stylesheet/scss" scoped>
	
</style>

<template>
   
</template>

<script>
    
</script>
-->
