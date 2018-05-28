import cTitle from 'components/title';
import { Indicator, Toast } from 'mint-ui';
export default {
    data() {
        return {

            codes: [],
        }
    },

    activated() {
        this.getData();//初始化数据
    },

    methods: {
        //初始化数据
        getData() {
            let that = this;
            $http.get('plugin.team-dividend.api.index.codeRecord', {}).then(function (response) {
                if (response.result == 1) {
                    that.codes = response.data;
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                Toast(response.msg);
            });
        },
    },
    components: { cTitle }

}