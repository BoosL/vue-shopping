<template>

 	<div id="oilDetailsPaied" :class="'oilDetailsPaied'+$store.state.service.lang">	
       
       	<c-title :hide="false" :text='language.title'></c-title>
		<div style="height:40px"></div>
    	
        <div class="main">
       		<div class="title">
       			<p>{{language.orderNum}}{{data.numId}}</p>
       			<span>{{data.status}}</span>
       		</div>
       		<div class="top normal">
       			<ul>
       				<li>{{language.goodsName}}<span>{{data.productName}}</span></li>
       				<li>{{language.tele}}<span>{{data.phoneNum}}</span></li>
       				<li>{{language.addr}}<span>{{data.place}}</span></li>
       			</ul>
       		</div>
       		<div class="middle normal">
       			<ul>
       				<li>{{language.rechargeNum}}<span>{{data.denomination}}元</span></li>
       				<li>{{language.flowNum}}<span>{{data.totalSize}}M</span></li>
       			</ul>
       		</div>
       		<div class="content normal">
       			<ul>
       				<li>{{language.goodsMoney}}<span>￥{{data.money}}</span></li>
       				<li>{{language.scorePay}}<span>-{{data.scoreDel}}</span></li>
       				<li>{{language.payStyle}}<span>{{data.payMethod}}</span></li>
       			</ul>
       		</div>
       		<div class="bottom">
       			<b>{{language.needPay}}</b><b>{{data.payNum}}</b><br />
       			<span class="orderTime">{{language.orderTime}} </span><span>{{data.date}}</span>
       		</div>
       		
       </div>
       
    </div>
</template>

<script>
import cTitle from 'components/title';
    export default{
    	components: { cTitle },
        data(){
            return{
            	language:{},
            	data:{
            		numId:"12345689",
            		status:"已支付",
            		productName:"20快充  黑龙江省内通用流量充值",
            		phoneNum:"12345678901",
            		place:"黑龙江省哈尔滨市",
            		denomination:20,
            		totalSize:200,
            		money:"19.9x2",
            		scoreDel:"4.00",
            		payMethod:"-----",
            		payNum:"30.00",
            		date:"2017-05-01 11:00:00"
            	}
            }
        },
        methods:{
			
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
					this.language=JSON.parse(sessionStorage.languageService).oilDetailsPaied;
				}else{
					this.language=this.$store.state.service.languageService.oilDetailsPaied;
				}
		  	}
		},
		
		mounted(){
			if(sessionStorage.languageService){
				this.language=JSON.parse(sessionStorage.languageService).oilDetailsPaied;
			}else{
				this.language=this.$store.state.service.languageService.oilDetailsPaied;
			}
		},
		
		activated(){
			this.$store.commit('onload');
		},
        
    }

</script>
<style  lang="scss" rel="stylesheet/scss" scoped>
	.oilDetailsPaiedch{
    	.main{
    		padding-top: 1px;
    		.title{
    			height: 35px;
    			line-height: 35px;
    			padding:0px 15px;
    			text-align:right;
    			background:#fff;
    			font-weight: 500;
    			p{
    				display: inline-block;
    				color:#414141;
    				font-size: 14px;
    				float: left;
    			}
    			span{
    				color:green;
    				font-weight: 500;
    				font-size: 14px;
    				
    			}
    		}
    		
    		.normal{
    			padding: 15px;
    			background: #fff;
    			margin: 15px 0;
    			li{
    				line-height: 26px;
    				text-align: left;
    				span{
    					display: inline-block;
    					float: right;
    				}
    			}
    		}
    		
    		.top{
    			li{
    				font-size: 12px;
    				color:#4b4b4b;
    			}
    		}
    		
    		.middle{
    			li{
    				font-size: 14px;
    				color:#4b4b4b;
    				font-weight: 400;
    				span{
    					color:#ff9d2b;
    				}
    			}
    		}
    		.content{
    			li{
    				font-size: 12px;
    				color:#4b4b4b;
    			}
    		}
    		
    		.bottom{
    			background: #fff;
    			text-align: right;
    			padding: 15px;
    			line-height: 26px;
    			b{
    				color: #616161;
    				font-weight: 500;
    			}
    			span{
    				color:#a5a5a5;
    			}
    		}
    	}
	}
	
	.oilDetailsPaiedwei{
    	.main{
    		padding-top: 1px;
    		.title{
    			height: 35px;
    			line-height: 35px;
    			padding:0px 15px;
    			text-align:left;
    			background:#fff;
    			font-weight: 500;
    			p{
    				display: inline-block;
    				color:#414141;
    				font-size: 14px;
    				float: right;
    			}
    			span{
    				color:green;
    				font-weight: 500;
    				font-size: 14px;
    				
    			}
    		}
    		
    		.normal{
    			padding: 15px;
    			background: #fff;
    			margin: 15px 0;
    			li{
    				line-height: 26px;
    				text-align: right;
    				span{
    					display: inline-block;
    					float: left;
    				}
    			}
    		}
    		
    		.top{
    			li{
    				font-size: 12px;
    				color:#4b4b4b;
    			}
    		}
    		
    		.middle{
    			li{
    				font-size: 14px;
    				color:#4b4b4b;
    				font-weight: 400;
    				span{
    					color:#ff9d2b;
    				}
    			}
    		}
    		.content{
    			li{
    				font-size: 12px;
    				color:#4b4b4b;
    			}
    		}
    		.bottom{
    			background: #fff;
    			text-align: right;
    			padding: 15px;
    			line-height: 26px;
    			b{
    				color: #616161;
    				font-weight: 500;
    			}
    			b:first-child{float:right}
    			span{
    				color:#a5a5a5;
    			}
    			.orderTime{float:right}
    		}
    	}
	}
	
</style>
