import cTitle from 'components/title';
 import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      value: '',
      express_info: [],
      company_name: '',
      express_sn: '',
      thumb: '',
      tel: '',
      status_name: '',
      thumb:''

    };
  },
  methods: {
    getExpress() {
      var that = this;
      $http.get('dispatch.express', { order_id:this.$route.params.order.id,"i": this.fun.getKeyByI(), "type": this.fun.getTyep()}, '正在获取快递信息...').then(function (response) {

        if (response.result == 1) {
          var myData = response.data;
          that.company_name = myData.company_name;
          that.express_sn = myData.express_sn;
          that.express_info = myData.data;
          that.tel = myData.tel;
          that.status_name = myData.status_name;
          that.thumb = myData.thumb;

        } else {
          MessageBox.alert(response.msg);
        }
      }, function (response) {
        // error callback
      });

    }

  },
  activated () {
    this.toi = this.fun.getKeyByI();
    this.getExpress();
    
  },
  components: { cTitle }
};