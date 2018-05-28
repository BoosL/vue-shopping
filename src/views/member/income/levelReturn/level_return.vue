<template>
    <div id="levelReturn">
        <c-title :hide="false" text='分销商全返'></c-title>
        <div class="share_holder">
            <p>
                <span>{{level}}</span>

                <span>返还天数:{{return_time}}</span>
            </p>
            <ul class="today_bonus">
                <li v-for="item in ratioDatas" :class="item.name">
                    <span>{{item.money}}</span>
                    <br>
                    <b>{{item.data}}</b>
                </li>
            </ul>

        </div>

        <div class="content">
            <mt-loadmore v-if="goload" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="coupon_loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='true' id='olis'>
                <el-tabs v-model="activeName" @tab-click="handleClick">

                    <el-tab-pane label="全部" name="first">

                        <ul class='rationList'>
                            <li v-for="elem in first_content">
                                <div class="detail">
                                    <span class="month">{{elem.created_at}}</span>
                                    <div class="info">
                                        <div class="left">
                                            <span>返还ID:{{elem.id}}</span>
                                            <p>返还时间:{{elem.return_time}}天</p>
                                        </div>
                                        <div class="right">
                                            <b>{{elem.amount}}元</b>
                                            <br>
                                            <span>{{elem.status_name}}</span>
                                        </div>
                                    </div>

                                </div>

                            </li>
                        </ul>

                    </el-tab-pane>
                    <el-tab-pane label="未返还" name="second">

                        <ul class='rationList'>
                            <li v-for="elem in second_content">
                                <div class="detail">
                                    <span class="month">{{elem.created_at}}</span>
                                    <div class="info">
                                        <div class="left">
                                            <span>返还ID:{{elem.id}}</span>
                                            <p>返还时间:{{elem.return_time}}天</p>
                                        </div>
                                        <div class="right">
                                            <b>{{elem.amount}}元</b>
                                            <br>
                                            <span>{{elem.status_name}}</span>
                                        </div>
                                    </div>

                                </div>

                            </li>
                        </ul>

                    </el-tab-pane>
                    <el-tab-pane label="已返还" name="third">

                        <ul class='rationList'>
                            <li v-for="elem in third_content">
                                <div class="detail">
                                    <span class="month">{{elem.created_at}}</span>
                                    <div class="info">
                                        <div class="left">
                                            <span>返还ID:{{elem.id}}</span>
                                            <p>返还时间:{{elem.return_time}}天</p>
                                        </div>
                                        <div class="right">
                                            <b>{{elem.amount}}元</b>
                                            <br>
                                            <span>{{elem.status_name}}</span>
                                        </div>
                                    </div>

                                </div>

                            </li>
                        </ul>
                    </el-tab-pane>

                    <el-tab-pane label="无效" name="fourth">

                        <ul class='rationList'>
                            <li v-for="elem in fourth_content">
                                <div class="detail">
                                    <span class="month">{{elem.created_at}}</span>
                                    <div class="info">
                                        <div class="left">
                                            <span>返还ID:{{elem.id}}</span>
                                            <p>返还时间:{{elem.return_time}}天</p>
                                        </div>
                                        <div class="right">
                                            <b>{{elem.amount}}元</b>
                                            <br>
                                            <span>{{elem.status_name}}</span>
                                        </div>
                                    </div>

                                </div>

                            </li>
                        </ul>
                    </el-tab-pane>

                </el-tabs>
            </mt-loadmore>
        </div>

    </div>
</template>

<script>
import level_return_controller from './level_return_controller';
export default level_return_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
* {
    box-sizing: border-box
}

#levelReturn {
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
                font-size: 13px;
                line-height: 50px
            }

            span:nth-child(2) {
                float: right;
                font-size: 13px;
                line-height: 50px
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
                height: 45px;
                background: #ddd;
                margin-top: 10px;
                top: 0;
                right: 32%;

                .careat {
                    position: absolute;
                    width: 1px;
                    height: 65px;
                    background: #ddd;
                    top: 0;
                    right: 32%;
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
                width: 25%;

                span {
                    color: #ffa800;
                }
            }
            li:first-child,
            li:nth-child(2) {
                border-right: 1px solid #ddd;
            }

            li:nth-child(3) {
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
                width: 25%;
                text-align: center;
                line-height: 35px;
                font-size: 14px;
                color: #666;
            }
        }
        .rationList {
            padding: 0px;
            margin: 0px;
            li {
                border-bottom: 1px solid #f3f3f3;
                span.month {
                    display: block;
                    height: 25px;
                    line-height: 25px;
                    text-align: left;
                    padding: 5px 10px;
                    background: #FFFFFF;
                }
                .info {
                    border-bottom: 1px solid #eee;
                    overflow: hidden;
                    padding: 10px;
                    background: #FFFFFF;
                    line-height: 20px;
                    .left {
                        width: 70%;
                        float: left;
                        text-align: left;
                        box-sizing: border-box;
                        span {
                            font-size: 14px;
                            font-weight: 400;
                            height: 20px;
                            line-height: 20px;
                            color: #333;
                        }
                        p {
                            font-size: 12px;
                            height: 20px;
                            line-height: 20px;
                            color: #999;
                        }
                        span.created {
                            font-size: 12px
                        }
                        h4 {
                            font-weight: normal;
                            b {
                                font-weight: normal;
                                color: #f15353
                            }
                        }
                    }
                    .right {
                        float: left;
                        width: 30%;
                        color: #20b86a;
                        text-align: right;
                        p {
                            margin: 0;
                            padding: 0;
                            font-size: 12px;
                            color: #888;
                        }
                        b {
                            font-weight: normal;
                            color: #f15353
                        }
                        b.created {
                            line-height: 35px;
                        }
                    }
                }
            }
        }
    }
}
</style>