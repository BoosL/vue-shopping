import cTitle from 'components/title';
import { Indicator, Toast } from 'mint-ui';
var currentTabIndex = "0";
//标记 防止重复加载
var is_first_content = false;
var is_second_content = false;
export default {
    data() {
        return {

            mailLanguage: "",
            mailTeamReturnTitle:"",
            mailTeamLevel:"",
            mailTeamReturnName:"",
            mailReturnLog:"",


            team_level: '',
            level_power: 0,
            return_amount: '',
            activeName: "first",
            first_content: [],
            second_content: [],

            alreadyReturn: 0.00,
            each_return_rate: 0,
            order_return_rate: 0,
            returnAmountTotal: 0.00,
            notReturn: 0.00,
        }
    },

    mounted() {

    },

    activated() {
        this.initMailLanguage();
        this.initData();//初始化参数
        this.getData();//初始化数据
        this.setDataByTabIndex();
    },

    methods: {

        initMailLanguage() {
            this.mailLanguage = this.fun.initMailLanguage();
            this.fun.setWXTitle(this.fun.setMailLanguage("团队赠送", this.mailLanguage.team_return.team_return));
            this.mailTeamReturnTitle = this.fun.setMailLanguage("团队赠送", this.mailLanguage.team_return.team_return);
            this.mailTeamLevel = this.fun.setMailLanguage("经销商等级", this.mailLanguage.team_return.team_level);
            this.mailTeamReturnName = this.fun.setMailLanguage("赠送", this.mailLanguage.team_return.return_name);
            this.mailReturnLog = this.fun.setMailLanguage("赠送记录", this.mailLanguage.team_return.return_log);
        },
        //初始化参数
        initData() {

            currentTabIndex = "0";
            is_first_content = false;
            is_second_content = false;


            this.activeName = 'first';

            this.first_content = [];
            this.second_content = [];

            this.alreadyReturn = 0.00;
            this.each_return_rate = 0;
            this.order_return_rate = 0;
            this.returnAmountTotal = 0.00;
            this.notReturn = 0.00;

        },

        //初始化数据
        getData() {
            let that = this;
            $http.get('plugin.team-return.api.team-return.get-team-return-statistic', {}, '').then(function (response) {
                console.log("return:", response);
                if (response.result == 1) {
                    that.team_level = response.data.team_level;
                    that.return_amount = response.data.return_amount;
                    that.level_power = response.data.level_power;
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                Toast(response.msg);
            });
        },

        //返现队列详情
        toReturnInfo(id) {
            this.$router.push(this.fun.getUrl('teamlevel_return_list_info', { "id": id }));
        },

        //获取返现
        getReturnListInfo() {
            let that = this;
            $http.get('plugin.team-return.api.team-return.get-team-return-log', {}, '').then(function (response) {
                //console.log("returnList:", response);
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
            this.getReturnListInfo();//获取返现详情
        },

        //tab 点击
        handleClick(tab, event) {
            //点击同tab 不刷新界面
            if (currentTabIndex == tab.index) {
                return;
            } else {
                currentTabIndex = tab.index;
            }

        },
    },
    components: { cTitle }
}