import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';
export default {
  data() {
    return {
      id: "",
      banner: "",
      title: "",
      datas: [],

     
      pagesize: 1,
      loading: false,
      allLoaded: false,
      goload: true,
      isLoadMore: true,
      page: 1,
      total_page: 0,
    }
  },


  activated() {
    this.id = this.$route.params.id;
    this.initData();
    //获取数据
    this.getNetData();
  },
  mounted() {

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

      this.datas = [];
    },


    //更新
    loadTop() {
      this.initData();
      this.getNetData();
      this.$refs.coupon_loadmore.onTopLoaded();
    },
    // 加载更多
    loadBottom() {
      if (this.isLoadMore) {

        this.getMoreData(this.page);
        this.$refs.coupon_loadmore.onBottomLoaded();

      } else {
        console.log('没有更多数据');
      }

    },

    //获取数据
    getNetData() {
      let that = this;
      let json = { category_id: this.id , page: 1 };
      $http.get('plugin.article.api.article.get-articles', json, "").then((response) => {
        if (response.result == 1) {
          that.total_page = response.data.articles.last_page;
          that.banner = response.data.banner;
          that.title = response.data.title;
          that.datas = response.data.articles.data;
          that.fun.setWXTitle(response.data.title);
        } else {
          MessageBox.alert(response.msg);
          that.$router.go(-1);
        }

      }, function (response) {
        console.log(response)
      });
    },

    getMoreData(page) {
      var that = this;
      if (this.page == this.total_page) {

          return;

      }
      if (this.page >= this.total_page) {
        console.log("getMoreData",this.total_page);
          that.loading = true; that.allLoaded = true; return;
         
      } else {
          this.page = this.page + 1;
          let json = { category_id: this.id , page: this.page};
          $http.get('plugin.article.api.article.get-articles', json, "").then(function (response) {

              if (response.result == 1) {
                
                that.total_page = response.data.articles.last_page; 
                that.loading = false; 
                that.allLoaded = false;
         
                that.datas = that.datas.concat(response.data.articles.data);
              } else {
                  that.page = that.page - 1;
                  that.loading = true; that.allLoaded = true; that.isLoadMore = false; return;
              }
          }, function (response) {
              // error callback
          });

      }


  },


    toNoticeInfo(item) {
      this.$router.push(this.fun.getUrl('articleContent', { "id": item.id }));
    },

    toNoticeByCategory(id) {
      this.$router.push(this.fun.getUrl('noticeByCategory', { "id": id }));
    },
  },
  components: { cTitle }
}