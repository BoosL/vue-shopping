import cTitle from 'components/title';
import { Indicator, Toast } from 'mint-ui';
export default {

	data() {
		return {
			module1: {},
			module2: [],
			module3: [],
		}
	},
	activated() {
		this.init();
	},

	methods: {
		//获取数据
		init() {
			let that = this;
			let json = { log_id: this.$route.params.orderID };
			$http.get("plugin.micro.frontend.controllers.MicroShopBonusLog.detail", json, "加载中").then(function (response) {
				if (response.result == 1) {
					that.setModule1(response.data);//设置显示模块1
					that.setModule2(response.data);//设置显示模块2
					that.setModule3(response.data);//设置显示模块3
				} else {
					Toast(response.msg);
				}
			}, function (response) {
				Toast(response);
			});
		},

		//设置显示模块1
		setModule1(data) {
			this.module1 = data.log.module1;
		},
		//设置显示模块2
		setModule2(data) {
			this.module2 = data.log.module2;
		},

		//设置显示模块3
		setModule3(data) {
			this.module3 = data.log.module3;
		},
		goBack() {
			this.$router.go(-1);
		}
	},
	components: { cTitle }

}