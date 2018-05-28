<template>
    
    <div id="rechargeRecord" :class="'rechargeRecord'+$store.state.service.lang">	
       
       	<c-title :hide="false" :text='language.title'></c-title>
		<div style="height:40px"></div>
    
       <div class="main">
       		<div class="monthList" v-for="elem in datas">
       			<p class="title">订单号：{{elem.has_one_order.order_sn}}</p>
       			<ul>
       				<li @click="goDetails(elem.order_id)">
       					<div class="left">
       						<p>充值{{elem.flow}}--{{elem.mobile}}</p>
       						<span>{{elem.created_at}}</span>
       					</div>
       					<div class="right">
       						<p v-if='elem.has_one_order.status==0'>待付款</p>
       						<p v-if='elem.has_one_order.status==1'>待发货</p>
       						<p v-if='elem.has_one_order.status==2'>待收货</p>
       						<p v-if='elem.has_one_order.status==3'>交易完成</p>
       						<b>￥{{elem.price}}</b>
       					</div>
       				</li>
       			</ul>
       		</div>
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
            	language:{},
            	datas:[]
            }
        },
        methods:{
        goDetails(e){
        	this.$router.push(this.fun.getUrl('flowRechargeDetail',{orderId:e}));
        },
        // 获取记录	
	      getBalance() {
	        $http.get('plugin.flow-recharge.api.goods.rechargeRecord', {}, "加载中...").then((response)=>{
	
	          if (response.result == 1) {
	          		this.datas = response.data;

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
	.rechargeRecordch{
    	.main{
    		width: 100%;
    		overflow: auto;
    		.monthList{
    			height: auto;
    			background:#fff;
    			.title{
    				padding-left: 15px;
    				color:#FFFFFF;
    				line-height: 30px;
    				font-size: 14px;
    				text-align: left;
    				background: #39d1b6;
    				margin-bottom: 1px;
    			}
    			li{
    				height: 60px;
    				box-sizing: border-box;
    				padding:8px 15px;
    				border-bottom: 1px solid #efefef;
    				.left{
    					width: 190px;
    					float:left;
    					line-height:22px;
    					text-align:left;
    					p{
    						color:#616161;
    						font-size: 14px;
    						font-weight: 500;
    					}
    					span{
    						color:#b6b6b6;
    						font-size: 13px;
    					}
    				}
    				.right{
    					float:right;
    					width: 70px;
    					text-align: right;
    					line-height:22px;
    					p{
    						color:#ffc285;
    						text-align: right;
    						font-size: 12px;
    					}
    					b{
    						color:#424242;
    						font-size: 14px;
    					}
    				}
    			}
    			li:last-child{
    				border: none;
    			}
    		}
    	}
	}
	
	.rechargeRecordwei{
    	.main{
    		width: 100%;
    		overflow: auto;
    		.monthList{
    			height: auto;
    			background:#fff;
    			.title{
    				padding:0 15px;
    				color:#FFFFFF;
    				line-height: 30px;
    				font-size: 14px;
    				text-align: left;
    				background: #39d1b6;
    				margin-bottom: 1px;
    				text-align: right;
    			}
    			li{
    				height: 60px;
    				box-sizing: border-box;
    				padding:8px 15px;
    				border-bottom: 1px solid #efefef;
    				.left{
    					width: 190px;
    					float:right;
    					line-height:22px;
    					text-align:right;
    					p{
    						color:#616161;
    						font-size: 14px;
    						font-weight: 500;
    					}
    					span{
    						color:#b6b6b6;
    						font-size: 13px;
    					}
    				}
    				.right{
    					float:left;
    					width: 70px;
    					text-align: left;
    					line-height:22px;
    					p{
    						color:#ffc285;
    						text-align: left;
    						font-size: 12px;
    					}
    					b{
    						color:#424242;
    						font-size: 14px;
    					}
    				}
    			}
    			li:last-child{
    				border: none;
    			}
    		}
    	}
	}
</style>-->
