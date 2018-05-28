import cTitle from 'components/title';
import { Popup } from 'mint-ui';
import { Picker } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
	components: { cTitle },
	data() {
		return {
			language: {},//语言包

			userCode: "",//用户号
			popupVisible: false,//pop显示
			provicevalue: '',//省份信息
			cityvalue: '',//城市信息
			company: '',//缴费单位
			contract: '',//合同号
			sourceMoney: '',//充值金额
			goods_id: '',//商品id
			provinceoptions: [],//省份
			cityoptions: [],//城市
			keyIds: '',//缴费单位key
			slots: [//缴费单位数组处理
				{
					flex: 1,
					values: ["请先选择省市"],
					keyId: [0],
					className: 'slot1',
					textAlign: 'right'
				}
			],
			checkDeductionList: [],//优惠信息验证数组


			form: { provicevalue: '', cityvalue: '', keyId: '' },

			MobilePhone: '',//手机号
			preOrder: '',// 预下单id
			disableds: true,//禁止提交
			score: 600,//积分
			scoreMoney: 6.00,//积分抵扣价格
			computedMoney: 0.00,
			useScore: false,
			regionoptions: [],
			poundage: 0,//手续费

		}
	},
	methods: {
		// 获取位置
		/*	getCity() {
				let that = this;
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r) {
					if(this.getStatus() == BMAP_STATUS_SUCCESS) {
						var geoc = new BMap.Geocoder(); 
						var pt = new BMap.Point(r.point.lng,r.point.lat);
						geoc.getLocation(pt, function(rs){
							var addComp = rs.addressComponents;
							that.getPaymentCompanyList(2,addComp.province , addComp.city);
					}); 
						
					} else {
						alert('failed' + this.getStatus());
					}
				}, {
					enableHighAccuracy: true
				})
			},
	*/


		//初始化参数
		initData() {
			this.userCode = "";//用户号
			this.popupVisible = false;//pop显示
			this.provicevalue = '';//省份信息
			this.cityvalue = '';//城市信息
			this.company = '';//缴费单位
			this.contract = '';//合同号
			this.sourceMoney = '';//充值金额
			this.goods_id = '';//商品id

			//处理万一没有地址数据
			var province = localStorage.getItem("province");
            if (this.fun.isTextEmpty(province)) {
                this.getAddressDataInfo();//获取地址json数据
            }
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
			this.company = '';
			this.slots[0].values = '';
			this.getPaymentCompanyList(1, this.form.provicevalue, value.areaname);
		},

		// 获取缴费单位清单
		// 1-水费；2-电费；3-燃气费
		getPaymentCompanyList(val, province, city) {
			if (!city) return;
			$http.get('plugin.live.api.goods.PaymentCompanyList', { category: val, province, city }, "加载中...").then((response) => {

				if (response.result == 1) {
					//this.items = response.data;
					if (!response.data) {
						this.company = ''; this.slots[0].values = '';
						MessageBox.alert(response.msg);
						return;
					}
					this.slots[0].values = response.data.values;
					this.slots[0].keyId = response.data.keyId;
					this.company = response.data.values[0];
					this.goods_id = response.data.goods_id;

				} else {
					this.company = '';
					this.slots[0].values = '';
					MessageBox.alert(response.msg);
				}
			}, function (response) {
				MessageBox.alert(response);
			});

		},

		//关闭缴费公司pop
		chooseCompony() {
			this.popupVisible = !this.popupVisible;
		},
		//选择缴费公司响应方法
		onValuesChange(picker, values) {
			let i = this.slots[0].values.indexOf(values[0]);
			this.form.keyId = this.slots[0].keyId[i];
			this.keyIds = this.slots[0].keyId[i];
			picker.setSlotValue(1, values[0]);
			this.company = values[0];
		},


		//提交
		confirm() {
			if (this.fun.isTextEmpty(this.userCode)) {
				MessageBox.alert('请输入户号！');
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

			if (this.fun.isTextEmpty(this.company)) {
				MessageBox.alert('请选择缴费单位');
				return;
			}

			if (this.fun.isTextEmpty(this.contract)) {
				MessageBox.alert('请输入合同号');
				return;
			}

			if (this.fun.isTextEmpty(this.sourceMoney)) {
				MessageBox.alert('请输入充值金额');
				return;
			}

			if (this.sourceMoney <= 0) {
				MessageBox.alert('充值金额必需大于0');
				return;
			}




			//组装json
			let json = {
				goods_id: this.goods_id,//商品id
				account: this.userCode,//户号
				api_goods_id: this.keyIds,//缴费单位
				contract: this.contract,//合同号
				price: this.sourceMoney,//充值金额
				total: 1,
				option_id: "",
				orders: JSON.stringify(this.assembleDeduction())
			};


			let that = this;

			$http.get('plugin.live.Frontend.Modules.Order.Controllers.goods-buy', json, "提交中...").then(function (response) {
				if (response.result == 1) {
					//跳转确定优惠组合
					that.$router.push(that.fun.getUrl('waterFeePay', { para: JSON.stringify(json) }));
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
				this.language = JSON.parse(sessionStorage.languageService).waterFee;
			} else {
				this.language = this.$store.state.service.languageService.waterFee;
			}
		},
	},

	mounted() {
		this.userCode = localStorage.getItem("tempElectri");
		// 获得省份
		this.initProvice();

		if (sessionStorage.languageService) {
			this.language = JSON.parse(sessionStorage.languageService).waterFee;
		} else {
			this.language = this.$store.state.service.languageService.waterFee;
		}
	},

	activated() {
		this.$store.commit('onload');
		this.userCode = localStorage.getItem("tempWater");
		this.initData();
	},

}
