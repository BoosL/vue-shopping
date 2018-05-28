import cTitle from 'components/title';
//import cMyextension from 'components/myextension';
export default {


  data() {
    return {
      mailLanguage: "",//商城自定义语言

      toi: this.fun.getKeyByI(),

      //是否有权限 来控制view显示
      is_agent: false,
      //总收入
      total_income: 0.00,
      //分销商
      unCommissionShow: false,
      isCommissionShow: false,
      commission_title: "",
      commission_income: 0.00,
      //区域分红
      unAreaDividendShow: false,
      isAreaDividendShow: false,
      area_dividend_title: "",
      area_dividend_income: 0,
      //团队分红
      unTeamDividendShow: false,
      isTeamDividendShow: false,
      team_dividend_title: "",
      team_dividend_income: 0,
      //招商中心
      unMerchantShow: false,
      isMerchantShow: false,
      merchant_title: "",
      merchant_income: 0,

      //微店
      unMicroShow: false,
      isMicroShow: false,
      micro_title: "",
      micro_income: 0,

      //订单返现
      unSingleReturnShow: false,
      isSingleReturnShow: false,
      singleReturn_title: "",
      singleReturn_income: 0,


      //团队等级返现
      unTeamLevelReturnShow: false,
      isTeamLevelReturnShow: false,
      teamLevelReturn_title: "",
      teamLevelReturn_income: 0,

      //消费返现
      unConsumeReturnShow: false,
      isConsumeReturnShow: false,
      consumeReturn_title: "",
      consumeReturn_income: 0,

      //满额返现
      unFullReturnShow: false,
      isFullReturnShow: false,
      fullReturn_title: "",
      fullReturn_income: 0,


      //股东分红
      unShareholderDividend: false,
      isShareholderDividend: false,
      shareholderDividend_title: "",
      shareholderDividend_income: 0,

      //分销商等级返现
      unlevelReturn: false,
      islevelReturn: false,
      levelReturn_title: "",
      levelReturn_income: 0,

      //固定奖励
      unFixedReward: false,
      isFixedReward: false,
      fixedReward_title: "",
      fixedReward_income: 0,

      //早起打卡
      unClockIn: false,
      isClockIn: false,
      clockIn_title: "",
      clockIn_income: 0,


      //讲师分红
      unVideoDemand: false,
      isVideoDemand: false,
      videoDemand_title: "",
      videoDemand_income: 0,


      info_img: "",

      //-----模块
      //是否提交审核
      isCheck: false,

      //显示模块
      becomeType_1: false,
      becomeType_2: false,
      becomeType_3: false,
      becomeType_4: false,

      become_1_info_1: "",
      become_1_info_2: "",

      become_2_info_1: "0",
      become_2_info_2: "0",
      become_2_info_3: "",

      become_3_info_1: "0",
      become_3_info_2: "0",
      become_3_info_3: "",


      become_4_info_1: "",
      become_4_info_2: "",
      become_4_info_3: "",

      para_name: "",
      para_phone: "",
      para_weixin: "",
      //-----模块

    }
  },

  activated() {
    this.initMailLanguage();
    this.toi = this.fun.getKeyByI();
    this.setUserInfo();
    this.isAgent();//获取权限 是否
    //this.getData();


  },

  mounted() {
    this.initMailLanguage();
    console.log(this.mailLanguage);
    this.toi = this.fun.getKeyByI();
    this.setUserInfo();
  },
  methods: {
    initMailLanguage() {
      this.mailLanguage = this.fun.initMailLanguage();
    },


    goback() {
      this.$router.go(-1);
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
          that.level = response.data.level_name;
          that.userAvatar = response.data.avatar;
        }

      }, function (response) {
        // error callback
      });

      // this.userName=this.$store.state.memberstate.member_model.nickname;
      // this.vipId=this.$store.state.memberstate.member_model.uid;
      // this.level=this.$store.state.memberstate.member_model.level_name;
      // this.userAvatar=this.$store.state.memberstate.member_model.avatar;
      // console.log(this.$store.state.memberstate.member_model.avatar);
    },

    isAgent() {
      let that = this;
      let json = { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
      $http.get('member.member.isAgent', json).then(function (response) {
        console.log(response)
        if (response.result == 1) {
          if (response.data.is_agent == 0)//未开启
          {
            that.is_agent = false;
            that.initExtension();//获取 申请状态接口
            that.getExtensionInfo();//获取 后台设置信息
          } else if (response.data.is_agent == 1) {//已开启
            that.is_agent = true;
            that.getData()//获取推广数据
          }
        } else {
          console.log();
        }

      }, function (response) {
        console.log(response)
      });
    },

    //获取推广数据
    getData() {
      let that = this;
      let json = { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
      $http.get('finance.income.get-income-count', json).then(function (response) {
        console.log(response)
        if (response.result == 1) {
          that.setTotalIncomeInfo(response.data);//设置总收入
          that.setCommissionInfo(response.data);//设置分销
          that.setAreaDividend(response.data);//设置区域分红
          that.setTeamDividend(response.data);//设置团队分红
          that.setMerchant(response.data);//设置招商中心
          that.setMicro(response.data);//设置微店
          that.setSingleReturn(response.data);//设置订单返现
          that.setTeamLevelReturn(response.data);//设置团队等级返现
          that.setConsumeReturn(response.data);//设置订单返现
          that.setFullReturn(response.data);//设置满额返现
          that.setShareholderDividend(response.data);//设置股东分红
          that.setLevelReturn(response.data);//分销商等级返现
          that.setFixedReward(response.data);//固定奖励
          that.setClockIn(response.data);//早起打卡
          that.setVideoDemand(response.data);//讲师分红
        } else {

        }

      }, function (response) {
        console.log(response)
      });
    },

    //设置总收入
    setTotalIncomeInfo(data) {
      this.total_income = data.total.income;
    },

    //设置团队分红
    setTeamDividend(data) {
      if (data.teamDividend == null || data.teamDividend == undefined || data.teamDividend == '') {
        this.unTeamDividendShow = false;
        return;
      }
      this.unTeamDividendShow = true;
      this.isTeamDividendShow = data.teamDividend.can;
      //this.team_dividend_title = data.teamDividend.title;
      let title = this.fun.setMailLanguage(data.teamDividend.title, this.mailLanguage.team_dividend.title);
      this.team_dividend_title = title;
      this.team_dividend_income = data.teamDividend.income;
    },

    //设置分销商
    setCommissionInfo(data) {
      if (data.commission == null || data.commission == undefined || data.commission == '') {
        this.unCommissionShow = false;
        return;
      }
      this.unCommissionShow = true;
      this.isCommissionShow = data.commission.can;
      //this.commission_title = data.commission.title;
      let title = this.fun.setMailLanguage(data.commission.title, this.mailLanguage.commission.title);
      this.commission_title = title;
      this.commission_income = data.commission.income;

    },

    //设置区域分红
    setAreaDividend(data) {
      if (data.areaDividend == null || data.areaDividend == undefined || data.areaDividend == '') {
        this.unAreaDividendShow = false;
        return;
      }
      this.unAreaDividendShow = true;
      this.isAreaDividendShow = data.areaDividend.can;
      this.area_dividend_title = data.areaDividend.title;
      this.area_dividend_income = data.areaDividend.income;
    },



    //设置招商中心
    setMerchant(data) {
      if (data.merchant == null || data.merchant == undefined || data.merchant == '') {
        this.unMerchantShow = false;
        return;
      }
      this.unMerchantShow = true;
      this.isMerchantShow = data.merchant.can;
      this.merchant_title = data.merchant.title;
      this.merchant_income = data.merchant.income;
    },

    //设置微店
    setMicro(data) {
      if (data.micro == null || data.micro == undefined || data.micro == '') {
        this.unMicroShow = false;
        return;
      }

      this.unMicroShow = true;
      this.isMicroShow = data.micro.can;
      this.micro_title = data.micro.title;
      this.micro_income = data.micro.income;
    },

    //订单返现 singleReturn
    setSingleReturn(data) {
      if (data.singleReturn == null || data.singleReturn == undefined || data.singleReturn == '') {
        this.unSingleReturn = false;
        return;
      }
      this.unSingleReturnShow = true;
      this.isSingleReturnShow = data.singleReturn.can;
      //this.singleReturn_title = data.singleReturn.title;
      let title = this.fun.setMailLanguage(data.singleReturn.title, this.mailLanguage.single_return.title);
      this.singleReturn_title = title;
      this.singleReturn_income = data.singleReturn.income;
    },

    //消费返现 setConsumeReturn
    setConsumeReturn(data) {
      if (data.consumeReturn == null || data.consumeReturn == undefined || data.consumeReturn == '') {
        this.unConsumeReturn = false;
        return;
      }

      this.unConsumeReturnShow = true;
      this.isConsumeReturnShow = data.consumeReturn.can;
      this.consumeReturn_title = data.consumeReturn.title;
      this.consumeReturn_income = data.consumeReturn.income;
      console.log('consume:', this.isConsumeReturnShow);
    },

    //满额返现 setFullReturn
    setFullReturn(data) {
      if (data.fullReturn == null || data.fullReturn == undefined || data.fullReturn == '') {
        this.unFullReturn = false;
        return;
      }

      this.unFullReturnShow = true;
      this.isFullReturnShow = data.fullReturn.can;
      //this.fullReturn_title = data.fullReturn.title;
      let title = this.fun.setMailLanguage(data.fullReturn.title, this.mailLanguage.full_return.title);
      this.fullReturn_title = title;
      this.fullReturn_income = data.fullReturn.income;

    },

    //团队等级返现 teamLevelReturn
    setTeamLevelReturn(data) {
      if (data.teamReturn == null || data.teamReturn == undefined || data.teamReturn == '') {
        this.unTeamLevelReturnShow = false;
        return;
      }

      this.unTeamLevelReturnShow = true;
      this.isTeamLevelReturnShow = data.teamReturn.can;
      //this.teamLevelReturn_title = data.teamReturn.title;
      let title = this.fun.setMailLanguage(data.teamReturn.title, this.mailLanguage.team_return.title);
      this.teamLevelReturn_title = title;
      this.teamLevelReturn_income = data.teamReturn.income;
    },

    //股东分红 shareholderDividend
    setShareholderDividend(data) {
      if (data.shaerholderDividend == null || data.shaerholderDividend == undefined || data.shaerholderDividend == '') {
        this.unShareholderDividend = false;
        return;
      }

      this.unShareholderDividend = true;
      this.isShareholderDividend = data.shaerholderDividend.can;
      this.shareholderDividend_title = data.shaerholderDividend.title;
      this.shareholderDividend_income = data.shaerholderDividend.income;
    },

    //分销商等级返现 levelReturn
    setLevelReturn(data) {
      if (data.levelReturn == null || data.levelReturn == undefined || data.levelReturn == '') {
        this.unlevelReturn = false;
        return;
      }

      this.unlevelReturn = true;
      this.islevelReturn = data.levelReturn.can;
      this.levelReturn_title = data.levelReturn.title;
      this.levelReturn_income = data.levelReturn.income;
    },

    //固定奖励
    setFixedReward(data) {
      if (data.fixedReward == null || data.fixedReward == undefined || data.fixedReward == '') {
        this.unFixedReward = false;
        return;
      }

      this.unFixedReward = true;
      this.isFixedReward = data.fixedReward.can;
      this.fixedReward_title = data.fixedReward.title;
      this.fixedReward_income = data.fixedReward.income;
    },

    //早起打卡
    setClockIn(data) {
      if (data.clockIn == null || data.clockIn == undefined || data.clockIn == '') {
        this.unClockIn = false;
        return;
      }

      this.unClockIn = true;
      this.isClockIn = data.clockIn.can;
      this.clockIn_title = data.clockIn.title;
      this.clockIn_income = data.clockIn.income;
    },

    //讲师分红
    setVideoDemand(data){
      if (data.videoDemand == null || data.videoDemand == undefined || data.videoDemand == '') {
        this.unVideoDemand = false;
        return;
      }

      this.unVideoDemand = true;
      this.isVideoDemand = data.videoDemand.can;
      this.videoDemand_title = data.videoDemand.title;
      this.videoDemand_income = data.videoDemand.income;
    },

    //跳转到区域分红
    goToAreaDividend(tag) {
      console.log(tag);
    },

    //获取设置信息
    getExtensionInfo() {
      let that = this;
      let json = { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
      $http.get('member.member.agentbase', json).then(function (response) {
        console.log(response)
        if (response.result == 1) {
          that.info_img = response.data.banner;
        } else {
          that.info_img = "";
        }

      }, function (response) {
        console.log(response)
      });
    },


    initExtension() {
      //是否提交审核
      this.isCheck = false;

      //显示模块
      this.becomeType_1 = false;
      this.becomeType_2 = false;
      this.becomeType_3 = false;
      this.becomeType_4 = false;


      this.become_1_info_1 = "";
      this.become_1_info_2 = "";

      this.become_2_info_1 = "0";
      this.become_2_info_2 = "0";
      this.become_2_info_3 = "";

      this.become_3_info_1 = "0";
      this.become_3_info_2 = "0";
      this.become_3_info_3 = "";


      this.become_4_info_1 = "";
      this.become_4_info_2 = "";
      this.become_4_info_3 = "";

      this.para_name = "";
      this.para_phone = "";
      this.para_weixin = "";


      this.getExtension();
    },

    getExtension() {
      let that = this;
      let json = { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
      $http.get('member.member.getMemberRelationInfo', json).then(function (response) {
        console.log(response)
        if (response.result == 1) {
          that.setView(response.data);

        } else {

        }

      }, function (response) {
        console.log(response)
      });
    },
    //设置view 显示
    setView(data) {
      if (data.status == 0) {
        this.setBecomeType(data.become);
        this.setBecomeTypeView(data.become, data);
      } else {
        //显示已申请
        this.becomeType_1 = false;
        this.becomeType_2 = false;
        this.becomeType_3 = false;
        this.becomeType_4 = false;

        this.isCheck = true;
      }

    },

    //设置类型显示
    setBecomeType(become) {
      if (become == 1) {
        this.becomeType_1 = true;
        this.becomeType_2 = false;
        this.becomeType_3 = false;
        this.becomeType_4 = false;
      } else if (become == 2) {
        this.becomeType_1 = false;
        this.becomeType_2 = true;
        this.becomeType_3 = false;
        this.becomeType_4 = false;
      } else if (become == 3) {
        this.becomeType_1 = false;
        this.becomeType_2 = false;
        this.becomeType_3 = true;
        this.becomeType_4 = false;
      } else if (become == 4) {
        this.becomeType_1 = false;
        this.becomeType_2 = false;
        this.becomeType_3 = false;
        this.becomeType_4 = true;
      } else {
        this.becomeType_1 = false;
        this.becomeType_2 = false;
        this.becomeType_3 = false;
        this.becomeType_4 = false;
      }
    },
    //设置类型显示view
    setBecomeTypeView(become, data) {
      if (become == 1) {
        this.become_1_info_1 = data.become1.parent_name;
        this.become_1_info_2 = data.become1.shop_name;
        this.para_name = data.become1.realname;
        this.para_phone = data.become1.mobile;
      } else if (become == 2) {
        this.become_2_info_1 = data.become2.total;
        this.become_2_info_2 = data.become2.cost;
        this.become_2_info_3 = data.become2.shop_name;
      } else if (become == 3) {
        this.become_3_info_1 = data.become3.total;
        this.become_3_info_2 = data.become3.cost;
        this.become_3_info_3 = data.become3.shop_name;
      } else if (become == 4) {
        this.become_4_info_1 = data.become4.goods_name;
        this.become_4_info_2 = data.become4.shop_name;
        this.become_4_info_3 = data.become4.goods_id;
      }
    },


    //状态1 点击
    become_1_click() {
      if (this.fun.isTextEmpty(this.para_name)) {
        Toast("请输入真实姓名");
        return;
      }

      if (this.fun.isTextEmpty(this.para_phone)) {
        Toast("请输入手机号");
        return;
      }

      if (this.fun.isMoblie(this.para_phone)) {
        Toast("请输入正确的手机号");
        return;
      }


      // if (this.fun.isTextEmpty(this.para_weixin)) {
      //     Toast("请输入微信号");
      //     return;
      // }


      let that = this;
      let _mid = window.localStorage.mid;
      let json = { mid: _mid, realname: this.para_name, mobile: this.para_phone, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
      $http.get('member.member.addAgentApply', json, "提交中...").then(function (response) {
        console.log(response)
        if (response.result == 1) {
          that.getExtension();//重新获取
        } else {

        }

      }, function (response) {
        console.log(response)
      });
    },
    //状态2 点击
    become_2_click() {
      console.log("become_2_click");
      //this.$router.push({ name: "home", params: {}, query: { i: this.toi } });
      this.$router.push(this.fun.getUrl('home', {}));
    },

    //状态3 点击
    become_3_click() {
      console.log("become_3_click");
      //this.$router.push({ name: "home", params: {}, query: { i: this.toi } });
      this.$router.push(this.fun.getUrl('home', {}));
    },

    //状态4 点击
    become_4_click(goods_id) {
      console.log(goods_id);
      //this.$router.push({ name: 'goods', params: { id: goods_id }, query: { i: this.toi } });
      this.$router.push(this.fun.getUrl('goods', { id: goods_id }));
    },

    //等待审核 处理
    isCheck_click() {
      this.$router.push({ name: "home", params: {}, query: { i: this.toi } });
      this.$router.push(this.fun.getUrl('home', {}));
    }

  },
  //components: { cTitle, cMyextension }
  components: { cTitle }
}