<template>
	<div id="register">
		<c-title :hide="false" text='用户登录'></c-title>
		<div class="page">
			<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model.trim="form.mobile" :attr="{ maxlength: 11 }" :state='form.mobileErr'></mt-field>
			<mt-field label="验证码" placeholder="请输入验证码" v-model.trim="form.code">
				<button @click="VerificationCode" id="code">{{CodeStr}}</button>
			</mt-field>
			<mt-field label="设置密码" placeholder="请输入密码" type="password" v-model.trim="form.password" :state='form.passwordErr'></mt-field>
			<mt-field label="确认密码" placeholder="请输入密码" type="password" v-model.trim="form.confirm_password" :state='form.confirm_passwordErr'></mt-field>
		</div>
		<div id="bts">
			<mt-button type="default" @click="register" size="large">注册</mt-button>
			<mt-button type="danger" @click="login" size="large">登录</mt-button>
		</div>
	</div>
</template>

<script>
	import { Field, Button } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	import cTitle from 'components/title';
	export default {

		//name: 'login',
		data() {
			return {
				CodeStr: '发送验证码',
				lock: false, //数秒期间不能点击按钮
				timer: 30,
				Interval: null,  //setInterval的对象
				form: {
					mobile: '',
					mobileErr: '',
					password: '',
					passwordErr: '',
					confirm_password: '',
					confirm_passwordErr: '',
					uuid: ''
				},
				mydata: ''
			}
		},

		components: {
			cTitle
		},
		mounted() {

		},

		methods: {
			register() {
				if(!this.form.mobile || !this.form.password || !this.form.confirm_password) {
					!this.form.mobile ? (this.form.usernameErr = 'error') : (this.form.usernameErr = '');
					!this.form.password ? (this.form.passwordErr = 'error') : (this.form.passwordErr = '');
					!this.form.confirm_password ? (this.form.confirm_passwordErr = 'error') : (this.form.confirm_passwordErr = '');
					console.log('pppp',this.form.confirm_passwordErr )
					//this.$store.commit('alerts','请输入用户名和密码!');
					return
				} else {
					this.form.usernameErr = '';
					this.form.passwordErr = '';
					this.form.confirm_passwordErr = '';
				};
				//console.log(this.form);

				$http.post('member.register.index', this.form).then((response) => {

					if(response.result == 1) {
						let member_id = response.data.member_id;
						this.$store.commit('savemodel', response.data);
						window.localStorage.myuserinfo = response.data;
						this.$store.commit('savemodel', response.data);
						MessageBox.alert('注册成功').then(action => {
							this.$router.push(this.fun.getUrl('login'));
						});
						
					} else {
						this.$store.commit('alerts', response.msg);
						//this.form = {};

					}
				}, (response) => {
					// error callback
				})
			},
			login() {
				this.$router.push(this.fun.getUrl('login'));
			},//获取验证码
		VerificationCode() {
			if (!this.form.mobile) {
				this.$store.commit('alerts', '手机号必须填写！');
				return;
			}
			//如果是false就开始倒计时，如果是true就停止倒计时
			if(this.lock == false) {

				//发送获取验证码的请求
				$http.get('member.register.sendCode', {	mobile: this.form.mobile}).then((response)=>{
					if(response.result == 1) {
						this.Interval = setInterval(this.update, 1000);
						this.lock = true;					
					}else{
						this.$store.commit('alerts', response.msg);
					}
				}, (response)=>{
					console.log(response.msg)
				});
			} else {
				return;
			}

		},
		update() {

			this.timer--;
			if(this.timer == 0) {
				//停止数秒，重新获取
				clearInterval(this.Interval);
				this.timer = 30;
				this.CodeStr = '获取验证码';
				this.lock = false;

			} else {
				this.CodeStr = String(this.timer)+' 秒';

			}

			}
		},
		activated() {
            this.form.uuid = YDB_UUID;
			console.log(this.$route.params.object_id);

		},


	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	#register {
		margin-top: 50px;
		width: 100%;
		#code{background: #ccc;padding: 3px 5px;border-radius: 3px;}
		h1 {
			color: #42b983;
		}
		.mint-button--large {
			margin-top: 10px;
		}
		#bts {
			margin: auto 5px;
			.mint-button--default {
				background-color: #13ce66;
				color: #FFF;
			}
		}
		.forget {
			color: #999;
			float: right;
		}
	}
</style>