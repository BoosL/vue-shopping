import { Indicator, Toast } from 'mint-ui';
export default {
    data() {
        return {
            status: "",//当前申请状态
            config_status: "",//后台申请条件
            config2: {},//后台条件2
            config3: {},//后台条件3
            config4: {},//后台条件4
            config5: {},//后台条件5
        }
    },

    activated() {
        this.status = "";//当前申请状态
        this.config_status = "";//后台申请条件
        this.getData();//获取申请状态以及商城配置信息
    },
    mounted() {
    },

    methods: {
        //获取申请状态以及商城配置信息
        getData() {
            let that = this;
            let json = {};

            $http.get('plugin.merchant.frontend.get-center-condition', json, "加载中").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    that.status = response.data.status;
                    that.config_status = response.data.config_status;
                    that.config2 = response.data.config2;
                    that.config3 = response.data.config3;
                    that.config4 = response.data.config4;
                    that.config5 = response.data.config5;
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                console.log(response)
            });
        },

        //提交数据
        submit() {
            let that = this;

            let json = { config_status: this.config_status };
            $http.get('plugin.merchant.frontend.merchant-apply.center', json, "提交中").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    that.status = response.data.status;
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                console.log(response)
            });
        },
        //去商城
        goHome() {
            this.$router.push(this.fun.getUrl('home'));
        },

        //去商品页面
        goToGoods(goods_id) {
            this.$router.push(this.fun.getUrl('goods', { id: goods_id }));
        },

        //去招商中心
        goEnterproseCentre() {
            this.$router.push(this.fun.getUrl('enterprise_index', {}));
        }
    }
}