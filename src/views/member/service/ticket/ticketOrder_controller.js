import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';

export default{
	components: { cTitle},
    data(){
        return{
        	language:{},
        	
            ticketOrders:[
                {fromAddr:"广州",toAddr:"北京",payDetil:"待支付",data:"2017-5-3",fromTime:"22:10",toTime:"01:10",airline:"海南航空",flight:"HU2014",price:"1210",btns:[{btn:"查看订单",type:1},{btn:"去支付",type:2}]},
                {fromAddr:"广州",toAddr:"北京",payDetil:"已取消",data:"2017-5-3",fromTime:"22:10",toTime:"01:10",airline:"海南航空",flight:"HU2014",price:"445",btns:[{btn:"查看订单",type:1},{btn:"删除",type:3}]},
                {fromAddr:"广州",toAddr:"北京",payDetil:"已支付",data:"2017-5-3",fromTime:"22:10",toTime:"01:10",airline:"海南航空",flight:"HU2014",price:"2204",btns:[{btn:"查看订单",type:1},{btn:"删除",type:3}]},
            ]
        }
    },
    methods:{
    	//初始化语言
		initLang(){
			if(sessionStorage.languageService){
				this.language=JSON.parse(sessionStorage.languageService).ticketOrder;
			}else{
				this.language=this.$store.state.service.languageService.ticketOrder;
			}
		},
		jump(e){
			let type=e.currentTarget.getAttribute("data-index");
			if(type==1){
				this.$router.push(this.fun.getUrl('ticketOrderDetail'));
			}else if(type==2){
				//去付款操作
			}else if(type==3){
				MessageBox({
				 	title: '提示',
				  	message: '确定要删除此订单吗?',
				  	showCancelButton: true
				}).then(action => {
					if(action=="confirm"){
				   		console.log("删除订单成功")
					}else if(action=="cancel"){
						console.log("已取消")
					}
					
				});
			}
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
				this.language=JSON.parse(sessionStorage.languageService).ticketOrder;
			}else{
				this.language=this.$store.state.service.languageService.ticketOrder;
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