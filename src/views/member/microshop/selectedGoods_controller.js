import cTitle from 'components/title';
export default {

	data() {
		return {
			selectGood: [],
			totalGoodsNum: 0
		}
	},


	activated() {
		this.init();
	},

	methods: {
		pushFn() {
			let that = this;
			$http.get("plugin.micro.frontend.controllers.MicroShop.set-goods", { "goods_ids": that.$route.params.goods }).then(function (response) {
				if (response.result == 1) {
					that.$router.push(that.fun.getUrl('microShop_home'));
				} else {
					console.log(response);
				}
			}, function (response) {
				console.log(response);
			});
		},
		goBack() {
			this.$router.go(-1);
		},
		init() {
			let that = this;
			$http.get("plugin.micro.frontend.controllers.MicroShop.get-goods", { "goods_ids": this.$route.params.goods }).then(function (response) {
				console.log("-------------显示已选商品列表", );
				console.log(response);
				if (response.result == 1) {
					that.selectGood = response.data.list;
					that.totalGoodsNum = response.data.count;
				} else {
					console.log(response);
				}
			}, function (response) {
				console.log(response);
			});
		}
	},
	components: { cTitle },


}