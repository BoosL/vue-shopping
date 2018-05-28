import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';

export default{
    components:{ cTitle},
    data(){
        return{
        	language:{},
        	
        	//明细
        	details:false,
        	//经停城市
			city:false,
        }
    },
    methods:{
    	//初始化语言
    	initLang(){
    		if(sessionStorage.languageService){
				this.language=JSON.parse(sessionStorage.languageService).ticketOrderDetail;
			}else{
				this.language=this.$store.state.service.languageService.ticketOrderDetail;
			}
    	},
    	//我要改签
    	changeSign(){
    		MessageBox({
			    title: this.language.pleaseCall,
			    message: '12345678',
			    showCancelButton: true,
			    confirmButtonText: this.language.confirm,
			    cancelButtonText: this.language.cancle,
			}).then(action => {
				//要执行的操作
			 console.log("============================")
			});
    	},
    	//查看明细
		closeDetails(){
			this.details=!this.details;
		},
		closeCity(){
			this.city=!this.city;
		},
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
				this.language=JSON.parse(sessionStorage.languageService).ticketOrderDetail;
			}else{
				this.language=this.$store.state.service.languageService.ticketOrderDetail;
			}
	  	}
	},
	
	mounted(){
		this.initLang();
	},
	
	activated(){
		this.$store.commit('onload');
	},
}