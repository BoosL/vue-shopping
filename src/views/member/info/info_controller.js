import { Field } from 'mint-ui';
import { Picker } from 'mint-ui';
import { DatetimePicker } from 'mint-ui';
import addre from 'assets/address/addressinfo';
import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { mapState, mapMutations } from 'vuex';
const address = addre;
export default {
  data() {
    return {
      //登录类型,1-代表微信，5-浏览器登录
      type: this.fun.getTyep(),
      toi: this.fun.getKeyByI(),
      currentData: '',
      provinceoptions: [],
      cityoptions: [],
      regionoptions: [],
      provicevalue: '请选择省份',
      cityvalue: '请选择市区',
      regionvalue: '请选择辖区',
      bind_btn: '绑定手机',
      pickerVisible: '',
      year_value: '',
      month_value: '',
      day_value: '',
      avatar_dir: '',
      info_form: {
        //用户姓名
        realname: '',
        //联系电话
        telephone: '',
        //绑定电话
        mobile: '',
        //微信
        wx: '',
        //支付宝
        alipay: '',
        //生日
        birthday: '',
        //支付宝名字
        alipay_name: '',
        //性别
        gender: '0',
        avatar: '',
        city_name: '',
        address: '',
        // area_name	是	string	区名称
        area_name: '',
        province_name: '',
        // province	是	int	省ID
        province: '',
        // city	是	int	市ID
        city: '',
        // area	是	int	区ID
        area: ''
      },
      popupVisible: false,

      is_custom: false,//自定义参数
      custom_title: "",//自定义title
      custom_value: "",//自定义值

      //自定义表单设置
      isShowSex: false,
      isShowAddress: false,
      isShowBirthday: false,
      customDatas: [],

      //余额支付密码是否开启
      isBalancePwd: false,
    }
  },

  methods: {
    openPicker() {
        this.$refs.picker.open();
      },
    onAddressChange(picker, values) {
      picker.setSlotValues(1, address[values[0]]);
      this.addressProvince = values[0];
      this.addressCity = values[1];

    },
    handleAvatarErr(err, file, fileList) {
      console.log('上传失败');
      console.log(err);
    },
    //头像上传成功回调方法
    handleAvatarScucess(res, file) {
      this.info_form.avatar = URL.createObjectURL(file.raw);
      console.log('成功上传头像');
      console.log(this.info_form.avatar);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //初始化个人信息
    initData(data) {
      this.currentData = data;
      console.log("&&&&&&&&&&&&&&&&&&&&");
      console.log(this.currentData);
      this.provicevalue = this.currentData.province_name;

      //  this.$on('editmobile', (mobile) => {
      //       this.info_form.mobile = mobile;
      //       this.info_form.telephone = mobile;
      //     });
      this.type = window.localStorage.type;
      this.toi = this.fun.getKeyByI();
      if (this.currentData.gender == 1) {
        this.info_form.gender = '1';
      } else {
        this.info_form.gender = '0';
      }
      //this.info_form.gender = this.$store.state.memberstate.member_model.gender;
      this.info_form.wx=this.currentData.wechat;
      this.info_form.alipay = this.currentData.alipay;
      this.info_form.realname = this.currentData.realname;
      this.info_form.mobile = this.currentData.mobile;
      this.info_form.telephone = this.currentData.mobile;
      this.info_form.address = this.currentData.address;
      this.info_form.alipay_name = this.currentData.alipay_name;
      this.info_form.birthday = this.currentData.birthday;
      this.info_form.province = this.currentData.province;
      this.info_form.province_name = this.currentData.province_name;
      this.info_form.city_name = this.currentData.city_name;
      this.info_form.city = this.currentData.city;
      this.info_form.area = this.currentData.area;
      this.info_form.area_name = this.currentData.area_name;
      this.info_form.avatar = this.currentData.avatar;
      if (this.info_form.mobile) {
        this.bind_btn = '修改手机';
      } else {
        this.bind_btn = '绑定手机';

      }


      if (!this.fun.isTextEmpty(this.currentData.yz_member)) {
        
        this.custom_value = this.currentData.yz_member.custom_value;

        this.getMemberInfo2(this.custom_value);//获取自定义数据
      }




      this.isShowSex = this.currentData.myform.base.sex == 1 ? true : false;
      this.isShowAddress = this.currentData.myform.base.address == 1 ? true : false;
      this.isShowBirthday = this.currentData.myform.base.birthday == 1 ? true : false;
      this.customDatas = this.currentData.myform.form;

      this.getBalancePawInfo();//获取余额支付密码是否设置


    },
    getMemberInfo() {

      var that = this;
      $http.get('member.member.getUserInfo', { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }).then(function (response) {

        if (response.result == 1) {

          that.initData(response.data);


        } else {
          MessageBox.alert(response.msg);
        }

      }, function (response) {
        // error callback
      });

    },
    //提交个人信息
    submitInfo() {
      this.info_form.customDatas = this.customDatas;
      var that = this;
      $http.post('member.member.updateUserInfo', { data: this.info_form, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '正在提交数据...').then(function (response) {
        console.log(response.data);
        if (response.result == 1) {
          //var myData = response.data;
          MessageBox.alert(response.msg);
          that.$router.go(-1);
        } else {
          MessageBox.alert(response.msg);
        }
      }, function (response) {
        // error callback
      });

    },
    handleChange(value) {
      console.log(value);

    },
    //选择省份的响应方法
    selectProviceHandle(value) {

      if (this.currentData.province_name == value) {
        //首次
        this.initCityData(this.currentData.city_name);

      } else {
        this.cityvalue = '请选择市区';
        this.regionvalue = '请选择辖区';
        this.info_form.province = value.id;
        this.info_form.province_name = value.areaname;
        this.cityoptions = [];
        var citys = [];
        var city = localStorage.getItem("city");
        citys = JSON.parse(city);
        for (let i = 0; i < citys.length; i++) {
          let item = citys[i];
          if (item.parentid == value.id) {
            this.cityoptions.push(item);
            // = this.cityoptions[0].areaname;
          }

        }

      }


      //this.form.province = value;
    },
    //选择市的响应方法
    selectCityHandle(value) {
      console.log(value);
      if (value == this.currentData.city_name) {
        this.initDistrictData(this.currentData.area_name);

      } else {
        this.info_form.city = value.id;
        this.info_form.city_name = value.areaname;
        this.regionoptions = [];
        var districts = [];
        var district = localStorage.getItem("district");
        districts = JSON.parse(district);
        for (let i = 0; i < districts.length; i++) {
          let item = districts[i];

          if (item.parentid == value.id) {
            this.regionoptions.push(item);
            //this.regionvalue = this.regionoptions[0].areaname;

          }

        }

      }

    },
    //选择市辖区的响应方法
    selectRegionHandle(value) {
      //console.log(value.areaname);
      this.info_form.area = value.id;
      this.info_form.area_name = value.areaname;
    },
    initCityData(city) {
      //通过省份的id找到相应的市
      this.cityoptions = [];
      var citys = [];
      var temp_city = localStorage.getItem("city");
      citys = JSON.parse(temp_city);
      for (let i = 0; i < citys.length; i++) {
        let item = citys[i];
        if (this.currentData.province == item.parentid) {
          if (item.areaname == city) {
            this.cityvalue = city;
            this.info_form.city = item.id;
            this.info_form.city_name = item.areaname;

          }
          this.cityoptions.push(item);
        }


      }


    },
    initDistrictData(district) {
      //通过市的id找到相应的辖区
      this.regionoptions = [];
      var districts = [];
      var temp_district = localStorage.getItem("district");
      districts = JSON.parse(temp_district);
      for (let i = 0; i < districts.length; i++) {
        let item = districts[i];
        if (this.currentData.city == item.parentid) {
          if (item.areaname == district) {
            this.regionvalue = district;
            this.info_form.area = item.id;
            this.info_form.area_name = item.areaname;

          }
          this.regionoptions.push(item);
        }
      }

    },
    bindTel() {

      this.$router.push(this.fun.getUrl('editmobile', { num: this.info_form.mobile, myparent: this }));
    },





    //获取自定义数据
    getMemberInfo2(value) {
      let that = this;

      $http.get('member.member.get-custom-field', { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }).then(function (response) {

        if (response.result == 1) {
          that.is_custom = response.data.is_custom == "1" ? true : false;
          that.custom_title = response.data.custom_title;

        } else {
          //MessageBox.alert(response.msg);
        }

      }, function (response) {
        // error callback
      });
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
          }else{
            that.$router.push(that.fun.getUrl('set_balance_password', {}));
          }
        } else {
          MessageBox.alert(response.msg);
        }

      }, function (response) {
        MessageBox.alert(response.msg);
      });
    },

    //获取余额支付密码是否设置
    getBalancePawInfo() {
      let that = this;

      $http.get('member.balance-password.is-use', {}).then(function (response) {

        if (response.result == 1) {
          that.isBalancePwd = response.data.is_use;
        } else {
          //MessageBox.alert(response.msg);
        }

      }, function (response) {
        // error callback
      });
    },


    //银行卡
    editBank(){
      this.$router.push(this.fun.getUrl('memberBank', {}));
    }


  },
  //计算属性，更新数据
  computed: {


  },
  mounted() {



  },
  activated() {
    this.toi = this.fun.getKeyByI();
    var province = localStorage.getItem("province");
    this.provinceoptions = JSON.parse(province);
    this.getMemberInfo();





  },
  components: { cTitle }
}
