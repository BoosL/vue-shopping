import cTitle from 'components/title';
import { Indicator, Toast } from 'mint-ui';
export default {

	data() {
		return {
			mailLanguage:"",
            mailSingleReturnName:"",
			mailReturnDetail:"",
			mailReturnAmount:"",

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
		}
	},
	activated() {
		this.initMailLanguage();
		this.getData();
		this.init();
	},

	methods: {
		initMailLanguage(){
			this.mailLanguage =this.fun.initMailLanguage();
			this.mailReturnDetail=this.fun.setMailLanguage("消费详情",this.mailLanguage.single_return.return_detail);
			this.fun.setWXTitle(this.fun.setMailLanguage("消费详情",this.mailLanguage.single_return.return_detail));
			this.mailReturnAmount=this.fun.setMailLanguage("已赠送金额",this.mailLanguage.single_return.return_amount);
            this.mailSingleReturnName=this.fun.setMailLanguage("赠送",this.mailLanguage.single_return.return_name);
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
			let json = { queue_id: this.$route.params.id };
			$http.get("plugin.single-return.api.single-return.get-single-return-queue-detail", json, "加载中").then(function (response) {
				if (response.result == 1) {
					that.order_amount = response.data.order_amount;
					that.return_amount = response.data.return_amount;
					that.status_name = response.data.status_name;
					that.each_return_rate = response.data.each_return_rate;
					that.return_mode = response.data.return_mode;
					that.not_return = response.data.not_return;

					that.id = response.data.id;
					that.order_sn = response.data.order_sn;
					that.created_at = response.data.created_at;
					that.finish_time = response.data.finish_time;
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