import cTitle from 'components/title';
import { mapState, mapMutations } from 'vuex';
import { Indicator, Toast } from 'mint-ui';
import { Switch } from 'mint-ui';

import { Field } from 'mint-ui';
import { Button } from 'mint-ui';

import { Picker } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import Fun from '../../fun';

//import cOrder from 'components/order';

const TAG_ACTION_BUY = "-2";//直接购买
const TAG_ACTION_CART = "-1";//1购物车结算
var _root_tag = "";//0 直接购买 1购物车结算
var _goodsId = "";
var _optionsId = "";
var _total = 1;
var currentAddId = "";
var currentAddress = {};
var _cart_ids = [];
export default {
  data() {
    return {
      onclast: false,
      toi: this.fun.getKeyByI(),
      goodsInfo: {},
      order: {},
      dispatch: {},
      realname: "",//收件人
      mobile: "",
      address: "",
      goods: [],
      confirmPay: '',
      goods_price: 0.00,
      dispatch_price: 0.00,
      price: 0.00,
      discount_price: 0,
      popupSpecs: false,
      addressData: [],
      payPrice: 0,
      loadDiscount: false,

      //优惠券
      popupCouponSpecs: false,
      coupon_size: 0,
      checkCouponList: [],
      use_coupon_size: 0,

      //积分抵扣 其他抵扣
      checkDeductionList: [],
      deductionItem: {},

      //支付
      order_ids: '',
      balance: 0,
      payParams: '',
      info_form: {},
      order_sn: '',
      money: '',
      buttons: [],
      pay_sn: '订单编号',
      order_pay_id: '',
      uid: '',
      isdisabled: false,

      payType: [],
      confirmOrderStatus: false,

      store: {
        name: '',
        thumb: ''
      },
      income: {
        money_total: 0.00,
        sure_withdraw_money: 0.00
      },
      store_set: {
        is_cash_pay: '',
        is_open_cashier: '',
        is_write_information: ''
      },
      form: {
        mobile: '',
        realname: ''
      },
      typename: "",



      popupSpecs: false,
      pwds: [],
      pwd: "",
      pw1: "",
      pw2: "",
      pw3: "",
      pw4: "",
      pw5: "",
      pw6: "",
    }
  },


  activated() {
    //优惠券
    this.popupCouponSpecs = false;
    this.coupon_size = 0;
    this.use_coupon_size = 0;
    this.checkCouponList = [];
    this.coupons = [];

    this.init();
    //抵扣
    this.checkDeductionList = [];

    this.initStore();
    this.initPayType();


  },

  mounted() {
    console.log(this.$route.params.store_id);

    this.popupSpecs = false;

  },
  methods: {


    init() {
      this.popupSpecs = false;
      this.initPop();
    },


    initStore() {
      var that = this;
      this.confirmOrderStatus = false;
      this.confirmPay = '';
      this.realname = '';
      this.mobile = '';
      this.popupCouponSpecs = false;
      this.order_ids = '';
      $http.get('plugin.store-cashier.frontend.cashier.center.index', {
        "i": this.fun.getKeyByI(),
        "store_id": this.$route.params.store_id,
        "type": this.fun.getTyep()
      }).then(function (response) {

        console.log("cashier::", response);
        if (response.result == 1) {
          console.log("cashier::", response.data);
          that.store = response.data.store;
          that.income = response.data.income;
          that.store_set = response.data.store_set;
          //that.credit = myData.credit;
        } else {
          MessageBox.alert(response.msg);
        }

      }, function (response) {
        // error callback
      });
    },
    initPayType() {
      let that = this;

      $http.get('plugin.store-cashier.frontend.payment.list', { "store_id": this.$route.params.store_id }, "生成中...").then(function (response) {
        console.log("支付方式", response.data)
        if (response.result == 1) {
          that.payType = response.data;
          that.typename = "支付";
          //that.order = response.data.order;
          //that.dispatch = response.data.dispatch;
          /*
           that.setAddressViewData(response.data.dispatch.default_member_address);//设置地址界面*/
        } else {
          Toast(response.msg);
          that.$router.go(-1);
        }
      }, function (response) {
        console.log(response);
      });
    },

    //直接购买
    preGoodsBuy() {
      let that = this;
      let json = {
        price: this.payPrice,
        store_id: this.$route.params.store_id,
        member_coupon_ids: this.assembleCoupons(),
        orders: JSON.stringify(this.assembleDeduction()),
        mobile: this.form.mobile,
        realname: this.form.realname
      };

      $http.get('plugin.store-cashier.frontend.Order.goods-buy', json, "生成中...").then(function (response) {
        console.log("预下单", response.data)
        if (response.result == 1) {
          //that.order = response.data.order;
          //that.dispatch = response.data.dispatch;
          that.setViewData(response.data);//设置界面
          /*
          that.setAddressViewData(response.data.dispatch.default_member_address);//设置地址界面*/
          that.initCoupon(response.data.discount.coupon);//设置优惠券信息
        } else {
          Toast(response.msg);
          that.$router.go(-1);

        }
      }, function (response) {
        console.log(response);
      });
    },


    //设置界面
    setViewData(data) {

      this.order_data = data.order_data;
      console.log("orderData:", this.order_data[0]);
      this.loadDiscount = true;
      this.goods_price = data.total_goods_price;//设置商品总价格
      this.dispatch_price = data.total_dispatch_price;//设置总运费价格
      this.discount_price = data.total_discount_price;//设置总优惠价格
      this.deduction_price = data.total_deduction_price;//设置总抵扣价格
      this.price = data.total_price;//设置总价格（合计）
      // this.goods = data.order.order_goods;
      // this.goods_price = data.order.goods_price;
      // this.dispatch_price = data.order.dispatch_price;
      // this.price = data.order.price;
    },

    //提交订单
    submit(val) {
      console.log('paypaypay');
      let that = this;
      let json = this.assembleJson();
      $http.get('plugin.store-cashier.frontend.Order.create', json, "提交中...").then(function (response) {
        //$http.get('plugin.store-cashier.frontend.cashier.center.index', json, "提交中...").then(function (response) {
        console.log(response.data)
        if (response.result == 1) {
          that.order_ids = response.data.order_ids;
          console.log("创建订单：", response.data.order_ids);
          that.getMultipleOrderInfo(val);
          //that.$router.push({ name: "orderlist", params: { status: "1" }, query: { i: that.toi } });
          //status:"2" 合并支付
          //that.$router.push({ name: "orderpay", params: { status: "2", order_ids: response.data.order_ids }, query: { i: that.toi } });

          //that.$router.push(that.fun.getUrl('orderpay', {status: "2", order_ids: response.data.order_ids}));
        } else {
          Toast(response.msg);
        }
      }, function (response) {
        console.log(response);
      });
    },

    //组装json数据
    assembleJson() {
      let json = {};
      json = {
        "i": this.fun.getKeyByI(),
        "type": this.fun.getTyep(),
        price: this.payPrice,
        store_id: this.$route.params.store_id,
        member_coupon_ids: JSON.stringify(this.assembleCoupons()),
        orders: JSON.stringify(this.assembleDeduction()),
        mobile: this.form.mobile,
        realname: this.form.realname
      };

      return json;
    },
    //组装商品信息
    assembleGoods() {
      let newGoods = [];

      for (let j = 0; j < this.goodsInfo.order_data.length; j++) {
        for (let i = 0; i < this.goodsInfo.order_data[j].order.order_goods.length; i++) {
          let model = new Object();
          model.goods_id = this.goodsInfo.order_data[j].order.order_goods[i].goods_id;
          model.total = this.goodsInfo.order_data[j].order.order_goods[i].total;
          model.option_id = this.goodsInfo.order_data[j].order.order_goods[i].goods_option_id;
          newGoods.push(model);
        }
      }
      return newGoods;
    },

    //组装优惠券json信息
    assembleCoupons() {
      let coupons = [];

      for (let i = 0; i < this.checkCouponList.length; i++) {
        coupons.push(this.checkCouponList[i].id);
      }

      return coupons;
    },
    //组装优惠抵扣信息
    assembleDeduction() {
      let deductions = [];

      for (let i = 0; i < this.checkDeductionList.length; i++) {
        //this.checkDeductionList[i].deduction_ids = this.checkDeductionList[i].deduction_ids.join(',');
        deductions.push(this.checkDeductionList[i]);
      }

      return deductions;
    },


    //初始化优惠券
    initCoupon(coupon) {
      if (coupon != undefined && coupon != "" && coupon != null) {
        this.coupon_size = coupon.length;
      }
      this.coupons = coupon;
    },

    //优惠券
    showCoupon() {
      if (this.coupon_size == 0) {
        Toast("暂无优惠券使用");
        return;
      }
      console.log("showCoupon");
      this.popupCouponSpecs = true;
    },

    //选择优惠券
    selectCoupon(value) {
      //处理选择
      this.screenCoupon(value);
      //设置view
      this.setCouponView();

      //重新计算
      this.preGoodsBuy();//直接购买

    },

    //筛选数据优惠券状态
    screenCoupon(value) {

      if (value.target.checked)//选中添加
      {
        if (this.checkCouponList.length > 0) {
          for (let i = 0; i < this.checkCouponList.length; i++) {
            if (this.checkCouponList[i].id == value.target._value.id) {
              this.checkCouponList.splice(i, 1);
            }
          }
          this.checkCouponList.push(value.target._value);
        } else {
          this.checkCouponList.push(value.target._value);
        }

      } else {//取消选中
        if (this.checkCouponList.length > 0) {
          for (let i = 0; i < this.checkCouponList.length; i++) {
            if (this.checkCouponList[i].id == value.target._value.id) {
              this.checkCouponList.splice(i, 1);
            }
          }
        }
      }
    },

    //设置view
    setCouponView() {
      this.use_coupon_size = this.checkCouponList.length;
    },


    //抵扣选择响应
    discountHandle(item, value) {
      console.log("discount::::", value);
      //处理选择
      this.screenDiscount(item, value);

      //重新计算
      this.preGoodsBuy();//直接购买

    },

    //筛选抵扣
    screenDiscount(item, value) {
      
      console.log("value::::", value);

      //临时数据
      let _deductionItem=new Object;
      let tempDeduction_ids = [];
     
      if (value.checked)//选中添加
      {

          if (this.checkDeductionList.length > 0) {
              for (let i = 0; i < this.checkDeductionList.length; i++) {
                  if (this.checkDeductionList[i].pre_id == item.order.pre_id) {
                      //先获取回来
                      if(this.fun.isTextEmpty(this.checkDeductionList[i].deduction_ids))
                      {
                          tempDeduction_ids=[];
                      }else{
                          tempDeduction_ids = this.checkDeductionList[i].deduction_ids;
                      }
                     
                      this.checkDeductionList.splice(i, 1);
                      break;
                  }
              }

              if(tempDeduction_ids.length>0){
                  
                  for(let j=0;j<tempDeduction_ids.length;j++){
                      if(tempDeduction_ids[j]==value.code){
                          tempDeduction_ids.splice(j, 1);
                      }
                  }

                  tempDeduction_ids.push(value.code);
                  _deductionItem.deduction_ids = tempDeduction_ids;
                  _deductionItem.pre_id = item.order.pre_id;
                  this.checkDeductionList.push(_deductionItem);
                  
              }else{
                 
                  tempDeduction_ids.push(value.code);
                  _deductionItem.deduction_ids = tempDeduction_ids;
                  _deductionItem.pre_id = item.order.pre_id;
                  this.checkDeductionList.push(_deductionItem);
                  
              }
              

             
              // if (tempDeduction_ids.indexOf(value.code) <= 0) {
              //     tempDeduction_ids.push(value.code);
              //     _deductionItem.deduction_ids = tempDeduction_ids;
              //     _deductionItem.pre_id = item.order.pre_id;
              //     this.checkDeductionList.push(_deductionItem);
              //     console.log("LengthPush:",_deductionItem);
              // }

          } else {

              if(tempDeduction_ids.length>0){
                  for(let j=0;j<tempDeduction_ids.length;j++){
                      if(tempDeduction_ids[j]==value.code){
                          tempDeduction_ids.splice(j, 1);
                      }
                  }

                  tempDeduction_ids.push(value.code);
                  _deductionItem.deduction_ids = tempDeduction_ids;
                  _deductionItem.pre_id = item.order.pre_id;
                  this.checkDeductionList.push(_deductionItem);
                 
              }else{
                  tempDeduction_ids.push(value.code);
                  _deductionItem.deduction_ids = tempDeduction_ids;
                  _deductionItem.pre_id = item.order.pre_id;
                  this.checkDeductionList.push(_deductionItem);
                 
              }

              // if (tempDeduction_ids.indexOf(value.code) <= 0) {
              //     tempDeduction_ids.push(value.code);
              //     _deductionItem.deduction_ids = tempDeduction_ids;
              //     _deductionItem.pre_id = item.order.pre_id;
              //     this.checkDeductionList.push(_deductionItem);
              //     console.log("LengthPush:", _deductionItem);
              // }

          }

      }
      else {//取消选中
          if (this.checkDeductionList.length > 0) {
              for (let i = 0; i < this.checkDeductionList.length; i++) {
                  if (this.checkDeductionList[i].pre_id == item.order.pre_id) {
                     //先获取回来
                     if(this.fun.isTextEmpty(this.checkDeductionList[i].deduction_ids))
                     {
                         tempDeduction_ids=[];
                     }else{
                         tempDeduction_ids = this.checkDeductionList[i].deduction_ids;
                     }
                      this.checkDeductionList.splice(i, 1);
                      break;
                  }
              }


              if(tempDeduction_ids.length>0){
                  for(let j=0;j<tempDeduction_ids.length;j++){
                      if(tempDeduction_ids[j]==value.code){
                          tempDeduction_ids.splice(j, 1);
                      }
                  }

                  //tempDeduction_ids.push(value.code);
                  _deductionItem.deduction_ids = tempDeduction_ids;
                  _deductionItem.pre_id = item.order.pre_id;
                  this.checkDeductionList.push(_deductionItem);
                  
              }else{
                  //tempDeduction_ids.push(value.code);
                  _deductionItem.deduction_ids = tempDeduction_ids;
                  _deductionItem.pre_id = item.order.pre_id;
                  this.checkDeductionList.push(_deductionItem);
                 
              }


             

              // if (tempDeduction_ids.indexOf(value.code) > -1) {
              //     tempDeduction_ids.removeByValue(value.code);
              //     _deductionItem.deduction_ids = tempDeduction_ids;
              //     _deductionItem.pre_id = item.order.pre_id;
              //     this.checkDeductionList.push(_deductionItem);
              //     console.log("LengthPush:", _deductionItem);
              // }
          }else{
              if(tempDeduction_ids.length>0){
                  for(let j=0;j<tempDeduction_ids.length;j++){
                      if(tempDeduction_ids[j]==value.code){
                          tempDeduction_ids.splice(j, 1);
                      }
                  }

                  //tempDeduction_ids.push(value.code);
                  _deductionItem.deduction_ids = tempDeduction_ids;
                  _deductionItem.pre_id = item.order.pre_id;
                  this.checkDeductionList.push(_deductionItem);
              }else{
                  //tempDeduction_ids.push(value.code);
                  _deductionItem.deduction_ids = tempDeduction_ids;
                  _deductionItem.pre_id = item.order.pre_id;
                  this.checkDeductionList.push(_deductionItem);
              }
              // if (tempDeduction_ids.indexOf(value.code) > -1) {
              //     tempDeduction_ids.removeByValue(value.code);
              //     _deductionItem.deduction_ids = tempDeduction_ids;
              //     _deductionItem.pre_id = item.order.pre_id;
              //     this.checkDeductionList.push(_deductionItem);
              //     console.log("LengthPush:", _deductionItem);
              // }
          }
      }
      
      console.log('checkList:', this.checkDeductionList);


  },

    //支付部分
    confirm(btn) {
      var that = this;
      let type = btn.value;
      //type-1 微信, type-2 支付宝 ,type-6 云收银支付
      if (type == 1) {
        this.getWeChatPayParams();
      } else if (type == 2) {
        //order.pay.alipay , order_id
        that.$router.push(this.fun.getUrl('alipay', { status: 2, recharge_money: 22, order_pay_id: this.order_pay_id, uid: that.uid }));
      } else if (type == 9) {
        that.appWeiPay();
      } else if (type == 10) {
        that.appAliPay();
      } else if (type == 'cashPay') {
        that.cashPay();
      } else if (type == 6) {
        this.getWeChatPayParams2();

      } else if (type == 3) {
        //是否开启余额密码支付
        if (btn.need_password == 1) {
          this.showPwdPop();
        } else {
          that.balancePay("");//无密码
        }
      }else if(type == 12){
        this.newWechatPay();
      }else if(type == 7) {//云收银支付宝
        this.cloudAlipay();
      }

    },

    //云收银支付宝
    cloudAlipay() {
      var that = this;
      let json = { order_pay_id: that.order_pay_id };
      $http.get('order.merge-pay.cloudAliPay', json, '').then(function (response) {
        if (response.result == 1) {
          that.$router.push(that.fun.getUrl('alipayCloud', { status: "8", url: response.data }));
        } else {
          MessageBox.alert(response.msg, '提示');
        }
      }, function (response) {
        // error callback
        MessageBox.alert(response.msg, '提示');
      });
    },
    balancePay(password) {
      var that = this;
      let json={ order_pay_id: that.order_pay_id, "i": that.fun.getKeyByI(), "type": that.fun.getTyep() };

      if(!this.fun.isTextEmpty(password))
      {
        json={ order_pay_id: that.order_pay_id, "i": that.fun.getKeyByI(), "type": that.fun.getTyep(),payment_password: password};
      }
      $http.get('order.credit-merge-pay.credit2', json,"").then(function (response) {
        if (response.result == 1) {
          MessageBox.alert(response.msg, '提示');
          that.$router.push(that.fun.getUrl('member'));
        } else {
          MessageBox.alert(response.msg, '提示');
          that.$router.push(that.fun.getUrl('orderdetail', { order_id: that.order_pay_id }));

        }
      }, function (response) {
        // error callback
      });

    },
    cashPay() {
      var that = this;
      $http.get('plugin.store-cashier.frontend.payment.cashPay.cashPay', { order_pay_id: this.order_pay_id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }).then(function (response) {
        if (response.result == 1) {
          MessageBox.alert(response.msg, '提示');
          that.$router.push(that.fun.getUrl('member'));
        } else {
          MessageBox.alert(response.msg, '提示');
          that.$router.push(that.fun.getUrl('orderdetail', { order_id: that.order_pay_id }));

        }
      }, function (response) {
        // error callback
      });

    },


    //12新版微信
    newWechatPay() {
      var that = this;
      let json = { order_pay_id: that.order_pay_id};
      $http.get('order.merge-pay.yunPayWechat', json, "").then(function (response) {
        if (response.result == 1) {
          //wx.config(response.data.js);
          that.newWXPay(response.data);
        } else {
          MessageBox.alert(response.msg, '提示');
        }
      }, function (response) {
        // error callback
      });
    },
    newWXPay(payParams) {
      var that = this;
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          "appId": payParams.appId,     //公众号名称，由商户传入     
          "timeStamp": payParams.timeStamp,         //时间戳，自1970年以来的秒数     
          "nonceStr": payParams.nonceStr, //随机串     
          "package": payParams.package,
          "signType": payParams.signType,         //微信签名方式：     
          "paySign": payParams.paySign //微信签名 
        },
        
        function (res) {
           // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            that.$router.go(-1);
            MessageBox.alert('支付成功', '提示');
           }else{
            MessageBox.alert('支付失败', '提示');
           }    
        }
      );
    },

    appWeiPay() {
      var that = this;
      $http.get('order.merge-pay.wechatAppPay', { order_pay_id: that.order_pay_id, "i": that.fun.getKeyByI() }).then(function (response) {
        if (response.result == 1) {
          YDB.SetWxpayInfo(that.$store.state.temp.system.name, "订单号：" + that.order_sn, that.money, that.order_sn, that.fun.getKeyByI());
        } else {
          MessageBox.alert(response.msg, '提示');
        }
      }, function (response) {
        // error callback
      });


    },
    appAliPay() {
      var that = this;
      $http.get('order.merge-pay.alipayAppRay', { order_pay_id: that.order_pay_id, "i": that.fun.getKeyByI() }).then(function (response) {
        if (response.result == 1) {
          YDB.SetAlipayInfo(that.$store.state.temp.system.name, that.fun.getKeyByI(), that.money, that.order_sn);
        } else {
          MessageBox.alert(response.msg, '提示');
        }
      }, function (response) {
        // error callback
      });

    },
    //多订单合并支付获取信息接口方法
    getMultipleOrderInfo(val) {
      //order.pay.wechatPay
      var that = this;

      $http.get('order.merge-pay', { order_ids: this.order_ids, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }).then(function (response) {

        if (response.result == 1) {
          that.order_sn = response.data.order_pay.pay_sn;
          that.balance = response.data.member.credit2;
          that.money = response.data.order_pay.amount;
          that.uid = response.data.order_pay.uid;
          that.order_pay_id = response.data.order_pay.id;//支付id
          that.buttons = response.data.buttons;
          that.confirm(val);

          let isApp = Fun.isApp();
        } else {

          MessageBox({
            title: '提示',
            message: response.msg,
            showCancelButton: true
          }).then(action => {

            if (action == 'confirm') {
              that.$router.push(that.fun.getUrl('home'));
            }
          });
        }
      }, function (response) {
        // error callback

      });
    },

    getWeChatPayParams() {
      //order.pay.wechatPay
      var that = this;
      $http.get('order.merge-pay.wechatPay', { order_pay_id: this.order_pay_id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }).then(function (response) {
        if (response.result == 1) {

          wx.config(response.data.js);
          that.WXPay(response.data.config);

        } else {

          MessageBox.alert(response.msg, '提示');
          that.$router.push(that.fun.getUrl('orderdetail', { order_id: that.order_pay_id }));

        }
      }, function (response) {
        // error callback
      });
    },
    getWeChatPayParams2() {
      //order.pay.wechatPay
      var that = this;
      $http.get('order.merge-pay.cloudWechatPay', { order_pay_id: this.order_pay_id }).then(function (response) {
        if (response.result == 1) {
          console.error(666666666, response.data)
          window.location.href = response.data;

          //wx.config(response.data.js);
          //that.WXPay(response.data.config);

        } else {

          MessageBox.alert(response.msg, '提示');
          that.$router.push(that.fun.getUrl('orderdetail', { order_id: that.order_pay_id }));

        }
      }, function (response) {
        // error callback
      });
    },
    initHtml() {
      this.balance = this.$store.state.balance;

    },
    changePayStatus() {
      console.log('click.....');
      if (this.confirmOrderStatus) {
        this.confirmOrderStatus = false;
        this.isdisabled = false;
      }
    },
    confirmOrder() {
      var val = this.confirmPay;
      if (val && val > 0) {
        this.payPrice = val;
        this.preGoodsBuy();
        this.confirmOrderStatus = true;
        this.isdisabled = true;
      } else {
        MessageBox.alert('请输入正确的付款金额！');
        this.confirmOrderStatus = false;
        this.isdisabled = false;
      }
    },
    WXPay(payParams) {
      //alert(document.location.href);
      //console.log(""+payParams.timestamp);
      var that = this;
      wx.chooseWXPay({
        appId: payParams.appId,
        timestamp: payParams.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: payParams.nonceStr, // 支付签名随机串，不长于 32 位
        package: payParams.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: payParams.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: payParams.paySign, // 支付签名
        success: function (res) {
          // 支付成功后的回调函数
          if (res.errMsg == "chooseWXPay:ok") {
            that.$router.push(that.fun.getUrl('member'));

            MessageBox.alert('支付成功', '提示');
            //that.$router.push({name:'PayYes',params:{order_id:}});
          } else {
            MessageBox.alert('支付失败', '提示');
          }
        },
        cancel: function (res) {
          //支付取消
        },
        fail: function (res) {
          MessageBox.alert('支付失败，请返回重试', '提示');
        }
      });
    },
    btnclass(type) {
      if (type == 1 || type == 6 || type == 9) {
        return 'bg_wechat';
      } else if (type == 2 || type == 10) {
        return 'bg_alipay';
      } else {
        return 'bg_ali';
      }
    },




    //初始化pop
    initPop() {
      this.pwds = [];
      this.pwd = "";
      this.pw1 = "";
      this.pw2 = "";
      this.pw3 = "";
      this.pw4 = "";
      this.pw5 = "";
      this.pw6 = "";
    },

    showPwdPop() {
      this.initPop();
      this.popupSpecs = true;
    },

    hidePwdPop() {
      this.popupSpecs = false;

    },

    //密码组装
    onPassword(value) {
      if (this.pwd.length < 6) {
        this.pwd = this.pwd + value;
        this.setPwdView();//设置密码显示
      }
      if (this.pwd.length == 6) {
        this.hidePwdPop();
        this.getVerifyPassword(this.pwd);//请求密码验证接口
        this.pwd = "";//复位
      }

    },

    //设置密码 view显示
    setPwdView() {
      let pwdLength = this.pwd.length;
      if (pwdLength <= 0) {
        return;
      }
      switch (pwdLength) {
        case 1:
          this.pw1 = this.pwd.substring(0, 1);
          break;
        case 2:
          this.pw2 = this.pwd.substring(1, 2);
          break;
        case 3:
          this.pw3 = this.pwd.substring(2, 3);
          break;
        case 4:
          this.pw4 = this.pwd.substring(3, 4);
          break;
        case 5:
          this.pw5 = this.pwd.substring(4, 5);
          break;
        case 6:
          this.pw6 = this.pwd.substring(5, 6);
          break;
        default:
          break;
      }
    },

    //删除密码
    pwdDelete() {
      let pwdLength = this.pwd.length;
      if (pwdLength <= 0) {
        return;
      }
      let that = this;

      switch (pwdLength) {
        case 1:
          this.pwd = this.pwd.substring(0, 0);
          this.pw1 = "";
          break;
        case 2:
          this.pwd = this.pwd.substring(0, 1);
          this.pw2 = "";
          break;
        case 3:
          this.pwd = this.pwd.substring(0, 2);
          this.pw3 = "";
          break;
        case 4:
          this.pwd = this.pwd.substring(0, 3);
          this.pw4 = "";
          break;
        case 5:
          this.pwd = this.pwd.substring(0, 4);
          this.pw5 = "";
          break;
        case 6:
          this.pwd = this.pwd.substring(0, 5);
          this.pw6 = "";
          break;
        default:
          break;
      }

    },


    //验证密码
    getVerifyPassword(pwd) {
      //order.pay.wechatPay
      var that = this;
      $http.get('payment.password.check', { password: pwd }, "").then(function (response) {
        if (response.result == 1) {
          that.balancePay(pwd);

        } else {
          MessageBox({
            title: '提示',
            message: response.msg,
            showCancelButton: true
          }).then(action => {
            if (action == 'confirm') {
              if (response.data.code == 2001)//商城支付密码设置未开启
              {
                //that.$router.go(-1);
              } else if (response.data.code == 2002)//用户未设置支付密码
              {
                //去设置密码
                that.$router.push(that.fun.getUrl('set_balance_password', {}));
              } else if (response.data.code == 2003) {//支付密码错误

              }
            } else if (action == 'cancel') {
              if (response.data.code == 2001)//商城支付密码设置未开启
              {

              } else if (response.data.code == 2002)//用户未设置支付密码
              {

              } else if (response.data.code == 2003) {//支付密码错误

              }
            }
          });
        }
      }, function (response) {
        MessageBox.alert(response.msg, '提示');
      });
    },

  },
  watch: {

  },
  components: { cTitle }
}