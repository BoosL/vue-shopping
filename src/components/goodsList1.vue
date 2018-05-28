<template>
	<div id="goodslist">
		<h3><div class="title">{{text}}</div><div class="spas"></div></h3>
		<div class="mai">
			
			<!--<div class="main" v-show='view'>			
				<dl v-for="item in goods">	
					<router-link :to="fun.getUrl('goods',{ id: item.goods_id })">
					<dt v-if="item.thumb"><img v-lazy="item.thumb"/></dt>
					<dt v-if="!item.thumb"><img src="../assets/images/img_default.png"/></dt>
					<dd class="m-text">{{item.title}}</dd>
					<dd class="s3"><p class="s1"><span class="s">￥<em>{{item.price}}</em> </span><span class="s2">￥{{item.market_price}}</span> </p>
					</dd>
					</router-link>
				</dl>			
			</div>-->
			<div class="main2" v-show='true'>
					<div class="list" v-for="(items,index) in goods">
						<div class="imgs" v-if="index>=num">
							<router-link :to="fun.getUrl('goods',{ id: items.goods_id })" v-if='items.thumb'><img v-lazy="items.thumb"/></router-link>
							<router-link :to="fun.getUrl('goods',{ id: items.goods_id })" v-if='!items.thumb'><img src="../assets/images/img_default.png"/></router-link>
						</div>
						<div class="shop_info" v-if="(index>=num)">
							<div class="proTit"><router-link :to="fun.getUrl('goods',{ id: items.goods_id })">{{items.title}}</router-link></div>
							<span><router-link :to="fun.getUrl('goods',{ id: items.goods_id })">￥{{items.price}}</router-link></span>	
							<span><router-link :to="fun.getUrl('goods',{ id: items.goods_id })">分红 ￥{{items.bonus_money}}</router-link></span>	
						</div>
						
						<!--<div class="shop_info" v-if="!isSelect&&(index>num)">
							<h4 class="specialH"><router-link :to="fun.getUrl('goods',{ id: items.goods_id })">{{items.title}}</router-link></h4>
							<span><router-link :to="fun.getUrl('goods',{ id: items.goods_id })">￥{{items.price}}</router-link></span>	
							<span><router-link :to="fun.getUrl('goods',{ id: items.goods_id })">分红 ￥{{items.price}}</router-link></span>	
						</div>-->
						
						<div class="add noActive" v-if="!selectedGoods[items.goods_id]&&(index>=num)" @click="addGood($event,items.goods_id)">
							
						</div>
						<div class="add active" v-if="selectedGoods[items.goods_id]&&(index>=num)" @click="addGood($event,items.goods_id)">
							
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
		props: ['goods', 'text', 'loadMore','loading','disabledt',"isSelect","num","selectedGoods"],
		data() {
			return {
				list:[0],
				toi:this.fun.getKeyByI(),
				types:this.fun.getTyep(),
				//selectedGoods:{},//用来存贮已选商品，以商品ID为键，true或FALSE表示选中或者未选中
			}
		},


		methods: {
			bgoo(){
				//this.$router.push({name:'goods',params:{id:8},query:{i:2}});
				this.$router.push(this.fun.getUrl('goods',{id:13}));
			},
			
			// 选择商品的方法
			addGood(e,val){
//				通过该对象的属性（属性为具体的商品ID）的真假值来判断是否选中
				this.selectedGoods[val] = !this.selectedGoods[val];
			
				let num=0;
				
				//计算已经选中的商品个数，通过遍历对象查找对象属性为true的个数
				for(var key in this.selectedGoods){
					if(this.selectedGoods[key]){
						num++;
					}
				}
				
//				向外传递已选商品的个数
				this.$emit("selectTotal",this.selectedGoods);
				
				//更改选中之后的样式
				if(this.selectedGoods[val]){
					e.target.className="imgs add active";
				}else{
					e.target.className="imgs add noActive";
				}
			}
		},
		computed: mapState(["view"])
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#goodslist {
  background: #f5f5f5;

  a {
    color: #2b2f33;
  }
  .main2 {
    .list:first-child {
    }
    .list {
      display: flex;
      align-items: stretch;
      background: #ffffff;
      margin-bottom: 6px;
      height: 95px;
    }
    .imgs {
      flex: 2;
      box-sizing: border-box;
      padding: 10px;
      padding-right: 0;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }

      /*.addImg{
						margin: 10px auto;
						width: 40px;
						height: 40px;
						background-image: url(../assets/images/add.png) ;
						background-size: 40px 40px;
						border-image-repeat: no-repeat;
					}*/
    }
    .add {
      flex: 1;
      box-sizing: border-box;
      padding: 10px;
      padding-right: 0;
      overflow: hidden;
    }
    .noActive {
      background: url(../assets/images/add.png) no-repeat 16px 40px;
      background-size: 20px 20px;
    }
    .active {
      background: url(../assets/images/addcheck.png) no-repeat 16px 40px;
      background-size: 20px 20px;
    }

    .shop_info {
      flex: 6;
      box-sizing: border-box;
      padding: 10px;
      display: flex;
      flex-direction: column;
      /*h4{display: inline; word-break: break-all;
				font-weight: normal;text-align:justify;padding: 0;margin: 0;
				flex: 6;overflow:hidden; text-overflow:ellipsis; line-height:20px;height:40px;
				display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2; }*/
      .proTit {
        font-weight: normal;
        text-align: justify;
        padding: 0;
        margin: 0;
        line-height: 20px;
        height: 40px;
        overflow: hidden;
        width: 90%;
      }
      span {
        flex: 1;
        text-align: left;
        a {
          color: #f23030;
          font-weight: bold;
          font-size: 12px;
        }
      }
      .specialH {
        width: 100%;
      }
    }
  }
  .loadNomore img {
    width: 20%;
  }
  h3 {
    width: 65%;
    position: relative;
    margin: 0 auto 15px;
    height: 20px;
    padding: 10px 0 0;
    .title {
      width: 45%;
      text-align: center;
      padding: 0 10px;
      background: #f5f5f5;
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

    dl:nth-child(2n) {
      margin-right: 0;
    }

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

      dt {
        height: 50vw;
        line-height: 82vw;
      }
      dt {
        width: 100%;
        height: 0px;
        padding-bottom: 100%;
        position: relative;
        img {
          width: 100%;

          right: 0;
          height: 100%;
          position: absolute;
        }
      }
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
      }
      dd {
        margin: 0;
        .s1 {
          margin: 0;
          .s {
            color: #f55955;
            font-size: 12px;
            vertical-align: middle;
          }

          em {
            font-size: 16px;
            font-style: normal;
          }
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