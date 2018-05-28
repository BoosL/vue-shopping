<template>
  <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
    <ul>
      <li v-for="item in list"><img v-lazy="item"/></li>
    </ul>

  </mt-loadmore>
</template>
<script>

import { Loadmore } from 'mint-ui';
import { Lazyload } from 'mint-ui';

var urlt='http://fuss10.elemecdn.com/b/18/0678e57cb1b226c04888e7f244c20jpeg.jpeg';
  export default {
    data() {
      return {
      	allLoaded:false,
        topStatus: '',
        list:[
        urlt,urlt,urlt,urlt,urlt,urlt,urlt,urlt,urlt,urlt,urlt,urlt,urlt,urlt
        ]
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
      	this.allLoaded = true;// 若数据已全部获取完毕
      	this.$refs.loadmore.onBottomLoaded();
      	
      }
      
    },
    // ...
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
ul{overflow: hidden;height: 100%;}
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
li img{width: 80%;}
</style>