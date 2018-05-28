import { mapState } from 'vuex';
import cTitle from 'components/title';
import cMent from 'components/o2oment';
import cStoreList from 'components/storeList';
//import { Swipe, SwipeItem } from 'mint-ui';
import banner from 'components/temp/banner';
import showbanner from 'components/temp/banner';
import showmenu from 'components/temp/menu';
import showtitle from 'components/temp/title';
import showsearch from 'components/temp/search';
import showline from 'components/temp/line';
import showblank from 'components/temp/blank';
import showrichtext from 'components/temp/richtext';
import showpicture from 'components/temp/picture';
import showcube from 'components/temp/cube';
import showarea from 'components/temp/area';
import showshop from 'components/temp/shop';
import showgoods from 'components/temp/goods';
import shownotice from 'components/temp/notice';

import cMyswipe from 'components/myswipe';
import { Swipe, SwipeItem } from 'components/meswipe';
import BMap from 'BMap';
import { Indicator, Toast } from 'mint-ui';


var items = [{
    "id": "M1491471961972",
    "temp": "showsearch",
    "params": {
        "placeholder": "", "style": "style2", "color": "#000",
        "bgcolor": "#FFF", "bordercolor": "#fa1f24", "searchurl": "", "uniacid": "6"
    }
    , "data": "", "other": "", "content": ""
}]

export default {
    data() {
        return {
            toi: this.fun.getKeyByI(),
            amout: false, index2: 1,
            category: [],
            goodsListData: [],
            ads: [],
            banner: banner,
            bannername: 'banner',
            bannerData: [],
            "other": "",
            "content": "",
            show: true,
            tempData: items,
            oftemp: false,
            dftempData: false,
            follow_mode: {},
            isfollow: false,
            pageinfo: '',
            address:'',
            point:{},
            stores:[],
            city:'',
            carousels:[],
        }
    },
    //computed: mapState(['mailInfo']),

    mounted() {
        console.log('mounted');

        window.addEventListener('scroll', this.slider);
      this.ready();
    },
    created() {
        console.log('created');
        this.loadMap();
    },
    activated() {
        console.log('activated');
        //this.ofTempD();
        //this.guideFollow();
        //this.fun.setWXTitle(this.$store.state.temp.item.janst);
        this.ready();
        this.indexData();
    },
    methods: {
      loadMap: function () {
        // setTimeout(this.ready, 0)
      },
      ready: function () {
        this.getLocation();

        // var myLocation = window.localStorage.getItem('myLocation');

        // if (myLocation) {
        //   myLocation = JSON.parse(myLocation);
        //   this.address = myLocation.title;
        //   this.city = myLocation.city;
        //   this.point = myLocation.point;
        //   console.log('myLocation:', myLocation);

        //   //初始化数据
        //   this.getStores();
        //   //this.getStoresCategory();
        // } else{
        //     console.log('location不存在');
        //   this.getLocation();
        // }
      },

      getLocation: function () {
        var that = this;

        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var mk = new BMap.Marker(r.point);
            console.log('您的位置ok：', r);
            that.address = r.address.city;
            that.city = r.address.city;

            that.point = r.point;
              var pos = {
                  address:that.address,
                  city:that.city,
                  title:that.address,
                  point:that.point,
              }
              window.localStorage.setItem("myLocation",JSON.stringify(pos));
            that.getStores();
          }
          else {
            //todo, 获取收货地址
            that.getMyAddress();
          }
        },{enableHighAccuracy: true})
      },

      getMyAddress () {
        if (0) {
          //todo, 失败则跳转
          this.$router.push(this.fun.getUrl('o2oLocation'));
        }
      },

      getStores() {
        var that = this;
        that.getStoresCategory();
        $http.get('plugin.store-cashier.frontend.store.store.get-store-list', {kwd:'', lng:this.point.lng,lat:this.point.lat,city_name:this.city}).then((response) => {
            if (response.result == 1) {
              console.log('stores:', response.data);
              that.stores = response.data.store_list;
            } else {
              console.log(response.msg)
            }
        }), (response) => {
          //alert('网络错误，请稍后再试！')
        }
      },

      getStoresCategory() {
          var that = this;
        $http.get('plugin.store-cashier.frontend.store.store-category.get-list').then((response) => {
          if (response.result == 1) {
              that.category = response.data;
              console.log('category', response);
        } else {
        }
      }), (response) => {
          //alert('网络错误，请稍后再试！')
        }
      },

        //关注方法
        guideFollow() {
            $http.get('member.member.guideFollow').then((response) => {
                if (response.result == 1) {
                    this.isfollow = true;
                    this.follow_mode = response.data;
                } else {
                    this.follow_mode = false;
                    console.log(response.msg)
                }
            }), (response) => {
                //alert('网络错误，请稍后再试！')
            }
        },

        tosearch() {
            console.log(this.point);
            this.$router.push(this.fun.getUrl('o2oSearch', {'city':this.city, 'point':JSON.stringify(this.point)}));
            //this.$router.push('/search');
        },

        tolocation() {
            this.$router.push(this.fun.getUrl('o2oLocation'));
        },

        slider() {
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            if (top < 50) { this.amout = false; } else { this.amout = true; }
        },
        //默认首页数据
        indexData() {
            let that = this;
            $http.get('plugin.store-cashier.frontend.store.get-default.get-index-data').then(function (response) {
                //alert(response.data)
                if (response.result == 1) {
                    console.log('index::::', response);
                    that.bannerData = response.data.banner;
                    that.carousels = response.data.carousels;
                    that.ads = response.data.advs;
                    console.log('ads:', that.ads);
                } else {
                    console.log(response.msg);
                }

            }, function (response) {
                // error callback
                console.log(response);
            });
        },

        // //获取商城信息
        getMailInfo() {
            let that = this;

            $http.get('setting.get').then(function (response) {
                console.log(response);
                if (response.result == 1) {
                    that.fun.setWXTitle(response.data.name);
                } else {

                }

            }, function (response) {
                // error callback
            });
        },
        //获取地址信息
        getAddressInfo() {
            var that = this;
            if (this.$store.state.city.length == 0 || this.$store.state.province.length == 0 || this.$store.state.district.length == 0) {
                //saveAddresssInfo

                $http.get('member.member-address.address').then(function (response) {

                    if (response.result == 1) {
                        //console.log(JSON.stringify(response.data.city));
                        that.$store.commit('saveAddresssInfo', { city: response.data.city, province: response.data.province, district: response.data.district });
                    }
                }, function (response) {
                    // error callback
                })

            }
        },
        //查看用户是否需要绑定手机号
        bindMobile() {

            //route=setting.get
            $http.get('setting.get').then((response) => {
                if (response.result == 1) {
                    if (response.data.is_bind_mobile == 1) {
                        //跳转绑定手机页面
                        //this.$router.push({ name: "editmobile", params: { num:'', myparent: this }, query: { i: this.toi } });
                        this.$router.push(this.fun.getUrl('editmobile', { num: '', myparent: this }));
                    }

                } else {

                }

            }, (response) => {
                // error callback
                console.log(response);
                this.oftemp = false; this.dftempData = true;
            });
        },

        //banner点击
        bannerClick(item) {
          console.log('bannerClick', item);
            if (!this.fun.isTextEmpty(item.link)) {
                window.location.href = item.link;//跳转
            }
        },

    },



    components: { cTitle, cMent, cStoreList, banner, showbanner, showmenu, showtitle, showsearch, showline, showblank, showrichtext, showpicture, showcube, showarea, showshop, showgoods, shownotice, cMyswipe, Swipe, SwipeItem },

    compiled() {

        this.datate();
    }
}
