<template>    
    <div id="rechargeDetail" :class="'rechargeRecord'+$store.state.service.lang">	
       	<c-title :hide="false" :text='language.title'></c-title>
		<div style="height:40px"></div>
       <div class="main">
			<ul>
				<li>订单号:</li><li style="flex: 6;">{{order_sn}}</li><li v-if="datas.has_one_order">{{datas.has_one_order.status_name}}</li>
			</ul>
			<div class="bott">
			<!--<ul>
				<li>商品名称</li><li>{{datas.goods_name}}</li><li style="flex: 6;"></li>
			</ul>-->
			<ul>
				<li>手机号码:</li><li style="flex: 8;">{{datas.mobile}}</li>
			</ul>
			<!--<ul>
				<li>归属地 </li><li style="flex: 8;">{{datas.vest}}</li>
			</ul>			-->
			<ul>
				<li>充值面额:</li><li style="flex: 8;">{{datas.amount}}</li>
			</ul>
			</div>
			<ul>
				<li>支付方式:</li><li style="flex: 8;text-align: right;" v-if="datas.has_one_order">{{datas.has_one_order.pay_type_name}}</li>
			</ul>			

			<div class="bott">
			<ul>
				<li>商品金额:</li><li style="flex: 8;text-align: right;">￥{{datas.price}}</li>
			</ul>
			<ul>
				<li>积分抵扣:</li><li style="flex: 8;text-align: right;">{{amount}}</li>
			</ul>
			<ul>
				<li>需付款:</li><li style="flex: 3;text-align: right;">￥{{datas.price}}</li>
			</ul>
			<ul>
				<li>下单时间:</li><li style="flex: 5;text-align: right;" v-if="datas.has_one_order">{{datas.has_one_order.create_time}}</li>
			</ul>			
			</div>
       </div>
       <div id="bts" v-if="onBts">
       	<!--<button type="button" @click="goSubmit">取消订单</button>-->
       	<button type="button" @click="goSubmit">去支付</button>
       </div>
    </div>
</template>

<script>
import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
    export default{
    	components: { cTitle },
        data(){
            return{
            	goods_id:'',
            	option_id:'',
            	order_sn:'',
            	onBts:false,
            	amount:0,
            	language:{},
            	datas:[]
            }
        },
        methods:{
        // 提交支付	
        goSubmit(){
			this.$router.push(this.fun.getUrl('orderpay', { status: "2", order_ids: this.datas.order_id }));     	
        },
       
        goDetails(e){
        	this.$router.push(this.fun.getUrl('goods',{id:e}));
        },
        // 获取记录	
	      getBalance() {
	        $http.get('plugin.recharge.api.goods.rechargeDetail', {orderId:this.$route.params.orderId}, "加载中...").then((response)=>{
	
	          if (response.result == 1) {
	          		this.datas = response.data;
	          		this.order_sn = response.data.has_one_order.order_sn;
	          		this.amount = response.data.has_may_order_deduction[0].amount;
	          		this.goods_id = response.data.has_one_order.has_many_order_goods[0].goods_id;
	          		this.option_id = 1;
	          		// 0=待付款   1=待发货  2= 3=交易完成
	          		if(response.data.has_one_order.status == 0){
	          			this.onBts = true;
	          		}

	          } else {
	             MessageBox.alert(response.msg);
	          }
	
	        }, function (response) {
	           MessageBox.alert(response);
	        });
	    }			
        },
        //实时监测this.$store.state.service.chinese的变化，获取最新的语言包
		computed: {
			  	getLangState() {
					return this.$store.state.service.languageService;
			  	}
		},
		watch: {
		  	getLangState(val) {
			   	if(val){
					this.language=JSON.parse(sessionStorage.languageService).rechargeRecord;
				}else{
					this.language=this.$store.state.service.languageService.rechargeRecord;
				}
		  	}
		},
		
		mounted(){
			if(sessionStorage.languageService){
				this.language=JSON.parse(sessionStorage.languageService).rechargeRecord;
			}else{
				this.language=this.$store.state.service.languageService.rechargeRecord;
			}
		},
		
		activated(){
			this.getBalance();
			this.$store.commit('onload');
		},
        
    }

</script>

<style  lang="scss" rel="stylesheet/scss" scoped>
	#rechargeDetail{
		font-size: .7rem;
 		.main{
 			.bott{background: #FFF;}
 			ul{display: flex;align-items: center;background: #FFF;margin-bottom: 10px;
 				li{flex: 2; line-height: 1.5rem;text-align: left;padding: 0 10px;box-sizing: border-box;}
 			}
 		}
 		#bts{position: fixed;bottom: 0;width: 100%;background: #FFF;line-height: 2rem;z-index: 9;height: 2.7rem;text-align: right;
 			button{ height: 1.5rem; margin:0 10px;background: #fff;padding: 0 10px;margin-top: 10px; border-radius: 5px;color: #5f6e8b;
    line-height: 1.5rem; border: 1px solid #5f6e8b;}
 		}
	}
</style>-->
