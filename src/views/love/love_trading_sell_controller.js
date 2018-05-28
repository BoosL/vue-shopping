import cTitle from 'components/title';
import {MessageBox} from 'mint-ui';
export default
{
    data() {
        return {
            //爱心转账值
            sell_value: undefined,
            //爱心会员ID
            sell_id: undefined,
            // 转让手续费比率
            poundage: 0,
            trading_limit: 0,
            trading_fold: 0,

            love_name: "",//爱心值自定义名称
            usable: 0, // 登陆会员可用爱心值
        }
    },
    methods: {
        getUsable() {
            $http.get('plugin.love.Frontend.Controllers.page.index', {}, "加载中...").then((response) => {

                if (response.result == 1) {
                    this.usable = response.data.usable;
                    this.love_name = response.data.love_name;
                    this.fun.setWXTitle(this.love_name+"出售");
                } else {
                    MessageBox.alert(response.msg);
                }

            }, function (response) {
                MessageBox.alert(response);
            });

        },
        getLove() {
            $http.get('plugin.love.Frontend.Modules.Trading.Controllers.trading.get-sell-love', {}, "加载中...").then((response) => {
                if (response.result == 1) {

                    this.usable = response.data.love.usable;
                    this.poundage = response.data.set.poundage;
                    this.trading_limit = response.data.set.trading_limit;
                    this.trading_fold = response.data.set.trading_fold;


                } else {
                    MessageBox.alert(response.msg);
                }

            }, function (response) {
                MessageBox.alert(response);
            });

        },
        getBalance() {
            //sell_value 出售爱心值
            $http.get('plugin.love.Frontend.Modules.Trading.Controllers.trading.save-sell-love', {
                amount: this.sell_value
            }, "加载中...").then((response) => {

                if (response.result == 1) {
                    MessageBox.alert(response.msg);
                    this.getLove();

                } else {
                    MessageBox.alert(response.msg);
                }

            }, function (response) {
                MessageBox.alert(response);
            });

        }

    },
    activated() {
        this.getUsable();
        this.getLove();
    },
    components: {cTitle}
}