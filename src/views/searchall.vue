<template>
	<div id="search"
	     transition="fadeInLeft">
		<div id="soso"
		     class="uou"
		     :class="{'mout':amout}">
		    <div class="search">
		    <el-button slot="prepend" icon="arrow-left" @click='goback'></el-button>
			<el-input placeholder="请输入内容" v-model="inputs"  autofocus>
				<el-button slot="append" icon="search" @click='search'></el-button>
			</el-input>
			<el-col :span="1">
				<i class="fa fa-th-large" v-show="view" @click="$store.commit('views')"></i>
				<i class="fa fa-th-list" v-show="!view" @click="$store.commit('views')"></i>
			</el-col>
		</div>
			<c-sort :goods='goods' v-on:sortIn="sortOut" text='搜索结果'></c-sort>
		</div>
		<div style="height: 55px;display: block;"></div>
		<mt-loadmore v-if="goload"
		             :bottom-method="loadBottom"
		             :bottom-all-loaded="allLoaded"
		             ref="loadmore"
		             bottomPullText=''
		             bottomDropText='下拉加载...'
		             bottomLoadingText=''
		             :autoFill='true'>
			<c-goodsList :goods='goods'
			             text='搜索结果'
			             class='osll'
			             :loading='loading'></c-goodsList>
	
		</mt-loadmore>
	
	</div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
import cGoodsList from 'components/goodsList';
import cSort from 'components/sort';
var n = 1;
export default {
	data() {
		return {
			title: '搜索',
			inputs: '',
			amout: false,
			loading: false,
			allLoaded: true,
			goload: true,
			goods: [],
			order_by:'',
			order_field:''
		}
	},
	computed: mapState(['view']),
	...mapMutations(['views']),
	mounted() {
		this.slider();
		if(this.$route.name=='searchAll'){
			this.search();
		}
	},
	methods: {
		sortOut(e){
			console.log('得到的信息',e)
			if (this.goods.length==0) {
				return;
			}
			n=1;
			this.goods = [];
			this.order_field = e.order_field;
			this.order_by = e.order_by;
			this.gotoSearch(n);			
		},
		search() {
			n = 1;
			this.goods = [];
			this.goload = true;
			//this.gotoSearch();
		},
		slider() {
			let that = this;
			window.onscroll = function () {
				var top = document.documentElement.scrollTop || document.body.scrollTop;
				if (top < 80) {
					that.amout = false;
				} else {
					that.amout = true;
				}
			}

		},
		// 加载更多
		loadBottom() {
			console.log('加载更多启动')
			this.gotoSearch(n);
			n++;
			this.$refs.loadmore.onBottomLoaded();
		},
		goback() {
			this.$router.go(-1);
		},
		gotoSearch(page = 1) {
			let json = { 'search[keyword]': this.inputs, 'page': page ,order_field:this.order_field,order_by:this.order_by};
			$http.get('goods.goods.search-goods', json).then((json) => {

				if (json.result == 1) {
					this.loading = false; this.allLoaded = false;
					// 搜索结果为空
					if (json.data.total.length <= 0) { this.loading = true; this.allLoaded = true; return; }
					// 如果当前页数大于总页数 就不加载了         
					if (json.data.current_page > json.data.last_page) { this.loading = true; this.allLoaded = true; return; }
					for (let i of json.data.data) {
						this.goods.push(i);
					}
					if (json.data.total.length < 20) {
						this.loading = true; this.allLoaded = true; return;
					}
				}
				else {
					this.doException(json);
				}
			});
		}
	},
	activated() {
		this.amout=false;
		this.datas = [];
		n = 1;
		//this.gotoSearch(n);
	},
	components: { cGoodsList, cSort }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#search {
	.uou {
		position: fixed;
		z-index: 99;
		top: 0px;
		transition: .2s;
		-webkit-transition: .2s;
	}
	.mout {
		top: -36px;
	}
}
	.search{
		overflow: hidden;
		background: #fff;
		border-bottom: 1px solid #f5f5f5;
		.el-button.el-button--default{    float: left;
			width: 10%;    border: none;
			padding-top: 16px;}
		.el-input.el-input-group.el-input-group--append{    float: left;
			width: 80%;

			margin-left: 2%;
			height: 45px;
			}
	.el-input-group__append .el-button.el-button--default{background: #F5F5F5;    padding-top: 9px;
		line-height: 16px;
		padding-right: 29px;    border-top-left-radius: 0;
		border-bottom-left-radius: 0;}
	.el-input.el-input-group.el-input-group--append .el-input-group__append{background: #f5f5f5;}
	.el-col-1{    margin: 12px 0px;
		color: #666;
		font-size: 16px;}
	}
</style>