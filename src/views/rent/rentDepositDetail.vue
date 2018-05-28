<template>
	<div id="rentDepositDetail">
		<c-title :hide="false" text='押金明细'></c-title>
		<div style="height: 40px;"></div>
		<div id="tabs">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="全部" name="first">
					<ul class="all">
						<li v-for="item in all">
							<div class="lf">
								<h3>{{item.source_name}}</h3>
								<p>{{item.created_at}}</p>
							</div>
							<div class="rt">{{item.money}}</div>
						</li>
					</ul>
				</el-tab-pane>
				<el-tab-pane label="收入" name="second">
					<ul class="all">
						<li v-for="item in all">
							<div class="lf">
								<h3>{{item.source_name}}</h3>
								<p>{{item.created_at}}</p>
							</div>
							<div class="rt">{{item.money}}</div>
						</li>
					</ul>
				</el-tab-pane>
				<el-tab-pane label="支出" name="third">
					<ul class="all">
						<li v-for="item in all">
							<div class="lf">
								<h3>{{item.source_name}}</h3>
								<p>{{item.created_at}}</p>
							</div>
							<div class="rt">{{item.money}}</div>
						</li>
					</ul>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
import rentDepositDetail_controller from './rentDepositDetail_controller';
export default rentDepositDetail_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#rentDepositDetail {
	#tabs {
		min-height: 100vh;
		#goods_content {
			img {
				width: 100%
			}
		}
	}
	.mint-navbar {
		margin-top: 45px;
	}
	.all {
		background: #fff;
		li {
			height: 70px;
			padding: 0 3%;
			border-top: 1px solid #ccc;
			div.lf {
				width: 74%;
				h3 {
					text-align: left;
					font-weight: normal;
					line-height: 30px;
					padding-top: 10px;
				}
				p {
					text-align: left;
				}
			}
			div.rt {
				width: 20%;
				text-align: right;
				line-height: 70px;
			}
		}
		li:last-child {
			border-bottom: 1px solid #ccc;
		}
	}
}
</style>