<template>
	<div id="trafficConfirmOrder" :class="'trafficConfirmOrder'+$store.state.service.lang">
		<c-title :hide="false" :text='language.title'></c-title>
		<div style="height:40px"></div>
		
		<div class="title">兰州电子单</div>
		<ul class="content">	
			<li>
				<label>车牌号</label>
				<div class="traffic">京A</div>
			</li>
			<li>
				<label>违章单号</label>
				<div class="traffic">1234567</div>
			</li>
			<li>
				<label>罚款金额</label>
				<div class="traffic">200 <span>（罚金+滞纳金）</span></div>
			</li>
		</ul>
		
		<div class="m-footer">
            <div class="integral">
                <div>
                    <b>{{language.score}}</b> <span>{{language.scoreTip1}}{{score}}{{language.scoreTip2}}{{scoreMoney}}{{language.yuan}}</span>
                </div>
                <mt-switch :class="{rt:$store.state.service.lang=='ch',lf:!$store.state.service.lang=='wei'}" v-model="useScore"></mt-switch>
            </div>
            <div class="clear"></div>
            <div class="amount">
                <span>{{language.total}}<b>{{computedMoney}}</b></span>
                <router-link :to= "fun.getUrl('')">
                    <button type="button">{{language.btn}}</button>
                </router-link>
            </div>
        </div>
	</div>
</template>

<script>
import  trafficConfirmOrder_controller from './trafficConfirmOrder_controller';
export default trafficConfirmOrder_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
*{box-sizing: border-box;}
.trafficConfirmOrderch{
	.title{height: 50px;line-height: 50px;text-align: center;background: #fff;border-bottom: 1px solid #e8e8e8;}
	.content{
		padding: 5px 0;
		background:#fff;
		li{
			padding:0 15px;
			background:#fff;
			height:45px;
			line-height: 45px;
			display: flex;
			flex-flow: row;
			label{
				width: 80px;
				text-align: left;
				line-height: 45px;
			}
			.traffic{
				flex: 1;
				padding-left: 10px;
				text-align: left;
				line-height: 43px;
				span{color:#a5a5a5;}
			}
		}
	
	}
	.m-footer{
        width:100%;
        background:#fff;
        position: fixed;
        bottom: 0;
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
.trafficConfirmOrderwei{
	.title{height: 50px;line-height: 50px;text-align: center;background: #fff;border-bottom: 1px solid #e8e8e8;}
	.content{
		padding: 5px 0;
		background:#fff;
		li{
			padding:0 15px;
			background:#fff;
			height:45px;
			line-height: 45px;
			display: flex;
			flex-flow: row;
			border-bottom:1px solid #e2e2e2;
			label{
				width: 80px;
				text-align: right;
				line-height: 45px;
				order: 2;
			}
			.traffic{
				order: 1;
				flex: 1;
				padding-right: 10px;
				text-align: right;
				line-height: 43px;
				span{color:#a5a5a5;}
			}
		}
		.nobot{
			border-bottom:0;
			margin-bottom: 10px;
		}
	}
	.m-footer{
        width:100%;
        background:#fff;
        position: fixed;
        bottom: 0;
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