<template>
	<div id="goodslist">
		<h3><div class="title">{{text}}</div><div class="spas"></div></h3>
		<div class="store">
			<div  @click="toRouter(items.id)" v-for="items in stores">
				<div class="list">
					<div class="store-img" @click.stop="toSeller(items.id)">
						<a class="store-logo" >
						<img :src="items.thumb">
						</a>
					</div>
					<div class="store-intro">
						<div class="a8q ">
							<h2 class="">{{items.store_name}}</h2>
							<div class="store_honor_box">
								<span class="store_honor_icon">距离{{items.distance}}{{items.unit}}</span>
							</div>
						</div>
						<div class="a06 a8r">
							<strong class="i8">
								<span class="da">{{items.dispatch}}</span>
							</strong>
						</div>
						<div class="a8v">
							<p class="a8d">
								<span class="a79 clearfix"><i></i><i></i><i></i><i></i><i class="zo"></i></span>
							</p>
							<p class="a8w">
								<span class="line_split"></span>月售{{items.order_total}}单
							</p>
						</div>
					</div>
				</div>
			</div>

		</div>

		<div class="loadNomore" v-if="stores.length == 0"><img src="../assets/images/no-more-product.png"/></div>
	</div>
</template>

<script>
	import { Lazyload } from 'mint-ui';
	import { InfiniteScroll } from 'mint-ui';
	import { mapState } from 'vuex';
	export default {
		props: ['stores', 'text'],
		data() {
			return {
				list:[],
				toi:this.fun.getKeyByI(),
				types:this.fun.getTyep(),
            }
		},
		methods: {
			bgoo(){
				//this.$router.push({name:'goods',params:{id:8},query:{i:2}});
				this.$router.push(this.fun.getUrl('goods',{id:13}));
			},

			toSeller(id){
				this.$router.push({name:'HomeSeller',params:{store_id:id},query:{i:this.toi}})
			},

			toRouter(id){
				this.$router.push({name:'o2oStore',params:{store_id:id},query:{i:this.toi}})
			}
		},
		computed: mapState(["view"])
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	#goodslist {
		background: #f5f5f5;
		.loadNomore img{width: 20%;}
		h3 {
			width: 65%;
			position: relative;
			margin:0 auto 15px;
			height: 20px;
			padding: 10px 0 0;
			.title {
				width: 38%;
				text-align: center;
				padding: 0 10px;
				background: #F5F5F5;
				position: absolute;
				z-index: 9;
				left: 0;
				right: 0;
				margin: auto;
				font-size: 14px;
				color: #666;
			}
			.spas {
				border-bottom: 1px solid #d9d9d9;
				position: absolute;
				z-index: 5;
				top: 20px;
				width: 100%;
			}
		}
		.store {
			height: auto;
			width: 100%;
			background: #fff;
			margin-top: 10px;
			border-bottom: 1px solid #f5f3f3;
			.list {
				position: relative;
				padding: 15px 10px;
				min-height: 70px;
				border-top: 1px solid #e7e9e4;
				width: 97%;
				background: #fff;
				font-size: .9rem;
				color: #333;
				text-align: left;
				.store-img{
					position: relative;
					.store-logo{
						position: absolute;
						left: 10px;
						top: 0;
						bottom: 0;
						float: none;
						width: 64px;
						height: 64px;
					}
					img{
						float: left;
						width: 100%;
						height: 100%;
						border-radius: 4px;
						border: 1px solid #e8e8e8;
						display: inline-block;
						margin-right: 8px;
					}
				}
				.store-intro{
					position: relative;
					margin-left: 90px;
					.a8v{
						height: 14px;
						margin-top: 8px;
						overflow: hidden;
						font-size: 0;
						.a8d{
							height: 12px;
							padding-top: 2px;
							overflow: hidden;
							display: inline-block;
							position: relative;
							.a79{
								display: inline-block;
								font-size: 0;
								i{
									display: inline-block;
									width: 10px;
									height: 10px;
									background-position: 0 0;
									background-image: url(//static-o2o.360buyimg.com/daojia/new/images/icon/newStar.png);
									background-repeat: no-repeat;
									background-size: auto 10px;
									margin-right: 1px;
								}
								.zo{
									background-position: -10px 0;
								}
							}
						}
						.a8w{
							font-size: 11px;
							line-height: 14px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							color: #999;
							display: inline-block;
							.line_split{
								display: inline-block;
								width: 8px;
								height: 10px;
								background: url(//static-o2o.360buyimg.com/daojia/new/images/index/icon_line_split.jpg) no-repeat center 2px;
							}
						}

					}
					.a8r{
						font-size: 0;
						padding-top: 10px;
						overflow: hidden;
						.i8{
							display: inline-block;
							border: 1px solid #16A9ff;
							font-size: 0;
							border-radius: 2px;
							color: #16a9ff;
							line-height: 0;
							height: 15px;
							overflow: hidden;
							.da{
								display: inline-block;
								line-height: 1;
								padding: 2px;
								font-size: 10px;
							}
							.db{
								line-height: 1;
								font-size: 10px;
							}
							.a9a{
								display: inline-block;
								padding: 2px;
								line-height: 1;
								font-size: 10px;
							}
						}
					}
					.a8q{
						height: 20px;
						line-height:20px;
						overflow: hidden;
						display: -webkit-box;
						display: -moz-box;
						display: -ms-box;
						display: flex;
						-moz-flex: 1;
						-webkit-flex: 1;
						-ms-flex: 1;
						flex: 1;
						h2{
							font-size: 16px;
							color: #333;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							display: inline-block;
							margin-top: 0;
							font-weight: bold;
							-webkit-flex: 1;
							-moz-flex: 1;
							-ms-flex: 1;
							flex: 1;
						}
						.store_honor_icon{
							display: inline-block;
							width: 88px;
							height: 20px;
							font-size: 12px;
							text-align: right;
							margin-right: 2px;
							background-position: center center;
							background-repeat: no-repeat;
							background-size: 16px auto;
						}
					}
				}
			}
		}
	}
</style>
