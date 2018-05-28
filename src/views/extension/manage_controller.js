import cTitle from 'components/title';
export default {

  data() {
    return {
      toi: this.fun.getKeyByI(),
      datas: []
    }
  },

  activated() {
    this.toi = this.fun.getKeyByI();
    this.datas = [];
    this.getData();//获取数据
  },

  mounted() {
    this.toi = this.fun.getKeyByI();
  },

  methods: {
    //获取数据 管理奖
    getData() {
      let that = this;
      let json = {"i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
      $http.get('plugin.commission.api.commission.get-manage', json, "加载中...").then(function (response) {
        console.log(response)
        if (response.result == 1) {
          that.datas = response.data;
        } else {
          console.log(response.msg);
        }

      }, function (response) {
        console.log(response);
      });
    },
  },
  components: { cTitle }
}