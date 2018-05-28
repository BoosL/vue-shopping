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
            oftemp: false,
            dftempData: false,
            follow: false,
            isfollow: false,
            pageinfo: '',

            temp: { item: { janst: '' } },
        }
    },

    mounted() {
        window.scroll=0;
        window.addEventListener('scroll', this.slider);
        this.fun.setWXTitle('');

    },
    created() {

    },
    activated() {
        this.temp= { item: { janst: '' } },
        this.getTemp();
    },
    beforeUpdate() {

    },
    methods: {

        //获取装修信息
        getTemp() {
            //console.log("page_id",this.$route.params.page_id );
            let page_id=this.fun.isTextEmpty(this.fun.getKey('page_id'))?this.$route.params.page_id:this.fun.getKey('page_id');
            console.log("page_id",page_id);
            $http.get('home-page.index', { "page_id": page_id }).then((response) => {
                
                if (!response) return;
                if (response.result == 1) {
                    if (!response.data.default) {

                        for (let j of response.data.item.data) {
                            j.temp = 'show' + j.temp
                        };
                        response.data.item.janst = response.data.item.pageinfo.params.title;

                        this.temp.item.janst=response.data.item.pageinfo.params.title;

                    } else {
                        response.data.item.janst = response.data.mailInfo.name;
                        this.temp.item.janst=response.data.mailInfo.name;

                    }
                    
                    this.temp=response.data;
                    console.log(this.temp);
                    this.$store.commit('tempIndex', response.data);
                    //this.$store.commit('setPlugins', response.data);
                    response.data.item.janst ? this.fun.setWXTitle(response.data.item.janst) : this.fun.setWXTitle('默认标题');
                    this.temp.item.janst?this.fun.setWXTitle(response.data.item.janst):this.fun.setWXTitle('默认标题');
                } else {
                    console.log(response.msg)
                }
            }), (response) => {

            }
        },

        tosearch() {
            this.$router.push(this.fun.getUrl('search'));

        },
        slider() {
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            if (top < 50) { this.amout = false; } else { this.amout = true; }
        },


    },
    watch: {
        '$route'(to, from) {
            //刷新参数放到这里里面去触发就可以刷新相同界面了
            this.getTemp();
        }
    },



        components: { cTitle, cMent, cGoodsList, banner, showbanner, showmenu, showtitle, showsearch, showline, showblank, showrichtext, showpicture, showcube, showarea, showshop, showgoods, shownotice, cMyswipe, Swipe, SwipeItem },

        compiled() {

            this.datate();
        }
    }