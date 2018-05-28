import cTitle from 'components/title';
  export default {
    data() {
        return {
            toi:this.fun.getKeyByI(),
            list: [],
            popupSpecs:false,
            //打款金额
            actual_amounts:0,
            //打款手续费
            actual_poundage:0,
            //提款金额
            amounts:0,
            //类型
            type_name:'',
            withdraw_sn:'',
            //统计佣金
            commission_amount:0,
            //统计方式
            formula:0,
            //获得佣金
            commission:0,
            //比例
            commission_rate:0,
            incomes:[],
            created_at:''

        };
    },
    methods: {

        //初始化
        init()
        {
            this.withdraw_sn="";
            this.type_name="";
            this.amounts="";
            this.created_at="";
            this.actual_poundage="";
            this.actual_amounts="";
        },

        //获取数据
        getData() {
            let that = this;
            $http.get('finance.withdraw.withdraw-info',{id:this.$route.params.record_id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep()},"").then(function (response) {
               
                if (response.result == 1) {
                    var mydata = response.data;
                    
            //打款手续费
            that.actual_poundage = mydata.actual_poundage;
            //提款金额
            that.amounts= mydata.amounts;
            //类型
            that.type_name= mydata.type_name;
            that.withdraw_sn=mydata.withdraw_sn;
            //that.incomes = mydata.incomes; 暂时取消
            that.created_at = mydata.created_at;
            that.actual_amounts = mydata.actual_amounts;
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
        screen(){
            this.popupSpecs=true;
        }

    },

activated () {
    //获取数据
    this.init();
    this.getData();
    this.toi = this.fun.getKeyByI();
    
},
    components: { cTitle }
}