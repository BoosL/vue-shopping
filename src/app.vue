<template >
	<div id="app">

		<keep-alive>
			<router-view v-if="!$route.meta.notKeepAlive"></router-view>
		</keep-alive>
		<router-view v-if="$route.meta.notKeepAlive"></router-view>
		<c-foot v-if='!foot'></c-foot>
	</div>
</template>

<script>
import cFoot from 'components/foot';
import { mapState, mapMutations } from 'vuex';
import { Indicator, Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {

	data() {
		return {
			//记录form请求微信form请求只发送一次
			selected: false,
			foot: false,
		}
	},
	watch: {
		//监测路由变化
		$route(to, from) {
			if (this.$yzt('route.' + to.name)) {
				//语言包
				this.fun.setWXTitle(this.$yzt('route.' + to.name));
			} else if (to.meta.title) {
				this.fun.setWXTitle(to.meta.title);
			}
			this.foot = to.meta.foot;
			return;
		}
	},

	beforeCreate22222() {
		let json = { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
		$http.get('plugins.get-plugin-data', json).then((response) => {
			if (response.result == 1) {
				this.$store.commit('setPlugins', response.data);
			} else {
				console.log(response.msg);
			}
		}, (response) => {
			// error callback
			console.log(response);
		});
		console.log("jfc", "beforeCreate");
	},

	mounted() {
		this.fun.setWXTitle('');
		let wx = window.localStorage.isWeiXin;
		let llq = window.localStorage.myuserinfo;
		if (wx == false && llq) {
			console.log('浏览器打开，并已登录！');
		}
		this.tempInfo();
		this.$store.commit('onload');
	},
	created() {
		//获取地址列表
		//console.log(locale);
	},
	activated() {
		var province = localStorage.getItem("province");

		if (province == null) {
			this.fun.getAddressInfo();//获取地址json数据
		}
	},
	beforeUpdate() {
		this.initShare();
		this.initLanguage();
		this.getIsBingMobile();
	},

	methods: {

		//初始化语言设置
		initLanguage() {
			let that = this;
			let json = { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
			$http.get('setting.get-lang-setting', json).then((response) => {
				if (response.result == 1) {
					console.log("lang-setting",response.data);
					localStorage.setItem("mailLanguage", JSON.stringify(response.data));
					var mailLanguage = localStorage.getItem("mailLanguage");
					
				}
			});
		},

		tempInfo() {
			$http.get('home-page.index').then((response) => {
				if (!response) return;
				if (response.result == 1) {
					//this.bindMobile(response.data.mailInfo.is_bind_mobile);
					if (!response.data.default) {

						for (let j of response.data.item.data) {
							j.temp = 'show' + j.temp
						};
						response.data.item.janst = response.data.item.pageinfo.params.title;
					} else {
						response.data.item.janst = response.data.mailInfo.name;
					}
					this.$store.commit('tempIndex', response.data);
					this.$store.commit('setPlugins', response.data);
					window.localStorage.setItem("tempIndex", JSON.stringify(response.data));
					window.localStorage.setItem("setPlugins", JSON.stringify(response.data));
					console.log('member:', response.data.memberinfo);
				} else {
					console.log(response.msg);
					//MessageBox.alert(response.msg)
				}
			}), (response) => {
				MessageBox.alert(response)
			}
		},

		//查看用户是否需要绑定手机号
		getIsBingMobile(){
			var that = this;
			let json = { };
			$http.get('home-page.bindMobile', json).then(function(response) {

				if (response.result == 1) {
					that.bindMobile(response.data.is_bind_mobile);
				}

			}, function(response) {
				// error callback
			});
		},

		//查看用户是否需要绑定手机号
		bindMobile(e) {
			if (e == 1) {
				//跳转绑定手机页面
				//this.$router.push({ name: "editmobile", params: { num:'', myparent: this }, query: { i: this.toi } });
				this.$router.push(this.fun.getUrl('editmobile', { num: '', myparent: this }));
			}

		},

		//获取商城信息
		getMailInfo() {
			let that = this;
			let json = { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
			$http.get('setting.get', json).then((response) => {
				if (response.result == 1) {
					console.log('统计代码：', response.diycode);
					this.$store.commit('setMailInfo', response.data);
				}
			});
		},

		//获取用户信息
		getMemberInfo() {
			var that = this;
			let json = { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
			$http.get('member.member.getUserInfo', json, '').then(function(response) {

				if (response.result == 1) {
					that.$store.commit('savemodel', response.data);
				}

			}, function(response) {
				// error callback
			});

		},


		//初始化分享设置
		initShare() {
			//不是微信端 不访问
			if (window.localStorage.type == 5) {
				return;
			}
			let that = this;
			//console.log(document.location.href);
			let _url = document.location.href;
			let json = { url: _url, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
			//console.log("json", json);
			$http.post('member.member.wxJsSdkConfig', json).then(function(response) {

				if (response.result == 1) {
					that.share(response.data);
				} else {

				}
			}, function(response) {
				console.log(response);
			});
		},

		//组装分享设置
		share(data) {
			let that = this;
			wx.config(data.config);
			wx.ready(function() {

				let _title = "";
				//let _link = location.protocol + '//' + location.host + location.pathname + '?i=' + that.fun.getKeyByI() + "&type=" + that.fun.getTyep() + "&mid=" + data.info.uid;
				//let _link = document.location.href + "&mid=" + data.info.uid;

				let _link = document.location.href;
				_link = that.fun.isMid(_link, data.info.uid);
				let _imgUrl = "";
				let _desc = "";


				_title = that.fun.isTextEmpty(data.share.title) ? data.shop.name : data.share.title;
				_imgUrl = that.fun.isTextEmpty(data.share.icon) ? data.shop.icon : data.share.icon;
				_desc = that.fun.isTextEmpty(data.share.desc) ? data.shop.name : data.share.desc;


				wx.showOptionMenu();
				wx.onMenuShareTimeline({
					title: _title, // 分享标题
					link: _link, // 分享链接
					imgUrl: _imgUrl, // 分享图标
					success: function() {
						Toast("分享成功");
					},
					cancel: function() {
						Toast("取消分享");
					}
				});

				wx.onMenuShareAppMessage({
					title: _title, // 分享标题
					desc: _desc, // 分享描述
					link: _link, // 分享链接
					imgUrl: _imgUrl, // 分享图标
					type: 'link', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function() {
						Toast("分享成功");
					},
					cancel: function() {
						Toast("取消分享");
					}
				});
			});
		},

	},
	components: { cFoot },
}
</script>
<style lang="scss" rel="stylesheet/scss">
/*@import 'assets/css/font-awesome.min.css';*/

@import "assets/iconfont/iconfont.css";
@import 'assets/css/app.scss';
@import "layout";
</style>
