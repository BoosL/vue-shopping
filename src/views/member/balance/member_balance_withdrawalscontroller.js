import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';
export default
    {
        data() {
            return {
                toi: this.fun.getKeyByI(),
                //是否提现到微信
                withdrawToWechat: 0,
                //是否提现到支付宝
                withdrawToAlipay: 0,
                withdrawToManual: 0,
                balance: 0,
                info_form:
                {

                    balance_money: 0
                }
            }
        },
        activated() {
            this.toi = this.fun.getKeyByI();
            //获取数据
            this.getData();
        },
        methods:
        {
            //获取数据
            getData() {
                let that = this;
                let json = {};
                $http.get('finance.balance-withdraw.page', json, "获取中...").then(function (response) {
                    if (response.result == 1) {
                        that.balance = response.data.balance;
                        that.withdrawToAlipay = response.data.alipay;
                        that.withdrawToWechat = response.data.wechat;
                        that.withdrawToManual = response.data.manual;
                        console.log(that.withdrawToManual);
                        that.poundage = response.data.poundage;
                    } else {
                        console.log(response.msg);
                        Toast(response.msg);
                    }

                }, function (response) {
                    console.log(response);
                    Toast(response);
                });
            },

            confirmPost(type) {
                //withdraw_money
                var that = this;
                if (parseFloat(this.info_form.balance_money) > parseFloat(this.balance)) {
                    MessageBox.alert('提现金额不可大于您的余额', '提示');
                    return;

                }

                if (this.info_form.balance_money == undefined || this.info_form.balance_money <= 0 || this.info_form.balance_money == 0) {
                    MessageBox.alert('提现金额不可低于0元', '提示');
                    return;

                }

                $http.get('finance.balance-withdraw.withdraw', { "i": this.fun.getKeyByI(), "type": this.fun.getTyep(), withdraw_type: type, withdraw_money: this.info_form.balance_money }, '正在提交数据...').then(function (response) {

                    if (response.result == 1) {
                        MessageBox.alert(response.msg, '提示');
                        that.$router.go(-1);
                    } else {
                        MessageBox.alert(response.msg, '提示');
                    }
                }, function (response) {
                    // error callback
                });
            },


            confirm(type) {
                let that = this;
                switch (type) {
                    case 1:
                        that.confirmPost(type);
                        break;
                    case 2:
                        that.confirmPost(type);
                        break;
                    case 3:
                        that.manualVerify(type);
                        break;
                    default:
                        break;
                }
            },


            //手动提现验证
            manualVerify(type) {
                var that = this;

                if (parseFloat(this.info_form.balance_money) > parseFloat(this.balance)) {
                    MessageBox.alert('提现金额不可大于您的余额', '提示');
                    return;

                }

                if (this.info_form.balance_money == undefined || this.info_form.balance_money <= 0 || this.info_form.balance_money == 0) {
                    MessageBox.alert('提现金额不可低于0元', '提示');
                    return;

                }


                $http.post('finance.balance-withdraw.is-can-submit', {}, '').then(function (response) {
                    if (response.result == 1) {
                        if (response.data.status) {
                            that.confirmPost(type);//提现
                        } else {
                            that.setManualInfo(type, response.data.manual_type);
                        }
                    } else {
                        MessageBox('提示', response.msg);
                    }
                }, function (response) {
                    MessageBox('提示', response);
                });
            },

            setManualInfo(type, manual_type) {

                let msg = "";
                let routerPath = "";

                switch (manual_type) {
                    case "bank":
                        msg = "请先填写银行卡信息";
                        routerPath = "memberBank";
                        break;
                    case "wechat":
                        msg = "请先填写微信信息";
                        routerPath = "info";
                        break;
                    case "alipay":
                        msg = "请先填写支付宝信息";
                        routerPath = "info";
                        break;
                    default:
                        break;
                }

                let that = this;

                this.$dialog.confirm({
                    title: '提示',
                    mes: msg,
                    opts: [
                        {
                            txt: '取消',
                            color: false,
                            callback: () => {

                            }
                        },
                        {
                            txt: '确定',
                            color: true,
                            callback: () => {
                                that.$router.push(that.fun.getUrl(routerPath, {}));
                            }
                        }
                    ]
                });
            },
        },

        components: { cTitle }
    }   