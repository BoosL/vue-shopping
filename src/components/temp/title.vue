<template>
<div id="title">
	<div v-if="!datas.params == ''" :style="{ background: datas.params.bgcolor ,color:datas.params.color,textAlign:datas.params.align}">
	<h3 :style="{fontSize: datas.params.fontsize1}" v-if='datas.params.title1'>{{datas.params.title1}}</h3>
	<h4 :style="{fontSize: datas.params.fontsize2}" v-if='datas.params.title2'>{{datas.params.title2}}</h4>
	</div>

</div>
</template>
<script>
  export default {
    props: ['datas'],
    mounted(){

    },
    methods:{

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	#title{
		h3,h4{padding: 2px 0;}
		div{padding: 10px;}
	}
</style>