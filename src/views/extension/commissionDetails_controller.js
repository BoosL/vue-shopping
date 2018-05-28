import cTitle from 'components/title';
export default {


  data() {
    return {

    }
  },

  activated() {
    this.getData();//获取数据
  },

  methods: {
    //获取数据
    //获取数据 预计佣金
    getData() {
      let that = this;
      let json = { type: 1 };
      $http.get('plugin.commission.api.commission.get-commission-list', json, "加载中...").then(function (response) {
        console.log(response)
        if (response.result == 1) {
          
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