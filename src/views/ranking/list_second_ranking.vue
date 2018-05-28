<template>
	<div id="commission">
		<c-title :hide="false" :text="title"></c-title>
		<div style="height: 40px;"></div>
<!-- 
      <div v-for="item in datas" @click="toList(item)">

        <div class="tbs" >
				  <div class="item1">{{item.name}}</div>
        
			  </div>
    	</div> -->

<template>
				<yd-cell-group>
					<yd-cell-item arrow type="link" v-for="item in datas" :href="fun.getUrl('rankingListFirst',{'action':nextAction,'key':item.key,'title':title})">
						<span slot="left">{{item.name}}</span>
						<span slot="right"></span>
					</yd-cell-item>
				</yd-cell-group>
			</template>

	</div>
</template>
<script>
import list_second_ranking_controller from "./list_second_ranking_controller";
export default list_second_ranking_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#commission {
  .times {
    text-align: left;
    text-indent: 10px;
    line-height: 2rem;
    background: #dddddd;
  }
  .tbs {
    background: #fff;
    overflow: hidden;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 10px 0 10px;
    border-bottom: 1px solid #d9d9d9;

    .item1 {
      color: #000;
      flex: 50%;
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: left;
      font-size: 14px;
      padding-left: 15px;
    }
    .item2 {
      flex: 50%;
      text-align: right;
      color: #a79d9d;
      padding-right: 15px;
      .reg {
        color: #259b24;
      }
      .unreg {
        color: #d9d9d9;
      }
    }
  }
}
</style>