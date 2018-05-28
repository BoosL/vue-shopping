/**
公共方法
 */
const R = require('ramda');

var fun = {
	//数组分级===================================
	//this.fun.chunk(json.data.category,8);
	chunk: function (arr, n) {
		var result = [];
		for (var i = 0, len = arr.length; i < len; i += n) {
			result.push(arr.slice(i, i + n));
		};
		return result;
	},
	//合并数组
	sunArr: function (name = [], params = []) {
		return R.concat(name)(params);
	},
	//设置微信标题
	setWXTitle: function (title) {
		//debugger;
		document.title = title
		var mobile = navigator.userAgent.toLowerCase()
		if (/iphone|ipad|ipod/.test(mobile)) {
			var iframe = document.createElement('iframe')
			iframe.style.display = 'none'
			// 替换成站标favicon路径或者任意存在的较小的图片即可
			iframe.setAttribute('src', '/favicon.ico')
			var iframeCallback = function () {
				setTimeout(function () {
					iframe.removeEventListener('load', iframeCallback)
					document.body.removeChild(iframe)
				}, 0)
			}
			iframe.addEventListener('load', iframeCallback)
			document.body.appendChild(iframe)
		}
	},
	//判断是否是空
	isTextEmpty: function (str) {
		if ((str == null) || (str == "") || (str == undefined)) {
			return true;
		} else {
			return false;
		}
	},
	//判断手机还是微信
	isWeiXin: function () {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	},
	//判断是否云打包APP
	isApp: function () {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.indexOf('yunzshop') > -1) {
			return true;
		} else {
			return false;
		}
	},
	getSiteRoot: function () {
        return document.location.protocol + '//' + window.location.host;
	},
	getKey: function (name) {

		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
	},

	getKeyByI: function () {
		let i = this.getKey('i');
		return i;
	},
	getKeyByMid: function () {
		let mid = this.getKey('mid');
		return mid;
	},
	getKeyByMicroShopId: function () {
		let micro_shop_id = this.getKey('shop_id');
		return micro_shop_id;
	},
	getTyep: function () {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return "1";
		} else if (this.isApp()) {
			return "7";
        }else{
			return "5";
		}
	},
	//url增加默认传参
	getUrl: function (name, params, query) {
		query = R.mergeAll([query, {
			i: this.getKeyByI(),
			type: this.getTyep(),
			mid: this.getKeyByMid(),
			shop_id: this.getKeyByMicroShopId()
		}]);
		return {
			name,
			params,
			query
		}
	},

	//获取地址信息
	getAddressInfo: function () {
		//saveAddresssInfo
		$http.get('member.member-address.address', {
			"i": this.getKeyByI(),
			"type": this.getTyep()
		}).then(function (response) {
			if (response.result == 1) {
				var province = JSON.stringify(response.data.province);
				var city = JSON.stringify(response.data.city);
				var district = JSON.stringify(response.data.district);
				localStorage.setItem("province", province);
				localStorage.setItem("city", city);
				localStorage.setItem("district", district);
			}
		}, function (response) {
			// error callback
		})
	},

	//如果为空
	isNonEmpty: function (value, errorMsg) {
		return value === '' ?
			errorMsg : void 0
	},
	//最小长度
	minLength: function (value, length, errorMsg) {
		return value.length < length ?
			errorMsg : void 0
	},
	//是否手机
	isMoblie: function (value) {
		return !/^1(3|5|7|8|9)[0-9]{9}$/.test(value);
	},
	//是否Email
	isEmail: function (value, errorMsg) {
		return !/^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) ?
			errorMsg : void 0
	},
	//是否为URL链接
	isUrl: function () {
		return !/^((https|http):\/\/).+$/g.test(value) ?
			errorMsg : void 0
	},

	//判断URL链接中是否有mid如果有
	isMid: function (url, val) {
		console.log('url=' + url)
		let arg = 'mid';
		if (url.indexOf("mid=") >= 0) {
			console.log('mid=')
			return this.changeUrlArg(url, 'mid', val);
		} else {

			let burl = this.delQueStr(url, 'mid');
			console.log('eeeee3333e', burl);
			return this.changeUrlArg(burl, 'mid', val);
		}

	},
	changeUrlArg: function (url, arg, val) {
		var pattern = arg + '=([^&]*)';
		var replaceText = arg + '=' + val;
		return url.match(pattern) ? url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText);
	},
	delQueStr: function (url, ref) //删除参数值
	{
		var str = "";
		if (url.indexOf('#') != -1){
			console.log("aaaa",url.indexOf('#'));
			str = url.substr(url.indexOf('#') + 1);
			console.log("urlTga",str);
		}else{
			return url;
		}

		var arr = "";
		var returnurl = "";
		var setparam = "";
		if (str.indexOf('&') != -1) {
			arr = str.split('&');
			console.log("arr", arr);


			for (let i = 0; i < arr.length; i++) {
				console.log("arr==i", arr[i]);
				if (arr[i].split('=')[0] != ref) {
					returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
				}
			}
			console.log("returnurl",returnurl);
			return url.substr(0, url.indexOf('?')) + "?#" + returnurl.substr(0, returnurl.length - 1);
		} else {
			arr = str.split('=');
			if (arr[0] == ref)
				return url.substr(0, url.indexOf('?'));
			else
				return url;
		}

	},
	//判断是否在云打包的应用中
	isapp: function () {
		var YundabaoUA = navigator.userAgent; //获取当前的useragent
		if (YundabaoUA.indexOf('CK 2.0') > -1) //判断当前的ua中是否包含"CK 2.0"，如果包含"CK 2.0"标识当前在云打包的应用中
		{
			return true;
		} else {
			return false;
		}
	},
	//判断URL链接中是否有shop_id如果有
	isShopId: function (url, val) {
		console.log('url=' + url)
		let arg = 'shop_id';
		if (url.indexOf("shop_id=") >= 0) {
			console.log('shop_id=')
			return this.changeUrlArg(url, 'shop_id', val);
		} else {

			let burl = this.delQueStr(url, 'shop_id');
			console.log('eeeee3333eshop_id', burl);
			return this.changeUrlArg(burl, 'shop_id', val);
		}

	},
	//获取时间戳
	getTimestamp(vales) {
		var timestamp = Date.parse(new Date(vales));

		return timestamp / 1000;
	},
	// 判断是否为金额
	isPriceNumber: function (obj) {
		var isNum = /^\d+(\.\d+)?$/;
		if (!isNum.test(obj)) {
			return false;
		} else {
			return true;
		}
	},

	initMailLanguage(){
		return JSON.parse(localStorage.getItem("mailLanguage"));
	},

	setMailLanguage(defaultStr,languageStr){
		let language=this.isTextEmpty(languageStr)?defaultStr:languageStr;
		return language;
	},	


	funHrefFilters(url){
		if ((url == null) || (url == "") || (url == undefined)) {
			return "javascript:;";
		} 
		let host=document.location.host
		let mid=decodeURIComponent((new RegExp('[?|&]' + "mid" + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
		if(url.indexOf(host) >= 0)
		{
			return url+"&mid="+mid;
		}else{
			return url;
		}
	},




	

}
export default fun;