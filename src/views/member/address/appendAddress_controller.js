import { Field } from 'mint-ui';
import { Picker } from 'mint-ui';
import addre from 'assets/address/addressinfo';
import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
const address = addre;
export default {
  data() {
    return {
      form: {
        toi: this.fun.getKeyByI(),
        username: '',
        mobile: '',
        city: '',
        address: '',
        province: '',
        isdefault: 0,
        district: '',
        uid: 9,
        isdefault: false

      },
      provinceoptions: [],
      cityoptions: [],
      regionoptions: [],
      provicevalue: '请选择省份',
      cityvalue: '请选择市区',
      regionvalue: '请选择区县',
      popupVisible: false
    }
  },
  methods: {
    onAddressChange(picker, values) {
      picker.setSlotValues(1, address[values[0]]);
      this.addressProvince = values[0];
      this.addressCity = values[1];
      console.log(this.addressProvince, this.addressCity);
    },
    //选择省份的响应方法
    selectProviceHandle(value) {
      this.form.provicevalue = value.areaname;
      this.cityvalue = '请选择市区';
      this.regionvalue = '请选择区县';
      this.cityoptions = [];
       var citys = [];
        var city =localStorage.getItem("city");
        citys = JSON.parse(city); 
      for (let i = 0; i < citys.length; i++) {
        let item = citys[i];
        if (item.parentid == value.id) {
          this.cityoptions.push(item);
          // = this.cityoptions[0].areaname;
        }

      }

      //this.form.province = value;
    },
    //选择市的响应方法
    selectCityHandle(value) {
      this.form.city = value.areaname;
      this.regionoptions = [];
       var districts = [];
        var district =localStorage.getItem("district");
        districts = JSON.parse(district); 
      for (let i = 0; i < districts.length; i++) {
        let item = districts[i];

        if (item.parentid == value.id) {
          this.regionoptions.push(item);
          //this.regionvalue = this.regionoptions[0].areaname;

        }

      }
    },
    //选择市辖区的响应方法
    selectRegionHandle(value) {
      console.log(value.areaname);
      this.form.district = value.areaname;;
    },
    appendAddress() {
      //console.log(this.form);
      var that = this;
      if (this.form.isdefault) {
        this.form.isdefault = 1;

      } else {
        this.form.isdefault = 0;
      }


      if(this.fun.isMoblie(this.form.mobile))
      {
           MessageBox.alert("请输入正确的手机号");
        return;
      }


      $http.get('member.member-address.store', { "i": this.fun.getKeyByI(), "type": this.fun.getTyep(), username: this.form.username, mobile: this.form.mobile, city: this.form.city, address: this.form.address, province: this.form.provicevalue, isdefault: this.form.isdefault, district: this.form.district }).then(function (response) {
        if (response.result == 1) {

          
          MessageBox.alert('提示', response.msg);
          that.$router.go(-1);

        } else {
          MessageBox.alert('提示', response.msg);
        }
      }, function (response) {
        // error callback
      });


    }
  },
  activated() {
    this.toi = this.fun.getKeyByI();
    this.provicevalue = '请选择省份';
    this.cityvalue = '请选择市区';
    this.regionvalue = '请选择区县';
    this.form.address = '';
    this.regionoptions = [];
     var provinces = [];
        var province =localStorage.getItem("province");
        provinces = JSON.parse(province); 
     this.provinceoptions = provinces;    
  },
  mounted() {
    this.toi = this.fun.getKeyByI();
    


  },
  components: { cTitle }
};