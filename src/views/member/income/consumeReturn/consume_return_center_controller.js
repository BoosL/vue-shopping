import cTitle from 'components/title';
import { Indicator, Toast } from 'mint-ui';
var currentTabIndex = "0";
//标记 防止重复加载
var is_first_content = false;
var is_second_content = false;
export default {
    data() {
        return {
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
        this.initData();//初始化参数
        this.getData();//初始化数据
        //this.setDataByTabIndex();
    },

    methods: {
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
            $http.get('plugin.consume-return.frontend.list.index', {}, '').then(function (response) {
                console.log('AAAAA:', response);
                if (response.result == 1) {
                    that.alreadyReturn = response.data.finish;
                    that.returnAmountTotal = response.data.total;
                    that.notReturn = response.data.surplus;
                    that.first_content=response.data.list;
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                Toast(response.msg);
            });
        },

        //消费返现队列详情
        toReturnInfo(id){
             this.$router.push(this.fun.getUrl('consume_return_list_info', {"id":id}));
        },
        
        //获取返现
        getReturnListInfo()
        {
            let that = this;
            $http.get('plugin.single-return.api.single-return.get-single-return-log', {}, '').then(function (response) {
                if (response.result == 1) {
                    that.second_content=response.data;
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