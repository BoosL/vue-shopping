<template>
<div id="all">
<c-title hide="true" text='home' :eteos="fun.setWXTitle($store.state.temp.item.janst)"></c-title>

	<header :class="{amout}" v-if='isfollow'>
					
			<!--用户进入商城，判断是否关注公众号-->
			<div class="attention">
				<img :src="follow_mode.logo">
				<!--用户分享时显示用户头像，不是分享进入页面显示商城logo-->

				<div class="text">
					<p> 来自<span>{{follow_mode.text}}</span>的推荐</p>

					<!--用户分享时显示用户名；不是分享进入页面时，显示商城名-->

					<p>关注公众号，享专属服务</p>
				</div>

				<button><a :href="follow_mode.url"> 立即关注</a></button><!--跳转至后台设置页面-->
			</div>


	</header>		
	<div class="home" v-if="$store.state.temp.default">	
		<div :class="{'search':'ture','mout':amout,isfollow}" id="d1">
			<div class="search-form-box" @click='tosearch'><i class="el-icon-search"></i>{{ $store.state.langService.language.langHome.search }}</div>
		</div>

<c-myswipe
    :pagination-visible="true"
    :slides="$store.state.temp.default.ads"
    :repeating="true"
    :auto="3000" v-if='$store.state.temp.default'>

    <div v-for="(slide,index) in $store.state.temp.default.ads" :key="index" @click="bannerClick(slide)">
     
        <img width="100%" :src="slide.thumb" />
     
    </div>
</c-myswipe>		 
		
<!--<div class="my-swipe">
<swipe style="height: 130px;" :lengths='555'>
			<swipe-item v-for="item in bannerData">
				<template v-if='item.thumb'><img :src="item.thumb" width="100%"></template>
				<template v-if='!item.thumb'><img src="../../assets/images/img_default.png"></template>
			</swipe-item>
</swipe>
</div>-->
	<!--<div class="m-swipe">
		<mt-swipe :auto="0" :stopPropagation='true' :prevent='true' :continuous='false'>
			<mt-swipe-item v-for="item in bannerData">
				<template v-if='item.thumb'><img :src="item.thumb"></template>
				<template v-if='!item.thumb'><img src="../../assets/images/img_default.png"></template>
			</mt-swipe-item>
		</mt-swipe>
	</div>-->
		<div class="ment" v-if='$store.state.temp.default'>
			<c-ment :datas="fun.chunk($store.state.temp.default.category,8)"></c-ment>
		</div>
		<div class="goodsList" v-if='$store.state.temp.default'>
			<c-goodsList :goods='$store.state.temp.default.goods' text='推荐商品'></c-goodsList>
		</div>
		<div style="height: 50px;"></div>
	</div>



<div class="temp" v-if='$store.state.temp.item'>
		<div class="home" v-if='$store.state.temp.item.pageinfo'>
			<template v-if="$store.state.temp.item.pageinfo.temp=='topbar'">
	<!-- 浮动按钮 -->
	<div class="fe-floatico" v-if="$store.state.temp.item.pageinfo.params.floatico==1" :style="{'position':'fixed','width':$store.state.temp.item.pageinfo.params.floatwidth,'top':$store.state.temp.item.pageinfo.params.floattop}" :class="{'fe-floatico-right':$store.state.temp.item.pageinfo.params.floatstyle=='right'}">
	    <a :href="$store.state.temp.item.pageinfo.params.floathref"><img :src="$store.state.temp.item.pageinfo.params.floatimg || './static/app/app/images/init-image-7.png'" style="height:100%; width: 100%;" /></a>
	</div>
</template>
		<div class="home" v-if="$store.state.temp.item.data">
			<template v-for="item in $store.state.temp.item.data">
				<component :is="item.temp" :datas='item'></component>
			</template>
			<div style="height: 53px;"></div>
		</div>
		</div>
	</div>	
	 
	<!--<div class="temp" v-if='$store.state.temp.item'>
		<div class="home" v-if="$store.state.temp.item.data">
			<template v-for="item in $store.state.temp.item.data">
				<component :is="item.temp" :datas='item'></component>
			</template>
			<div style="height: 53px;"></div>
		</div>
	</div>-->
</div>
</template>


<script>
	import home from './home_controller';
	export default home;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	@import '../../assets/css/index.scss';
</style>