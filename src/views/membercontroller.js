import { mapState, mapMutations } from 'vuex';
import cTitle from '../../components/title';
import { Loadmore } from 'mint-ui';
import { Lazyload, Button } from 'mint-ui';
import { MessageBox } from 'mint-ui';

var haveShop = false;

export default {
	data() {
		return {
			toi: this.fun.getKeyByI(),
			myType: window.localStorage.type,

			//是否开启关系链
			relation_switch: 0,

			//当前的会员model
			member_item: '',
			//是否有推广下线资格 0-无资格；1-有资格
			is_agent: 0,
			//我的推荐人
			MyReferrer: '',
			//二维码
			qrcode: '',
			allLoaded: false,
			//刷新组件的运行状态
			topStatus: '',
			//余额
			balance_value: '0.00',
			//积分
			integral: '',
			//优惠券
			coupon: '0.00',
			//会员名字
			username: '',
			//头像
			avatar: '',
			createtime: '',
			//余额
			credit: '',
			//版权
			copyright: '',
			//1男
			gender: 1,
			group_id: '',
			group_name: '',
			has_one_fans: { followed: 1, uid: 9 },
			level_id: 2,
			//会员等级
			level_name: "",
			mobile: "",
			nickname: "",
			realname: "",
			uid: '',
			waitPay: 0,
			waitSend: 0,
			waitReceive: 0,
			waitrRefund: 0,
			//供应商申请
			supplier: '',
			haveShop: '',
			// 插件数组 [{ plugin_id: 0, name: '收藏', router: 'tab', icon: 'collect.png', to: 'collection' }]
			plugins: [],

			poster: {
				name: "",
				logo: "",
				img: "",
				qr: "",
			},
		};
	},

	mounted() {
		//this.$store.commit('cfoots', { a: false });
		//var jpg = document.getElementById('jpg');
		//jpg.innerHTML = `<img src="../../static/app/images/photo-mr.jpg">`;

	},
	methods: {
		outInfo() {
			$http.get('member.logout.index').then((response) => {
				if (response.result == 1) {
					window.localStorage.myuserinfo = {};
					this.$store.commit('savemodel', {});
					this.$store.commit('alerts', response.msg);
					MessageBox.alert('退出' + response.msg).then(action => {

						this.$router.push(this.fun.getUrl('login'));
					});
				}
			}, (response) => {
				console.log(response.msg)
			});

		},
		goback() {
			this.$router.go(-1);
		},
		openQrCode(e) {

			this.$refs.hook.style.display = e;
		},
		toOrderList(index) {
			//index: 0-全部订单 1-待付款 2-待发货 3- 待收货 
			//window.localStorage.member = this;

			this.$router.push(this.fun.getUrl('orderlist', { status: index, member: this }));
			//this.$router.push({ name: "orderlist", params: { status: index, member: this },query:{i:this.toi} });
			this.$emit('selectedstatus', { status: index });
		},
		getMemberInfo() {

			var that = this;
			$http.get('member.member.getUserInfo', { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }).then(function (response) {

				if (response.result == 1) {
					that.haveShop = response.data.micro.status;
					that.relation_switch = response.data.relation_switch;
					that.supplier = response.data.supplier;//供应商申请
					that.member_item = response.data;
					that.coupon = response.data.income;
					that.$store.commit('savemodel', response.data);
					window.localStorage.uid = response.data.uid;
					var myData = response.data;
					that.is_agent = myData.is_agent.is_agent;
					//that.qrcode = myData.qr;//我的推广二维
					that.poster = myData.poster;//我的推广二维

					that.MyReferrer = myData.referral;
					that.avatar = myData.avatar;
					that.nickname = myData.nickname;
					that.integral = myData.integral;
					that.copyright = myData.copyright;
					that.$store.commit('updateBanlace', { balance: myData.credit2 });
					that.uid = myData.uid;
					that.level_name = myData.level_name;
					that.credit = myData.credit;
					for (let i = 0; i < myData.order.length; i++) {
						//let i=0;i<myData.order.length;i++
						//0 待付款 1待发货 2待收货 3完成
						var item = myData.order[i];
						if (item.status == 0) {
							that.waitPay = item.total;

						} else if (item.status == 1) {
							that.waitSend = item.total;

						} else if (item.status == 2) {
							that.waitReceive = item.total;

						} else if (item.status == 11) {
							that.waitrRefund = item.total;
						}

						// that.waitPay = myData.order[0].total;
						// that.waitSend = myData.order[1].total;
						// that.waitReceive = myData.order[2].total;
						// that.waitrRefund = myData.order[3].total;
					}


				} else {
					MessageBox.alert(response.msg);
				}

			}, function (response) {
				// error callback
			});

		},


		handleTopChange(status) {
			this.topStatus = status;

		},
		loadTop() {
			// load more data
			console.log('刷新');
			//this.topStatus = '';
			this.getMemberInfo();
			this.$refs.loadmore.onTopLoaded();

		},
		loadBottom() {
			// load more data
			this.allLoaded = true;// if all data are loaded
			this.$refs.loadmore.onBottomLoaded();
		},
		recieveMessage(text) {

			console.log('监听到子组件变化' + text);
		}
	},
	activated() {
		//console.log('本地model');
		var province = localStorage.getItem("province");
		if (province == null) {
			this.fun.getAddressInfo();//获取地址json数据
		}
		this.toi = this.fun.getKeyByI();
		this.getMemberInfo();
		//console.log(this.$store.state.memberstate.member_model);

	},
	created() {

		this.toi = this.fun.getKeyByI();

	},
	components: { cTitle, Loadmore }

}