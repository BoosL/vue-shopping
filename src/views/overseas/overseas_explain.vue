<template>
    <div id="love_explain">
    	<c-title :hide="false" :text='titlew' ></c-title>
    	<div style="height: 70px;"></div>
    	<div class="text" style="padding: 0px;" v-html='content'></div>
    </div>
</template>
<script>
import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default
  {
    data() {
      return {
      	// 说明标题
      	titlew:'', 
        // 爱心值说明
		content:''
      }
    },
    methods:
    {
      getBalance() {
        $http.get('plugin.coin.Frontend.Controllers.explain.index', {}, "加载中...").then((response)=>{
          if (response.result == 1) {
            this.content = response.data.content;
			this.titlew = response.data.title;
          } else {
             MessageBox.alert(response.msg);
          }
        }, function (response) {
           MessageBox.alert(response);
        });
      }
    },
    activated() {
		this.getBalance();
    },
    components: { cTitle }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#love_explain{

}
</style>