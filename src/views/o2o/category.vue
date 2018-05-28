<template>
<div id="search" transition="fadeInLeft">
<c-title :hide="false" text='搜索'></c-title>
<div style="height: 40px;display: block;"></div>
		<div id="soso" class="uou" :class="{'mout':amout}">
			<c-storeList :stores='stores' text='搜索店铺'></c-storeList>
		</div>
		<div style="height: 55px;display: block;"></div>
		<!--<mt-loadmore v-if="goload" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='true'>
			<c-goodsList :goods='goods' text='搜索结果' class='osll' :loading='loading'></c-goodsList>
		</mt-loadmore>-->

	</div>
</template>

<script>
import category_controller from "./category_controller";
export default category_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#search {
  .osll {
    min-height: 100vh;
    overflow: scroll;
  }
  .uou {
    z-index: 99;
    top: 0px;
    transition: 0.2s;
    -webkit-transition: 0.2s;
  }
  .mout {
    top: -36px;
  }
}
.search {
  overflow: hidden;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
  .el-button.el-button--default {
    float: left;
    width: 10%;
    border: none;
    padding-top: 16px;
  }
  .el-input.el-input-group.el-input-group--append {
    float: left;
    width: 80%;

    margin-left: 2%;
    height: 45px;
  }
  .el-input-group__append .el-button.el-button--default {
    background: #f5f5f5;
    padding-top: 9px;
    line-height: 16px;
    padding-right: 29px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .el-input.el-input-group.el-input-group--append .el-input-group__append {
    background: #f5f5f5;
  }
  .el-col-1 {
    margin: 12px 0px;
    color: #666;
    font-size: 16px;
  }
}
</style>