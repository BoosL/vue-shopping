import { mapState, mapMutations } from "vuex";
import cStoreList from "components/storeList";
import { Indicator, Toast } from 'mint-ui';
import cTitle from 'components/title';
export default {
  data() {
    return {
      title: "搜索",
      inputs: "",
      amout: false,
      loading: false,
      allLoaded: true,
      goload: false,
      stores: [],
      order_by: "",
      order_field: "",
      id: ""
    };
  },
  activated() {
    console.log("point");
    this.id = this.$route.params.id;
    this.getStoresByCategoryId();
  },

  mounted() {
    //this.slider();
  },
  methods: {
    // 加载更多
    loadBottom() {
      console.log("加载更多启动");
      this.gotoSearch(n);
      this.$refs.loadmore.onBottomLoaded();
    },
    goback() {
      this.$router.go(-1);
    },
    getStoresByCategoryId() {
      Indicator.open("定位中");

      var that = this;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            console.log("您的位置：", r);
            that.point = r.point;
            that.getStoresByCategoryIdLngAndLat(r);
          } else {
            Toast("没有请求到位置信息");
          }
        },
        { enableHighAccuracy: true }
      );

    },

    getStoresByCategoryIdLngAndLat(r) {
      var that = this;
      let json = {
        category_id: this.id,
        lng: r.point.lng,
        lat: r.point.lat,
        city_name: r.address.city,
      };
      $http.get("plugin.store-cashier.frontend.store.store.get-store-list-by-category-id", json, "").then(response => {
        if (response.result == 1) {
          console.log("store", response);
          that.stores = response.data.store_list;
        } else {
          that.stores = [];
          Toast(response.msg);
        }
      });
    },
  },

  components: { cStoreList, cTitle }
};
