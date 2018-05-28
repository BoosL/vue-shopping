import cTitle from 'components/title';
import { Popup } from 'mint-ui';
import { Picker } from 'mint-ui';

export default{
	components: { cTitle },
	data(){
		return{
			language:{},
			//罚款单
			finebill:"",
			popupVisible:false,
			slots: [
		        {
		          flex: 1,
		          values:["甘肃兰州交通罚款 电子单 1","甘肃兰州交通罚款 电子单 2","甘肃兰州交通罚款 电子单","甘肃兰州交通罚款 电子单4","中国电费有限公司 5"],
		          className: 'slot1',
		          textAlign: 'center'
		        }
		    ],
		    //车牌
		    licensePlate:"",
		    popupVisible2:false,
		    slots2: [
		        {
		          flex: 2,
		          values:["京A 1","京A 2","京A","京A4","京A 5"],
		          className: 'slot1',
		          textAlign: 'center'
		        }
		    ],
		    //车辆类型
		    vehicleType:"",
		    popupVisible3:false,
		    slots3: [
		        {
		          flex: 2,
		          values:["请选择","京A 2","京A","京A4","京A 5"],
		          className: 'slot1',
		          textAlign: 'center'
		        }
		    ],
		}
	},
	methods:{
		//罚款单
		onValuesChange(picker, values) {
	      	picker.setSlotValue(1, values[0]);
	      	this.finebill=values[0];
	  	},
	  	popfinebill(){
	  		this.popupVisible=!this.popupVisible;
	  	},
	  	//车牌
	  	onValuesChange2(picker, values) {
	      	picker.setSlotValue(1, values[0]);
	      	this.licensePlate=values[0];
	  	},
	  	poplicensePlate(){
	  		this.popupVisible2=!this.popupVisible2;
	  	},
	  	//车辆类型
  		onValuesChange3(picker, values) {
	      	picker.setSlotValue(1, values[0]);
	      	this.vehicleType=values[0];
	  	},
	  	popVehicleType(){
	  		this.popupVisible3=!this.popupVisible3;
	  	},
	  	//初始化语言
	  	initLang(){
	  		if(sessionStorage.languageService){
				this.language=JSON.parse(sessionStorage.languageService).trafficIndex;
			}else{
				this.language=this.$store.state.service.languageService.trafficIndex;
			}
	  	},
	  	//获取城市
	  	getCity(){
	  		if(this.$route.params.cityName){
	  			var city = this.$route.params.cityName;
	  			document.getElementById("chooseCity").innerHTML = city;
	  		}else{
	  			document.getElementById("chooseCity").innerHTML = this.language.pleChoose;
	  		}
	  		
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
				this.language=JSON.parse(sessionStorage.languageService).trafficIndex;
			}else{
				this.language=this.$store.state.service.languageService.trafficIndex;
			}
	  	},
	},
	
	mounted(){
		this.initLang();
	},
	
	activated(){
		this.$store.commit('onload');
		this.getCity();
	},
}
