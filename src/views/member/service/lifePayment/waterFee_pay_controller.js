import cTitle from 'components/title';
import { Popup } from 'mint-ui';
import { Picker } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
	components: { cTitle },
	data() {
		return {
			language: {},//语言包
			para: {},//json数据
			goods_price: 0,//商品总价格
			price: 0,//总价格（合计）
			order_data: {},//订单商品、优惠信息
			deduction: {},//优惠信息
			checkDeductionList: [], //积分抵扣 其他抵扣
			goodsInfo: {},//商品信息
		}
	},
	methods: {

		//初始化数据
		initData() {
			this.para = {};//json数据
			this.goods_price = 0;//商品总价格
			this.price = 0;//总价格（合计）
			this.order_data = {};//订单商品、优惠信息
			this.deduction = {};//优惠信息
			this.checkDeductionList = []; //积分抵扣 其他抵扣
			this.goodsInf = {};//商品信息
		},

		//获取数据
		getData() {
			let that = this;

			$http.get('plugin.live.Frontend.Modules.Order.Controllers.goods-buy', that.para, "生成中...").then(function (response) {
				if (response.result == 1) {
					that.goodsInfo = response.data;
					that.setDataView(response.data);
				} else {
					MessageBox.alert(response.msg);
				}
			}, function (response) {
				console.log(response);
			});
		},


		setDataView(data) {
			this.order_data = data.order_data;
			this.deduction = data.order_data[0].discount.deduction;

			this.goods_price = data.total_goods_price;//设置商品总价格
			//this.dispatch_price = data.total_dispatch_price;//设置总运费价格
			//this.discount_price = data.total_discount_price;//设置总优惠价格
			//this.deduction_price = data.total_deduction_price;//设置总抵扣价格
			this.price = data.total_price;//设置总价格（合计）
		},


		//抵扣选择响应
		discountHandle(item, value) {
			//处理选择
			this.screenDiscount(item, value);
			this.para.orders = JSON.stringify(this.assembleDeduction());//重新组装优惠信息
			this.getData();//重新计算
		},

		screenDiscount(item, value) {
			let deductionItem = new Object();
			if (value.checked)//选中添加
			{
				if (this.checkDeductionList.length > 0) {
					for (let i = 0; i < this.checkDeductionList.length; i++) {
						if (this.checkDeductionList[i].pre_id == item.order.pre_id) {
							this.checkDeductionList.splice(i, 1);
						}
					}
					deductionItem.deduction_ids = value.id;
					deductionItem.pre_id = item.order.pre_id;
					this.checkDeductionList.push(deductionItem);
				} else {
					deductionItem.deduction_ids = value.id;
					deductionItem.pre_id = item.order.pre_id;
					this.checkDeductionList.push(deductionItem);
				}

			} else {//取消选中
				if (this.checkDeductionList.length > 0) {
					for (let i = 0; i < this.checkDeductionList.length; i++) {
						if (this.checkDeductionList[i].pre_id == item.order.pre_id) {
							this.checkDeductionList.splice(i, 1);
						}
					}
				}
			}
		},

		//组装优惠抵扣信息
		assembleDeduction() {
			let deductions = [];

			for (let i = 0; i < this.checkDeductionList.length; i++) {
				deductions.push(this.checkDeductionList[i]);
			}

			return deductions;

		},


		//提交订单
		submit() {

			let that = this;
			let json = this.assembleJson();
			$http.get('plugin.live.Frontend.Modules.Order.Controllers.create', json, "提交中...").then(function (response) {
				console.log(response.data)
				if (response.result == 1) {
					that.$router.push(that.fun.getUrl('orderpay', { status: "2", order_ids: response.data.order_ids }));
				} else {
					MessageBox.alert(response.msg);
				}
			}, function (response) {
				console.log(response);
			});
		},


		//组装json数据
		assembleJson() {
			this.para.address = "";
			this.para.goods = JSON.stringify(this.assembleGoods());
			this.para.member_coupon_ids = JSON.stringify(this.assembleCoupons());
			this.para.orders = JSON.stringify(this.assembleDeduction());

			//let json = {};
			//json = { address: "", goods: JSON.stringify(this.assembleGoods()), member_coupon_ids: JSON.stringify(this.assembleCoupons()), orders: JSON.stringify(this.assembleDeduction()) };
			return this.para;
		},

		//组装优惠券json信息
		assembleCoupons() {
			let coupons = [];

			return coupons;
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



	},
	//实时监测this.$store.state.service.chinese的变化，获取最新的语言包
	computed: {
		getLangState() {
			return this.$store.state.service.languageService;
		}
	},
	watch: {
		getLangState(val) {
			if (val) {
				this.language = JSON.parse(sessionStorage.languageService).waterFee;
			} else {
				this.language = this.$store.state.service.languageService.waterFee;
			}
		},
	},

	mounted() {
		if (sessionStorage.languageService) {
			this.language = JSON.parse(sessionStorage.languageService).waterFee;
		} else {
			this.language = this.$store.state.service.languageService.waterFee;
		}
	},

	activated() {
		this.initData();
		this.$store.commit('onload');
		//this.para =decodeURI(this.$route.params.para);
		this.para = JSON.parse(this.$route.params.para);
		//this.para = this.$route.params.para;//获取参数
		console.log(this.para);
		this.getData();
	},

}
