<template>
	<div id="modifyContacts" :class="'modifyContacts'+$store.state.service.lang">
		<c-title :hide="false" :text="language.title"></c-title>
		<div style="height:40px"></div>
		
		<ul class="content">
			<li> <label>{{language.name}}</label> <input type="text" :placeholder="language.placeNameTip" v-model="name"/></li>
			<li> <label>{{language.tele}}</label> <input type="number" :placeholder="language.placeTeleTip" v-model="tele"/></li>
		</ul><br />
		<font color="red">！注：电话号码不能带"-"</font>
			<span class="btn" @click="confirm">{{language.btn}}</span>
		
		
	</div>
</template>

<script>
import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default{
	components:{cTitle},
	data(){
		return{
			language:{},
			tele:'',
			name:''
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
				this.language=JSON.parse(sessionStorage.languageService).modifyContacts;
			}else{
				this.language=this.$store.state.service.languageService.modifyContacts;
			}
	  	}
	},
	methods:{
		confirm(){
			if (this.tele!='' && this.name) {
				
				let jsons = {tele:this.tele, name:this.name};
				localStorage.setItem('linkman',JSON.stringify(jsons));
//				this.$router.push(this.fun.getUrl('addOrder'));
				this.$router.go(-1);
			}else{
				
				MessageBox.alert('请填写正确的信息');
			}
			
		}
	},
	mounted(){
		if(sessionStorage.languageService){
			this.language=JSON.parse(sessionStorage.languageService).modifyContacts;
		}else{
			this.language=this.$store.state.service.languageService.modifyContacts;
		}
	},
	
	activated(){
		if (localStorage.getItem("linkman")) {
			let linkman = JSON.parse(localStorage.getItem("linkman"));
			this.tele = linkman.tele;
			this.name = linkman.name;
		}
		this.$store.commit('onload');
	},
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.modifyContactsch{
	.content{
		li{
			height: 45px;
			line-height: 45px;
			padding: 0 15px;
			margin-top:10px;
			background: #fff;
			text-align: left;
			label{
				width:25%;
				float: left;
				text-align: left;
			}
			i{font-size: 25px;float: right;}
			input{
				border: 0;
				outline: 0;
				float: left;
				width: 75%;
				height: 40px;
			}
		}
	}
	.btn{
		width: 80%;
		height: 40px;
		line-height: 40px;
		border:1px solid #dfdfdf;
		display: block;
		margin: 10px auto;
		-webkit-border-radius: 6px;
		-moz-border-radius: 6px;
		border-radius: 6px;
		background: #FF951B;
		color:#fff ;
		font-size: 16px;
		margin-top: 30px;
	}
}

.modifyContactswei{
	.content{
		li{
			height: 45px;
			line-height: 45px;
			padding: 0 15px;
			margin-top:10px;
			background: #fff;
			text-align: right;
			label{
				width:26%;
				float: right;
				text-align: right;
			}
			i{font-size: 25px;float: left;}
			input{
				border: 0;
				outline: 0;
				float: right;
				width: 74%;
				height: 40px;
			}
		}
	}
	.btn{
		width: 80%;
		height: 40px;
		line-height: 40px;
		border:1px solid #dfdfdf;
		display: block;
		margin: 10px auto;
		-webkit-border-radius: 6px;
		-moz-border-radius: 6px;
		border-radius: 6px;
		background: #FF951B;
		color:#fff ;
		font-size: 16px;
		margin-top: 30px;
	}
}




</style>