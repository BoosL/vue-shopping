import { Field } from 'mint-ui';
import { Picker } from 'mint-ui';
import { DatetimePicker } from 'mint-ui';
import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { mapState, mapMutations } from 'vuex';
import District from 'src/gov_province_city_area_id';

Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

let startDate=new Date("1970-01-01");
let endDate=new Date();

export default {
  data() {
    return {
      startDateInfo:startDate,
      endDateInfo:endDate,
      //登录类型,1-代表微信，5-浏览器登录
      type: this.fun.getTyep(),
      toi: this.fun.getKeyByI(),
      //性别----
      showSex: false,
      sexItems: [
        {
          label: '男',
          callback: () => {
            this.info_form.gender = "1";
            this.sexName = "男";
          }
        },
        {
          label: '女',
          callback: () => {
            this.info_form.gender = "0";
            this.sexName = "女";
          }
        }
      ],
      sexName: "",
      //地区
      showAdd: false,
      district: District,
      districtName: "",
      //个人信息
      info_form: {
        realname: '',//用户姓名
        telephone: '',//联系电话
        mobile: '', //绑定电话
        wx: '', //微信
        alipay: '',//支付宝
        birthday: '',//生日
        alipay_name: '', //支付宝名字
        gender: '',//性别 1男 0女
        avatar: '',//头像
        province_name: '',//省
        city_name: '',//市
        area_name: '',//区
        province: '',//省ID
        city: '',//市ID
        area: '',//区ID
        address: '',//详细地址
      },
      //手机 btn
      bind_btn: '',
      //自定义参数
      is_custom: false,
      custom_title: "",//自定义title
      custom_value: "",//自定义值
      //自定义表单设置
      isForm:false,

      isShowSex: false,
      isShowAddress: false,
      isShowBirthday: false,
      customDatas: [],
      //余额支付密码是否开启
      isBalancePwd: false,
    }
  },

  methods: {

    //初始化数据
    init() {
      this.showSex = false;
      this.showAdd = false;
      this.is_custom = false;
      this.isShowSex = false;
      this.isShowAddress = false;
      this.isShowBirthday = false;
      this.isBalancePwd = false;
      this.isForm=false;
      this.customDatas=[];
    },

    //获取信息
    getMemberInfo() {
      var that = this;
      $http.get('member.member.getUserInfo', {}, "").then(function (response) {
        if (response.result == 1) {
          that.initData(response.data);
        } else {
          MessageBox.alert(response.msg);
        }
      }, function (response) {
        MessageBox.alert(response);
      });
    },

    //初始化个人信息
    initData(data) {
      this.info_form.realname = data.realname;
      this.initSex(data);
      this.info_form.wx = data.wechat;
      this.initAliPay(data);
      this.initDistrict(data, '');
      this.info_form.avatar = data.avatar;
      this.initBirthday(data);
      this.initMobile(data);

      this.initCustomData(data);

      this.initCustomForm(data);

      this.getBalancePawInfo();
    },


    //初始化性别
    initSex(data) {
      this.isShowSex = data.myform.base.sex == 1 ? true : false;//设置是否显示
      if (data.gender == 1) {
        this.info_form.gender = '1';
        this.sexName = "男";
      } else {
        this.info_form.gender = '0';
        this.sexName = "女";
      }
    },

    //支付宝
    initAliPay(data) {
      this.info_form.alipay = data.alipay;
      this.info_form.alipay_name = data.alipay_name;
    },

    //初始化城市
    initDistrict(data, district) {
     


      if (!this.fun.isTextEmpty(data)) {
        this.isShowAddress = data.myform.base.address == 1 ? true : false;//设置是否显示
        
        this.info_form.province = data.province;
        this.info_form.province_name = data.province_name;

        this.info_form.city = data.city;
        this.info_form.city_name = data.city_name;


        this.info_form.area = data.area;
        this.info_form.area_name = data.area_name;

        this.districtName = data.province_name + " " + data.city_name + " " + data.area_name;

        this.info_form.address = data.address;
        return;
      }

      if (!this.fun.isTextEmpty(district)) {
        this.info_form.province = district.itemValue1;
        this.info_form.province_name = district.itemName1;

        this.info_form.city = district.itemValue2;
        this.info_form.city_name = district.itemName2;


        this.info_form.area = district.itemValue3;
        this.info_form.area_name = district.itemName3;

        this.districtName = district.itemName1 + " " + district.itemName2 + " " + district.itemName3;
      }

    },

    //城市结果
    resultAdd(district) {
      console.log(district);
      this.initDistrict('', district);
    },

    //初始化生日
    initBirthday(data) {
      this.isShowBirthday = data.myform.base.birthday == 1 ? true : false;
      this.info_form.birthday = data.birthday;
    },

    //初始化手机 绑定 修改 显示 
    initMobile(data) {
      this.info_form.mobile = data.mobile;
      if (!this.fun.isTextEmpty(this.info_form.mobile)) {
        this.bind_btn = '修改手机';
      } else {
        this.bind_btn = '绑定手机';
      }
    },

    //初始化自定义数据
    initCustomData(data) {
      if (!this.fun.isTextEmpty(data.yz_member)) {

        this.custom_value = data.yz_member.custom_value;

        this.getMemberInfo2(this.custom_value);//获取自定义数据
      }
    },

    //获取自定义数据
    getMemberInfo2(value) {
      let that = this;
      $http.get('member.member.get-custom-field', {}).then(function (response) {
        if (response.result == 1) {
          that.is_custom = response.data.is_custom == "1" ? true : false;
          that.custom_title = response.data.custom_title;
        } else {

        }
      }, function (response) {

      });
    },

    //初始化自定义表单
    initCustomForm(data) {
      if(this.fun.isTextEmpty(data.myform)||this.fun.isTextEmpty(data.myform.form)){
        this.isForm=false;
        return;
      }
      if(data.myform.form.length==0)
      {
        this.isForm=false;
        return;
      }
      this.isForm=true;
      this.customDatas = data.myform.form;
    },

    //获取余额支付密码是否设置
    getBalancePawInfo() {
      let that = this;
      $http.get('member.balance-password.is-use', {}).then(function (response) {
        if (response.result == 1) {
          that.isBalancePwd = response.data.is_use;
        } else {

        }

      }, function (response) {

      });
    },


    //提交个人信息
    submitInfo() {
      this.info_form.customDatas = this.customDatas;
      var that = this;
      $http.post('member.member.updateUserInfo', { data: this.info_form }, '正在提交数据...').then(function (response) {
        console.log(response.data);
        if (response.result == 1) {
          MessageBox.alert(response.msg);
          that.$router.go(-1);
        } else {
          MessageBox.alert(response.msg);
        }
      }, function (response) {
        MessageBox.alert(response);
      });

    },

    //绑定手机
    bindTel() {
      this.$router.push(this.fun.getUrl('editmobile', { num: this.info_form.mobile, myparent: this }));
    },

    //编辑自定义字段
    editCustom() {
      if (this.fun.isTextEmpty(this.custom_value)) {
        //跳转自定义界面 info_costom
        this.$router.push(this.fun.getUrl('info_costom', {}));
      } else {
        return;
      }
    },

    //余额支付密码设置
    editBalancePwd() {
      let that = this;
      $http.get('member.balance-password.is-has-password', {}, "").then(function (response) {
        if (response.result == 1) {
          if (response.data.is_has) {
            that.$router.push(that.fun.getUrl('balance_password', {}));
          } else {
            that.$router.push(that.fun.getUrl('set_balance_password', {}));
          }
        } else {
          MessageBox.alert(response.msg);
        }
      }, function (response) {
        MessageBox.alert(response.msg);
      });
    },

    //银行卡
    editBank() {
      this.$router.push(this.fun.getUrl('memberBank', {}));
    },

    //显示性别设置
    showSexInfo() {
      this.showSex = true;
    },

    openPicker() {
      this.$refs.picker.open();
    },

    handleConfirm(ret){
      console.log("handleConfirm="+ret);
      console.log(ret.Format("yyyy-MM-dd"));
      this.info_form.birthday=ret.Format("yyyy-MM-dd");
    }
  },
  activated() {

    
    //console.log("ccc="+startDate);
   

    //初始化
    this.init();
    //获取信息
    this.getMemberInfo();
  },
  components: { cTitle ,DatetimePicker}
}
