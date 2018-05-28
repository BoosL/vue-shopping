import cTitle from 'components/title';

export default{
	components: { cTitle },
	data(){
		return{
			language:{},
			score:600,
            scoreMoney:6.00,
            computedMoney:0.00,
            useScore:false,

		}
	},
	methods:{
		
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
				this.language=JSON.parse(sessionStorage.languageService).trafficConfirmOrder;
			}else{
				this.language=this.$store.state.service.languageService.trafficConfirmOrder;
			}
	  	},
	  	useScore:function(val){
			if(val){
				this.computedMoney=this.sourceMoney-this.scoreMoney;
				if(this.computedMoney<0){
					this.computedMoney=0;
				}
    		}else{
    			this.computedMoney=this.sourceMoney;
    		}
    	},
	},
	
	mounted(){
		if(sessionStorage.languageService){
			this.language=JSON.parse(sessionStorage.languageService).trafficConfirmOrder;
		}else{
			this.language=this.$store.state.service.languageService.trafficConfirmOrder;
		}
	},
	
	activated(){
		this.$store.commit('onload');
	},
}
