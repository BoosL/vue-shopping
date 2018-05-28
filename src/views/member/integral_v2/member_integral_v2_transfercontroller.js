import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';

export default
  {
    data() {
      return {

        credit1: "0.00",


        toi: this.fun.getKeyByI(),
        balance: 0,
        info_form: {
          transfer_id: '',
          transfer_point: ''

        },
        transfer_id: '',
        memberInfo: '',
      }
    },
    watch: {
      transfer_id: function (new_transfer_id) {
        var that = this;
        $http.get('member.member.memberInfo', {
          "i": this.fun.getKeyByI(),
          "type": this.fun.getTyep(),
          uid: this.transfer_id
        }, '获取用户中...').then(function (response) {
          if (response.result == 1) {
            that.memberInfo = response.data;
          } else {
          }
        }, function (response) {
        });
      }

    },
    methods: {

      initData() {
        this.credit1 = "0.00";
        this.info_form.transfer_point = "";
      },

      getIntegral() {

        var that = this;
        $http.get('finance.point-page.index', { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, "加载中...").then(function (response) {
          if (response.result == 1) {
            that.credit1 = response.data.credit1;
            that.transfer = response.data.transfer;
          } else {
            MessageBox.alert(response.msg);
          }

        }, function (response) {
          MessageBox.alert(response);
        });

      },




      //确认转账
      confirm() {
        var that = this;
        if (parseFloat(this.info_form.transfer_point) > parseFloat(this.credit1)) {
          MessageBox.alert('转让积分不可大于您的积分', '提示');
          return;

        }
        if (this.transfer_id == undefined || this.transfer_id <= 0 || this.transfer_id.length == 0) {
          MessageBox.alert('转让id不可为空', '提示');
          return;

        }
        if (this.info_form.transfer_point == undefined || this.info_form.transfer_point <= 0 || this.info_form.length == 0) {
          MessageBox.alert('转让积分不可低于0元', '提示');
          return;

        }
        $http.get('finance.point-transfer.index', {
          "i": this.fun.getKeyByI(),
          "type": this.fun.getTyep(),
          recipient: this.transfer_id,
          transfer_point: this.info_form.transfer_point
        }, '...').then(function (response) {

          if (response.result == 1) {
            MessageBox.alert(response.msg, '提示');
            that.$router.go(-1);


          } else {
            MessageBox.alert(response.msg, '提示');
          }
        }, function (response) {
          // error callback
        });

      }
    },
    activated() {
      this.toi = this.fun.getKeyByI();
      this.initData();//初始化数据
      this.getIntegral();//获取当前积分
    },
    components: { cTitle }
  }