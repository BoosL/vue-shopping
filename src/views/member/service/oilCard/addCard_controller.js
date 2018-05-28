import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';
export default {
	components: { cTitle },

	data() {
		return {
			//存放语言
			language: {},
			tag: "",//0中石油 1中石化
			//存放油卡
			cardNum: "",
			hide: false
		}
	},
	methods: {
		hidePop() {
			this.hide = true;
		},

		//提交数据
		submit() {
			if (this.fun.isTextEmpty(this.userName)) {
				MessageBox.alert('请输入您的姓名');
				return;
			}

			if (this.fun.isTextEmpty(this.phone)) {
				MessageBox.alert('请输入电话号');
				return;
			}

			if (this.fun.isMoblie(this.phone)) {
				MessageBox.alert('请输入正确的电话号');
				return;
			}

			if (this.fun.isTextEmpty(this.cardNum)) {
				MessageBox.alert('请输入卡号');
				return;
			}

			//组装json
			let json = {
				name: this.userName,//姓名
				mobile: this.phone,//手机号 
				operator: this.tag == 0 ? "cnpc" : "sinopec",//供应商 中石化sinopec,中石油cnpc //0中石油 1中石化
				province: "全国",//加油卡省份
				account: this.cardNum,//加油卡账号
			
			};

			let that = this;

			$http.get('plugin.gasoline.api.goods.addGasolineCard', json, "提交中...").then(function (response) {
				if (response.result == 1) {
					Toast("添加成功");
					that.goBack();
				} else {
					MessageBox.alert(response.msg);
				}
			}, function (response) {
				console.log(response);
			});
		},

		goBack(){
			this.$router.go(-1);
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
				this.language = JSON.parse(sessionStorage.languageService).addCard;
			} else {
				this.language = this.$store.state.service.languageService.addCard;
			}
		}
	},

	mounted() {
		if (sessionStorage.languageService) {
			this.language = JSON.parse(sessionStorage.languageService).addCard;
		} else {
			this.language = this.$store.state.service.languageService.addCard;
		}
	},

	activated() {
		this.$store.commit('onload');
		this.titleLanguage = this.$store.state.service.languageService.cardServer;
		this.tag = this.$route.params.tag;
		//0中石油 1中石化
		this.title = this.tag == 0 ? this.titleLanguage.petroleum : this.titleLanguage.sinopec;
		//动态更新油卡
		this.cardNum = ""
	},

}

