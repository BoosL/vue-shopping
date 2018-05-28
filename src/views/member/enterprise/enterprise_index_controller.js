import cTitle from 'components/title';
import { Indicator, Toast } from 'mint-ui';
//标记 防止重复加载 招商员 招商中心切换
var currentBaseTabIndex = "0";
var is_enterprise_content = false;
var is_enterprise_center_content = false;

//标记 防止重复加载 招商员 切换
var currentEnterpriseTabIndex = "0";
var is_enterprise_first_content = false;
var is_enterprise_second_content = false;
var is_enterprise_third_content = false;
//标记 防止重复加载 招商员 切换


//标记 防止重复加载 招商中心 切换
var currentEnterpriseCenterTabIndex = "0";
var is_enterprise_center_first_content = false;
var is_enterprise_center_second_content = false;
var is_enterprise_center_third_content = false;
//标记 防止重复加载 招商中心 切换



export default {
    data() {
        return {
            enterpriseBaseActiveName: "enterprise",//招商员 招商中心切换

            //招商员数据
            enterpriseInfo_1: {},
            enterpriseRatioDatas: [],
            enterpriseSupplier: 0,
            enterpriseActiveName: "enterprise_first",
            enterprise_first_content: [],
            enterprise_second_content: [],
            enterprise_third_content: [],
            //招商员数据

            //招商中心数据
            enterpriseCenterInfo_1: {},
            enterpriseCenterRatioDatas: [],
            enterpriseCenterSupplier: 0,
            enterpriseCenterActiveName: "enterprise_center_first",
            enterprise_center_first_content: [],
            enterprise_center_second_content: [],
            enterprise_center_third_content: [],
            //招商中心数据
        }
    },


    activated() {
        this.initData();//初始化参数
        this.setDataByTabIndex();
    },

    methods: {
        //初始化参数
        initData() {
            //招商员 招商中心切换
            currentBaseTabIndex = "0";
            is_enterprise_content = false;
            is_enterprise_center_content = false;
            this.enterpriseBaseActiveName = "enterprise";
            //招商员 招商中心切换


            //招商员数据
            this.enterpriseSupplier = 0;
            this.enterpriseRatioDatas = [];
            this.enterpriseActiveName = "enterprise_first";
            currentEnterpriseTabIndex = "0";
            is_enterprise_first_content = false;
            is_enterprise_second_content = false;
            is_enterprise_third_content = false;
            this.enterprise_first_content = [];
            this.enterprise_second_content = [];
            this.enterprise_third_content = [];
            //招商员数据

            //招商中心数据
            this.enterpriseCenterSupplier = 0;
            this.enterpriseCenterRatioDatas = [];
            this.enterpriseCenterActiveName = "enterprise_center_first";
            currentEnterpriseCenterTabIndex = "0";
            is_enterprise_center_first_content = false;
            is_enterprise_center_second_content = false;
            is_enterprise_center_third_content = false;
            this.enterprise_center_first_content = [];
            this.enterprise_center_second_content = [];
            this.enterprise_center_third_content = [];
            //招商中心数据

        },

        //初始化info数据
        initInfo() {

        },


        //设置选择后的数据
        setDataByTabIndex() {
            if (currentBaseTabIndex == "0" && !is_enterprise_content) {
                is_enterprise_content = true;
                this.getEnterpriseData();
            } else if (currentBaseTabIndex == "1" && !is_enterprise_center_content) {
                //is_enterprise_center_content = true;//特殊处理
                this.isEnterpriseCenter();//判断是否是招商中心
            }
        },

        //tab 点击
        enterpriseBaseHandleClick(tab, event) {
            //点击同tab 不刷新界面
            if (currentBaseTabIndex == tab.index) {
                return;
            } else {
                currentBaseTabIndex = tab.index;
            }
            this.setDataByTabIndex();
        },





        //---------招商中心---------//

        isEnterpriseCenter() {
            let that = this;
            let json = {};
            $http.get('plugin.merchant.frontend.get-center-permission', json, "获取中").then(function (response) {
                if (response.result == 1) {

                    if (response.data.status == -1) {
                        is_enterprise_center_content = false;
                        //不是招商中心 跳转去申请
                        that.$router.push(that.fun.getUrl('enterprose_center_apply', {}));
                    } else if (response.data.status == 1) {
                        //是招商中心 获取数据
                        is_enterprise_center_content = true;
                        that.getEnterpriseCenterData();//获取招商中心全部信息
                    }
                } else {
                    Toast(response.msg);

                }
            }, function (response) {
                console.log(response)
            });
        },

        //获取招商中心全部信息
        getEnterpriseCenterData() {
            this.getEnterpriseCenterInfo_1();//获取招商中心信息
            this.getEnterpriseCenterInfo_2();//获取招商中心统计信息
            this.getEnterpriseCenterInfo_3();//获取招商中心 供应商人数
            this.setEnterpriseCenterDataByTabIndex();//获取招商中心分红信息
        },


        //获取招商中心信息
        getEnterpriseCenterInfo_1() {
            let that = this;
            let json = {};

            $http.get('plugin.merchant.frontend.merchant-center', json, "获取中").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    that.enterpriseCenterInfo_1 = response.data;
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                console.log(response)
            });
        },

        //获取招商中心统计信息
        getEnterpriseCenterInfo_2() {
            let that = this;
            let json = { merchant_type: "1" };

            $http.get('plugin.merchant.frontend.merchant.get-merchant-statistic', json, "获取中").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    that.enterpriseCenterRatioDatas = [];//清空数据源
                    //组装数据
                    let itemDay = new Object();
                    itemDay.money = response.data.today;
                    itemDay.data = "今日";
                    itemDay.name = "data";
                    that.enterpriseCenterRatioDatas.push(itemDay);

                    let itemYesterday = new Object();
                    itemYesterday.money = response.data.yesterday;
                    itemYesterday.data = "昨日";
                    itemYesterday.name = "data";
                    that.enterpriseCenterRatioDatas.push(itemYesterday);

                    let itemWeek = new Object();
                    itemWeek.money = response.data.this_week;
                    itemWeek.data = "本周";
                    itemWeek.name = "data";
                    that.enterpriseCenterRatioDatas.push(itemWeek);

                    let itemMonth = new Object();
                    itemMonth.money = response.data.this_month;
                    itemMonth.data = "本月累计分红";
                    itemMonth.name = "mounth";
                    that.enterpriseCenterRatioDatas.push(itemMonth);
                    //组装数据
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                console.log(response)
            });
        },

        //获取招商中心 供应商人数
        getEnterpriseCenterInfo_3() {
            let that = this;
            let json = {};

            $http.get('plugin.merchant.frontend.merchant-center-supplier', json, "获取中").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    that.enterpriseCenterSupplier = response.data.total;
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                console.log(response)
            });
        },


        //获取招商中心结算信息
        getEnterpriseCenterInfo_4(status) {
            let that = this;
            let json = { merchant_type: "1", status: status };

            $http.get('plugin.merchant.frontend.merchant.get-merchant-list', json, "获取中").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    switch (currentEnterpriseCenterTabIndex) {
                        case "0":
                            that.enterprise_center_first_content = response.data;
                            break;
                        case "1":
                            that.enterprise_center_second_content = response.data;
                            break;
                        case "2":
                            that.enterprise_center_third_content = response.data;
                            break;

                        default:
                            break;
                    }
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                console.log(response)
            });
        },


        //招商中心切换标签
        enterpriseCenterHandleClick(tab, event) {
            //点击同tab 不刷新界面
            if (currentEnterpriseCenterTabIndex == tab.index) {
                return;
            } else {
                currentEnterpriseCenterTabIndex = tab.index;
            }
            this.setEnterpriseCenterDataByTabIndex();
        },


        //设置选择后的数据 招商中心
        setEnterpriseCenterDataByTabIndex() {
            if (currentEnterpriseCenterTabIndex == "0" && !is_enterprise_center_first_content) {
                is_enterprise_center_first_content = true;
                this.getEnterpriseCenterInfo_4("");
            } else if (currentEnterpriseCenterTabIndex == "1" && !is_enterprise_center_second_content) {
                is_enterprise_center_second_content = true;
                this.getEnterpriseCenterInfo_4("1");
            } else if (currentEnterpriseCenterTabIndex == "2" && !is_enterprise_center_third_content) {
                is_enterprise_center_third_content = true;
                this.getEnterpriseCenterInfo_4("0");
            }
        },

        //---------招商中心---------//














        //---------招商员---------//

        //获取招商员全部信息
        getEnterpriseData() {
            this.getEnterpriseInfo_1();//获取招商员信息
            this.getEnterpriseInfo_2();//获取招商员统计信息
            this.getEnterpriseInfo_3();//获取招商员 供应商人数
            this.setEnterpriseDataByTabIndex();//获取招商员分红信息
        },

        //获取招商员信息
        getEnterpriseInfo_1() {
            let that = this;
            let json = {};

            $http.get('plugin.merchant.frontend.merchant-staff', json, "获取中").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    that.enterpriseInfo_1 = response.data;
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                console.log(response)
            });
        },


        //获取招商员统计信息
        getEnterpriseInfo_2() {
            let that = this;
            let json = { merchant_type: "0" };

            $http.get('plugin.merchant.frontend.merchant.get-merchant-statistic', json, "获取中").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    that.enterpriseRatioDatas = [];//清空数据源
                    //组装数据
                    let itemDay = new Object();
                    itemDay.money = response.data.today;
                    itemDay.data = "今日";
                    itemDay.name = "data";
                    that.enterpriseRatioDatas.push(itemDay);

                    let itemYesterday = new Object();
                    itemYesterday.money = response.data.yesterday;
                    itemYesterday.data = "昨日";
                    itemYesterday.name = "data";
                    that.enterpriseRatioDatas.push(itemYesterday);

                    let itemWeek = new Object();
                    itemWeek.money = response.data.this_week;
                    itemWeek.data = "本周";
                    itemWeek.name = "data";
                    that.enterpriseRatioDatas.push(itemWeek);

                    let itemMonth = new Object();
                    itemMonth.money = response.data.this_month;
                    itemMonth.data = "本月累计分红";
                    itemMonth.name = "mounth";
                    that.enterpriseRatioDatas.push(itemMonth);
                    //组装数据
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                console.log(response)
            });
        },

        //获取招商员 供应商人数
        getEnterpriseInfo_3() {
            let that = this;
            let json = {};

            $http.get('plugin.merchant.frontend.merchant-staff-supplier', json, "获取中").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    that.enterpriseSupplier = response.data.total;
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                console.log(response)
            });
        },

        //获取招商员结算信息
        getEnterpriseInfo_4(status) {
            let that = this;
            let json = { merchant_type: "0", status: status };

            $http.get('plugin.merchant.frontend.merchant.get-merchant-list', json, "获取中").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    switch (currentEnterpriseTabIndex) {
                        case "0":
                            that.enterprise_first_content = response.data;
                            break;
                        case "1":
                            that.enterprise_second_content = response.data;
                            break;
                        case "2":
                            that.enterprise_third_content = response.data;
                            break;

                        default:
                            break;
                    }
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                console.log(response)
            });
        },


        //招商员切换标签
        enterpriseHandleClick(tab, event) {
            //点击同tab 不刷新界面
            if (currentEnterpriseTabIndex == tab.index) {
                return;
            } else {
                currentEnterpriseTabIndex = tab.index;
            }
            this.setEnterpriseDataByTabIndex();
        },

        //设置选择后的数据 招商员
        setEnterpriseDataByTabIndex() {

            if (currentEnterpriseTabIndex == "0" && !is_enterprise_first_content) {
                is_enterprise_first_content = true;
                this.getEnterpriseInfo_4("");
            } else if (currentEnterpriseTabIndex == "1" && !is_enterprise_second_content) {
                is_enterprise_second_content = true;
                this.getEnterpriseInfo_4("1");
            } else if (currentEnterpriseTabIndex == "2" && !is_enterprise_third_content) {
                is_enterprise_third_content = true;
                this.getEnterpriseInfo_4("0");
            }
        },

        //---------招商员---------//


    },
    components: { cTitle }

}