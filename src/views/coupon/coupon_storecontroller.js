import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';
export default {
    data() {
        return {
            selected: '',
            coupon_list: [],
            loading: false,
            allLoaded: false,
            goload: true,
            isLoadMore: true,
            page: 1,
            total_page: 0
        }
    },
    methods: {
        initData() {
            this.coupon_list = [];
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
            this.$refs.loadmore.onTopLoaded();
        },
        // 加载更多
        loadBottom() {

            //	this.allLoaded = true;// 若数据已全部获取完毕,不在显示加载更多组件
            if (this.isLoadMore) {

                this.getMoreData(this.page);
                this.$refs.loadmore.onBottomLoaded();

            } else {
                console.log('没有更多数据');
            }



        },
        selectedcoupon(item, index) {
            //领取

            var that = this;
            $http.get('coupon.member-coupon.get-coupon', { coupon_id: item.id }, '正在抢此优惠券').then(function (response) {

                if (response.result == 1) {
                    var temp = response.data;
                    that.$set(that.coupon_list, index, temp);
                    //console.log(that.list);

                } else {
                    //MessageBox.alert(response.msg);
                    MessageBox.alert(response.msg);
                }
            }, function (response) {
                // error callback
            });





        },
        //发起http请求
        getNetData() {

            var that = this;
            let json = { page: 1 };
            $http.get('coupon.member-coupon.coupons-for-member', json, '正在获取优惠券...').then(function (response) {

                if (response.result == 1) {

                    var myData = response.data;
                    that.total_page = response.data.total;
                    that.coupon_list = myData.data;

                } else {
                    //MessageBox.alert(response.msg);
                    MessageBox.alert(response.msg);
                }
            }, function (response) {
                // error callback
            });

        },
        getMoreData(page) {
            var that = this;
            if (this.page == this.total_page) {

                return;

            }
            if (this.page >= this.total_page) {
                that.loading = true; that.allLoaded = true; return;

            } else {
                this.page = this.page + 1;
                $http.get('coupon.member-coupon.coupons-for-member', { page: this.page, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '正在获取更多...').then(function (response) {

                    if (response.result == 1) {
                        var myData = response.data;

                        that.loading = false; that.allLoaded = false;
                        that.coupon_list = that.coupon_list.concat(myData.data);//数组拼接

                    } else {
                        that.page = that.page - 1;
                        that.loading = true; that.allLoaded = true; that.isLoadMore = false; return;
                    }
                }, function (response) {
                    // error callback
                });

            }


        },

    },
    activated() {
        this.toi = this.fun.getKeyByI();
        this.coupon_list = [];
        this.initData();
        this.getNetData();

    },
    components: { cTitle }
}