import { mapState } from 'vuex';
import cTitle from 'components/title';
import { Indicator, Toast } from 'mint-ui';

const SUBMIT_ACTION_CART = "-1";//添加到购物车
const SUBMIT_ACTION_BUY = "-2";//立即购买
export default {

	data() {
		return {
			toi: this.fun.getKeyByI(),
			edit: false,
			cartDelete: false,
			checkList: [],
			allCheckList: [],
			goods: [],
			checkAll: false,
			total: 0.00,
			count: 0,
			isShowList: false,
		}
	},
	activated() {
		this.toi = this.fun.getKeyByI();
		this.initView();//初始化数据
		this.getData();
	},

	mounted() {
		this.toi = this.fun.getKeyByI();
		this.slider();
		//this.$store.commit('cfoots', { a: false });
	},

	methods: {
		slider() {
			console.log("slider");
			//些方式相当于window.onload
		},

		//初始化view
		initView() {
			this.edit = false;
			this.cartDelete = false;
			this.checkList = [];
			this.allCheckList = [];
			this.goods = [];
			this.checkAll = false;
			this.total = 0.00;
			this.count = 0;
			this.isShowList = false;
		},

		//获取数据
		getData() {
			console.log("获取数据");

			// this.goods = [{
			// 	"id": "0",
			// 	"created_at": "2017-10-10",
			// 	"goods_id": "1234",
			// 	"option_id": "2",
			// 	"price": 10,
			// 	"total": 1,
			// 	"option_str": "大小颜色",
			// 	"goods": {
			// 		"goods_id": "1234",
			// 		"thumb": "http://www.heliaigou.com/attachment/images/4/2016/04/DNPoNs307fFSd00J0Kf4uuP4F0pPOJ.jpg",
			// 		"title": "测试商品0"
			// 	}

			// }, {
			// 	"id": "1",
			// 	"created_at": "2017-10-10",
			// 	"goods_id": "1234",
			// 	"option_id": "2",
			// 	"price": 100,
			// 	"total": 2,
			// 	"option_str": "大小颜色",
			// 	"goods": {
			// 		"goods_id": "1234",
			// 		"thumb": "http://www.heliaigou.com/attachment/images/4/2016/04/DNPoNs307fFSd00J0Kf4uuP4F0pPOJ.jpg",
			// 		"title": "测试商品1"
			// 	}
			// },{
			// 	"id": "2",
			// 	"created_at": "2017-10-10",
			// 	"goods_id": "1234",
			// 	"option_id": "2",
			// 	"price": 100,
			// 	"total": 2,
			// 	"option_str": "大小颜色",
			// 	"goods": {
			// 		"goods_id": "1234",
			// 		"thumb": "http://www.heliaigou.com/attachment/images/4/2016/04/DNPoNs307fFSd00J0Kf4uuP4F0pPOJ.jpg",
			// 		"title": "测试商品2"
			// 	}
			// }];



			let that = this;
			let json = { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };


			$http.get('member.member-cart.index', json).then(function (response) {
				console.log(response)
				if (response.result == 1) {
					that.goods = response.data;
					that.allCheckListInit(that.goods);
				} else {

				}

			}, function (response) {
				console.log(response)
			});
		},

		//初始化全选数据
		allCheckListInit(data) {
			if (data.length) {
				this.isShowList = true;
			}
			this.allCheckList = data;
		},

		//全选
		allSelect(event) {
			console.log("全选");
			console.log(event);
			this.checkList = event.target.checked ? this.allCheckList : [];
			console.log(this.checkList);
			//计算总价格
			this.countTotalPrice();
		},

		//全选监听
		allSelectHandle(value) {
			console.log(value.length);
			let checkedCount = value.length;
			this.checkAll = checkedCount === this.goods.length;
			console.log(this.checkList);
			//计算总价格
			this.countTotalPrice();
		},

		//单选
		selectGood(value) {
			//console.log("单选中");
			//console.log(value);
		},


		//改变数量接口操作
		changeNumber(goods, _num) {
			console.log(goods);
			let that = this;
			let json = { id: goods.id, num: _num, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };

			$http.get('member.member-cart.updateNum', json, "").then(function (response) {
				console.log(response)
				if (response.result == 1) {
					if (_num > 0) {
						that.addNumberView(goods);
					} else {
						that.deleteNumberView(goods);
					}

				} else {
					Toast(response.msg);
				}

			}, function (response) {
				console.log(response)
			});
		},
		//添加处理view
		addNumberView(goods) {
			for (var i = 0; i < this.checkList.length; i++) {
				if (goods.id == this.checkList[i].id) {
					if (this.checkList[i].total > 0) {
						this.checkList[i].total = this.checkList[i].total + 1;
						this.countTotalPrice();//计算总价格
						return;
					}
				}
			}



			for (var i = 0; i < this.goods.length; i++) {
				if (goods.id == this.goods[i].id) {
					if (this.goods[i].total > 0) {
						this.goods[i].total = this.goods[i].total + 1;
						break;
					}
				}
			}
		},
		//添加
		addNumber(goods) {
			//网络操作后处理
			this.changeNumber(goods, 1);
		},

		//减少View处理
		deleteNumberView(goods) {
			for (var i = 0; i < this.checkList.length; i++) {
				if (goods.id == this.checkList[i].id) {
					if (this.checkList[i].total > 1) {
						this.checkList[i].total = this.checkList[i].total - 1;
						this.countTotalPrice();//计算总价格
						return;
					}
				}
			}

			for (var i = 0; i < this.goods.length; i++) {
				if (goods.id == this.goods[i].id) {
					if (this.goods[i].total > 1) {
						this.goods[i].total = this.goods[i].total - 1;
						break;
					}
				}
			}
		},

		//减少
		deleteNumber(goods) {
			if (goods.total == 1) {
				return;
			}
			//网络操作后处理
			this.changeNumber(goods, -1);
		},

		//界面操作
		onCartDelete() {
			this.cartDelete = !this.cartDelete;
			this.checkList = [];//清空数据源
			this.checkAll = false;//恢复view
			this.allCheckList = this.goods;//重置全选数据
			this.countTotalPrice();//计算价格总数
			if (this.goods.length == 0) {
				this.isShowList = false;
			}
		},

		//删除商品
		deleteGoods() {
			if (this.checkList.length == 0) {
				Toast("请选择删除商品");
				console.log("请选择删除商品");
				return;
			}


			//删除网络操作
			let that = this;
			let _ids = [];
			for (var i = 0; i < this.checkList.length; i++) {
				_ids.push(this.checkList[i].id);
			}
			console.log(_ids);
			//let json = { ids: JSON.stringify(_ids) };
			let json = { ids: _ids, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
			$http.get('member.member-cart.destroy', json, "操作中").then(function (response) {
				console.log(response)
				if (response.result == 1) {
					that.deleteGoodsView();
				} else {
					Toast(response.msg);
				}

			}, function (response) {
				console.log(response)
			});

		},

		//删除后View操作
		deleteGoodsView() {
			if (this.checkAll) {
				this.goods = [];//清空数据源
				this.checkList = [];//清空数据源
				this.allCheckList = [];//全选数据
			} else {
				for (var i = 0; i < this.checkList.length; i++) {
					for (var j = 0; j < this.goods.length; j++) {
						console.log(this.goods[j].id);
						if (this.goods[j].id == this.checkList[i].id) {
							this.goods.splice(j, 1);
							break;
						}
					}
				}
				this.checkList = [];//清空

				console.log(this.goods);
				console.log(this.checkList);
			}

			this.onCartDelete();//操作界面
		},

		//计算总价格&总数
		countTotalPrice() {
			this.count = 0;//初始化
			this.total = 0.00;//初始化
			this.count = this.checkList.length;

			for (var i = 0; i < this.checkList.length; i++) {
				this.total += (this.checkList[i].goods.price * this.checkList[i].total);
			}

			this.total = Number(this.total.toString().match(/^\d+(?:\.\d{0,2})?/));
		},

		//提交订单
		submitGoods() {
			if (this.checkList.length == 0) {
				console.log("请选择结算商品");
				Toast("请选择结算商品");
				return;
			}
			var _cart_ids = [];
			for (var i = 0; i < this.checkList.length; i++) {
				_cart_ids.push(this.checkList[i].id);
			}

			console.log(_cart_ids);
			//this.$router.push({ name: "goodsorder", params: { tag: SUBMIT_ACTION_CART, cart_ids: _cart_ids }, query: { i: this.toi } });
			this.$router.push(this.fun.getUrl('goodsorder', { tag: SUBMIT_ACTION_CART, cart_ids: _cart_ids }));
		},

		//跳转商品详情
		toGoodsInfo(goods) {
			//this.$router.push({ name: 'goods', params: { id: goods.goods_id }, query: { i: this.toi } });
			this.$router.push(this.fun.getUrl('goodsO2O', { id: goods.goods_id ,o2o:"o2o"}));
		}


	},
	components: { cTitle }
}