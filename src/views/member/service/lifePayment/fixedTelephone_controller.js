import cTitle from 'components/title';
import { Popup } from 'mint-ui';
import { Picker } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
	components: { cTitle },
	data() {
		return {
			language: {},
			goods: [],//固话费用集合
			fixedPhone: '',//固话号
			popupVisible: false,//pop显示
			provicevalue: '',//省份信息
			cityvalue: '',//城市信息
			provinceoptions: [],//省份
			cityoptions: [],//城市
			form: { provicevalue: '', cityvalue: '', keyId: '' },
			itemId: "",//被选中的id
			currentItem: "",//当前选择的规格
			checkDeductionList: [],//优惠信息验证数组
			
			
			
			slots: [//缴费单位数组处理
				{
					flex: 1,
					values: ["请先选择省市"],
					keyId: [0],
					className: 'slot1',
					textAlign: 'right'
				}
			],
			company: '',
			disableds: true,//禁止提交
			score: 600,
			scoreMoney: 6.00,
			computedMoney: 0.00,
			sourceMoney: 0.00,
			useScore: false,
		}
	},
	methods: {


		//初始化参数
		initData() {
			this.itemId = "";//选择id
			this.currentItem = "";//当前选择的规格
			this.provicevalue = '';//省份信息
			this.cityvalue = '';//城市信息
			this.goods_id = '';//商品id
			this.fixedPhone = "";//固话号
			this.checkDeductionList=[];//优惠信息验证数组
			this.goods=[];//话费规格集合


			//处理万一没有地址数据
			var province = localStorage.getItem("province");
			if (this.fun.isTextEmpty(province)) {
				this.getAddressDataInfo();//获取地址json数据
			}
		},

		//选择规格处理
		selectStyle(e, item) {
			console.log(item);
			this.itemId = item.itemId;
			this.currentItem = item;
		},

		//选择省份的响应方法
		selectProviceHandle(value) {
			this.form.provicevalue = value.areaname;
			this.cityvalue = '';
			this.cityoptions = [];
			var citys = [];
			var city = localStorage.getItem("city");
			citys = JSON.parse(city);
			for (let i = 0; i < citys.length; i++) {
				let item = citys[i];
				if (item.parentid == value.id) {
					this.cityoptions.push(item);
					// = this.cityoptions[0].areaname;
				}
			}
		},

		//选择市的响应方法
		selectCityHandle(value) {
			this.itemId = "";//清空选择
			this.currentItem = "";//清空选择
			this.getPaymentCompanyList(1, this.form.provicevalue, value.areaname);
		},

		// 获取缴费单位清单
		// 1-固话；2-宽带
		getPaymentCompanyList(val, province, city) {
			let that = this;
			if (!city) return;
			$http.get('plugin.phone.api.goods.directRecharge', { category: val, province, city }, "加载中...").then((response) => {

				if (response.result == 1) {
					that.goods = [];//清空数据

					that.goods = response.data;
					that.goods_id = response.data[0].goods_id;//组建goods_id
				} else {
					MessageBox.alert(response.msg);
				}
			}, function (response) {
				MessageBox.alert(response);
			});

		},



		//获取地址信息
		getAddressDataInfo() {
			let that = this;
			$http.get('member.member-address.address', { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '').then(function (response) {
				if (response.result == 1) {
					var province = JSON.stringify(response.data.province);
					var city = JSON.stringify(response.data.city);
					var district = JSON.stringify(response.data.district);
					localStorage.setItem("province", province);
					localStorage.setItem("city", city);
					localStorage.setItem("district", district);

					//初始化数据
					that.initProvice();

				} else {
					MessageBox.alert(response.msg);

				}
			}, function (response) {
				MessageBox.alert(response);

			})


		},


		//初始化省数据
		initProvice() {
			var province = localStorage.getItem("province");
			var provinces = [];
			provinces = JSON.parse(province);
			this.provinceoptions = provinces;
		},

		chooseCompony() {
			this.popupVisible = !this.popupVisible;
		},
		onValuesChange(picker, values) {
			picker.setSlotValue(1, values[0]);
			this.company = values[0];
		},

		confirm() {
			if (this.fun.isTextEmpty(this.fixedPhone)) {
				MessageBox.alert('请输入固定电话号码！');
				return;
			}

			if (this.fun.isTextEmpty(this.provicevalue)) {
				MessageBox.alert('请选择省份');
				return;
			}

			if (this.fun.isTextEmpty(this.cityvalue)) {
				MessageBox.alert('请选择城市');
				return;
			}


			if (this.fun.isTextEmpty(this.itemId) || this.fun.isTextEmpty(this.currentItem)) {
				MessageBox.alert('请选择充值面额');
				return;
			}


			//组装json
			let json = {
				goods_id: this.goods_id,//商品id
				account: this.fixedPhone,//固话号
				api_goods_id: this.currentItem.itemId,//规格id
				price: this.currentItem.price,//充值金额
				total: 1,
				option_id: "",
				orders: JSON.stringify(this.assembleDeduction())
			};

			let that = this;

			$http.get('plugin.phone.Frontend.Modules.Order.Controllers.goods-buy', json, "提交中...").then(function (response) {
				if (response.result == 1) {
					//跳转确定优惠组合
					that.$router.push(that.fun.getUrl('fixedTelephonePay', { para: JSON.stringify(json) }));
				} else {
					MessageBox.alert(response.msg);
				}
			}, function (response) {
				console.log(response);
			});
		},

		//组装优惠抵扣信息
		assembleDeduction() {
			let deductions = [];

			for (let i = 0; i < this.checkDeductionList.length; i++) {
				deductions.push(this.checkDeductionList[i]);
			}

			return deductions;
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
				this.language = JSON.parse(sessionStorage.languageService).fixedTelephone;
			} else {
				this.language = this.$store.state.service.languageService.fixedTelephone;
			}
		},
	},

	mounted() {
		// 获得省份
		this.initProvice();
		if (sessionStorage.languageService) {
			this.language = JSON.parse(sessionStorage.languageService).fixedTelephone;
		} else {
			this.language = this.$store.state.service.languageService.fixedTelephone;
		}
	},

	activated() {
		this.$store.commit('onload');
		this.initData();
	},

}
