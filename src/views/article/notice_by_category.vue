<template>
<div id="notice">
	<c-title :hide="false" :text='title'></c-title>
	<div style="height: 40px;"></div>
  <mt-loadmore v-if="goload" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="coupon_loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='false' id='olis'>
			<div class="item" v-for="item in datas" @click="toNoticeInfo(item)">
				<div class="item_bg" >
				<p class="item_title">{{item.title}}</p>
				<p class="item_time">{{item.updated_at}}</p>
					<div class="item_img_bg" @click="toNoticeInfo(item)" v-if='item.thumb'><img class="item_img" :src="item.thumb"/></div>
        	<div class="item_img_bg" @click="toNoticeInfo(item)" v-if='!item.thumb'><img class="item_img" src="../../assets/images/img_default.png"/></div>
				<div class="item_desc">{{item.desc}}</div>
				</div>
			</div>
		 </mt-loadmore>
</div>

</template>
<script>
import notice_by_category_controller from "./notice_by_category_controller";
export default notice_by_category_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#notice {
  .banner {
    height: auto;
    max-height: 400px;
    width: 100%;
  }
  .item {
    margin: 5px;
  }
  .item_lin {
    height: 30px;
    background: #fff;
  }
  .item_bg {
    border: 0.5px solid #dddddd;
    padding: 5px;
    background: #fff;
    width: 100%;
    border-radius: 0px;
  }

  .item_img_bg {
    width: 100%;
    margin-bottom: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .item_img {
    width: 100%;
    max-height: 400px;
  }
  p.item_title {
    padding-left: 5px;
    padding-right: 5px;
    text-align: left;
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
  }
  p.item_time {
    width: 50%;
    float: left;
    padding-left: 5px;
    padding-right: 5px;
    text-align: left;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #8a8a8a;
  }
  p.item_category {
    width: 50%;
    float: left;
    padding-left: 5px;
    padding-right: 5px;
    text-align: right;
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    color: #FB0207;
    font-weight: bold;
  }
  .item_desc {
    padding-left: 5px;
    padding-right: 5px;
    text-align: left;
    font-size: 14px;
    color: #8a8a8a;
  }
}
</style>