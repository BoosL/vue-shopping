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
            total: "",

            activeName: 'first',
            first_content: [],
            second_content: [],
            third_content: [],
        }
    },


    activated() {
       
        this.initData();//初始化参数
        this.initInfo();//初始化info数据
        this.setDataByTabIndex();
    },

    methods: {

        //初始化参数
        initData() {

            this.total = "";
           
            currentTabIndex = "0";
            is_first_content = false;
            is_second_content = false;
            is_third_content = false;

            this.activeName = 'first';

            this.first_content = [];
            this.second_content = [];
            this.third_content = [];
        },

        //初始化info数据
        initInfo() {
            let that = this;
            $http.get('plugin.fixed-reward.api.fixed-reward.get-fixed-reward-amount', {}).then(function (response) {
                if (response.result == 1) {
                    that.total = response.data.total;
                   
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                Toast(response.msg);
            });
        },

        //获取奖励记录
        getFixedRewardLog() {
            let that = this;
            let json = { };
            $http.get('plugin.fixed-reward.api.fixed-reward.get-fixed-reward-log', json, '获取中').then(function (response) {
                if (response.result == 1) {
                    that.first_content = response.data;
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
                this.getFixedRewardLog();
            } else if (currentTabIndex == "1" && !is_second_content) {
                is_second_content = true;
               
            } else if (currentTabIndex == "2" && !is_third_content) {
                is_third_content = true;
               
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