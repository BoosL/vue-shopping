import cTitle from 'components/title';

const status_type_0 = "";
const status_type_1 = "0";
const status_type_2 = "1";
const status_type_3 = "3";
export default {
  data() {
    return {
      mailLanguage:"",
      mailTitle:"",

      toi: this.fun.getKeyByI(),
      selected: '0',
      display: "-1",

      statusData0: [],
      statusData1: [],
      statusData2: [],
      statusData3: [],

      open_order_buyer:"",
      open_order_detail:"",
    }
  },

  activated() {
    this.toi = this.fun.getKeyByI();
    this.selected = this.$route.params.selected;

    this.swichTabData();//获取数据

    this.initMailLanguage();
  },

  mounted() {
    this.toi = this.fun.getKeyByI();
  },

  methods: {

    initMailLanguage(){
      this.mailLanguage =this.fun.initMailLanguage();
      this.mailTitle=this.fun.setMailLanguage("分销订单",this.mailLanguage.commission.commission_order);
      this.fun.setWXTitle(this.fun.setMailLanguage("分销订单",this.mailLanguage.commission.commission_order));
      
    },

    //切换响应事件
    swichTabTItem() {
      console.log(this.selected);
      this.swichTabData();
    },

    //切换响应获取数据
    swichTabData() {
      //点击初始化
      this.display = "-1";
      if (this.selected == 0) {
        this.getData(status_type_0);
      } else if (this.selected == 1) {
        this.getData(status_type_1);
      } else if (this.selected == 2) {
        this.getData(status_type_2);
      } else if (this.selected == 3) {
        this.getData(status_type_3);
      }
    },


    //获取数据
    getData(_status) {
      let that = this;
      let json = { status: _status,"i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
      $http.get('plugin.commission.api.commission.get-commission-orders', json, "加载中...").then(function (response) {
        console.log(response)
        if (response.result == 1) {
          if (_status == status_type_0) {
            that.statusData0 = response.data.orders.data;
          } else if (_status == status_type_1) {
            that.statusData1 = response.data.orders.data;
          } else if (_status == status_type_2) {
            that.statusData2 = response.data.orders.data;
          } else if (_status == status_type_3) {
            that.statusData3 = response.data.orders.data;
          }

          that.open_order_buyer=response.data.set.open_order_buyer;
          that.open_order_detail=response.data.set.open_order_detail;

        } else {
          console.log(response.msg);
        }

      }, function (response) {
        console.log(response);
      });
    },


    //显示详情
    toggle(event, n) {
      if (this.display == n) {
        this.display = "-1";
        return;
      }
      console.log(event.target.className)
      this.display = n;
    }
  },
  components: { cTitle }
}