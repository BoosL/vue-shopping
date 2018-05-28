import cTitle from 'components/title';
import {MessageBox} from 'mint-ui';
import {Indicator, Toast} from 'mint-ui';
import {CellSwipe} from 'mint-ui';

const status_type_0 = "";
const status_type_1 = "0";
const status_type_2 = "1";
const status_type_3 = "2";

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
            love_name: "",//爱心值自定义名称
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

                this.getMoreData(this.page, this.selected);
                this.$refs.coupon_loadmore.onBottomLoaded();

            } else {
                console.log('没有更多数据');
            }


        },

        //切换优惠券状态列表
        switchItem() {

            //this.initData();
            if (this.selected == 0) {
                console.error(999999)
                this.getNetData(status_type_0);
            } else if (this.selected == 1) {
                this.getNetData(status_type_1);
            } else if (this.selected == 2) {
                this.getNetData(status_type_2);
            } else if (this.selected == 3) {
                this.getNetData(status_type_3, 1);
            }
        },

        //发起http请求
        getNetData(status, own = '') {
            var that = this;
            $http.get('plugin.love.Frontend.Modules.Trading.Controllers.trading.trading-center', { status: status, own: own, page: 1 }, '正在获取...').then(function (response) {

                if (response.result == 1) {
                    var myData = response.data;
                    that.total_page = response.data.total;
                    if (status == '') {
                        that.wait_used = [];
                        that.underway = [];
                        that.done = [];
                        that.own = [];
                        that.wait_used = myData;

                    } else if (status == '0') {
                        that.wait_used = [];
                        that.underway = [];
                        that.done = [];
                        that.own = [];
                        that.underway = myData;

                    } else if (status == '1') {
                        that.wait_used = [];
                        that.underway = [];
                        that.done = [];
                        that.own = [];
                        that.done = myData;

                    } else if (status == '2') {
                        that.wait_used = [];
                        that.underway = [];
                        that.done = [];
                        that.own = [];
                        that.own = myData;

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
                that.loading = true;
                that.allLoaded = true;
                return;

            } else {
                this.page = this.page + 1;
                $http.get('coupon.member-coupon.coupons-of-member-by-status', {
                    status_request: type,
                    page: this.page,
                    "i": this.fun.getKeyByI(),
                    "type": this.fun.getTyep()
                }, '正在获取更多订单...').then(function (response) {

                    if (response.result == 1) {
                        var myData = response.data;

                        that.loading = false;
                        that.allLoaded = false;
                        if (index == 1) {

                            that.wait_used = that.wait_used.concat(myData.data);//数组拼接

                        } else if (index == 2) {
                            tthat.overdue = that.overdue.concat(myData.data);

                        } else {
                            that.used = that.used.concat(myData.data);

                        }

                    } else {
                        that.page = that.page - 1;
                        that.loading = true;
                        that.allLoaded = true;
                        that.isLoadMore = false;
                        return;
                    }
                }, function (response) {
                    // error callback
                });

            }


        },
        revoke(id){
            $http.get('plugin.love.Frontend.Modules.Trading.Controllers.trading.revoke', {id:id}, "加载中...").then((response) => {

                if (response.result == 1) {
                    MessageBox.alert(response.msg).then(action => {
                        this.$router.go(0);
                    });

                } else {
                    MessageBox.alert(response.msg);
                }

            }, function (response) {
                MessageBox.alert(response);
            });
        },
        purchase(id){
            $http.get('plugin.love.Frontend.Modules.Trading.Controllers.trading.purchase', {id:id}, "加载中...").then((response) => {

                if (response.result == 1) {
                    MessageBox.alert(response.msg).then(action => {
                        this.$router.go(0);
                    });

                } else {
                    MessageBox.alert(response.msg);
                }

            }, function (response) {
                MessageBox.alert(response);
            });
        },
        getUsable() {
            $http.get('plugin.love.Frontend.Controllers.page.index', {}, "加载中...").then((response) => {

                if (response.result == 1) {
                    this.love_name = response.data.love_name;
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
        this.own = [];
        this.done = [];
        this.wait_used = [];
        this.underway = [];
        this.getUsable();
        this.getNetData('');
        // this.$on('selected_coupon', (params) => {
        //     console.log(params.coupon_id);
        // });
    },
    components: {cTitle}
}

