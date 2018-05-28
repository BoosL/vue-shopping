import { mapState, mapMutations } from 'vuex';
import cTitle from '../../components/title';
import { Loadmore } from 'mint-ui';
import { Lazyload, Button } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import District from 'ydui-district/dist/gov_province_city_area_id';
import { Picker } from 'mint-ui';
import { DatetimePicker } from 'mint-ui';

//import diyinput from 'components/diyform/input';

var haveShop = false;

export default {
    data() {
        return {
            id: "",
            
        };
    },

    mounted() {
    },
    methods: {
        //获取数据
        postSignatureInfo() {
            this.datas=[];
            var that = this;
            $http.get('plugin.conference.api.conference-activity.save-sign', { conference_id: this.id }, "签到中...").then(function (response) {
                if (response.result == 1) {
                    MessageBox.alert(response.msg);
                    that.$router.push(that.fun.getUrl('home'));
                } else {
                    MessageBox.alert(response.msg);
                    that.$router.push(that.fun.getUrl('home'));
                }
            }, function (response) {
                MessageBox.alert(response);
                that.$router.push(that.fun.getUrl('home'));
            });
        },
    },
    activated() {
        this.id = this.$route.params.id;
        this.postSignatureInfo();
    },
    created() {

    },
    components: { cTitle },


}
