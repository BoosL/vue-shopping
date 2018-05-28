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
            datas:[],
        };
    },

    mounted() {
    },
    methods: {
        //获取数据
        getMyActivityInfo() {
            this.datas=[];
            var that = this;
            $http.get('plugin.conference.api.conference-activity.get-enrol-data', { conference_id: this.id }, "加载中...").then(function (response) {
                if (response.result == 1) {
                    var dataList = response.data;
                    console.log(response);

                    for(let j=0;j<dataList.length;j++){
                        let dataItem=new Object();
                        dataItem.title=dataList[j].name;

                        if(dataList[j].value instanceof Array)
                        {
                            let value="";
                            for(let i=0;i<dataList[j].value.length;i++){
                                value+=dataList[j].value[i]+" ";
                            }
                            dataItem.value=value;
                        }else{
                            dataItem.value=dataList[j].value;
                        }
                        that.datas.push(dataItem);
                    }
                } else {
                    MessageBox.alert(response.msg);
                }
            }, function (response) {
                MessageBox.alert(response);
            });
        },
    },
    activated() {
        this.id = this.$route.params.id;
        this.datas=[];//初始化
        this.getMyActivityInfo();
    },
    created() {

    },
    components: { cTitle },


}
