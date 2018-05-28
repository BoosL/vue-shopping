import cTitle from 'components/title';	
  export default {
    data() {
      return {
     toi: this.fun.getKeyByI(),
 		 value:null,
     	loading: false,
			allLoaded: false,
			goload: true,
			isLoadMore:true,
      page:1,
      total_page:0,
     list:[]    
       };
      
    },
    methods: {
			initData() {
			this.page = 1;
			this.goload = true;
			this.total_page = 0;
			this.loading = true;
			this.allLoaded = false;
			this.isLoadMore = true;

		},
      //更新
		loadTop() {
      this.initData();
			this.getNetData();
			this.$refs.refund_loadmore.onTopLoaded();
		},
		// 加载更多
		loadBottom() {

			//	this.allLoaded = true;// 若数据已全部获取完毕,不在显示加载更多组件
			if (this.isLoadMore) {
				this.getMoreData();
				this.$refs.refund_loadmore.onBottomLoaded();

			}else
			{
				console.log('没有更多数据');
			}



		},
      //发起http请求
		getNetData() {
			var that = this;
      
			$http.get('refund.list', { page:1,"i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '正在获取订单...').then(function (response) {

				if (response.result == 1) {
					// console.log("*********");
					// console.log(response.data);
					var myData = response.data;
          that.list = myData.data;
          that.total_page  = myData.total;
 
					

				}
			}, function (response) {
				// error callback
			});

		},
    	getMoreData() {
			var that = this;
			if (this.page == this.total_page) {
				
				return;

			}
			if (this.page >= this.total_page) {
				that.loading = true; that.allLoaded = true; return;

			} else {
				this.page = this.page + 1;
				$http.get('refund.list', { page: this.page, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '正在获取更多数据...').then(function (response) {

					if (response.result == 1) {
            that.loading = false; that.allLoaded = false;
						var myData = response.data;
						that.list = that.list.concat(myData.data);//数组拼接
						that.loading = false; that.allLoaded = false;
			      
					} else {
            that.page = that.page -1;
						that.loading = true; that.allLoaded = true;that.isLoadMore=false; return;
					}
				}, function (response) {
					// error callback
				});

			}


		}

    },
    activated () {
      this.toi = this.fun.getKeyByI();
			this.initData();
      this.getNetData();
      
    },
    components: { cTitle}
  };