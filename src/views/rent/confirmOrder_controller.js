import { Loadmore } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import cTitle from 'components/title';


var _goodsId = "";
var _optionsId = "";
var _total = "";
var _rentDate = "";
var _rentDay = "";
var _time_unit="";


var currentAddId = "";
var currentAddress = {};

var _root_tag = "";//rent


export default {
    data() {
        return {
            popupVisible: false,
            rental: false,
            deposit: false,
            realname: "",//收件人
            mobile: "",
            address: "",
            goods_price: 0,
            dispatch_price: 0,
            price: 0,
            discount_price: 0,

            goodsInfo: {},

            popupSpecs: false,
            addressData: [],

            checkAgree: false,

            //新增地址------------------------------------------------新增地址//
            animation: false,
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
            },
            provinceoptions: [],
            cityoptions: [],
            regionoptions: [],
            provicevalue: "",
            cityvalue: "",
            regionvalue: "",
            //新增地址------------------------------------------------新增地址//
        };
    },

    activated() {
        _goodsId = this.$route.params.goodsId;
        _optionsId = this.$route.params.optionsId;
        _total = this.$route.params.total;
        _rentDate = this.$route.params.rentDate;
        _rentDay = this.$route.params.rentDay;
        _time_unit=this.$route.params.time_unit;

        currentAddId = "";
        currentAddress = {};

        this.goodsInfo = {};

        this.popupSpecs = false;
        this.addressData = [];

        //接收参数
        _root_tag = this.$route.params.tag;
        if (this.fun.isTextEmpty(_root_tag)) {
            //为空跳回
            this.$router.push(this.fun.getUrl('home', {}));
            return;
        }

        this.getData();//获取数据

        //新增地址------------------------------------------------新增地址//
        this.animation = false;
        this.provinceoptions = [];
        //新增地址------------------------------------------------新增地址//
    },
    methods:
    {
        //获取数据
        getData() {
            let that = this;
            let json = { "goods_id": _goodsId, "total": _total, "option_id": _optionsId, "lease[start_time]": _rentDate, "cycle": _rentDay, address: JSON.stringify(currentAddress) ,"time_unit":_time_unit};

            $http.get('plugin.lease.frontend.modules.order.controllers.goods-buy', json, "生成中...").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    that.goodsInfo = response.data;
                    that.setViewData(response.data);//设置界面
                    that.setAddressViewData(response.data.dispatch.default_member_address);//设置地址界面

                } else {
                    Toast(response.msg);
                    that.$router.go(-1);
                }
            }, function (response) {
                console.log(response)
            });
        },


        //设置界面
        setViewData(data) {

            this.order_data = data.order_data;

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

        //设置地址界面
        setAddressViewData(model) {
            if (model == undefined || model == "" || model == []) {
                return;
            }

            //设置地址id
            currentAddId = model.id;
            currentAddress = model;

            this.realname = this.fun.isTextEmpty(model.username) ? "" : model.username;
            this.mobile = this.fun.isTextEmpty(model.mobile) ? "" : model.mobile;
            this.address = this.fun.isTextEmpty(model.province) ? "" : model.province + " " + model.city + " " + model.district + " " + model.address;
        },


        //显示地址pop
        showAddress() {

            //获取收货地址
            this.getAddress();
        },

        //获取收货地址
        getAddress() {
            this.addressData = [];
            let that = this;
            let json = {};
            $http.get('member.member-address.index', json, "获取中...").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    that.popupSpecs = true;
                    that.addressData = response.data;
                } else {

                }
            }, function (response) {
                console.log(response);
            });
        },

        //选择地址
        selectAddress(item) {
            console.log(item);
            this.setAddressViewData(item);//更新界面 & ID
            this.requestByAddress();//选择地址后重新计算
            //关闭 地址栏
            this.popupSpecs = false;
        },

        //选择地址后重新计算数据
        requestByAddress() {
            //重新计算
            this.getData();
        },

        //跳转到新增地址
        addAddress() {
            //关闭 地址栏
            this.popupSpecs = false;
            //this.$router.push({ name: "appendAddress", params: {}, query: { i: this.toi } });

            //新增地址 本地处理
            this.showAddAddress();
        },

        //新增地址------------------------------------------------新增地址//
        //显示增加地址
        showAddAddress() {

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

            this.animation = true;
        },

        //关闭增加地址
        popAddressClose() {
            this.animation = false;
        },

        //选择省份的响应方法
        selectProviceHandle(value) {
            //初始化一些默认值 避免逻辑错误
            this.cityoptions = [];
            this.regionoptions = [];
            this.cityvalue = '';
            this.regionvalue = '';


            this.form.provicevalue = value.areaname;
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
            this.form.city = value.areaname;
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
            console.log(value.areaname);
            this.form.district = value.areaname;;
        },
        appendAddress() {
            //console.log(this.form);
            var that = this;

            if (this.fun.isTextEmpty(this.form.username)) {
                MessageBox.alert("请输入收货人姓名");
                return;
            }

            if (this.fun.isMoblie(this.form.mobile)) {
                MessageBox.alert("请输入正确的手机号");
                return;
            }

            if (this.form.isdefault) {
                this.form.isdefault = 1;
            } else {
                this.form.isdefault = 0;
            }

            if (this.fun.isTextEmpty(this.provicevalue)) {
                MessageBox.alert("请选择省份");
                return;
            }

            if (this.fun.isTextEmpty(this.cityvalue)) {
                MessageBox.alert("请选择城市");
                return;
            }

            if (this.fun.isTextEmpty(this.regionvalue)) {
                MessageBox.alert("请选择街道");
                return;
            }


            if (this.fun.isTextEmpty(this.form.address)) {
                MessageBox.alert("请输入详细地址");
                return;
            }

            let json = { "i": this.fun.getKeyByI(), "type": this.fun.getTyep(), username: this.form.username, mobile: this.form.mobile, city: this.form.city, address: this.form.address, province: this.form.provicevalue, isdefault: this.form.isdefault, district: this.form.district };
            $http.get('member.member-address.store', json).then(function (response) {
                if (response.result == 1) {
                    MessageBox.alert(response.msg);
                    that.animation = false;
                    that.setAddressViewData(response.data);
                } else {
                    MessageBox.alert(response.msg);
                }
            }, function (response) {
                // error callback
            });


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

            })


        },
        //新增地址------------------------------------------------新增地址//


        //提交数据
        submit() {
            if (this.fun.isTextEmpty(currentAddId)) {
                Toast("请选择收货地址");
                return;
            }

            if (!this.checkAgree) {
                Toast("请阅读《租赁协议》并同意");
                return;
            }

            let that = this;
            let json = this.assembleJson();
            $http.get('plugin.lease.frontend.modules.order.controllers.create', json, "提交中...").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    that.$router.push(that.fun.getUrl('orderpay', { status: "2", order_ids: response.data.order_ids }));
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
            json = { address: JSON.stringify(currentAddress), goods: JSON.stringify(this.assembleGoods()), member_coupon_ids: JSON.stringify(this.assembleCoupons()), orders: JSON.stringify(this.assembleDeduction()), "lease[start_time]": _rentDate, "cycle": _rentDay, "remark": this.fun.isTextEmpty(this.remark) ? "" : this.remark ,"time_unit":_time_unit};
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
            //暂时没有优惠券信息
            return coupons;
        },
        //组装优惠抵扣信息
        assembleDeduction() {
            let deductions = [];
            //暂时没有优惠抵扣信息
            return deductions;
        },


        //租赁协议
        rentPop() {
            this.popupVisible = !this.popupVisible;
        },

        //租赁协议  阅读并同意
        rentPopVerify() {
            this.rentPop();
            this.checkAgree = true;
        },

        //租金提示
        rentalTip() {
            this.rental = !this.rental;
        },

        //押金提示
        depositTip() {
            this.deposit = !this.deposit;
        },

        //关闭
        closeModal() {
            this.rental = false;
            this.deposit = false;
        },


        alertPop() {

        },
        check() {

        },
    },
    components: { cTitle }
}