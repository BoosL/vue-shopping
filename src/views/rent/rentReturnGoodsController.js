import { Indicator, Toast } from 'mint-ui';
export default {
	data() {
		return {
			expressName: '',//保存选择的快递公司
			orderNum: "",//保存快递单号
			addInfo: {},//保存收货地址信息
			options: [],//快递信息
		}
	},

	activated() {
		this.init();//获取数据
		this.initExpress();//获取快递信息

	},

	methods: {
		back() {
			this.$router.go(-1);
		},

		//发送数据的方法
		ensure() {
			if (this.fun.isTextEmpty(this.expressName)) {
				Toast("请选择快递公司");
				return;
			}

			if (this.fun.isTextEmpty(this.orderNum)) {
				Toast("请选输入快递单号");
				return;
			}

			//封装所要提交的数据
			let that = this;
			let return_express = {
				"return_express[express_code]": this.orderNum,
				"return_express[express_company_name]": this.expressName,
				"return_express[express_sn]": this.orderNum,
				order_id: this.$route.params.id
			};

			$http.get("plugin.lease.frontend.modules.order.controllers.operation.returnGoods", return_express, "请求中").then(function (response) {
				console.log(response);
				if (response.result == 1) {
					that.$router.go(-1);
				} else {
					Toast(response.msg);
				}
			}, function (response) {
				Toast(response);
			});
		},
		//请求收获的地址等信息
		init() {
			let that = this;
			$http.get("plugin.lease.frontend.modules.dispatch.controllers.detail.shopAddress", {}, "加载中").then(function (response) {
				console.log(response);
				if (response.result == 1) {
					that.addInfo = response.data;
				} else {
					console.log(response);
					Toast(response.msg);
				}
			}, function (response) {
				console.log(response);
				Toast(response);
			});
		},
		//请求所有的快递公司名称
		initExpress() {
			let that = this;
			$http.get("dispatch.express-list", {}, "加载中").then(function (response) {
				console.log(response);
				if (response.result == 1) {
					that.options = response.data.express_companies;
				} else {
					console.log(response);
				}
			}, function (response) {
				console.log(response);
			});
		}
	},
}

