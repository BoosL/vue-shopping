import cTitle from 'components/title';
import { Swipe, SwipeItem } from 'c-swipe';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
	data() {
		return {
			language: {},
			selected: "1",
			popupSpecs: false,//城市pop
			pickerOptions0: {
				disabledDate(time) {
					return time.getTime() < Date.now() - 8.64e7;
				}
			},
			allCitys: [],
			sokey: '',//搜索的关键词
			dataModel: '',//选择的时间
			selectData: "",//当前选择的时间
			cityTag: "",//选择城市的 方向 出发 到达
		}
	},

	components: { cTitle, Swipe, SwipeItem },
	methods: {
		//选择城市
		selectCity(tag) {
			this.cityTag = tag;//标记赋值
			this.popCityOpen();
		},
		//关闭城市pop
		popCityClose() {
			this.popupSpecs = false;
		},

		//开启城市pop
		popCityOpen() {
			this.popupSpecs = true;
			var airCity = localStorage.getItem("airCity");
			if (this.fun.isTextEmpty(airCity)) {
				this.getCityInfo();//获取地址json数据
			} else {
				this.initCityInfo();
			}
		},

		//获取飞机票城市
		getCityInfo() {
			let that = this;
			$http.get('plugin.air.api.goods.airStation', {}, '').then(function (response) {
				if (response.result == 1) {
					var airCity = JSON.stringify(response.data);
					localStorage.setItem("airCity", airCity);
					//初始化数据
					that.initCityInfo();
				} else {
					that.popCityClose();
					MessageBox.alert(response.msg);
				}
			}, function (response) {
				that.popCityClose();
				MessageBox.alert(response);
			})
		},

		//初始化城市信息
		initCityInfo() {
			var airCity = localStorage.getItem("airCity");
			var airCitys = [];
			airCitys = JSON.parse(airCity);
			this.allCitys = airCitys;
		},

		//选择城市
		chooseCity(e, city) {
			if (this.cityTag == "from") {
				console.log("from");
				this.language.readonly = city.name;
			} else if (this.cityTag == "to") {
				console.log("to");
				this.language.readonlyto = city.name;
			}
			this.popCityClose();
		},

		//城市对调
		changes() {
			let temp = this.language.readonly;
			this.language.readonly = this.language.readonlyto;
			this.language.readonlyto = temp;
		},

		//右面点机处理
		goSoso(e) {
			console.log(e);
			e = e.toLowerCase();
			this.sokey = e;
		},

		//选择时间
		dataOnChange(val) {
			this.selectData = val;
			console.log(this.selectData);
		},

		//初始化语言
		initLang() {
			if (sessionStorage.languageService) {
				this.language = JSON.parse(sessionStorage.languageService).ticket;
			} else {
				this.language = this.$store.state.service.languageService.ticket;
			}
		},

		//提交
		submit() {
			if (this.fun.isTextEmpty(this.language.readonly) || this.language.readonly == "请选择") {
				MessageBox.alert("请选择出发的城市");
				return;
			}

			if (this.fun.isTextEmpty(this.language.readonlyto) || this.language.readonlyto == "请选择") {
				MessageBox.alert("请选择到达的城市");
				return;
			}

			if (this.fun.isTextEmpty(this.selectData)) {
				MessageBox.alert("请选择出发日期");
				return;
			}

			let that = this;
			let json = { airDate: this.selectData, fromStation: this.language.readonly, toStation: this.language.readonlyto };
			$http.get('plugin.air.api.goods.airLinesForASC', json, '查询中').then((response) => {
				if (response.result == 1) {
					let dataInfo = {};
					dataInfo.data = response.data;
					dataInfo.json = json;
					localStorage.setItem('fly', JSON.stringify(dataInfo));


					//跳转飞机列表
					that.$router.push(that.fun.getUrl('searchResults', {}));


				} else {
					MessageBox.alert(response.msg);
				}
			}, function (response) {
				MessageBox.alert(response);
			});

		},

		getBalance() {
			let jsons = { airDate: this.selectData, fromStation: this.language.readonly, toStation: this.language.readonlyto };
			$http.get('plugin.air.api.goods.airLinesForASC', jsons, 'loding...').then((response) => {
				if (response.result == 1) {
					let dates = {};
					dates.data = response.data;
					dates.jsons = jsons;
					localStorage.setItem('fly', JSON.stringify(dates));
					this.loding = false;
				} else {
					this.onbts = true;
					this.loding = true;
					MessageBox.alert(response.msg);
				}
			}, function (response) {
				this.onbts = true;
				this.loding = true;
				MessageBox.alert(response);
			});

		}
	},

	//实时监测this.$store.state.service.chinese的变化，获取最新的语言包
	computed: {
		getLangState() {
			return this.$store.state.service.language;
		},

		searchData: function () {
			var search = this.sokey;
			let searchs = [];
			if (search) {
				for (let i = 0; i < this.allCitys.length; i++) {
					let a = (String(search)).toUpperCase();
					if (this.allCitys[i].key == a) {
						console.log(searchs.push(this.allCitys[i]));
						return searchs;
					}
				}
			}
			return this.allCitys;
		}
	},
	watch: {
		getLangState(val) {
			if (val) {
				this.language = JSON.parse(sessionStorage.languageService).ticket;
			} else {
				this.language = this.$store.state.service.languageService.ticket;
			}
		}
	},

	mounted() {
		this.initLang();
	},

	activated() {
		this.$store.commit('onload');

	},
	destroyed() {

	}

}
