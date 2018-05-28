import cTitle from 'components/title';
import { Navbar } from 'mint-ui';
export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      selected: '',
      //代打款
      waitPay: [],
      //打款
      pay: [],
      //待审核
      review: [],
      //无效数据
      invalid: [],
      //全部数据
      all: []
    };
  },
  methods: {
    swichTabTItem() {
      this.getNetData(this.selected);

    },
    //发起http请求
    getNetData(status) {
      var that = this;
      $http.get('finance.withdraw.withdraw-log', { status: status, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '正在获取列表...').then(function (response) {
        var mydata = response.data;
        if (that.selected.length == 0) {
          //全部
          that.all = mydata;
        }
        else if (that.selected == 0) {
          //待审核
          that.review = mydata;

        } else if (that.selected == 1) {
          //待打款
          that.waitPay = mydata;
        } else if (that.selected == 2) {
          //打款
          that.pay = mydata;

        } else if (that.selected == -1) {
          //无效
          that.invalid = mydata;
        }
      }, function (response) {
        // error callback
      });

    },


  },
  activated() {
    this.toi = this.fun.getKeyByI();
    this.getNetData('');
  },
  components: { cTitle }
}