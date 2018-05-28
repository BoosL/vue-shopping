import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { Lazyload, Button } from 'mint-ui';
export default {
    data() {
        return {
            order_pay_id: '',
            api:"",
            showQrcode: false,
        };
    },
    methods:
    {

        //初始化
        init() {
            this.order_pay_id = '';
            this.showQrcode=false;
        },

 
        verificationCash() {
            var that = this;
            $http.get("plugin.store-cashier.frontend.store.order-detail.payment-qr-code-url", { order_pay_id: this.order_pay_id }, '正在获取支付码...').then(function (response) {
                if (response.result == 1) {
                    that.qrcode = response.data.qrcode_url;
                    that.showQrcode = true;
                } else {
                    MessageBox(response.msg);
                    that.$router.go(-1);
                }
            }, function (response) {
                MessageBox(response.msg);
            });
        },
    },

    activated() {
        this.init();//初始化
        this.order_pay_id = this.$route.params.order_pay_id;
       

        this.verificationCash();
    },
    components: { cTitle }
}