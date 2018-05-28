import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';
import { CellSwipe } from 'mint-ui';
export default {
    data() {
        return {
            selected: '0',
            display: 1,
            pagesize: 1,
            //待使用
            wait_used: [],
            //已过期
            overdue: [],
            used: [],
            loading: false,
            allLoaded: false,
            goload: true,
            isLoadMore: true,
            page: 1,
            total_page: 0,
        	coin_name: "",//爱心值自定义名称
       		 usable: 0, // 登陆会员可用爱心值
        }
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
            this.getNetData(this.selected);
            this.$refs.coupon_loadmore.onTopLoaded();
        },
        // 加载更多
        loadBottom() {
            //	this.allLoaded = true;// 若数据已全部获取完毕,不在显示加载更多组件
            if (this.isLoadMore) {
                //this.getMoreData(this.page, this.selected);
                this.$refs.coupon_loadmore.onBottomLoaded();
            } else {
                console.log('没有更多数据');
            }
        },
        //切换优惠券状态列表
        switchItem() {
            //this.initData();
            this.getNetData(this.selected);
        },
        //发起http请求
        getNetData(type) {
            var that = this;
            $http.get('plugin.coin.Frontend.Modules.Coin.Controllers.change-records.index', { service_type: type, page: 1 }, '正在获取...').then(function (response) {
                if (response.result == 1) {
                    var myData = response.data;
                    that.total_page = response.data.total;
                    if (type == 0) {
                    	that.wait_used =[];
                    	that.overdue = [];
                    	that.used = [];
                        that.wait_used = myData;

                    } else if (type == 1) {
                    	that.wait_used =[];
                    	that.overdue = [];
                    	that.used = [];
                        that.overdue = myData;

                    } else if (type == 2) {
                    	that.wait_used =[];
                    	that.overdue = [];
                    	that.used = [];
                        that.used = myData;
                    }
                } else {
                    MessageBox.alert(response.msg);
                    //Toast(response.msg);
                }
            }, function (response) {
                // error callback
            });
        },
        getMoreData(page, type) {
            var that = this;
            if (this.page == this.total_page) {

                return;

            }
            if (this.page >= this.total_page) {
                that.loading = true; that.allLoaded = true; return;

            } else {
                this.page = this.page + 1;
                $http.get('coupon.member-coupon.coupons-of-member-by-status', { status_request: type, page: this.page, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '正在获取更多订单...').then(function (response) {

                    if (response.result == 1) {
                        var myData = response.data;

                        that.loading = false; that.allLoaded = false;
                        if (index == 1) {

                            that.wait_used = that.wait_used.concat(myData.data);//数组拼接

                        } else if (index == 2) {
                            tthat.overdue = that.overdue.concat(myData.data);

                        } else {
                            that.used = that.used.concat(myData.data);

                        }

                    } else {
                        that.page = that.page - 1;
                        that.loading = true; that.allLoaded = true; that.isLoadMore = false; return;
                    }
                }, function (response) {
                    // error callback
                });

            }


        },
      getUsable() {
        $http.get('plugin.coin.Frontend.Controllers.page.index', {}, "加载中...").then((response)=>{

          if (response.result == 1) {
          		this.usable = response.data.usable;
          		this.coin_name = response.data.coin_name;
          } else {
             MessageBox.alert(response.msg);
          }

        }, function (response) {
           MessageBox.alert(response);
        });

      }


    },
    activated() {
    	//this.selected = 0;
        //this.initData();
        this.used = [];
        this.wait_used = [];
        this.overdue = [];
        this.getUsable();
        this.getNetData(0);
        // this.$on('selected_coupon', (params) => {
        //     console.log(params.coupon_id);
        // });
    },
    components: { cTitle }
}

