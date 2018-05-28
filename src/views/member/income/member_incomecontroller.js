import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      mailLanguage: "",

      toi: this.fun.getKeyByI(),
      //提现总金额
      total_income: 0,
      //可提现
      income: 0,
      //插件数据源
      plugs: []
    }
  },

  methods: {
    initMailLanguage() {
      this.mailLanguage = this.fun.initMailLanguage();
    },
    //获取总的收入
    getData() {
      var that = this;
      $http.get('finance.income.get-income-count', { status: "", "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '正在获取列表...').then(function (response) {
        //console.log(response.data);
        if (response.result == 1) {
          var mydata = response.data;
          that.total_income = mydata.total.income;
        } else {

        }
      }, function (response) {

      });
    },

    //可提现的收入
    getData2() {
      var that = this;
      $http.get('finance.income.get-income-count', { status: "0", "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '正在获取列表...').then(function (response) {
        //console.log(response.data);
        if (response.result == 1) {
          that.income = response.data.total.income;
          that.setPlugsData(response.data);//处理插件数据
        } else {

        }
      }, function (response) {
        // error callback
      });

    },

    //处理插件数据
    setPlugsData(data) {
      this.setCommissionPlugs(data); //分销插件
      this.setAreaDividendPlugs(data); //区域分红插件
      this.setTeamDividendPlugs(data); //团队分红插件
      this.setMicroPlugs(data); //微店插件
      this.setMerchantPlugs(data); //招商插件
      this.setSingleReturnPlugs(data);//订单返现插件
      this.setShareholderDividendPlugs(data);//股东分红
      this.setLevelReturnPlugs(data);//分销商等级反
      this.setTeamReturnPlugs(data);//团队返现
      this.setFixedRewardPlugs(data);//固定奖励
      this.setClockInPlugs(data);//早起打卡 
      this.setConsumeReturnPlugs(data);//消费返现
      this.setFullReturnPlugs(data);//满额赠送
      this.setVideoDemandPlugs(data);//讲师分红
    },

    //分销插件
    setCommissionPlugs(data) {
      if (data.commission == null || data.commission == undefined || data.commission == '') {
        return;
      }

      let mailCommissionTitle = this.fun.setMailLanguage("分销", this.mailLanguage.commission.title);
      data.commission.type_name = mailCommissionTitle;
      this.plugs.push(data.commission);
    },

    //区域分红插件
    setAreaDividendPlugs(data) {
      if (data.areaDividend == null || data.areaDividend == undefined || data.areaDividend == '') {
        return;
      }
      this.plugs.push(data.areaDividend);
    },

    //团队分红插件
    setTeamDividendPlugs(data) {
      if (data.teamDividend == null || data.teamDividend == undefined || data.teamDividend == '') {
        return;
      }
      let mailTeamDividendTitle = this.fun.setMailLanguage("经销商管理", this.mailLanguage.team_dividend.title);
      data.teamDividend.type_name = mailTeamDividendTitle;
      this.plugs.push(data.teamDividend);
    },


    //微店插件

    setMicroPlugs(data) {
      if (data.micro == null || data.micro == undefined || data.micro == '') {
        return;
      }
      this.plugs.push(data.micro);
    },


    //招商插件
    setMerchantPlugs(data) {
      if (data.merchant == null || data.merchant == undefined || data.merchant == '') {
        return;
      }
      this.plugs.push(data.merchant);
    },

    //订单返现插件
    setSingleReturnPlugs(data) {
      if (data.singleReturn == null || data.singleReturn == undefined || data.singleReturn == '') {
        return;
      }
      let mailSingleReturnTitle = this.fun.setMailLanguage("消费赠送", this.mailLanguage.single_return.title);
      data.singleReturn.type_name = mailSingleReturnTitle;
      this.plugs.push(data.singleReturn);
    },

    //股东分红插件
    setShareholderDividendPlugs(data) {
      if (data.shaerholderDividend == null || data.shaerholderDividend == undefined || data.shaerholderDividend == '') {
        return;
      }
      this.plugs.push(data.shaerholderDividend);
    },

    //分销商等级反
    setLevelReturnPlugs(data) {
      if (data.levelReturn == null || data.levelReturn == undefined || data.levelReturn == '') {
        return;
      }
      this.plugs.push(data.levelReturn);
    },

    //团队返现
    setTeamReturnPlugs(data) {
      if (data.teamReturn == null || data.teamReturn == undefined || data.teamReturn == '') {
        return;
      }
      let mailTeamReturnTitle = this.fun.setMailLanguage("经销商奖励", this.mailLanguage.team_return.title);
      data.teamReturn.type_name = mailTeamReturnTitle;
      this.plugs.push(data.teamReturn);
    },

    //固定奖励
    setFixedRewardPlugs(data) {
      if (data.fixedReward == null || data.fixedReward == undefined || data.fixedReward == '') {
        return;
      }
      this.plugs.push(data.fixedReward);
    },

    //早起打卡
    setClockInPlugs(data) {
      if (data.clockIn == null || data.clockIn == undefined || data.clockIn == '') {
        return;
      }
      this.plugs.push(data.clockIn);
    },

    //消费返现
    setConsumeReturnPlugs(data) {
      if (data.consumeReturn == null || data.consumeReturn == undefined || data.consumeReturn == '') {
        return;
      }
      this.plugs.push(data.consumeReturn);
    },
    //满额赠送
    setFullReturnPlugs(data) {
      if (data.fullReturn == null || data.fullReturn == undefined || data.fullReturn == '') {
        return;
      }
      this.plugs.push(data.fullReturn);
    },
    //讲师分红
    setVideoDemandPlugs(data){
      if (data.videoDemand == null || data.videoDemand == undefined || data.videoDemand == '') {
        return;
      }
      this.plugs.push(data.videoDemand);
    },




    //验证手机身份
    gotoIncome() {
      let that = this;
      $http.get('member.member.withdrawByMobile', {}, '').then(function (response) {

        if (response.result == 1) {
          if (response.data.is_bind_mobile == 1) {
            that.$router.push(that.fun.getUrl('withdrawEditmobile', {}));
          } else {
            that.$router.push(that.fun.getUrl('withdrawal', {}));
          }
        } else {
          MessageBox.alert(response.msg);
        }
      }, function (response) {
        MessageBox.alert(response.msg);
      });
    },


  },
  activated() {
    this.initMailLanguage();
    this.plugs = [];
    this.toi = this.fun.getKeyByI();
    this.getData();//获取总的收入
    this.getData2();//可提现的收入
  },
  components: { cTitle }
}