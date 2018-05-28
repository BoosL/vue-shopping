import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';
import { CellSwipe } from 'mint-ui';
export default {
    data() {
        return {
            toi: this.fun.getKeyByI(),
            selected: '1',
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
            isPresenter:false,

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

            this.isPresenter=false;

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
        toStore() {
            this.$router.push(this.fun.getUrl("couponStore", { myparent: this }));
        },
        goHome() {
            this.$router.push(this.fun.getUrl('home'));

        },
        //切换优惠券状态列表
        switchItem() {
            this.initData();
            this.getNetData(this.selected);
        },
        toggle(event, n) {
            console.log(event)
            if (event.target.className == 'fa coupon_voucher_more_arr fa-angle-down') {
                this.display = 99999;
            } else {
                this.display = n;
            }
        },

        //发起http请求
        getNetData(type) {

            var that = this;
            $http.get('coupon.member-coupon.coupons-of-member-by-status-v2', { status_request: type, page: 1 }, '正在获取...').then(function (response) {

                if (response.result == 1) {
                    var myData = response.data;
                    that.total_page = response.data.total;
                    that.isPresenter=response.data.set.transfer;
                    if (type == 1) {
                        that.wait_used = myData.data;

                    } else if (type == 2) {
                        that.overdue = myData.data;

                    } else {
                        that.used = myData.data;

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
                $http.get('coupon.member-coupon.coupons-of-member-by-status-v2', { status_request: type, page: this.page, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '正在获取更多订单...').then(function (response) {
                    that.isPresenter=response.data.set.transfer;
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


        //通过类型去查询可用商品
        goBuy(item) {
            console.log(item.belongs_to_coupon.use_type);
            if (item.belongs_to_coupon.use_type == 0)//0商城通用
            {
                this.goHome();
            } else if (item.belongs_to_coupon.use_type == 1)//1指定分类
            {
                this.$router.push(this.fun.getUrl('catelist', { "id": JSON.stringify(item.belongs_to_coupon.category_ids) }));
            } else if (item.belongs_to_coupon.use_type == 2) {//2指定商品
                this.$router.push(this.fun.getUrl('search', { "coupon": item.belongs_to_coupon.id }));
            }
        },
        delteteItem(item, i) {
            let that = this;
            let json = { id: item.id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };

            $http.get('coupon.member-coupon.delete', json, "处理中...").then(function (response) {

                if (response.result == 1) {
                    if (that.selected == 1) {
                        that.wait_used.splice(i, 1);

                    } else if (that.selected == 2) {
                        that.overdue.splice(i, 1);

                    } else {
                        that.used.splice(i, 1);
                    }

                    MessageBox.alert("操作成功");
                } else {
                    MessageBox.alert(response.msg);
                }

            }, function (response) {
                console.log(response);
            });

        },

        //赠送优惠券
        presenter(item, index) {
            let that = this;
            MessageBox.prompt('请输入用户ID').then(({ value, action }) => {
                if (action == "confirm") {
                    if (that.fun.isTextEmpty(value)) {
                        MessageBox.alert("用户ID不能为空");
                        return;
                    }
                    that.presenterPost(value, item, index);
                } 
            });
        },

        //赠送post
        presenterPost(value, item, index) {
            let that = this;
            let json = { recipient: value, record_id: item.id };

            $http.get('coupon.coupon-transfer.index', json, "处理中...").then(function (response) {
                if (response.result == 1) {
                    if (that.wait_used.length > 0) {
                        that.wait_used.splice(index, 1);
                    }
                    MessageBox.alert("操作成功");
                } else {
                    MessageBox.alert(response.msg);
                }
            }, function (response) {
                console.log(response);
            });
        }

    },
    activated() {
        this.initData();
        this.toi = this.fun.getKeyByI();
        this.used = [];
        this.wait_used = [];
        this.overdue = [];

        this.getNetData(1);
        // this.$on('selected_coupon', (params) => {
        //     console.log(params.coupon_id);
        // });
    },
    components: { cTitle }
}

