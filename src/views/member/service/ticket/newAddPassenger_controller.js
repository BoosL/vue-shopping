import cTitle from 'components/title';
import { Popup } from 'mint-ui';

export default{
	components:{cTitle},
	data(){
		return{
			language:{},
			
			popupVisible:false,
			popupVisible2:false,
			passanger:"",
			card:"",
			cardId:"",
			name:"",
			slots: [
		        {
		          flex: 1,
		          values:["成人票"],
		          className: 'slot1',
		          textAlign: 'center'
		        }
		    ],
		    slots2: [
		        {
		          flex: 1,
		          values:["身份证"],
		          className: 'slot2',
		          textAlign: 'center'
		        }
		    ],
		    //保存前一页页面
		    type:"",
		}
	},
	methods:{
		confirm(){
			if (this.cardId!='' && this.name) {
				
				let jsons = {cardId:this.cardId, name:this.name};
				if (localStorage.getItem("airMans")) {
					let airMans = JSON.parse(localStorage.getItem("airMans"));
					airMans.push(jsons);
					localStorage.setItem('airMans',JSON.stringify(airMans));
					this.$router.go(-1);
				}else{
					localStorage.setItem('airMans',JSON.stringify([jsons]));
					this.$router.go(-1);
				}
				
				
			}else{
				
				MessageBox.alert('请填写正确的信息');
			}			
		},
		choosePassanger(){
			this.popupVisible=!this.popupVisible;
		},
		onValuesChange(picker, values) {
	      	picker.setSlotValue(1, values[0]);
	      	this.passanger=values[0];
	  	},
	  	chooseCrad(){
	  		this.popupVisible2=!this.popupVisible2;
	  	},
	  	onValuesChange2(picker, values) {
	      	picker.setSlotValue(1, values[0]);
	      	this.card=values[0];
	  	},
	  	initLang(){
	  		if(sessionStorage.languageService){
				this.language=JSON.parse(sessionStorage.languageService).newAddPassenger;
			}else{
				this.language=this.$store.state.service.languageService.newAddPassenger;
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
				this.language=JSON.parse(sessionStorage.languageService).newAddPassenger;
			}else{
				this.language=this.$store.state.service.languageService.newAddPassenger;
			}
	  	}
	},
	
	mounted(){
		this.initLang();
		this.type = this.$route.params.type;
	},
	
	activated(){
		this.$store.commit('onload');
		this.cardId = '';
		this.name = '';
		this.type = this.$route.params.type;
	},
}
