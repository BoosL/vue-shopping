<template>
	<div id="fixedTelephone" :class="'fixedTelephone'+$store.state.service.lang">
		<c-title :hide="false" :text='language.title'></c-title>
        <div style="height:40px"></div>
       
        <div class="telep">
	        <p>
	            <input :placeholder="language.placeTip" v-model.trim="fixedPhone" type="text" ref='isinput'>
	        </p>
        </div>
        
         <div class="content">
			<div class="maleall">
				<label for="male"
				       class="males"><span>所在省份 </span>
					<el-select v-model="provicevalue"
					           placeholder="请选择省份"
					           @change="selectProviceHandle">
						<el-option v-for="item in provinceoptions"
						           :label="item.areaname"
	                               :key="item.areaname"
						           :value="item">
						</el-option>
					</el-select>
				</label>
			</div>
			<div class="maleall">
				<label for="male"
				       class="males"><span>所在城市 </span>
					<el-select v-model="cityvalue"
					           placeholder="请选择城市"
					           @change="selectCityHandle">
						<el-option v-for="item in cityoptions"
						           :label="item.areaname"
	                               :key="item.areaname"
						           :value="item">
						</el-option>
					</el-select>
				</label>
			</div>          	
	        <form action="" method="" class="form">
		        <div class="form-group2">
			        <ul class="box">
			            <li v-for="(item,index) in goods">
			                <div class="par" @click="selectStyle($event,item)" :class="{'active':item.itemId==itemId}">
			                    <b>{{item.price}}{{language.yuan}}</b> <p>{{item.itemName1}}-{{item.itemName2}}</p> <i></i>
			                    <div class="info" :class="{'active':item.itemId==itemId}"></div>
			                </div>
			            </li>
			        </ul>
		        </div>
		        <div class="form-group" v-if="false">
		            <label class="form-help" for="">{{language.money}}</label>
		            <input class="form-controler" type="text" :placeholder="language.placeMoney" v-model.lazy="sourceMoney">
		        </div>
	        </form>
	    </div>
	    
	    <mt-popup
		  	v-model="popupVisible"
		  	position="bottom">
		  	<div class="popUp">
		  		<div class="title"><span class="left" @click="chooseCompony">{{language.cancle}}</span>{{language.company}}<span class="right" @click="chooseCompony">{{language.confirm}}</span></div>
			  	<!--<ul>
			  		<li v-for="company in companys">{{company}}</li>
			  	</ul>-->
			  	<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
		  	</div>
		  	
		</mt-popup>
        <div class="amount">
          <button type="button" @click='confirm'>{{language.btn}}</button>
        </div>        
        <!--<div class="m-footer">
            <p class="subtotal"><span>{{language.subtotal}}</span> <span>¥{{sourceMoney}}</span></p>
            <div class="clear"></div>
            <div class="integral">
                <div>
                    <b>{{language.score}}</b> <span>{{language.scoreTip1}}{{score}}{{language.scoreTip2}}{{scoreMoney}}{{language.yuan}}</span>
                </div>
                <mt-switch :class="{rt:$store.state.service.lang=='ch',lf:!$store.state.service.lang=='wei'}" v-model="useScore"></mt-switch>
            </div>
            <div class="clear"></div>
            <div class="amount" :class="{'disableds':disableds}">
                <span>{{language.total}}<b>{{computedMoney}}</b></span>
               
                    <button type="button">{{language.btn}}</button>
                
            </div>
        </div>-->
        
	</div>
</template>

<script>
	import  broadband_controller from './broadband_controller';
	export default broadband_controller;
</script>
<style type="text/css">
::-webkit-input-placeholder { /* WebKit browsers */
color:#1bba9e;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
color:#1bba9e;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
color:#1bba9e;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
color:#1bba9e;
}
</style>
<style  lang="scss" rel="stylesheet/scss" scoped>
*{box-sizing: border-box;}
.fixedTelephonech{
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
                width:92%;
                height:40px;
                color:#fff;
                font-size:16px;
                background:#ff951b;
                border:0;
                border-radius:3px;
                margin-top:19px;
                
            }
        }	
	.maleall span {
	font-size: 14px;
	vertical-align: middle;
	width: auto;
	margin-left: -15px;
	-webkit-box-flex: 0;
	-ms-flex: none;
	flex: none;
	line-height: 50px;
	}	
	.telep{
        height:45px;
        padding:0 13px;
        background:#fff;
        p{
           height:45px;
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
	    .form{
	      	.form-group{
	        	padding:0 15px;
	        	height:45px;
	        	border-top:1px solid #ccc;
	        	display: -webkit-flex; /* Safari */
  				display: flex;
	        	flex-flow: row;
	        	.form-help{
	         	 	width:80px;
	          		height:45px;
	          		line-height:45px;
	          		text-align:left;
	        	}
	        	.form-controler{
	          		flex:1;
	          		height:45px;
	          		line-height: 45px;
	          		float:left;
	          		border:0;
	          		outline:0;
	          		text-align: left;
	          		i{font-size: 23px;float: right;}
	        	}
	      	}
	    }
	}
	
	.popUp{
		width: 100%;
		background:#fff;
		.title{
			height: 45px;
			line-height: 45px;
			border-bottom: 1px solid #f3f5f7;
			padding:0 15px;
			.left{float: left;}
			.right{float: right;color:#1bba9e;}
		}
		ul{
			li{height: 30px;line-height:30px; border-top: 1px solid #ccc;text-align:left; margin:0 15px;}
		}
	}
	
    .m-footer{
        width:100%;
        background:#fff;
        position: fixed;
        bottom: 0;
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

    } 
}
.fixedTelephonewei{
	.telep{
        height:45px;
        padding:0 13px;
        background:#fff;
        p{
           height:45px;
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
    
    .popUp{
		width: 100%;
		background:#fff;
		.title{
			height: 45px;
			line-height: 45px;
			border-bottom: 1px solid #f3f5f7;
			padding:0 15px;
			.left{float:right ;}
			.right{float: left;color:#1bba9e;}
		}
	}
    
    .content{
    	background:#fff;
	    .form{
	      	.form-group{
	        	padding:0 15px;
	        	height:45px;
	        	border-top:1px solid #ccc;
	        	display: -webkit-flex; /* Safari */
  				display: flex;
	        	flex-flow: row;
	        	.form-help{
	        		order:2;
	         	 	width:80px;
	          		height:45px;
	          		line-height:45px;
	          		text-align:right;
	        	}
	        	
	        	.form-controler{
	          		flex:1;
	          		height:45px;
	          		line-height: 45px;
	          		float:left;
	          		border:0;
	          		outline:0;
	          		text-align: right;
	          		i{font-size: 23px;float: left;}
	        	}
	      	}
	    }
	}
    .m-footer{
        width:100%;
        background:#fff;
        position: fixed;
        bottom: 0;
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