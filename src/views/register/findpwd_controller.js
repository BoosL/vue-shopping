import { Field, Button } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import cTitle from 'components/title';
export default {

    //name: 'login',
    data() {
        return {
            start1: false,

            form: {
                country: '86',
                mobile: '',
                mobileErr: '',
                password: '',
                passwordErr: '',
                confirm_password: '',
                confirm_passwordErr: ''

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
        verificationCode() {
            let that = this;
            if (this.fun.isTextEmpty(this.form.country)) {
                this.$dialog.toast({
                    mes: '请输入国际区号',
                    timeout: 1500
                });
                return;
            }
            if (this.fun.isTextEmpty(this.form.mobile)) {
                this.$dialog.toast({
                    mes: '请填写手机号',
                    timeout: 1500
                });
                return;
            }

            if (this.form.country == "86" && this.fun.isMoblie(this.form.mobile)) {
                this.$dialog.toast({
                    mes: '请填写正确的手机号',
                    timeout: 1500
                });
                return;
            }

            this.$dialog.loading.open('发送中...');
            //发送获取验证码的请求
            $http.get('member.register.sendCodeV2', { mobile: this.form.mobile, state: this.form.country ,reset:"1"}).then((response) => {
                this.$dialog.loading.close();
                if (response.result == 1) {
                    that.sendCodeAnimation();
                } else {
                    this.$dialog.toast({
                        mes: response.msg,
                        timeout: 1500
                    });
                }
            }, (response) => {
                console.log(response.msg)
            });
        },
        //发送验证码 倒计时
        sendCodeAnimation() {

            setTimeout(() => {
                this.start1 = true;
                this.$dialog.loading.close();
                this.$dialog.toast({
                    mes: '已发送',
                    icon: 'success',
                    timeout: 1500
                });
            }, 1000);
        },


        findpwd() {
            if (this.fun.isTextEmpty(this.form.country)) {
                this.$dialog.toast({
                    mes: '请输入国际区号',
                    timeout: 1500
                });
                return;
            }

            if (this.fun.isTextEmpty(this.form.mobile)) {
                this.$dialog.toast({
                    mes: '请填写手机号',
                    timeout: 1500
                });
                return;
            }

            if (this.form.country=="86"&&this.fun.isMoblie(this.form.mobile)) {
                this.$dialog.toast({
                    mes: '请填写正确的手机号',
                    timeout: 1500
                });
                return;
            }

            if (this.fun.isTextEmpty(this.form.code)) {
                this.$dialog.toast({
                    mes: '请填验证码',
                    timeout: 1500
                });
                return;
            }

            if (this.fun.isTextEmpty(this.form.password)) {
                this.$dialog.toast({
                    mes: '请填写密码',
                    timeout: 1500
                });
                return;
            }

            if (this.fun.isTextEmpty(this.form.password)) {
                this.$dialog.toast({
                    mes: '请填写确认密码',
                    timeout: 1500
                });
                return;
            }

            if (this.form.password != this.form.confirm_password) {
                this.$dialog.toast({
                    mes: '两次密码不一致',
                    timeout: 1500
                });
                return;

            }

            $http.post('member.register.changePassword', this.form).then((response) => {

                if (response.result == 1) {
                    let member_id = response.data.member_id;
                    this.$store.commit('savemodel', response.data);
                    window.localStorage.myuserinfo = response.data;
                    this.$store.commit('savemodel', response.data);
                    MessageBox.alert('修改成功').then(action => {
                        this.$router.push(this.fun.getUrl('login'));
                    });

                } else {
                    this.$store.commit('alerts', response.msg);
                    //this.form = {};

                }
            }, (response) => {
                // error callback
            })
        }

    },
    activated() {

        console.log(this.$route.params.object_id);

    },


}