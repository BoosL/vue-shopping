import { Indicator, Toast } from 'mint-ui';
import District from 'ydui-district/dist/gov_province_city_area_id';


const IS_SUPPLIER = -1; //todo 已经成为供应商，无需再申请
const REPEAT_APPLY = 0; //todo 已经提交申请，等待审核。
const VISIT_SUCCESS = 1; //todo 访问成功
export default {
  data() {
    return {
      supplier_status: -2,
      supplier_info: "",
      supplier_form: "",
      isDiyForm: 0,
      form_id: 0,
      applyModel: {
        username: "",
        password: "",
        realname: "",
        mobile: "",
        product: "",
        remark: "",
      },
      diyform: {},
      diydata: [],
      types: {
        "88": 'diyusername',
        "99": 'diypassword',
        "0": 'diyinput',
        "1": 'diytextarea',
        "3": 'diycheckbox',
        "4": 'diyradio',
        "2": 'diyselect',
        "7": 'diydate',
        "9": 'diycity',
        "5": 'diyimage',
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
      imgUrls: [],
      urlArr: [],
      isPhoto: true,
      btnTitle: '',
      isModify: false,
      previewImg: '',
      isPreview: false,
      currentImageField: '',
    }
  },

  activated() {
    this.supplier_status=-2;
    this.diyform = {};
    this.diydata = [];
    this.getData();
    this.imgUrls = [];
    this.currentImageField = '';
  },
  mounted() {
  },

  methods: {
    //获取数据
    getData() {
      let that = this;
      let json = {};

      $http.get('plugin.supplier.supplier.controllers.apply.supplier-apply', json, "加载中...").then(function (response) {
        console.log(response.data)
        if (response.result == 1) {
          that.supplier_status = response.data.status;
          if (that.supplier_status == 1) {
            that.checkEnableDiyForm();
            return;
          }
          that.supplier_info = response.data.signature;
        } else {
          Toast(response.msg);
        }
      }, function (response) {
        console.log(response)
      });
    },

    //验证开启表单
    checkEnableDiyForm() {
      let that = this;
      let json = {};
      $http.get('plugin.supplier.supplier.controllers.apply.supplier-apply.is-enable-diyform', json, "").then(function (response) {
        console.log(response.data)
        if (response.result == 1) {
          that.supplier_status = 2;
          that.isDiyForm = 1;
          that.form_id = response.data.form_id;
          that.getForm();
        }
      }, function (response) {
        console.log(response)
      });
    },

    //获取表单信息
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

            } else if (that.types[fields[field].data_type] == 'diyimage') {
              var f = {
                name: field,
                data: fields[field],
                imgUrls: [],
                isPhoto: false,
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









    onFileChange: function (event, item) {
      console.log('e.target', item);
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files, event, item);
    },
    createImage: function (file, e, item) {
      let vm = this;
      //console.log('1111');
      lrz(file[0], { width: 480 }).then(function (rst) {
        item.imgUrls.push(rst.base64);
        console.log('item', item);
        return rst;
      }).always(function () {
        // 清空文件上传控件的值
        e.target.value = null;
      });
    },
    delImage: function (item, index) {
      let vm = this;

      this.$dialog.confirm({
        title: '删除',
        mes: '确定删除该图片?',
        opts: () => {
          console.log(item.constructor);
          console.log('delitem:', item);
          console.log('delitemindex:', index);
          //if (index == 1) {
          item.splice(index, 1);
          //}
          //this.$dialog.toast({mes: '你点了确定', timeout: 1000});
        }
      });
      /*mui.confirm('确定删除该图片?','提示', btnArray, function(e) {
        if (e.index == 1) {
          vm.imgUrls.splice(index, 1);
        }
      })*/

    },

    /*saveImage: function(){
      let vm = this;
      let urlArr = [],
      imgUrls = this.imgUrls;

      for(let i = 0; i < imgUrls.length; i++) {
        if(imgUrls[i].indexOf('file') == -1) {
          //urlArr.push(imgUrls[i].split(',')[1]);
          urlArr.push(imgUrls[i]);
        } else {
          urlArr.push(imgUrls[i]);
        }
      }

      //数据传输操作
              $http.post('upload_handler.php', {
                  imgs: urlArr
              }).then(function (response) {
                  console.log(response);
              }, function (response) {
                  //alert(response.body.msg)
              })
              return;
    },*/




    //提交数据
    setApplyData() {

      console.log(this.applyModel);

      if (this.fun.isTextEmpty(this.applyModel.username)) {
        Toast("请填写账号");
        return;
      }

      if (this.fun.isTextEmpty(this.applyModel.password)) {
        Toast("请填写密码");
        return;
      }

      if (this.fun.isTextEmpty(this.applyModel.realname)) {
        Toast("请填写真实姓名");
        return;
      }

      if (this.fun.isTextEmpty(this.applyModel.mobile)) {
        Toast("请填写手机号码");
        return;
      }

      if (this.fun.isMoblie(this.applyModel.mobile)) {
        Toast("请输入正确的手机号");
        return;
      }

      if (this.fun.isTextEmpty(this.applyModel.product)) {
        Toast("请填写产品类型");
        return;
      }


      let that = this;

      let json = { "apply": JSON.stringify(this.applyModel) };

      $http.get('plugin.supplier.supplier.controllers.apply.supplier-apply.apply', json, "提交中...").then(function (response) {
        console.log(response.data)
        if (response.result == 1) {
          that.supplier_status = response.data.status;
        } else {
          Toast(response.msg);
        }
      }, function (response) {
        console.log(response)
      });
    },

    //去商城
    goHome() {
      this.$router.push(this.fun.getUrl('home'));
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
        if (item.data.tp_must == 1 && !item.value && item.type != 'diyimage') {
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

        if (item.data.tp_must == 1 && item.type == 'diyimage') {

          if (item.imgUrls.length < item.data.tp_max) {
            this.$dialog.toast({
              mes: item.data.tp_name + '必须上传' + item.data.tp_max + "张",
              timeout: 1500,
              icon: 'error',
              callback: () => {
                //console.log('我走咯！');
              }
            });
            this.isValidation = false;
          }

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

      this.submitForm();
    },

    //自定义表单提交
    submitForm() {
      var that = this;
      var formData = [];
      var formObject = {};
      this.diydata.forEach(item => {
        //图片类型的直接提交图片base64的数组到后台，其它直接传值
        if (item.type == 'diyimage') {
          formObject[item.name] = item.imgUrls;
        } else {
          formObject[item.name] = item.value;
        }
      });
      console.log('formObject', formObject);
      formData.push(formObject);
      console.log('要提交了');
      //return;   //todo, 测试先停掉了，需要处理时把return去掉
      
      let json = { form_id: this.form_id ,form_data:formData};
      $http.post('plugin.diyform.api.diy-form.save-diy-form-data', json, "提交中...").then(function (response) {
        if(response.result==1){
          that.submitApplyByForm(response.data.form_data_id);
        }else{
          Toast(response.msg);
        }
       
      }, function (response) {
        // error callback
      });
    },

    submitApplyByForm(fromId){
      let that=this;
      let json={"form_data_id":fromId};
      $http.get('plugin.supplier.supplier.controllers.apply.supplier-apply.apply', json, "提交中...").then(function (response) {
        console.log(response.data)
        if (response.result == 1) {
          
          Toast(response.msg);
          that.$router.go(-1);
        } else {
          Toast(response.msg);
        }
      }, function (response) {
        console.log(response)
      });
    },


  }
}
