<template>
    <div id="gameFlingRecharge">
        <c-title :hide="false" text='自动充值'></c-title>
        <ul class="account">
            <li> <span>游戏名称</span> {{data.name}}</li>
            <li> <span>游戏账户</span> <input type="text" name="" placeholder="请输入游戏账户"></li>
            <li><span>游戏服</span> <i class="iconfont icon-right"></i></li>
            <li><span>游戏区</span> <i class="iconfont icon-right"></i></li>
        </ul>
        <div class="content">
            <ul class="box">
                <li class="title">面额</li>
                <li v-for="(item,index) in items">
                    <div class="par">
                        <b>{{item.recharge}}</b> <i></i>
                        <div @click="selectStyle($event,item.money)" class="info"></div>
                    </div>
                </li>
            </ul>
            <ul class="recharge box">
                <li class="title">充值方式</li>
                <li @click="rechargeStyle()"><div class="par" :class="{active:isActive}">
                    自动充值<i></i>
                </div> </li>
            </ul>
            <ul class="count">
                <li class="title">数量</li>
                <li class="addCount">
                    <ul>
                        <li class="add">+</li>
                        <li class="num"><input type="text" value="1"></li>
                        <li class="minus">-</li>
                    </ul>
                </li>
            </ul>
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
                <router-link :to= "fun.getUrl('rechargePay')">
                    <button class="rt" type="button">提交订单</button>
                </router-link>
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
            data:{name:"DNF地下城与勇士"},
            isActive:true,
            items:[
                {recharge:'10元'},
                {recharge:'20元'},
                {recharge:'30元'},
                {recharge:'50元'},
                {recharge:'100元'},
                {recharge:'200元'},
                {recharge:'300元'},
                {recharge:'500元'},
            ]
        }
    },
    methods:{
        selectStyle(e,money){
            var infoA = document.getElementById("gameFlingRecharge").getElementsByClassName("info");
            for(var i=0;i<infoA.length;i++){
                infoA[i].className="info";
                infoA[i].parentNode.className="par";
            }
            e.target.className="info active";
            e.target.parentNode.className="par active";
        },
        rechargeStyle(){
            this.isActive=!this.isActive;
        }
    },
    mounted(){
        var infoA = document.getElementById("gameFlingRecharge").getElementsByClassName("info");
        infoA[0].className="info active";
        infoA[0].parentNode.className="par active";
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
*{box-sizing:border-box;}
#gameFlingRecharge{
    .account{
        margin-top:45px;
        padding:0 15px;
        background:#fff;
        li{
            height:45px;
            line-height:45px;
            border-bottom:1px solid #ccc;
            display:flex;
            flex-flow:row;
            span{
                width:100px;
                text-align:left;
            }
            i{
                flex:1;
                text-align:right;
                font-size:30px;
            }
            input{
                border:0;
                outline:0;
            }
        }
        li:last-child{
            border-bottom:0;
        };
    }
    .content{
        margin:0 0 170px;
        overflow:hidden;
        padding:0 15px;
        background:#fff;
        padding-bottom:30px;
       .box{
            li.title{
                height:30px;
                line-height:30px;
                padding:0 15px;
                text-align:left;
            }
            li:not(.title){
                width:33.3%;
                float:left;
                height:60px;
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
        .recharge{
            overflow:hidden;
            width:100%;
            clear:both;
        }
        .count{
           overflow:hidden;
            li.title{
                height:30px;
                line-height:30px;
                padding:0 15px;
                text-align:left;
            }
           .addCount{
                ul{
                    overflow:hidden;
                    width:345px;
                    height:50px;
                    margin:0 auto;
                    li{float:left}
                    li.num{
                        width:215px;
                        height:50px;
                        border-top:1px solid #ccc;
                        border-bottom:1px solid #ccc;
                        input{
                            width:100%;
                            height:100%;
                            border:0;
                            outline:0;
                            text-align:center;
                        }
                    }
                    li:nth-child(odd){
                        width:65px;
                        height:50px;
                        border:1px solid #ccc;
                        line-height:50px;
                        font-size:40px;
                    }
                }
            }
        }
    }
    .m-footer{
        width:100%;
        position:fixed;
        bottom:0;
        background:#fff;
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