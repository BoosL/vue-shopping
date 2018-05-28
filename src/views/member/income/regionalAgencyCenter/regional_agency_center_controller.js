import cTitle from 'components/title';
import { Indicator, Toast } from 'mint-ui';
var currentTabIndex = "0";
//标记 防止重复加载
var is_first_content = false;
var is_second_content = false;
var is_third_content = false;
export default {
    data() {
        return {
            level_name: "",
            rate: 0,
            ratioDatas: [],
            activeName: 'first',
            first_content: [],
            second_content: [],
            third_content: [],
        }
    },

    mounted() {

    },

    activated() {
        this.initData();//初始化参数
        this.getData();//初始化数据
        this.initInfo();//初始化info数据
        
        this.setDataByTabIndex();
    },

    methods: {
        //初始化参数
        initData() {
            this.ratioDatas=[];

            currentTabIndex = "0";
            is_first_content = false;
            is_second_content = false;
            is_third_content = false;

            this.activeName = 'first';

            this.first_content = [];
            this.second_content = [];
            this.third_content = [];
        },

        initInfo() {
            let that = this;
            $http.get('plugin.area-dividend.api.area-dividend.get-area-agent', {}).then(function (response) {
                if (response.result == 1) {
                    that.level_name = response.data.level_name;
                    that.rate = response.data.rate;
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                Toast(response.msg);
            });
        },

        //初始化数据
        getData() {
            let that = this;
            $http.get('plugin.area-dividend.api.area-dividend.get-dividend-statistic', {}, '').then(function (response) {
                if (response.result == 1) {

                    //组装数据
                    let itemDay = new Object();
                    itemDay.money = response.data.today;
                    itemDay.data = "今日";
                    itemDay.name = "data";
                    that.ratioDatas.push(itemDay);

                    let itemYesterday = new Object();
                    itemYesterday.money = response.data.yesterday;
                    itemYesterday.data = "昨日";
                    itemYesterday.name = "data";
                    that.ratioDatas.push(itemYesterday);

                    let itemWeek = new Object();
                    itemWeek.money = response.data.this_week;
                    itemWeek.data = "本周";
                    itemWeek.name = "data";
                    that.ratioDatas.push(itemWeek);

                    let itemMonth = new Object();
                    itemMonth.money = response.data.this_month;
                    itemMonth.data = "本月累计分红";
                    itemMonth.name = "mounth";
                    that.ratioDatas.push(itemMonth);

                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                Toast(response.msg);
            });
        },


        //获取佣金列表
        getDividendList(status) {
            let that = this;
            let json = { "status": status };
            $http.get('plugin.area-dividend.api.area-dividend.get-dividend-list', json, '获取中').then(function (response) {
                if (response.result == 1) {
                    switch (status) {
                        case "":
                            that.first_content = response.data;
                            break;
                        case "1":
                            that.second_content = response.data;
                            break;
                        case "0":
                            that.third_content = response.data;
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


        //设置选择后的数据
        setDataByTabIndex() {
            if (currentTabIndex == "0" && !is_first_content) {
                is_first_content = true;
                this.getDividendList("");
            } else if (currentTabIndex == "1" && !is_second_content) {
                is_second_content = true;
                this.getDividendList("1");
            } else if (currentTabIndex == "2" && !is_third_content) {
                is_third_content = true;
                this.getDividendList("0");
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