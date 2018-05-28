import cTitle from 'components/title';
import { Indicator, Toast } from 'mint-ui';
export default {

    data() {
        return {
            module1:[],
        }
    },

    activated() {
        this.getData();//获取数据
    },

    methods: {

        //获取数据
        getData() {
            let that = this;
            let json = {supplier_id:this.$route.params.id};

            $http.get('plugin.merchant.frontend.supplier-detail', json, "获取中").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                  that.module1=response.data;
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                console.log(response)
            });
        }
    },
    components: { cTitle }

}