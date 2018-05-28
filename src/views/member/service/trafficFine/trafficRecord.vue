<template>
    
    <div id="trafficRecord" :class="'trafficRecord'+$store.state.service.lang">
       
       	<c-title :hide="false" :text='language.title'></c-title>
		<div style="height:40px"></div>
    
       <div class="main">
       		<div class="monthList" v-for="elem in data">
       			<p class="title">{{elem.time}}</p>
       			<ul>
       				<li v-for="parm in elem.data">
       					<div class="left">
       						<p>{{parm.content}}</p>
       						<span>{{parm.date}}</span>
       					</div>
       					<div class="right">
       						<p>{{parm.status}}</p>
       						<b>￥{{parm.money}}</b>
       					</div>
       				</li>
       			</ul>
       		</div>
       </div>
       
    </div>
</template>


<script>	
import  trafficRecord_controller from './trafficRecord_controller';
export default trafficRecord_controller;
</script>

<style  lang="scss" rel="stylesheet/scss" scoped>
	.trafficRecordch{
    	.main{
    		width: 100%;
    		overflow: auto;
    		.monthList{
    			height: 153px;
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
	
	.trafficRecordwei{
    	.main{
    		width: 100%;
    		overflow: auto;
    		.monthList{
    			height: 153px;
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
</style>
