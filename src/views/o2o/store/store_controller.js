import { mapState } from 'vuex';
import cTitle from 'components/title';
import cMent from 'components/o2oment';
import cStoreList from 'components/storeList';


export default {
    data() {
        return {
            toi: this.fun.getKeyByI(),
            follow_mode: {},
            isfollow: false,
            store_id:'',
            store:{
              comment:{
                average_score: 0,
                comment_total: 0,
                new_comment: null,
              },
              goods_total: 0,
              order_count: 0,
              business_hours: "9:00-22:00",
              store_address: "",
              store_mobile: ""
            },
            category:[],
            goodsList:[],
            goodsCount:0,
            currentCategory:'',
            toolbar:false,
            showGoods:true,
            showStoreInfo:false,
            showCart:false,
            hasCart:false,
            carts:[],
            cartsTotal:0.00,
            cartsNum:0,
            goodsCarts:[],  //购物车转为goods key的数组
        }
    },
    //computed: mapState(['mailInfo']),

    created() {

    },
    activated() {
      this.category=[];
      this.goodsList=[];
      this.currentCategory='';
      this.goodsCount=0;
        //this.ofTempD();
        this.guideFollow();
        this.fun.setWXTitle(this.$store.state.temp.item.janst);
        this.store_id = this.$route.params.store_id;
        console.log('store_id', this.store_id);
        this.init();
        this.getCategory();
        this.cartsNum = 0;
        this.cartsTotal = 0;
        this.showCart = false;
        this.goodsCarts = [];
      
    },

    methods: {
      showStore() {
        if (this.showStoreInfo) {
          this.showStoreInfo = false;
          this.showGoods = true;
        } else {
          this.showStoreInfo = true;
          this.showGoods = false;
        }
      },
      goBuy() {
        console.log('goBuy');
        this.$router.push(this.fun.getUrl('cashier_pay',{ store_id: this.store_id}));
      },
      showGoodsInfo() {
        if (this.showGoods) {
          this.showStoreInfo = true;
          this.showGoods = false;
        } else {
          this.showStoreInfo = false;
          this.showGoods = true;
        }
      },
        init() {
          var that = this;
          $http.get('plugin.store-cashier.frontend.store.get-store-info.get-info-by-store-id', {store_id: this.store_id}).then((response) => {
            if (response.result == 1) {
              that.store = response.data;
              that.getCart();
              console.log('store', that.store);
            } else {

            }
          }), (response) => {
            //alert('网络错误，请稍后再试！')
          }
        },

        getCategory() {
          var that = this;
          console.log('init category');
          $http.get('plugin.store-cashier.frontend.store.goods-category.get-category-by-store-id', {store_id: this.store_id}).then((response) => {
            if (response.result == 1) {
              that.category = response.data;
              if (that.category.length >0) {
                that.category[0].active = true;
                if (that.category[0].childrens.length > 0) {
                  that.category[0].childrens[0].active = true;
                  that.currentCategory = that.category[0].childrens[0].name;
                  that.getGoodsList(that.category[0].childrens[0].id);
                }
              }

              console.log('category', that.category);
            } else {
              
            }
          }), (response) => {
            //alert('网络错误，请稍后再试！')
          }
        },

      /**
       * 当前一级分类
       * @param items
       */
      selectCategory(items) {
        this.category.forEach(i=>{
          this.$set(i, 'active', false);
        });
        this.$set(items, 'active', true);
        if (items.childrens.length > 0) {
          items.childrens.forEach(i=>{
            this.$set(i, 'active', false);
          });
          this.$set(items.childrens[0], 'active', true);
          this.currentCategory = items.childrens[0].name;

          this.getGoodsList(items.childrens[0].id);
        }
      },

      /**
       * 上一级分类/二级分类
       * @param items
       * @param item
       */
      selectChildCategory(items, item) {
        items.forEach(i=>{
          this.$set(i, 'active', false);
        });
        this.$set(item, 'active', true);
        this.currentCategory = item.name;
        this.getGoodsList(item.id);
      },

      /**
       * 二级分类id
       * @param category_id
       */
      getGoodsList(category_id) {
        var that = this;
        console.log('init goodsList');
        $http.get('plugin.store-cashier.frontend.store.goods.get-goods-by-category-id-and-store-id', {store_id: this.store_id, category_id:category_id}).then((response) => {
          console.log('result', response);
          if (response.result == 1) {
            that.goodsList = response.data;
            that.goodsCount = that.goodsList.length;
            console.log('goodsList', that.goodsList);
          } else {
            
          }
        }), (response) => {
          //alert('网络错误，请稍后再试！')
        }
      },

      addCart(goods) {
        console.log('addcart...');
        $http.get('plugin.store-cashier.frontend.shoppingCart.member-cart.store', {goods_id: goods.id, total:1, store_id:this.store_id}).then((response) => {
          console.log('result', response);
          if (response.result == 1) {
            //goods.buyNum += 1;
            console.log('response.result', response.result);
            this.getCart(goods);

          } else {
            alert('无商品');
          }
        }), (response) => {
          //alert('网络错误，请稍后再试！')
        }
      },

        /**
         *
          * @param id   购物车id
         * @param num
         */
      updateCart(id, num) {
        console.log('reduceCart...');
        console.log('cart...', this.carts);
        console.log('cart id...', id);
        if (num < 0) {
            var total = 0;
            this.carts.forEach(item => {
                if (item.id == id) {
                    total = item.total;
                }
            });

            if (total + num <= 0) {
                this.delItemByCart(id);
                return;
            }
        }
        $http.get('plugin.store-cashier.frontend.shoppingCart.member-cart.updateNum', {id: id, num:num, store_id:this.store_id}).then((response) => {
          console.log('result', response);
          if (response.result == 1) {
            console.log('response.result', response.result);
            this.getCart();

          } else {
            alert('无商品');
          }
        }), (response) => {
            //alert('网络错误，请稍后再试！')
        }
      },

        delItemByCart(cart_id) {
            var that = this;

            $http.get('plugin.store-cashier.frontend.shoppingCart.member-cart.destroy', {store_id:this.store_id, ids:cart_id}).then((response) => {
                if (response.result == 1) {
                    that.getCart();
                    that.showCart = false;
                } else {
                    alert('无商品');
                }
            }), (response) => {
                //alert('网络错误，请稍后再试！')
            }
        },

      clearCart() {
        var that = this;
        console.log('clearCart...');
        var destroyCarts = [];
        this.carts.forEach(item => {
          destroyCarts.push(item.id);
        });


        $http.get('plugin.store-cashier.frontend.shoppingCart.member-cart.destroy', {store_id:this.store_id, ids:destroyCarts}).then((response) => {
          if (response.result == 1) {
            that.getCart();
            that.showCart = false;
          } else {
            alert('无商品');
          }
        }), (response) => {
          //alert('网络错误，请稍后再试！')
        }
      },

      goodsOrder() {
        this.$router.push(this.fun.getUrl('goodsorder',{ store_id: this.store_id, tag: 'store'}));
      },

      /**
       * 如果传了商品，通过商品id获取购物车数量
       * @param goods
       */
      getCart(goods) {
        var that = this;
        console.log('getCart...');
        console.log('goods...', goods);
        that.cartsNum = 0;
        that.cartsTotal = 0;
        $http.get('plugin.store-cashier.frontend.shoppingCart.member-cart.index', {store_id:this.store_id}).then((response) => {
          if (response.result == 1) {
            that.carts = response.data;
            that.goodsCarts = [];
            that.carts.forEach(item => {
              this.$set(that.goodsCarts, item.goods_id, item);
              if (goods && (goods.id == item.goods_id)) {
                goods.buyNum = item.total;
              }
              that.cartsNum += item.total;
              that.cartsTotal += (item.total * item.goods.price);
            });

          that.cartsTotal = parseFloat(that.cartsTotal).toFixed(2);
          console.log('cart.result', response.data);
          console.log('goodsCarts...', that.goodsCarts);

          } else {
              //Toast("请输入提货人信息");
              //return;
          }
        }), (response) => {
          //alert('网络错误，请稍后再试！')
        }
      },

      goShowCart() {
        if (!this.showCart && this.cartsNum > 0) {
          this.showCart = true;
        } else {
          this.showCart = false;
        }
      },

      showToolbar() {
        if (this.toolbar) {
          this.toolbar = false;
        } else {
          this.toolbar = true;
        }
      },

      tel() {
        window.location.href = 'tel://' + this.store.store_mobile;
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
            this.$router.push(this.fun.getUrl('search'));
            //this.$router.push('/search');
        },
        slider() {
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            if (top < 50) { this.amout = false; } else { this.amout = true; }
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


        //全选
        lg(){
          console.log("lg");
        },

        //选中 取消
        checkCart(id){
          console.log(id);
        },


        goToGoodsO2O(goods){
          this.$router.push(this.fun.getUrl('goodsO2O', { id: goods.goods_id ,"tag":"o2o",store_id: this.store_id}));
        }



    },

    components: { cTitle, cMent, cStoreList},
    computed: {
      // a computed getter
      minicartStyle: function () {
        if (this.showCart) {
          return 'display: block;transform: translateY(-100%)';
        }
      },
      showLogo: function () {
        if (this.showCart) {
          return 'show';
        }
      },
      leftPrice() {
        if (this.showCart) {
          return 'transform: translateX(-60px);';
        }
      }
    },
    compiled() {

        this.datate();
    }
}
