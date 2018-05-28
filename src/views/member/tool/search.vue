<template>
    
    <div id="screen">
<mt-search  v-model="value"  cancel-text="取消"  placeholder="搜索"></mt-search>
<div style="height: 52px;"></div>


    	
    </div>
   
</template>
<script>
import { Search } from 'mint-ui';
  export default {
    data() {
      return {
      	value:''
      }
      },
    methods:{

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" >
#screen{
	.mint-searchbar{position: fixed;width: 100%;}
	.mint-searchbar-inner{height: 20px;}
	.mint-searchbar-placeholder .mintui-search{padding-top: 3px;}
}
</style>