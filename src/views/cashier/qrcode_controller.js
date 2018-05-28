import cTitle from 'components/title';
import { mapState, mapMutations } from 'vuex';
import { Indicator, Toast } from 'mint-ui';

//import cOrder from 'components/order';

export default {
  data() {
    return {
      qrcode: "",
    }
  },

  activated() {
    this.getQrcode();
  },

  mounted() {
  },
  methods: {
    //获取收货地址
    getQrcode() {
      this.addressData = [];
      let that = this;
      let json = { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
      $http.get('plugin.store-cashier.frontend.cashier.QrCode', json, "获取中...").then(function (response) {
        console.log("qrcode:", response.data)
        if (response.result == 1) {
          that.qrcode = response.data;
        } else {

        }
      }, function (response) {
        console.log(response);
      });
    },

  },
  components: { cTitle }
}