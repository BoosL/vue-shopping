import cTitle from 'components/title';
import { Indicator, Toast } from 'mint-ui';
var currentTabIndex = "0";
//标记 防止重复加载
var is_first_content = false;
var is_second_content = false;
export default {
    data() {
        return {

            mailLanguage:"",
            mailFullReturnTitle:"",
            mailFullReturnName:"",

            activeName: "first",
            first_content: [],
            second_content: [],

            alreadyReturn: 0.00,
            each_return_rate: 0,
            order_return_rate: 0,
            returnAmountTotal: 0.00,
            notReturn: 0.00,
            fullReturnName: "",
            isShow: false,
            return_list_name:"",
        }
    },

    mounted() {

    },

    activated() {
        this.initMailLanguage();
        this.initData();//初始化参数
        this.getData();//初始化数据
        //this.setDataByTabIndex();
    },

    methods: {

        initMailLanguage(){
            this.mailLanguage =this.fun.initMailLanguage();
			this.fun.setWXTitle(this.fun.setMailLanguage("消费满额赠送",this.mailLanguage.full_return.full_return));
            this.mailFullReturnTitle=this.fun.setMailLanguage("消费满额赠送",this.mailLanguage.full_return.full_return);
			this.mailFullReturnName=this.fun.setMailLanguage("赠送",this.mailLanguage.full_return.return_name);
            this.mailFullReturnLog=this.fun.setMailLanguage("满额返现记录",this.mailLanguage.full_return.full_return_log);
            //this.mailReturnQueue=this.fun.setMailLanguage("消费队列",this.mailLanguage.single_return.return_queue);
            //this.mailReturnLog=this.fun.setMailLanguage("消费记录",this.mailLanguage.single_return.return_log);
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
            this.fullReturnName = '满额返现';
            this.isShow = false;
            this.return_list_name="返现记录";
        },

        //初始化数据
        getData() {
            let that = this;
            $http.get('plugin.full-return.frontend.list.index', {}, '').then(function (response) {
                console.log('AAAAA:', response);
                if (response.result == 1) {
                    that.alreadyReturn = response.data.finish;
                    that.returnAmountTotal = response.data.total;
                    that.notReturn = response.data.surplus;
                    that.first_content = response.data.list;
                    that.fullReturnName = response.data.full_return_name;
                    that.isShow = response.data.is_show_return_list == "0" ? false : true;
                    that.return_list_name=response.data.return_list_name;
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                Toast(response.msg);
            });
        },

        //满额返现队列详情
        toReturnInfo(id) {
            this.$router.push(this.fun.getUrl('full_return_list_info', { "id": id }));
        },

        //获取返现
        getReturnListInfo() {
            let that = this;
            $http.get('plugin.full-return.frontend.detail.index', {}, '').then(function (response) {
                if (response.result == 1) {
                    that.second_content = response.data;
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
                this.getReturnList();//获取返现队列
            } else if (currentTabIndex == "1" && !is_second_content) {
                is_second_content = true;
                this.getReturnListInfo();//获取返现详情
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
            //this.setDataByTabIndex();
        },
    },
    components: { cTitle }
}