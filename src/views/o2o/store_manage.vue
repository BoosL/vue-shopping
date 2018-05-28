<template>
    <div id="all">
            <div id="member">
                <c-title :hide="false" text='门店中心'></c-title>
                <div class="header">
                    <!--<div class="back"><i class="mintui mintui-back" @click="goback"></i></div>-->
                    <div class="user">
                        <div class="user-head">
                            <img :src="store.thumb">
                        </div>
                        <div data-v-21e0c5a4="" class="cashier-name" style="">{{store.name}}</div>
                        <div class="user-info">
                            <router-link :to="fun.getUrl('storeWithdrawals')">
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

                    <router-link :to="fun.getUrl('storeOrderlist',{ status:'0', orderType: 'store' })">
                        <div class="list1">
                            <div class="ico extension"></div>我的订单
                            <i class="fa fa-angle-right"></i>
                        </div>
                    </router-link>
                    <router-link :to="fun.getUrl('presentationRecord')">
                        <div class="list1">
                            <div class="ico extension"></div>提现记录
                            <i class="fa fa-angle-right"></i>
                        </div>
                    </router-link>

                    

                </div>
                <div style="height: 10px;clear: both;"></div>
              
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
import store_manage_controller from "./store_manage_controller";
export default store_manage_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/css/cashier.scss";
</style>