/**
 * Created by zhong on 16/10/15.
 */
import { MessageBox } from 'mint-ui';
import category from './category';
import ticket from './ticket';
import memberstate from './member_model';
import sort_goods from './sort_goods';
import service from './service';
import langService from './service';

var MyTempIndex = localStorage.getItem("tempIndex");
MyTempIndex = JSON.parse(MyTempIndex);

export default {
  modules: {
    category,
    sort_goods,
    memberstate,
    ticket,
    service,
    langService,
  },
  state: { //true
    temp: { item: { janst: '' } },
    foot: false,
    message: '沙鸥',
    cou: 50,
    view: true,
    name: '',
    level: '',
    icon: '',
    sex: 0,
    vip: false,
    islogin: false,
    //订单列表点击mt-tab-item
    selected_status: false,
    //订单列表订单状态
    status: 0,
    //当前发货地址
    currentAddress: {
      dispatch_type_id: 1,
      address: "",
      mobile: "",
      realname: ""
    },
    //详情页面用到的订单
    detail_order: '',
    //从服务器请求的地址字符串
    address_info: '',
    //账户余额
    balance: 0,
    isShow: 0,
    //服务器请求的全国省份，市，辖区数据
    city: [],
    district: [],
    province: [],
    mailInfo: {},//商城信息
    cservice: '',//客服
    //插件列表
    plugins: [],
    loginStatus: 0,
    trainCity: [],//火车对应的城市
    airCity: [],//飞机对应城市

    shop_id: '',
    mailLanguage: {},//自定义语言
  },

  mutations: {
    //存储shop_id
    setShopId(state, shop_id) {
      state.shop_id = shop_id;
    },
    setLoginStatus(state, info) {
      state.loginStatus = info;
    },
    tempIndex(state, info) {
      state.temp = info;
    },
    setCservice(state, n) {
      state.cservice = n;
    },
    toIsShow(state, n) {
      state.isShow = n;
    },
    alerts(state, msg) {
      MessageBox('提示', msg);
    },
    views(state) {
      state.view = !state.view;
    },
    MESSAGE(state, value) {
      state.message = value || state.message;
    },
    member(state, obj) {
      state.name = obj.name;
      state.level = obj.level;
      state.icon = obj.icon;
    },
    login(state, log) {
      state.islogin = log.login;

    },
    updateBanlace(state, balance) {
      //console.log('账户余额');
      //console.log(balance.balance);
      state.balance = balance.balance;

    },
    setStatus(state, value) {
      state.status = value.status;

    },
    setCurrentAddress(state, address) {
      state.currentAddress.dispatch_type_id = address.dispatch_type_id;
      state.currentAddress.address = address.address;
      state.currentAddress.mobile = address.mobile;
      state.currentAddress.realname = address.realname;

    },
    saveAddresssInfo(state, address) {
      //console.log(address);
      state.address_info = address.value;
      state.city = address.city;
      state.district = address.district;
      state.province = address.province;
    },
    setMailInfo(state, mailInfo) {
      //console.log("setMailInfo=", mailInfo);
      state.mailInfo = mailInfo
    },
    //设置插件列表
    setPlugins(state, plugins) {
      state.plugins = plugins;
    },
    //存储火车票对应城市
    setTrainCity(state, trainCity) {
      state.trainCity = trainCity;
    },
    //存储飞机票对应城市
    setAirCity(state, airCity) {
      state.airCity = airCity;
    },

    //存储自定义语言包
    setMailLanguage(state, mailLanguage) {
      state.mailLanguage = mailLanguage;
    }
  }

}