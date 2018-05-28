<template>
	<div id="changeAgreement"  :class="'changeAgreement'+$store.state.service.lang">
        <c-title :hide="false" text='改退协议'></c-title>
        <div style="height:40px"></div>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis autem eaque facere omnis amet laboriosam nihil odio quas repellat at fugiat debitis vero ea eum deserunt doloribus maxime adipisci ab! 
		</p>
	</div>
</template>

<script>
import cTitle from 'components/title';
export default{
	components: { cTitle},
	data(){
		return{
			language:{},
		}
	},
	methods:{
		//初始化语言
    	initLang(){
    		if(sessionStorage.languageService){
				this.language=JSON.parse(sessionStorage.languageService).addOrder;
			}else{
				this.language=this.$store.state.service.languageService.addOrder;
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
				this.language=JSON.parse(sessionStorage.languageService).addOrder;
			}else{
				this.language=this.$store.state.service.languageService.addOrder;
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
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.changeAgreementch{
	
}

.changeAgreementwei{
	
}
</style>