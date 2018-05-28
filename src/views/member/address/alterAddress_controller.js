import { Field } from 'mint-ui';
import { Picker } from 'mint-ui';
import addre from 'assets/address/addressinfo';
import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { Switch } from 'mint-ui';
const address = addre;
export default {
  data() {
    return {
      //地址信息model
      model: '',
      address_id: '',
      form:
      {
        toi: this.fun.getKeyByI(),
        username: '',
        mobile: '',
        city: '',
        address: '',
        province: '',
        isdefault: false,
        district: '',
        uid: '',

      },
      selectedOptions: [],
      provinceoptions: [],
      cityoptions: [],
      regionoptions: [],
      provicevalue: '',
      cityvalue: '',
      regionvalue: '',
      popupVisible: false,

    }
  },
  methods: {
  	kyebey(e){
  		console.log('::::::::::444444',e);
  		e.scrollIntoViewIfNeeded();
  	},
    //选择省份的响应方法
    selectProviceHandle(value) {
      console.log(value);
      this.cityoptions = [];

      if (this.$route.params.model.province == value) {
        //首次
        this.initCityData(this.$route.params.model.city);

      } else {
        this.cityvalue = '请选择市区';
        this.regionvalue = '请选择区县';
        this.form.province = value.areaname;
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
      // console.log(value);
      if (value == this.$route.params.model.city) {
        this.initDistrictData(this.$route.params.model.district);

      } else {
        this.form.city = value.areaname;
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
      this.form.district = value.areaname;
    },
    //修改地址的post请求方法
    alterAddresshandle() {
      var temp;
      var that = this;
      if (this.form.isdefault) {
        temp = 1

      } else {
        temp = 0;
      }
      
      if (this.form.province == undefined || this.form.province.length == 0) {
        this.form.province = this.provicevalue;

      }
      if (this.form.city == undefined || this.form.city.length == 0) {
        this.form.city = this.cityvalue;

      }
      if (this.form.district == undefined || this.form.district.length == 0) {
        this.form.district = this.regionvalue;

      }
      $http.post('member.member-address.update', { address_id: this.address_id, username: this.form.username, mobile: this.form.mobile, city: this.form.city, address: this.form.address, province: this.form.province, isdefault: temp, district: this.form.district}).then(function (response) {
        if (response.result == 1) {

          MessageBox('提示', response.msg);
          that.$router.go(-1);

        } else {
          MessageBox('提示', response.msg);
        }
      }, function (response) {
        // error callback
      });


    },
    initCityData(city) {
      //通过省份的id找到相应的市
      this.cityoptions = [];
      var citys = [];
      var temp_city = localStorage.getItem("city");
      citys = JSON.parse(temp_city);
      for (let i = 0; i < citys.length; i++) {
        let item = citys[i];
        if (this.$route.params.model.province_id == item.parentid) {
          if (item.areaname == city) {
            this.cityvalue = city;

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
        if (this.$route.params.model.city_id == item.parentid) {
          if (item.areaname == district) {
            this.regionvalue = district;

          }
          this.regionoptions.push(item);
        }
      }

    }

  },
  mounted() {

    var provinces = [];
    var province = localStorage.getItem("province");
    provinces = JSON.parse(province);
    this.provinceoptions = provinces;

  },
  activated() {

    this.form.isdefault = this.$route.params.model.isdefault==0?false:true;
    this.address_id = this.$route.params.model.id;
    this.provicevalue = this.$route.params.model.province;
    this.form.username = this.$route.params.model.username;
    this.form.mobile = this.$route.params.model.mobile;
    this.form.province = this.$route.params.model.province;
    this.form.city = this.$route.params.model.city;
    this.form.district = this.$route.params.model.district;
    this.form.uid = this.$route.params.model.uid;
    this.form.address = this.$route.params.model.address;
    this.toi = this.fun.getKeyByI();

  },
  components: { cTitle }
};