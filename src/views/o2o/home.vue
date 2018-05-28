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
	<div class="home">
		<div :class="{'search':'ture','mout':amout,isfollow}" id="d1">
			<div class="location" @click='tolocation'>
				<i class="fa fa-map-marker" style="margin-right:2%"></i>{{address}}<i class="fa fa-angle-down" style="margin-left:2%"></i>
			</div>
			<div class="search-form-box" @click='tosearch'>
				<i class="el-icon-search"></i> 附近商家商品
			</div>
		</div>
	</div>
<!--<c-myswipe
    :pagination-visible="true"
    :slides="$store.state.temp.default.ads"
    :repeating="true"
    :auto="3000" v-if='$store.state.temp.default'>

    <div v-for="(slide,index) in $store.state.temp.default.ads" :key="index" @click="bannerClick(slide)">

        <img width="100%" style="height:180px" :src="slide.thumb" />

    </div>
</c-myswipe>-->
		<div class="c-swipe" style="height:180px">
		<mt-swipe :auto="4000">
			<mt-swipe-item v-if="carousels" v-for="(slide,index) in carousels" :key="index"  @click.native="bannerClick(slide)">

				<img width="100%" style="height:180px" :src="slide.thumb" />

			</mt-swipe-item>

		</mt-swipe>
		</div>

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
		<!--<div class="ment" v-if='category'>
			<c-ment :datas="fun.chunk(category,10)"></c-ment>
		</div>-->
		<!--<div class="oads" v-if="ads">

			<div class="oads-right">
				<template v-for="item in ads">
					<img :src="item.img" @click="bannerClick(item)">
				</template>
			</div>
		</div>-->
		<!--<div class="oads-img">
			<img v-if="bannerData" style="width:100%;height:120px;" :src="bannerData.img"  @click="bannerClick(bannerData)">
		</div>-->
		<div>
			<c-storeList :stores='stores' text='附近的店铺'></c-storeList>
		</div>
		<div style="height: 50px;"></div>
	</div>

</template>


<script>
	import home from './home_controller';
	export default home;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	@import '../../assets/css/o2oindex.scss';
</style>
