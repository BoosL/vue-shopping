import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default {
    props: ['goods', 'card', 'cardType'],
    data() {
        return {
            //存放语言
            language: {},
            currentItem: "",//当前选择的规格
            itemId: "",//被选中的id
            sourceMoney: 0,//选取的金额
            phone: "",//充值反馈电话
            checkDeductionList: [],//优惠信息验证数组



            score: 600,
            scoreMoney: 6.00,
            computedMoney: 100.00,
            useScore: false,
        }
    },
    components: { cTitle },
    methods: {
        //初始化参数
        initData() {
            this.checkDeductionList = [];//优惠信息验证数组
        },
        //选择规格处理
        selectStyle(e, item) {
            this.itemId = item.itemId;
            this.currentItem = item;
            this.sourceMoney = item.inPrice;//赋值金额

        },
        initStyle() {
            var infoA = document.getElementById("oilPay").getElementsByClassName("info");
            infoA[0].className = "info active";
            infoA[0].parentNode.className = "par active";
        },


        //提交
        submit() {

            console.log(this.card);

            if (this.fun.isTextEmpty(this.card.account) || this.fun.isTextEmpty(this.card)) {
                MessageBox.alert('请选择充值卡');
                return;
            }

            if (this.fun.isTextEmpty(this.itemId) || this.fun.isTextEmpty(this.currentItem)) {
                MessageBox.alert('请选择充值面额');
                return;
            }

            // if (this.fun.isTextEmpty(this.phone)) {
            //     MessageBox.alert('请输入电话号');
            //     return;
            // }

            // if (this.fun.isMoblie(this.phone)) {
            //     MessageBox.alert('请输入正确的电话号');
            //     return;
            // }



            //组装json
            let json = {
                // 持卡 姓名 contacts
                // 持卡  机号 mobile
                // 加油卡卡号 account
                account: this.card.account,//加油卡卡号
                mobile: this.card.mobile,//mobile
                contacts: this.card.name,//mobile

                goods_id: this.currentItem.goods_id,//商品id
                api_goods_id: this.currentItem.itemId,//规格id
                price: this.currentItem.inPrice,//充值金额
                total: 1,
                option_id: "",
                orders: JSON.stringify(this.assembleDeduction())
            };

            let that = this;

            $http.get('plugin.gasoline.Frontend.Modules.Order.Controllers.goods-buy', json, "提交中...").then(function (response) {
                if (response.result == 1) {
                    //跳转确定优惠组合
                    that.$router.push(that.fun.getUrl('oilRechargePay', { para: JSON.stringify(json) }));
                } else {
                    MessageBox.alert(response.msg);
                }
            }, function (response) {
                console.log(response);
            });

        },

        //组装优惠抵扣信息
        assembleDeduction() {
            let deductions = [];

            for (let i = 0; i < this.checkDeductionList.length; i++) {
                deductions.push(this.checkDeductionList[i]);
            }

            return deductions;
        },

    },
    mounted() {
        this.initStyle();
    },

    //实时监测this.$store.state.service.chinese的变化，获取最新的语言包
    computed: {
        getLangState() {
            return this.$store.state.service.languageService;
        }
    },
    watch: {
        getLangState(val) {
            if (val) {
                this.language = JSON.parse(sessionStorage.languageService).oilPay;
            } else {
                this.language = this.$store.state.service.languageService.oilPay;
            }
        },
        useScore: function (val) {
            if (val) {
                this.computedMoney = this.sourceMoney - this.scoreMoney;
            } else {
                this.computedMoney = this.sourceMoney;
            }
        },
    },

    mounted() {
        if (sessionStorage.languageService) {
            this.language = JSON.parse(sessionStorage.languageService).oilPay;
        } else {
            this.language = this.$store.state.service.languageService.oilPay;
        }
    },

    activated() {
        this.$store.commit('onload');
        this.initData();//初始化数据
    },
}
