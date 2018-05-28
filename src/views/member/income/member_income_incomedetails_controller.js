import cTitle from 'components/title';
import { Navbar } from 'mint-ui';
export default {
    data() {
        return {
            toi: this.fun.getKeyByI(),
            datas: [],
            typeData: [],
            popupSpecs: false,
            sType: "",//筛选规格


            loading: false,
            allLoaded: false,
            goload: true,
            isLoadMore: true,
            page: 1,
            total_page: 0,
        };
    },


    activated() {
        this.toi = this.fun.getKeyByI();
        this.sType = "";//初始化
        this.initData();
        //获取数据
        this.getData(this.sType);
    },
    mounted() {
        this.toi = this.fun.getKeyByI();
    },
    methods: {
        //初始化数据
        initData() {
            this.page = 1;
            this.total_page = 0;
            this.goload = true;
            this.loading = true;
            this.allLoaded = false;
            this.isLoadMore = true;
            this.datas = [];
        },

        //更新
        loadTop() {
            this.initData();
            this.getData(this.sType);
            this.$refs.coupon_loadmore.onTopLoaded();
        },
        // 加载更多
        loadBottom() {
            //	this.allLoaded = true;// 若数据已全部获取完毕,不在显示加载更多组件
            if (this.isLoadMore) {
                this.getMoreData(this.page, this.sType);
                this.$refs.coupon_loadmore.onBottomLoaded();
            } else {
                console.log('没有更多数据');
            }
        },

        //获取数据
        getData(_type) {
            let that = this;
            let json = { income_type: _type, page: this.page };

            $http.get('finance.income.get-income-list', json, "加载中...").then(function (response) {
                console.log(response);
                if (response.result == 1) {
                    that.total_page = response.data.last_page;
                    that.datas = response.data.data;
                } else {
                    console.log(response.msg);
                }

            }, function (response) {
                console.log(response);
            });
        },

        //获取更多
        getMoreData(page, _type) {
            var that = this;
            if (this.page == this.total_page) {

                return;

            }
            if (this.page >= this.total_page) {
                that.loading = true; that.allLoaded = true; return;

            } else {
                this.page = this.page + 1;
                $http.get('finance.income.get-income-list', { income_type: _type, page: this.page }, '加载中...').then(function (response) {

                    if (response.result == 1) {
                        var myData = response.data;
                        that.loading = false; that.allLoaded = false;
                        that.datas = that.datas.concat(myData.data);//数组拼接

                    } else {
                        that.page = that.page - 1;
                        that.loading = true; that.allLoaded = true; that.isLoadMore = false; return;
                    }
                }, function (response) {
                    // error callback
                });

            }


        },


        //获取类型数据
        getTypeData() {
            let that = this;
            let json = { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
            $http.get('finance.income.get-search-type', json, "获取中...").then(function (response) {
                console.log(response);
                if (response.result == 1) {
                    that.typeData = response.data;
                } else {
                    console.log(response.msg);
                }

            }, function (response) {
                console.log(response);
            });
        },

        //返回
        goto() {
            window.history.go(-1);
        },

        //筛选
        screen() {
            if (this.typeData.length == 0) {
                this.getTypeData();
            }
            this.popupSpecs = true;

        },

        //点击筛选处理
        screenType(_type) {
            this.sType = _type;
            this.popupSpecs = false;
            this.initData();
            this.getData(this.sType);
        }

    },


    components: { cTitle }
}