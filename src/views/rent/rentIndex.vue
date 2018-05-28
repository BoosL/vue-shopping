<template>
	<div id="rentIndex">
		<!--<div class="input">
			<el-input placeholder="请输入要搜索的内容" v-model="inputs" autofocus>
				<el-button slot="append" icon="search" @click='indexData'></el-button>
			</el-input>
		</div>-->

	<div id="soso" class="uou" :class="{'mout':amout}">
		<div class="search">
			<el-button slot="prepend" icon="arrow-left" @click='goback'></el-button>
			<el-input placeholder="请输入要搜索的内容" v-model="inputs" autofocus>
				<el-button slot="append" icon="search" @click='isso'></el-button>
			</el-input>

		</div>
	</div>

		<mt-loadmore 
		 :bottom-method="loadBottom"
		 :bottom-all-loaded="allLoaded"
		 ref="loadmore"
		 topPullText=''
		 topDropText=''
		 topLoadingText=''
		 bottomPullText=''
		 bottomDropText='下拉加载...'
		 bottomLoadingText='' 
		 >
		<div class="proBox">
			<div class="list" v-for="items in goodsListData">
				<div class="imgs">
					<router-link :to="fun.getUrl('goodsDetail',{ id: items.goods_id })">
						<img :src="items.thumb" />
					</router-link>
				</div>
				<div class="shop_info">
					<h4>
						<router-link :to="fun.getUrl('goodsDetail',{ id: items.goods_id })">{{items.title}}</router-link>
					</h4>
					<span>
						<router-link :to="fun.getUrl('goodsDetail',{ id: items.goods_id })">￥{{items.price}}起/每天</router-link>
					</span>
				</div>
			</div>
		</div>
		</mt-loadmore>
		
		<div class="loadNomore" v-show='loadNomore'><img src="../../assets/images/no-more-product.png"/></div>
		<c-Footer></c-Footer>
	</div>
</template>

<script>
import cFooter from './component/rentFoot';
var n = 1;
export default {
	components: { cFooter },
	data() {
		return {
			inputs: '',
			loadNomore:false,
			allLoaded:true,
			goodsListData: [],
		}
	},

	activated() {
		
	},

	mounted() {
		this.indexData();
	},

	methods: {
		isso(){
			n = 1;
			this.indexData();
		},
		//输入关键字在当前页面进行搜索，与后台交接关键字定义的名字
		indexData() {
			
			$http.get('plugin.lease.frontend.modules.shop.controllers.index.get-default-index', { soso: this.inputs }).then((response)=> {
				if (response.result == 1) {
					
					this.loadNomore = false;
					this.allLoaded = false;
					// 搜索结果为空
					if(response.data.goods.length <= 0) {
						this.loading = true;
						this.allLoaded = true;
						return;
					}
					// 如果当前页数大于总页数 就不加载了
					if(response.data.current_page > response.data.last_page) {
						this.loading = true;
						this.allLoaded = true;
						return;
					}
					this.goodsListData.push(...response.data.goods);

					if(response.data.goods.length < 20) {
						this.loadNomore = true;
						this.allLoaded = true;
						return;
					}					
					
					
					
				} else {
					console.log(response.msg);
				}

			}, function (response) {
				// error callback
				console.log(response);
			});
		},
				// 加载更多
		loadBottom() {
			console.log('加载更多启动')
			n++;
			//this.gotoSearch(n);
			this.$refs.loadmore.onBottomLoaded();

		},
		goback(){
			this.$router.go(-1);
		}
	}
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#rentIndex {
	.search{
		overflow: hidden;
		background: #fff;
		border-bottom: 1px solid #f5f5f5;
		.el-button.el-button--default{    float: left;
			width: 10%;    border: none;
			padding-top: 16px;}
		.el-input.el-input-group.el-input-group--append{    float: left;
			width: 88%;

			margin-left: 2%;
			height: 45px;
			}
	.el-input-group__append .el-button.el-button--default{background: #F5F5F5;    padding-top: 9px;
		line-height: 16px;
		padding-right: 15px;    border-top-left-radius: 0;
		border-bottom-left-radius: 0;}
	.el-input.el-input-group.el-input-group--append .el-input-group__append{background: #f5f5f5;}
	.el-col-1{    margin: 12px 0px;
		color: #666;
		font-size: 16px;}
	}	
	.loadNomore img{width: 20%;}
	.input {
		margin: 10px 20px;
		input {
			width: 100%;
			height: 35px;
			padding-left: 30px;
			margin: 10px 0;
			outline: 0;
			border: 1px solid #ccc;
			border-radius: 6px;
			background: url(../../assets/images/search.png) no-repeat 10px 9px #fff;
		}
	}
	.proBox {
		margin-bottom: 10px;
		margin-top: 10px;
		overflow: hidden;
		.list:nth-child(2n-1) {
			margin-right: 4%;
		}
		.list {
			width: 48%;
			overflow: hidden;
			float: left;
			background: #fff;
			box-sizing: border-box;
			margin-bottom: 10px;
			.imgs {
				width: 100%;
				height: 150px;
				img {
					width: 100%;
					height: 100%
				}
			}
			.shop_info {
				h4 {
					font-size: 14px;
					margin: 5px;
					height: 42px;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					word-break: break-all;
					overflow: hidden;
					line-height: 21.44px;
					line-height: 1.34rem;
					text-align: justify;
					font-weight: normal;
					a {
						color: #101010;
					}
				}
				span {
					float: right;
					padding: 5px;
					a {
						color: #e51c60
					}
				}
			}
		}
	}
}


.search {
	overflow: hidden;
	background: #fff;
	border-bottom: 1px solid #f5f5f5;
	.el-button.el-button--default {
		float: left;
		width: 10%;
		border: none;
		padding-top: 16px;
	}
	.el-input.el-input-group.el-input-group--append {
		float: left;
		width: 80%;

		margin-left: 2%;
		height: 45px;
	}
	.el-input-group__append .el-button.el-button--default {
		background: #F5F5F5;
		padding-top: 9px;
		line-height: 16px;
		padding-right: 29px;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
	.el-input.el-input-group.el-input-group--append .el-input-group__append {
		background: #f5f5f5;
	}
	.el-col-1 {
		margin: 12px 0px;
		color: #666;
		font-size: 16px;
	}
}
</style>