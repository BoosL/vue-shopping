import cTitle from '../../components/title';
import District from 'ydui-district/dist/gov_province_city_area_id';
import { Indicator, Toast } from 'mint-ui';
//import diyinput from 'components/diyform/input';

var haveShop = false;

export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      diyform: {},
      diydata: [],
      types: {
        "0": 'diyinput',
        "1": 'diytextarea',
        "3": 'diycheckbox',
        "4": 'diyradio',
        "2": 'diyselect',
        "7": 'diydate',
        "9": 'diycity',
      },
      pickerValue: '2017-09-27',
      showCity: false,
      district: District,
      currentDateKey: '',
      currentCityKey: '',
      checks: [],
      isValidation: true,
      activity_id: '',
      form_id: '',
      conference: {},
      intro: false,
      thumb: "",
    };
  },

  mounted() {
  },
  methods: {
    showIntro() {
      console.log(this.intro);
      this.intro = true;
    },
    setCity(ret) {
      var retCity = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
      console.log('retCity', retCity);
      console.log('currentCityKey', this.currentCityKey);
      this.diydata.forEach(item => {
        if (item.name == this.currentCityKey) {
          this.$set(item, 'value', retCity);
        }
      });
    },
    openPicker(name) {
      this.currentDateKey = name;
      console.log('name', name);
      this.$refs.picker.open();
    },
    setDate(ret) {
      console.log(ret.Format("yyyy-MM-dd"));
      this.diydata.forEach(item => {
        if (item.name == this.currentDateKey) {
          this.$set(item, 'value', ret.Format("yyyy-MM-dd"));
        }
      });
    },
    openCity(name) {
      this.currentCityKey = name;
    },
    goback() {
      this.$router.go(-1);
    },
    validation() {
      this.isValidation = true;
      this.diydata.forEach(item => {
        if (item.data.tp_must == 1 && !item.value) {
          console.log(item.data.tp_name, item.value);
          this.$dialog.toast({
            mes: item.data.tp_name + '必须填写哦',
            timeout: 1500,
            icon: 'error',
            callback: () => {
              //console.log('我走咯！');
            }
          });
          this.isValidation = false;
        }

        if (item.type == 'diycheckbox' && item.value.length == 0) {
          console.log(item.data.tp_name, item.value);
          this.$dialog.toast({
            mes: item.data.tp_name + '必须选择哦',
            timeout: 1500,
            icon: 'error',
            callback: () => {
              //console.log('我走咯！');
            }
          });
          this.isValidation = false;
        }
      });
    },
    submit() {
      console.log('submit');
      this.validation();
      if (!this.isValidation) {
        return;
      }

      this.submitConference();
    },

    submitForm(enrol_id) {
      var that = this;
      var formData = [];
      var formObject = {};
      this.diydata.forEach(item => {
        formObject[item.name] = item.value;
      });
      console.log('formObject', formObject);
      formData.push(formObject);
      console.log('要提交了');

      $http.post('plugin.diyform.api.diy-form.save-diy-form-data', {
        form_id: this.form_id,
        form_data: formData,
        "i": this.fun.getKeyByI(), "type": this.fun.getTyep()
      }).then(function (response) {
        var form_data_id = response.data.form_data_id;
        console.log('submit:', response);
        that.submitEnro(enrol_id, form_data_id);
      }, function (response) {
        // error callback
      });
    },

    submitEnro(enrol_id, form_data_id) {
      var that = this;
      $http.post('plugin.conference.api.conference-activity.save-enrol-end', {
        enrol_id: enrol_id,
        form_data_id: form_data_id,
        "i": this.fun.getKeyByI(), "type": this.fun.getTyep()
      }).then(function (response) {
        console.log('sssss', response);
        if (response.result == 1) {
          that.$dialog.toast({
            mes: '报名成功',
            timeout: 1500,
            icon: 'success',
            callback: () => {
              that.$router.push(that.fun.getUrl('conferenceList'));
            }
          });
        }
      }, function (response) {
        // error callback
      });

    },

    submitConference() {
      var that = this;
      $http.get('plugin.conference.api.conference-activity.save-enrol', { "conference_id": this.activity_id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }).then(function (response) {
        if (response.data.result == 1) {
          var enrol_id = response.data.enrol_id;
          console.log('报名成功', response.data);
          that.submitForm(enrol_id);
        } else {
          console.log('报名失败', response);

          that.$dialog.toast({
            mes: response.msg,
            timeout: 1500,
            icon: 'error',
            callback: () => {
              that.$router.push(that.fun.getUrl('conferenceList'));
            }
          });
          return;
          //MessageBox.alert(response.msg);
        }
      }, function (response) {
        alert('fail');
        // error callback
      });
    },

    getForm() {
      var that = this;
      $http.get('plugin.diyform.api.diy-form.get-diy-form-by-id', { "form_id": this.form_id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }).then(function (response) {
        if (response.result == 1) {
          that.diyform = response.data;
          var fields = that.diyform.fields;
          for (var field in fields) {
            console.log(fields[field].data_type);
            console.log(that.types[fields[field].data_type]);
            if (that.types[fields[field].data_type] == 'diycheckbox') {
              var f = {
                name: field,
                data: fields[field],
                value: [],
                type: that.types[fields[field].data_type],
              }
            } else if (that.types[fields[field].data_type] == 'diydate') {
              var f = {
                name: field,
                data: fields[field],
                value: '2018-03-29',
                type: that.types[fields[field].data_type],
              }

            } else {
              var f = {
                name: field,
                data: fields[field],
                value: '',
                type: that.types[fields[field].data_type],
              }
            }

            that.diydata.push(f);
          }
          console.log('diyform', that.diydata);
        } else {
          //MessageBox.alert(response.msg);
        }
      }, function (response) {
        alert('fail');
        // error callback
      });
    },

    getActivity() {
      var that = this;
      $http.get('plugin.conference.api.conference-activity.get-activity-detail', { id: this.activity_id }, "加载中...").then(function (response) {
        if (response.result == 1) {
          if (response.data.is_end == 1) {
            that.$dialog.toast({
              mes: '来晚了,活动已结束！',
              timeout: 1500,
              icon: 'error',
              callback: () => {
                that.$router.push(that.fun.getUrl('conferenceList'));
              }
            });
            return;
          }
          that.thumb = response.data.thumb;
          that.conference = response.data;
          that.form_id = that.conference.form_id;
          that.getForm();
          console.log('conference1', response);
          //that.initShare();
        } else {
          MessageBox.alert(response.msg);
        }
      }, function (response) {
        MessageBox.alert(response);
      });
    },



    //初始化分享设置
    initShare() {
      let that = this;
      let _url = document.location.href;
      let json = { url: _url, "i": this.fun.getKeyByI(), "type": this.fun.getTyep(), "mid": this.fun.getKeyByMid() };
      $http.post('member.member.wxJsSdkConfig', json).then(function (response) {
        console.log(response)
        if (response.result == 1) {
          that.share(response.data);
        } else {

        }
      }, function (response) {
        console.log(response);
      });
    },
    //组装分享设置
    share(data) {
      let that = this;
      wx.config(data.config);
      wx.ready(function () {

        let _title = "";
        let _link = document.location.href;
        let _imgUrl = "";
        let _desc = "";

        _title = that.fun.isTextEmpty(data.share.title) ? data.shop.name : data.share.title;
        _imgUrl = that.fun.isTextEmpty(data.share.icon) ? data.shop.icon : data.share.icon;
        _desc = that.fun.isTextEmpty(data.share.desc) ? data.shop.name : data.share.desc;
        _link = that.fun.isMid(_link, data.info.uid);

        wx.showOptionMenu();
        wx.onMenuShareTimeline({
          title: _title, // 分享标题
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          success: function () {
            Toast("分享成功");
          },
          cancel: function () {
            Toast("取消分享");
          }
        });



        wx.onMenuShareAppMessage({
          title: _title, // 分享标题
          desc: _desc, // 分享描述
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            Toast("分享成功");
          },
          cancel: function () {
            Toast("取消分享");
          }
        });
      });
    },
  },
  activated() {
    this.toi = this.fun.getKeyByI();
    this.diydata = [];
    this.activity_id = this.$route.params.id;
    if (!this.activity_id) {
      this.$dialog.toast({
        mes: '活动不存在！',
        timeout: 1500,
        icon: 'error',
        callback: () => {
          this.$router.push(this.fun.getUrl('conferenceList'));
        }
      });
    }
    this.getActivity();
    //this.getMemberInfo2();//获取自定义数据
    //console.log(this.$store.state.memberstate.member_model);
  },
  created() {
    this.toi = this.fun.getKeyByI();
  },
  components: { cTitle },
}
