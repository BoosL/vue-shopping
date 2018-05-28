import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { Lazyload, Button } from 'mint-ui';
export default {
    data() {
        return {
            order_id: '',
            api:"",
            showQrcode: false,
        };
    },
    methods:
    {

        //初始化
        init() {
            this.order_id = '';
            this.showQrcode=false;
        },

 
        verification() {
            var that = this;
            $http.get(this.api, { order_id: this.order_id }, '正在获取核销码...').then(function (response) {
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
        this.order_id = this.$route.params.order_id;
        this.api=this.$route.params.api;

        this.verification();
    },
    components: { cTitle }
}