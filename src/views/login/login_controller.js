//window.localStorage.isWeiXin
import { mapState, mapMutations } from 'vuex';
import { Field, Button } from 'mint-ui';
import cTitle from 'components/title';
export default {
	
	//name: 'login',
	data() {
		return {
			form: {
				mobile: '',
				mobileErr: '',
				password: '',
				passwordErr: '',
				uuid: 0
			},
			mydata: '',
			isApp: false,
			apptoken: '',
			wetach_login: false
		}
	},

	components: {
		cTitle
	},
	mounted() {

	},

	methods: {
		login(data) {
			var that = this;
			$http.post('member.login.index', data,"").then((response)=>{
				if(response.result == 1) {
					window.localStorage.myuserinfo = response.data;
                    console.info('--会员信息--');
					console.info(response.msg);
                    that.$store.commit('setLoginStatus', response.data.status);
                    if (that.fun.isApp()) {
                        YDB.SetUserRelationForPush(response.msg.uid);
                    }
					if (response.data.url) {
						window.location.href = response.data.url;
					} else {
                        that.$router.push(this.fun.getUrl('home'));
					}
				}else{
                    that.$store.commit('alerts', response.msg);
				}
			});
			
		},
		mobile_login () {

			if(this.fun.isTextEmpty(this.form.mobile))
			{
				this.$dialog.toast({
                    mes: '请填写手机号',
                    timeout: 1500
                });
				return;
			}

			if(this.fun.isTextEmpty(this.form.password))
			{
				this.$dialog.toast({
                    mes: '请填写密码',
                    timeout: 1500
                });
				return;
			}

            this.form.uuid = YDB_UUID;

			this.login(this.form);
		},
		register(){
			this.$router.push(this.fun.getUrl('register'));
		},
		weixin(){
			var that = this;
			var i = that.fun.getKeyByI();
			var mid = that.fun.getKeyByMid();
			var type = that.fun.getTyep();
			var accessUrl = that.fun.getSiteRoot() + "/addons/yun_shop/api.php?i=" + i + "&mid=" + mid + "&type=" + type + "&route=member.login.index&uuid=" + YDB_UUID;
			YDB.WXLogin(0, accessUrl);
		},
		init_login() {
            var that = this;
            if (!that.fun.isApp()) {
            	return;
			}
			if (!YDB_isWXApp) {
                return;
			}
			if (that.apptoken) {
                that.login({apptoken:this.apptoken});
			} else {
				$http.get('member.login.index', {'show_wechat_login':true}).then((response)=>{
					if(response.result == 1) {
						that.wetach_login = response.data.wetach_login;
					}
				});
			}
		}
	},
	activated(){
		this.apptoken = this.$route.query.apptoken;
		this.init_login();
	}
}