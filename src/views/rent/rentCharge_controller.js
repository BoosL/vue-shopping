
import cTitle from 'components/title';
import { Indicator, Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
	data() {
		return {
			currentMoney: "0.00",
			recharge_money: "0.00",
			alipay: false,
			credit: false,
			wechat: false,
		}
	},
	activated() {
		this.getData();
	},
	methods: {

		//初始化数据
		getData() {
			var that = this;
			$http.get('plugin.lease.Frontend.Modules.Deposit.Controllers.recharge.page', {}, '加载中...').then(function (response) {

				if (response.result == 1) {
					that.currentMoney = response.data.deposit;
					that.alipay = response.data.alipay;
					that.credit = response.data.credit;
					that.wechat = response.data.wechat;
				} else {
					MessageBox.alert(response.msg);
				}
			}, function (response) {
				MessageBox.alert(response);
			});
		},


		//充值
		charge(type) {
			if (this.fun.isTextEmpty(this.recharge_money)) {
				Toast("充值钱数不能为空");
				return;
			}

			if (this.recharge_money <= 0) {
				Toast("充值钱数必需大于0");
				return;
			}

			var that = this;
			let json = { payment: type, money: this.recharge_money };
			$http.get('plugin.lease.Frontend.Modules.Deposit.Controllers.recharge.supply', json, '充值中...').then(function (response) {
				if (response.result == 1) {
					//更新类型请求接口
					switch (type) {
						case 1://1微信支付
							that.wechatData(response.data.payment, response.data.order_sn);
							break;
						case 2://2支付宝支付
							that.alipayData(response.data.payment, response.data.order_sn);
							break;
						case 3://3余额支付
							that.creditData(response.data.payment, response.data.order_sn);
							break;
						default:
							break;
					}
				} else {
					MessageBox.alert(response.msg);
				}
			}, function (response) {
				MessageBox.alert(response);
			});
		},

		//网络请求 支付 微信
		wechatData(type, order_sn) {
			var that = this;
			let json = { payment: type, order_sn: order_sn };
			$http.get('plugin.lease.Frontend.Modules.Deposit.Controllers.recharge.pay', json, '充值中...').then(function (response) {
				if (response.result == 1) {
					//微信充值
					wx.config(response.data.js);
					that.WXPay(response.data.config);
				} else {
					MessageBox.alert(response.msg);
				}
			}, function (response) {
				MessageBox.alert(response);
			});
		},

		WXPay(payParams) {
			//alert('"'+payParams.timestamp+'"');
			var that = this;
			wx.chooseWXPay({
				appId: payParams.appId,
				timestamp: payParams.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
				nonceStr: payParams.nonceStr, // 支付签名随机串，不长于 32 位
				package: payParams.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
				signType: payParams.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				paySign: payParams.paySign, // 支付签名
				success: function (res) {
					// 支付成功后的回调函数
					if (res.errMsg == "chooseWXPay:ok") {
						MessageBox.alert(response.msg, '提示');
						that.$router.go(-1);
					} else {
						MessageBox.alert('充值失败，请返回重试');
					}
				},
				cancel: function (res) {
					//支付取消
				},
				fail: function (res) {
					MessageBox.alert("充值失败，请返回重试。");
				}
			});
		},




		//网络请求 支付 支付宝
		alipayData(type, order_sn) {
			this.$router.push(this.fun.getUrl('alipay', { status: 4, recharge_money: this.recharge_money, order_pay_id: order_sn, uid: window.localStorage.uid }));
		},

		//网络请求 支付 余额
		creditData(type, order_sn) {
			var that = this;
			let json = { payment: type, order_sn: order_sn };
			$http.get('plugin.lease.Frontend.Modules.Deposit.Controllers.recharge.pay', json, '充值中...').then(function (response) {
				if (response.result == 1) {
					MessageBox.alert(response.msg, '提示');
					that.$router.go(-1);
				} else {
					MessageBox.alert(response.msg);
				}
			}, function (response) {
				MessageBox.alert(response);
			});
		},

	},
	components: { cTitle }
}
