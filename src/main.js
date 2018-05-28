import Vue from 'vue';
import Vuex from 'vuex';
//var jjjs = './fun/jweixin-1.0.0.js';
//var ind = require(jjjs);

// load vuex i18n module
//import vuexI18n from 'vuex-i18n';
//import VueI18n from 'vue-i18n'

import VueRouter from 'vue-router';
import App from './app';
import routes from './routes';
import storeOption from './store';
import filters from './filters';
import Fun from './fun';
import Http from './fun/http';

//import vuefinger from 'vue-finger';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
//import url from './utils/url';//获取url参数

import YDUI from 'vue-ydui';
import Lrz from 'lrz';
import 'vue-ydui/dist/ydui.px.css';
//导入ydui base.css
import 'vue-ydui/dist/ydui.base.css';

const R = require('ramda');



//过滤器
Object.keys(filters).forEach((key)=>Vue.filter(key,filters[key]));
Vue.use(Mint);
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(YDUI);

//directRightUrl();
 //注册全局方法
//Vue.prototype.$url=url;

const scrollBehavior = (to, from, savedPosition) => {
    // return 期望滚动到哪个的位置
    
    //return savedPosition;
    console.log(to.name);
    if(to.name=="home"){
      if (savedPosition) {return savedPosition;}
    }else{
      return{x:0,y:0};
    }
}


//Vue.use(vuefinger);
// 创建一个路由对象用于管理页面的路由
const router = new VueRouter({
  hashbang:true,
  //mode: 'history',//去除url上的#号模式
  //mode:'abstract',
  history: true,
  hashPrefix:'!',
  linkActiveClass: 'active',
  routes,
  base:'/addons/yun_shop/',
  scrollBehavior
});


//可否访问前过滤方法
router.beforeEach(function(to, from, next) {
	//window.localStorage.i = Fun.getKey('i');
	window.localStorage.i = to.query.i;

	from.query.detailid = 'name';
	window.localStorage.mid = to.query.mid;
	var userMsg = localStorage.getItem('userMsg');
//alert(document.location.href);
// console.log(document.location.href.split('/#'));
// var temp = document.location.href.split('/#');
// var new_link = temp[0];

    // new_link= new_link +"/#/";
    // new_link= new_link+'i='+2;
    // new_link = new_link + temp[1];
    // document.location.href = new_link;
    // console.log(new_link);
    // var str=new_link.toString();
    // alert(str);
	//if(to.path === '/hello') {{ next(); return; }}
	//if(to.path !=='/login' && !userMsg){next({ path: '/login' });return; }
	//if(to.path === '/hello'){if(!userMsg){ next({ path: '/login' }) }}
	next();
});
window.localStorage.isWeiXin = Fun.isWeiXin();
let type = '';
window.localStorage.isWeiXin=='true'?(type = 1):(type =5);
window.localStorage.type = type;
Vue.prototype.fun = Fun;
// 创建一个 store 对象用于管理应用状态
const store = new Vuex.Store(storeOption);

//fetch('/api/hello').then(response => response.text())
//.then(data => console.log('得到数据：',data))
//.catch(e => console.log("错误, error：", e));

//fetch('http://go.cn').then(response => response.json());
window.$http = Http;
window.R=R;
window.__lendApp__ = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

function directRightUrl () {
  let paths = window.location.href.split('#')
  paths[1] = paths[1] || '/'
  // 老式的#!分隔跳转
  if (paths[0].charAt(paths[0].length - 1) !== '?') {
    paths[0] = `${paths[0]}?`
  }
  if (paths[1].charAt(0) === '!') {
     paths[1] = paths[1].substr(1)
  }
  let url = `${paths[0]}#${paths[1]}`
  if (window.location.href !== url) {
  	window.history.pushState({},0,url);
    //window.location.href = url
  }
}

/**
 * 定义语言包方法
 * @param langname  eg: langMember.memberId
 * @returns {*}
 */
Vue.prototype.$yzt = function(langname) {
    let $lang = langname.split('.');
    if ($lang.length < 2) {
        return '';
    }

    return store.state.langService.language[$lang[0]][$lang[1]];
}

Vue.prototype.$vueIsTextEmpty = function(str1) {
  if(this.fun.isTextEmpty(str1)){
    return true;
  }
  return false;
}


Array.prototype.removeByValue = function(val) {
  for(var i=0; i<this.length; i++) {
    if(this[i] == val) {
      this.splice(i, 1);
      break;
    }
  }
}

Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

//$t();
//const injan = './jan';
//const bstt = require(injan);
//console.log('eeee::::::::ttttttt:::::',bstt.uid);

//var eoset = R.union([{a:88,b:99,c:65}, 2, 3], [2, 3, 4]);
//var l1 = [{a: 1}, {a: 2},{c:8}];
//var l2 = [{a: 1}, {a: 4}];
//eoset = R.unionWith(R.eqBy(R.prop('a')), l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]
//var g1 = {a:11,b:22,c:33}
//var g2 = {d:44,e:55,f:66}
//eoset = R.mergeAll([g1,g2]);
//console.log('计算结果:',eoset);
//var multiply2 = (a, b) => a * b;
//var bbb = R.prop('x', {x: 'sofer'});
//var byAge = R.ascend(R.prop('x'));
//var people = [{x:28,b:'b98'},{x:128,b:'b98'},{x:78,b:'b98'},{x:48,b:'b98'}];
//var peopleByYoungestFirst = R.sort(byAge)(people);
//var a = R.aperture(2, ['a', 'b', 'c', 'd', 'e']);
//console.log('eeeeeeeeeeeeeeee',a);
//var jj = R.has('name')('name');
//console.log(66666666666666666,jj);
//
//Vue.config.devtools = true;






// translations can be kept in separate files for each language
// i.e. resources/i18n/de.json.
/*const translationsCn = {
    "home": {
        'search' : '输入关键词搜索',
        'recommend-goods' : '推荐商品'
    },
    'distribution' : {
        'default-rate' : '默认分销佣金比例12',
        'first-level' : '一级分销',
        'second-level' : '一级分销',
        'third-level' : '一级分销',
    },
};

// add translations directly to the application
Vue.i18n.add('en', translationsEn);
Vue.i18n.add('cn', translationsCn);*/
//let appData = require('./locale-cn.json');
/*Vue.i18n.add('cn', appData);
*/
// set the start local

// initialize the vuex store using the vuex module. note that you can change the
//  name of the module if you wish

