import cTitle from 'components/title';

export default {
	components: { cTitle },
	data() {
		return {
			language: {},
			jsonInfo: "",
			flightInfo: "",//航班信息
			week: "",

			flyList: [],

			city: false,
			retreat: false,
			Obtain: '',
			info: '',

		}
	},
	methods: {

		//初始化时间显示
		initTime() {
			//获取当时选择的时间戳
			let today = this.jsonInfo.airDate;
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



		//初始化语言包
		initLang() {
			if (sessionStorage.languageService) {
				this.language = JSON.parse(sessionStorage.languageService).flightPrice;
			} else {
				this.language = this.$store.state.service.languageService.flightPrice;
			}
		},


		//<router-link :to="fun.getUrl('addOrder',{ParentId:$route.params.id,id:index})">
		//到订单页面
		toOrder(index){
			this.$router.push(this.fun.getUrl('addOrder', {id:index,parentId:this.$route.params.id}));
		},



		closeCity() {
			this.city = !this.city;
		},
		closeRetreat() {
			this.retreat = !this.retreat;
		}
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
		if (localStorage.getItem("fly")) {
			let fly = JSON.parse(localStorage.getItem("fly"));
			this.flightInfo = fly.data.data[id];
			this.jsonInfo = fly.json;
			this.flyList = fly.data.data[id].airSeats.airSeat;
			
			this.initTime();//初始化时间

		}else{
			this.$router.go(-1);
		}
	},
}
