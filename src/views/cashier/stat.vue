<template>
    <div id="all">
            <div id="member">
                <c-title :hide="false" text='统计结算'></c-title>
                <div class="header">
                    <!--<div class="back"><i class="mintui mintui-back" @click="goback"></i></div>-->
                    <div class="user">
                        <div class="user-head">
                            <img :src="store.thumb">
                        </div>
                        <div data-v-21e0c5a4="" class="cashier-name" style="">{{store.name}}</div>
                        <div class="user-info">
                        </div>

                    </div>
                </div>


                <div>
                    <yd-button-group>
                        <yd-button size="large" @click.native="getStat(1)">查看今日数据</yd-button>
                    </yd-button-group>
                </div>
                <div class="cart">
                    <!--<router-link to="/member/marketing">
                                <div class="list1" ><div class="ico marketing"></div>
                                    营销工具
                                    <i class="fa fa-angle-right" ></i></div>
                            </router-link>-->
                    <!--<router-link to=""><div class="list1" style="margin:0px;"><i class="iconfont icon-article"></i>我的消息<i class="fa fa-angle-right" style="color:#999; font-size:26px; float:right; line-height:44px;"></i></div></router-link>-->
                    <div class="listStat">
                        <div class="ico extension"></div>累计订单金额
                        <i class="statRight">￥{{stat.order_price}}</i>
                    </div>
                    <div class="listStat">
                        <div class="ico extension"></div>应收款金额
                        <i class="statRight">￥{{stat.receivable_price}}</i>
                    </div>
                    <div class="listStat">
                        <div class="ico extension"></div>已提现金额
                        <i class="statRight">￥{{stat.finish_withdraw}}</i>
                    </div>
                    <div class="listStat">
                        <div class="ico extension"></div>未结算金额
                        <i class="statRight">￥{{stat.not_withdraw}}</i>
                    </div>

                    <div class="listStat">
                        <div class="ico extension"></div>奖励会员积分数量
                        <i class="statRight">{{stat.remard_buyer_point}}</i>
                    </div>
                    <div class="listStat" v-if="stat.is_open_love">
                        <div class="ico extension"></div>奖励会员{{stat.love_name}}数量
                        <i class="statRight">{{stat.remard_buyer_love}}</i>
                    </div>
                    <div class="listStat">
                        <div class="ico extension"></div>奖励商家积分数量
                        <i class="statRight">{{stat.remard_store_point}}</i>
                    </div>
                    <div class="listStat" v-if="stat.is_open_love">
                        <div class="ico extension"></div>奖励商家{{stat.love_name}}数量
                        <i class="statRight">{{stat.remard_store_love}}</i>
                    </div>
                    <div class="listStat">
                        <div class="ico extension"></div>奖励会员优惠券数量
                        <i class="statRight">{{stat.remard_buyer_coupon}}</i>
                    </div>
                    <div class="listStat">
                        <div class="ico extension"></div>积分抵扣
                        <i class="statRight">￥{{stat.deduct_point}}</i>
                    </div>
                    <div class="listStat" v-if="stat.is_open_love">
                        <div class="ico extension"></div>{{stat.love_name}}抵扣
                        <i class="statRight">￥{{stat.deduct_love}}</i>
                    </div>
                    <div class="listStat">
                        <div class="ico extension"></div>优惠券抵扣
                        <i class="statRight">￥{{stat.deduct_coupon}}</i>
                    </div>

                </div>
                <div style="height: 10px;clear: both;"></div>
                <mt-button type="primary" size="large" @click="outInfo($event)" v-if="myType==5">退出登录</mt-button>


                <div style="height: 60px;clear: both;"> </div>
                <!--<div slot="top" class="mint-loadmore-top">
                            <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
                            <span v-show="topStatus === 'loading'">Loading...</span>
                        </div>-->
            </div>
        <div id="ewm" ref="hook" @click="openQrCode('none')">

            <div class="pic">

                <img :src="poster" alt="">

            </div>

        </div>
        <div id="jpg"></div>
    </div>
</template>

<script>
  import stat from './stat_controller';
  export default stat;

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../assets/css/cashier.scss';
</style>
