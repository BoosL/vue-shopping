<template>
    <div id="orderDetailsPaied">
        <c-title :hide="false" text='订单详情'></c-title>
        <div class="main">
            <div class="title">
                <p>订单号：{{data.numId}}</p>
                <span>{{data.status}}</span>
            </div>
            <div class="top normal">
                <ul>
                    <li>游戏名称<span>{{data.productName}}</span></li>
                    <li>游戏帐号<span>{{data.phoneNum}}</span></li>
                    <li>游戏分区(一级)<span>{{data.place}}</span></li>
                    <li>游戏分区(二级)<span>{{data.place}}</span></li>
                    <li>充值面额<span>{{data.denomination}}元</span></li>
                    <li>数量<span>{{data.denomination}}元</span></li>
                </ul>
            </div>
            <div class="middle normal">
                <ul>
                    <li>手机号码<span>{{data.denomination}}元</span></li>
                </ul>
            </div>
            <div class="content normal">
                <ul>
                    <li>商品金额<span>￥{{data.money}}</span></li>
                    <li>积分抵付<span>-{{data.scoreDel}}</span></li>
                    <li>支付方式<span>{{data.payMethod}}</span></li>
                </ul>
            </div>
            <div class="bottom">
                <b>需付款：￥{{data.payNum}}</b><br />
                <span>下单时间：{{data.date}}</span>
            </div>
            <div class="btn">
                <button type="button" class="rt">取消订单</button>
                <button type="button" class="rt">去支付</button>
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
                data:{
                    numId:"12345689",
                    status:"已支付",
                    productName:"江苏中石化固定面值1000元直充",
                    phoneNum:"1234 5678 1234 5678",
                    place:"江苏，全国",
                    denomination:1000,
                    money:"19.9x2",
                    scoreDel:"4.00",
                    payMethod:"-----",
                    payNum:"30.00",
                    date:"2017-05-01 11:00:00"
                }
            }
        },
        methods:{

        }
    }
</script>
<style  lang="scss" rel="stylesheet/scss" scoped>
    #orderDetailsPaied{
        .main{
            margin-top:50px;
            padding-top: 1px;
            .title{
                height: 35px;
                line-height: 35px;
                padding:0px 15px;
                text-align:right;
                background:#fff;
                font-weight: 500;
                p{
                    display: inline-block;
                    color:#414141;
                    font-size: 14px;
                    float: left;
                }
                span{
                    color:#ff951b;
                    font-weight: 500;
                    font-size: 14px;
                }
            }
            .normal{
                padding: 15px;
                background: #fff;
                margin: 15px 0;
                li{
                    line-height: 26px;
                    text-align: left;
                    span{
                        display: inline-block;
                        float: right;
                    }
                }
            }
            .top{
                li{
                    font-size: 12px;
                    color:#4b4b4b;
                }
            }
            .middle{
                li{
                    font-size: 14px;
                    color:#4b4b4b;
                    font-weight: 400;
                    span{
                        color:#ff9d2b;
                    }
                }
            }
            .content{
                li{
                    font-size: 12px;
                    color:#4b4b4b;
                }
            }
            .bottom{
                background: #fff;
                text-align: right;
                padding: 15px;
                line-height: 26px;
                b{
                    color: #616161;
                    font-weight: 500;
                }
                span{
                    color:#a5a5a5;
                }
            }
            .btn{
                position:fixed;
                bottom:0;
                right:0;
                height:54px;
                width:100%;
                background:#fff;
                button{
                    margin-right:15px;
                    width:105px;
                    height:34px;
                    border-radius:5px;
                    line-height:34px;
                    text-align:center;
                    border:1px solid #ff951b;
                    color:#ff951b;
                    background:#fff;
                    outline:0;
                    margin-top:10px;
                }
            }
        }
    }
</style>


