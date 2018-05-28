import cTitle from 'components/title';
import { Indicator, Toast } from 'mint-ui';
export default {

    data() {
        return {
            list: [],
        }
    },

    activated() {
        this.list = [];
        this.getData();//获取数据
    },

    methods: {

        //获取数据
        getData() {
            let that = this;
            let json = {};

            $http.get('plugin.merchant.frontend.center-supplier-list', json, "获取中").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    that.list = response.data;
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                console.log(response)
            });
        },

        //跳转到详情
        goToSupplierInfo(item) {
            this.$router.push(this.fun.getUrl('enterprise_supplier_info', { id: item.id }));
        }
    },
    components: { cTitle }

}