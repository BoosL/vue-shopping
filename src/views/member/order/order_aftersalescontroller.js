import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      value: null,
      orderOn: false,
      status_name: '',
      //退款说明
      content: '',
      //退款原因
      reason: '',
      refund_time: '',
      refund_type_name: '',
      alipay_batch_sn: '',
      operate_time: '',
      price: '',
      create_time: '',
      refund_sn: '',
      button_models: [],
      reject_reason: null

    };
  },
  methods: {
    //refund.detail
    //发起http请求
    getNetData() {
      var that = this;
      $http.get('refund.detail', { refund_id: this.refund_id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '正在获取...').then(function (response) {

        if (response.result == 1) {

          var myData = response.data;
          that.price = myData.price;
          that.content = myData.content;
          that.status_name = myData.status_name;
          that.reason = myData.reason;
          that.refund_time = myData.refund_time;
          that.refund_type_name = myData.refund_type_name;
          that.alipay_batch_sn = myData.alipay_batch_sn;
          that.create_time = myData.create_time;
          that.refund_sn = myData.refund_sn;
          that.reject_reason = myData.reject_reason;

          that.button_models = myData.button_models;

        }
      }, function (response) {
        // error callback
      });

    },
    cancleRefund() {
      //refund.cancel
      var that = this;
      $http.get('refund.operation.cancel', { refund_id: this.refund_id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '提交申请...').then(function (response) {

        if (response.result == 1) {


          MessageBox.alert(response.msg, '提示');
          that.$router.go(-1);



        } else {
          MessageBox.alert(response.msg, '提示');

        }
      }, function (response) {
        // error callback
      });

    },
    opration(btn) {
      if (btn.value == 2) {

        this.$router.push(this.fun.getUrl('express', { refund_id: this.refund_id }));

      } else if (btn.value == 1) {

        this.$router.push(this.fun.getUrl('refund', { order_id: this.refund_id, type: 2 }));

      } else if (btn.value == 3) {
        //确认收货
        this.confirm();
      }
      else {
        //取消申请
        this.cancleRefund();

      }


    },
    //换货确认收货
    confirm() {
      var that = this;
      $http.get('refund.operation.complete', { refund_id: this.refund_id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '提交申请...').then(function (response) {

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
    this.refund_id = this.$route.params.refund_id;
    this.getNetData();

  },
  components: { cTitle }
};