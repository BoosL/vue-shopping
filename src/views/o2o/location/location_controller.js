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
      this.ready();
    },


    created() {
      //this.loadMap();
    },
    activated() {
        //this.ofTempD();
        this.guideFollow();
        this.fun.setWXTitle(this.$store.state.temp.item.janst);
    },
    methods: {
      ready: function () {
        var th = this
        var map = new BMap.Map('map-wrap');
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
        function showInfo(e){
          alert(e.point.lng + ", " + e.point.lat);
        }
        map.addEventListener("click", showInfo);
        console.log('map');
      },

        goback() {
            this.$router.go(-1);
        },
        tosearch() {
            this.$router.push(this.fun.getUrl('search'));
            //this.$router.push('/search');
        },
        slider() {
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            if (top < 50) { this.amout = false; } else { this.amout = true; }


        },


    },



    components: { cTitle, cMent, cStoreList, banner, showbanner, showmenu, showtitle, showsearch, showline, showblank, showrichtext, showpicture, showcube, showarea, showshop, showgoods, shownotice, cMyswipe, Swipe, SwipeItem },

    compiled() {

        this.datate();
    }
}