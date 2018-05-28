import cTitle from 'components/title';
import { Navbar } from 'mint-ui';
export default {
  data() {
    return {
      selected: '0',
      toi: this.fun.getKeyByI(),
      all: [],
      income: [],
      //支出
      expenditure: []

    };
  },
  methods:
  {

    swichTabTItem() {
      this.getNetData(this.selected);
    },
    //发起http请求
    getNetData(index) {
      var that = this;
      $http.get('finance.balance.record', { record_type: index,"i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '').then(function (response) {

        if (response.result == 1) {

          var myData = response.data;
          console.log(myData);
          if (index == 0) {
            that.all = myData;
          } else if (index == 1) {
            that.income = myData;

          } else if (index == 2) {
            that.expenditure = myData;
          }
        }
      }, function (response) {
        // error callback
      });

    },

  },
  activated() {
    this.toi = this.fun.getKeyByI();
    this.getNetData(0);

  },
  components: { cTitle }
}