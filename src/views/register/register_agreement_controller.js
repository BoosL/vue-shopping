import { Field, Button } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import cTitle from 'components/title';


export default {
    data() {
        return {
            protocol:"",

        }
    },


    mounted() {

    },

    methods: {

        init() {

        },
        //协议信息
        getProtocolInfo() {
            var that = this;
            $http.get('setting.get-member-protocol', {}).then((response) => {
                if (response.result == 1) {
                    that.protocol = response.data.content;
                } else {
                   
                }
            }, (response) => {
                console.log(response.msg);
            });

        },
    },
    activated() {
        this.init();
        this.getProtocolInfo();
    },

    components: { cTitle }


}