import cTitle from 'components/title';
import { Indicator, Toast } from 'mint-ui';
var currentTabIndex = "0";
//标记 防止重复加载
var is_first_content = false;
var is_second_content = false;
var is_third_content = false;
var is_fourth_content = false;
export default {
    data() {
        return {
            sType: "",

            level: "",
            return_time: "",

            ratioDatas: [],

            activeName: 'first',
            first_content: [],
            second_content: [],
            third_content: [],
            fourth_content: [],

            loading: false,
            allLoaded: false,
            goload: true,
            isLoadMore: true,
            page: 1,
            total_page: 0,
        }
    },


    activated() {
        this.initData();//初始化参数
        this.initInfo();//初始化info数据

        this.setDataByTabIndex();
    },

    methods: {


        //更新
        loadTop() {
            this.initPageData();
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



        initPageData() {
            is_first_content = false;
            is_second_content = false;
            is_third_content = false;
            is_fourth_content = false;

            this.first_content = [];
            this.second_content = [];
            this.third_content = [];
            this.fourth_content = [];


            this.page = 1;
            this.total_page = 0;
            this.goload = true;
            this.loading = true;
            this.allLoaded = false;
            this.isLoadMore = true;
        },

        //初始化参数
        initData() {

            this.level = "";
            this.return_time = "";
            this.ratioDatas = [];

            currentTabIndex = "0";


            this.activeName = 'first';
            
            is_first_content = false;
            is_second_content = false;
            is_third_content = false;
            is_fourth_content = false;

            this.first_content = [];
            this.second_content = [];
            this.third_content = [];
            this.fourth_content = [];


            this.page = 1;
            this.total_page = 0;
            this.goload = true;
            this.loading = true;
            this.allLoaded = false;
            this.isLoadMore = true;

        },

        //初始化info数据
        initInfo() {
            let that = this;
            $http.get('plugin.level-return.api.level-return.get-level-return-statistic', {}).then(function (response) {
                if (response.result == 1) {
                    that.level = response.data.level;
                    that.return_time = response.data.return_time;

                    //组装数据
                    let item0 = new Object();
                    item0.money = response.data.amountTotal;
                    item0.data = "总返还金额";
                    item0.name = "data";
                    that.ratioDatas.push(item0);

                    let item1 = new Object();
                    item1.money = response.data.notReturn;
                    item1.data = "未返还金额";
                    item1.name = "data";
                    that.ratioDatas.push(item1);

                    let item2 = new Object();
                    item2.money = response.data.return_amount;
                    item2.data = "已返还金额";
                    item2.name = "data";
                    that.ratioDatas.push(item2);

                    let item3 = new Object();
                    item3.money = response.data.invalid;
                    item3.data = "无效金额";
                    item3.name = "data";
                    that.ratioDatas.push(item3);


                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                Toast(response.msg);
            });
        },







        //获取数据 空：全部 -1：无效 0：未返现 1：已返现
        getData(type) {
            let that = this;
            let json = { status: type, page: 1 };
            $http.get('plugin.level-return.api.level-return.get-return-log', json, '获取中').then(function (response) {
                if (response.result == 1) {
                    that.total_page = response.data.last_page;
                    switch (type) {
                        case "":
                            that.first_content = response.data.data;
                            break;
                        case "0":
                            that.second_content = response.data.data;
                            break;
                        case "1":
                            that.third_content = response.data.data;
                            break;
                        case "-1":
                            that.fourth_content = response.data.data;
                            break;

                        default:
                            break;
                    }
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                Toast(response.msg);
            });
        },


        //获取更多
        getMoreData(page, type) {
            var that = this;
            if (this.page == this.total_page) {

                return;

            }
            if (this.page >= this.total_page) {
                that.loading = true; that.allLoaded = true; return;

            } else {
                this.page = this.page + 1;
                let json = { status: type, page: this.page };
                $http.get('plugin.level-return.api.level-return.get-return-log', json, '加载中...').then(function (response) {

                    if (response.result == 1) {

                        that.loading = false; that.allLoaded = false;

                        switch (type) {
                            case "":
                                that.first_content = that.first_content.concat(response.data.data);
                                break;
                            case "0":
                                that.second_content = that.second_content.concat(response.data.data);
                                break;
                            case "1":
                                that.third_content = that.third_content.concat(response.data.data);
                                break;
                            case "-1":
                                that.fourth_content = that.fourth_content.concat(response.data.data);
                                break;

                            default:
                                break;
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


        //设置选择后的数据
        setDataByTabIndex() {
            if (currentTabIndex == "0" && !is_first_content) {
                is_first_content = true;
                this.sType = "";
                this.getData("");
            } else if (currentTabIndex == "1" && !is_second_content) {
                is_second_content = true;
                this.sType = "0";
                this.getData("0");
            } else if (currentTabIndex == "2" && !is_third_content) {
                is_third_content = true;
                this.sType = "1";
                this.getData("1");
            } else if (currentTabIndex == "3" && !is_third_content) {
                is_fourth_content = true;
                this.sType = "-1";
                this.getData("-1");
            }
        },

        //tab 点击
        handleClick(tab, event) {
            //点击同tab 不刷新界面
            if (currentTabIndex == tab.index) {
                return;
            } else {
                currentTabIndex = tab.index;
            }
            this.setDataByTabIndex();
        },
    },
    components: { cTitle }

}