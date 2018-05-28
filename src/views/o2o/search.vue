<template>
	<div id="search" transition="fadeInLeft">
		<div id="soso" class="uou" :class="{'mout':amout}">
			<div class="search">
				<el-button slot="prepend" icon="arrow-left" @click='goback'></el-button>
				<el-input placeholder="请输入内容" v-model="inputs" autofocus>
					<el-button slot="append" icon="search" @click='search'></el-button>
				</el-input>
<!--				<el-col :span="1">
					<i class="fa fa-th-large" v-show="view" @click="$store.commit('views')"></i>
					<i class="fa fa-th-list" v-show="!view" @click="$store.commit('views')"></i>
				</el-col>-->
			</div>
			<c-storeList :stores='stores' text='附近的店铺'></c-storeList>
		</div>
		<div style="height: 55px;display: block;"></div>
		<!--<mt-loadmore v-if="goload" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='true'>
			<c-goodsList :goods='goods' text='搜索结果' class='osll' :loading='loading'></c-goodsList>
		</mt-loadmore>-->

	</div>
</template>

<script>
import search_controller from "./search_controller";
export default search_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#search {
  .osll {
    min-height: 100vh;
    overflow: scroll;
  }
  .uou {
    position: fixed;
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