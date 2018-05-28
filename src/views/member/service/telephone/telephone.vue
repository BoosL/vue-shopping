<template>
    <div id="telephone" :class="'telephone'+$store.state.service.lang">	
        <c-title :hide="false" :text='language.title' tolink='rechargeRecord' :totext='language.record'></c-title>
        <div style="height:40px"></div>
        
		<div class="telep">
            	<div id="intel">
                <input :placeholder="language.placeTip" v-model.trim="MobilePhone" type="number" ref='isinput'>
                <!--<i class="fa fa-bars" @click='toMobileBingding'></i>-->
                </div>
               
        </div>
         <p id="telInfo" v-if='phoneInfo'>{{phoneInfo}}</p>
        <div class="content">
            <!--<div class="input">
	            <input type="text" v-model.lazy='Recharge_amount' :placeholder="language.placeMoney">
	        </div>-->
	        <ul class="box">
	            <li v-for="(item,index) in items">
	                <div class="par" @click="selectStyle($event,item)" :class="{'active':item.recharge==moneyHotspot}">
	                    <b>{{item.recharge}}{{language.yuan}}</b> <p v-if="item.discount">{{item.discount}}{{language.yuan}}</p> <i></i>
	                    <div class="info" :class="{'active':item.recharge==moneyHotspot}"></div>
	                </div>
	            </li>
	        </ul>
        </div>
        <div class="m-footer">
            <p class="subtotal"><span>{{language.subtotal}}</span><span>¥{{sourceMoney}}</span></p>
            <div class="clear"></div>
            <div class="integral" v-show="offDeductible">
                <div>
                    <b><!--{{language.score}}-->{{deductionName}}</b> <span>{{language.scoreTip1}}{{score}}{{language.scoreTip2}}{{scoreMoney}}{{language.yuan}}</span>
                </div>
                <mt-switch :class="{rt:$store.state.service.lang=='ch',lf:!$store.state.service.lang=='wei'}" v-model="useScore"></mt-switch>
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
import telephone_controller from './telephone_controller';
export default telephone_controller;

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
*{box-sizing: border-box;}
.telephonech{
	.poundage{color: red;font-size: .7rem;}
	#telInfo{text-align: left;height: 1.2rem;line-height: 1rem;background: #FFF;margin-bottom: 10px;padding: 0 13px;display: block;}
	#intel{
		display: flex;flex-wrap:wrap;align-items:center;align-items:center; justify-content:space-between; line-height: 45px;height: 40px;
		input{flex: 9;border:0;outline:0;color:#1bba9e;font-size:18px;}
		i{flex: 1;}
	}
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
    .content{
       	background:#fff;
       	padding-top:10px;
       	margin-top: 10px;
	    .input{
	        margin:7px 13px;
	        box-sizing:border-box;
	        input{
	            width:100%;
	            height:35px;
	            font-size:12px;
	            border-radius:3px;
	            color:#ccc;
	            border:1px solid #ccc;
	            padding-left:4%;
	            background:#fff;
	            outline:0;
	            color:#000;
	        }
	    }
	    .box{
	        margin:7px;
	        overflow:hidden;
	        li{
	            width:33.3%;
	            float:left;
	            height:80px;
	            margin-bottom:10px;
	            div{
	                margin:6px 6px;
	                border:1px solid #ccc;
	                height:100%;
	                border-radius:4px;
	                box-sizing:border-box;
	                padding-top:20px;
	                b{
	                    font-size:22px;
	                    color:#666;
	                }
	                p{
	                    font-size:10px;
	                    color:#999;
	                }
	            }
	            .active{
	                border:1px solid #36d2b6;
	                position:relative;
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
	            .par{
	                position: relative;
	            }
	            .info{
	                width: 100%;
	                height: 100%;
	                z-index: 100;
	                position: absolute;
	                top:-6px;
	                left: -6px;
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


.telephonewei{
	.telep{
        height:45px;
        padding:0 13px;
        background:#fff;
        p{
           height:45px;
           b.lf{
            font-size:22px;
            color:#1bba9e;
            font-weight:normal;
            }
            span.rt{
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
                /*text-align:right;*/
            }
        }
    }
    .content{
       	background:#fff;
       	padding-top:10px;
       	margin-top: 10px;
	    .input{
	        margin:7px 13px;    
	        input{
	            width:100%;
	            height:35px;
	            font-size:12px;
	            border-radius:3px;
	            color:#ccc;
	            border:1px solid #ccc;
	            padding-right:4%;
	            background:#fff;
	            outline:0;
	            color:#000;
	            text-align:right;
	        }
	    }
	    .box{
	        margin:7px;
	        overflow:hidden;
	        li{
	            width:33.3%;
	            float:right;
	            height:80px;
	            margin-bottom:10px;
	            div{
	                margin:6px 6px;
	                border:1px solid #ccc;
	                height:100%;
	                border-radius:4px;
	                box-sizing:border-box;
	                padding-top:20px;
	                b{
	                    font-size:22px;
	                    color:#666;
	                }
	                p{
	                    font-size:10px;
	                    color:#999;
	                }
	            }
	            .active{
	                border:1px solid #36d2b6;
	                position:relative;
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
	            .par{
	                position: relative;
	            }
	            .info{
	                width: 100%;
	                height: 100%;
	                z-index: 100;
	                position: absolute;
	                top:-6px;
	                left: -6px;
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
