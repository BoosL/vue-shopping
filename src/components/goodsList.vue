<template>
	<div id="goodslist">
		<h3><div class="title">{{text}}</div><div class="spas"></div></h3>
		<div class="mai">
			
			<div class="main" v-show='view'>			
				<dl v-for="item in goods" @click="gotoDetail(item.goods_id)">	
					<!-- <router-link :to="fun.getUrl('goods',{ id: item.goods_id })"> -->
					<dt v-if="item.thumb"><img v-lazy="item.thumb"/></dt>
					<dt v-if="!item.thumb"><img src="../assets/images/img_default.png"/></dt>
					<dd class="m-text">{{item.title}}</dd>
					<dd class="s3"><p class="s1"><span class="s">￥<em>{{item.price}}</em> </span><span class="s2">￥{{item.market_price}}</span> </p>
					</dd>
					<!-- </router-link> -->
				</dl>			
			</div>
			<div class="main2" v-show='view==false'>
					<div class="list" v-for="items in goods"  @click="gotoDetail(items.goods_id)">
						<div class="imgs">
							<!-- <router-link :to="fun.getUrl('goods',{ id: items.goods_id })" v-if='items.thumb'><img v-lazy="items.thumb"/></router-link>
							<router-link :to="fun.getUrl('goods',{ id: items.goods_id })" v-if='!items.thumb'><img src="../assets/images/img_default.png"/></router-link> -->
							<img v-lazy="items.thumb" v-if='items.thumb'/>
							<img src="../assets/images/img_default.png" v-if='!items.thumb'/>
						</div>
						<div class="shop_info">
							<!-- <h4><router-link :to="fun.getUrl('goods',{ id: items.goods_id })">{{items.title}}</router-link></h4>
							<span><router-link :to="fun.getUrl('goods',{ id: items.goods_id })">￥{{items.price}}</router-link></span>	 -->
							<h4>{{items.title}}</h4>
							<span>￥{{items.price}}</span>
						</div>
					</div>
				
			</div>	
		</div>

		<div class="loadNomore" v-show='loading'><img src="../assets/images/no-more-product.png"/></div>
	</div>
</template>

<script>
	import { Lazyload } from 'mint-ui';
	import { InfiniteScroll } from 'mint-ui';
	import { mapState } from 'vuex';
	export default {
		props: ['goods', 'text', 'loadMore','loading','disabledt'],
		data() {
			return {
				list:[0],
				toi:this.fun.getKeyByI(),
				types:this.fun.getTyep(),
            }
		},
		methods: {
			bgoo(){
				//this.$router.push({name:'goods',params:{id:8},query:{i:2}});
				this.$router.push(this.fun.getUrl('goods',{id:13}));
			},
			//跳转至详情
			gotoDetail(id){
				$http.get("goods.goods.get-goods",{id:id},"加载中...").then(response =>{
                if(response.result == 1){
                    if(response.data.is_course == 1){
                        this.$router.push(this.fun.getUrl('CourseDetail',{goods_id:id}));
                    }else{
                        this.$router.push(this.fun.getUrl('goods',{id:id}));
                    }
                }
				}).catch(error =>{
					console.log(error);
				})
			}
		},
		computed: mapState(["view"])
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	#goodslist {
		background: #f5f5f5;

		a{color: #2b2f33;}
		.main2{
			.list{display: flex;align-items: stretch;  background: #ffffff;}
			.imgs{flex:1;box-sizing: border-box;padding:10px;padding-right: 0;    
			overflow: hidden;
					img {width: 100%;}
				}
			.shop_info{flex: 3;box-sizing: border-box;padding:10px;display: flex;
			flex-direction:column;
				h4{display: inline; word-break: break-all;font-weight: 
				normal;text-align:justify;padding: 0;margin: 0;flex: 3;}
				span{ flex: 1;text-align: right; a{color: #f23030; font-weight: bold;
				margin-top: 10px;}}
			}
			
		}
		.loadNomore img{width: 20%;}
		h3 {
			width: 65%;
			position: relative;
			margin:0 auto 15px;
			height: 20px;
			padding: 10px 0 0;
			.title {
				width: 33%;
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
		.mai {
			width: 100%;
			overflow: hidden;
		}
		.main {
			overflow: hidden;
			margin-right: -1px;
			background: #f5f5f5;

			dl:nth-child(2n){margin-right: 0}

			dl {
				padding: 0;
				/*border-bottom: 1px solid #f5f5f5;
				border-right: 1px solid #f5f5f5;*/
				box-sizing: border-box;
				-moz-box-sizing: border-box;
				-webkit-box-sizing: border-box;
				float: left;
				margin-bottom: 2vw;
				margin-right: 2vw;
				background: #fff;
				width: 49vw;

				dt{height: 50vw;line-height: 82vw;}
				dt{width:100%;
					height:0px;
					padding-bottom:100%;
					position:relative;
				img {
					width: 100%;

					right:0;
					height:100%;
					position:absolute;
				}}
				.s3 {
					height: 25px;
					display: block;
					/* line-height: 30px; */
					text-align: left;
					margin: 0 5px;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					word-break: break-all;
					overflow: hidden;

				}
				dd {
					margin: 0;
					.s1 {margin:0;
						.s {color: #F55955;
						font-size: 12px;
						vertical-align: middle;}


						em{font-size: 16px;font-style: normal}
					}
					.s2 {
						text-decoration: line-through;
						vertical-align: middle;
						color: #888;
						font-size: 12px;
						margin-left: 10px;
					}
				}
				.m-text {
					font-size: 14px;
					margin: 5px;
					height: 42px;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					word-break: break-all;
					overflow: hidden;
					line-height: 1.34rem;
					text-align: justify;
				}
			}
		}
	}
</style>