<template>
	<div id="electricity" :class="'electricity'+$store.state.service.lang">
		<c-title :hide="false" :text='language.title'></c-title>
        <div style="height:40px"></div>
        
        <div class="telep">
	        <p>
	            <input type="number" :placeholder="language.placeTip" v-model.lazy="userCode">
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
		        <div class="form-group">
		            <label class="form-help" for="">{{language.company}}</label>
		            <div class="form-controler"  @click="chooseCompony">{{company}}
		            	<i class="iconfont icon-right" v-if="$store.state.service.lang=='ch'"></i>
		            	<i class="iconfont icon-left" v-else="$store.state.service.lang=='wei'"></i>
		            </div>
		        </div>
		        <div class="form-group">
		            <label class="form-help" for="">{{language.contract}}</label>
		            <input class="form-controler" type="number" :placeholder="language.placeContract" v-model.lazy="contract">
		        </div>	        
		        <div class="form-group">
		            <label class="form-help" for="">{{language.money}}</label>
		            <input class="form-controler" type="number" :placeholder="language.placeMoney" v-model.lazy="sourceMoney">
		        </div>
	        </form>
	    </div>
	    
	    <mt-popup
		  	v-model="popupVisible"
		  	position="bottom">
		  	<div class="popUp">
		  		<div class="title"><span class="left" @click="chooseCompony">{{language.cancle}}</span>{{language.company}}<span class="right" @click="chooseCompony">{{language.confirm}}</span></div>
			  	<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
		  	</div>
		  	
		</mt-popup>

        <template>
        <div class="amount">
          <button type="button" @click='confirm'>{{language.btn}}</button></div>
        </template>
        
        
        <div class="m-footer" v-if="false">
            <p class="subtotal"><span>{{language.subtotal}}</span> <span>¥{{sourceMoney}}</span></p>
            <div class="clear"></div>
            <div class="integral">
                <div>
                    <b>{{language.score}}</b> <span>{{language.scoreTip1}}{{score}}{{language.scoreTip2}}{{scoreMoney}}{{language.yuan}}</span>
                </div>
                <mt-switch :class="{rt:$store.state.service.lang=='ch',lf:!$store.state.service.lang=='wei'}" v-model="useScore"></mt-switch>
            </div>
            <!--<p class="poundage">注：手续费为{{poundage}}%</p>-->
            <div class="clear"></div>
            <div class="amount" :class="{'disableds':disableds}">
                <span>{{language.total}}<b>{{computedMoney}}</b></span>
                
                    <button type="button">{{language.btn}}</button>
                
            </div>
        </div>
        
	</div>
</template>

<script>
	import  electricity_controller from './electricity_controller';
	export default electricity_controller;
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
/*　input[placeholder], [placeholder], *[placeholder] { 
color:red !important; 
} 　*/
*{box-sizing: border-box;}
.electricitych{
	.poundage{color: red;font-size: .7rem;}
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
	          		height:auto;
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
	}
        .amount{
            height:50px;
            line-height:50px;
            padding:0 0 0 0px;
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
        .amount.disableds{
         button{
        	background:#ccc;
        }	
        }        

    } 
}
.electricitywei{
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