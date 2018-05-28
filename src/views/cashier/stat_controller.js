import {mapState, mapMutations} from 'vuex';
import cTitle from '../../components/title';
import {Loadmore} from 'mint-ui';
import {Lazyload, Button} from 'mint-ui';
import {MessageBox} from 'mint-ui';

var haveShop = false;

export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      myType: window.localStorage.type,
      store: {
        name:'',
        thumb:'',
        store_id:''
      },
      startDate: '',
      endDate: '',
      income: {
        money_total: 0.00,
        sure_withdraw_money: 0.00
      },
      stat:{

      }
    };
  },
  mounted() {
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },

    getStat(is_time){
      //plugin.store-cashier.frontend.cashier.statistics.index
      var stime = {};
      if (!is_time) {
         is_time = 0;
      }
      //return;
      var that = this;
      $http.get('plugin.store-cashier.frontend.cashier.Statistics.index', {
        "i": this.fun.getKeyByI(),
        "type": this.fun.getTyep(),
        "store_id":that.store.store_id,
        'is_time' : is_time,
      }).then(function (response) {

        console.log("stat::", response);

        if (response.result == 1) {
          that.stat = response.data;
          // that.startDate = that.stat.time_start;
          // that.endDate = that.stat.time_end;
          console.log();
        } else {
          MessageBox.alert(response.msg);
        }

      }, function (response) {
        // error callback
      });
    },
    getStoreInfo() {
      var that = this;
      $http.get('plugin.store-cashier.frontend.cashier.center.index', {
        "i": this.fun.getKeyByI(),
        "type": this.fun.getTyep()
      }).then(function (response) {

        console.log("cashier::", response);

        if (response.result == 1) {
          console.log("cashier::", response.data);
          that.store = response.data.store;
          that.income = response.data.income;
          that.getStat();
          //that.credit = myData.credit;
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
    this.startDate = '';
    this.endDate = '';
  },
  created() {

    this.toi = this.fun.getKeyByI();

  },
  components: {cTitle, Loadmore}

}
