import { Actionsheet } from 'mint-ui';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';

export default{
	data(){
		return{ 
			//存放语言
			language:{},
			goods_id:'',
			poster:'',//二维码
			Sign:false,//是否签到
			score:0,//积分
			avatar:'',//头像
			plugins:'',//插件集开关
			pluginsFeel:false,
			pluginsVip:false,
			title:{
				id:"",
				nickname:"",
				leve:"",
				exer:"0.00"
			},
			overdues:false,
			sheetVisible:false,
			Vipible:false,
			actions:[{name:"普通会员"},{name:"高级会员"},{name:"取消",method:this.vipPop}],
			actions2:[{name:"vip"},{name:"vip2"},{name:"cancle",method:this.vipPop}],
		}
	},
	methods:{
		openQrCode(e) {
			this.$refs.hook.style.display = e;
		},		
		toBalance(){
			this.$router.push(this.fun.getUrl('balance'));
		},
	    getMemberInfo() {
	        $http.get('member.member.getUserInfo', {}, "加载中...").then((response)=>{
	
	          if (response.result == 1) {
	          		this.title.nickname = response.data.nickname;
	          		this.title.leve = response.data.level_name;
	          		this.title.id = response.data.uid;
	          		this.title.exer = response.data.credit2;
	          		this.score = response.data.credit1;
	          		this.avatar = response.data.avatar;
	          		this.poster = response.data.poster;
	          		this.Vipible = response.data.is_agent;
	          } else {
	             MessageBox.alert(response.msg);
	          }
	        }, function (response) {
	           MessageBox.alert(response);
	        });
	    },
	    getUpgradeToAgent() {
	        $http.get('plugin.elive.api.index.upgradeToAgent').then((response)=>{
	          if (response.result == 1) {
	          		this.goods_id = response.data.goods_id;
	          		this.Vipible = !this.Vipible;
	          		this.$router.push(this.fun.getUrl('goods',{id:response.data.goods_id}));
	          } else {
	             MessageBox.alert(response.msg);
	          }
	        }, function (response) {
	           MessageBox.alert(response);
	        });
	    },
	    getPlugin() {
	        $http.get('plugin.elive.api.index.pluginShow').then((response)=>{
	          if (response.result == 1) {
					this.plugins = response.data;
					this.pluginsVip = response.data.vip.switch;
					this.pluginsFeel = response.data.feel.switch;
	          } else {
	             MessageBox.alert(response.msg);
	          }
	        }, function (response) {
	           MessageBox.alert(response);
	        });
	    },	    
		vipPop(){
			//this.sheetVisible=!this.sheetVisible;
			if (this.Vipible) {
				return;
			}
			this.getUpgradeToAgent();
		},
		langPop(){
			this.overdues=!this.overdues;
		},
		//初始化语言
		initLang(){
			if(sessionStorage.languageService){
				this.language=JSON.parse(sessionStorage.languageService).lifeService;
			}else{
				this.language=this.$store.state.service.languageService.lifeService;
			}
		},
		//签到
		checkIn(){
			if (this.Sign) return;
			this.Sign = true;

			Toast({
			  	message: '获得5积分',
			  	iconClass: 'icon icon-success'
			});
			//判断是否签到，没签到执行，签到则不执行
			this.score+=5;
		}
	},
	//实时监测this.$store.state.service.chinese的变化，获取最新的语言包
	computed: {
		  	getLangState() {
				return this.$store.state.service.languageService;
		  	}
	},
	watch: {
	  	getLangState(val) {
		   	if(val){
				this.language=JSON.parse(sessionStorage.languageService).lifeService;
			}else{
				this.language=this.$store.state.service.languageService.lifeService;
			}
	  	}
	},
	
	mounted(){
		
		this.initLang();
	},
	
	activated(){
		this.getMemberInfo();
		this.getPlugin();
		this.$store.commit('onload');
	},
	
}