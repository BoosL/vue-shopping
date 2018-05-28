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
      pwd: "",
      rePwd: "",
    }
  },

  methods: {

    initData() {
      this.pwd = "";
      this.rePwd = "";
    },

    //验证是否绑定手机号
    initVerify() {
      let that = this;
      $http.get('member.balance-password.is-has-password', { password: this.pwd }, "").then(function (response) {
        if (response.result == 1) {

          //手机号为空
          if (that.fun.isTextEmpty(response.data.mobile)) {
            MessageBox({
              title: '提示',
              message: "设置密码必须先绑定手机号",
              showCancelButton: true
            }).then(action => {
              console.log(action);
              if (action == 'confirm') {
                that.$router.push(that.fun.getUrl('editmobile', {}));
              } else if (action == 'cancel') {
                that.$router.go(-1);
              }
            });
          }
        } else {
          MessageBox.alert(response.msg);
        }

      }, function (response) {
        MessageBox.alert(response.msg);
      });
    },


    setPwd() {
      let that = this;

      if (this.fun.isTextEmpty(this.pwd)) {
        MessageBox.alert("密码不能为空");
        return;
      }

      if (this.pwd.length < 6) {
        MessageBox.alert("密码不能小于6位");
        return;
      }

      if (this.fun.isTextEmpty(this.rePwd)) {
        MessageBox.alert("确认密码不能为空");
        return;
      }

      if (this.rePwd.length < 6) {
        MessageBox.alert("确认密码不能小于6位");
        return;
      }

      if (this.pwd != this.rePwd) {
        MessageBox.alert("密码和确认密码必须相同");
        return;
      }



      $http.get('member.balance-password.set-password', { password: this.pwd }, "提交中...").then(function (response) {
        if (response.result == 1) {
          switch (response.data.code) {
            case 1://成功
              MessageBox.alert(response.msg);
              that.$router.go(-1);
              break;
            case 2://失败
              MessageBox.alert(response.msg);
              break;
            case 3://手机号未绑定
              MessageBox({
                title: '提示',
                message: response.msg,
                showCancelButton: true
              }).then(action => {
                console.log(action);
                if (action == 'confirm') {
                  that.$router.push(this.fun.getUrl('editmobile', {}));
                } else if (action == 'cancel') {
                  that.$router.go(-1);
                }
              });
              break;
            default:
              break;
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
    this.initVerify();
  },
  components: { cTitle }
}