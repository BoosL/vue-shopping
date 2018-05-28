import { mapState } from 'vuex';
import cTitle from 'components/title';
import cMent from 'components/ment_microshop';
import cGoodsList from 'components/goodsList';
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
import { Swipe, SwipeItem } from 'c-swipe';
import { Indicator, Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';

require('c-swipe/dist/swipe.css');
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
            username: "用户昵称",
            signName: "个性签名",
            category: [],
            carousel: [],
            goodsListData: [],
            ads: [],
            bannerData: [],
            userImg: "",
            shop_logo: "",
            shop_name: "",
            shop_id: "",
            bgImg: "",
            amout: true, index2: 1,
            "other": "",
            "content": "",
            show: true,
            tempData: items,
            oftemp: false,
            dftempData: false,
            follow: false,
            isfollow: true,
            havaShop: false,//是否已有商品

            shopData: {},//微店信息
        }

    },

    activated() {
        this.shop_id = this.$route.params.shop_id;
        console.log(this.shop_id);
        //this.delCookie("shop_id");//清除cookie
        //存储cookie
        //document.cookie = "shop_id=" + this.shop_id;
        //存储
        this.storeShopId(this.$route.params.shop_id);
        //替换shop_id
        this.replaceShopId(this.$route.params.shop_id);
        //获取微店信息
        this.getMicroShop();


    },
    mounted() {
    	this.getMicroShop();
        window.addEventListener('scroll', this.slider)
    },


    methods: {

        storeShopId(shop_id) {
            this.$store.commit('setShopId', shop_id);
        },
        //替换shop_id
        replaceShopId(shop_id) {
        	let that = this;
            //判断是否相等
            if (this.fun.isTextEmpty(this.fun.getKeyByMicroShopId()))//如果为空
            {
//              let _link = document.location.href;
//              _link = this.fun.isShopId(_link, shop_id);
                that.$router.push({name:'microShop_home',query:{'shop_id':shop_id,type:that.fun.getTyep(),mid:that.fun.getKeyByMid(),i:that.fun.getKeyByI()}})
               
                //window.location.href = _link;//跳转
            } else {
                if (this.fun.getKeyByMicroShopId() != shop_id) {
//                  let _link = document.location.href;
//                  _link = this.fun.isShopId(_link, shop_id);        
                   that.$router.push({name:'microShop_home',query:{'shop_id':shop_id,type:that.fun.getTyep(),mid:that.fun.getKeyByMid(),i:that.fun.getKeyByI()}})
                    //window.location.href = _link;//跳转
                }
            }
        },


        delCookie(name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = this.getCookie(name);
            if (cval != null)
                document.cookie = name + "=" + cval;
        },

        getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },



        //获取微店信息
        getMicroShop() {
            let that = this;
            let json = {};
            $http.get("plugin.micro.frontend.controllers.MicroShop.MicroShopByShare", json, "加载中").then(function (response) {
                if (response.result == 1) {
                    that.shopData = response.data;//微店数据

                    that.setMicroShopUserInfo(response.data); //设置微店用户基础信息
                    that.setBannerData(response.data);//设置广告
                    that.setCategoryData(response.data);//设置分类
                    that.setGoodsData(response.data); //设置商品
                    that.setIsMicroShop(response.data);//判断是否是微店主
                } else {
                    console.log(response);
                    MessageBox.alert(response.msg);
                }
            }, function (response) {
                console.log(response);
                MessageBox.alert(response);
            });
        },


        //设置微店用户基础信息
        setMicroShopUserInfo(data) {
            let that = this;
            that.username = data.nickname+"的微店";
            that.signName = data.signature;
            that.shop_logo = data.shop_logo;
            that.shop_name = data.shop_name;
            //that.shop_name = data.nickname ;
            that.bgImg = data.shop_background;
            that.userImg = data.shop_avatar;

            //设置微信title 
            that.fun.setWXTitle(data.nickname+"的微店");
        },
        //设置分类
        setCategoryData(data) {
            let that = this;
            that.category = that.fun.chunk(data.category, 8);
        },

        //设置广告
        setBannerData(data) {
            let that = this;
            that.bannerData = data.carousel;
        },

        //设置商品
        setGoodsData(data) {
            let that = this;
            that.goodsListData = data.goods;
        },

        //判断是非是微店主
        setIsMicroShop(data) {
            let that = this;
            that.is_micro_shop = data.is_micro_shop;
        },


        goTop(e) {
            document.body.scrollTop = 0
        },
        goBack() {
            this.$router.push(this.fun.getUrl('home'));
        },

        //初始化分享设置
        initShare() {
            let that = this;
            console.log(document.location.href);
            let _url = document.location.href;
            let json = { url: _url, "i": this.fun.getKeyByI(), "type": this.fun.getTyep(), "mid": this.fun.getKeyByMid() };
            $http.post('member.member.wxJsSdkConfig', json).then(function (response) {
                console.log(response)
                if (response.result == 1) {
                    that.share(response.data);
                } else {

                }
            }, function (response) {
                console.log(response);
            });
        },

        //组装分享设置
        share(data) {
            let that = this;
            wx.config(data.config);
            wx.ready(function () {
                let _title = that.shopData.nickname ;//微店名称
                let _link = location.protocol + "//" + window.location.host + "/addons/yun_shop/#/microShopShare/home/" + that.shop_id + "/?mid=" + data.info.uid + "&i=" + data.info.uniacid + "&shop_id=" + that.shop_id;
                let _imgUrl = data.info.avatar;//用户头像
                let _desc = that.shopData.signature;//微店签名
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
        },


    },



    components: { cTitle, cMent, cGoodsList, banner, showbanner, showmenu, showtitle, showsearch, showline, showblank, showrichtext, showpicture, showcube, showarea, showshop, showgoods, shownotice, cMyswipe, Swipe, SwipeItem },

    compiled() {

        this.datate();
    }
}