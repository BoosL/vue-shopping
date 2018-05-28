import { Indicator, Toast } from 'mint-ui';
export default {
    data() {
        return {

            apply: "-1",//状态值


            provicevalue: "",
            cityvalue: "",
            regionvalue: "",
            selectLevel: "",
            level: [],
            provinceoptions: [],
            cityoptions: [],
            regionoptions: [],

            proviceObject: "",
            cityObject: "",
            regionObject: "",

            district: "",
        }
    },

    mounted() {
        
    },

    activated() {
        this.apply = "-1";
        this.getStatus();//获取当前状态
    },

    methods: {


        //获取状态
        getStatus() {
            let that = this;
            let json = {};
            $http.get('plugin.area-dividend.api.area-dividend.apply-status', json, '').then(function (response) {
                if (response.result == 1) {
                    that.apply = response.data.apply;
                    that.tipMsg = response.msg;
                    that.setLogic(that.apply);
                } else {
                    MessageBox.alert(response.msg);
                }
            }, function (response) {
                MessageBox.alert(response);

            });
        },


        //分配逻辑
        setLogic(key) {
            switch (key) {
                case "0":
                    break;
                case "1"://可申请
                    this.initLevel();//初始化等级数据
                    this.initData();//初始化数据
                    break;
                case "2"://重新申请
                    this.initLevel();//初始化等级数据
                    this.initData();//初始化数据
                    break;
                case "3":
                    break;

                default:
                    break;
            }
        },
        //去商城
        goHome() {
            this.$router.push(this.fun.getUrl('home'));
        },

        //再次提交审核  老方法
        submitAgain() {
            let that = this;
            let json = { "data": JSON.stringify(this.assembleJson()) };
            $http.get('plugin.area-dividend.api.area-dividend.apply-again', json, '提交中').then(function (response) {
                if (response.result == 1) {
                    Toast(response.msg);
                    that.$router.go(-1);
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                Toast(response.msg);
            });
        },


        //初始化等级数据
        initLevel() {
            //this.level = [{ "name": "省级代理", "tag": 0 }, { "name": "市级代理", "tag": 1 }, { "name": "区/县级代理", "tag": 2 }, { "name": "街道/乡镇代理", "tag": 3 }];
            this.level = [{ "name": "省级代理", "tag": 0 }, { "name": "市级代理", "tag": 1 }, { "name": "区/县级代理", "tag": 2 }];
        },


        //初始化数据
        initData() {
            var province = localStorage.getItem("province");
            if (this.fun.isTextEmpty(province)) {
                this.getAddressDataInfo();//获取地址json数据
            } else {
                this.initProvice();
            }
        },

        //初始化省数据
        initProvice() {
            var province = localStorage.getItem("province");
            var provinces = [];
            provinces = JSON.parse(province);
            this.provinceoptions = provinces;
        },

        //选择省份的响应方法
        selectProviceHandle(value) {
            //初始化一些默认值 避免逻辑错误
            this.cityoptions = [];
            this.regionoptions = [];
            this.cityvalue = '';
            this.regionvalue = '';


            this.proviceObject = value;
            this.cityoptions = [];
            var citys = JSON.parse(localStorage.getItem("city"));
            for (let i = 0; i < citys.length; i++) {
                if (citys[i].parentid == value.id) {
                    this.cityoptions.push(citys[i]);
                }
            }
        },

        //选择市的响应方法
        selectCityHandle(value) {
            this.cityObject = value;
            console.log("selectCityHandle", value);
            this.regionoptions = [];
            var districts = JSON.parse(localStorage.getItem("district"));
            for (let i = 0; i < districts.length; i++) {
                if (districts[i].parentid == value.id) {
                    this.regionoptions.push(districts[i]);
                }
            }
        },

        //选择市辖区的响应方法
        selectRegionHandle(value) {
            console.log(value);
            this.regionObject = value;;
        },


        //获取地址信息
        getAddressDataInfo() {
            let that = this;
            $http.get('member.member-address.address', { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '').then(function (response) {
                if (response.result == 1) {
                    var province = JSON.stringify(response.data.province);
                    var city = JSON.stringify(response.data.city);
                    var district = JSON.stringify(response.data.district);
                    localStorage.setItem("province", province);
                    localStorage.setItem("city", city);
                    localStorage.setItem("district", district);

                    //初始化数据
                    that.initProvice();

                } else {
                    that.popAddressClose();
                    MessageBox.alert(response.msg);

                }
            }, function (response) {
                that.popAddressClose();
                MessageBox.alert(response);

            });
        },

        //提交 isAgain是否再次申请
        submit(isAgain) {
            if (this.fun.isTextEmpty(this.name)) {
                Toast("请填写姓名");
                return;
            }

            if (this.fun.isTextEmpty(this.phone)) {
                Toast("请填写手机号");
                return;
            }


            if (this.fun.isMoblie(this.phone)) {
               Toast("请输入正确的手机号");
                return;
            }

            if (this.fun.isTextEmpty(this.selectLevel)) {
                Toast("请选择代理类型");
                return;
            }


            switch (this.selectLevel.tag) {
                case 0:
                    if (this.fun.isTextEmpty(this.proviceObject)) {
                        Toast("请选择省级区域");
                        return;
                    }
                    break;
                case 1:
                    if (this.fun.isTextEmpty(this.proviceObject)) {
                        Toast("请选择省级区域");
                        return;
                    }

                    if (this.fun.isTextEmpty(this.cityObject)) {
                        Toast("请选择市级区域");
                        return;
                    }
                    break;
                case 2:
                    if (this.fun.isTextEmpty(this.proviceObject)) {
                        Toast("请选择省级区域");
                        return;
                    }

                    if (this.fun.isTextEmpty(this.cityObject)) {
                        Toast("请选择市级区域");
                        return;
                    }

                    if (this.fun.isTextEmpty(this.regionObject)) {
                        Toast("请选择区/县级区域");
                        return;
                    }
                    break;
                case 3:
                    if (this.fun.isTextEmpty(this.proviceObject)) {
                        Toast("请选择省级区域");
                        return;
                    }

                    if (this.fun.isTextEmpty(this.cityObject)) {
                        Toast("请选择市级区域");
                        return;
                    }

                    if (this.fun.isTextEmpty(this.regionObject)) {
                        Toast("请选择区/县级区域");
                        return;
                    }

                    if (this.fun.isTextEmpty(this.district)) {
                        Toast("请填写街道/乡镇区域");
                        return;
                    }
                    break;

                default:
                    break;
            }

            //提交数据
            let that = this;
            let json = { "data": JSON.stringify(this.assembleJson()) };
            $http.get(isAgain ? "plugin.area-dividend.api.area-dividend.apply-again" : "plugin.area-dividend.api.area-dividend.set-agent-apply", json, '提交中').then(function (response) {
                if (response.result == 1) {
                    Toast(response.msg);
                    that.$router.go(-1);
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                Toast(response.msg);
            });
        },

        //组装json
        assembleJson() {
            let json = { "real_name": this.name, "mobile": this.phone };

            switch (this.selectLevel.tag) {
                case 0:
                    json.province_id = this.proviceObject.id;
                    break;
                case 1:
                    json.province_id = this.proviceObject.id;
                    json.city_id = this.cityObject.id;
                    break;
                case 2:
                    json.province_id = this.proviceObject.id;
                    json.city_id = this.cityObject.id;
                    json.district_id = this.regionObject.id;
                    break;
                case 3:

                    break;

                default:
                    break;
            }

            return json;
        }
    }


}