import { mapState } from 'vuex';
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
var Items = [
    {
        "id": "M1483004819403",
        "temp": "banner",
        "params": {
            "shape": "",
            "align": "center",
            "scroll": "2",
            "bgcolor": "#CCC"
        },
        "data": [
            {
                "id": "B0000000000001",
                "imgurl": "http:\/\/shop.yunzshop.com\/attachment\/images\/3\/2017\/01\/y56PkmPad4mrDAi2zd6RpmIk65HntM.jpg",
                "hrefurl": "",
                "sysurl": "url"
            },
            {
                "id": "B0000000000003",
                "imgurl": "http:\/\/shop.yunzshop.com\/attachment\/images\/3\/2017\/01\/T11n8hJZwhbgpPGLOZHhP6EjMb5S5w.png",
                "hrefurl": "",
                "sysurl": "url"
            },
            {
                "id": "B1483958615572",
                "imgurl": "http:\/\/shop.yunzshop.com\/attachment\/images\/3\/2017\/01\/xj767JH6vzKZYJqiPuqYD1t7IJ11Rm.png",
                "hrefurl": "https:\/\/shop.yunzshop.com\/index.php?i=3&c=entry&p=detail&id=165&do=shop&m=sz_yi",
                "sysurl": "url"
            }
        ],
        "other": "",
        "content": ""
    },    {"id":"M1491544413260","temp":"area","params":{"isarea":"{p(\"area\")}","height":"","showtitle2":"1"},"data":["..\/addons\/sz_yi\/plugin\/designer\/template\/imgsrc\/choose_city.png","24px"],"other":"","content":""},

            {"id":"M1491531333578","temp":"picture","params":[],"data":[{"id":"P0000000000001","imgurl":"http:\/\/shop.yunzshop.com\/attachment\/images\/3\/2017\/01\/y56PkmPad4mrDAi2zd6RpmIk65HntM.jpg","hrefurl":"","option":"0"}],"other":"","content":""},
            {"id":"M1491531342546","temp":"cube","params":{"bgcolor":"","layout":[{"0":{"cols":3,"rows":2,"isempty":false,"imgurl":"","classname":"index-0"},"3":{"cols":1,"rows":1,"isempty":true,"imgurl":"","classname":""}},{"3":{"cols":1,"rows":1,"isempty":true,"imgurl":"","classname":""}},[{"cols":1,"rows":1,"isempty":true,"imgurl":"","classname":""},{"cols":1,"rows":1,"isempty":true,"imgurl":"","classname":""},{"cols":1,"rows":1,"isempty":true,"imgurl":"","classname":""},{"cols":1,"rows":1,"isempty":true,"imgurl":"","classname":""}],[{"cols":1,"rows":1,"isempty":true,"imgurl":"","classname":""},{"cols":1,"rows":1,"isempty":true,"imgurl":"","classname":""},{"cols":1,"rows":1,"isempty":true,"imgurl":"","classname":""},{"cols":1,"rows":1,"isempty":true,"imgurl":"","classname":""}]],"showIndex":1,"selection":{"1":{"1":{"rows":1,"cols":1},"2":{"rows":1,"cols":2},"3":{"rows":1,"cols":3},"4":{"rows":1,"cols":4}},"2":{"1":{"rows":2,"cols":1},"2":{"rows":2,"cols":2},"3":{"rows":2,"cols":3},"4":{"rows":2,"cols":4}},"3":{"1":{"rows":3,"cols":1},"2":{"rows":3,"cols":2},"3":{"rows":3,"cols":3},"4":{"rows":3,"cols":4}},"4":{"1":{"rows":4,"cols":1},"2":{"rows":4,"cols":2},"3":{"rows":4,"cols":3},"4":{"rows":4,"cols":4}}},"currentPos":{"row":"0","col":"0"},"currentLayout":{"cols":3,"rows":2,"isempty":false,"imgurl":"","classname":"index-0"}},"data":[],"other":"","content":""},{"id":"M1491471969541","temp":"cube","params":{"bgcolor":"","layout":[{"0":{"cols":1,"rows":1,"isempty":false,"imgurl":"http:\/\/hlb.yunzshop.com\/attachment\/images\/6\/2017\/04\/pF92xbZtA5vLFxb7966FH06bvn6MN7.png","classname":"index-0"},"1":{"cols":2,"rows":1,"isempty":false,"imgurl":"http:\/\/hlb.yunzshop.com\/attachment\/images\/6\/2017\/04\/hgFG9H6NU60r5uGy55fvnxkc5s5cNG.png","classname":"index-1"},"3":{"cols":1,"rows":2,"isempty":false,"imgurl":"http:\/\/hlb.yunzshop.com\/attachment\/images\/6\/2017\/04\/glQKnZasGxGnFFz0jlaKGzWfJuQzJc.png","classname":"index-2"}},[{"cols":1,"rows":1,"isempty":false,"imgurl":"http:\/\/hlb.yunzshop.com\/attachment\/images\/6\/2017\/04\/Qi8kiqI8mCcxGic9ACF89mm7h6aH7m.png","classname":"index-4"},{"cols":2,"rows":2,"isempty":false,"imgurl":"http:\/\/hlb.yunzshop.com\/attachment\/images\/6\/2017\/04\/NZ6cQ8OvCGnncQcBgRdMSMrqBGQ6qF.png","classname":"index-3"}],{"0":{"cols":1,"rows":1,"isempty":false,"imgurl":"http:\/\/hlb.yunzshop.com\/attachment\/images\/6\/2017\/04\/L2h2in2q2JPPQC3qPELLhc20bIpLC2.png","classname":"index-5"},"3":{"cols":1,"rows":1,"isempty":false,"imgurl":"http:\/\/hlb.yunzshop.com\/attachment\/images\/6\/2017\/04\/C3EGLInH6KGgHOk6tSG8G3k8Oe97D8.png","classname":"index-8"}},{"0":{"cols":1,"rows":1,"isempty":false,"imgurl":"http:\/\/hlb.yunzshop.com\/attachment\/images\/6\/2017\/04\/arAtAJUAtc35x44C3AVDj3J3Pcz04A.png","classname":"index-9"},"1":{"cols":2,"rows":1,"isempty":false,"imgurl":"http:\/\/hlb.yunzshop.com\/attachment\/images\/6\/2017\/04\/JuyU7rFl1hFHlfolr0LuSHTNR1tdFH.png","classname":"index-7"},"3":{"cols":1,"rows":1,"isempty":false,"imgurl":"http:\/\/hlb.yunzshop.com\/attachment\/images\/6\/2017\/04\/bGo7OtbTLs62sSbFExZS7G7IWeoxZ2.png","classname":"index-6"}}],"showIndex":10,"selection":null,"currentPos":null,"currentLayout":{"cols":2,"rows":1,"isempty":false,"imgurl":"http:\/\/hlb.yunzshop.com\/attachment\/images\/6\/2017\/04\/JuyU7rFl1hFHlfolr0LuSHTNR1tdFH.png","classname":"index-7"}},"data":[],"other":"","content":""},
    {"id":"M1491471963881","temp":"shop","params":{"style":"1","bgimg":"http://hlb.yunzshop.com/addons/sz_yi/plugin/designer/template/imgsrc/init-data/init-image-1.jpg","logo":"1","name":"1","menu":"1","navcolor":"#ff0080"},"data":["http:\/\/hlb.yunzshop.com\/app\/index.php?i=6&c=entry&p=index&do=shop&m=sz_yi","http:\/\/hlb.yunzshop.com\/app\/index.php?i=6&c=entry&p=list&do=shop&m=sz_yi","http:\/\/hlb.yunzshop.com\/app\/index.php?i=6&c=entry&p=list&isdiscount=1&do=shop&m=sz_yi","http:\/\/hlb.yunzshop.com\/app\/index.php?i=6&c=entry&p=notice&do=shop&m=sz_yi"],"other":"","content":""},
 {"id":"M1491531342546","temp":"cube","params":{"bgcolor":"","layout":[{"0":{"cols":3,"rows":2,"isempty":false,"imgurl":"","classname":"index-0"},"3":{"cols":1,"rows":1,"isempty":true,"imgurl":"","classname":""}},{"3":{"cols":1,"rows":1,"isempty":true,"imgurl":"","classname":""}},[{"cols":1,"rows":1,"isempty":true,"imgurl":"","classname":""},{"cols":1,"rows":1,"isempty":true,"imgurl":"","classname":""},{"cols":1,"rows":1,"isempty":true,"imgurl":"","classname":""},{"cols":1,"rows":1,"isempty":true,"imgurl":"","classname":""}],[{"cols":1,"rows":1,"isempty":true,"imgurl":"","classname":""},{"cols":1,"rows":1,"isempty":true,"imgurl":"","classname":""},{"cols":1,"rows":1,"isempty":true,"imgurl":"","classname":""},{"cols":1,"rows":1,"isempty":true,"imgurl":"","classname":""}]],"showIndex":1,"selection":{"1":{"1":{"rows":1,"cols":1},"2":{"rows":1,"cols":2},"3":{"rows":1,"cols":3},"4":{"rows":1,"cols":4}},"2":{"1":{"rows":2,"cols":1},"2":{"rows":2,"cols":2},"3":{"rows":2,"cols":3},"4":{"rows":2,"cols":4}},"3":{"1":{"rows":3,"cols":1},"2":{"rows":3,"cols":2},"3":{"rows":3,"cols":3},"4":{"rows":3,"cols":4}},"4":{"1":{"rows":4,"cols":1},"2":{"rows":4,"cols":2},"3":{"rows":4,"cols":3},"4":{"rows":4,"cols":4}}},"currentPos":{"row":"0","col":"0"},"currentLayout":{"cols":3,"rows":2,"isempty":false,"imgurl":"","classname":"index-0"}},"data":[],"other":"","content":""},
 {"id":"M1491471964417","temp":"goods","params":{"style":"50%","showtitle":"0","titlecolor":"","bgcolor":"","showname":"1","title":"","option":"sale-rx","buysub":"buy-3","price":"1","goodhref":"http:\/\/hlb.yunzshop.com\/app\/index.php?i=6&c=entry&p=detail&do=shop&m=sz_yi"},"data":[{"id":"G1491543437242","img":"http:\/\/hlb.yunzshop.com\/attachment\/images\/6\/2016\/12\/o5CHt008lPiohIvOGhRfTIYIRICyA0.jpg","goodid":"3898","name":"zzj\u7ea2\u706b","priceold":"100.00","pricenow":"100.00","sales":"11","unit":""},{"id":"G1491472123745","img":"http:\/\/hlb.yunzshop.com\/attachment\/images\/0\/2016\/12\/SM6L7nnssMWLx2007m1025SzS14IZ6.png","goodid":"3864","name":"\u4f9b\u5e94\u5546\u6d4b\u8bd53","priceold":"150.00","pricenow":"100.00","sales":"18","unit":""},{"id":"G1491472124313","img":"http:\/\/hlb.yunzshop.com\/attachment\/images\/0\/2016\/12\/QW75Vwqqn5R1NCqrf39v9vw58Vf8TZ.png","goodid":"3865","name":"\u4f9b\u5e94\u5546\u6d4b\u8bd52","priceold":"150.00","pricenow":"200.00","sales":"23","unit":""},{"id":"G1491472124697","img":"http:\/\/hlb.yunzshop.com\/attachment\/images\/6\/2016\/12\/y30M843z4ipnw4Ng4qm6zw64gIdp97.png","goodid":"3866","name":"\u4f9b\u5e94\u4e0a\u6d4b\u8bd51","priceold":"170.00","pricenow":"100000.00","sales":"3","unit":"\u4ef6"},{"id":"G1491472125235","img":"http:\/\/hlb.yunzshop.com\/attachment\/images\/6\/2016\/12\/MvV5sazW22S9yExYeVVekpA5m2aAzz.jpg","goodid":"3867","name":"\u6d4b\u8bd5\u6ee1\u4ef6\u5305\u90ae\u7528 lc","priceold":"100.00","pricenow":"100.00","sales":"3","unit":"\u4e2a"},{"id":"G1491472125868","img":"http:\/\/hlb.yunzshop.com\/attachment\/images\/6\/2016\/12\/iaSFFtqr8IYTjOToasj2SdOtqT8Daq.png","goodid":"3868","name":"\u6d4b\u8bd5","priceold":"120.00","pricenow":"100.00","sales":"36","unit":"\u4ef6"},{"id":"G1491472126241","img":"http:\/\/hlb.yunzshop.com\/attachment\/images\/6\/2016\/12\/G06vXW0KRwZ0uX61BxVvlXUvrvVutu.png","goodid":"3869","name":"020\u6d4b\u8bd5","priceold":"250.00","pricenow":"200.00","sales":"28","unit":""},{"id":"G1491472127321","img":"http:\/\/hlb.yunzshop.com\/attachment\/images\/6\/2016\/12\/NX7hxXdTot4CdXFHXSnSd6X6HcFSV7.png","goodid":"3879","name":"\u593a\u5b9d2\u6d4b\u8bd5","priceold":"300.00","pricenow":"250.00","sales":"0","unit":""},{"id":"G1491472127869","img":"http:\/\/hlb.yunzshop.com\/attachment\/images\/6\/2016\/12\/FT1o3gcjScqe243SZ3WFwDQQ9zG1pg.png","goodid":"3880","name":"\u5206\u9500\u5546\u6d4b\u8bd5","priceold":"260.00","pricenow":"100.00","sales":"80","unit":"\u53bb"},{"id":"G1491472128200","img":"http:\/\/hlb.yunzshop.com\/attachment\/images\/6\/2016\/12\/Ctdadnsiwq5Ihcrpc73ps5DIWX7RUc.png","goodid":"3887","name":"\u8d27\u5230\u4ed8\u6b3e\u6d4b\u8bd5","priceold":"10.00","pricenow":"10.00","sales":"2","unit":""},{"id":"G1491472128913","img":"http:\/\/hlb.yunzshop.com\/attachment\/images\/6\/2017\/01\/m1Yr3CIRiLzzlaDcZxOy3cyRdlSd1S.png","goodid":"3902","name":"\u9152\u5e97\u623f\u578b\u6d4b\u8bd5","priceold":"400.00","pricenow":"500.00","sales":"9","unit":"\u4f4d"},{"id":"G1491472129153","img":"http:\/\/hlb.yunzshop.com\/attachment\/images\/6\/2017\/01\/dcfJhnKn5JgCymahC5h5E9g3cehhcZ.png","goodid":"3903","name":"\u9910\u996e\u6d4b\u8bd5","priceold":"700.00","pricenow":"600.00","sales":"0","unit":"\u65e7"}],"other":"","content":""}
];

export default {
    data() {
        return {
			tempData:''
        }
    },
    mounted() {
		//this.datate();
        //this.$store.commit('cfoots', { a: false });
    },
    created() {
    	for (let j of Items) {
    		j.temp ='show' +j.temp
    	};
		this.tempData = Items;
    },
    destoryed() {
		
    },
   
    //些方式相当于window.onload
    methods: {
		
    },
    components: { showbanner,showmenu,showtitle,showsearch,showline,showblank,showrichtext,showpicture,showcube,showarea,showshop,showgoods,shownotice },
}