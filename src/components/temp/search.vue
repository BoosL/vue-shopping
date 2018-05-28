<template>
<div id="search" :style="{background:datas.params.bgcolor}" @click="tosearch">
	<div id="soso" :style="{borderColor:datas.params.bordercolor,color:datas.params.color}">
		<i class="el-icon-search" :class="{style1:datas.params.style!='style1'}"></i>{{datas.params.placeholder}}
	</div>
</div>
</template>
<script>

  export default {
    props: ['datas'],
    mounted(){

    },
    methods:{
        tosearch() {
            this.$router.push(this.fun.getUrl('search',{}));
            //this.$router.push(this.fun.getUrl('search',{kyes:this.datas.params.placeholder}));
        },		
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	#search{
		padding: 10px;
		#soso{border:1px solid #ccc;background: #FFF;padding: 7px 5px; text-align: left;
			i{color: #999;line-height: 1.3rem;}
			i.style1{float: right;}
		}
	}
</style>