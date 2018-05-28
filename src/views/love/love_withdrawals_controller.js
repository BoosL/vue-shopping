import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';
export default
{
  data() {
    return {
      toi: this.fun.getKeyByI(),
      usable:0.00,
      sure_usable:"",
    }
  },
  activated() {
    this.usable=0.00;
    this.sure_usable="";
    this.toi = this.fun.getKeyByI();
    //获取数据
    this.getStoreInfo();
  },
  methods:
    {
      getStoreInfo() {
        var that = this;
        $http.get('plugin.love.Frontend.Modules.Love.Controllers.withdraw.page', {}).then(function (response) {
          if (response.result == 1) {
            that.usable=response.data.usable;
          } else {
            MessageBox.alert(response.msg);
          }

        }, function (response) {
          // error callback
        });
      },
      confirm() {
        //withdraw_money
        var that = this;

        if (this.sure_usable == undefined || this.sure_usable <= 0) {
          MessageBox.alert('提现数值不可低于0', '提示');
          return;
        }
        let json={"change_value":this.sure_usable};
        $http.get('plugin.love.Frontend.Modules.Love.Controllers.withdraw.index', json, '正在提交数据...').then(function (response) {

          if (response.result == 1) {
            that.$router.push(that.fun.getUrl('withdrawal'));
          } else {
            MessageBox.alert(response.msg, '提示');
          }
        }, function (response) {
          // error callback
        });
      }
    },

  components: { cTitle }
}