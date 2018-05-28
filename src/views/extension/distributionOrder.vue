<template>
    <div id="distributionOrder">
        
        <c-title :hide="false" :text='mailTitle'></c-title>
        

        <template>
           
            <mt-navbar v-model="selected" fixed style="margin-top: 40px;">
                <mt-tab-item id="0" @click.native="swichTabTItem">全部</mt-tab-item>
                <mt-tab-item id="1" @click.native="swichTabTItem"> 待付款</mt-tab-item>
                <mt-tab-item id="2" @click.native="swichTabTItem">已付款</mt-tab-item>
                <mt-tab-item id="3" @click.native="swichTabTItem">已完成</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected" style="margin-top: 92px;">
                <mt-tab-container-item id="0">

                    <div class="order" v-for="(item,index) in statusData0">
                        <font @click="toggle($event,index)" class="or">
                            <div class="tbs" v-if="item.order">
                                <div class="item2">{{item.order.order_sn}}({{item.hierarchy}}级)
                                    <br>{{item.order.create_time}}</div>
                                <div class="item3">
                                    <p>+{{item.commission}}</p>
                                    <!--分销佣金-->
                                    <span class="red">{{item.order.status_name}}</span>
                                </div>
                            </div>
                        </font>
                        <!--点击展开    ——Collapse 折叠面板   手风琴效果，每次只能展开一个面板-->
                        <div class="order_detail" :class="{'opens':index==display}" v-if="open_order_detail==1||open_order_buyer==1">
                            <div class="team_list" v-if="open_order_buyer==1">
                                <div class="img" v-if="item.member">
                                    <img :src="item.member.avatar">
                                </div>
                                <div class="info" v-if="item.member">{{item.member.nickname}}
                                    <br>
                                    <span>微信号:</span>
                                </div>
                            </div>
                            <div class="team_goods" id="distribution-goods" v-for="goods in item.order_goods" v-if="open_order_detail==1">
                                <div class="img">
                                    <img :src="goods.thumb">
                                </div>
                                <div class="inner">
                                    <div class="name">{{goods.title}}</div>
                                </div>
                                <div class="price">
                                    <b>￥{{(goods.goods_price/goods.total)}}
                                        <br> ×{{goods.total}}</b>
                                    <div class="Total">￥{{goods.goods_price}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="1">
                    <div class="order" v-for="(item,index) in statusData1">
                        <font @click="toggle($event,index)">
                            <div class="tbs" v-if="item.order">
                                <div class="item2">{{item.order.order_sn}}({{item.hierarchy}}级)
                                    <br>{{item.order.create_time}}</div>
                                <div class="item3">
                                    <p>+{{item.commission}}</p>
                                    <!--分销佣金-->
                                    <span class="red">{{item.order.status_name}}</span>
                                </div>
                            </div>
                        </font>
                        <!--点击展开    ——Collapse 折叠面板   手风琴效果，每次只能展开一个面板-->
                        <div class="order_detail" :class="{'opens':index==display}" v-if="open_order_detail==1||open_order_buyer==1">
                            <div class="team_list" v-if="open_order_buyer==1">
                                <div class="img" v-if="item.member">
                                    <img :src="item.member.avatar">
                                </div>
                                <div class="info" v-if="item.member">{{item.member.nickname}}
                                    <br>
                                    <span>微信号:</span>
                                </div>
                            </div>
                            <div class="team_goods" id="distribution-goods" v-for="goods in item.order_goods" v-if="open_order_detail==1">
                                <div class="img">
                                    <img :src="goods.thumb">
                                </div>
                                <div class="inner">
                                    <div class="name">{{goods.title}}</div>
                                </div>
                                <div class="price">
                                    <b>￥{{(goods.goods_price/goods.total)}}
                                        <br> ×{{goods.total}}</b>
                                    <div class="Total">￥{{goods.goods_price}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <div class="order" v-for="(item,index) in statusData2">
                        <font @click="toggle($event,index)">
                            <div class="tbs" v-if="item.order">
                                <div class="item2">{{item.order.order_sn}}({{item.hierarchy}}级)
                                    <br>{{item.order.create_time}}</div>
                                <div class="item3">
                                    <p>+{{item.commission}}</p>
                                    <!--分销佣金-->
                                    <span class="red">{{item.order.status_name}}</span>
                                </div>
                            </div>
                        </font>
                        <!--点击展开    ——Collapse 折叠面板   手风琴效果，每次只能展开一个面板-->
                        <div class="order_detail" :class="{'opens':index==display}" v-if="open_order_detail==1||open_order_buyer==1">
                            <div class="team_list" v-if="open_order_buyer==1">
                                <div class="img" v-if="item.member">
                                    <img :src="item.member.avatar">
                                </div>
                                <div class="info" v-if="item.member">{{item.member.nickname}}
                                    <br>
                                    <span>微信号:</span>
                                </div>
                            </div>
                            <div class="team_goods" id="distribution-goods" v-for="goods in item.order_goods" v-if="open_order_detail==1">
                                <div class="img">
                                    <img :src="goods.thumb">
                                </div>
                                <div class="inner">
                                    <div class="name">{{goods.title}}</div>
                                </div>
                                <div class="price">
                                    <b>￥{{(goods.goods_price/goods.total)}}
                                        <br> ×{{goods.total}}</b>
                                    <div class="Total">￥{{goods.goods_price}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <div class="order" v-for="(item,index) in statusData3">
                        <font @click="toggle($event,index)">
                            <div class="tbs" v-if="item.order">
                                <div class="item2">{{item.order.order_sn}}({{item.hierarchy}}级)
                                    <br>{{item.order.create_time}}</div>
                                <div class="item3">
                                    <p>+{{item.commission}}</p>
                                    <!--分销佣金-->
                                    <span class="red">{{item.order.status_name}}</span>
                                </div>
                            </div>
                        </font>
                        <!--点击展开    ——Collapse 折叠面板   手风琴效果，每次只能展开一个面板-->
                        <div class="order_detail" :class="{'opens':index==display}" v-if="open_order_detail==1||open_order_buyer==1">
                            <div class="team_list" v-if="open_order_buyer==1">
                                <div class="img" v-if="item.member">
                                    <img :src="item.member.avatar">
                                </div>
                                <div class="info" v-if="item.member">{{item.member.nickname}}
                                    <br>
                                    <span>微信号:</span>
                                </div>
                            </div>
                            <div class="team_goods" id="distribution-goods" v-for="goods in item.order_goods" v-if="open_order_detail==1">
                                <div class="img">
                                    <img :src="goods.thumb">
                                </div>
                                <div class="inner">
                                    <div class="name">{{goods.title}}</div>
                                </div>
                                <div class="price">
                                    <b>￥{{(goods.goods_price/goods.total)}}
                                        <br> ×{{goods.total}}</b>
                                    <div class="Total">￥{{goods.goods_price}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
        </template>

    </div>
</template>
<script>
import distributionOrder from './distributionOrder_controller';
export default distributionOrder;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#distributionOrder {
    .order {
        margin-bottom: 5px;
        .tbs {
            background: #FFF;
            overflow: hidden;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #D9D9D9;
            line-height: 1.3rem;
            padding: 10px;
            .item2 {
                flex: 2;
                text-align: left;
                color: #666;
            }
            .item3 {
                text-align: right;
                .red {
                    color: red;
                }
                p {
                    margin: 0;
                    color: #222;
                }
            }
        }
        .order_detail.opens {
            display: block;
        }
        .order_detail {
            display: none;
            overflow: hidden;
            background: #fff;
            border-top: 1px solid #eaeaea;
            .team_list {
                padding: 10px;
                overflow: hidden;
                .img {
                    width: 14%;
                    float: left;
                    text-align: left;
                    height: 0;
                    padding-bottom: 14%;
                    position: relative;
                    img {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                    }
                }
                .info {
                    height: 40px;
                    width: 80%;
                    float: left;
                    font-size: 0.857rem;
                    color: #222;
                    line-height: 1.429rem;
                    text-align: left;
                    padding: 0 5px;
                    span {
                        color: #666666;
                    }
                }
            }
        }
    }

    #distribution-goods {
        display: flex;
        align-items: stretch;
        flex-flow: row wrap;
        padding: 10px;
        border-top: 1px solid #eaeaea;
        .img {
            flex: 1;
            img {
                width: 100%;
            }
        }
        .inner {
            flex: 5;
            padding: 0 5px;
            display: flex;
            align-items: flex-start;
        }
        .name {
            flex: 5;
            text-align: justify;
        }
        .price {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            b {
                flex: 3;
                text-align: right;
                color: #666;
                font-size: 0.786rem;
                font-weight: normal;
            }
            .evaluate-yet {
                margin: 0;
                color: #888;
                float: right;
                line-height: 1.6rem;
            }
        }
    }
}
</style>