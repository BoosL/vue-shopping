<template>
    <div id="shareholderCenter">
        <c-title :hide="false" :text='mailSingleReturnTitle'></c-title>
    
        <div class="share_holder">
        	<div class="left">
        		{{alreadyReturn}} <br />
        		<span>已{{mailSingleReturnName}}总额(元)</span>
        	</div>
        	<div class="right">
        		商品{{mailSingleReturnName}}比例:{{order_return_rate}}% <br />
        		每期{{mailSingleReturnName}}比例:{{each_return_rate}}%
        	</div>
        </div>
        
        <div class="share_info">
        	<div>
        		<span>{{returnAmountTotal}}</span><br />
        		{{mailSingleReturnName}}总额(元)
        	</div>
        	<div>
        		<span>{{notReturn}}</span><br />
        		未{{mailSingleReturnName}}总额(元)
        	</div>
        </div>
        
        
        <div class="shareholder-order">
            <div id="tabs">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane :label="mailReturnQueue" name="first">

                        <ul class='rationList'>
                            <li v-for="elem in first_content" class="list">
                                <h4>
                                	{{mailSingleReturnName}}队列ID:{{elem.id}}
                                	<span>{{elem.status_name}}</span>
                                </h4>
                                <ul>
                                	<li>
                                		总{{mailSingleReturnName}}(元) <br />
                                		<span>{{elem.amount}}</span>
                                	</li>
                                	<li>
                                		已{{mailSingleReturnName}}(元) <br />
                                		<span>{{elem.return_amount}}</span>
                                	</li>
                                	<li>
                                		未{{mailSingleReturnName}}(元) <br />
                                		<span>{{elem.not_return}}</span>
                                	</li>
                                </ul>
    							<p>
    								{{elem.created_at}}
    								<span @click="toReturnInfo(elem.id)">查看记录</span>
    							</p>
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane :label="mailReturnLog" name="second">
                        <ul class='rationList'>
                            <li v-for="elem in second_content" class="recordList">
                               {{elem.created_at}}
                                <span>{{elem.amount}}元</span>
                            </li>
                        </ul>
                    </el-tab-pane>
                </el-tabs>
            </div>
    
        </div>
    
    </div>
</template>

<script>
import single_return_center_controller from './single_return_center_controller';
export default single_return_center_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
p {
    margin: 0;
    padding: 0;
}

#shareholderCenter {
	padding-top: 40px;
    .m_header {
        width: 100%;
        height: 45px;
        line-height: 45px;
        font-size: 15px;
        font-weight: bold;
        background: #fff;
        span {
            display: inline-block;
            width: 16px;
            height: 24px;
            float: left;
            margin-left: 10px;
            font-size: 30px;
        }
    }
    .share_holder {
       height: 110px;
       box-sizing: border-box;
       background-color: #e84f40;
       
       .left{
       		width:55% ;
       		text-align: left;
       		color:#FFFFFF;
       		box-sizing: border-box;
       		padding:35px 0px 0px 35px;
       		line-height: 22px;
       		font-size: 20px;
       		float:left;
       		span{
       			font-size: 13px;
       		}
       }
       .right{
       	width: 45%;
       	padding:32px 15px 0px 0px;
       	box-sizing: border-box;
       	color:#fff;
       	text-align: right;
       	line-height: 26px;
       	float:right;
       	font-size: 12px;
       	
       }
    }
    
    .share_info{
    	width: 100%;
    	height: 65px;
    	background-color: #fff;
    	margin-bottom: 10px;
    	div{
    		color:#737372;
    		font-size: 12px;
    		padding-top: 15px;
    		line-height: 20px;
    		float:left;
    		width: 50%;
    		box-sizing: border-box;
    		span{
    			color:#e84f40;
    			font-size: 16px;
    			font-weight: bold;
    		}
    	}
    	
    }
    
    
    .shareholder-order {
    	#tabs{
    		.rationList{
    			.list{
    				margin: 3px 0px;
    				background-color:#fff;
    				h4{
    					width: 100%;
    					box-sizing: border-box;
    					padding: 10px 20px;
    					text-align: left;
    					color:#333;
    					font-size: 14px;
    					border-bottom: 1px solid #ececec;
    					span{
    						display: inline-block;
    						font-size: 12px;
    						padding: 1px 4px;
    						font-weight: normal;
    						color:#FFFFFF;
    						background-color: #f15353;
    						border-radius: 5px;
    						float: right;
    					};
    				}
    				ul:after{
    					content: "";
    					display: block;
    					clear: both;
    				}
    				ul{
    					width: 100%;
    					padding: 10px 0px;
    					li{
    						width: 33%;
    						float: left;
    						font-size: 12px;
    						color:#8c9295;
    						line-height: 22px;
    						span{
    							color:#333;
    							font-size: 14px;
    						}
    					}
    				}
    				p{
    					color:#aab2b9;
    					text-align: left;
    					box-sizing: border-box;
    					padding: 0px 20px 15px;
    					span{
    						color:#728ae3;
    						float: right;
    					}
    				}
    				
    			}
    			
    			
    			.recordList{
    				padding:15px;
    				font-size: 14px;
    				line-height: 18px;
    				color:#333;
    				text-align: left;
    				background-color: #fff;
    				margin: 2px;
    				span{
    					font-size: 14px;
    					float: right;
    				}
    			}
    			
    			
    		}
    		.rationList:after{
    			content: "";
    			display: block;
   				clear: both;
    		}
    	}
        
    }
    
}
</style>