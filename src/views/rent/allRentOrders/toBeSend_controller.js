import { Popup } from 'mint-ui';
import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';
export default {
	components: { cTitle },
	data() {
		return {

			order_id: "",
			status_name: "",
			buttons: [],
			address_info: {},//收件人
			lease_order_return_address:{},//退还地址
			lease_order: {},//租赁信息
			has_many_order_goods: [],//订单商品
			dispatch_price: 0.00,//总运费
			price: 0.00,//合计
			order_sn: "",//订单号
			pay_type_name: "",//付款时间
			pay_time: "",//支付时间
			create_time: "",//下单时间

			item: {},

			rental: false,
			deposit: false,
		}
	},

	activated() {
		this.order_id = this.$route.params.id;
		this.getData();//获取数据
	},

	methods: {
		getData() {
			let that = this;
			let json = { order_id: this.order_id };
			$http.get("plugin.lease.frontend.modules.order.controllers.detail", json, "加载中").then(function (response) {
				console.log(response.data);
				if (response.result == 1) {
					that.item = response.data;
					that.status_name = response.data.status_name;//状态名
					that.buttons = response.data.button_models;//按钮
					that.address_info = response.data.address_info;//收件人
					that.lease_order_return_address=response.data.lease_order_return_address;//退还地址
					that.lease_order = response.data.lease_order;//租赁信息
					that.has_many_order_goods = response.data.has_many_order_goods;//订单商品
					that.dispatch_price = response.data.dispatch_price;//总运费
					that.price = response.data.price;//合计
					that.order_sn = response.data.order_sn;//订单号
					that.pay_type_name = response.data.pay_type_name;//付款方式
					that.pay_time = response.data.pay_time;//支付时间
					that.create_time = response.data.create_time;//下单时间
				} else {
					MessageBox.alert(response.msg);
				}
			}, function (response) {
				MessageBox.alert(response);
			});
		},


		//按钮点击
		operation(btn) {
			var that = this;
			let item = this.item;
			switch (btn.value) {
				case 8://查看物流
					that.checklogistics(btn, item);
					break;
				case 13://退款
					that.toRefund(btn, item);
					break;
				case 18://退款中
					this.toRefundDetail(btn, item);
					break;
				default:
					break;
			}
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

		rentalTip() {
			this.rental = !this.rental;
		},
		depositTip() {
			this.deposit = !this.deposit;
		},
		closeModal() {
			this.rental = false;
			this.deposit = false;
		}

	}
}