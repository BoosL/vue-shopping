<template>
<div id="info">
	<mt-button @click.native="popupVisible4 = true" size="large">下侧弹出 popup</mt-button>
	 <mt-popup v-model="popupVisible4" position="bottom" class="mint-popup-4" closeOnClickModal='true'>
     内容
    </mt-popup>
</div>
</template>
<script>
import { Popup } from 'mint-ui';
 export default {
    data() {
      return {
        toi:window.localStorage.i,
        popupVisible4: false,
        buttonBottom: 0 
      };
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.mint-popup-4{width: 100%;height: 100px;}
</style>