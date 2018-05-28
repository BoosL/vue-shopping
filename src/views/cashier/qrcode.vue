<template>
    <div id="goodsinfo">
        <c-title :hide="false" text='二维码'></c-title>
        <div style="height: 40px;"></div>

        <!--商品订单-->
        <div class="goods-detail">
                <div class="detail_good">
                    <!--	<h3><i class="fa fa-gift"></i>合利爱购</h3>-->
                    <div class="goods" >
                        <div class="img">
                            <img :src="qrcode">
                        </div>

                        <div class="warp">
                            <div class="inner">
                                <div class="name">让顾客扫一扫,向我付款</div>
                            </div>
                        </div>

                    </div>
                </div>
        </div>
        <!--商品订单结束-->

    </div>
</template>


<script>
  import qrcode_controller from './qrcode_controller';
  export default qrcode_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

    #goodsinfo {
        .onclast{position: relative;top: -290px;}
        .goods-shop {
            background: #fff;
            line-height: 30px;
            border-bottom: #e8e8e8 solid 1px;
            margin-top: 10px;
            p {
                text-align: left;
                margin: 0;
                padding: 0 0 0 10px;
                font-size: .8rem;
                color: #555;
            }
        }
        .add-info {
            overflow-y: scroll;
            width: 100%;
            background: #FFF;
            max-height: 50vh;
            padding-top: 10px;
        }
        .mint-popup-4 {
            width: 100%;

            .sure {
                background: #f15353;
                height: 40px;
                line-height: 40px;
                color: #fff;
                width: 50%;
                border: 0;
                float: left;
            }
            .close {
                background: #eee;
                height: 40px;
                line-height: 40px;
                color: #333;
                width: 50%;
                border: 0;
                float: left;
            }
            .address-plus {
                background: #f15353;
                height: 40px;
                line-height: 40px;
                color: #fff;
                width: 100%;
                border: 0;
            }

            ul {
                overflow-y: scroll;
            }
            li {
                padding: 10px 0;
                display: flex;
                position: relative;
                .liia {
                    flex: 9;
                    text-align: left;
                    padding-left: 20px;
                    .name {
                        font-size: 1.1rem;
                        color: #222;
                        line-height: 2rem;
                    }
                    .address {
                        font-size: 0.7rem;
                        color: #666;
                        line-height: 2rem;
                    }
                }
                i {
                    flex: 1;
                }
            }
        }
        .addr {
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            background: #FFF;
            padding: 10px 0;
            i {
                flex: 1;
                font-size: 20px;
                color: #888888
            }
            .el-icon-arrow-right {
                font-size: .9rem;
            }
            p {
                flex: 6;
                text-align: justify;
                font-weight: bold;
                line-height: 1.5rem;
                padding-right: 1rem;
                color: #333333;
                span {
                    font-size: .9rem;
                    font-weight: normal;
                    color: #666;
                }
            }
        }
        .detail_good {
            background: #FFF;
            overflow: hidden;
            .content {
                text-align: left;
                background: #efeded;
                padding: 10px;
                color: #8C6700;
            }
            a {
                color: #000000;
            }
            h3 {
                text-align: left;
                margin: 9px 0;
                i {
                    font-size: 20px;
                    padding-right: 5px;
                }
            }
            .goods:after{
                content: "";
                display: block;
                clear: both;
            }
            .goods {
                padding: 40px;
                width: 100%;
                box-sizing: border-box;
                background: #fafafa;
                .img {
                    /*flex: 1;*/
                    width: 100%;
                    float: left;
                    display: block;
                    /*background:blue;*/
                    img {
                        width: 100%;
                        border-radius: 5px;
                    }
                }
                .warp{
                    width: 100%;
                    float: left;
                    display: block;
                    padding-top:25px;
                    .inner {
                        width: 100%;
                        float: left;
                        box-sizing: border-box;
                        padding: 0 5px;
                        text-align:center;
                        .name {
                            text-align: center;
                            color: #333333;
                            margin-bottom: 10px;
                        }
                    }

                    .price {
                        width: 30%;
                        align-items: center;
                        text-align: right;
                        color: #333333;
                        box-sizing: border-box;
                        float: left;
                        padding-right: 4px;
                        p {
                            margin-top: 0
                        }
                    }
                }



                .option {
                    color: #888;
                    font-size: .6rem;
                    flex: 1;
                }
            }
        }

        .nums {
            background: #FFF;
            text-align: right;
            margin: 0;
            padding-right: 10px;
            line-height: 2rem;
        }
        .tbs.coupon-list {
            margin-top: 10px;
            margin-bottom: 10px
        }
        .coupon.list {

            .left font {
                color: #fff;
                background: #f15353;
                font-size: 0.7rem;
                height: 20px;
                padding: 0 5px;
                border-radius: 3px;
                margin-left: 5px;
            }
            .right font span {
                font-size: .8rem;
            }
            .right font i {
                font-size: .8rem;
                color: #999;
            }
        }
        .tbs {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #FFF;
            flex-flow: row wrap;
            padding: 10px;
            line-height: 1.5rem;
            border-top: #e8e8e8 solid 1px;
            border-bottom: #e8e8e8 solid 1px;
            font-size: 0.8rem;
            .list {
                width: 100%;
                padding-bottom: 10px;
            }
            .list:nth-last-child(1) {
                padding-bottom: 0
            }
            .left {
                text-align: left;
                float: left;
                color: #858585;
                span {
                    font-size: 14px;
                }
            }
            .right {
                text-align: right;
                float: right;
            }
            p {
                text-align: left;
                margin: 0;
                padding-right: 10px;
                line-height: 2rem;
                width: 100%;
                span {
                    color: #858585;
                    font-size: .6rem;
                    float: right;
                }
            }
        }
        .detail_pay {
            text-align: left;
            height: 3rem;
            width: 100%;
            background: #fff;
            padding: 0 0 0 2%;
            margin-top: 30px;
            border-top: 1px solid #eaeaea;
            position: fixed;
            bottom: 0px;
            box-sizing: border-box;
            line-height: 3rem;
            .order_delete {
                height: 3rem;
                width: auto;
                background: #f15353;
                padding: 0 15px;
                color: #FFF;
                line-height: 3rem;
                float: right;
                border: 1px solid #f15353;
            }
        }
        span {
            color: #f15353;
            font-size: 1.2rem;
        }
    }

    .checkList {
        position: relative;
        top: 30px;
        left: 3px;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    .el-checkbox {
        float: left;
        margin-left: 5px;
    }

    .coupon-list-info {
        width: 99.5vw;
    }

    .coupon_voucher_main {
        position: relative;
        padding-left: 102px;
        height: 80px;
        margin-left: 36px;
        margin-right: 10px;
        margin-bottom: 10px;
        .coupon_voucher_left {
            position: absolute;
            top: 0;
            left: 0;
            width: 102px;
            height: 100%;
            color: #fff;
            border-radius: 4px 0 0 4px;
            text-align: center;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: #47c1c4;
            .coupon_voucher_amount.type_large {
                margin: 0;
                font-size: 22px;
            }
            .coupon_voucher_amount {
                position: relative;
                font-family: helvet;
                font-size: 36px;
                line-height: 1;
            }
            .coupon_voucher_amount:before {
                content: "\00A5";
                font-size: 16px;
                display: inline-block;
                vertical-align: text-top;
                margin-right: 3px;
                line-height: 1;
            }
            .coupon_voucher_limit {
                font-size: 12px;
                line-height: 1;
                margin-top: 15px;
                margin-bottom: 0;
            }
        }



        .coupon_voucher_hr {
            position: absolute;
            top: 0;
            left: 97px;
            width: 6px;
            overflow: hidden;
            height: 100%;
        }
        .coupon_voucher_hr:after {
            box-sizing: border-box;
            position: absolute;
            top: -3px;
            right: -3px;
            bottom: 0;
            content: "• • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •";
            line-height: 10px;
            width: 7px;
            color: #f8fbfb;
            font-size: 18px;
            overflow: hidden;
            z-index: 1;
        }
        .coupon_voucher_right {
            box-sizing: border-box;
            padding: 15px 15px 15px 10px;
            height: 100%;
            border-radius: 0 4px 4px 0;
            background-color: #e5f3f3;
            color: #666;
            .coupon_voucher_range {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: 12px;
                text-align: left;
                margin: 0;
                padding: 0;
                vertical-align: baseline;
            }
            .coupon_voucher_period {
                color: #999;
                font-size: 12px;
                position: absolute;
                bottom: 0;
            }
        }
    }

    .coupon_voucher_gray {
        position: relative;
        padding-left: 102px;
        height: 80px;
        margin-left: 36px;
        margin-right: 10px;
        margin-bottom: 10px;
        .coupon_voucher_left {
            position: absolute;
            top: 0;
            left: 0;
            width: 102px;
            height: 100%;
            color: #fff;
            border-radius: 4px 0 0 4px;
            text-align: center;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: #ccc;
            .coupon_voucher_amount.type_large {
                margin: 0;
                font-size: 22px;
            }
            .coupon_voucher_amount {
                position: relative;
                font-family: helvet;
                font-size: 36px;
                line-height: 1;
            }
            .coupon_voucher_amount:before {
                content: "\00A5";
                font-size: 16px;
                display: inline-block;
                vertical-align: text-top;
                margin-right: 3px;
                line-height: 1;
            }
            .coupon_voucher_limit {
                font-size: 12px;
                line-height: 1;
                margin-top: 15px;
                margin-bottom: 0;
            }
        }

        .coupon_voucher_hr {
            position: absolute;
            top: 0;
            left: 97px;
            width: 6px;
            overflow: hidden;
            height: 100%;
        }
        .coupon_voucher_hr:after {
            box-sizing: border-box;
            position: absolute;
            top: -3px;
            right: -3px;
            bottom: 0;
            content: "• • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •";
            line-height: 10px;
            width: 7px;
            color: #f8fbfb;
            font-size: 18px;
            overflow: hidden;
            z-index: 1;
        }
        .coupon_voucher_right {
            box-sizing: border-box;
            padding: 15px 15px 15px 10px;
            height: 100%;
            border-radius: 0 4px 4px 0;
            background-color: #eee;
            color: #666;
            .coupon_voucher_range {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: 12px;
                text-align: left;
                margin: 0;
                padding: 0;
                vertical-align: baseline;
            }
            .coupon_voucher_period {
                color: #999;
                font-size: 12px;
                position: absolute;
                bottom: 0;
            }
        }
    }

    .mint-header {
        background: none;
        color: #666;
    }

    .is-fixed .mint-header-title {
        font-weight: bold;
    }

    .mint-header.is-fixed {
        border-bottom: 1px solid #e8e8e8;
        background: #FFF;
        z-index: 99;
    }

    .is-right a {
        font-size: .6rem;
    }



    .address_addnav {
        width: 100%;
        padding: 0 3% 0 6%!important;
        position: fixed;
        bottom: 0;
        left: 0;
        background: #f15353 !important;
        color: #fff !important;
        text-align: center;
        height: 44px !important;
        line-height: 44px !important;
    }

    .popup-con {
        width: 100%;
    }

    #goodsinfo .animation {
        top: 0;
        header {
            display: flex;
        }
        .address_addnav {
            display: block;
        }
    }

    #AllGood {
        position: fixed;
        top: 200vh;
        height: 100vh;overflow: scroll;
        width: 100%;
        background: #FFF;
        z-index: 100;
        transition: .6s ease-out;
        display: block;
        #appendAddress .mint-field .mint-cell-title {
            text-align: left;
        }
        .address_addnav,
        header {
            display: none;
        }
        .address_addnav span {
            color: #FFF;
        }
        .address_addnav i {
            color: #fff;
            font-size: 22px;
            position: absolute;
            top: 50%;
            height: 18px;
            line-height: 18px;
            margin-left: -34px;
            margin-top: -9px;
        }

        .maleall {
            background: #FFF;
            text-align: left;
        }
        #appendAddress{}

        #appendAddress .males {

            line-height: 50px;
            display: flex;
            border-top: 1px solid #d9d9d9;
            margin-left: 10px;
            padding-right: 10px;
            position: relative;
            .address {
                display: inline-block;
                position: relative;
                width: 70%;
                float: right;
                box-sizing: border-box;
                padding-top: 8px
            }
        }

        .maleall span {
            color: #333;
            font-size: 16px;
            vertical-align: middle;
            width: 105px;
            -webkit-box-flex: 0;
            -ms-flex: none;
            flex: none;
            display: inline-block;
            line-height: 50px;
        }

        #appendAddress .maleall .males .address {
            position: absolute !important;
            right: 20px !important;
            top:0px;
        }


        .maleall .el-select{
            width: 65%;
            float: right;
            position: relative;
        }


        #address {
            flex: 1;
            line-height: 50px;
            .mint-button--default {
                line-height: 50px;
                text-align: left;
                font-size: 16px;
            }
        }
    }
</style>