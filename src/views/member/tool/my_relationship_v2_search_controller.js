import cTitle from 'components/title';
import { Popup } from 'vue-ydui/dist/lib.rem/popup';
import Vue from 'vue';

Vue.component(Popup.name, Popup);
var currentTabIndex = "0";
//标记 防止重复加载
var is_first_content = false;
var is_second_content = false;
var is_third_content = false;
export default {
    data() {
        return {
            //我的推荐人
            myReferral: "",
            //我推荐的人
            total: 0,
            level1: '',
            level2: '',
            level3: '',

            activeName: "first",
            first_content: [],
            second_content: [],
            third_content: [],

            keyword: "",
            level: "",
            relationLevel: "",

            sort: 10000,
            

            show2: false,

            filterData: [],//筛选数据
            filterSort:-1,
            filterLevelData: [],
            filterLeveSort:-1,
        }
    },
    methods: {
        toggle(event, n) {
            console.log(n);
            if(n==this.sort)
            {
                this.sort = 9999;
                return;
            }else{
                this.sort = n;
            }

        },

        initData() {
            currentTabIndex="0";

            is_first_content = false;
            is_second_content = false;
            is_third_content = false;

            this.myReferral = "";
            this.total = 0;
            this.level1 = '';
            this.level2 = '';
            this.level3 = '';

            this.activeName = "first";
            this.first_content = [];
            this.second_content = [];
            this.third_content = [];

            this.keyword = "";
            this.level = "";
            this.relationLevel = "";

            this.sort = 10000;

            this.show2 = false;
            this.filterData = [];
            this.filterLevelData = [];

            this.filterSort=-1;
            this.filterLeveSort=-1;
        },

        //我的推荐人
        getMyRelation() {
            var that = this;
            $http.get('member.member.getMyReferral_v2', {},"").then(function (response) {
                if (response.result == 1) {
                    that.myReferral = response.data;
                    that.getMyAgentBaseInfo();
                }else{
                    that.getMyAgentBaseInfo();
                }
            }, function (response) {

            });
        },

        //我推荐的人基本信息
        getMyAgentBaseInfo() {
            var that = this;
            $http.get('member.member.getMyAgent_v2', {},"").then(function (response) {

                if (response.result == 1) {
                    that.total = response.data.total;
                    that.level1 = response.data.level1;
                    that.level2 = response.data.level2;
                    that.level3 = response.data.level3;

                    if(!that.fun.isTextEmpty(that.level1)&&that.level1.is_show)
                    {
                        that.activeName = "first";
                        that.currentTabIndex="0";
                        that.setDataByTabIndex();//获取数据
                        return;
                    }

                    if(!that.fun.isTextEmpty(that.level2)&&that.level2.is_show)
                    {
                        that.activeName = "second";
                        that.currentTabIndex="1";
                        that.setDataByTabIndex();//获取数据
                        return;
                    }

                    if(!that.fun.isTextEmpty(that.level3)&&that.level3.is_show)
                    {
                        that.activeName = "third";
                        that.currentTabIndex="2";
                        that.setDataByTabIndex();//获取数据
                        return;
                    }

                    
                }
            }, function (response) {
                
            });
        },



        openPop() {
            if (this.filterData.length == 0) {
                this.getFilterData();
            }
            this.show2 = true;
        },
        closePop(){
            this.show2 = false;
        },

        //获取筛选数据
        getFilterData() {
            var that = this;
            let json = {};
            $http.get('member.member.memberRelationFilter', json, "").then(function (response) {
                if (response.result == 1) {
                    that.filterData = response.data;
                    if (that.filterData.length > 0) {
                        that.filterLevelData=that.filterData[0].level;
                    }
                }
            }, function (response) {
                // error callback
            });
        },

        //获取数据
        getData() {
            var that = this;
            let json = { "relationLevel": this.relationLevel, "page": 1, "keyword": this.keyword, "level": this.level };
            $http.get('member.member.getMyAgentData_v2', json, "").then(function (response) {
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
                }
            }, function (response) {
                // error callback
            });

        },

        //设置选择后的数据
        setDataByTabIndex() {
            if (currentTabIndex == "0" && !is_first_content) {
                is_first_content = true;
                this.relationLevel = "1";
                this.getData();
            } else if (currentTabIndex == "1" && !is_second_content) {
                is_second_content = true;
                this.relationLevel = "2";
                this.getData();
            } else if (currentTabIndex == "2" && !is_third_content) {
                is_third_content = true;
                this.relationLevel = "3";
                this.getData();
            }
        },

        //tab 点击
        handleClick(tab, event) {

            //点击同tab 不刷新界面
            if (currentTabIndex == tab.index) {
                return;
            } else {
                currentTabIndex = tab.index;
            }
            this.setDataByTabIndex();
        },

        //筛选切换子数据
        filterDataHandle(item,index){
            if(index==this.filterSort)
            {   
                return;
            }
            this.filterLevelData=item.level;
            this.filterSort = index;
            this.keyword=item.role;//赋值选则

            this.filterLeveSort=-1;//清空子选择
            this.level='';//清空子数据 等级
        },

        //子数据选择
        filterLevelDataHandle(item,index){
            if(index==this.filterLeveSort)
            {   
                return;
            }
            this.filterLeveSort = index;
            this.level=item.id;
            console.log(this.level);
        },

        //根据筛选获取数据
        filterGetData(){
            this.closePop();
            this.getData();
        }
    },
    activated() {
        this.initData();//初始化参数
        this.getMyRelation();
        //this.getMyAgentBaseInfo();
    },
    components: { cTitle }
}