import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';
export default {
  data() {
    return {
      isCheckAll: false,
      checkAll: false,
      checkList: [],
      allCheckList: [],
      unAllCheckList: [],
      datasource: [],

      toi: window.localStorage.i,
      //是否提现到微信
      withdrawToWechat: 0,
      //是否提现到支付宝
      withdrawToAlipay: 0,
      //提现总金额
      totalwithdrawal: 0.00,
      //手续费
      poundage: 0.00,
      //劳务税
      servicetax: 0.00,

      //alipay
      isAlipay: false,
      alipay: {},

      //wechat
      isWechat: false,
      wechat: {},

      //balance
      isBalance: false,
      balance: {},

      //manual
      isManual: false,
      manual: {},

      //是否开启劳务税 手续费 单独费率
      balance_special: false,
      //单独劳务费
      independent_special: 0.00,
      //单独手续费
      independent_poundage: 0.00,

      
    }
  },


  activated() {
    this.toi = this.fun.getKeyByI();
    this.checkAll = false;
    this.checkList = [];
    this.allCheckList = [];
    this.unAllCheckList = [];
    this.datasource = [];
    this.totalwithdrawal = '0.00';
    this.poundage = '0.00';
    this.servicetax = '0.00';

    this.balance_special = false;
    this.independent_special = "0.00";
    this.independent_poundage = "0.00";
   
    this.getData();//初始化数据
    this.getWithdrawType();//获取提现方式


  },

  methods:
  {


    //获取提现方式
    getWithdrawType() {
      var that = this;
      $http.get('finance.income.get-income-withdraw-mode', {}).then(function (response) {
        if (response.result == 1) {
          that.initWithdrawType(response.data);
        } else {
          //Toast(response.msg);
        }
      }, function (response) {
        //Toast(response.msg);
      });
    },

    //初始化提现方式
    initWithdrawType(data) {
      //支付宝
      this.initAlipay(data);
      //微信
      this.initWechat(data);
      //余额
      this.initBalance(data);
      //手动打款
      this.initManual(data);
    },

    //支付宝
    initAlipay(data) {
      if (data.alipay == null || data.alipay == undefined || data.alipay == '') {
        this.isAlipay = false;
        return;
      }
      this.isAlipay = true;
      this.alipay = data.alipay;
    },

    //微信
    initWechat(data) {
      if (data.wechat == null || data.wechat == undefined || data.wechat == '') {
        this.isWechat = false;
        return;
      }
      this.isWechat = true;
      this.wechat = data.wechat;
    },

    //余额
    initBalance(data) {
      if (data.balance == null || data.balance == undefined || data.balance == '') {
        this.isBalance = false;
        return;
      }
      this.isBalance = true;
      this.balance = data.balance;
    },

    //手动打款
    initManual(data) {
      let that = this;
      if (data.manual == null || data.manual == undefined || data.manual == '') {
        this.isManual = false;
        return;
      }
      this.isManual = true;
      this.manual = data.manual;
    },

    //初始化数据
    getData() {
      var that = this;
      $http.get('finance.income-withdraw.get-withdraw', { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '正在获取列表...').then(function (response) {
        //console.log(response.data);
        if (response.result == 1) {
          var mydata = response.data;
          console.log(mydata);
          that.balance_special = response.data.setting.balance_special;
          that.datasource = response.data.data;
          that.allCheckListInit(response.data.data); //初始化全选数据
        } else {
          Toast(response.msg);
        }
      }, function (response) {
        Toast(response.msg);
      });
    },

    //初始化全选数据
    allCheckListInit(data) {
      //this.allCheckList = data;
      for (let i = 0; i < data.length; i++) {
        if (!data[i].can) {
          this.unAllCheckList.push(data[i]);
        } else {
          this.allCheckList.push(data[i]);
        }
      }
      //判断全选状态
      this.isCheckAll = !(this.unAllCheckList.length === this.datasource.length);
    },

    //全选监听
    allSelectHandle(value) {
      console.log(value.length);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allCheckList.length;
      console.log(this.checkList);
      //计算总价格
      this.countTotalPrice();
    },

    //全选
    allSelect(event) {
      console.log("全选");
      console.log(event);
      this.checkList = event.target.checked ? this.allCheckList : [];
      console.log(this.checkList);
      //计算总价格
      this.countTotalPrice();
    },

    //单选
    selectItem(value) {

    },

    //计算总价格
    countTotalPrice() {
      //提现总金额
      this.totalwithdrawal = 0.00;//初始化
      //手续费
      this.poundage = 0.00;//初始化
      //劳务费手续费
      this.servicetax = 0.00;//初始化
      //单独劳务税
      this.independent_special = 0.00;//初始化
      //单独手续费
      this.independent_poundage = 0.00;//初始化

      for (var i = 0; i < this.checkList.length; i++) {
        //this.totalwithdrawal += (this.checkList[i].income);
        //this.poundage += (this.checkList[i].goods.poundage);
        this.totalwithdrawal = this.floatAdd(this.totalwithdrawal, this.checkList[i].income);
        this.poundage = this.floatAdd(this.poundage, this.checkList[i].poundage);
        this.servicetax = this.floatAdd(this.servicetax, this.checkList[i].servicetax);

        //是否有单独余额劳务费
        if (this.balance_special) {
          this.independent_special = this.floatAdd(this.independent_special, this.checkList[i].special_service_tax);
          this.independent_poundage = this.floatAdd(this.independent_poundage, this.checkList[i].special_poundage);

        }
      }

      this.totalwithdrawal = Number(this.totalwithdrawal.toString().match(/^\d+(?:\.\d{0,2})?/))
      this.poundage = Number(this.poundage.toString().match(/^\d+(?:\.\d{0,2})?/));
      this.servicetax = Number(this.servicetax.toString().match(/^\d+(?:\.\d{0,2})?/));

      //是否有单独余额劳务费
      if (this.balance_special) {
        this.independent_special = Number(this.independent_special.toString().match(/^\d+(?:\.\d{0,2})?/));
        this.independent_poundage = Number(this.independent_poundage.toString().match(/^\d+(?:\.\d{0,2})?/));
      }
    },


    //浮点数加法运算
    floatAdd(arg1, arg2) {
      var r1, r2, m;
      try { r1 = arg1.split(".")[1].length } catch (e) { r1 = 0 }
      try { r2 = arg2.split(".")[1].length } catch (e) { r2 = 0 }
      m = Math.pow(10, Math.max(r1, r2));
      return (arg1 * m + arg2 * m) / m;
    },

    //浮点数减法运算
    floatSub(arg1, arg2) {
      var r1, r2, m, n;
      try { r1 = arg1.split(".")[1].length } catch (e) { r1 = 0 }
      try { r2 = arg2.split(".")[1].length } catch (e) { r2 = 0 }
      m = Math.pow(10, Math.max(r1, r2));
      //动态控制精度长度
      n = (r1 = r2) ? r1 : r2;
      return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },

    //提现记录
    toRecord() {
      this.$router.push(this.fun.getUrl('presentationRecord'));
    },


    //验证手动打款的 设置 微信 支付 银行卡 是否完善
    checkManual(type) {

      //验证是否选择提现数据
      if (!this.checkWithdrawToBalance()) {
        return;
      }
      var that = this;
      $http.post('finance.manual-type.is-can-submit', {}, '').then(function (response) {
        if (response.result == 1) {
          if (response.data.status) {
            that.withdrawToBalance(type);//提现
          } else {
            that.setManualInfo(type, response.data.manual_type);
          }
        } else {
          MessageBox('提示', response.msg);
        }
      }, function (response) {
        MessageBox('提示', response);
      });
    },

    setManualInfo(type, manual_type) {

      let msg = "";
      let routerPath = "";

      switch (manual_type) {
        case "bank":
          msg = "请先填写银行卡信息";
          routerPath = "memberBank";
          break;
        case "wechat":
          msg = "请先填写微信信息";
          routerPath = "info";
          break;
        case "alipay":
          msg = "请先填写支付宝信息";
          routerPath = "info";
          break;
        default:
          break;
      }

      let that = this;

      this.$dialog.confirm({
        title: '提示',
        mes: msg,
        opts: [
          {
            txt: '取消',
            color: false,
            callback: () => {

            }
          },
          {
            txt: '确定',
            color: true,
            callback: () => {
              that.$router.push(that.fun.getUrl(routerPath, {}));
            }
          }
        ]
      });
    },

    //验证是否选择提现数据
    checkWithdrawToBalance() {
      if (parseFloat(this.totalwithdrawal) <= 0 || this.totalwithdrawal == null) {
        MessageBox.alert('提现金额不能等于0');
        return false;
      } else {
        return true;
      }
    },

    //提现网络操作
    withdrawToBalance(type) {
      //验证是否选择提现数据
      if (!this.checkWithdrawToBalance()) {
        return;
      }

      if (this.checkList.length > 0) {
        var data = { total: { amounts: this.totalwithdrawal, poundage: this.poundage, pay_way: type }, withdrawal: this.checkList };
        var that = this;
        $http.post('finance.Income-withdraw.save-withdraw', { data: data }, '正在提交数据...').then(function (response) {
          console.log(response.data);
          if (response.result == 1) {
            MessageBox('提示', response.msg);
            that.$router.go(-1);
          } else {
            MessageBox('提示', response.msg);
          }
        }, function (response) {
          MessageBox('提示', response);
        });

      } else {
        MessageBox('提示', '提现数据不可为空');
      }
    }
  },

  components: { cTitle }
}
