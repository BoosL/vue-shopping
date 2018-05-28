<template>
<div id="search" transition="fadeInLeft">
	<div id="soso" class="uou" :class="{'mout':amout}">
		<div class="search">
			<el-button slot="prepend" icon="arrow-left" @click='goback'></el-button>
			<el-input placeholder="搜索当前品牌商品标题" v-model="inputs" autofocus>
				<el-button slot="append" icon="search" @click='search'></el-button>
			</el-input>

			<el-col :span="1">
				<i class="fa fa-th-large" v-show="view" @click="$store.commit('views')"></i>
				<i class="fa fa-th-list" v-show="!view" @click="$store.commit('views')"></i>
			</el-col>
		</div>
		<c-sort :goods='datas' v-on:sortIn="sortOut" text='搜索结果'></c-sort>

	</div>
	<div style="height: 25px;display: block;"></div>
	<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
			<mt-loadmore :top-method2="loadTop"
			             @top-status-change2="handleTopChange"
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
			<c-goodsList :goods='datas' text='搜索结果' class='osll' :loading='loading'></c-goodsList>

		</mt-loadmore>
	</div>
</div>
</div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import cGoodsList from 'components/goodsList';
  import cSort from 'components/sort';
  var n = 1;
  export default {
    data () {
      return {
        title: '搜索',
        inputs:'',amout: false,
        loading: false,
        allLoaded:true,
        topStatus: '',
        bottomStatus: '',
        wrapperHeight: 0,
        datas:[]
      }
    },
	computed: mapState([
		'message', 'blurst', 'view'
	]),
	...mapMutations(['views']),
    methods:{
	  sortOut(e) {
			if(this.datas.length == 0) {
				return;
			}
			console.log('得到的信息', e)
			n = 1;
			this.datas = [];
			this.order_field = e.order_field;
			this.order_by = e.order_by;
			this.gotoSearch(n);
		},    	
      handleTopChange(status) {
        this.topStatus = status;
      },
      //更新
      loadTop(){
      	this.$refs.loadmore.onTopLoaded();
      },
      // 加载更多
      loadBottom(){
      	console.log('加载更多启动')
		n++;
		this.gotoSearch(n);  	
      	this.$refs.loadmore.onBottomLoaded();
      	
      },  	

	  slider() {
			let that = this;
			window.onscroll = function() {
				var top = document.documentElement.scrollTop || document.body.scrollTop;
				if(top < 80) {
					that.amout = false;
				} else {
					that.amout = true;
				}
			}
			
		},
		goback(){
			this.$router.go(-1);
		},
		search(){
			n=1;
			this.datas=[];
			this.gotoSearch(n);
		},
      	gotoSearch(page=1){
      			console.log('当前查询页码：',page);
				$http.get('goods.goods.get-goods-brand-list', {keywords:this.inputs,'page':page,'brand_id':this.$route.params.id}).then((json) => {
					if(json.result == 1) {
						this.loading=false;	
						this.allLoaded = false;	
					// 搜索结果为空
          		if (json.data.goods.data.length <= 0) {this.loading=true;this.allLoaded = true; return; }
          // 如果当前页数大于总页数 就不加载了         
          		if (json.data.goods.current_page > json.data.goods.last_page) {this.loading=true;this.allLoaded = true; return; }	
          		this.datas.push(...json.data.goods.data);
          			if (json.data.goods.data.length<20) {
          				this.loading=true;this.allLoaded = true; return;
          			}
					} else {
						console.log('请求有问题,错误信息：',json.msg);
					}
				});
      	}
    },
		activated(){
			 this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
			//keep分类不相同时，重载数据
			this.datas = [];
			n = 1;
			//this.loadMore();
			this.gotoSearch(n);	
		},

    components: {cGoodsList,cSort}
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	#search{
		.osll{min-height: 100vh;background: #FFF;margin-top: 5px;box-sizing: border-box;}
		@descendent wrapper {
        overflow: scroll;
    }
		.page-loadmore-wrapper2{height: 100vh;overflow: hidden;}
		.uou{position: fixed;z-index: 99;	top:0px;	transition: .2s;
		-webkit-transition: .2s;}
		.mout {

		top:-36px;
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