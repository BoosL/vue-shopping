import { Field } from 'mint-ui';
import { Picker } from 'mint-ui';
import addre from 'assets/address/addressinfo';
import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { Switch } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';

import Vue from 'vue';
import { CitySelect } from 'vue-ydui/dist/lib.px/cityselect';
//import District from 'ydui-district/dist/gov_province_city_area_id';
import District from 'src/gov_province_city_area_id';
import { NavBar, NavBarBackIcon, NavBarNextIcon } from 'vue-ydui/dist/lib.px/navbar';

import { Popup } from 'vue-ydui/dist/lib.px/popup';

Vue.component(Switch.name, Switch);

Vue.component(CitySelect.name, CitySelect);
Vue.component(Popup.name, Popup);
Vue.component(NavBar.name, NavBar);
Vue.component(NavBarBackIcon.name, NavBarBackIcon);
Vue.component(NavBarNextIcon.name, NavBarNextIcon);

const address = addre;
export default {
	data() {
		return {
			form: {
				toi: this.fun.getKeyByI(),
				member_name: '',
				member_card: '',
				member_phone: '',
				member_province: '',
				member_city: '',
				member_district: '',
				member_address: '',
				isDefault: false,
				member_street: ""
			},

			//
			addressShow: false,
			addressName: "",
			district: District,

			//省市区id值
			districtVal: [],
			streetShow: false,
			strShow: false,

			explain_title: '',
			explain_content: '',
		}
	},
	methods: {
		kyebey(e) {
			console.log('::::::::::444444', e);
			e.scrollIntoViewIfNeeded();
		},

		open() {
			this.$alert('这是一段内容', '标题名称', {
				confirmButtonText: '确定',
				message: this.explain_content,
				title: this.explain_title
			})
		},
		addCartReq(_goodsId, _optionsId, _total) {
			let that = this;

			let json = {
				goods_id: _goodsId,
				total: _total,
				option_id: _optionsId,
				"i": this.fun.getKeyByI(),
				"type": this.fun.getTyep()
			};
			$http.get('member.member-cart.store', json, "添加中...").then(function(response) {
				console.log(response.data)
				if(response.result == 1) {
					that.$router.go(-1);
					Toast(response.msg);
				} else {
					Toast(response.msg);
				}

			}, function(response) {
				console.log(response)
			});
		},

		saveInfo() {
			let that = this;
			console.log('route', this.$route.params);
			var _goodsId = this.$route.params.goodsId;
			var _optionsId = this.$route.params.optionsId;
			var _total = this.$route.params.total;
			var submitActionTag = this.$route.params.tag;

			if(this.fun.isTextEmpty(this.form.member_name)) {
				MessageBox.alert("请输入真实姓名");
				return;
			}

			if(this.fun.isTextEmpty(this.form.member_card)) {
				MessageBox.alert("请输入身份证号");
				return;
			}

			/* if (this.fun.isMoblie(this.form.member_phone)) {
			   MessageBox.alert("请输入正确的手机号");
			   return;
			 }*/

			if(this.fun.isTextEmpty(this.form.district)) {
				MessageBox.alert("请输入所在地区");
				return;
			}

			if(this.strShow && this.fun.isTextEmpty(this.form.street)) {
				MessageBox.alert("请输入所在街道");
				return;
			}

			let json = {
				member_name: this.form.member_name,
				member_card: this.form.member_card,
				member_phone: this.form.member_phone,
				member_city: this.form.city,
				member_address: this.form.address,
				member_province: this.form.provice,
				isdefault: this.form.isDefault ? 1 : 0,
				member_district: this.form.district,
				member_street: this.form.street,
				"i": this.fun.getKeyByI(),
				"type": this.fun.getTyep(),
			};
			console.log(JSON.stringify(json))
			console.log(888888)
			$http.get('from.div-from.updateMemberInfo', json, "添加中...").then(function(response) {
				console.log(response.data)
				if(response.result == 1) {
					//Toast(response.msg);
					if(submitActionTag == 'cart') {
						that.addCartReq(_goodsId, _optionsId, _total);
						return;
					}
					that.$router.push(that.fun.getUrl('goodsorder', {
						tag: submitActionTag,
						goodsId: _goodsId,
						optionsId: _optionsId,
						total: _total
					}));
				} else {
					Toast(response.msg);
				}

			}, function(response) {
				console.log(response)
			});
		},

		getStreet(param) {
			$http.get('member.memberAddress.street', {
				district_id: param
			}).then(response => {
				console.log(response);
				if(response.result == 1) {

					if(!this.fun.isTextEmpty(response.data) && response.data.length > 0) {
						this.districtVal = response.data;
						this.strShow = true;
					} else {
						this.strShow = false;
					}
				} else {
					this.strShow = false;
				}

			}).catch(error => {
				console.log(error);
			});
		},

		//地址回调
		addressCallback(obj) {
			this.form.street = "";
			this.districtVal = "";
			this.addressName = obj.itemName1 + ' ' + obj.itemName2 + ' ' + obj.itemName3;
			this.form.provice = obj.itemName1;
			this.form.city = obj.itemName2;
			this.form.district = obj.itemName3;
			this.getStreet(obj.itemValue3);
		},

		streetChoose() {
			console.log(123131321)
			if(this.fun.isTextEmpty(this.addressName)) {
				MessageBox.alert("请先选择所在地区");
			} else {
				this.streetShow = true;
			}
		},

		streetConfirm(name) {
			this.form.street = name;
			this.streetShow = false;
		},

	},
	mounted() {

		var provinces = [];
		var province = localStorage.getItem("province");
		provinces = JSON.parse(province);
		this.provinceoptions = provinces;

	},
	activated() {

		this.member_name = '';
		this.member_card = '';
		this.member_phone = '';
		this.province = '';
		this.city = '';
		this.district = '';
		this.street = '';

		this.toi = this.fun.getKeyByI();
		let that = this;
		$http.get('from.div-from.explain', {}, "添加中...").then(function(response) {
			console.log(response.data)
			if(response.result == 1) {
				that.explain_title = response.data.explain_title;
				that.explain_content = response.data.explain_content;
			} else {
				Toast(response.msg);
			}

		}, function(response) {
			console.log(response)
		});

		this.district = [];
		this.strShow = false;

	},
	components: {
		cTitle
	}
};