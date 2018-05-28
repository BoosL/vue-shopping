import cTitle from 'components/title';
import { Indicator, Toast } from 'mint-ui';
export default {

	data() {
		return {

			mailLanguage:"",
			mailTeamReturnTitle:"",
			mailTeamAmount:"",
			mailTeamReturnRate:"",
			mailTeamName:"",
			mailTeamReturnName:"",

			order_amount: 0.00,
			return_amount: 0.00,
			status_name: "",
			each_return_rate: 0,
			return_mode: "",
			not_return: 0.00,

			id: "",
			order_sn: "",
			created_at: "",
			finish_time: "",
			mall_amount: "",
			rate: "",
			power_data: "",
			power_total: "",
		}
	},
	activated() {
		this.initMailLanguage();
		this.getData();
		this.init();
	},

	methods: {
		initMailLanguage() {
            this.mailLanguage = this.fun.initMailLanguage();
            this.fun.setWXTitle(this.fun.setMailLanguage("赠送详情", this.mailLanguage.team_return.return_detail));
			this.mailTeamReturnTitle = this.fun.setMailLanguage("赠送详情", this.mailLanguage.team_return.return_detail);
			this.mailTeamAmount = this.fun.setMailLanguage("赠送金额", this.mailLanguage.team_return.return_amount);
			this.mailTeamReturnRate = this.fun.setMailLanguage("赠送比例", this.mailLanguage.team_return.return_rate);
			this.mailTeamName = this.fun.setMailLanguage("经销商", this.mailLanguage.team_return.mailTeamName);
			this.mailTeamReturnName = this.fun.setMailLanguage("赠送", this.mailLanguage.team_return.return_name);
			
        },
		//初始化数据
		init() {
			this.order_amount = 0.00;
			this.return_amount = 0.00;
			this.status_name = "";
			this.each_return_rate = 0;
			this.return_mode = "";
			this.not_return = 0.00;

			this.id = "";
			this.order_sn = "";
			this.created_at = "";
			this.finish_time = "";
		},

		//获取数据
		getData() {
			let that = this;
			let json = { logid: this.$route.params.id };
			$http.get("plugin.team-return.api.team-return.get-team-return-detail", json, "加载中").then(function (response) {
				console.log('======', response);
				if (response.result == 1) {
					that.return_amount = response.data.amount;
					that.power_total = response.data.power_total;
					that.power_data = response.data.power_data;
					that.mall_amount = response.data.mall_amount;

					that.id = response.data.id;
					that.rate = response.data.rate;
					that.created_at = response.data.created_at;
				} else {
					Toast(response.msg);
				}
			}, function (response) {
				Toast(response);
			});
		},


		goBack() {
			this.$router.go(-1);
		}
	},
	components: { cTitle }

}