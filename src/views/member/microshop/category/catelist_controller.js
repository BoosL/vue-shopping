
import { mapState, mapMutations } from 'vuex';
import cGoodsList from 'components/goodsList1';
import cSort from 'components/sort';
import { Indicator, Toast } from 'mint-ui';
var n = 1;
export default {
	data() {
		return {
			title: '搜索',
			inputs: '',
			amout: false,
			loading: false,
			allLoaded: true,
			topStatus: '',
			bottomStatus: '',
			wrapperHeight: 0,
			order_by: '',
			order_field: '',
			datas: [],
			totalGoodsNum:0,
			pushData:"",
			setData:{},//存储选择的商品
			
		}
	},
	
	computed: mapState([
		'message', 'blurst', 'view'
	]),
	...mapMutations(['views']),
	mounted() {
		this.slider();
	},
	methods: {
		getUser(){
			console.log("aaaa");
		},
		postSelectGood(){
			console.log("进行数据提交");
			this.$router.push(this.fun.getUrl('microShop_selectedGoods',{"goods":this.pushData}));
		},
		pushFn(){
			let that = this;
			
			console.log("进行数据提交");
			console.log(this.pushData);
			


			if(this.fun.isTextEmpty(this.pushData)||this.pushData.length==0)
			{
				Toast("请选择商品");
				return;
			}
			
	 		$http.get("plugin.micro.frontend.controllers.MicroShop.set-goods",{"goods_ids":this.pushData},"提交中").then(function (response) {	
          		console.log(response);
				 if (response.result == 1) {   
				 	that.$router.push(that.fun.getUrl('microShop_home'));
				 }else{
					console.log(response);
				}
           }, function (response) {
                console.log(response);
            });
		},
		changeTotal(va){
			let num =0;
			this.pushData="";
			for(var i in va){
				if(va[i]){
					num++;
					this.pushData+=i+",";
				}
			}
			this.totalGoodsNum=num;
		},
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
		loadTop() {
			this.$refs.loadmore.onTopLoaded();
		},
		// 加载更多
		loadBottom() {
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
		goback() {
			console.log("回退操作。。。。。。。。。。",this.totalGoodsNum);
//			this.$router.push(this.fun.getUrl('',{"num":this.totalGoodsNum}));
			this.$router.go(-1);
		},
		search() {
			n = 1; 
			this.datas = [];
			this.gotoSearch(n,false);
		},
		gotoSearch(page = 1,j=true) {
			let srtArr = JSON.parse(this.$route.params.id);
			
			$http.get('plugin.micro.frontend.controllers.MicroShop.goods.search-goods', {
				'search[keyword]': this.inputs,
				'page': page,
				'search[category]': srtArr,
				order_field: this.order_field,
				order_by: this.order_by,
				'search[couponid]':this.$route.params.coupon
			}).then((json) => {
				if(json.result == 1) {
					this.loading = false;
					this.allLoaded = false;
					// 搜索结果为空
					if(json.data.data.length <= 0) {
						this.loading = true;
						this.allLoaded = true;
						return;
					}
					// 如果当前页数大于总页数 就不加载了
					if(json.data.current_page > json.data.last_page) {
						this.loading = true;
						this.allLoaded = true;
						return;
					}
					this.datas.push(...json.data.data);

					if(json.data.data.length < 20) {
						this.loading = true;
						this.allLoaded = true;
						return;
					}
				} else {
					this.doException(json);
				}
			});
		}
	},
	activated() {
		this.totalGoodsNum=0;
		this.setData={};
		this.amout=false;
		this.slider();
		this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top; //keep分类不相同时，重载数据
		this.datas = [];
		this.order_field = '';
		this.order_by = '';
		n = 1;
		//this.loadMore();
		this.gotoSearch(n);
	},

	components: {
		cGoodsList,
		cSort
	}
}