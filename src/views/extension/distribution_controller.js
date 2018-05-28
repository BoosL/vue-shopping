import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default {

  data() {
    return {
      
      // userAvatar: "",
      // userName: "",

      mailLanguage:"",
      mail_distrbution_name:"",
      mail_commission:"",

      toi: this.fun.getKeyByI(),

      first_level: 0,
      second_level: 0,
      third_level: 0,

      expect: 0,
      unliquidated: 0,
      liquidated: 0,
      not_yet_withdrawed: 0,
      withdrawed: 0,
      manage:0,

      count: 0,
    }
  },

  activated() {
    
    this.toi = this.fun.getKeyByI();
    // this.userAvatar = "";
    // this.userName = "";

    this.first_level = 0;
    this.second_level = 0;
    this.third_level = 0;

    this.expect = 0;
    this.unliquidated = 0;
    this.liquidated = 0;
    this.not_yet_withdrawed = 0;
    this.withdrawed = 0;

    this.count = 0;


    this.getDistributionCommissionData();//获取分销佣金
    this.getAgentCountData();//获取我的下线总数
    this.getLevelData();//获取用户分销商等级


    this.initMailLanguage();
   
   
  },
  mounted() {
    this.toi = this.fun.getKeyByI();
    this.setUserInfo();//设置用户信息

  },

  methods: {

    initMailLanguage(){
      this.mailLanguage =this.fun.initMailLanguage();
      this.fun.setWXTitle(this.fun.setMailLanguage("分销商",this.mailLanguage.commission.agent));
      this.mail_distrbution_name=this.fun.setMailLanguage("分销等级",this.mailLanguage.commission.level_name);
      this.mail_commission=this.fun.setMailLanguage("分销",this.mailLanguage.commission.commission);
    },
    

    msg() {
      MessageBox('默认'+this.mail_commission+'比例', '因商品、供应商可以独立设置佣金，您最终获得的佣金可能与此比例不同');
    },

    //获取数据
    getLevelData() {
      let that = this;
      let json = { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
      $http.get('plugin.commission.api.commission.get-agent-level', json).then(function (response) {
        console.log(response)
        if (response.result == 1) {
          that.setDistributionInfo(response.data);
          that.setDistributionScaleInfo(response.data);
        } else {

        }

      }, function (response) {
        console.log(response)
      });
    },

    //获取分销佣金
    getDistributionCommissionData() {
      let that = this;
      let json = { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
      $http.get('plugin.commission.api.commission.get-commission', json).then(function (response) {
        console.log(response)
        if (response.result == 1) {
          that.setDistributionCommissionData(response.data);
        } else {

        }

      }, function (response) {
        console.log(response)
      });
    },
    //获取我的下线总数
    getAgentCountData() {
      let that = this;
      let json = { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
      $http.get('member.member.getMyAgentCount', json).then(function (response) {
        console.log(response)
        if (response.result == 1) {
          that.setAgentCountData(response.data);
        } else {

        }

      }, function (response) {
        console.log(response)
      });
    },


    //设置用户信息
    setUserInfo() {
      var that = this;
      let json = { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
      $http.get('member.member.getUserInfo', json).then(function (response) {
        console.log(response);
        if (response.result == 1) {
          that.userName = response.data.nickname;
          that.vipId = response.data.uid;
          that.userAvatar = response.data.avatar;
        }

      }, function (response) {
        // error callback
      });

      // this.userName = this.$store.state.memberstate.member_model.nickname;
      // this.vipId = this.$store.state.memberstate.member_model.uid;
      // this.userAvatar = this.$store.state.memberstate.member_model.avatar;
      // console.log(this.$store.state.memberstate.member_model.nickname);
    },

    //设置分销商 基本信息
    setDistributionInfo(data) {
      this.distrbution_name = data.name;
      this.distrbution_tiem = data.created_at;
    },

    //设置分销比例信息
    setDistributionScaleInfo(data) {
      this.first_level = data.first_level;
      this.second_level = data.second_level;
      this.third_level = data.third_level;
    },

    //设置分销佣金

    setDistributionCommissionData(data) {
      this.expect = data.expect;
      this.unliquidated = data.unliquidated;
      this.liquidated = data.liquidated;
      this.not_yet_withdrawed = data.not_yet_withdrawed;
      this.withdrawed = data.withdrawed;
      this.manage=data.manage;
      this.is_manage=data.is_manage=="1"?true:false;
    },

    //设置我的下线总数
    setAgentCountData(data) {
      this.count = data.count;
    }


  },
  components: { cTitle }
}