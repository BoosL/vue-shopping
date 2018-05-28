import cTitle from 'components/title';
import { Popup } from 'mint-ui';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
	components: { cTitle },
	data() {
		return {
			language: {},
			trainNumber: [],//车次
			jsonInfo: [],//请求json 数据
			time: "",//月日显示
			allTime: "",//全时间显示
			week: "",







			a: 0,
			Obtain: '',//获得数据
			popupVisible: false,
			times: [],
			airlines: [],
			startAirports: [],
			endAirports: [],
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
			//分解年月日
			var strYear = yesterday.getFullYear();
			var strMonth = yesterday.getMonth() + 1;
			var strDay = yesterday.getDate();

			if (strMonth < 10) {
				strMonth = "0" + strMonth;
			}

			if (strDay < 10) {
				strDay = "0" + strDay
			}

			this.allTime = strYear + "-" + strMonth + "-" + strDay;
			this.time = strMonth + "-" + strDay;
			let num = yesterday.getDay();
			this.week = this.getWeek(num);

		},

		//前一天
		getYestoday() {
			//获取当时选择的时间戳
			let today = this.jsonInfo.date;
			let t = new Date(Date.parse(today.replace(/-/g, "/")));
			//获取昨天的时间戳
			let yesterday_milliseconds = t.getTime() - (1000 * 60 * 60 * 24);
			let yesterday = new Date();
			yesterday.setTime(yesterday_milliseconds);
			//分解年月日
			var strYear = yesterday.getFullYear();
			var strMonth = yesterday.getMonth() + 1;
			var strDay = yesterday.getDate();

			if (strMonth < 10) {
				strMonth = "0" + strMonth;
			}

			if (strDay < 10) {
				strDay = "0" + strDay
			}

			this.allTime = strYear + "-" + strMonth + "-" + strDay;
			this.time = strMonth + "-" + strDay;
			let num = yesterday.getDay();
			this.week = this.getWeek(num);

			this.jsonInfo.date = this.allTime;//重新赋值

			this.getData(this.allTime);//重新获取数据
		},

		//后一天
		getNextday() {

			//获取当时选择的时间戳
			let today = this.jsonInfo.date;
			let t = new Date(Date.parse(today.replace(/-/g, "/")));
			//获取昨天的时间戳
			let yesterday_milliseconds = t.getTime() + (1000 * 60 * 60 * 24);
			let yesterday = new Date();
			yesterday.setTime(yesterday_milliseconds);
			//分解年月日
			var strYear = yesterday.getFullYear();
			var strMonth = yesterday.getMonth() + 1;
			var strDay = yesterday.getDate();

			if (strMonth < 10) {
				strMonth = "0" + strMonth;
			}

			if (strDay < 10) {
				strDay = "0" + strDay
			}

			this.allTime = strYear + "-" + strMonth + "-" + strDay;
			this.time = strMonth + "-" + strDay;
			let num = yesterday.getDay();
			this.week = this.getWeek(num);

			this.jsonInfo.date = this.allTime;//重新赋值

			this.getData(this.allTime);//重新获取数据

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

	
		//初始化语言
		initLang() {
			if (sessionStorage.languageService) {
				this.language = JSON.parse(sessionStorage.languageService).trainSearchResults;
			} else {
				this.language = this.$store.state.service.languageService.trainSearchResults;
			}
		},

		//重新获取数据
		getData(time)
		{
			let that = this;
			let json = { date: time, fromStation: this.jsonInfo.fromStation, toStation: this.jsonInfo.toStation };
			$http.get('plugin.train.api.goods.trainLinesForASC', json, '查询中').then((response) => {
				if (response.result == 1) {
					let dataInfo = {};
					dataInfo.data = response.data;
					dataInfo.json = json;
					localStorage.setItem('trainTicket', JSON.stringify(dataInfo));

					this.trainNumber = response.data.trainline;//重新刷新数据

				} else {
					MessageBox.alert(response.msg);
				}
			}, function (response) {
				MessageBox.alert(response);
			});
		},

		
		//跳转 <router-link :to="fun.getUrl('trainFlightPrice')">
		toOrder(index)
		{
			this.$router.push(this.fun.getUrl('trainFlightPrice',{id: index}));
		},








		
		//底部样式
		chooseColor(e) {
			var lis = document.getElementById("trainSearchResults").getElementsByClassName("m-footer")[0].getElementsByTagName("li");
			for (var i = 0; i < lis.length; i++) {
				lis[i].className = "";
			}
			e.currentTarget.className = "active";
			//点击筛选弹出筛选条件
			if (lis[1].className == "active") {
				this.popupVisible = !this.popupVisible;
			}
			if (lis[2].className == "active") {
				this.sorting();
			}
		},
		//筛选
		filterStyle(e) {
			var lis1 = document.getElementById("flyTime").getElementsByTagName("li");
			for (var i = 0; i < lis1.length; i++) {
				lis1[i].className = "";
			}
			e.currentTarget.className = "fliterActive";
		},
		filterStyle2(e) {
			var lis1 = document.getElementById("airline").getElementsByTagName("li");
			for (var i = 0; i < lis1.length; i++) {
				lis1[i].className = "";
			}
			e.currentTarget.className = "fliterActive";
		},
		filterStyle3(e) {
			var lis1 = document.getElementById("startAirport").getElementsByTagName("li");
			for (var i = 0; i < lis1.length; i++) {
				lis1[i].className = "";
			}
			e.currentTarget.className = "fliterActive";
		},
		filterStyle4(e) {
			var lis1 = document.getElementById("endAirport").getElementsByTagName("li");
			for (var i = 0; i < lis1.length; i++) {
				lis1[i].className = "";
			}
			e.currentTarget.className = "fliterActive";
		},

		//取消
		popDisplay() {
			this.popupVisible = !this.popupVisible;
		},
		//重置
		reseted() {
			var lis = document.getElementById("trainSearchResults").getElementsByClassName("content")[0].getElementsByTagName("li");
			for (var i = 0; i < lis.length; i++) {
				lis[i].className = "";
			}
		},
		//确定
		confirm() {

		},






		//价格排序
		sorting() {
			let oUl = document.getElementById('trainSearchResults').getElementsByClassName("flight")[0];
			let oLi = oUl.getElementsByTagName("li");
			//判断排列顺序
			let num = this.a;
			num++;
			this.a = num;

			let arr = []//oLi是元素的集合，不是数组，需要定义一个数组
			for (var i = 0; i < oLi.length; i++) {
				arr[i] = oLi[i]
			}//把oLi的li元素赋到arr数组中
			arr.sort(function (li1, li2) {
				let n1 = parseInt(li1.getElementsByClassName("sortNum")[0].innerHTML);
				let n2 = parseInt(li2.getElementsByClassName("sortNum")[0].innerHTML);

				if (num % 2 != 0) {
					return n1 - n2;
				}
				return n2 - n1;

			})//对arr数值进行比较排序
			for (var i = 0; i < arr.length; i++) {
				oUl.appendChild(arr[i])
			}//对把arr数组里面的排好序的数值放到原来的UL中。	
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
				this.language = JSON.parse(sessionStorage.languageService).trainSearchResults;
			} else {
				this.language = this.$store.state.service.languageService.trainSearchResults;
			}
		}
	},

	mounted() {
		this.initLang();
	},

	activated() {
		this.$store.commit('onload');
		//获取存储的参数
		if (localStorage.getItem("trainTicket")) {
			let trainTicket = JSON.parse(localStorage.getItem("trainTicket"));
			this.trainNumber = trainTicket.data.trainline;
			this.jsonInfo = trainTicket.json;
			this.initTime();//初始化时间
		}else{
			this.$router.go(-1);
		}
	},
}