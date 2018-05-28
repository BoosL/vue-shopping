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
            mailSingleReturnTitle:"",
            mailSingleReturnName:"",
            mailReturnQueue:"",
            mailReturnLog:"",
            
            
           // mail_distrbution_name:"",
           // mail_commission:"",
      


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

        initMailLanguage(){
            this.mailLanguage =this.fun.initMailLanguage();
            this.fun.setWXTitle(this.fun.setMailLanguage("消费赠送",this.mailLanguage.single_return.single_return));
            this.mailSingleReturnTitle=this.fun.setMailLanguage("消费赠送",this.mailLanguage.single_return.single_return);
            this.mailSingleReturnName=this.fun.setMailLanguage("赠送",this.mailLanguage.single_return.return_name);
            this.mailReturnQueue=this.fun.setMailLanguage("消费队列",this.mailLanguage.single_return.return_queue);
            this.mailReturnLog=this.fun.setMailLanguage("消费记录",this.mailLanguage.single_return.return_log);
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
            $http.get('plugin.single-return.api.single-return.get-single-return-statistic', {}, '').then(function (response) {
                if (response.result == 1) {
                    that.alreadyReturn = response.data.alreadyReturn;
                    that.each_return_rate = response.data.each_return_rate;
                    that.order_return_rate = response.data.order_return_rate;
                    that.returnAmountTotal = response.data.returnAmountTotal;
                    that.notReturn = response.data.notReturn;
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                Toast(response.msg);
            });
        },


        //返现队列详情
        toReturnInfo(id){
             this.$router.push(this.fun.getUrl('single_return_list_info', {"id":id}));
        },

      getReturnList() {
        let that = this;
        $http.get('plugin.single-return.api.single-return.get-single-return-queue', {}, '').then(function (response) {
          if (response.result == 1) {
            that.first_content=response.data;
          } else {
            Toast(response.msg);
          }
        }, function (response) {
          Toast(response.msg);
        });
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
            this.setDataByTabIndex();
        },
    },
    components: { cTitle }
}