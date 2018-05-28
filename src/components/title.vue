<template>
	<div>

	<mt-header fixed :title="text" v-if="!hide">
	  	<!--onclick="window.history.go(-1)"v-on:等价于@  -->
	    <mt-button icon="back" @click="goto" slot="left" v-if="!goback"></mt-button>
	  <template v-if="tolink">
	  	<router-link :to="fun.getUrl(tolink)" slot="right">{{totext}}</router-link>
	 	</template>
	</mt-header>	

<!--
 <h1 v-if="!hide">{{ text }}</h1>
-->		</div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    props: ['text', 'hide','totext','tolink','goback'],
	data() {
		return {
			toi:this.fun.getKeyByI()
		}
	},
    activated(){
      console.log('统计代码run');
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?651798cf44d298ed46b435d750cc920c";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
      console.log('统计代码run');
    },
    mounted: function () {
    	//this.tempInfo();
    },
    methods:{
	
    	goto(){
				if(window.history.length <= 1)
				{
						this.$router.push(this.fun.getUrl('home', {}));
				}else{
						this.$router.go(-1);
				}
    		
    	}
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.mint-header{	background: none;color: #666;}
	.is-fixed .mint-header-title{font-weight: bold;}
	.mint-header.is-fixed{border-bottom: 1px solid #e8e8e8;background: #FFF;z-index: 99;}
	.is-right a{font-size: .6rem;}
</style>
