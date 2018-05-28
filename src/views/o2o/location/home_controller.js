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

    },
    created() {

    },
    activated() {
        //this.ofTempD();
        this.guideFollow();
        this.fun.setWXTitle(this.$store.state.temp.item.janst);

    },
    methods: {
        tosearch() {
            this.$router.push(this.fun.getUrl('search'));
            //this.$router.push('/search');
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
            this.$router.push(this.fun.getUrl('o2oCity'));
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


        //banner点击
        bannerClick(item) {
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