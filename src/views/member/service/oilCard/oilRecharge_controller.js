import oilCheck from "./components/oilCheck";
import oilPay from "./components/oilPay";
import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';

export default {
    components: { oilCheck, oilPay, cTitle },
    data() {
        return {
            titleLanguage: {},//title语言
            tag: "",//标记 0中石油 1中石化

            //存放语言
            language: {},
            title: "",
            cards: [],//卡集合
            current_card: {//当前选择的卡
                account: "",
            },

            current_card_state: "",//当前卡状态

            isActive: true,
            modal: false,
            isAdd: false,

            goodItems: [],//商品信息

        }
    },
    methods: {
        //跳转到添加油卡
        goToAddCard() {
            this.$router.push(this.fun.getUrl('addCard', { tag: this.tag }));
            this.disModal();
        },

        //展示卡集合
        popAddCard() {
            this.modal = !this.modal;

            if (this.modal) {
                this.isAdd = false;//关闭删除按钮状态恢复
                this.getCardList();
            }
        },

        //获取充值卡
        getCardList() {
            //组装json
            let json = {
                operator: this.tag == 0 ? "cnpc" : "sinopec",//供应商 中石化sinopec,中石油cnpc //0中石油 1中石化
            };

            let that = this;

            $http.get('plugin.gasoline.api.goods.getGasolineCard', json, "获取中...").then(function (response) {
                if (response.result == 1) {
                    that.cards = [];//清空数据
                    that.cards = response.data;
                } else {
                    MessageBox.alert(response.msg);
                }
            }, function (response) {
                console.log(response);
            });
        },

        //选择卡
        selectCard(card) {
            //避免删除和选择冲突
            if (!this.isAdd) {
                this.current_card = card;
                this.disModal();
                this.getCurrentCardInfo(this.current_card);//获取当前卡信息
            }
        },

        //获取当前卡信息
        getCurrentCardInfo(card) {
            //组装json
            let json = {
                operator: card.operator,
                province: card.province,
                gasCardNo: card.account,
            };

            let that = this;

            $http.get('plugin.gasoline.api.goods.getAccountInfo', json, "获取中...").then(function (response) {
                if (response.result == 1) {
                    that.current_card_state = response.data.cardState;
                    that.getGoodsByCardInfo(card);
                } else {
                    MessageBox.alert(response.msg);
                }
            }, function (response) {
                console.log(response);
            });
        },

        //通过卡获取商品信息
        getGoodsByCardInfo(card) {
            //组装json
            let json = {
                //tag 0中石油 1中石化  category 1-中石化；2-中石油
                category: this.tag == 0 ? "2" : "1",
            };

            let that = this;
            $http.get('plugin.gasoline.api.goods.gasCard', json, "获取中...").then(function (response) {
                if (response.result == 1) {
                    that.goodItems = response.data;
                } else {
                    MessageBox.alert(response.msg);
                }
            }, function (response) {
                console.log(response);
            });
        },

        //删除卡
        deleteCard(index, card) {
            //组装json
            let json = {
                id: card.id
            };

            let that = this;

            $http.get('plugin.gasoline.api.goods.delGasolineCard', json, "删除中...").then(function (response) {
                if (response.result == 1) {
                    that.cards.splice(index, 1);
                    that.deleteCardByCurrentCard(card);
                } else {
                    MessageBox.alert(response.msg);
                }
            }, function (response) {
                console.log(response);
            });
        },

        //处理删除 若是删除当前卡的处理
        deleteCardByCurrentCard(card) {
            if (card.id == this.current_card.id) {
                //相同处理当前页面显示
                //当前选择的卡
                this.current_card = { account: "" };
                this.current_card_state = "";//当前卡状态
                this.goodItems=[];//清空当前的选择数组
            }
        },

        changeActive(b) {
            this.isActive = b;
        },

        changeStyle() {
            this.isAdd = !this.isAdd;
        },
        disModal() {
            this.modal = false;
        },

        //获取新添加油卡
        getCard() {
            let card = this.$route.params;
            let obj = { cardCode: card.cardCode, exer: "20" };
            this.cards.push(obj);
        },

        //初始化数据
        initData() {
            this.cards = [];//卡集合
            this.current_card = {//当前选择的卡
            };
            this.current_card.account="";

            this.current_card_state = "";//当前卡状态

            this.isActive = true;
            this.modal = false;
            this.isAdd = false;

            this.goodItems = [];//商品信息
        }
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
                this.language = JSON.parse(sessionStorage.languageService).oilRecharge;
            } else {
                this.language = this.$store.state.service.languageService.oilRecharge;
            }
        }
    },

    mounted() {

        if (sessionStorage.languageService) {
            this.language = JSON.parse(sessionStorage.languageService).oilRecharge;
        } else {
            this.language = this.$store.state.service.languageService.oilRecharge;
        }
    },

    activated() {
        this.$store.commit('onload');
        this.titleLanguage = this.$store.state.service.languageService.cardServer;
        this.tag = this.$route.params.tag;
        //0中石油 1中石化
        this.title = this.$route.params.tag == 0 ? this.titleLanguage.petroleum : this.titleLanguage.sinopec;
        this.initData();
    },


}
