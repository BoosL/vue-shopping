import { mapState, mapMutations } from 'vuex';
import cTitle from 'components/title';
import { Loadmore } from 'mint-ui';
import { Lazyload, Button } from 'mint-ui';
import { MessageBox } from 'mint-ui';

var haveShop = false;

export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      myType: window.localStorage.type,
      store: {
        name: '',
        thumb: ''
      },
      income: {
        money_total: 0.00,
        sure_withdraw_money: 0.00
      },
    };
  },

  mounted() {
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },

    getStoreInfo() {
      var that = this;
      $http.get('plugin.store-cashier.frontend.store.center.index.index', {},"").then(function (response) {
        if (response.result == 1) {
          that.store = response.data.store;
          that.income = response.data.income;
        } else {
          MessageBox.alert(response.msg);
        }

      }, function (response) {
        // error callback
      });
    },
  },
  activated() {
    this.toi = this.fun.getKeyByI();
    this.getStoreInfo();
  },
  created() {

    this.toi = this.fun.getKeyByI();

  },
  components: { cTitle, Loadmore }

}