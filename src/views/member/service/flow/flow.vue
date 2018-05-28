<template>
    <div id="flow" :class="'flow'+$store.state.service.lang">	   
       <c-title :hide="false" :text='language.title' tolink='flowRechargeRecord' :totext='language.record'></c-title>
        <div style="height:40px"></div>
		<div class="telep">
            <p v-if="tele">
                <b>13450772233</b>
                <span>广东移动</span>
            </p>
            <p v-else>
                <input type="number" v-model.trim="MobilePhone" :placeholder="language.placeTip" ref='isinput'>
            </p>
        </div>
        
        <div class="traffic">
	        <ul class="traffic-box">
	            <li class="info" :class="{'active':Hot_flow == index}" v-for="(item,index) in items" @click="selectedStyle($event,index,item)" >
	            	<!--v-if="item.data!=0"-->
	                <u></u> <b>{{item.num}}</b> <i></i>
	            </li>
	        </ul>
	
	        <div class="traffic-money" v-if="datas">
	        	<div class="item" @click="selectMoney($event,item.price,n,item.api_goods_id)" v-for="(item,n) in datas">
	        		
	                <div class="left">
	                    <p class="one"> <b>¥{{item.price}}</b> <span v-show="item.span">{{item.span}}</span> </p>
	                    <p class="two">{{item.des}}</p>
	                </div>
	                <div class="right"> <span :class="{'circle':moneyHotspot != n,'active':moneyHotspot == n}"></span></div>
	           </div>
	        </div>
	    </div>
	    
        <div class="m-footer">
            <p class="subtotal"><span>{{language.subtotal}}</span> <span>¥{{sourceMoney}}</span></p>
            <div class="clear"></div>
            <div class="integral" v-show="offDeductible">
                <div>
                    <b><!--{{language.score}}-->{{deductionName}}</b> <span>{{language.scoreTip1}}{{score}}{{language.scoreTip2}}{{scoreMoney}}{{language.yuan}}</span>
                </div>
                <mt-switch :class="{rt:$store.state.service.chinese,lf:!$store.state.service.chinese}" v-model="useScore"></mt-switch>
            </div>
            <!--<p class="poundage">注：手续费为{{poundage}}%</p>-->
            <div class="clear"></div>
            <div class="amount" :class="{'disableds':disableds}">
                <span>{{language.total}}<b>{{computedMoney}}</b></span>
               
                    <button type="button" @click="goSubmit">{{language.btn}}</button>
                
            </div>
        </div>
      
    </div>
</template>


<script>
import flow_controller from './flow_controller';
export default flow_controller;

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
*{box-sizing: border-box;}
.flowch{
	.poundage{color: red;font-size: .7rem;}
	.telep{
        height:45px;
        padding:0 13px;
        background:#fff;
        p{
           height:45px;
           b{
            font-size:22px;
            color:#1bba9e;
            font-weight:normal;
            }
            span{
                font-size:12px;
                color:#666;
            }
            input{
                width:100%;
                height:100%;
                border:0;
                outline:0;
                color:#1bba9e;
                font-size:18px;
            }
        }
    }
    .traffic{
    	background:#fff;
    	margin-bottom: 7px;
	    .traffic-box{
	    	padding-top: 10px;
	    	padding-bottom: 10px;
	        margin:7px;
	       	justify-content:space-around;
	       	flex-flow:row;
	       	flex-direction:row;
	       	display:flex;
	        li{
	            width:30%;
	            height:70px;
	            border:1px solid #ccc;
	            border-radius:4px;
	            font-size:22px;
	            color:#666;
	            padding-top:20px;
	           
	        }
	        li.active{
	            position:relative;
	            border:1px solid #36d2b6;
	            u{
	                position:absolute;
	                width:50px;
	                height:30px;
	                display:inline-block;
	                top:0;
	                left:0;
	                background:url(../../../../assets/images/favourablE.png) no-repeat 0 0;
	            }
	            i{
	                width:30px;
	                height:16px;
	                display:inline-block;
	                position:absolute;
	                right:0;
	                bottom:0;
	                background:url(../../../../assets/images/checkeD.png) no-repeat 1px 0;
	            }
	        }
	    }
	    .traffic-money{
	        .item{
	            padding:13px 20px;
	            overflow:hidden;
	            div.left{
	                width:80%;
	                float:left;
	                p{clear:both}
	                .one{
	                    line-height:40px;
	
	                    b{
	                        font-size:22px;
	                        color:#333;
	                        font-weight:normal;
	                        float:left;
	                    }
	                    span{
	                        padding:3px 8px;
	                        background:#36d2b6;
	                        color:#fff;
	                        border-radius:6px;
	                        font-size:10px;
	                    }
	                }
	                .two{
	                    font-size:12px;
	                    color:#666;
	                    text-align:left;
	                    line-height: 18px;
	                }
	            }
	            div.right{
	                width:20%;
	                float:right;
	                span{
	                    width:20px;
	                    height:20px;
	                    display:inline-block;
	                    border:1px solid #aaa;
	                    border-radius:50%;
	                    float:right;
						margin-top:50%;	                    
	                }
	                .active{
	                    border:1px solid #36d2b6;
	                    background:url(../../../../assets/images/mark.png) no-repeat 3px 3px;
	                }
	            }
	        }
	    }
	}
    
    .m-footer{
        width:100%;
        background:#fff;
        .subtotal{
            height:40px;
            line-height:40px;
            padding:0 13px;
            border-bottom:1px solid #ccc;
            margin:0;
            span:first-child{
                color:#lelele;
                font-size:16px;
                float:left;
            }
            span:last-child{
                color:12px;
                color:#lelele;
                float:right;
            }
        }
        .integral{
            height:45px;
            line-height:45px;
            padding:0 13px;
            div{
            	float:left;
                b{
                    color:#lelele;
                    font-size:16px;
                    font-weight:noraml;
                }
                span{
                    color:#lelele;
                    font-size:12px;
                }
            }
        }
        .amount.disableds{
         button{
        	background:#ccc;
        }	
        } 
        .amount{
            height:50px;
            line-height:50px;
            padding:0 0 0 13px;
            margin-bottom:0;
            box-sizing:border-box;
            span{
                color:#333;
                font-size:16px;
                float:left;
            }
            button{
                width:105px;
                height:40px;
                color:#fff;
                font-size:16px;
                background:#ff951b;
                border:0;
                border-radius:3px;
                margin-top:9px;
                float:right;
            }
        }
    }  
}


.flowwei{
	
	.telep{
        height:45px;
        padding:0 13px;
        background:#fff;
        p{
           height:45px;
           b{
            font-size:22px;
            color:#1bba9e;
            font-weight:normal;
            float:left;
            }
            span{
                font-size:12px;
                color:#666;
                float:right;
            }
            input{
                width:100%;
                height:100%;
                border:0;
                outline:0;
                color:#1bba9e;
                font-size:18px;
            }
        }
    }
    .traffic{
    	background:#fff;
    	margin-bottom: 7px;
	    .traffic-box{
	    	padding-top: 10px;
	        margin:7px;
	       	justify-content:space-around;
	       	flex-flow:row;
	       	flex-direction:row;
	       	display:flex;
	        li{
	            width:30%;
	            height:70px;
	            border:1px solid #ccc;
	            border-radius:4px;
	            font-size:22px;
	            color:#666;
	            padding-top:20px;
	           
	        }
	        li.active{
	            position:relative;
	            border:1px solid #36d2b6;
	            u{
	                position:absolute;
	                width:50px;
	                height:30px;
	                display:inline-block;
	                top:0;
	                left:0;
	                background:url(../../../../assets/images/favourablE.png) no-repeat 0 0;
	            }
	            i{
	                width:30px;
	                height:16px;
	                display:inline-block;
	                position:absolute;
	                right:0;
	                bottom:0;
	                background:url(../../../../assets/images/checkeD.png) no-repeat 1px 0;
	            }
	        }
	    }
	    .traffic-money{
	        .item{
	            padding:13px 20px;
	            overflow:hidden;
	            div.left{
	                width:80%;
	                float:right;
	                p{clear:both}
	                .one{
	                    line-height:40px;
	                    b{
	                        font-size:22px;
	                        color:#333;
	                        font-weight:normal;
	                        float:right;
	                    }
	                    span{
	                        padding:3px 8px;
	                        background:#36d2b6;
	                        color:#fff;
	                        border-radius:6px;
	                        font-size:10px;
	                        text-align:right;
	                    }
	                }
	                .two{
	                    font-size:12px;
	                    color:#666;
	                    text-align:right;
	                    line-height: 18px;
	                }
	            }
	            div.right{
	                width:20%;
	                float:left;
	                span{
	                    width:20px;
	                    height:20px;
	                    display:inline-block;
	                    border:1px solid #aaa;
	                    border-radius:50%;
	                    float:left;
	                    margin-top:50%;	
	                }
	                .active{
	                    border:1px solid #36d2b6;
	                    background:url(../../../../assets/images/mark.png) no-repeat 3px 3px;
	                }
	            }
	        }
	    }
	}
    .m-footer{
        width:100%;
        background:#fff;
        .subtotal{
            height:40px;
            line-height:40px;
            padding:0 13px;
            border-bottom:1px solid #ccc;
            margin:0;
            span:first-child{
                color:#lelele;
                font-size:16px;
                float:right;
            }
            span:last-child{
                color:12px;
                color:#lelele;
                float:left;
            }
        }
        .integral{
            height:45px;
            line-height:45px;
            padding:0 13px;
            div{
            	float:right;
                b{
                    color:#lelele;
                    font-size:16px;
                    font-weight:noraml;
                    float:right;
                }
                span{
                    color:#lelele;
                    font-size:12px;
                }
            }
        }
        .amount{
            height:50px;
            line-height:50px;
            padding:0 0 0 13px;
            margin-bottom:0;
            box-sizing:border-box;
            span{
                color:#333;
                font-size:16px;
                float:left;
            }
            button{
                width:105px;
                height:40px;
                color:#fff;
                font-size:16px;
                background:#ff951b;
                border:0;
                border-radius:3px;
                margin-top:9px;
                float:right;
            }
        }
    }  
}
    
</style>
