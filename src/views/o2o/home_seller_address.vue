<template>
<div id="all">
    <c-title :hide="false" text='门店地址'></c-title>
    
       <div class="home-address-con" id="map">
           
       </div>

       <!-- <div id="result"></div> -->
   
	
</div>


</template>


<script>
	import home_seller_address from './home_seller_address_controller';
	export default home_seller_address;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	#all{
        position: fixed;
        width: 100%;
        height: 100%;
    }

    body, html,.home-address-con {width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";}

    .home-address-con{
        margin-top:40px;
    }

    
</style>
