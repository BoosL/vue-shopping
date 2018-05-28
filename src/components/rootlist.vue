<template>
	<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" bottomPullText=' ' bottomDropText=' ' bottomLoadingText=" " topPullText=" " topDropText=" " topLoadingText=" ">
		<ul id='rootList'>
			<li v-for="(item,index) in lista" :class="{active:active==index}" @click=tab(index,item.url)>{{item.cart}}</li>
		</ul>
		
	</mt-loadmore>	
</template>

<script>
	import { Loadmore } from 'mint-ui';
	export default {
		props: ['lista','caturl'],
    data() {
      return {
      	active: 0,
      	allLoaded:false,
        topStatus: ''
        // ...
      };
    },
    methods: {
      handleTopChange(status) {
        this.topStatus = status;
      },
      //更新
      loadTop(){
      	this.$refs.loadmore.onTopLoaded();
      },
      // 加载更多
      loadBottom(){
      	//this.allLoaded = false;// 若数据已全部获取完毕
      	this.$refs.loadmore.onBottomLoaded();
      	
      },
      tab(n,e){
      	 this.active = n;
      	 
      	 //this.caturl=99999999999;
      }
    }
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	#rootList {
		width:100%;padding-bottom: 50px;
		background: #FFF;
		.active{color: red;}
		li{line-height: 46px;border-bottom: solid 1px #e5e5e5;}
	}
</style>