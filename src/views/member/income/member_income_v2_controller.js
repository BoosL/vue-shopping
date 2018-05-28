import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      //提现总金额
      total_income: 0,
      //可提现
      income: 0,
      //插件数据源
      plugs: []
    }
  },

  methods: {
    
    //获取数据
    getData(){
        $http.get('finance.earning.earning-count').then(response =>{
            console.log(response)
            this.total_income=response.data.total.grand_total;
            this.income=response.data.total.can_withdraw;

            this.plugs=response.data.data;
        }).catch(error =>{
            console.log(error);
        })
    },

    //验证手机身份
    gotoIncome() {
      let that = this;
      $http.get('member.member.withdrawByMobile', {}, '').then(function (response) {

        if (response.result == 1) {
          if (response.data.is_bind_mobile == 1) {
            that.$router.push(that.fun.getUrl('withdrawEditmobile', {}));
          } else {
            that.$router.push(that.fun.getUrl('withdrawal', {}));
          }
        } else {
          MessageBox.alert(response.msg);
        }
      }, function (response) {
        MessageBox.alert(response.msg);
      });
    },


  },
  activated() {
    this.total_income=0;
    this.income=0;
    this.plugs = [];

    this.getData();
   
  },
  components: { cTitle }
}