import { Actionsheet } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';
export default
	{
		//select_inde-当前选择行,datasource-数据源,currentdata-当前选择的数据
		props: ['datasource', 'status', 'getAllLoaded'],
		data() {
			return {

			}
		},
		activated() {

		},
		methods: {

			//按钮点击事件处理
			operation(btn, item) {
				var that = this;
				switch (btn.value) {
					case 1://付款
						that.toPay(btn, item);
						break;
					case 5://确认收货
						that.confirmOrder(btn, item);
						break;
					case 8://查看物流
						that.checklogistics(btn, item);
						break;
					case 9://取消订单
						that.cancleOrder(btn, item);
						break;
					case 12://删除订单
						this.deleteOrder(btn, item);
						break;
					case 13://退款
						that.toRefund(btn, item);
						break;
					case 18://退款中
						this.toRefundDetail(btn, item);
						break;
					case 20://归还
						this.returnGoods(btn, item);
						break;

					default:
						break;
				}
			},


			//付款
			toPay(btn, item) {
				//status-2合并支付 type-1订单支付
				this.$router.push(this.fun.getUrl("orderpay", { status: 2, order_ids: item.id }));
			},


			//确认收货
			confirmOrder(btn, item) {
				MessageBox({
					title: '提示',
					message: '您确定收到货物?',
					showCancelButton: true
				}).then(action => {
					if (action == 'confirm') {
						this.confirmOrderPost(btn.api, item);
					} else {

					}
				});
			},
			//确认收货post
			confirmOrderPost(url, item) {
				url = "plugin.lease.frontend.modules.order.controllers.operation.receive";//暂时写死替换 和正常商品确认收货有区别
				var that = this;
				$http.get(url, { order_id: item.id }, "操作中").then(function (response) {
					if (response.result == 1) {
						//that.$emit('ConfrimOrderNotification', item);
						that.datasource.splice(that.datasource.indexOf(item), 1);//删除当前选中的地址
					} else {
						MessageBox.alert(response.msg);
					}
				}, function (response) {
					MessageBox.alert(response);
				});
			},

			//查看物流
			checklogistics(btn, item) {
				this.$router.push(this.fun.getUrl("logistics", { order: item }));
			},

			//退款
			toRefund(btn, item) {
				//refund
				this.$router.push(this.fun.getUrl("refund", { order_id: item.id, type: 1 }));
			},
			//退款中
			toRefundDetail(btn, item) {
				this.$router.push(this.fun.getUrl('aftersales', { refund_id: item.refund_id }));
			},

			//删除订单
			deleteOrder(btn, item) {
				MessageBox({
					title: '提示',
					message: '确定删除此订单?',
					showCancelButton: true
				}).then(action => {
					if (action == 'confirm') {
						this.deleteOrderPost(btn.api, item);
					}
				});
			},

			//删除订单post
			deleteOrderPost(url, item) {
				let that = this;
				let json = { order_id: item.id };
				$http.get(url, json, "").then(function (response) {
					console.log(response.data)
					if (response.result == 1) {
						this.datasource.splice(this.datasource.indexOf(item), 1);//删除当前选中的地址
						console.log(that.datasource);
						Toast("订单删除成功");
					} else {
						MessageBox.alert(response.msg);
					}
				}, function (response) {
					MessageBox.alert(response);
				});
			},


			//取消订单
			cancleOrder(btn, item) {
				MessageBox({
					title: '提示',
					message: '确定取消此订单?',
					showCancelButton: true
				}).then(action => {
					if (action == 'confirm') {
						this.cancleOrderPost(btn.api, item);//网络操作
					}
				});
			},

			//取消订单post
			cancleOrderPost(url, item) {
				let that = this;
				let json = { order_id: item.id };
				$http.get(url, json, "").then(function (response) {
					console.log(response.data)
					if (response.result == 1) {
						that.datasource.splice(that.datasource.indexOf(item), 1);//删除当前选中的地址
						console.log(that.datasource);
						Toast("订单取消成功");
					} else {
						MessageBox.alert(response.msg);
					}
				}, function (response) {
					MessageBox.alert(response);
				});
			},

			//归还
			returnGoods(btn, item) {
				MessageBox({
					title: '提示',
					message: '确定归还商品?',
					showCancelButton: true
				}).then(action => {
					if (action == 'confirm') {
						this.$router.push(this.fun.getUrl('rentReturnGoods', { id: item.id }));
					}
				});
			},


			//接口操作
			sentRequest(action, params, isIndicator) {
				$http.get(action, params, '').then(function (response) {
					if (response.result = 0) {

					}
				}, function (response) {
					// error callback
				});
			},




			routeJump(item) {

				switch (item.status) {
					case -1://已关闭
						this.$router.push(this.fun.getUrl('toBeClose', { id: item.id }));
						break;
					case 0://待付款
						this.$router.push(this.fun.getUrl('toBePay', { id: item.id }));
						break;
					case 1://待发货
						this.$router.push(this.fun.getUrl('toBeSend', { id: item.id }));
						break;
					case 2://待收货
						this.$router.push(this.fun.getUrl('toBetakeGoods', { id: item.id }));
						break;
					case 3://已完成
						this.$router.push(this.fun.getUrl('toBeComplete', { id: item.id }));
						break;
					case 4://待归还
						this.$router.push(this.fun.getUrl('toBeReturned', { id: item.id }));
						break;
					case 5://归还中
						this.$router.push(this.fun.getUrl('toBeReturneding', { id: item.id }));
						break;
					default:
						break;
				}

				// console.log("====================================" + item.pay)
				// if (item.pay = "待发货") {
				// 	this.$router.push(this.fun.getUrl('toBeSend',{id:item.id}));
				// } else if (item.pay = "待付款") {
				// 	this.$router.push(this.fun.getUrl('toBePay'));
				// } else if (item.pay = "待收货") {
				// 	this.$router.push(this.fun.getUrl('toBetakeGoods'));
				// } else if (item.pay = "待归还") {
				// 	this.$router.push(this.fun.getUrl('toBeReturned'));
				// } else if (item.pay = "已归还") {
				// 	this.$router.push(this.fun.getUrl('hasBeenReturned'));
				// } else if (item.pay = "已转增") {
				// 	this.$router.push(this.fun.getUrl('hasTransferred'));
				// }
			},

			//1.点击"代付款"产品,跳转路由 this.fun.getUrl('toBePay')
			//2.点击"代发货"产品,跳转路由 this.fun.getUrl('toBeSend')
			//3.点击"待收货"产品,跳转路由 this.fun.getUrl('toBetakeGoods')
			//4.点击"待归还"产品,跳转路由 this.fun.getUrl('toBeReturned')
			//5.点击"已归还"产品,跳转路由 this.fun.getUrl('hasBeenReturned')
			//6.点击"已转增"产品,跳转路由 this.fun.getUrl('hasTransferred')
			//6.点击"逾期未归还"产品,跳转路由 this.fun.getUrl('overdueReturn')
		}
	}