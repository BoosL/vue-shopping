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
            checkbox1: true,
            id: "",
            dataInfo: {},
            activityName: "",
            activityDate: "",
            activityContent: "",
            activityThumb: "",

            activityTask: [],
        };
    },

    mounted() {
    },
    methods: {

        //获取设置
        initData(){
            var that = this;
            $http.get('plugin.task-reward.api.task-activity.get-task-reward-set', { activity_id: this.id }, "").then(function (response) {
                if (response.result == 1) {
                    if(response.data.is_task_reward=="1")
                    {
                        that.getActivityTask();
                    }else{
                        that.$router.go(-1);
                    }
                   
                } else {
                    MessageBox.alert(response.msg);
                }
            }, function (response) {
                MessageBox.alert(response);
            });
        },

        //获取数据
        getActivityTask() {
            var that = this;
            $http.get('plugin.task-reward.api.task-activity.get-task-activity', { activity_id: this.id }, "加载中...").then(function (response) {
                if (response.result == 1) {
                    if(response.data.time_status==1)//活动正常
                    {
                        that.dataInfo = response.data;
                        that.initActivityInfo(response.data);
                        that.activityTask = response.data.hasManyTask;
                    }else if(response.data.time_status==-1){//活动已结束
                        that.initActivityInfo(response.data);
                        MessageBox.alert("活动已结束");
                    }else if(response.data.time_status==0){//活动未开始
                        that.initActivityInfo(response.data);
                        MessageBox.alert("活动未开始");
                    }
                    
                } else {
                    MessageBox.alert(response.msg);
                }
            }, function (response) {
                MessageBox.alert(response);
            });
        },

        initActivityInfo(data) {
            this.activityName = data.title;
            this.activityDate = data.starttime + "至" + data.endtime;
            this.activityContent = data.content;
            this.activityThumb = data.thumb;
        },

        //获取奖励操作
        getReceive(id) {
            var that = this;
            $http.get('plugin.task-reward.api.task-activity.get-receive-reward', { activity_id: this.id, task_id: id }, "领取中...").then(function (response) {
                if (response.result == 1) {
                    if(response.data.status==1){
                        that.getActivityTask();
                    }else{
                        MessageBox.alert(response.msg);
                    }
                    
                } else {
                    MessageBox.alert(response.msg);
                }
            }, function (response) {
                MessageBox.alert(response);
            });
        }

    },
    activated() {
        this.id = this.$route.params.id;
        this.initData();
      
    },
    created() {

    },
    components: { cTitle },


}
