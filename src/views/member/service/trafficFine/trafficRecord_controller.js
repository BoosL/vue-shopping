import cTitle from 'components/title';

    export default{
    	components: { cTitle },
        data(){
            return{
            	language:{},
            	data:[
            			{time:"5月",data:[
            								{content:"缴纳罚款100元-12345678901",date:"2017-05-01 11:00:00",status:"待支付",money:"99.50"},
            								{content:"缴纳罚款100元-12345678901",date:"2017-05-01 11:00:00",status:"待支付",money:"99.50"},
            							]
            			},
            			{time:"4月",data:[
            								{content:"缴纳罚款100元-12345678901",date:"2017-05-01 11:00:00",status:"待支付",money:"99.50"},
            								{content:"黑龙江省内充值100M当月有效",date:"2017-05-01 11:00:00",status:"待支付",money:"99.50"},
            							]
            			},
            			{time:"2016年12月",data:[
            								{content:"缴纳罚款100元-12345678901",date:"2017-05-01 11:00:00",status:"待支付",money:"99.50"},
            								{content:"黑龙江省内充值100M当月有效",date:"2017-05-01 11:00:00",status:"待支付",money:"99.50"},
            							]
            			}
            		]
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
					this.language=JSON.parse(sessionStorage.languageService).trafficRecord ;
				}else{
					this.language=this.$store.state.service.languageService.trafficRecord ;
				}
		  	}
		},
		
		mounted(){
			if(sessionStorage.languageService){
				this.language=JSON.parse(sessionStorage.languageService).trafficRecord ;
			}else{
				this.language=this.$store.state.service.languageService.trafficRecord ;
			}
		},
		
		activated(){
			this.$store.commit('onload');
		},
        
    }
