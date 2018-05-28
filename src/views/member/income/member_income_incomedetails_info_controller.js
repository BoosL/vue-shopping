import cTitle from 'components/title';
import { Navbar } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    data() {
        return {
            toi: this.fun.getKeyByI(),
            _id: "",
            info: {},
            order: {},
            goods: {},
        };
    },


    activated() {
        this.toi = this.fun.getKeyByI();
        this._id = this.$route.params.id;

        this.info = {};
        this.order = {};
        this.goods = {};


        //获取数据
        this.getData();
    },
    mounted() {
        this.toi = this.fun.getKeyByI();

    },
    methods: {
        //获取数据
        getData() {
            let that = this;
            let json = { id: this._id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
            $http.get('finance.income.get-detail', json, "加载中...").then(function (response) {
                console.log(response)
                if (response.result == 1) {
                    that.setData(response.data);
                } else {
                    console.log(response.msg);
                }

            }, function (response) {
                console.log(response);
            });
        },


        setData(data) {
            if (data == null || data == '' || data == undefined) {
                MessageBox({
                    title: '提示',
                    message: '无详情显示',
                    showCancelButton: true
                }).then(action => {
                    if (action == 'confirm') {
                        this.$router.go(-1);
                    }else{
                        this.$router.go(-1);
                    }
                });
                return;
            }

            if (!this.fun.isTextEmpty(data.commission)) {
                this.info = data.commission;
                this.order = data.order;
                this.goods = data.goods;
                return;
            }



            if (!this.fun.isTextEmpty(data.area_dividend)) {
                this.info = data.area_dividend;
                this.order = data.order;
                this.goods = data.goods;
                return;
            }
        },

    },
    components: { cTitle }
}