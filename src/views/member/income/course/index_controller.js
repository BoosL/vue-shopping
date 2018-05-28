import { Field, Button } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { CheckBox, CheckBoxGroup } from 'vue-ydui/dist/lib.px/checkbox';
import cTitle from 'components/title';
var currentTabIndex = "0";
//标记 防止重复加载
var is_first_content = false;
var is_second_content = false;
var is_third_content = false;

export default {
    data() {
        return {

            lecturer_name: "",
            avatar: "",
            order_bonus: "0.00",
            reward_bonus: "0.00",
            lecturer_bonus: "0.00",

            activeName: "first",
            first_content: [],
            second_content: [],
            third_content: [],
        }
    },

    mounted() {

    },

    methods: {
        //获取讲师信息
        getLecturerInfo() {
            $http.get("plugin.video-demand.api.video-demand-lecturer.get-lecturer-info", {}).then(response => {
                if (response.result == 1) {
                    this.lecturer_name = response.data.lecturer_name;
                    this.avatar = response.data.avatar;
                    this.order_bonus = response.data.order_bonus;
                    this.reward_bonus = response.data.reward_bonus;
                    this.lecturer_bonus = response.data.lecturer_bonus;
                } else {
                    MessageBox.alert(response.msg);
                }
            }).catch(error => {
                MessageBox.alert(response.msg);
            });
        },

        getLecturerBonusInfo(status) {
            let that = this;
            let json = { "account_status": status };
            $http.get("plugin.video-demand.api.video-demand-lecturer.lecturer-reward-info", json, "").then(response => {
                if (response.result == 1) {
                    switch (currentTabIndex) {
                        case "0":
                            that.first_content = response.data;
                            break;
                        case "1":
                            that.second_content = response.data;
                            break;
                        case "2":
                            that.third_content = response.data;
                            break;

                        default:
                            break;
                    }
                } else {
                    MessageBox.alert(response.msg);
                }
            }).catch(error => {
                MessageBox.alert(response.msg);
            })
        },


        //设置选择后的数据
        setDataByTabIndex() {
            if (currentTabIndex == "0" && !is_first_content) {
                is_first_content = true;
                this.getLecturerBonusInfo("");
            } else if (currentTabIndex == "1" && !is_second_content) {
                is_second_content = true;
                this.getLecturerBonusInfo("0");
            } else if (currentTabIndex == "2" && !is_third_content) {
                is_third_content = true;
                //this.getLecturerBonusInfo();
                this.getLecturerBonusInfo("1");
            }
        },
        //tab 点击
        handleClick(tab) {
            //点击同tab 不刷新界面
            if (currentTabIndex == tab.index) {
                return;
            } else {
                currentTabIndex = tab.index;
            }
            this.setDataByTabIndex();
        },

        //初始化参数
        initData() {

            currentTabIndex = "0";
            is_first_content = false;
            is_second_content = false;
            is_third_content = false;


            this.activeName = 'first';

            this.first_content = [];
            this.second_content = [];
            this.third_content = [];
        },
    },


    activated() {

        this.getLecturerInfo();
        this.initData();//初始化参数
        this.setDataByTabIndex();

    },

    components: { cTitle, CheckBox }


}