<template>
    <div id="all">
            <div id="member">
                <c-title :hide="false" text='收银台'></c-title>
                <div class="header">
                    <!--<div class="back"><i class="mintui mintui-back" @click="goback"></i></div>-->
                    <div class="user">
                        <div class="user-head">
                            <img :src="store.thumb">
                        </div>
                        <div data-v-21e0c5a4="" class="cashier-name" style="">{{store.name}}</div>
                        <div class="user-info">
                            <router-link :to="fun.getUrl('cashier_withdrawals')">
                            <div class="user-name">
                                <div class="b-tixian">提现</div>
                            </div>
                            </router-link>
                        </div>

                    </div>
                </div>
                <div id="userinfo">
                    <ul>
                        <li>
                                <span>￥{{income.money_total}}</span>
                                <br>累计实收金额
                        </li>

                        <li>
                                <span>￥{{income.sure_withdraw_money}}</span>
                                <br>可提现金额
                        </li>
                    </ul>
                </div>


                <div class="cart">
                    <!--<router-link to="/member/marketing">
                                <div class="list1" ><div class="ico marketing"></div>
                                    营销工具
                                    <i class="fa fa-angle-right" ></i></div>
                            </router-link>-->
                    <!--<router-link to=""><div class="list1" style="margin:0px;"><i class="iconfont icon-article"></i>我的消息<i class="fa fa-angle-right" style="color:#999; font-size:26px; float:right; line-height:44px;"></i></div></router-link>-->
                    <router-link :to="fun.getUrl('cashier_qr')">
                        <div class="list1">
                            <yd-icon class="iconfont icon-shoukuan" custom size="18px" color="#ddd"></yd-icon>
                            收款二维码
                            <i class="fa fa-angle-right"></i>
                        </div>
                    </router-link>

                    <router-link :to="fun.getUrl('cashierOrderlist',{ status:'0', orderType: 'cashier' })">
                        <div class="list1">
                            <yd-icon class="iconfont icon-wodedingdan" custom size="18px" color="#ddd"></yd-icon>
                            我的订单
                            <i class="fa fa-angle-right"></i>
                        </div>
                    </router-link>
                    <router-link :to="fun.getUrl('presentationRecord')">
                        <div class="list1">
                            <yd-icon class="iconfont icon-tixianjilu" custom size="18px" color="#ddd"></yd-icon>
                            提现记录
                            <i class="fa fa-angle-right"></i>
                        </div>
                    </router-link>

                    <router-link :to="fun.getUrl('cashier_stat')">
                        <div class="list1">
                            <yd-icon class="iconfont icon-jiesuantongji" custom size="18px" color="#ddd"></yd-icon>
                            统计结算
                            <i class="fa fa-angle-right"></i>
                        </div>
                    </router-link>

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
  import cashier from './cashier_controller';
  export default cashier;

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../assets/css/cashier.scss';
</style>