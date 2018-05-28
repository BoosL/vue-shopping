import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default {
    data() {
        return {
            toi: this.fun.getKeyByI(),
            alipay_url: '',
            uid: ''
        }
    },
    methods: {
        webToPay() {
            if (!this.fun.isWeiXin()) {
                document.location.href = this.alipay_url;
            }
        },
        //余额充值
        toPay() {
            var that = this;
            $http.get('finance.balance.alipay', { order_sn: this.$route.params.order_pay_id, uid: this.$route.params.uid, pay_type: 2, recharge_money: this.$route.params.recharge_money, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '正在充值...').then(function (response) {

                if (response.result == 1) {

                    that.alipay_url = response.data;
                    //alert(response.data);
                    that.webToPay();

                } else {

                    MessageBox.alert(response.msg, '提示');
                }
            }, function (response) {
                // error callback
            });
        },
        //订单支付
        toPayOrder() {
            console.log("11231312");
            var that = this;
            $http.get('order.merge-pay.alipay', { uid: this.$route.params.uid, order_pay_id: this.$route.params.order_pay_id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '正在...').then(function (response) {
                if (response.result == 1) {
                    that.alipay_url = response.data;
                    that.webToPay();
                } else {
                    MessageBox.alert(response.msg, '提示');
                }
            }, function (response) {
                // error callback
            });
        },

        //金币充值
        toPayByGold() {
            var that = this;
            let json = { pay_type: 2, change_value: this.$route.params.recharge_money, "i": this.fun.getKeyByI(), "type": this.fun.getTyep(), uid: this.$route.params.uid };
            $http.get('plugin.gold.frontend.controllers.recharge', json, '正在充值...').then(function (response) {
                if (response.result == 1) {
                    that.alipay_url = response.data;
                    that.webToPay();
                } else {
                    MessageBox.alert(response.msg, '提示');
                }
            }, function (response) {
                // error callback
                MessageBox.alert(response.msg, '提示');
            });
        },


        //押金充值 租赁
        toPayByCash() {
            var that = this;
            let json = { payment: 2, order_sn: this.$route.params.order_pay_id };
            $http.get('plugin.lease.Frontend.Modules.Deposit.Controllers.recharge.pay', json, '正在充值...').then(function (response) {
                if (response.result == 1) {
                    that.alipay_url = response.data;
                    that.webToPay();
                } else {
                    MessageBox.alert(response.msg, '提示');
                }
            }, function (response) {
                // error callback
                MessageBox.alert(response.msg, '提示');
            });
        },

        //打卡支付
        toPayClockin() {
            var that = this;
            this.alipay_url = this.$route.params.url;
            that.webToPay();

            // var that = this;
            // let json = { "pay_method": "2", "amount": "1" };
            // $http.get('plugin.clock-in.api.clock-in-pay.run-clock-pay', json, '支付中...').then(function (response) {
            //     if (response.result == 1) {
            //         that.alipay_url = response.data;
            //         that.webToPay();
            //     } else {
            //         MessageBox.alert(response.msg, '提示');
            //     }
            // }, function (response) {
            //     // error callback
            //     MessageBox.alert(response.msg, '提示');
            // });
        },

        //云收银 支付宝支付
        toPayCloud() {
            var that = this;
            this.alipay_url = this.$route.params.url;
            that.webToPay();
        },


        //云收银 支付宝支付
        toPayCloudByBalance() {
            var that = this;
            this.alipay_url = this.$route.params.url;
            that.webToPay();
        }

    },
    activated() {
        this.toi = this.fun.getKeyByI();
        console.log(this.$route.params.status);
        if (!this.fun.isWeiXin()) {
            if (this.$route.params.status == "2") {
                //订单支付
                this.toPayOrder();
            } else if (this.$route.params.status == "1") {
                //余额充值
                this.toPay();
            } else if (this.$route.params.status == "3") {
                //金币充值
                this.toPayByGold();
            } else if (this.$route.params.status == "4") {
                //押金充值
                this.toPayByCash();
            } else if (this.$route.params.status == "5") {
                //打卡
                this.toPayClockin();
            } else if (this.$route.params.status == "6") {
                //云收银 支付宝支付
                this.toPayCloud();
            } else if (this.$route.params.status == "7") {
                //第三方 支付宝 余额充值
                this.toPayCloudByBalance();
            } else if (this.$route.params.status == "8") {
                //云收银 支付宝支付 收银台支付
                this.toPayCloud();
            } else if (this.$route.params.status == "9") {
                //云收银 支付宝支付 视频打赏
                this.toPayCloud();
            }
        }

    },
    components: { cTitle }
};