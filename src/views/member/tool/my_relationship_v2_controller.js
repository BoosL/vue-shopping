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
            filterSort: -1,
            filterLevelData: [],
            filterLeveSort: -1,
            level1_page: 0,
            level2_page: 0,
            level3_page: 0,

            btnShow1: true,
            btnShow2: true,
            btnShow3: true


        }
    },
    methods: {
        toggle(event, n) {
            if (n == this.sort) {
                this.sort = 9999;
                return;
            } else {
                this.sort = n;
            }

        },

        initData() {
            currentTabIndex = "0";

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

            this.filterSort = -1;
            this.filterLeveSort = -1;

            // this.level1_page=0;
            // this.level2_page=0;
            // this.level3_page=0;

        },

        pageInit() {
            this.level1_page = 0;
            this.level2_page = 0;
            this.level3_page = 0;
            this.first_content = [];
            this.second_content = [];
            this.third_content = [];
            this.btnShow1 = true;
            this.btnShow2 = true;
            this.btnShow3 = true;
        },

        //我的推荐人
        getMyRelation() {
            var that = this;
            $http.get('member.member.getMyReferral_v2', {}, "").then(function (response) {
                if (response.result == 1) {
                    that.myReferral = response.data;
                    that.getMyAgentBaseInfo();
                } else {
                    that.getMyAgentBaseInfo();
                }
            }, function (response) {

            });
        },

        //我推荐的人基本信息
        getMyAgentBaseInfo() {
            var that = this;
            $http.get('member.member.getMyAgent_v2', {}, "").then(function (response) {

                if (response.result == 1) {
                    that.total = response.data.total;
                    that.level1 = response.data.level1;
                    that.level2 = response.data.level2;
                    that.level3 = response.data.level3;

                    if (!that.fun.isTextEmpty(that.level1) && that.level1.is_show) {
                        that.activeName = "first";
                        currentTabIndex = "0";
                        that.setDataByTabIndex();//获取数据
                        return;
                    }

                    if (!that.fun.isTextEmpty(that.level2) && that.level2.is_show) {
                        that.activeName = "second";
                        currentTabIndex = "1";
                        that.setDataByTabIndex();//获取数据
                        return;
                    }

                    if (!that.fun.isTextEmpty(that.level3) && that.level3.is_show) {
                        that.activeName = "third";
                        currentTabIndex = "2";
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
        closePop() {
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
                        that.filterLevelData = that.filterData[0].level;
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
            let name = tab.name;
            let index = '';
            switch (name) {
                case "first":
                    index = "0";
                    break;
                case "second":
                    index = "1";
                    break;
                case "third":
                    index = "2";
                    break;

                default:
                    break;
            }
            //点击同tab 不刷新界面
            if (currentTabIndex == index) {
                return;
            } else {
                currentTabIndex = index;
            }
            this.setDataByTabIndex();
        },

        //筛选切换子数据
        filterDataHandle(item, index) {
            if (index == this.filterSort) {
                return;
            }
            this.filterLevelData = item.level;
            this.filterSort = index;
            this.keyword = item.role;//赋值选则

            this.filterLeveSort = -1;//清空子选择
            this.level = '';//清空子数据 等级
        },

        //子数据选择
        filterLevelDataHandle(item, index) {
            if (index == this.filterLeveSort) {
                return;
            }
            this.filterLeveSort = index;
            this.level = item.id;
            console.log(this.level);
        },

        //根据筛选获取数据
        filterGetData() {

            this.closePop();
            this.pageInit();
            this.getData();
        },

        //加载数据
        getData() {
            var that = this;
            var content = "";
            var page = 0;
            var level_content = [];
            //var appendto
            switch (currentTabIndex) {
                case "0":
                    that.relationLevel = "1";
                    page = that.level1_page + 1;
                    that.level1_page = page;
                    break;
                case "1":
                    that.relationLevel = "2";
                    page = that.level2_page + 1;
                    that.level2_page = page;
                    break;
                case "2":
                    that.relationLevel = "3";
                    page = that.level3_page + 1;
                    that.level3_page = page;
                    break;

                default:


                    break;
            }
            let json = { "relationLevel": this.relationLevel, "page": page, "keyword": this.keyword, "level": that.level };
            $http.get('member.member.getMyAgentData_v2', json, "").then(function (response) {
                if (response.result == 1) {
                    //this.btnShow[level]=false;
                    if (page >= response.data.last_page) {
                        that.hidebutton();

                    }

                    if (that.fun.isTextEmpty(response.data)) {
                        that.hidebutton();

                    }
                    if (response.data.data.length == 0) {
                        that.hidebutton();

                    }
                    switch (currentTabIndex) {
                        case "0":
                            that.first_content = that.first_content.concat(response.data.data);//数组拼接
                            // that.first_content = that.pushdata(that.first_content, response.data.data);
                            break;
                        case "1":
                            that.second_content = that.second_content.concat(response.data.data);//数组拼接
                            //that.second_content = that.pushdata(that.second_content, response.data.data);
                            break;
                        case "2":
                            that.third_content = that.third_content.concat(response.data.data);//数组拼接
                            //that.third_content = that.pushdata(that.third_content, response.data.data);
                            break;
                        default:
                            break;
                    }
                    //level_content.push(response.data)

                    //console.log(content);
                    //level_content += response.data;
                }
            }, function (response) {
                // error callback
            });
        },
        pushdata(data, todata) {
            for (let i = 0; i < todata.length; i++) {
                data.push(todata[i]);
            }
            
        },
        hidebutton() {
            switch (currentTabIndex) {
                case "0":
                    this.btnShow1 = false;
                    break;
                case "1":
                    this.btnShow2 = false;
                    break;
                case "2":
                    this.btnShow3 = false;
                    break;
                default:

                    break;
            }
        }
    },
    activated() {
        this.initData();//初始化参数
        this.pageInit();
        this.getMyRelation();
        //this.getMyAgentBaseInfo();
    },
    components: { cTitle }
}