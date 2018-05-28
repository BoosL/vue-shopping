<template>
    <div id="rechargePay">

        <c-title :hide="false" text='手机充值'></c-title>
		<div style="height:40px"></div>
		
        <div class="content">
            <div class="account">
                <p><span class="one">账户余额</span> <span class="two">0.00</span> </p>
                <p><span class="one">支付金额</span> <span class="two">93.00</span> </p>
            </div>
            <div style="height:10px"></div>
            <div class="payment">
                <p>请选择支付方式</p>
                <ul class="payStyle">
                    <li class="item" @click="payStyle">
                        <img src="../../../../assets/images/balance.png">
                        <div>
                            <b>余额支付</b> <span></span>
                        </div>
                    </li>
                    <li class="item" @click="payStyle">
                        <img src="../../../../assets/images/weChat.png">
                        <div>
                            <b>微信支付</b> <span class="active"></span>
                        </div>
                    </li>
                    <li class="item" @click="payStyle">
                        <img src="../../../../assets/images/Alipay.png">
                        <div>
                            <b>支付宝支付</b> <span></span>
                        </div>
                    </li>
                </ul>
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


        }
    },
    methods:{
        payStyle(e){
            var lis=document.getElementById("rechargePay").getElementsByClassName("item");
            for(var i=0;i<lis.length;i++){
                lis[i].lastElementChild.lastElementChild.className="";
            }
            e.currentTarget.lastElementChild.lastElementChild.className="active";
        },

    },
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>

    #rechargePay{
        .content{
            .account{
                padding:10px 0;
                background:#fff;
                p{
                    height:30px;
                    line-height:30px;
                    color:#505050;
                    font-size:16px;
                    padding:3px 13px;
                    .one{float:left}
                    .two{float:right}
                }
            }
            .payment{
                background:#fff;
                padding:0 0 0 13px;
                p{
                   height:50px;
                   line-height:50px;
                   font-size:16px;
                   color:#505050;
                   text-align:left;
                }
                .payChose{text-align:right;padding-right:15px;}
                .payStyle{
                	.item:last-child{
                		div{border-bottom:0}
                	}
                    .item{
                        width:100%;
                        display:flex;
                        flex-flow:row;
                        margin:4px 0;
                        img{
                            width:32px;
                            height:32px;
                            margin-top:7px;
                        }
                        div{
                            flex:1;
                            margin-left:10px;
                            line-height:50px;
                            border-bottom:1px solid #ccc;
                            padding-right:13px;
                            b{font-weight:normal;float:left}
                            span{
                                width:20px;
                                height:20px;
                                line-height:20px;
                                text-align:center;
                                display:inline-block;
                                border:1px solid #aaa;
                                border-radius:50%;
                                margin-top:20px;
                                float:right;
                            }
                            .active{
                                border:1px solid #36d2b6;
                                background:url(../../../../assets/images/mark.png) no-repeat 4px 5px;
                            }
                        }
                    }   
                }
            }
        }  
    }
 
</style>
