<template>
    
    <div id="marketing">
    	<c-title :hide="false" text='营销工具'></c-title>
    	<div style="height: 40px;"></div>
    	<router-link to="/member/marketing">
    	<ul>
    		<li><router-link to="/member/1"><i class="fa fa-star"></i>营销工具<i class="fa fa-angle-right"></i></router-link></li>
    		<li><router-link to="/member/2"><i class="fa fa-star"></i>营销工具<i class="fa fa-angle-right"></i></router-link></li>
    		<li><router-link to="/member/3"><i class="fa fa-star"></i>营销工具<i class="fa fa-angle-right"></i></router-link></li>
    		<li><router-link to="/member/4"><i class="fa fa-star"></i>营销工具<i class="fa fa-angle-right"></i></router-link></li>
    		<li><router-link to="/member/5"><i class="fa fa-star"></i>营销工具<i class="fa fa-angle-right"></i></router-link></li>
    		<li><router-link to="/member/6"><i class="fa fa-star"></i>营销工具<i class="fa fa-angle-right"></i></router-link></li>
    		<li><router-link to="/member/7"><i class="fa fa-star"></i>营销工具<i class="fa fa-angle-right"></i></router-link></li>
    	</ul>
    	</router-link> 	
    </div>
   
</template>
<script>
import marketingcontroller from './marketingcontroller';
export default marketingcontroller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#marketing{
	a{color:#000;}
	ul{background: #FFF;overflow: hidden;}
	li{border-bottom: 1px #f0f0f0 solid;padding-left: 10px;line-height:44px;text-align: left;color: #000;}
	i{ float:left; color: #a8a8a8;font-size:26px;line-height:44px;}
	.fa-star{margin-right: 10px;}
	.fa-angle-right{color:#999;width: 20px;float: right;}
}
</style>