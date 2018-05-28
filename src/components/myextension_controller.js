import { Indicator, Toast } from 'mint-ui';
export default {
    props: ['datas'],

    data() {
        return {
            //是否提交审核
            isCheck: false,

            //显示模块
            becomeType_1: false,
            becomeType_2: false,
            becomeType_3: false,
            becomeType_4: false,

            become_1_info_1: "",
            become_1_info_2: "",

            become_2_info_1: "0",
            become_2_info_2: "0",
            become_2_info_3: "",

            become_3_info_1: "0",
            become_3_info_2: "0",
            become_3_info_3: "",


            become_4_info_1: "",
            become_4_info_2: "",
            become_4_info_3: "",

            para_name: "",
            para_phone: "",
            para_weixin: "",
        }
    },


    activated() {


    },
    mounted() {
        //是否提交审核
        this.isCheck = false;

        //显示模块
        this.becomeType_1 = false;
        this.becomeType_2 = false;
        this.becomeType_3 = false;
        this.becomeType_4 = false;


        this.getData();

    },
    methods: {
        //获取推广 设置
        getData() {
            let that = this;
            let json = {};
            $http.get('member.member.getMemberRelationInfo', json).then(function (response) {
                console.log(response)
                if (response.result == 1) {
                    that.setView(response.data);

                } else {

                }

            }, function (response) {
                console.log(response)
            });
        },

        //设置view 显示
        setView(data) {
            if (data.status == 0) {
                this.setBecomeType(data.become);
                this.setBecomeTypeView(data.become, data);
            } else {
                //显示已申请
                this.becomeType_1 = false;
                this.becomeType_2 = false;
                this.becomeType_3 = false;
                this.becomeType_4 = false;

                this.isCheck = true;
            }

        },

        //设置类型显示
        setBecomeType(become) {
            if (become == 1) {
                this.becomeType_1 = true;
                this.becomeType_2 = false;
                this.becomeType_3 = false;
                this.becomeType_4 = false;
            } else if (become == 2) {
                this.becomeType_1 = false;
                this.becomeType_2 = true;
                this.becomeType_3 = false;
                this.becomeType_4 = false;
            } else if (become == 3) {
                this.becomeType_1 = false;
                this.becomeType_2 = false;
                this.becomeType_3 = true;
                this.becomeType_4 = false;
            } else if (become == 4) {
                this.becomeType_1 = false;
                this.becomeType_2 = false;
                this.becomeType_3 = false;
                this.becomeType_4 = true;
            } else {
                this.becomeType_1 = false;
                this.becomeType_2 = false;
                this.becomeType_3 = false;
                this.becomeType_4 = false;
            }
        },
        //设置类型显示view
        setBecomeTypeView(become, data) {
            if (become == 1) {
                this.become_1_info_1 = data.become1.parent_name;
                this.become_1_info_2 = data.become1.shop_name;
                this.para_name = data.become1.realname;
                this.para_phone = data.become1.mobile;
            } else if (become == 2) {
                this.become_2_info_1 = data.become2.total;
                this.become_2_info_2 = data.become2.cost;
                this.become_2_info_3 = data.become2.shop_name;
            } else if (become == 3) {
                this.become_3_info_1 = data.become3.total;
                this.become_3_info_2 = data.become3.cost;
                this.become_3_info_3 = data.become3.shop_name;
            } else if (become == 4) {
                this.become_4_info_1 = data.become4.goods_name;
                this.become_4_info_2 = data.become4.shop_name;
                this.become_4_info_3 = data.become4.goods_id;
            }
        },


        //状态1 点击
        become_1_click() {
            if (this.fun.isTextEmpty(this.para_name)) {
                Toast("请输入真实姓名");
                return;
            }

            if (this.fun.isTextEmpty(this.para_phone)) {
                Toast("请输入手机号");
                return;
            }


            // if (!(/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(this.para_phone))) {
            //     Toast("请输入正确的手机号");
            //     return;
            // }

            // if (this.fun.isTextEmpty(this.para_weixin)) {
            //     Toast("请输入微信号");
            //     return;
            // }


            let that = this;
            let _mid = window.localStorage.mid;
            let json = { mid: _mid, realname: this.para_name, mobile: this.para_phone };
            $http.get('member.member.addAgentApply', json).then(function (response) {
                console.log(response)
                if (response.result == 1) {
                    that.getData();//重新获取
                } else {

                }

            }, function (response) {
                console.log(response)
            });
        },
        //状态2 点击
        become_2_click() {
            console.log("become_2_click");
            this.$router.push({ name: "home", params: {} });
        },

        //状态3 点击
        become_3_click() {
            console.log("become_3_click");
            this.$router.push({ name: "home", params: {} });
        },

        //状态4 点击
        become_4_click(goods_id) {
            console.log(goods_id);
            this.$router.push({ name: 'goods', params: { id: goods_id } });
        },

        //等待审核 处理
        isCheck_click() {
            this.$router.push({ name: "home", params: {} });
        }
    }

}