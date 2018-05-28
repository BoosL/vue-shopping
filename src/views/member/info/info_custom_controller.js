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
      //登录类型,1-代表微信，5-浏览器登录
      type: this.fun.getTyep(),
      toi: this.fun.getKeyByI(),


      is_custom: false,//自定义参数
      custom_title: "信息",//自定义title 
      custom_value: "",//自定义值
    }
  },

  methods: {
    //获取自定义数据
    getMemberInfo2() {
      let that = this;

      $http.get('member.member.get-custom-field', { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, "初始化").then(function (response) {

        if (response.result == 1) {

          that.custom_title = response.data.custom_title;

        } else {
          //MessageBox.alert(response.msg);
        }

      }, function (response) {
        // error callback
      });
    },

    submitInfo() {
      if (this.fun.isTextEmpty(this.custom_value)) {
        MessageBox.alert(this.custom_title + "信息不能为空");
        return;
      }

      let that=this;
      $http.get('member.member.save-custom-field', {custom_value:this.custom_value }, "初始化").then(function (response) {

        if (response.result == 1) {
          MessageBox.alert("成功");
          that.$router.go(-1);
        } else {
          MessageBox.alert(response.msg);
          that.$router.go(-1);
        }

      }, function (response) {
        MessageBox.alert(response.msg);
        that.$router.go(-1);
      });
    }



  },
  //计算属性，更新数据
  computed: {

  },
  mounted() {

  },
  activated() {
    this.toi = this.fun.getKeyByI();
    this.getMemberInfo2();
  },
  components: { cTitle }
}