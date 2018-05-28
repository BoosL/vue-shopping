import cTitle from 'components/title';
export default{
	components: { cTitle},
    data(){
        return{
  			language:{},
  			
            airMans:[
                {name:"熊大",num:"12345667642343434",choose:false},
                {name:"熊二",num:"12345667642343434",choose:false}
            ],
            
            
            //明细
            details:false,
        }
    },
    methods:{
    	//初始化语言
    	initLang(){
    		if(sessionStorage.languageService){
				this.language=JSON.parse(sessionStorage.languageService).refundApplication;
			}else{
				this.language=this.$store.state.service.languageService.refundApplication;
			}
    	},
    	//查看明细
		closeDetails(){
			this.details=!this.details;
		},
		chooseCircle(e){
			let li=e.currentTarget.getAttribute("data-index");
			this.airMans[li].choose = !this.airMans[li].choose;
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
				this.language=JSON.parse(sessionStorage.languageService).refundApplication;
			}else{
				this.language=this.$store.state.service.languageService.refundApplication;
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