import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default
  {
    data() {
      return {
        balance: 0,
        //数据列表
        listData: [],
        love_name: "",//爱心值自定义名称
        usable: 0, // 登陆会员可用爱心值    


        loading: false,
        allLoaded: false,
        goload: true,
        isLoadMore: true,
        page: 1,
        total_page: 0,
      }
    },
    methods:
    {


      initData() {

        this.page = 1;
        this.total_page = 0;
        this.goload = true;
        this.loading = true;
        this.allLoaded = false;
        this.isLoadMore = true;

        this.listData = [];

      },

      //更新
      loadTop() {
        this.initData();
        this.getNetData();
        this.$refs.coupon_loadmore.onTopLoaded();
      },
      // 加载更多
      loadBottom() {
        //console.log('jfc',"loadBottom");
        //	this.allLoaded = true;// 若数据已全部获取完毕,不在显示加载更多组件

        if (this.isLoadMore) {

          this.getMoreData(this.page);
          this.$refs.coupon_loadmore.onBottomLoaded();

        } else {
          console.log('没有更多数据');
        }



      },


      getUsable() {
        $http.get('plugin.love.Frontend.Controllers.page.index', {}, "加载中...").then((response) => {

          if (response.result == 1) {
            this.usable = response.data.usable;
            this.love_name = response.data.love_name;
            this.fun.setWXTitle(this.love_name+"激活记录");
          } else {
            MessageBox.alert(response.msg);
          }

        }, function (response) {
          MessageBox.alert(response);
        });

      },
      goDetailed(n) {
        this.$router.push(this.fun.getUrl('love_activation', { id: n }));
      },
      getNetData() {

        var that = this;
        $http.get('plugin.love.Frontend.Modules.Love.Controllers.activation-records.index', { page: this.page }, "加载中...").then((response) => {

          if (response.result == 1) {
            this.listData = response.data.data;

          } else {
            MessageBox.alert(response.msg);
          }

        }, function (response) {
          MessageBox.alert(response);
        });

      },


      getMoreData(page) {
        var that = this;
        if (this.page == this.total_page) {

          return;

        }
        if (this.page >= this.total_page) {
          that.loading = true; that.allLoaded = true; return;

        } else {
          this.page = this.page + 1;
          $http.get('plugin.love.Frontend.Modules.Love.Controllers.activation-records.index', { page: this.page }, '正在获取更多订单...').then(function (response) {

            if (response.result == 1) {
              var myData = response.data;
              that.loading = false; that.allLoaded = false;
              that.listData = that.listData.concat(myData.data);//数组拼接
            } else {
              that.page = that.page - 1;
              that.loading = true; that.allLoaded = true; that.isLoadMore = false; return;
            }
          }, function (response) {
            // error callback
          });

        }


      },

    },
    activated() {
      this.initData();
      this.getUsable();
      this.getNetData();
    },
    components: { cTitle }
  }