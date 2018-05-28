//window.localStorage.isWeiXin
import { mapState, mapMutations } from 'vuex';
import { Field, Button } from 'mint-ui';
import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default {
	data() {
		return {
			code: "",
			type_name: "",
			price: "",
			isShowType: false,
			isDisabled: false,
		}
	},

	components: {
		cTitle
	},
	mounted() {

	},

	methods: {

		//验证
		verifyCode() {
			if (this.fun.isTextEmpty(this.code)) {
				this.$dialog.toast({
					mes: '请填写充值码',
					timeout: 1500
				});
				return;
			}


			var that = this;
			$http.get('plugin.recharge-code.frontend.code.get-recharge-code', { code_key: this.code }, '验证中...').then(function (response) {

				if (response.result == 1) {
					that.isShowType = true;
					that.type_name = response.data.recharge_code.type_name;
					that.price = response.data.recharge_code.price;
				} else {
					MessageBox.alert(response.msg);
				}
			}, function (response) {
				// error callback
			});
		},

		//提交
		submit() {
			if (this.fun.isTextEmpty(this.code)) {
				this.$dialog.toast({
					mes: '请填写充值码',
					timeout: 1500
				});
				return;
			}

			var that = this;
			$http.get('plugin.recharge-code.frontend.code.recharge', { code_key: this.code }, '充值中...').then(function (response) {
				that.isDisabled = true;
				if (response.result == 1) {
					MessageBox.alert(response.msg);
					if (window.history.length <= 1) {
						that.$router.push(that.fun.getUrl('home', {}));
					} else {
						that.$router.go(-1);
					}
				} else {
					MessageBox.alert(response.msg);
				}
			}, function (response) {
				// error callback
			});
		},
	},
	activated() {
		this.code=this.$route.params.qrCode;
	}
}