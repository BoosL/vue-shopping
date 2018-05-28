//import { Switch } from 'mint-ui';
import cTitle from 'components/title';
import { Popup } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
	components: { cTitle, Popup },
	data() {
		return {
			language: {},
			jsonInfo: "",//json
			flyList: [],
			flightInfo: "",//航班信息
			week: "",//周几
			flyListItem: "",//选择的航班的票务信息
			newAddPassengerPop: false,//新增乘机人
			//pop新增乘机人
			name: "",
			cardId: "",
			phoneNumber: "",
			//pop新增乘机人
			airMans: [],//乘机人
			//标记选中数量
			count: 0,
			popSelectAirMans: [],//pop已选择的乘机人
			tempSelectAirMans: [],
			computedMoney: "0.00",//预价格
			//增加乘机人
			addPassenger: false,
			isDes: true,
			goods_id: "",//商品id
			itemId: "",//飞机票api id
			checkDeductionList: [],





			toget: {},
			Obtain: '',
			info: '',
			deduction: '',//积分抵扣数据
			card: {},
			linkman: {},
			preOrder: '',
			orders: '',//重新组装优惠信息
			deductionName: '',//积分抵扣名称
			offDeductible: false,//关闭积分显示
			useScore: false,//是否启用积分
			disableds: true,//禁止提交
			order_data: '',
			//延误险
			//			delayRisk:false,
			//意外险
			//			casualty:false,
			//经停城市
			city: false,

			//保险是否选中
			//			chooseed:false,
			//			chooseed2:false,
			//明细
			details: false,


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

		//新加联系人
		newAddPassenger() {
			this.closeAirMans();
			this.openNewAddPassenger();
		},

		//开启pop新增乘机人
		openNewAddPassenger() {
			this.newAddPassengerPop = true;
		},

		//关闭pop新增乘机人
		closeNewAddPassenger() {
			this.newAddPassengerPop = false;
		},

		//添加乘机人
		passenger() {
			this.openAirMans();
		},

		//开启pop添加乘机人
		openAirMans() {
			this.initAirMans();
			this.addPassenger = true;
		},

		//初始化乘坐人数据
		initAirMans() {
			//如果没有获取数据
			if (this.fun.isTextEmpty(this.airMans) && this.airMans.length == 0) {
				let that = this;
				let json = {};
				$http.get('plugin.air.api.goods.getPassagers', json, '获取中...').then((response) => {
					if (response.result == 1) {
						that.airMans = response.data;
					} else {
						MessageBox.alert(response.msg);
					}
				}, function (response) {
					MessageBox.alert(response);
				});
			}
		},

		//关闭pop添加乘机人
		closeAirMans() {
			this.addPassenger = false;
			this.refreshAirMans();//关闭重新恢复数据
		},

		//关闭重新恢复数据
		refreshAirMans() {
			//关闭重新恢复数据
			//this.airMans[index].choose = !this.airMans[index].choose;
			if (this.airMans.length > 0) {
				//初始化airMans 数据
				for (let i = 0; i < this.airMans.length; i++) {
					this.airMans[i].choose = false;
				}
				for (let i = 0; i < this.tempSelectAirMans.length; i++) {
					for (let j = 0; j < this.airMans.length; j++) {
						if (this.airMans[j].id == this.tempSelectAirMans[i].id) {
							this.airMans[j].choose = true;
							break;
						}
					}
				}

				//同步数据
				this.popSelectAirMans = this.airMans.filter((element, index, array) => { return element.choose == true });
				//重新计算count
				this.count = this.tempSelectAirMans.length;
			}
		},


		//关闭重新恢复数据
		refreshAirMansByNewAdd(data) {
			if (data.length > 0) {
				this.airMans = data;
				for (let i = 0; i < this.tempSelectAirMans.length; i++) {
					for (let j = 0; j < this.airMans.length; j++) {
						if (this.airMans[j].id == this.tempSelectAirMans[i].id) {
							this.airMans[j].choose = true;
							break;
						}
					}
				}
				//重新计算count
				this.count = this.tempSelectAirMans.length;
			}
		},

		//确认添加乘机人
		addAirMans() {
			if (this.popSelectAirMans.length > 5) {
				MessageBox.alert("最多不能超过5位乘机人");
				return;
			}
			this.tempSelectAirMans = this.popSelectAirMans;
			this.addPassenger = false;

		},

		//新增乘机人 提交
		confirmAddPassenger() {
			if (this.fun.isTextEmpty(this.name)) {
				MessageBox.alert("请填写姓名");
				return;
			}

			if (this.fun.isTextEmpty(this.cardId)) {
				MessageBox.alert("请填写证件号");
				return;
			}

			if (this.fun.isTextEmpty(this.phoneNumber)) {
				MessageBox.alert("请填写手机号");
				return;
			}


			if (this.fun.isMoblie(this.phoneNumber)) {
				MessageBox.alert("请填写正确的手机号");
				return;
			}

			let that = this;
			let json = { username: this.name, ids: this.cardId, mobile: this.phoneNumber };
			$http.get('plugin.air.api.goods.AddPassagers', json, '提交中').then((response) => {
				if (response.result == 1) {
					that.closeNewAddPassenger();
					//处理新增后数据处理
					that.refreshAirMansByNewAdd(response.data);
				} else {
					MessageBox.alert(response.msg);
				}
			}, function (response) {
				MessageBox.alert(response);
			});
		},

		//选择乘机人操作
		chooseCircle(index) {
			this.airMans[index].choose = !this.airMans[index].choose;
			this.count = 0;

			this.popSelectAirMans = this.airMans.filter((element, index, array) => { return element.choose == true });
			this.count = this.popSelectAirMans.length;
		},

		//删除联系人
		removePeople(item) {

			//选去掉界面已选择的
			for (let i = 0; i < this.tempSelectAirMans.length; i++) {
				if (this.tempSelectAirMans[i].id == item.id) {
					this.tempSelectAirMans.splice(i, 1);
					break;
				}
			}

			//再去掉乘机人数据池
			for (let i = 0; i < this.airMans.length; i++) {
				if (this.airMans[i].id == item.id) {
					this.airMans[i].choose = false;
					break;
				}
			}
			//更新选择数量
			this.count = (this.airMans.filter((element, index, array) => { return element.choose == true })).length;

		},

		//提交
		submit() {
			if (this.tempSelectAirMans.length == 0) {
				MessageBox.alert("请选择乘机人");
				return;
			}

			if (this.fun.isTextEmpty(this.linkmanName)) {
				MessageBox.alert("请填写联系人姓名");
				return;
			}

			if (this.fun.isTextEmpty(this.linkmanPhone)) {
				MessageBox.alert("请填写联系人手机号");
				return;
			}

			if (this.fun.isMoblie(this.linkmanPhone)) {
				MessageBox.alert("请填写正确的手机号");
				return;
			}

			//组装json
			let json = {
				goods: JSON.stringify(this.assembleGoods()),
				goods_id: this.goods_id,
				api_goods_id: this.itemId,
				contacts: this.linkmanName,
				mobile: this.linkmanPhone,
				from_date: this.jsonInfo.airDate,
				from_station: this.jsonInfo.fromStation,
				to_station: this.jsonInfo.toStation,


				from_station_code: this.flightInfo.orgCity,
				to_station_code: this.flightInfo.dstCity,

				 

				company_code: this.flyListItem.airlineCode,
				seat_no: this.flyListItem.seatCode,
				flight_no: this.flightInfo.flightNo,
				passagers: JSON.stringify(this.tempSelectAirMans),
				orders: JSON.stringify(this.assembleDeduction()),
			};

			let that=this;
			$http.get('plugin.air.Frontend.Modules.Order.Controllers.goods-buy', json, "提交中...").then((response) => {
				if (response.result == 1) {
					//跳转确定优惠组合
					that.$router.push(that.fun.getUrl('ticket_pay', { para: JSON.stringify(json) }));
				} else {
					MessageBox.alert(response.msg);
				}

			}, function (response) {
				MessageBox.alert(response);
			});

		},

		//组装商品信息
		assembleGoods() {
			let newGoods = [];
			let model = new Object();
			model.goods_id = this.goods_id;
			model.total = 1;
			model.option_id = '';
			newGoods.push(model);
			return newGoods;
		},

		//组装优惠抵扣信息
		assembleDeduction() {
			let deductions = [];

			for (let i = 0; i < this.checkDeductionList.length; i++) {
				deductions.push(this.checkDeductionList[i]);
			}

			return deductions;
		},

		// 初始化语言
		initLang() {
			if (sessionStorage.languageService) {
				this.language = JSON.parse(sessionStorage.languageService).addOrder;
			} else {
				this.language = this.$store.state.service.languageService.addOrder;
			}
		},







		//关闭弹出框
		closedelayRisk() {
			this.delayRisk = !this.delayRisk;
		},
		closeCasualty() {
			this.casualty = !this.casualty;
		},
		closeCity() {
			this.city = !this.city;
		},
		//是否选中保险
		//		chooseCircle1(){
		//			this.chooseed=!this.chooseed;
		//		},
		//		chooseCircle2(){
		//			this.chooseed2=!this.chooseed2;
		//		},

		//增加乘机人

		//查看明细
		closeDetails() {
			this.details = !this.details;
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
				this.language = JSON.parse(sessionStorage.languageService).addOrder;
			} else {
				this.language = this.$store.state.service.languageService.addOrder;
			}
		},

		addPassenger() {
			if (!this.addPassenger) {
				this.refreshAirMans();//关闭重新恢复数据
			}
		},
	},

	mounted() {
		this.initLang();
	},

	activated() {

		this.$store.commit('onload');
		let parentId = this.$route.params.parentId;
		let id = this.$route.params.id;//数组下标

		if (localStorage.getItem("fly")) {
			let fly = JSON.parse(localStorage.getItem("fly"));

			this.flightInfo = fly.data.data[parentId];
			this.jsonInfo = fly.json;
			this.flyList = fly.data.data[parentId].airSeats.airSeat;
			this.flyListItem = this.flyList[id];

			console.log(this.flightInfo);

			this.goods_id = fly.data.goods_id;
			this.itemId = fly.data.itemId;

			this.initTime();//初始化时间
		}else{
			this.$router.go(-1);
		}

	},
}