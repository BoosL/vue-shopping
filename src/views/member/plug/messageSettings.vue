<template>
    
    <div id="messageSettings">
    	<c-title :hide="false" text='消息提醒设置'></c-title>
    	<div style="height: 40px;"></div>
    	<h4>商城信息 提醒</h4>
    	<mt-cell :title="'选项 ' + value">
      		<mt-switch v-model="value" @change="switchItme"></mt-switch>
    	</mt-cell>
    	<mt-cell :title="'选项 ' + value">
      		<mt-switch v-model="value" ></mt-switch>
    	</mt-cell>
    	<mt-cell :title="'选项 ' + value">
      		<mt-switch v-model="value" ></mt-switch>
    	</mt-cell>
    </div>
   
</template>
<script>
import messageSettingsController from './messageSettingsController';
export default messageSettingsController;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>

#messageSettings{
	.mint-cell-title {text-align: left;}
	h4{margin: 0;line-height: 2.5rem;text-align: left;font-size: 1rem;font-weight: normal;padding-left: 10px;}
	a{color:#000;}
	ul{background: #FFF;overflow: hidden;}
	li{border-bottom: 1px #f0f0f0 solid;padding-left: 10px;line-height:44px;text-align: left;color: #000;}
	i{ float:left; color: #a8a8a8;font-size:26px;line-height:44px;}
	.fa-star{margin-right: 10px;}
	.fa-angle-right{color:#999;width: 20px;float: right;}
}
</style>