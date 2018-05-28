<template>
    <div id="teamAgentCenter">
        <c-title :hide="false" text='固定奖励'></c-title>
        <div class="share_holder">
            <p>
                <span>累计奖励金额:{{total}}元</span>
               
            </p>
        </div>
    
        <div class="content">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="奖励" name="first">
    
                    <ul class='rationList'>
                        <li v-for="item in first_content">
                            <div class="detail">
                                <div class="info">
                                    <div class="left">
                                        <span>奖励类型:{{item.queue_name}}</span>
                                        <p>时间:{{item.created_at}}</p>
                                    </div>
                                    <div class="right">
                                        <b>奖励金额:{{item.dividend_amount}}</b>
                                        <span>总奖励金额:{{item.amount}}</span>
                                    </div>
                                </div>
    
                            </div>
    
                        </li>
                    </ul>
    
                </el-tab-pane>
                <el-tab-pane  label="奖励" name="second" v-if="false">
    
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
                                        <b>{{item.dividend_amount}}</b>
                                        <br>
                                        <span>{{item.status_name}}</span>
    
                                    </div>
                                </div>
    
                            </div>
    
                        </li>
                    </ul>
    
                </el-tab-pane>
                <el-tab-pane  label="奖励" name="third" v-if="false">
    
                    <ul class='rationList'>
                        <li v-for="elem in third_content">
                            <div class="detail">
                                <!--<span class="month">{{elem.create_month}}</span>-->
                                <div class="info">
                                    <div class="left">
                                        <h4>下级
                                            <b>{{elem.subordinate_name}}</b>{{elem.level_name}}</h4>
                                        <span class="created">{{elem.created_at}}</span>
                                    </div>
                                    <div class="right">
                                        <b class="created">+{{elem.reward_amount}}</b>
                                    </div>
                                </div>
    
                            </div>
    
                        </li>
                    </ul>
                </el-tab-pane>
            </el-tabs>
    
        </div>
    
    </div>
</template>

<script>
import fixed_reward_controller from './fixed_reward_controller';
export default fixed_reward_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

*{box-sizing:border-box}
#teamAgentCenter {
    .share_holder {
        margin-bottom: 10px;
        margin-top: 40px;
        p {
            padding: 0 10px;
            height: 60px;
            line-height: 25px;
            padding-top: 5px;
            box-sizing: border-box;
            background: #f15353;
            color: #fff;

            span:first-child {
                float: left;
                line-height: 50px
            }

            span:nth-child(2) {
                float: left;
                font-size: 13px;
            }

            span:last-child {
                float: left;
                font-size: 13px;
            }
        }

        .today_bonus {
            width: 100%;
            height: 66px;
            background: #fff;
            padding: 8px 0;
            box-sizing: border-box;
            position: relative;
            border-bottom: 1px solid #ddd;

            li.line {
                position: absolute;
                width: 1px;
                height: 65px;
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
                    top: 30px;
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
                    color: #333;
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
                border-right: 1px solid #ddd;
            }

            li.mounth {
                width: 33%;

                span {
                    color: #fc6a70;
                }
            }
        }
    }
    .code {
        height: 44px;
        width: 100%;
        background: #fff;
        padding: 0 0 0 3%;
        font-size: .9rem;
        line-height: 44px;
        color: #333;
        text-align: left;
        margin-top: 6px;
        box-sizing: border-box;


        i {
            float: right;
            line-height: 44px;
            display: inline-block;
            font-size: 0.9rem;
            margin-right: 6px;
            color: #929292;
            width: 20px;
            height: 20px;
            text-align: center;
            background-size: 20px;
        }
    }


    .content {
        .ratioNav {
            padding: 0px;
            margin: 0px;
            height: 38px;
            width: 100%;
            background: #fff;
            border-bottom: 1px solid #cdcdcd;
            border-top: 1px solid #cdcdcd;

            li {
                float: left;
                width: 33%;
                text-align: center;
                line-height: 35px;
                font-size: 14px;
                color: #666;
            }
        }
        .rationList {
            padding: 0px;
            margin: 0px;
            li {  border-bottom: 1px solid #f3f3f3;
                span.month{display: block;
                    text-align: left;
                    padding: 5px 10px;
                    background: #f0f0f0;}
                .info{border-bottom: 1px solid #eee;  overflow: hidden;padding:10px; background:#fff;   
                line-height: 20px;
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
                        span.created{font-size:12px}
                        h4{font-weight:normal;b{font-weight:normal;color:#f15353}}
                    }
                    .right {
                        float: right;
                        width: 30%;
                        color: #20b86a;
                        text-align:right;
                        p{  margin: 0;
                            padding: 0;
                            font-size: 12px;
                            color: #888;}
                            b{font-weight:normal;}
                            b.created{line-height:35px;}
                    }
                }
            }
        }
    }
}
</style>