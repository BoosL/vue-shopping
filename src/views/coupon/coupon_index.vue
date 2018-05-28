<template>
    <div id="coupon_index">
        <c-title :hide="false" text='我的优惠券'></c-title>

        <div style="height: 40px;"></div>
        <mt-navbar v-model="selected">
            <mt-tab-item id="1" @click.native="switchItem">待使用</mt-tab-item>
            <mt-tab-item id="2" @click.native="switchItem">已过期</mt-tab-item>
            <mt-tab-item id="3" @click.native="switchItem">已使用</mt-tab-item>

        </mt-navbar>
        <!-- <mt-loadmore v-if="goload" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="coupon_loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='true' id='olis'> -->
            <mt-tab-container v-model="selected">

                <div class="coupon_card">
                    <mt-tab-container-item id="1">
                        <!--待使用-->
                        <div class="coupon_voucher  bg_dong  newarrive" v-for='(item,index) in wait_used'>

                            <mt-cell-swipe title="" :right="[{content: '删除', style: { background: 'red', color: '#fff' },
                      handler: () => {delteteItem(item,index)}}]">

                                <div class="coupon_voucher_main">
                                    <div class="coupon_voucher_left ">
                                        <div v-if="item.belongs_to_coupon.coupon_method==1">
                                            <p class="coupon_voucher_amount type_large">{{item.belongs_to_coupon.deduct}}</p>
                                            <p class="coupon_voucher_limit">满{{item.belongs_to_coupon.enough}}立减</p>
                                        </div>
                                        <div v-if="item.belongs_to_coupon.coupon_method==2">
                                            <p class="coupon_voucher_amount type_large">{{item.belongs_to_coupon.discount}}折</p>
                                            <p class="coupon_voucher_limit">满{{item.belongs_to_coupon.enough}}立享</p>
                                        </div>
                                    </div>
                                    <div class="coupon_voucher_hr"></div>
                                    <div class="coupon_voucher_right">
                                        <p class="coupon_voucher_range">
                                            <span tag="quotaText2">{{item.belongs_to_coupon.name}}</span>
                                        </p>
                                        <p class="coupon_voucher_range1" @click="presenter(item,index)" v-if="isPresenter">
                                            <span tag="quotaText2">赠送</span>
                                        </p>
                                        <!-- 蓝色：bg_1，红色：bg_2 -->

                                        <button @click='goBuy(item)' class="coupon_voucher_btn bg_1">去使用</button>
                                        <p class="coupon_voucher_period">{{item.time_start}}-{{item.time_end}}</p>

                                        <p class="coupon_voucher_more on" @click='toggle($event,index)'>详细
                                            <i class="fa coupon_voucher_more_arr" :class="{'fa-angle-down':index==display,'fa-angle-right':index!=display}"></i>

                                        </p>
                                    </div>

                                </div>
                            </mt-cell-swipe>
                            <!--点击详细下拉显示coupon_voucher_btm-->
                            <div class="coupon_voucher_btm" :class="{'hies':display==index}">
                                <p class="coupon_voucher_explain">{{item.api_limit}}</p>
                            </div>
                            <!--右划删除-->
                            <!--   <div class="coupon_voucher_del" >删除</div>-->

                        </div>
                    </mt-tab-container-item>
                    <!--已过期-->
                    <mt-tab-container-item id="2">
                        <div v-for='(item,index) in overdue' class="coupon_voucher  disabled expired">
                            <mt-cell-swipe title="" :right="[{content: '删除', style: { background: 'red', color: '#fff' },
                      handler: () => {delteteItem(item,index)}}]">
                                <div class="coupon_voucher_main">
                                    <div class="coupon_voucher_left">
                                        <i class="coupon_voucher_label color_red">
                                            <span class="coupon_voucher_label_text">已过期</span>
                                        </i>
                                        <div v-if="item.belongs_to_coupon.coupon_method==1">
                                            <p class="coupon_voucher_amount type_large">¥{{item.belongs_to_coupon.deduct}}</p>
                                            <p class="coupon_voucher_limit">满{{item.belongs_to_coupon.enough}}立减</p>
                                        </div>
                                        <div v-if="item.belongs_to_coupon.coupon_method==2">
                                            <p class="coupon_voucher_amount type_large">{{item.belongs_to_coupon.discount}}折</p>
                                            <p class="coupon_voucher_limit">满{{item.belongs_to_coupon.enough}}立享</p>
                                        </div>

                                    </div>
                                    <div class="coupon_voucher_hr"></div>
                                    <div class="coupon_voucher_right">
                                        <p class="coupon_voucher_range">
                                            <span tag="quotaText2">{{item.belongs_to_coupon.name}}</span>
                                        </p>
                                        <!-- 蓝色：bg_1，红色：bg_2 -->

                                        <p class="coupon_voucher_period">{{item.time_start}}-{{item.time_end}}</p>
                                        <p class="coupon_voucher_more on" @click='toggle($event,index)'>详细
                                            <i class="fa coupon_voucher_more_arr" :class="{'fa-angle-down':index==display,'fa-angle-right':index!=display}"></i>
                                        </p>
                                    </div>

                                </div>
                            </mt-cell-swipe>
                            <!--点击详细下拉显示coupon_voucher_btm-->
                            <div class="coupon_voucher_btm" :class="{'hies':display==index}">
                                <p class="coupon_voucher_explain">{{item.api_limit}}</p>
                            </div>

                            <!--<div class="coupon_voucher_del" >删除</div>-->
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="3">
                        <!--已使用-->
                        <div v-for='(item,index) in used' class="coupon_voucher  disabled used">
                            <mt-cell-swipe title="" :right="[{content: '删除', style: { background: 'red', color: '#fff' },
                      handler: () => {delteteItem(item,index)}}]">
                                <div class="coupon_voucher_main">
                                    <div class="coupon_voucher_left">
                                        <i class="coupon_voucher_label color_red">
                                            <span class="coupon_voucher_label_text">已使用</span>
                                        </i>
                                        <div v-if="item.belongs_to_coupon.coupon_method==1">
                                            <p class="coupon_voucher_amount type_large">¥{{item.belongs_to_coupon.deduct}}</p>
                                            <p class="coupon_voucher_limit">满{{item.belongs_to_coupon.enough}}立减</p>
                                        </div>
                                        <div v-if="item.belongs_to_coupon.coupon_method==2">
                                            <p class="coupon_voucher_amount type_large">{{item.belongs_to_coupon.discount}}折</p>
                                            <p class="coupon_voucher_limit">满{{item.belongs_to_coupon.enough}}立享</p>
                                        </div>

                                    </div>
                                    <div class="coupon_voucher_hr"></div>
                                    <div class="coupon_voucher_right">
                                        <p class="coupon_voucher_range">
                                            <span tag="quotaText2">{{item.belongs_to_coupon.name}}</span>
                                        </p>
                                        <!-- 蓝色：bg_1，红色：bg_2 -->

                                        <p class="coupon_voucher_period">{{item.time_start}}-{{item.time_end}}</p>
                                        <p class="coupon_voucher_more on" @click='toggle($event,index)'>详细
                                            <i class="fa coupon_voucher_more_arr" :class="{'fa-angle-down':index==display,'fa-angle-right':index!=display}"></i>
                                        </p>
                                    </div>

                                </div>
                            </mt-cell-swipe>
                            <div class="coupon_voucher_btm" :class="{'hies':display==index}">
                                <p class="coupon_voucher_explain">{{item.api_limit}}</p>
                            </div>

                            <!--  <div class="coupon_voucher_del" >删除</div>-->
                        </div>

                    </mt-tab-container-item>

                </div>

            </mt-tab-container>
        <!-- </mt-loadmore> -->
        <div class="coupon-shop">
            <router-link :to="fun.getUrl('couponStore')">
                <p>更多优惠去领券中心</p>
            </router-link>
        </div>
    </div>
</template>
<script>
import couponcontroller from './coupon_indexcontroller';
export default couponcontroller;

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/css/coupon_index.scss'
</style>