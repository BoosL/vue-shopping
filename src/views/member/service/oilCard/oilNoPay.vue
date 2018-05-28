<template>
  
    <div id="oilNoPay" :class="'oilNoPay'+$store.state.service.lang">	
       
       	<c-title :hide="false" :text="language.orderDetail"></c-title>
		<div style="height:40px"></div>
       	
       <div class="main">
       		<div class="title">
       			<p>{{language.orderNum}}{{data.numId}}</p>
       			<span>{{data.status}}</span>
       		</div>
       		<div class="top normal">
       			<ul>
       				<li>{{language.proName}}<span>{{data.productName}}</span></li>
       				<li>{{language.teleNum}}<span>{{data.phoneNum}}</span></li>
       				<li>{{language.attribution}}<span>{{data.place}}</span></li>
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
       				<li>{{language.goodsAmount}}<span>￥{{data.money}}</span></li>
       				<li>{{language.scorePay}}<span>-{{data.scoreDel}}</span></li>
       				<li>{{language.payStyle}}<span>{{data.payMethod}}</span></li>
       			</ul>
       		</div>
       		<div class="bottom">
       			<b>{{language.payNum}}</b><b>￥{{data.payNum}}</b><br />
       			<span class="orderTime">{{language.date}} </span><span>{{data.date}}</span>
       		</div>
       		<div class="footer">
       			<div class="btn">{{language.cancle}}</div>
       			<div class="btn">{{language.toPay}}</div>
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
            		status:"待支付",
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
					this.language=JSON.parse(sessionStorage.languageService).oilNoPay;
				}else{
					this.language=this.$store.state.service.languageService.oilNoPay;
				}
		  	}
		},
		
		mounted(){
			if(sessionStorage.languageService){
				this.language=JSON.parse(sessionStorage.languageService).oilNoPay;
			}else{
				this.language=this.$store.state.service.languageService.oilNoPay;
			}
		},
		
		activated(){
			this.$store.commit('onload');
		},
        
    }

</script>

<style  lang="scss" rel="stylesheet/scss" scoped>
	.oilNoPaych{
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
    				color:#ffc381;
    				font-size: 14px;
    				font-weight: 500;
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
    			margin-bottom: 100px;
    			b{
    				color: #616161;
    				font-weight: 500;
    			}
    			span{
    				color:#a5a5a5;
    			}
    		}
    		.footer{
    			background: #fff;
    			position: fixed;
    			bottom: 0px;
    			width: 100%;
    			text-align: right;
    			.btn{
    				width: 100px;
    				height: 30px;
    				line-height: 30px;
    				display: inline-block;
    				text-align: center;
    				margin: 15px;
    				border-radius: 5px;
    				color:#ff9b28;
    				border: 1px solid #ffd8ab;
    				cursor: pointer;
    				font-weight: 400;
    			}
    		}
    	}
	}
	
	
	.oilNoPaywei{
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
    				float: right;
    			}
    			span{
    				color:#ffc381;
    				font-size: 14px;
    				font-weight: 500;
    				float: left;
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
    				text-align: right;
    				span{
    					color:#ff9d2b;
    					float: left;
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
    			margin-bottom: 100px;
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
    		.footer{
    			background: #fff;
    			position: fixed;
    			bottom: 0px;
    			width: 100%;
    			text-align: right;
    			.btn{
    				width: 100px;
    				height: 30px;
    				line-height: 30px;
    				display: inline-block;
    				text-align: center;
    				margin: 15px;
    				border-radius: 5px;
    				color:#ff9b28;
    				border: 1px solid #ffd8ab;
    				cursor: pointer;
    				font-weight: 400;
    			}
    		}		
    	}
	}
</style>-->
