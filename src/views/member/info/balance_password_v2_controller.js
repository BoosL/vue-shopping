import { Field } from 'mint-ui';
import { Picker } from 'mint-ui';
import { DatetimePicker } from 'mint-ui';
import addre from 'assets/address/addressinfo';
import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { mapState, mapMutations } from 'vuex';
const address = addre;
export default {
  data() {
    return {
      isOldShowKeyboard: false,
      isNewShowKeyboard: false,
      mobile: "",

      code: "",
      oldPwd: "",//旧密码
      newPwd: "",//新密码

      startCode: false,
    }
  },

  methods: {

    initData() {
      this.isOldShowKeyboard = false;
      this.isNewShowKeyboard = false;
      this.startCode = false;
      this.mobile = "";


      this.code = "";
      this.oldPwd = "";
      this.newPwd = "";

    },

    showOldKeyboard() {
      this.isOldShowKeyboard = true;
    },

    hideOldKeyboard() {
      this.isOldShowKeyboard = false;
    },

    showNewKeyboard() {
      this.isNewShowKeyboard = true;
    },

    hideNewKeyboard() {
      this.isNewShowKeyboard = false;
    },

    oldKeyboardDone(val) {
      this.oldPwd = val;

      this.hideOldKeyboard();
    },

    newKeyboardDone(val) {
      this.newPwd = val;
      this.hideNewKeyboard();
    },



    //发送验证码
    verificationCode() {
      let that = this;
      if (this.fun.isTextEmpty(this.mobile) || this.fun.isMoblie(this.mobile)) {
        this.$dialog.toast({
          mes: '手机号数据错误',
          timeout: 1500
        });
        return;
      }


      this.$dialog.loading.open('发送中...');
      //发送获取验证码的请求
      $http.get('member.balance-password.send-code', { mobile: this.mobile }).then((response) => {
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
        this.startCode = true;
        this.$dialog.loading.close();
        this.$dialog.toast({
          mes: '已发送',
          icon: 'success',
          timeout: 1500
        });
      }, 1000);
    },

    submitInfo() {
      if (this.fun.isTextEmpty(this.code)) {
        this.$dialog.toast({
          mes: '验证码不能为空',
          timeout: 1500
        });
        return;
      }

      if (this.fun.isTextEmpty(this.oldPwd)) {
        this.$dialog.toast({
          mes: '旧密码不能为空',
          timeout: 1500
        });
        return;
      }

      if (this.fun.isTextEmpty(this.newPwd)) {
        this.$dialog.toast({
          mes: '新密码不能为空',
          timeout: 1500
        });
        return;
      }

      let that = this;
      let json = { old_password: this.oldPwd, password: this.newPwd, code: this.code };
      $http.get('member.balance-password.update-password', json, "提交中...").then(function (response) {

        if (response.result == 1) {
          MessageBox.alert("成功");
          that.$router.go(-1);
        } else {
          MessageBox.alert(response.msg);
        }

      }, function (response) {
        MessageBox.alert(response.msg);
      });
    },


    //余额支付密码设置 手机号是否绑定
    getBalancePwdInfo() {
      let that = this;
      $http.get('member.balance-password.is-has-password', {}, "").then(function (response) {

        if (response.result == 1) {
          if (response.data.is_has) {
            that.mobile = response.data.mobile;
          } else {
            that.$router.go(-1);
          }
        } else {
          MessageBox.alert(response.msg);
        }

      }, function (response) {
        MessageBox.alert(response.msg);
      });
    },



  },
  //计算属性，更新数据
  computed: {

  },
  mounted() {

  },
  activated() {
    this.initData();
    this.getBalancePwdInfo();
  },
  components: { cTitle }
}