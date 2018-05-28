import { Loadmore } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
var specsManage = [];//选择池 用于排序
var optionsId = "";//选择后的 规格ID
var optionsMaxCount = 1;

const SUBMIT_ACTION_CART = "-1";//添加到购物车
const SUBMIT_ACTION_BUY = "-2";//立即购买
var submitActionTag = "";

var goods_id = "";

var mid = "-1";


//wx.config(response.data.js); 微信认证
export default {
  data() {
    return {
      title: '商品详情',
      hoet: false,
      popupSpecs: false,
      radio: '',
      goodsInfo: {},
      popThumb: "",
      popStock: 0,
      popPrice: 0,
      goodsDescription: "",
      goodsCount: 1,
      favorite: false,
      isGoods: false,
    }
  },

  activated() {

    if (!this.fun.isTextEmpty(this.$route.params.mid)) {
      mid = this.$route.params.mid;
    }

    //初始化一下参数
    this.goodsInfo = {};
    this.goodsCount = 1;
    this.popupSpecs = false;

    submitActionTag = "";
    optionsId = "";
    specsManage = [];
    optionsMaxCount = 1;



    goods_id = this.$route.params.id;
    this.getData();//获取数据
    this.isFavorite();//获取是否收藏
    this.footSet(goods_id);//设置足迹数据

  },

  mounted() {

    this.slider();

  },
  methods: {
    slider() {
      let that = this;
      window.onscroll = function () {
        var top = document.documentElement.scrollTop || document.body.scrollTop;
        if (top < 40) {
          that.hoet = false;
        } else {
          that.hoet = true;
        }
      }
    },

    handleChange() { },

    goto() {
      console.log("mid", mid);
      if (mid == "-1") {
        this.$router.go(-1);
      } else {
        this.$router.push({ name: 'home', params: {} });
      }

    },

    handleTopChange(status) {
      this.topStatus = status;
    },

    //更新
    loadTop() {
      this.$refs.loadmore.onTopLoaded();
    },

    // 加载更多
    loadBottom() {
      this.$refs.loadmore.onBottomLoaded();
      this.$router.push({ name: 'goodstab', params: { id: this.$route.params.id, goods: this.goodsInfo } });
      //this.$router.push('/goods/goodstabs/' + this.$route.params.id);
    },

    //获取数据
    getData() {
      let that = this;
      $http.get('goods.goods.get-goods', { id: goods_id }, "加载中...").then(function (response) {
        console.log(response)
        if (response.result == 1) {
          that.goodsInfo = response.data;
          that.initPopView();//初始化弹窗view
          that.initShare();//初始化分享设置
          that.isGoods = true;
        } else {
          console.log(response.msg);
          that.isGoods = false;
        }

      }, function (response) {
        console.log(response);
        that.isGoods = false;
      });

      // this.goodsInfo = {
      //   "id": 2,
      //   "uniacid": 6,
      //   "brand_id": 1,
      //   "type": 1,
      //   "status": 0,
      //   "display_order": 0,
      //   "title": "sdfsdfsdfvvvvv",
      //   "thumb": "//gw.alicdn.com/imgextra/i2/1596107585/TB2IBpitXXXXXa8XXXXXXXXXXXX_!!1596107585.jpg_760x760q50s150.jpg",
      //   "thumb_url": [
      //     "//gw.alicdn.com/imgextra/i2/1596107585/TB2IBpitXXXXXa8XXXXXXXXXXXX_!!1596107585.jpg_760x760q50s150.jpg",
      //     "//gw.alicdn.com/imgextra/i1/1596107585/TB2WgBJXWnyQeBjSsplXXaLWVXa_!!1596107585.jpg_760x760q50s150.jpg"
      //   ],
      //   "sku": "个",
      //   "description": "",
      //   "content": null,
      //   "goods_sn": "",
      //   "product_sn": "234234234",
      //   "market_price": 32,
      //   "price": 12,
      //   "stock": 222,
      //   "show_sales": 0,
      //   "weight": "0.00",
      //   "has_option": 1,
      //   "is_new": 1,
      //   "is_hot": 0,
      //   "is_discount": 0,
      //   "is_recommand": 0,
      //   "is_comment": 0,
      //   "": null,
      //   "has_many_params": [
      //     {
      //       "goods_id": 2,
      //       "title": "11",
      //       "value": "222"
      //     },
      //     {
      //       "goods_id": 2,
      //       "title": "333",
      //       "value": "333"
      //     }
      //   ],
      //   "has_many_specs": [
      //     {
      //       "id": 111,
      //       "goods_id": 2,
      //       "title": "颜色",
      //       "description": null,
      //       "specitem": [
      //         {
      //           "id": 223,
      //           "title": "白色",
      //           "specid": 111,
      //           "c": false,
      //           "thumb": ""
      //         },
      //         {
      //           "id": 224,
      //           "title": "黑色",
      //           "specid": 111,
      //           "c": false,
      //           "thumb": ""
      //         }
      //       ]
      //     },
      //     {
      //       "id": 112,
      //       "goods_id": 2,
      //       "title": "内存",
      //       "description": null,
      //       "specitem": [
      //         {
      //           "id": 225,
      //           "title": "16G",
      //           "c": false,
      //           "specid": 112,
      //           "thumb": ""
      //         },
      //         {
      //           "id": 226,
      //           "title": "32G",
      //           "specid": 112,
      //           "c": false,
      //           "thumb": ""
      //         }
      //       ]
      //     }
      //   ],
      //   "has_many_options": [
      //     {
      //       "id": 11,
      //       "goods_id": 2,
      //       "title": "白色+16G",
      //       "thumb": "//gw.alicdn.com/imgextra/i1/1596107585/TB2WgBJXWnyQeBjSsplXXaLWVXa_!!1596107585.jpg_760x760q50s150.jpg",
      //       "product_price": 80000000,
      //       "market_price": 4330000,
      //       "stock": 22,
      //       "specs": "223_225",
      //       "weight": "0.00"
      //     },
      //     {
      //       "id": 12,
      //       "goods_id": 2,
      //       "title": "白色+32G",
      //       "thumb": null,
      //       "product_price": 80000000,
      //       "market_price": 50000000,
      //       "stock": 0,
      //       "specs": "223_226",
      //       "weight": "0.00"
      //     },
      //     {
      //       "id": 13,
      //       "goods_id": 2,
      //       "title": "黑色+16G",
      //       "thumb": null,
      //       "product_price": 80000000,
      //       "market_price": 30000000,
      //       "stock": 10,
      //       "specs": "224_225",
      //       "weight": "0.00"
      //     },
      //     {
      //       "id": 14,
      //       "goods_id": 2,
      //       "title": "黑色+32G",
      //       "thumb": null,
      //       "product_price": 80000000,
      //       "market_price": 60000000,
      //       "stock": 15,
      //       "specs": "224_226",
      //       "weight": "0.00"
      //     }
      //   ],
      //   "has_one_share": {
      //     "id": 3,
      //     "goods_id": 2,
      //     "need_follow": 1,
      //     "no_follow_message": "必须关注",
      //     "follow_message": "",
      //     "share_title": "看看我吧",
      //     "share_thumb": "images/6/2017/03/w1leEV09AFbG2Yz9l9vXBycyELL7F2.jpg",
      //     "share_desc": "哈哈哈，分享描述"
      //   },
      //   "has_one_discount": {
      //     "id": 26,
      //     "goods_id": 2,
      //     "level_discount_type": 1,
      //     "discount_method": 1,
      //     "level_id": 1,
      //     "discount_value": "8.00"
      //   },
      //   "has_one_goods_dispatch": {
      //     "id": 1,
      //     "goods_id": 2,
      //     "dispatch_type": 1,
      //     "dispatch_price": 10,
      //     "dispatch_id": 0,
      //     "is_cod": 1
      //   },
      //   "has_one_privilege": {
      //     "id": 1,
      //     "goods_id": 2,
      //     "show_levels": "1",
      //     "show_groups": "",
      //     "buy_levels": "",
      //     "buy_groups": "",
      //     "once_buy_limit": 0,
      //     "total_buy_limit": 0,
      //     "time_begin_limit": 1489029960,
      //     "time_end_limit": 1489029960
      //   },
      //   "has_one_brand": {
      //     "id": 1,
      //     "name": "LV"
      //   }
      // };


    },


    //初始化弹窗view
    initPopView() {
      this.popThumb = this.goodsInfo.thumb;//设置默认图片
      this.popStock = this.goodsInfo.stock;//设置默认库存
      if (this.goodsInfo.has_option == 1) {
        this.popPrice = this.goodsInfo.min_price + "-" + this.goodsInfo.max_price;//设置默认价格
      } else {
        this.popPrice = this.goodsInfo.price;//设置默认价格
      }

      this.goodsDescription = "选择";
      for (let i = 0; i < this.goodsInfo.has_many_specs.length; i++) {
        this.goodsDescription += " " + this.goodsInfo.has_many_specs[i].title;
      }
    },

    //加入购物车
    addCart() {
      if (!this.isGoods) {
        Toast("商品已下架或不存在");
        return;
      }

      submitActionTag = SUBMIT_ACTION_CART;
      console.log(submitActionTag);

      //判断是否有规格

      if (this.goodsInfo.has_option == 1) {//有规格
        this.popupSpecs = true;
      } else {//无规格 
        //处理参数
        optionsId = "";
        this.addCartRequest(goods_id, optionsId, this.goodsCount);
      }
    },

    //立即购买
    buyNow() {

      if (!this.isGoods) {
        Toast("商品已下架或不存在");
        return;
      }
      submitActionTag = SUBMIT_ACTION_BUY;
      console.log(submitActionTag);
      console.log(optionsId);
      //判断是否有规格

      if (this.goodsInfo.has_option == 1 && this.fun.isTextEmpty(optionsId)) {//有规格 但是还未选择
        this.popupSpecs = true;
      } else if (this.goodsInfo.has_option == 1 && !this.fun.isTextEmpty(optionsId)) {//有规格 但是已选择

        //处理参数
        this.buyNowRequest(goods_id, optionsId, this.goodsCount);
      } else if (this.goodsInfo.has_option == 0) {//无规格 
        //处理参数
        this.buyNowRequest(goods_id, optionsId, this.goodsCount);
      }

    },

    //提交确认
    submitAction() {
      if (specsManage.length < this.goodsInfo.has_many_specs.length) {
        console.log(this.goodsDescription);
        Toast(this.goodsDescription);
        return;
      }

      if (submitActionTag == SUBMIT_ACTION_CART) {//购物车网络处理
        this.popupSpecs = false;
        //处理参数
        this.addCartRequest(goods_id, optionsId, this.goodsCount);

      } else if (submitActionTag == SUBMIT_ACTION_BUY) { //立即购买处理
        this.popupSpecs = false;
        //处理参数
        this.buyNowRequest(goods_id, optionsId, this.goodsCount);
      }
    },

    //加入购物车网络操作
    addCartRequest(_goodsId, _optionsId, _total) {

      let that = this;

      let json = { goods_id: _goodsId, total: _total, option_id: _optionsId };

      $http.get('member.member-cart.store', json, "添加中...").then(function (response) {
        console.log(response.data)
        if (response.result == 1) {
          that.bannerData = response.data.ads;
          that.category = response.data.category;
          that.goodsListData = response.data.goods;
          Toast(response.msg);
        } else {
          Toast(response.msg);
        }

      }, function (response) {
        console.log(response)
      });
    },

    //立即购买网络操作
    buyNowRequest(_goodsId, _optionsId, _total) {
      //直接购买
      this.$router.push({ name: "goodsorder", params: { tag: submitActionTag, goodsId: _goodsId, optionsId: _optionsId, total: _total } });
    },

    //界面选择规格触发事件
    selectSpecs(data) {
      console.log("selectSpecs");
      var specid = data.specid;//对其他数据筛选 不筛选同级
      //console.log(specid);
      //处理选择池
      this.manageSpecs(data);

      //处理规格组合选择状态
      this.setGoodsSpecs(data);

      //设置选择规格后的 价格、照片、库存
      this.setGoodsSpecsChangeInfo();

      //判断当前购买总量与库存的关系
      this.getMaxCount();

    },

    //判断当前购买总量与库存的关系
    getMaxCount() {
      if (specsManage.length == this.goodsInfo.has_many_specs.length) {
        console.log(optionsMaxCount);
        console.log(this.goodsCount);
        if (this.goodsCount > optionsMaxCount) {
          this.goodsCount = optionsMaxCount;
        }
      }
    },

    //设置选择规格后的 价格、照片、库存
    setGoodsSpecsChangeInfo() {
      //根据ID 排序 specsManage.sort();
			specsManage.sort(function (a, b) {
				return a.id - b.id;
			});
      if (specsManage.length == this.goodsInfo.has_many_specs.length) {
        let goodsSpecs = "";
        for (let j = 0; j < specsManage.length; j++) {
          goodsSpecs += specsManage[j].id + "_";
        }
        goodsSpecs = goodsSpecs.substring(0, goodsSpecs.length - 1);//处理"_"

        for (let i = 0; i < this.goodsInfo.has_many_options.length; i++) {
          if (goodsSpecs == this.setGoodsSpecsBySort(this.goodsInfo.has_many_options[i].specs)) {
            this.popPrice = this.goodsInfo.has_many_options[i].product_price;//设置价格
            this.popThumb = this.fun.isTextEmpty(this.goodsInfo.has_many_options[i].thumb) ? this.goodsInfo.thumb : this.goodsInfo.has_many_options[i].thumb;//设置图片
            this.popStock = this.goodsInfo.has_many_options[i].stock;//设置库存

            optionsId = this.goodsInfo.has_many_options[i].id;//设置规格ID，用于生成订单
            optionsMaxCount = this.goodsInfo.has_many_options[i].stock;//库存最大数 用于切换更改买家购买数量

            break;
          }
        }
      }
    },

    //处理商品goodsSpecs 并排序 新方法
		setGoodsSpecsBySort(specs) {
			let _specs = specs.split("_");//先变成数组
			console.log("_specs", _specs);
			_specs.sort();//排序
			// 在组装回去
			let goodsSpecs = "";
			for (let j = 0; j < _specs.length; j++) {
				goodsSpecs += _specs[j] + "_";
			}
			goodsSpecs = goodsSpecs.substring(0, goodsSpecs.length - 1);//处理"_"
			return goodsSpecs;
		},

    //处理选择池
    manageSpecs(data) {
      var specsObject = new Object();
      specsObject.id = data.id;
      specsObject.specid = data.specid;
      specsObject.title = data.title;

      if (specsManage.length > 0) {
        for (let i = 0; i < specsManage.length; i++) {
          if (specsManage[i].specid == specsObject.specid) {
            specsManage.splice(i, 1);
          }
        }
        specsManage.push(specsObject);
      } else {
        specsManage.push(specsObject);
      }

      //排序 
      if (specsManage.length == this.goodsInfo.has_many_specs.length) {
        var newSpecsManage = [];
        for (let i = 0; i < this.goodsInfo.has_many_specs.length; i++) {
          for (let j = 0; j < specsManage.length; j++) {
            if (this.goodsInfo.has_many_specs[i].id == specsManage[j].specid) {
              newSpecsManage.push(specsManage[j]);
              break;
            }
          }
        }
        specsManage = newSpecsManage;
      }
      this.setGoodsDescription();
    },

    //处理goodsDescription 数据
    setGoodsDescription() {
      var description = "";
      //相等代表全选了 体现语句
      if (specsManage.length == this.goodsInfo.has_many_specs.length) {
        description = "已选择 ";
        for (let i = 0; i < specsManage.length; i++) {
          description += specsManage[i].title + " ";
        }
        this.goodsDescription = description;
      } else {
        description = "请选择 ";

        for (let i = 0; i < this.goodsInfo.has_many_specs.length; i++) {
          for (let j = 0; j < specsManage.length; j++) {
            if (this.goodsInfo.has_many_specs[i].id != specsManage[j].specid) {
              description += this.goodsInfo.has_many_specs[i].title + " ";
              break;
            }
          }
        }
        this.goodsDescription = description;
      }
    },

    //处理规格组合选择状态 过滤数据
    setGoodsSpecs(specs) {
      for (let i = 0; i < this.goodsInfo.has_many_specs.length; i++) {
        if (specs.specid != this.goodsInfo.has_many_specs[i].id) {
          this.setGoodsSpecsStatus(this.goodsInfo.has_many_specs[i].specitem, specs.id);
        }
      }
    },

    //处理规格组合选择状态 处理状态 specitem 组合数组(未选中的) id当前选中的ID 根据ID 组合算是否有当前组合
    setGoodsSpecsStatus(specitem, id) {
      console.log(specitem);
      console.log(id);
      let options = [];//数据池


      for (let i = 0; i < this.goodsInfo.has_many_options.length; i++) {
        console.log(this.goodsInfo.has_many_options[i].specs);
        let _specs = this.goodsInfo.has_many_options[i].specs.split("_");
        //console.log(_specs);
        //判断是否包含
        for (let j = 0; j < _specs.length; j++) {
          if (_specs[j] == id) {
            options.push(this.goodsInfo.has_many_options[i]);
          }
        }
      }

      //关键处理方式 后期要优化 效率低
      for (let m = 0; m < options.length; m++) {
        let _specs = options[m].specs.split("_");
        for (let y = 0; y < _specs.length; y++) {
          if (_specs[y] != id && options[m].stock == 0) {
            for (let n = 0; n < specitem.length; n++) {
              if (_specs[y] == specitem[n].id) {
                specitem[n].c = true;
              }
            }
          } else if (_specs[y] != id && options[m].stock > 0) {
            for (let n = 0; n < specitem.length; n++) {
              if (_specs[y] == specitem[n].id) {
                specitem[n].c = false;
              }
            }
          }
        }
      }

      console.log(options);

    },

    //增加
    addGoods() {
      console.log("增加");
      if (specsManage.length == this.goodsInfo.has_many_specs.length && this.goodsCount == optionsMaxCount) {
        console.log("数量超出范围");
        Toast("数量超出范围");
        console.log("max=" + this.goodsCount);
        return;
      }
      this.goodsCount++;

    },

    //减少
    reduceGoods() {
      if (this.goodsCount == 1) {
        return;
      }

      this.goodsCount--;
    },

    //判断是否收藏
    isFavorite() {
      let that = this;
      $http.get('member.member-favorite.isFavorite', { goods_id: goods_id }).then(function (response) {
        console.log(response)
        if (response.result == 1) {
          //已收藏
          that.favorite = response.data.status == 1 ? true : false;
        } else {

        }

      }, function (response) {
        console.log(response);
      });
    },
    //收藏操作
    onFavorite(isFavorite) {
      if (!this.isGoods) {
        Toast("商品已下架或不存在");
        return;
      }
      isFavorite ? this.removeFavorite() : this.addFavorite();
      console.log(isFavorite);
    },

    //添加收藏
    addFavorite() {
      console.log("addFavorite");
      let that = this;
      $http.get('member.member-favorite.store', { goods_id: goods_id }, "处理中...").then(function (response) {
        console.log(response)
        if (response.result == 1) {
          that.favorite = true;
          Toast("操作成功");
        } else {

        }

      }, function (response) {
        console.log(response);
      });
    },

    //移除收藏
    removeFavorite() {
      let that = this;
      $http.get('member.member-favorite.destroy', { goods_id: goods_id }, "处理中...").then(function (response) {
        console.log(response)
        if (response.result == 1) {
          that.favorite = false;
          Toast("操作成功");
        } else {

        }

      }, function (response) {
        console.log(response);
      });
    },

    //足迹记录
    footSet(_goods_id) {

      if (!this.isGoods) {
        return;
      }

      let that = this;
      $http.get('member.member-history.store', { goods_id: _goods_id }).then(function (response) {
        console.log(response)
        if (response.result == 1) {
        } else {

        }

      }, function (response) {
        console.log(response);
      });
    },


    //初始化分享设置
    initShare() {
      let that = this;
      console.log(document.location.href);
      let _url = document.location.href;
      let json = { url: _url };
      $http.get('member.member.wxJsSdkConfig', json).then(function (response) {
        console.log(response)
        if (response.result == 1) {
          that.share(response.data);
        } else {

        }
      }, function (response) {
        console.log(response);
      });
    },

    //分享
    shareWeixin() {
      //不是微信端 不访问
      if (window.localStorage.type == 5) {
        return;
      }
      MessageBox({
        title: '提示',
        message: '请点击右上角微信分享',
        showCancelButton: true
      });
    },

    //组装分享设置
    share(data) {
      let that = this;
      wx.config(data.config);
      wx.ready(function () {

        let _title = (that.fun.isTextEmpty(that.goodsInfo.has_one_share.share_title)) ? that.goodsInfo.title : that.goodsInfo.has_one_share.share_title;
        //let _link = document.location.href + "&mid=" + data.info.uid;
         let _link = document.location.href;
        _link=that.fun.isMid(_link,data.info.uid);

        let _imgUrl = (that.fun.isTextEmpty(that.goodsInfo.has_one_share.share_thumb)) ? that.goodsInfo.thumb : that.goodsInfo.has_one_share.share_thumb;
        let _desc = (that.fun.isTextEmpty(that.goodsInfo.has_one_share.share_desc)) ? data.shop.name : that.goodsInfo.has_one_share.share_desc;
        wx.showOptionMenu();
        wx.onMenuShareTimeline({
          title: _title, // 分享标题
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          success: function () {
            Toast("分享成功");
          },
          cancel: function () {
            Toast("取消分享");
          }
        });



        wx.onMenuShareAppMessage({
          title: _title, // 分享标题
          desc: _desc, // 分享描述
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            Toast("分享成功");
          },
          cancel: function () {
            Toast("取消分享");
          }
        });
      });
    }



    //判断是否是空
    // isTextEmpty(str) {
    //   if ((str == null) || (str == "") || (str == undefined)) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }

  },
  components: {}
}