<template>
	<transition name="fade">
		<mt-loadmore :top-method="loadTop"
		             @top-status-change="handleTopChange"
		             :bottom-method="loadBottom"
		             :bottom-all-loaded="allLoaded"
		             ref="loadmore"
		             topPullText=''
		             topDropText=''
		             topLoadingText=''
		             bottomPullText=''
		             bottomDropText=''
		             bottomLoadingText=''>
			<div id="tabs">
				<el-tabs v-model="activeName"
				         @tab-click="handleClick">
					<el-tab-pane label="商品介绍"
					             name="first">
						<div id="goods_content" v-html='first_content'></div>
					</el-tab-pane>
					<el-tab-pane label="商品参数" name="second">
						<div class="parameter" v-for="item in second_content">
							<div class="par-info" >
								<span class="name">{{item.title}}</span>
								<span class="value">{{item.value}}</span>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="用户评价"
					             name="third">
						<div class="pj"
						     v-for="n in third_content">
							<div layout="row"
							     layout-align="start center"
							     id="user">
								<div><img :src="n.head_img_url" /></div>
								<div>{{n.nick_name}}</div>
								<div>{{n.created_at}}</div>
							</div>
							<p>{{n.content}}</p>
							<!--<div class="pl"><span>评论</span></div>-->
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</mt-loadmore>
	</transition>
</template>


<script>
import goodstabs_controller from './goodstabs_controller';
export default goodstabs_controller;

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#tabs {
	min-height: 100vh;
	#goods_content{ img{width: 100%}}
}

.pl {
	width: 100%;
	text-align: right;
	padding: 10px 0;
	span {
		border: #B1A6A6 1px solid;
		border-radius: 14px;
		padding: 2px 14px;
		background: #FFFFFF;
		font-size: .6rem;
	}
}

.pj {
	background: #FFF;
	padding: 0 10px;
	margin-bottom: 5px;
	p {
		text-align: left;
		margin: 0;
		padding-bottom: 10px;
	}
	img {
		width: 100%;
	}
}
.parameter{
	height: 100%;
	background: #fff;
	padding: 10px 10px 0 10px;
	text-align: left;
	font-size:.9rem;
	display: flex;
.par-info{
	display:flex;
	width: 100%;
	padding-bottom: 10px;
	border-bottom: 1px solid #f1f1f1;
		.name{
			color: #999;
			width: 25%;
			padding-right:10px ;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.value{color: #333;
			width: 75%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;}
	}
}
#user {
	div:nth-child(1) {
		flex: 1;
		padding: 10px 10px 5px 0;
		img {
			width: 90%;
			border-radius: 50%;
		}
	}
	div:nth-child(2) {
		flex: 5;
		text-align: left;
	}
	div:nth-child(3) {
		color: #908a8a;
		font-size: .6rem;
		padding-right: 10px;
	}
}

.fade-enter-active,
.fade-leave-active {

	transition: all .5s ease;
	transform: translateY(0%);
}

.fade-enter,
.fade-leave-active {
	transition: all .5s ease;

	transform: translateY(100vh);
}
</style>