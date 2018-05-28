import cTitle from 'components/title';
export default {
	components: { cTitle },
	data() {
		return {
			//存放语言
			language: {},

		}
	},


	methods: {
		//中石油 0中石油 1中石化
		goToPetroleum() {
			this.$router.push(this.fun.getUrl('oilRecharge', { tag: "0" }));
		},

		//中石化 0中石油 1中石化
		goToSinopec() {
			this.$router.push(this.fun.getUrl('oilRecharge', { tag: "1" }));
		},
	},

	//实时监测this.$store.state.service.chinese的变化，获取最新的语言包
	computed: {
		getLangState() {
			return this.$store.state.service.languageService;
		},
	},
	watch: {
		getLangState(val) {
			if (val) {
				this.language = JSON.parse(sessionStorage.languageService).cardServer;
			} else {
				this.language = this.$store.state.service.languageService.cardServer;
			}
		}
	},



	mounted() {
		if (sessionStorage.languageService) {
			this.language = JSON.parse(sessionStorage.languageService).cardServer;
		} else {
			this.language = this.$store.state.service.languageService.cardServer;
		}
	},

	activated() {
		this.$store.commit('onload');
	},
}
