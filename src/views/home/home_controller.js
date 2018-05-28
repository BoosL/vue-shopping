import { mapState } from 'vuex';
import cTitle from 'components/title';
import cMent from 'components/ment';
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
import { Swipe, SwipeItem } from 'components/meswipe';
import config_info from './config';


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
            pageinfo: ''
        }
    },
    //computed: mapState(['mailInfo']),

    mounted() {
        window.addEventListener('scroll', this.slider);


        //结果"http://localhost/index.jsp?c=456&c=456"

        //this.slider();

        //this.indexData();

        //this.tempDatas();
    },
    created() {

    },
    activated() {
        //this.ofTempD();
        this.guideFollow();
        this.fun.setWXTitle(this.$store.state.temp.item.janst);

    },
    methods: {

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
        isTemp() {
            let that = this;
            $http.get('plugins.get-plugin-data', this.form).then((response) => {

                if (response.result == 1) {
                    let member_id = response.data.member_id;
                    this.$store.commit('savemodel', response.data);
                    window.localStorage.myuserinfo = response.data;
                    this.$store.commit('savemodel', response.data);
                    MessageBox.alert('注册成功').then(action => {
                        this.$router.push(this.fun.getUrl('login', { id: item.goods_id }));
                    });

                } else {
                    this.$store.commit('alerts', response.msg);
                    this.form = {};

                }
            }, (response) => {
                // error callback
            })
        },
        tosearch() {
            this.$router.push(this.fun.getUrl('search'));
            //this.$router.push('/search');
        },
        slider() {
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            if (top < 50) { this.amout = false; } else { this.amout = true; }


        },
        //默认首页数据
        indexData() {
            let that = this;
            //			console.log('ttttttttttttttttttt',this.$store.state.temp)
            //              if (this.$store.state.temp.default) {
            //                  that.bannerData = response.data.ads;
            //                  //that.bannerData = b;
            //                  that.goodsListData = response.data.goods;
            //                  that.category = that.fun.chunk(response.data.category, 8);
            //              }


            $http.get('shop.index.get-default-index').then(function (response) {
                //alert(response.data)
                if (response.result == 1) {
                    that.bannerData = response.data.ads;
                    //that.bannerData = b;
                    that.goodsListData = response.data.goods;
                    that.category = that.fun.chunk(response.data.category, 8);
                } else {
                    console.log(response.msg);
                }

            }, function (response) {
                // error callback
                console.log(response);
            });
        },
        tempDatas() {

            $http.get('plugin.designer.home.index.page').then((response) => {
                if (response.result == 1) {
                    for (let j of response.data.data) {
                        j.temp = 'show' + j.temp
                    };
                    this.tempData = response.data.data;
                    this.pageinfo = response.data.pageinfo;


                } else {
                    console.log(response.msg);
                }

            }, (response) => {
                // error callback
                console.log(response);
            });
        },
        ofTempD2() {

            $http.get('plugin.designer.home.index.isHasPage').then((response) => {
                if (response.result == 1) {
                    //this.oftemp = response.data.status;
                    if (response.data.status) { this.oftemp = true; this.dftempData = false; }
                    if (!response.data.status) { this.oftemp = false; this.dftempData = true; }
                } else {
                    console.log(response.msg);
                    this.oftemp = false; this.dftempData = true;
                }

            }, (response) => {
                // error callback
                console.log(response);
                this.oftemp = false; this.dftempData = true;
            });
        },
        //装修接口是否开启 plugins.get-plugin-data
        ofTempD() {

            let itee = this.$store.state.temp;
            console.log('yyyyyyyyyyyyyyy', this.$store.state.temp.item)
            if (itee.item) {
                this.oftemp = true; this.dftempData = false;
                this.tempData = this.$store.state.temp.items;
                console.log('自定义装修数据：', this.tempData);
                //this.ofTempD2();
            } else {
                //this.tempData = this.$store.state.temp.items;

                this.oftemp = false; this.dftempData = true;
            }
            //this.oftemp = response.data.designer;



            //          $http.get('plugins.get-plugin-data').then((response) => {
            //              if (response.result == 1) {
            //                  if (response.data.designer) {
            //                      this.tempDatas();
            //                      this.ofTempD2();
            //                  } else {
            //                      this.oftemp = false; this.dftempData = true;
            //                  }
            //                  //this.oftemp = response.data.designer;
            //              } else {
            //                  console.log(response.msg);
            //                  this.oftemp = false; this.dftempData = true;
            //              }
            //
            //          }, (response) => {
            //              // error callback
            //              console.log(response);
            //              this.oftemp = false; this.dftempData = true;
            //          });
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
            if (!this.fun.isTextEmpty(item.link)) {
                window.location.href = item.link;//跳转
            }
        },

    },



    components: { cTitle, cMent, cGoodsList, banner, showbanner, showmenu, showtitle, showsearch, showline, showblank, showrichtext, showpicture, showcube, showarea, showshop, showgoods, shownotice, cMyswipe, Swipe, SwipeItem },

    compiled() {

        this.datate();
    }
}