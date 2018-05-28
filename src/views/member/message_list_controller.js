import cTitle from 'components/title';
import { Navbar } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    data() {
        return {
            toi: this.fun.getKeyByI(),
            _id: "",
            info: [],
        };
    },


    activated() {
        this.toi = this.fun.getKeyByI();
        this._id = this.$route.params.id;

        this.info = [];

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
            //let json = { id: this._id, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
            $http.get('plugin.app-set.frontend.message-list.index', {}, "加载中...").then(function (response) {
                console.log(response)
                if (response.result == 1) {
                  that.info = response.data.list;
                  console.log('infoList', that.info);
                    //that.setData(response.data);
                } else {
                    console.log(response.msg);
                }

            }, function (response) {
                console.log(response);
            });
        },
      //返回
      goto() {
        window.history.go(-1);
      },



    },
    components: { cTitle }
}