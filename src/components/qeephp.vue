<template>
	<div>
  <h1 v-if="!hide">{{ zhong }}</h1>
  
	</div>
</template>

<script>
  export default {
    props: ['zhong', 'hide'],
    mounted: function () {
      //document.title = this.zhong;
    }
  }
</script>