import { Indicator, Toast } from 'mint-ui';
export default {
	data: function () {
		return {
			data: [],
			bannerImgSrc: "",
			nextUrl: '',
			goodsID: '',
			signature: "",
			sucHide: 'true',
			radio3: 999
		}
	},
	methods: {
		show(e){
			console.log(e.target);
			console.log(e.currentTarget);
		},

		//点击支付按钮 进行支付操作 同时弹出支付成功页面
		pay() {
			console.log(this.goodsID);
			if (this.fun.isTextEmpty(this.goodsID)) {
				Toast("请选择店主等级");
				return;
			}


			let that = this;
			let json={goods_id: this.goodsID, total: 1};
			$http.get(this.nextUrl, json, "提交中").then(function (response) {

				if (response.result == 1) {
					that.$router.push(that.fun.getUrl('goodsorder', { tag: "-2", goodsId: that.goodsID, optionsId: "", total: "1" }, "提交中"));
				} else {
					console.log(response);
					Toast(response.msg);
				}

			}, function (response) {
				// error callback
				Toast(response);
			});
		},
		open() {
            this.$router.push(this.fun.getUrl('microShop_apply_reg_info'));
		},

		//点击选择某一项进行样式修改
		changeStyle(e, val) {
			console.log("改变样式。。。。");
			var lia = document.getElementsByClassName("clickBox");
			for (var i = 0; i < lia.length; i++) {
				lia[i].className = "";
			}
			e.target.className = "active";
			this.goodsID = val;
		},
		changeStyle2(elem, e) {
			console.log(elem);
			this.radio3 = e;
			this.goodsID = elem.goods_id;
		},
		goBack() {
			this.$router.go(-1);
		},

		//请求数据 初始化页面 
		init() {
			let that = this;
			$http.get('plugin.micro.frontend.controllers.MicroShopApply.apply', {}, "加载中").then(function (response) {

				console.log("申请页面内请求到的数据----------------------");
				console.log(response);
				//alert(response.data)
				if (response.result == 1) {
					that.nextUrl = response.data.create_order_api;
					that.bannerImgSrc = response.data.micro_thumb;
					that.data = response.data.levels;
					//that.goodsID = that.data[0].goods_id;
					that.signature = response.data.signature;
					window.localStorage.setItem('reg_info', response.data.signature);
				} else {
					console.log(response.msg);
				}

			}, function (response) {
				// error callback
				console.log(response);
			});
		}


	},
	activated() {

		this.data = [];
		this.bannerImgSrc = "";
		this.nextUrl = '';
		this.goodsID = '';
		this.signature = "";
		this.sucHide = 'true';
		this.radio3 = 999;


		this.init();

	}
}

