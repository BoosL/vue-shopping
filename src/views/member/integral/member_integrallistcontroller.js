import cTitle from 'components/title';
import { Navbar } from 'mint-ui';
export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      selected: '',
      all: [],
      //收入积分
      income: [],
      //消费积分
      out: []
    };
  },
  methods: {
    swichTabTItem() {
      this.getIntegralInfo(this.selected);

    },
    getIntegralInfo(type) {
      //finance.point-summary 
      var that = this;
      $http.get('finance.point-info ', { status: type}, '正在获取...').then(function (response) {

        if (response.result == 1) {
          console.log(response.data);
          if (type == 1) {
            that.income = response.data.list;

          } else if (type == -1) {
            that.out = response.data.list;
          } else {
            that.all = response.data.list;
          }

        }
      }, function (response) {
        // error callback
      });
    }

  },
  activated() {
    this.toi = this.fun.getKeyByI();
    this.getIntegralInfo();
  },
  components: { cTitle }
}