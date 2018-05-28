import cTitle from 'components/title';
import { mapState, mapMutations } from 'vuex';
import { Indicator, Toast } from 'mint-ui';
import { Switch } from 'mint-ui';

import { Field } from 'mint-ui';
import { Picker } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import District from 'src/gov_province_city_area_id';
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
            order_data: "",

            onclast: false,
            toi: this.fun.getKeyByI(),
            goodsInfo: {},
            order: {},
            dispatch: {},
            realname: "",//收件人
            mobile: "",
            address: "",
            goods: [],
            goods_price: 0,
            dispatch_price: 0,
            price: 0,
            discount_price: 0,
            popupSpecs: false,
            addressData: [],

            //优惠券
            popupCouponSpecs: false,
            coupon_size: 0,
            checkCouponList: [],
            use_coupon_size: 0,

            //积分抵扣 其他抵扣
            checkDeductionList: [],


            //新增地址v2------------------------------------------------新增地址v2//
            form: {
                username: '',
                mobile: '',
                province: '',
                city: '',
                district: '',
                street: '',
                address: '',
                isDefault: false,
            },
            district: District,//地址本地数据
            popAddAddress: false,
            addressShow: false,
            addressName: "",//地址区域
            strShow: false,//街道显示
            streetShow: false,//街道pop
            //新增地址v2------------------------------------------------新增地址v2//


            //跨境
            isTaxGoods: false,
            member_name: '',
            member_card: '',
            popupMemberSpecs: false,
            explain_title: '',
            explain_content: '',

            //O2O部分
            storeCarts: [],
            store_id: 0,
            selected: 0,
            store_info: {},
            linkinfo: {
                mobile: '',
                name: '',
            },
            dispatch: [],
        }
    },



    activated() {
        this.linkinfo = {
            mobile: '',
            name: '',
        };

        this.order_data = "",

            this.store_info = {};
        this.storeCarts = [];
        this.store_id = 0;
        this.selected = "1";
        this.popupSpecs = false;
        this.toi = this.fun.getKeyByI();
        this.goodsInfo = {};
        this.order = {};
        this.dispatch = {};
        this.addressData = [];

        //优惠券
        this.popupCouponSpecs = false;
        this.coupon_size = 0;
        this.use_coupon_size = 0;
        this.checkCouponList = [];
        this.coupons = [];

        //抵扣
        this.checkDeductionList = [];

        //新增地址v2------------------------------------------------新增地址v2//
        this.popAddAddress = false;
        this.addressShow = false;
        this.strShow = false;
        this.addressName = "";
        this.streetShow = false;
        //新增地址v2------------------------------------------------新增地址v2//

        this.dispatch = [],
            this.dispatchName = {
                1: '快递',
                2: '上门自提',
                3: '送货上门',
            },


            currentAddId = "";
        currentAddress = {};
        //接收参数
        _root_tag = this.$route.params.tag;

        console.log("_root_tag", _root_tag);
        if (this.fun.isTextEmpty(_root_tag)) {
            //为空跳回
            //this.$router.push({ name: "home", params: {}, query: { i: this.toi } });
            this.$router.push(this.fun.getUrl('home', {}));
        }


        if (_root_tag == TAG_ACTION_BUY) {
            _goodsId = this.$route.params.goodsId;
            _optionsId = this.$route.params.optionsId;
            _total = this.$route.params.total;

            this.getDataActionBuy();//直接购买
        } else if (_root_tag == TAG_ACTION_CART) {
            _cart_ids = this.$route.params.cart_ids;
            this.getDataActionCart();//购物车结算
        } else if (_root_tag == 'store') {
            this.store_id = this.$route.params.store_id;

            this.getDataActionStoreCart();//门店结算
        }

        this.slider();
        this.checkTaxGoods();
        this.isTaxGoods = false;
    },

    mounted() {
        this.popupSpecs = false;
        this.toi = this.fun.getKeyByI();
    },
    methods: {

        slider() {

        },
        checkTaxGoods() {
            if (_root_tag == TAG_ACTION_BUY) {
                _goodsId = this.$route.params.goodsId;
                _cart_ids.push(_goodsId);
            } else if (_root_tag == TAG_ACTION_CART) {
                _cart_ids = this.$route.params.cart_ids;
            }

            let that = this;

            let json = { goods_ids: JSON.stringify(_cart_ids), "i": this.fun.getKeyByI(), "type": this.fun.getTyep(), "mid": this.fun.getKeyByMid() };

            $http.get('from.div-from.isDisplay', json, "添加中...").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    if (response.data.status) {
                        that.isTaxGoods = true;
                        that.getMemberInfo();
                    } else {
                        that.isTaxGoods = false;
                    }

                } else {
                    //Toast(response.msg);
                }

            }, function (response) {
                console.log(response)
            });

        },

        saveInfo() {
            let that = this;
            console.log('route', this.$route.params);
            var _goodsId = this.$route.params.goodsId;
            var _optionsId = this.$route.params.optionsId;
            var _total = this.$route.params.total;
            var submitActionTag = this.$route.params.tag;
            if (submitActionTag == 'cart') {
                that.addCartReq(_goodsId, _optionsId, _total);
                return;
            }
            let json = { member_name: this.member_name, member_card: this.member_card, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
            $http.get('from.div-from.updateMemberInfo', json, "添加中...").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    //Toast(response.msg);
                    //that.$router.push(that.fun.getUrl('goodsorder', { tag: submitActionTag, goodsId: _goodsId, optionsId: _optionsId, total: _total }));
                    Toast('更新成功');
                    that.popupMemberSpecs = false;
                } else {
                    Toast(response.msg);
                }

            }, function (response) {
                console.log(response)
            });
        },
        open() {
            this.$alert('这是一段内容', '标题名称', {
                confirmButtonText: '确定',
                message: this.explain_content,
                title: this.explain_title
            })
        },

        getMemberInfo() {
            let that = this;
            $http.get('from.div-from.getMemberInfo', {}, "生成中...").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    that.member_name = response.data.realname;
                    that.member_card = response.data.idcard;
                    that.getExplain();
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                console.log(response);
            });

        },

        getExplain() {
            let that = this;
            $http.get('from.div-from.explain', {}, "添加中...").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    that.explain_title = response.data.explain_title;
                    that.explain_content = response.data.explain_content;
                } else {
                    Toast(response.msg);
                }

            }, function (response) {
                console.log(response)
            });
        },

        changeMemberInfo() {
            //this.$router.push(this.fun.getUrl('myinfo', { tag: 'preOrder' }));
            this.popupMemberSpecs = true;

        },

        getStoreInfo() {
            let that = this;

            $http.get('plugin.store-cashier.frontend.store.get-store-info.get-info-by-store-id', { store_id: that.store_id }, "").then(function (response) {
                console.log('store_info', response.data)
                if (response.result == 1) {
                    that.store_info = response.data;
                    that.dispatch = response.data.dispatch_type;

                    if (!that.selected) {
                        that.selected = that.dispatch[0];
                    }
                    console.log('dispatch::::', that.dispatch);
                } else {
                    Toast(response.msg);
                    that.$router.go(-1);
                }
            }, function (response) {
                console.log(response);
            });
        },

        //直接购买
        getDataActionBuy() {
            let that = this;
            let json = { goods_id: _goodsId, total: _total, option_id: _optionsId, "i": this.fun.getKeyByI(), "type": this.fun.getTyep(), member_coupon_ids: this.assembleCoupons(), orders: JSON.stringify(this.assembleDeduction()), address: JSON.stringify(currentAddress), dispatch_type_id: 1 };

            $http.get('order.goods-buy', json, "生成中...").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    that.goodsInfo = response.data;
                    //that.order = response.data.order;
                    //that.dispatch = response.data.dispatch;
                    that.setViewData(response.data);//设置界面
                    that.setAddressViewData(response.data.dispatch.default_member_address);//设置地址界面
                    that.initCoupon(response.data.discount.coupon);//设置优惠券信息
                } else {
                    Toast(response.msg);
                    that.$router.go(-1);

                }
            }, function (response) {
                console.log(response);
            });
        },

        //购物车结算
        getDataActionCart() {
            let that = this;
            let json = { cart_ids: _cart_ids, "i": this.fun.getKeyByI(), "type": this.fun.getTyep(), member_coupon_ids: this.assembleCoupons(), orders: JSON.stringify(this.assembleDeduction()), address: JSON.stringify(currentAddress), dispatch_type_id: 1 };

            $http.get('order.cart-buy', json, "生成中...").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    that.goodsInfo = response.data;
                    //that.order = response.data.order;
                    //that.dispatch = response.data.dispatch;
                    that.setViewData(response.data);//设置界面
                    that.setAddressViewData(response.data.dispatch.default_member_address);//设置地址界面
                    that.initCoupon(response.data.discount.coupon);//设置优惠券信息
                } else {
                    Toast(response.msg);
                    that.$router.go(-1);
                }
            }, function (response) {
                console.log(response)
            });
        },


        //门店购物车商品
        getDataActionStoreCart() {
            let that = this;
            console.log('getDataActionStoreCart', this.store_id);
            that.getStoreInfo();
            $http.get('plugin.store-cashier.frontend.shoppingCart.member-cart.index', { store_id: that.store_id }).then((response) => {
                if (response.result == 1) {
                    //that.storeCarts = response.data;
                    that.storeCarts = [];
                    response.data.forEach(item => {
                        that.storeCarts.push(item.id);
                    });

                    that.getStoreCartBuy(that.storeCarts);
                    console.log(that.storeCarts);
                    return;
                } else {
                    alert('无商品');
                }
            }), (response) => {
            }

        },

        setDispatch() {
            console.log('setdispatch');
            this.getDataActionStoreCart();
        },

        //门店结算
        getStoreCartBuy(cart_ids) {
            var that = this;
            let json = { cart_ids: cart_ids, store_id: that.store_id, dispatch_type_id: this.selected, "i": this.fun.getKeyByI(), "type": this.fun.getTyep(), member_coupon_ids: this.assembleCoupons(), orders: JSON.stringify(this.assembleDeduction()), address: JSON.stringify(currentAddress) };

            $http.get('plugin.store-cashier.frontend.store.cart-buy', json, "生成中...").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    that.goodsInfo = response.data;
                    //that.order = response.data.order;
                    //that.dispatch = response.data.dispatch;
                    that.setViewData(response.data);//设置界面
                    that.setAddressViewData(response.data.dispatch.default_member_address);//设置地址界面
                    that.initCoupon(response.data.discount.coupon);//设置优惠券信息
                } else {
                    Toast(response.msg);
                    //that.$router.go(-1);
                    return;
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
            this.address = this.fun.isTextEmpty(model.province) ? "" : model.province + " " + model.city + " " + model.district + " " + (this.fun.isTextEmpty(model.street) ? "" : model.street + " " )+ model.address;
        },

        //选择地址后重新计算数据
        requestByAddress() {

            //重新计算
            if (_root_tag == TAG_ACTION_BUY) {
                this.order_data = "";
                this.getDataActionBuy();//直接购买
            } else if (_root_tag == TAG_ACTION_CART) {
                this.order_data = "";
                this.getDataActionCart();//购物车结算
            } else if (_root_tag == 'store') {
                this.getDataActionStoreCart();//门店结算
            }
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
            let json = { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
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

        //跳转到新增地址
        addAddress() {
            //关闭 地址栏
            this.popupSpecs = false;
            //this.$router.push({ name: "appendAddress", params: {}, query: { i: this.toi } });

            //新增地址 本地处理
            this.showAddAddress();
        },

        submitStore() {
            if (this.selected == 2 && (this.fun.isTextEmpty(this.linkinfo.name) || this.fun.isTextEmpty(this.linkinfo.mobile))) {
                Toast("请输入提货人信息");
                return;
            }

            if ((this.selected == 1 || this.selected == 3) && this.fun.isTextEmpty(currentAddId)) {
                Toast("请选择收货地址");
                return;
            }

            if (this.selected == 2 && this.fun.isMoblie(this.linkinfo.mobile)) {
                MessageBox.alert("请输入正确的手机号", '提示');
                return;
            }

            let that = this;
            let json = this.assembleJson();
            $http.post('plugin.store-cashier.frontend.store.create', json, "提交中...").then(function (response) {
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

        //提交订单
        submit() {
            if (this.store_id) {
                this.submitStore();
                return;
            }
            if (this.fun.isTextEmpty(currentAddId)) {
                Toast("请选择收货地址");
                return;
            }

            let that = this;
            let json = this.assembleJson();
            $http.post('order.create', json, "提交中...").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    //that.$router.push({ name: "orderlist", params: { status: "1" }, query: { i: that.toi } });
                    //status:"2" 合并支付
                    //that.$router.push({ name: "orderpay", params: { status: "2", order_ids: response.data.order_ids }, query: { i: that.toi } });

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
            // encodeURI(url)
            if (_root_tag == TAG_ACTION_BUY) {
                json = { dispatch_type_id: 1, address: JSON.stringify(currentAddress), goods: JSON.stringify(this.assembleGoods()), member_coupon_ids: JSON.stringify(this.assembleCoupons()), orders: JSON.stringify(this.assembleDeduction()) };
            } else if (_root_tag == TAG_ACTION_CART) {
                json = { dispatch_type_id: 1, address: JSON.stringify(currentAddress), goods: JSON.stringify(this.assembleGoods()), cart_ids: JSON.stringify(_cart_ids), member_coupon_ids: JSON.stringify(this.assembleCoupons()), orders: JSON.stringify(this.assembleDeduction()) };
            } else if (_root_tag == 'store') {
                json = { dispatch_type_id: this.selected, store_id: this.store_id, mobile: this.linkinfo.mobile, realname: this.linkinfo.name, address: JSON.stringify(currentAddress), goods: JSON.stringify(this.assembleGoods()), cart_ids: JSON.stringify(this.storeCarts), member_coupon_ids: JSON.stringify(this.assembleCoupons()), orders: JSON.stringify(this.assembleDeduction()) };
            }
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
            if (_root_tag == TAG_ACTION_BUY) {
                this.getDataActionBuy();//直接购买
            } else if (_root_tag == TAG_ACTION_CART) {
                this.getDataActionCart();//购物车结算
            } else if (_root_tag == 'store') {
                this.getDataActionStoreCart();//门店结算
            }

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
            this.screenDiscount(item, value);

            //重新计算
            if (_root_tag == TAG_ACTION_BUY) {
                this.getDataActionBuy();//直接购买
            } else if (_root_tag == TAG_ACTION_CART) {
                this.getDataActionCart();//购物车结算
            } else if (_root_tag == 'store') {
                this.getDataActionStoreCart();//门店结算
            }
        },

        //筛选抵扣
        screenDiscount(item, value) {

            console.log("value::::", value);

            //临时数据
            let _deductionItem = new Object;
            let tempDeduction_ids = [];

            if (value.checked)//选中添加
            {

                if (this.checkDeductionList.length > 0) {
                    for (let i = 0; i < this.checkDeductionList.length; i++) {
                        if (this.checkDeductionList[i].pre_id == item.order.pre_id) {
                            //先获取回来
                            if (this.fun.isTextEmpty(this.checkDeductionList[i].deduction_ids)) {
                                tempDeduction_ids = [];
                            } else {
                                tempDeduction_ids = this.checkDeductionList[i].deduction_ids;
                            }

                            this.checkDeductionList.splice(i, 1);
                            break;
                        }
                    }

                    if (tempDeduction_ids.length > 0) {

                        for (let j = 0; j < tempDeduction_ids.length; j++) {
                            if (tempDeduction_ids[j] == value.code) {
                                tempDeduction_ids.splice(j, 1);
                            }
                        }

                        tempDeduction_ids.push(value.code);
                        _deductionItem.deduction_ids = tempDeduction_ids;
                        _deductionItem.pre_id = item.order.pre_id;
                        this.checkDeductionList.push(_deductionItem);

                    } else {

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

                    if (tempDeduction_ids.length > 0) {
                        for (let j = 0; j < tempDeduction_ids.length; j++) {
                            if (tempDeduction_ids[j] == value.code) {
                                tempDeduction_ids.splice(j, 1);
                            }
                        }

                        tempDeduction_ids.push(value.code);
                        _deductionItem.deduction_ids = tempDeduction_ids;
                        _deductionItem.pre_id = item.order.pre_id;
                        this.checkDeductionList.push(_deductionItem);

                    } else {
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
                            if (this.fun.isTextEmpty(this.checkDeductionList[i].deduction_ids)) {
                                tempDeduction_ids = [];
                            } else {
                                tempDeduction_ids = this.checkDeductionList[i].deduction_ids;
                            }
                            this.checkDeductionList.splice(i, 1);
                            break;
                        }
                    }


                    if (tempDeduction_ids.length > 0) {
                        for (let j = 0; j < tempDeduction_ids.length; j++) {
                            if (tempDeduction_ids[j] == value.code) {
                                tempDeduction_ids.splice(j, 1);
                            }
                        }

                        //tempDeduction_ids.push(value.code);
                        _deductionItem.deduction_ids = tempDeduction_ids;
                        _deductionItem.pre_id = item.order.pre_id;
                        this.checkDeductionList.push(_deductionItem);

                    } else {
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
                } else {
                    if (tempDeduction_ids.length > 0) {
                        for (let j = 0; j < tempDeduction_ids.length; j++) {
                            if (tempDeduction_ids[j] == value.code) {
                                tempDeduction_ids.splice(j, 1);
                            }
                        }

                        //tempDeduction_ids.push(value.code);
                        _deductionItem.deduction_ids = tempDeduction_ids;
                        _deductionItem.pre_id = item.order.pre_id;
                        this.checkDeductionList.push(_deductionItem);
                    } else {
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

        //判断数组 
        arrayContains(arrayList, item) {
            for (let i = 0; i < arrayList.length; i++) {
                if (arrayList[i] == item)
                    return true;
            }
            return false;
        },




        //新增地址v2----------------------------------------------新增地址v2//
        //显示增加地址
        showAddAddress() {
            this.popAddAddress = true;
        },

        //关闭增加地址
        popAddressClose() {
            this.popAddAddress = false;
        },


        //地址回调
        addressCallback(obj) {
            this.form.street = "";
            this.districtVal = "";
            this.addressName = obj.itemName1 + ' ' + obj.itemName2 + ' ' + obj.itemName3;
            this.form.province = obj.itemName1;
            this.form.city = obj.itemName2;
            this.form.district = obj.itemName3;
            this.getStreet(obj.itemValue3);

        },

        //获取街道
        getStreet(param) {
            $http.get('member.memberAddress.street', { district_id: param }).then(response => {
                console.log(response);
                if (response.result == 1 && !this.fun.isTextEmpty(response.data)) {
                    if (!this.fun.isTextEmpty(response.data) && response.data.length > 0) {
                        this.districtVal = response.data;
                        this.strShow = true;
                    } else {
                        this.strShow = false;
                    }
                } else {
                    this.strShow = false;
                }
            }).catch(error => {
                this.strShow = false;
                console.log(error);
            });
        },

        streetChoose() {

            if (this.fun.isTextEmpty(this.addressName)) {
                MessageBox.alert("请先选择所在地区");
            } else {
                this.streetShow = true;
            }
        },

        streetConfirm(name) {
            this.form.street = name;
            this.streetShow = false;
        },

        //增加地址
        appendAddress() {
            var that = this;

            if (this.fun.isTextEmpty(this.form.username)) {
                MessageBox.alert("请输入收货人姓名");
                return;
            }

            if (this.fun.isTextEmpty(this.form.mobile)) {
                MessageBox.alert("请输入手机机号");
                return;
            }

            if (this.fun.isMoblie(this.form.mobile)) {
                MessageBox.alert("请输入正确的手机号");
                return;
            }

            if (this.fun.isTextEmpty(this.addressName)) {
                MessageBox.alert("请选择所在区域");
                return;
            }

            if (this.strShow && this.fun.isTextEmpty(this.form.street)) {
                MessageBox.alert("请选择所在街道");
                return;
            }

            if (this.fun.isTextEmpty(this.form.address)) {
                MessageBox.alert("请输入详细地址");
                return;
            }

            let json = {};
            if (this.strShow) {
                json = { username: this.form.username, mobile: this.form.mobile, province: this.form.province, city: this.form.city, district: this.form.district, street: this.form.street, address: this.form.address, isdefault: this.form.isDefault ? 1 : 0 };
            } else {
                json = { username: this.form.username, mobile: this.form.mobile, province: this.form.province, city: this.form.city, district: this.form.district, address: this.form.address, isdefault: this.form.isDefault ? 1 : 0 };
            }


            $http.post('member.member-address.store', json, "").then(function (response) {
                if (response.result == 1) {
                    MessageBox.alert(response.msg);
                    that.popAddressClose();
                    that.setAddressViewData(response.data);
                    that.requestByAddress();//选择地址后重新计算
                } else {
                    MessageBox.alert(response.msg);
                }
            }, function (response) {
                // error callback
            });
        },
        //新增地址v2----------------------------------------------新增地址v2//
    },
    components: { cTitle }
}