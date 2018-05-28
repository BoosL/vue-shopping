<template>
    <div id="phoneRecharge">
        <c-title :hide="false" text='手机充值' tolink='rechargeRecord' totext='充值记录'></c-title>
        <div style="height:40px"></div>
        <div class="telephone">
            <p v-if="tele">
                <b class="lf">13450772233</b>
                <span class="rt">广东移动</span>
            </p>
            <p v-else>
            	<input type="tel" :placeholder="请输入电话号码" v-model.lazy="MobilePhone">
            </p>
        </div>
        <div class="content">
            <ul class="tab-btn">
               <li :class="{active:isActive}" @click="changeActive(true)">充话费</li>
               <li :class="{active:!isActive}" @click="changeActive(false)">充流量</li>
            </ul>
            <telephone @payMoney="computMoney" v-show="isActive" ref="upTel"></telephone>
            <traffic @payMoney="computMoney" v-show="!isActive"></traffic>
        </div>
        <div class="m-footer">
            <p class="subtotal"><span class="lf">商品小计</span> <span class="rt">¥{{sourceMoney}}</span></p>
            <div class="clear"></div>
            <div class="integral">
                <div class="lf">
                    <b>积分</b> <span>可用积分600积分,抵扣{{scoreMoney}}元</span>
                </div>
                <mt-switch class="rt" v-model="useScore"></mt-switch>
            </div>
            <div class="clear"></div>
            <div class="amount">
                <span class="lf">合计:¥<b>{{computedMoney}}</b></span>
                <!--<router-link :to= "fun.getUrl('rechargePay',{chineseLang:true})">-->
                <router-link :to= "fun.getUrl('rechargePay')">
                    <button class="rt" type="button">提交订单</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import  telephone  from './components/telephone';
import  traffic  from './components/traffic';
import cTitle from 'components/title';
import { Switch } from 'mint-ui';

export default{
    components:{telephone,traffic,cTitle},
    data(){
        return{
            isActive:true,
            MobilePhone:'',
            tele:false,
            scoreMoney:6.00,
            computedMoney:10.00,
            sourceMoney:10.00,
            useScore:false
        }
    },
    methods:{
        changeActive(b){
            this.isActive=b;
        },
        computMoney(source){
        	console.error('组件打印',source)
        	if(this.useScore){
        		this.sourceMoney=source;
        		this.computedMoney=source-this.scoreMoney;
        	}else{
        		this.computedMoney=this.sourceMoney=source;
        	}
        }
    },
    watch:{
    	MobilePhone:function(val){
    		this.$refs.upTel.showTel(val)
    	},
    	useScore:function(val){
    		if(val){
    			this.computedMoney=this.sourceMoney-this.scoreMoney;
    		}else{
    			this.computedMoney=this.sourceMoney;
    		}
    	},
    	isActive:function(val){
    		if(val){
    			this.computedMoney=10;
    			this.sourceMoney=10;
    			this.useScore=false;
    		}else{
    			this.computedMoney=44.5;
    			this.sourceMoney=44.5;
    			this.useScore=false;
    		}
    	}
    }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
*{box-sizing:border-box}
    #phoneRecharge{
        .telephone{
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
                    font-size:22px;
                }
            }
        }
        .content{
            background:#fff;
            margin-bottom:170px;
            .tab-btn{
                padding:0 13px;
                height:45px;
                background:#fff;
                li{
                    display:inline-block;
                    width:50%;
                    line-height:45px;
                    float:left;
                    color:#666;
                    font-size:16px;
                    border-bottom:2px solid transparent;
                    border-top:1px solid #ccc;
                }
                li.active{
                    color:#ff951b;
                    border-bottom:2px solid #ff951b;
                }
            }
        }
        .m-footer{
            width:100%;
            position:fixed;
            bottom:0;
            background:#fff;
            z-index: 199;
            .subtotal{
                height:40px;
                line-height:40px;
                padding:0 13px;
                border-bottom:1px solid #ccc;
                margin:0;
                span.lf{
                    color:#lelele;
                    font-size:16px;
                }
                span.rt{
                    color:12px;
                    color:#lelele;
                }
            }
            .integral{
                height:45px;
                line-height:45px;
                padding:0 13px;
                div.lf{
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
                span.lf{
                    color:#333;
                    font-size:16px;
                }
                button.rt{
                    width:105px;
                    height:40px;
                    color:#fff;
                    font-size:16px;
                    background:#ff951b;
                    border:0;
                    border-radius:3px;
                    margin-top:9px;
                }
            }
        }
    }
</style>