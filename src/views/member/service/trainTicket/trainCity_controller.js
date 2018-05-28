import cTitle from 'components/title';
import { mapState,mapMutations } from 'vuex';

//require('c-swipe/dist/swipe.css');
export default {

	data() {
		return {
			language:{},
			sokey:'',//搜索的关键词
			selected:'1',
            allCitys:[
                {sign:"A",citys:["安康","阿克苏","阿里","阿拉善右旗","阿拉善左旗","阿勒泰"]},
                {sign:"B",citys:["蚌埠", "保山", "包头", "北海", "北京", "北京南苑", "巴彦淖尔", "阿尔山"]},
                {sign:"C",citys:["长春", "常德", "长沙", "长治", "朝阳", "赤峰", "重庆", "长白山", "重庆舟白", "池州九华山机场"]},
                {sign:"D",citys:["大理", "大同", "达县", "丹东", "德宏芒市", "迪庆香格里拉", "敦煌", "东营", "大庆", "稻城亚丁"]},
                {sign:"E",citys:["恩施", "鄂尔多斯", "二连浩特", "额济纳旗"]},
                {sign:"F",citys:["阜阳", "福州", "佛山"]},
                {sign:"G",citys:["赣州", "格尔木", "广汉", "桂林", "贵阳", "固原六盘山"]},
                {sign:"H",citys:["哈密", "哈尔滨", "海口", "海拉尔", "汉中", "合肥", "和田", "黑河", "衡阳", "呼和浩特", "黄山", "邯郸", "淮安"]},
//              {sign:"I",citys:1},
                {sign:"J",citys:["九寨沟", "吉安", "济宁", "吉林", "佳木斯", "嘉峪关", "锦州", "景德镇", "井冈山", "九江", "酒泉", "揭阳", "鸡西", "金昌", "加格达奇"]},
                {sign:"K",citys:["喀什", "克拉玛依", "库尔勒", "昆明", "库车", "喀纳斯", "康定", "凯里黄平机场"]},
                {sign:"L",citys:["兰州", "拉萨", "丽江", "连云港", "临沧", "临沂", "荔波", "黎平"]},
                {sign:"M",citys:["绵阳", "满洲里", "梅县", "牡丹江", "漠河"]},
                {sign:"N",citys:["南昌", "南京", "南宁", "南通", "南阳", "宁波", "那拉提"]},
                {sign:"P",citys:["攀枝花"]},
                {sign:"Q",citys:["泉州晋江", "衢州", "齐齐哈尔", "且末", "秦皇岛", "青岛", "庆阳", "全国"]},
                {sign:"R",citys:["日喀则"]},
                {sign:"S",citys:["三亚", "沙市", "上海虹桥", "上海浦东", "深圳", "石家庄", "思茅"]},
                {sign:"T",citys:["台州黄岩", "塔城", "太原", "天津", "通化", "通辽", "铜仁", "天水", "吐鲁番"]},
                {sign:"W",citys:["乌兰浩特", "乌鲁木齐", "万州", "潍坊", "威海", "文山", "无锡", "武夷山"]},
                {sign:"X",citys:["西双版纳", "西安", "西宁", "锡林浩特", "厦门", "襄樊", "徐州", "兴义", "新疆博乐", "夏河"]},
                {sign:"Y",citys:["延安", "盐城", "延吉", "烟台", "宜宾", "伊宁", "义乌", "英德", "永州", "榆林", "玉树", "伊春林都"]},
                {sign:"Z",citys:["湛江", "张家界", "昭通", "郑州", "舟山", "珠海", "遵义", "中卫", "张家口机场"]}
            ]
		}
	},

	components: { cTitle},
	methods: {
		goSoso(e){
		  	e = e.toLowerCase();
		  	this.sokey = e;
		},		
		//初始化语言
    	initLang(){
    		if(sessionStorage.languageService){
				this.language=JSON.parse(sessionStorage.languageService).city;
			}else{
				this.language=this.$store.state.service.languageService.city;
			}
    	},
		chooseCity(e){
			var texta=e.currentTarget.innerHTML;
			this.$router.push(this.fun.getUrl('trainTicket',{cityName:texta , num:this.$route.params.type}));
		},
		//当前定位
		onLoaddd() {
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r) {
				if(this.getStatus() == BMAP_STATUS_SUCCESS) {
			
					console.log('您的位置：' + r.point.lng + ',' + r.point.lat);
					var geoc = new BMap.Geocoder(); 
					var pt = new BMap.Point(r.point.lng,r.point.lat);
				
					geoc.getLocation(pt, function(rs){
						var addComp = rs.addressComponents;
						document.getElementById("map").innerHTML="<i class='iconfont icon-sousuo1'></i>"+addComp.city;
				}); 
					
				} else {
					alert('failed' + this.getStatus());
				}
			}, {
				enableHighAccuracy: true
			})
		}

	},

	//读取vuex的属性,html即可直接上vuex属性{{jan}}
	//	computed: mapState([])//直接引用vuex状态值
	//实时监测this.$store.state.service.chinese的变化，获取最新的语言包
	computed: {
		  	getLangState() {
				return this.$store.state.service.languageService;
		  	},
		    searchData: function() {
		      var search = this.sokey;
		      if (search) {
		        return this.allCitys.filter(function(product) {
		          return Object.keys(product).some(function(key) {
		            return String(product[key]).toLowerCase().indexOf(search) > -1
		          })
		        })
		      }
		      return this.allCitys;
		    }	  	
	},
	watch: {
	  	getLangState(val) {
		   	if(val){
				this.language=JSON.parse(sessionStorage.languageService).city;
			}else{
				this.language=this.$store.state.service.languageService.city;
			}
	  	}
	},
	
	mounted(){
		this.initLang();
//		this.onLoaddd();
	},
	
	activated(){
		this.$store.commit('onload');
		
	},
}
function groupBy (arr,prop){
    return arr.reduce(function(groups, item) {
        var val = item[prop].toUpperCase();
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
  }, {});
}