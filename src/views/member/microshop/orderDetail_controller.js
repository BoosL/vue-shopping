import cTitle from 'components/title';
var currentTabIndex = "0";
//标记 防止重复加载
var is_first_content = false;
var is_second_content = false;
var is_third_content = false;
var is_fourth_content = false;
export default {
    data() {
        return {
            first_content: [],
            second_content: [],
            third_content: [],
            fourth_content: [],

            activeName: 'first',
            show: true,

            orderData: [],
            time_type: ""
        }
    },
    activated() {
        //初始化参数
        this.initData();
        //获取传递参数
        this.time_type = this.$route.params.date;
        console.log("jfc", this.time_type);
        this.setDataByTabIndex();
    },
    methods: {
        //初始化参数
        initData() {
            currentTabIndex = "0";
            is_first_content = false;
            is_second_content = false;
            is_third_content = false;
            is_fourth_content = false;

            this.first_content = [];
            this.second_content = [];
            this.third_content = [];
            this.fourth_content = [];
            this.activeName = 'first';
            this.show = true;
        },

        //设置选择后的数据
        setDataByTabIndex() {
            console.log("setDataByTabIndex");
            if (currentTabIndex == "0" && !is_first_content) {
                is_first_content = true;
                this.getData("");
            } else if (currentTabIndex == "1" && !is_second_content) {
                is_second_content = true;
                this.getData("0");
            } else if (currentTabIndex == "2" && !is_third_content) {
                is_third_content = true;
                this.getData("1");
            } else if (currentTabIndex == "3" && !is_fourth_content) {
                is_fourth_content = true;
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


        //获取数据
        getData(_apply_status) {
            let that = this;
            $http.get("plugin.micro.frontend.controllers.MicroShopOrder.list", { "apply_status": _apply_status, "time_type": this.time_type }, "加载中").then(function (response) {
                console.log("订单页请求到的数据");
                console.log(response);
                if (response.result == 1) {
                    if (currentTabIndex == "0") {
                        that.first_content = response.data.list.data;
                    } else if (currentTabIndex == "1") {
                        that.second_content = response.data.list.data;
                    } else if (currentTabIndex == "2") {
                        that.third_content = response.data.list.data;
                    } else if (currentTabIndex == "3") {
                        that.fourth_content = response.data.list.data;
                    }
                } else {
                    console.log(response);
                }
            }, function (response) {
                console.log(response);
            });
        },
    },
    components: { cTitle }

}