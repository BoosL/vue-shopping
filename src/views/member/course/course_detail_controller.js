import { Field, Button } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Navbar } from 'mint-ui';
import { CheckBox, CheckBoxGroup } from 'vue-ydui/dist/lib.px/checkbox';
import cTitle from 'components/title';
import { Indicator, Toast } from 'mint-ui';


var submitActionTag = "";

export default {
    data() {
        return {
            //标题
            goodTit: "",
            //价格
            goodPrice: "",
            //章节数
            chapterNum: 0,
            //讲师头像
            teacherImg: "",
            //讲师姓名
            teacherName: "",
            //章节列表
            chapterList: [],
            //播放src
            vedioSrc: "",

            is_show: true,
            is_vshow: false,

            isLook: false,
            //商品价格
            goodsPrice: 0,

            //商品详情
            goodsContent: "",

            //推荐商品
            pushGoodList: [],

            active: 9999,

            is_study: false,

            is_update: false,

            is_buy: false,

            contentShow: false,

            pushShow: false,

            rewardShow: false,
            rewardMoney: "",
            actionSheetItems: [],
            //弹窗按钮控制
            actionSheetShow: false,


            rewardBtnShow:false
        }
    },

    mounted() {

    },

    methods: {
        getDetailInfo() {
            $http.get("plugin.video-demand.api.video-course-goods.get-course-goods-detail", { goods_id: this.$route.params.goods_id }).then(response => {
                console.log(response);

                if (response.result == 1) {


                    if (this.fun.isTextEmpty(response.data.has_many_course_chapter) || response.data.has_many_course_chapter.length == 0) {
                        MessageBox("提示", "课程已下架！");
                        this.$router.go(-1);
                    } else {
                        this.chapterList = response.data.has_many_course_chapter;
                    }

                    this.rewardBtnShow=response.data.is_reward==0?false:true;

                    this.goodTit = response.data.has_one_goods.title;
                    this.goodPrice = response.data.has_one_goods.price;

                    this.chapterNum = response.data.course_chapter_num;

                    this.teacherImg = response.data.has_one_lecturer.has_one_member.avatar;

                    this.teacherName = response.data.has_one_lecturer.real_name;

                    this.goodsContent = response.data.has_one_goods.content;

                    this.contentShow = this.fun.isTextEmpty(response.data.has_one_goods.content) ? false : true;

                    this.isLook = response.data.has_many_course_chapter[0].is_audition == 0 ? false : true;
                    //this.chapterId=response.data.has_many_course_chapter[0].id;

                    if (!this.fun.isTextEmpty(response.data.pushGoods)) {

                        this.pushShow = true;
                        this.pushGoodList = response.data.pushGoods;
                    }



                    switch (response.data.watch) {
                        case 0:
                            //
                            MessageBox("提示", "请升级会员或者购买课程");
                            this.is_update = true;
                            this.is_buy = true;
                            this.is_study = true;
                            break;
                        case 1:
                            //判断是否免费章节
                            if(response.data.has_many_course_chapter[0].is_audition == 1){
                                this.is_study = true;
                                this.is_update = false;
                                this.is_buy = false;
                                this.is_show =false;
                                this.is_vshow=true;
                                this.videoInit(0, response.data.has_many_course_chapter[0].video_address);
                                break;
                            }else if(response.data.has_many_course_chapter[0].is_audition == 0){
                                MessageBox("提示", "请升级会员或者购买课程");
                                this.is_update = true;
                                this.is_buy = true;
                                this.is_study = true;
                                break;
                            }else{
                                break;
                            }
                            // this.is_study = true;
                            // this.is_update = false;
                            // this.is_buy = false;
                            // this.is_show =false;
                            // this.is_vshow=true;
                            // this.videoInit(0, response.data.has_many_course_chapter[0].video_address);
                            // break;
                        case 2:
                            //
                            this.is_update = false;
                            this.is_study = false;
                            this.is_buy = false;
                            this.videoInit(0, response.data.has_many_course_chapter[0].video_address);
                            break;
                        case 3:
                            //
                            this.is_buy = false;
                            this.is_update = false;
                            this.is_study = false;
                            this.videoInit(0, response.data.has_many_course_chapter[0].video_address);
                            break;
                        default:
                            break;
                    }

                }

            }).catch(error => {
                console.log(error)
            })
        },

        //根据观看权限
        viewPermission(id, index, address,course_id,audition) {

            this.is_show = true;
            this.is_vshow = false;

            let param = {
                goods_id: this.$route.params.goods_id,
                chapter_id: id
            }
            $http.get("plugin.video-demand.api.video-course-goods.get-course-goods-detail", param).then(response => {
                console.log(response);
                if (response.result == 1) {
                    //判断观看类型
                    this.viewType(response.data.watch, index, address,course_id,id,audition);
                }
            }).catch(error => {
                console.log(error);
            });

        },


        //观看视频
        videoPlay(index, src,course_id,id) {
            this.is_show =false;
            this.is_vshow=true;
            
            this.vedioSrc = "";
            this.active = index;
            this.vedioSrc = src;
            $http.get("plugin.video-demand.api.video-demand-member.set-watch-history",{course_id:course_id,chapter_id:id}).then(response =>{
                console.log(response);
            }).catch(error =>{
                console.log(error);
            })

        },

        videoInit(index, src){
            this.is_show =false;
            this.is_vshow=true;
            
            this.vedioSrc = "";
            this.active = index;
            this.vedioSrc = src;
        },

        viewType(type, index, address,course_id,id,audition) {
            switch (type) {
                case 0:
                    //
                    MessageBox("提示", "请升级会员或者购买课程");
                    this.is_update = true;
                    this.is_buy = true;
                    this.is_study = false;
                    this.isLook = false;
                    break;
                case 1:
                    //

                    if(audition == 1){
                        this.is_study = true;
                        this.is_update = false;
                        this.is_buy = false;
                        this.isLook = true;
                        this.videoPlay(index, address,course_id,id);
                        break;
                    }else if(audition == 0){
                        MessageBox("提示", "请升级会员或者购买课程");
                        this.is_update = true;
                        this.is_buy = true;
                        this.is_study = false;
                        this.isLook = false;
                        break;
                    }else{
                        break;
                    }
                    // this.is_study = true;
                    // this.is_update = false;
                    // this.is_buy = false;
                    // this.isLook = true;
                    // this.videoPlay(index, address,course_id,id);
                    // break;
                case 2:
                    //
                    //MessageBox("提示", "请升级会员或者购买课程");
                    this.is_update = false;
                    this.is_study = false;
                    this.is_buy = false;
                    this.isLook = true;
                    this.videoPlay(index, address,course_id,id);
                    break;
                case 3:
                    //
                    //MessageBox("提示", "请升级会员或者购买课程");
                    this.is_buy = false;
                    this.is_study = false;
                    this.is_update = false;
                    this.isLook = true;
                    this.videoPlay(index, address,course_id,id);
                    
                    break;
                default:
                    break;
            }
        },

        //立即学习
        study() {
            this.is_show = false;
            this.is_vshow = true;
        },

        //升级会员
        update() {
            this.$router.push(this.fun.getUrl('CourseMemberUpdate'));
        },

        //立即购买
        buy() {
            submitActionTag = "-2";//立即购买
            let _optionsId = "";
            let _total = 1;
            let _goodsId = this.$route.params.goods_id;
            this.$router.push(this.fun.getUrl('goodsorder', { tag: submitActionTag, goodsId: _goodsId, optionsId: _optionsId, total: _total }));
            //this.$router.push(this.fun.getUrl('goods',{id: this.$route.params.goods_id}));
        },

        //打赏 显示
        showPopReward() {
            this.rewardShow = true;
        },

        //打赏 隐藏
        hidePopReward() {
            this.rewardShow = false;
        },

        //确定打赏
        confirmReward() {
            this.hidePopReward();
            if (this.fun.isTextEmpty(this.rewardMoney)) {
                Toast("请输入打赏金额");
                return;
            }

            if (this.rewardMoney <= 0) {
                Toast("打赏金额必须大于0");
                return;
            }

            this.getPayData();

            console.log(this.rewardMoney);
        },

        //获取支付类型参数
        getPayData() {
            this.actionSheetItems = [];
            $http.get('payment.pay-type', {}).then(response => {
                if (response.result == 1) {
                    let btnData = response.data.buttons;
                    if (!this.fun.isTextEmpty(btnData) && btnData.length > 0) {
                        for (let i = 0; i < btnData.length; i++) {
                            let newItem = new Object();
                            newItem.label = btnData[i].name + "支付";
                            newItem.callback = this.initPayCallBack(btnData[i]);
                            this.actionSheetItems.push(newItem);
                            this.actionSheetShow = true;
                        }
                    }
                } else {

                }
            }).catch(error => {
                console.log(error);
            });
        },

        //初始化支付回调
        initPayCallBack(item) {
            let callback = null;
            let that = this;
            switch (item.value) {
                case 1:
                    callback = that.weChatPay;
                    break;
                case 2:
                    callback = that.aliPay;
                    break;
                case 3:
                    callback = that.balancePay;
                    break;
                case 6:
                    callback = that.newWeChatPay;
                    break;
                case 12:
                    callback = that.yunPay;
                    break;
                case 7:
                    callback = that.cloudAlipay;
                    break;

                default:
                    break;
            }
            return callback;
        },

        //微信支付
        weChatPay() {
            this.payPost(1);
        },
        //支付宝支付
        aliPay() {
            this.payPost(2);

        },
        //余额支付
        balancePay() {
            this.payPost(3);
        },
        //新版微信支付
        newWeChatPay() {
            this.payPost(6);
        },
        //芸支付
        yunPay() {
            this.payPost(12);
        },

        cloudAlipay() {
            this.payPost(7);
        },

        //支付
        payPost(type) {
            let that = this;
            let json = { "pay_method": type, "amount": this.rewardMoney, "goods_id": this.$route.params.goods_id };
            $http.get('plugin.video-demand.api.lecturer-reward.run-reward-pay', json, "支付中...").then(response => {
                if (response.result == 1) {
                    switch (type) {
                        case 1://微信
                            wx.config(response.data.js);
                            that.WXPay(response.data.config);
                            break;
                        case 2://支付宝
                            that.$router.push(that.fun.getUrl('alipayCourse', { status: "9", url: response.data }));
                            break;
                        case 3://余额
                            MessageBox.alert(response.msg);
                            break;
                        case 6://新版微信 link
                            window.location.href = response.data;
                            break;
                        case 12://芸支付 微信
                            that.newWXPay(response.data.config);
                            break;
                        case 7://云收银支付宝
                            that.$router.push(that.fun.getUrl('alipayCourse', { status: "9", url: response.data }));
                            break;
                        default:
                            break;
                    }
                } else {
                    MessageBox.alert(response.msg);
                }
            }).catch(error => {
                MessageBox.alert(error);
            });
        },


        //旧版微信支付参数
        WXPay(payParams) {
            //alert(document.location.href);
            //console.log(""+payParams.timestamp);
            var that = this;
            wx.chooseWXPay({
                appId: payParams.appId,
                timestamp: payParams.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: payParams.nonceStr, // 支付签名随机串，不长于 32 位
                package: payParams.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: payParams.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: payParams.paySign, // 支付签名
                success: function (res) {
                    // 支付成功后的回调函数
                    if (res.errMsg == "chooseWXPay:ok") {
                        that.$router.go(-1);
                        MessageBox.alert('支付成功', '提示');
                        that.getCurrentPayStatus();//重新获取
                        that.getTodayPay();
                        //that.$router.push({name:'PayYes',params:{order_id:}});
                    } else {
                        MessageBox.alert('支付失败', '提示');
                    }
                },
                cancel: function (res) {
                    //支付取消
                },
                fail: function (res) {
                    MessageBox.alert('支付失败，请返回重试', '提示');
                }
            });
        },

        //新版微信支付参数
        newWXPay(payParams) {
            var that = this;
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": payParams.appId,     //公众号名称，由商户传入     
                    "timeStamp": payParams.timeStamp,         //时间戳，自1970年以来的秒数     
                    "nonceStr": payParams.nonceStr, //随机串     
                    "package": payParams.package,
                    "signType": payParams.signType,         //微信签名方式：     
                    "paySign": payParams.paySign //微信签名 
                },

                function (res) {
                    that.b = res;
                    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        MessageBox.alert('支付成功', '提示');
                        that.getCurrentPayStatus();//重新获取
                        that.getTodayPay();
                    } else {
                        MessageBox.alert('支付失败', '提示');
                    }
                }
            );
        },




        init() {
            this.is_study = false;
            this.is_update = false;
            this.is_buy = false;
            this.is_show = true;
            this.is_vshow = false;
            this.vedioSrc = "";
            this.rewardShow = false;
            this.rewardMoney = "";
            this.payData = [];
            this.actionSheetShow = false;
        }



    },
    activated() {
        this.init();
        this.getDetailInfo();
    },

    components: { cTitle, CheckBox }


}