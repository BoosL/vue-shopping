import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { Lazyload, Button } from 'mint-ui';
export default {
    data() {
        return {
            toi: this.fun.getKeyByI(),
            order_id: '',
            order_data: '',
            bottomStatus: '',
            selected: '1',
            allLoaded: false,
            isVirtual: false,
            receiver: '',
            mobile: '',
            address: '',
            pay_type_id: '',
            orderType: 'shop',
            order_pay_id: '',
            qrcode: '',
            showQrcode: false,
        };
    },
    methods:
    {

        //初始化
        init() {
            this.order_id = '';
            this.order_data = '';
            this.bottomStatus = '';
            this.selected = '1';
            this.allLoaded = false;
            this.isVirtual = false;
            this.receiver = '';
            this.mobile = '';
            this.address = '';
            this.qrcode = '';
            this.showQrcode = false;
        },

        operation(btn, order) {

            //this.actions=[{name:"无理由",method:"sheetAction"},{name:"不退了",method:"sheetAction"}];
            if (btn.value == 8) {
                this.checklogistics(order, btn);
            } else if (btn.value == 12) {
                this.deleteOrder(order, btn);

            } else if (btn.value == 10) {
                this.comment(order, btn);

            } else if (btn.value == 1) {
                this.toPay(order, btn);
            } else if (btn.value == 13) {
                //退款
                this.toRefund(order, btn);

            } else if (btn.value == 9) {
                //取消订单
                this.cancleOrder(order, btn);

            } else if (btn.value == 5) {
                //确认订单
                this.confirmOrder(order, btn);

            } else if (btn.value == 18) {
                //退款中
                this.toRefundDetail(order, btn);

            } else if (btn.value == 'cashierPay') {
                //退款中
                this.cashPayOrder(order, btn);

            } else if (btn.value == 'verification_code') {
                //验证核销
                this.verification(order, btn);

            } else if (btn.value == 20) {
                console.log("现金支付");
                //现金付款
                this.verificationCash(order, btn);
            }

        },
        checklogistics(item, btn) {

            this.$router.push(this.fun.getUrl('logistics', { order: item }));

        },
        cashPayOrder(item, btn) {
            MessageBox({
                title: '提示',
                message: '确定此订单已付款?',
                showCancelButton: true
            }).then(action => {
                if (action == 'confirm') {
                    // this.datasource.splice(this.datasource.indexOf(item), 1);
                    this.sentRequest(btn.api, { order_id: item.id, order_pay_id: this.order_pay_id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, false);

                }

            });

        },

        verification(item, btn) {
            this.$router.push(this.fun.getUrl('orderVerification', { order_id: item.id, api: btn.api }));
        },

        verificationCash(item, btn) {
            MessageBox({
                title: '提示',
                message: '确定此订单已付款?',
                showCancelButton: true
            }).then(action => {
                if (action == 'confirm') {
                    // this.datasource.splice(this.datasource.indexOf(item), 1);
                    this.sentRequest(btn.api, { order_id: item.id, order_pay_id: this.order_pay_id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, false);

                }

            });
        },

        cancleOrder(item, btn) {
            MessageBox({
                title: '提示',
                message: '确定取消此订单?',
                showCancelButton: true
            }).then(action => {
                if (action == 'confirm') {
                    //删除当前选中的地址
                    // this.datasource.splice(this.datasource.indexOf(item), 1);
                    this.sentRequest(btn.api, { order_id: item.id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, false);

                }

            });

        },
        //删除订单
        deleteOrder(item, btn) {
            MessageBox({
                title: '提示',
                message: '确定删除此订单?',
                showCancelButton: true
            }).then(action => {
                if (action == 'confirm') {
                    //删除当前选中的地址
                    this.sentRequest(btn.api, { order_id: item.id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, false);

                }

            });
        },
        toPay(item, btn) {
            //type-2合并支付 type-1订单支付

            this.$router.push(this.fun.getUrl('orderpay', { status: 1, order_ids: item.id }));

        },
        //评价订单
        comment(item, btn) {

            this.$router.push(this.fun.getUrl('comment', { order: item }));

        },
        confirmOrder(item, btn) {
            MessageBox({
                title: '提示',
                message: '您确定' + btn.name + "?",
                showCancelButton: true
            }).then(action => {
                if (action == 'confirm') {
                    var that = this;
                    //this.$emit('ConfrimOrderNotification', item);
                    //调用接口通知服务器收到货物请求
                    $http.get(btn.api, { order_id: item.id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '正在处理订单...').then(function (response) {
                        if (response.result == 1) {
                            MessageBox(response.msg, '确定');
                            that.$router.push({ name: "home", params: {} });
                        } else {
                            MessageBox(response.msg, '确定');
                            that.$router.push({ name: "home", params: {} });
                        }


                    }, function (response) {
                        MessageBox(response.msg, '确定');
                        that.$router.push({ name: "home", params: {} });
                    });

                } else {

                }

            });


        },
        toRefundDetail(item, btn) {

            this.$router.push(this.fun.getUrl('aftersales', { refund_id: item.refund_id }));
        },
        //追加评价
        reCommend(item, btn) {

        },
        //退款
        toRefund(item, btn) {
            //refund

            this.$router.push(this.fun.getUrl('refund', { order: item, type: 1 }));

        },
        //跳转商品详情页面
        toGoodsDetail(goods, isshow,showCourse) {
            if (isshow == 0) {
                if(showCourse ==1){
                    //this.$router.push(this.fun.getUrl('goods', { id: goods.goods_id }));
                    this.$router.push(this.fun.getUrl('CourseDetail',{goods_id:goods.goods_id}));
                }else if(showCourse ==0){
                    this.$router.push(this.fun.getUrl('goods', { id: goods.goods_id }));
                }else{
                    return;
                }
                
            }

        },
        sentRequest(action, params, isIndicator) {
            var that = this;
            $http.get(action, params, '').then(function (response) {

                if (response.result == 1) {
                    MessageBox.alert(response.msg, '提示');
                    if (window.history.length <= 1) {
                        that.$router.push(that.fun.getUrl('home', {}));
                    } else {
                        that.$router.go(-1);
                    }
                } else {
                    MessageBox.alert(response.msg, '提示');

                }
            }, function (response) {
                // error callback
            });
        },
        //发起http请求
        getNetData(order_id) {
            var that = this;
            if (this.orderType == 'cashier') {
                var url = 'plugin.store-cashier.frontend.Order.detail';
            } else if (this.orderType == 'store') {
                var url = 'plugin.store-cashier.frontend.store.order-detail';
            } else {
                var url = 'order.detail';
            }

            $http.get(url, { order_id: order_id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '正在获取订单...').then(function (response) {

                if (response.result == 1) {
                    var myData = response.data;
                    console.log("myData", response.data);
                    that.order_data = myData;
                    that.order_pay_id = myData.order_pay_id;
                    if (myData.address_info) {
                        that.address = myData.address_info.address;
                        that.mobile = myData.address_info.mobile;
                        that.receiver = myData.address_info.realname;
                    }

                    that.pay_type_id = myData.pay_type_id;

                } else {
                    MessageBox.alert(response.msg);
                    that.$router.go(-1);
                }
            }, function (response) {
                // error callback
            });

        }


    },

    activated() {
        if (this.$route.params.orderType && this.$route.params.orderType == 'cashier') {
            this.orderType = 'cashier';
        } else if (this.$route.params.orderType && this.$route.params.orderType == 'store') {
            this.orderType = 'store';
        } else {
            this.orderType = 'shop';
        }
        console.log('detail::', this.$route.params);
        console.log('detail::', this.orderType);

        //console.log( this.$store.state);
        this.init();//初始化
        this.toi = this.fun.getKeyByI();
        this.order_id = this.$route.params.order_id;
        this.getNetData(this.order_id);
        console.log(this.order_id);
        //   console.log(this.order_data);
        //this.isVirtual  = this.order_data.isVirtual;


    },
    components: { cTitle }
}