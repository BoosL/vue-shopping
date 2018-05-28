<template>
    <div id="shareholderCenter">
        <c-title :hide="false" text='区域分红中心'></c-title>
    
        <div class="share_holder">
            <p>
                <span>{{level_name}}</span>
                <span>分红比例:{{rate}}%</span>
            </p>
            <ul class="today_bonus">
                <li v-for="item in ratioDatas" :class="item.name">
                    <span>{{item.money}}</span>
                    <br>
                    <b>{{item.data}}</b>
                </li>
                <li class="line">
                    <div class="careat"></div>
                </li>
            </ul>
        </div>
        <div class="shareholder-order">
            <div id="tabs">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="全部" name="first">

                        <ul class='rationList'>

                            <li v-for="elem in first_content">
                                <div class="detail">
                                    <span class="month">{{elem.create_month}}</span>
                                    <div class="info" v-for="item in elem.has_many_dividend">
                                        <div class="left">
                                            <span>订单号：{{item.order_sn}}</span>
                                            <p>时间：{{item.created_at}}</p>

                                        </div>
                                        <div class="right">
                                            <span>分红+{{item.dividend_amount}}</span>
                                            <p>{{item.status_name}}</p>
                                        </div>
                                    </div>
    
                                </div>
    
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="已结算" name="second">
                        <ul class='rationList'>
                            <li v-for="elem in second_content">
                                <div class="detail">
                                    <span class="month">{{elem.create_month}}</span>
                                    <div class="info" v-for="item in elem.has_many_dividend">
                                        <div class="left">
                                            <span>订单号：{{item.order_sn}}</span>
                                            <p>时间：{{item.created_at}}</p>

                                        </div>
                                        <div class="right">
                                            <span>分红+{{item.dividend_amount}}</span>
                                            <p>{{item.status_name}}</p>
                                        </div>
                                    </div>
    
                                </div>
    
                            </li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="未结算" name="third">
                        <ul class='rationList'>
                            <li v-for="elem in third_content">
                                <div class="detail">
                                    <span class="month">{{elem.create_month}}</span>
                                    <div class="info" v-for="item in elem.has_many_dividend">
                                        <div class="left">
                                            <span>订单号：{{item.order_sn}}</span>
                                            <p>时间：{{item.created_at}}</p>

                                        </div>
                                        <div class="right">
                                          <!--  <img :src="item.img">--> 分红+{{item.dividend_amount}}
                                            <p>{{item.status_name}}</p>
                                        </div>
                                    </div>
    
                                </div>
    
                            </li>
                        </ul>
                    </el-tab-pane>
                </el-tabs>
            </div>
    
        </div>
    
    </div>
</template>

<script>
import regional_agency_center_controller from './regional_agency_center_controller';
export default regional_agency_center_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
p {
    margin: 0;
    padding: 0;
}

#shareholderCenter {
    .m_header {
        width: 100%;
        height: 45px;
        line-height: 45px;
        font-size: 15px;
        font-weight: bold;
        background: #fff;
        span {
            display: inline-block;
            width: 16px;
            height: 24px;
            float: left;
            margin-left: 10px;
            font-size: 30px;
        }
    }
    .share_holder {
        margin-top: 42px;
        p {
            padding: 0 10px;
            height: 45px;
            line-height: 45px;
            background: #f15353;
            color: #fff;
            span:first-child {
                float: left;
            }
            span:last-child {
                float: right;
            }
        }
        .today_bonus {
            width: 100%;
            height: 82px;
            margin-top: 10px;
            background: #fff;
            padding: 20px 0;
            box-sizing: border-box;
            position: relative;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            li.line {
                position: absolute;
                width: 1px;
                height: 80px;
                background: #ddd;
                top: 0;
                right: 32%;
                .careat {
                    width: 8px;
                    height: 8px;
                    border: 1px solid #ddd;
                    border-left: 0;
                    border-bottom: 0;
                    -webkit-transform: rotate(45deg);
                    -moz-transform: rotate(45deg);
                    -ms-transform: rotate(45deg);
                    -o-transform: rotate(45deg);
                    transform: rotate(45deg);
                    background: #fff;
                    position: absolute;
                    top: 37px;
                    right: -4px;
                }
            }
            li {
                height: 44px;
                text-align: center;
                float: left;
                span {

                    font-size: 17px;
                    line-height: 26px;
                }
                b {
                    font-size: 11px;
                    color: 3333;
                }
            }
            li.data {
                width: 22%;
                span {
                    color: #ffa800;
                }
            }
            li:first-child,
            li:nth-child(2) {
                border-right: 1px solid #ccc;
            }
            li.mounth {
                width: 32%;
                span {
                    color: #fc6a70;
                }
            }
        }
    }
    .shareholder-order {
        background: #fff;
        margin-top: 10px;
        .input {
            input {
                margin: 10px 5%;
                width: 80%;
                height: 30px;
                border-radius: 6px;
                border: 0;
                outline: 0;
                padding-left: 30px;
                background: url(../../../../assets/images/search.png) no-repeat 10px 8px #f2f2f2;
            }
        }
        .ratioNav {
            padding: 0px;
            margin: 0px;
            height: 40px;
            width: 100%;
            background: #fff;
            border-bottom: 1px solid #cdcdcd;
            border-top: 1px solid #cdcdcd;
            li {
                float: left;
                width: 33%;
                text-align: center;
                line-height: 40px;
                font-size: 14px;
                color: #666;
                border-bottom: 2px solid transparent;
            }
            .selected {
                color: #f15353 !important;
                border-bottom: 2px solid #f15353;
            }
        }
        .rationList {
            padding: 0px;
            margin: 0px;
            li {
                border-bottom: 1px solid #f3f3f3;

                span.month{display: block;
                    text-align: left;
                    padding: 5px 10px;
                    background: #f0f0f0;}
                .info{border-bottom: 1px solid #eee;  overflow: hidden;padding:10px;    line-height: 20px;
                    .left {
                        width: 70%;
                        float: left;
                        text-align: left;
                        box-sizing: border-box;
                        span {
                            font-size: 14px;
                            font-weight: 400;
                            color: #333;
                        }
                        p {
                            font-size: 12px;
                            color: #999;
                        }
                    }
                    .right {
                        float: left;
                        width: 30%;
                        color: #20b86a;
                        text-align:right;
                        p{    margin: 0;
                            padding: 0;
                            font-size: 12px;
                            color: #888;}
                    }
                }
            }
        }
    }
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: #f3f5f7;
        .input {
            display: flex;
            height: 45px;
            background: #fff;
            box-sizing: border-box;
            margin: 0 10px;
            i {
                font-size: 16px;
                line-height: 45px;
                padding-left: 4px;
            }
            input {
                margin: 10px 5%;
                width: 80%;
                height: 30px;
                background: #f2f2f2;
                border-radius: 6px;
                border: 0;
                outline: 0;
                padding-left: 30px;
            }
        }
        .modal-dialog {
            h1 {
                font-size: 16px;
                color: #666;
                line-height: 55px;
                font-weight: normal;
                text-align: left;
                padding-left: 25px;
            }
            .select-time {
                text-align: center;
                .block {
                    width: 36%;
                    display: inline-block;
                }
                .el-input {
                    width: 100%;
                }
                span {
                    font-size: 22px;
                    font-weight: 400;
                }
            }
            .submit {
                width: 325px;
                height: 40px;
                border-radius: 6px;
                background-color: #f15353;
                text-align: center;
                line-height: 40px;
                color: #fff;
                border: 0;
                outline: 0;
                font-size: 14px;
                font-weight: bold;
                margin-top: 20px;
            }
        }
    }
    .serchActive {
        display: none !important;
    }
}
</style>