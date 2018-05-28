<template>
<div id="notice">
	<c-title :hide="false" text='举报'></c-title>
	<div style="height: 40px;"></div>
		
		 <yd-cell-group >
        <yd-cell-item>
            <yd-textarea slot="right" placeholder="请输入您的举报内容" maxlength="100" v-model="report_desc"></yd-textarea>
        </yd-cell-item>
    </yd-cell-group>

      <yd-button-group>
        <yd-button size="large" @click.native="report" type="danger">举报</yd-button>
    </yd-button-group>
</div>

</template>
<script>
import notice_report_controller from "./notice_report_controller";
export default notice_report_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#notice {
  .banner {
    height: auto;
    max-height: 150px;
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
    height: auto;
    border: 0.5px solid #dddddd;
    padding: 5px;
    background: #fff;
    width: 100%;
    border-radius: 0px;
  }

  .item_img_bg {
    width: 100%;
    height: 130px;
    margin-bottom: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .item_img {
    float: right;
    width: 100%;
    height: 120px;
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