<template>
	<div id="gasCosts">
		<c-title :hide="false" text='燃气费'></c-title>
        <div style="height:40px"></div>
        
        <div class="telep">
	        <p>
	            <input type="tel" name=""  value="请输入户号">
	        </p>
        </div>
        
         <div class="content">
	        <form action="" method="" class="form">
		        <div class="form-group">
		            <label class="form-help" for="">缴费单位</label>
		            <div class="form-controler">{{company}}
		            	<i class="iconfont icon-right" v-if="$store.state.service.lang=='ch'" @click="chooseCompony"></i>
		            	<i class="iconfont icon-left" v-else="$store.state.service.lang=='wei'" @click="chooseCompony"></i>
		            </div>
		        </div>
		        <div class="form-group">
		            <label class="form-help" for="">缴费金额</label>
		            <input class="form-controler" type="text" name="" :placeholder="language.placeMoney" v-model="sourceMoney">
		        </div>
	        </form>
	    </div>
	    
	    <mt-popup
		  	v-model="popupVisible"
		  	position="bottom">
		  	<div class="popUp">
		  		<div class="title"><span class="left" @click="chooseCompony">取消</span> 缴费单位 <span class="right" @click="chooseCompony">确定</span></div>
			  	<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
		  	</div>
		  	
		</mt-popup>
        
        <div class="m-footer">
            <p class="subtotal"><span>商品小计</span> <span>¥{{sourceMoney}}</span></p>
            <div class="clear"></div>
            <div class="integral">
                <div>
                    <b>积分</b> <span>可用{{score}}积分，抵扣{{scoreMoney}}元</span>
                </div>
                <mt-switch :class="{rt:$store.state.service.lang=='ch',lf:!$store.state.service.lang=='wei'}" v-model="useScore"></mt-switch>
            </div>
            <div class="clear"></div>
            <div class="amount">
                <span>合计<b>{{computedMoney}}</b></span>
                <router-link :to= "fun.getUrl('')">
                    <button type="button">提交订单</button>
                </router-link>
            </div>
        </div>
        
	</div>
</template>

<script>
	import  gasCosts_controller from './gasCosts_controller';
	export default gasCosts_controller;
</script>

<style  lang="scss" rel="stylesheet/scss" scoped>
*{box-sizing: border-box;}
#gasCosts{
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