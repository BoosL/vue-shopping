import { Field } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import cTitle from 'components/title';
export default {
    data() {
        return {

            form: {
                mobile: '',
                password: '',
                confirm_password: '',
                //验证码
                code: ''
            },
            //验证码
            code: '',
            action_name: '绑定',
            CodeStr: "获取验证码",
            timer: 30,
            stop: false,   //默认是停止的，但界面加载之后会变成false
            Interval: null,  //setInterval的对象
            lock: false      //数秒期间不能点击按钮

        }
    },
    methods:
    {


        update() {

            this.timer--;
            if (this.timer == 0) {
                //停止数秒，重新获取
                clearInterval(this.Interval);
                this.timer = 30;
                this.CodeStr = '发送验证码';
                this.lock = false;


            } else {
                this.CodeStr = String(this.timer) + ' 秒';

            }


        },
        //获取验证码
        VerificationCode() {
            var that = this;
            //如果是false就开始倒计时，如果是true就停止倒计时
            if (this.lock == false) {


                if (this.fun.isMoblie(this.form.mobile)) {
                    MessageBox.alert("请输入正确的手机号", '提示');
                    return;
                } else {
                    this.Interval = setInterval(this.update, 1000);
                    this.lock = true;
                    //发送获取验证码的请求
                    $http.get('member.register.sendCode', { mobile: this.form.mobile }).then(function (response) {

                        console.log(response.data)
                        if (response.result == 0) {
                            clearInterval(that.Interval);
                            that.timer = 30;
                            that.CodeStr = '获取验证码';
                            that.lock = false;
                            MessageBox.alert(response.msg, '提示');

                        }
                    }, function (response) {
                        // error callback
                    });

                }

            }
            else {
                return;
            }


        },
        //提交修改手机的请求
        alterAction() {

            var that = this;
            //发送获取验证码的请求
            if (this.form.mobile == null) {
                MessageBox.alert('手机号码不能为空', '提示');
            } else {
                if (this.fun.isMoblie(this.form.mobile)) {
                    MessageBox.alert("请输入正确的手机号");
                    return;
                }
            }

            if (this.form.code == null) {
                MessageBox.alert('请填写验证码', '提示');
                return;

            } else if (this.form.confirm_password != this.form.password) {
                MessageBox.alert('两次密码不一致', '提示');
                return;

            }
            else {

                $http.post('member.member.bindMobile', this.form, '正在绑定手机..').then((response)=>{
                    if (response.result == 1) {
                        // that.$emit('editmobile', that.form.mobile);
                        MessageBox.alert(response.msg, "提示").then(action => {
                       this.$router.go(-1);
                      // that.$router.push(that.fun.getUrl('home'));
                  });
                        

                    } else {
                        MessageBox.alert(response.msg, "提示");
                    }
                }, function (response) {
                    // error callback
                });

            }




        }


    }, activated() {
  
        //clearInterval(this.Interval);
        this.timer = 30;
        this.CodeStr = '获取验证码';
        this.lock = false;
        this.form.mobile = this.$route.params.num;
        this.form.code = '';
        this.form.password = '';
        this.form.confirm_password = '';
        // if (this.$route.params.num) {
        //     this.action_name = '绑定手机';
        // } else {
        //     this.action_name = '修改手机';
        // }



    },
    components: { cTitle }
}