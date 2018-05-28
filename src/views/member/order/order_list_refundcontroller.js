import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      title: '退款申请',
      form:
      {
        //type-1 表示订单退款 type-2 表示修改退款
        type: 1,
        //退款原因
        reason: '',
        //申请类型
        refund_type: '',
        //退款原因
        content: '',
        order_id: '',
        refund_id: '',
        "i": this.fun.getKeyByI(), "type": this.fun.getTyep()
      },

      //处理方式
      refundTypes: [],
      //退款原因
      reasons: [],
      money: 0.00,
    };
  },
  methods:
  {
    //提交退款申请
    confirmRefund() {
      console.log(this.form);
      var that = this;
      var action;
      if (this.$route.params.type == 1) {
        action = 'refund.apply.store';
      } else {
        action = 'refund.edit.store';

      }
      $http.post(action, this.form, '正在提交申请').then(function (response) {
        if (response.result == 1) {

          MessageBox.alert(response.msg, '');
          that.$router.go(-1);

        } else {
          MessageBox.alert(response.msg);
        }
      }, function (response) {
        // error callback
      });


    },
    //获取退款信息
    getRefundInfo() {
      var that = this;
      $http.get('refund.apply', { order_id: this.$route.params.order_id }, "").then(function (response) {
        if (response.result == 1) {
          var mydata = response.data;
          that.money = mydata.order.price;
          that.refundTypes = mydata.refundTypes;
          that.reasons = mydata.reasons;
        } else {
          MessageBox.alert(response.msg);
        }
      }, function (response) {
        MessageBox.alert(response);
      });
    },
    getAlterInfo() {
      var that = this;
      $http.get('refund.edit', { refund_id: this.$route.params.order_id }, "").then(function (response) {
        if (response.result == 1) {
          var mydata = response.data;
          that.money = mydata.refundApply.price;
          that.refundTypes = mydata.refundTypes;
          that.reasons = mydata.reasons;
          that.form.content = mydata.refundApply.content;
          that.form.reason = mydata.refundApply.reason;
          that.form.refund_type = mydata.refundApply.refund_type_name;
          that.form.refund_type = mydata.refundApply.refund_type;
        } else {
          MessageBox.alert(response.msg);
        }
      }, function (response) {
        MessageBox.alert(response);
      });

    }


  },
  created() {
    //this.money = this.$route.params.order_id;


  },
  activated() {
    this.money = 0.00;
    //console.log(this.$route.params.order_id);
    this.toi = this.fun.getKeyByI();
    this.form.order_id = this.$route.params.order_id;
    this.form.refund_id = this.$route.params.order_id;
    if (this.$route.params.type == 2) {
      //修改申请
      this.title = '修改申请';
      this.getAlterInfo();

    } else {
      this.title = '退款申请';
      this.getRefundInfo();
    }

  },
  components: { cTitle }
};