import cTitle from 'components/title';

export default {
	components: { cTitle },
	data() {
		return {
			language: {},
			jsonInfo: {},//json数据
			week: "",//周几
			trainTicketInfo: "",//列车信息
			trainSeats: "",//列车表

	
		}
	},
	methods: {
		//初始化时间显示
		initTime() {
			//获取当时选择的时间戳
			let today = this.jsonInfo.date;
			let t = new Date(Date.parse(today.replace(/-/g, "/")));
			let yesterday_milliseconds = t.getTime();
			let yesterday = new Date();

			yesterday.setTime(yesterday_milliseconds);
			let num = yesterday.getDay();
			this.week = this.getWeek(num);
		},

		//获得周
		getWeek(num) {
			if (num == 0) this.week = "周日";
			if (num == 1) this.week = "周一";
			if (num == 2) this.week = "周二";
			if (num == 3) this.week = "周三";
			if (num == 4) this.week = "周四";
			if (num == 5) this.week = "周五";
			if (num == 6) this.week = "周六";
			return this.week;
		},

		//<router-link :to="fun.getUrl('trainAddOrder',{ParentId:$route.params.id,id:index})">
		//到订单页面
		toOrder(index) {
			this.$router.push(this.fun.getUrl('trainAddOrder', { id: index, parentId: this.$route.params.id }));
		},


		initLang() {
			if (sessionStorage.languageService) {
				this.language = JSON.parse(sessionStorage.languageService).flightPrice;
			} else {
				this.language = this.$store.state.service.languageService.flightPrice;
			}
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
				this.language = JSON.parse(sessionStorage.languageService).flightPrice;
			} else {
				this.language = this.$store.state.service.languageService.flightPrice;
			}
		}
	},

	mounted() {
		this.initLang();
	},

	activated() {
		this.$store.commit('onload');
		let id = this.$route.params.id;//数组下标
		console.log(id);
		if (localStorage.getItem("trainTicket")) {
			let trainTicket = JSON.parse(localStorage.getItem("trainTicket"));
			this.trainTicketInfo = trainTicket.data.trainline[id];
			this.trainSeats = this.trainTicketInfo.trainSeats.trainSeat;
			this.jsonInfo = trainTicket.json;
			this.initTime();//初始化时间

		}else{
			this.$router.go(-1);
		}
	},
}
