<template>
    <div id="coupon_store">
        <c-title :hide="false"
                 text='领券中心'></c-title>
        <div style="height: 40px;"></div>
        <div class="banner">
            <img src="../../assets/images/myextension.png"
                 alt="">
        </div>
    <mt-loadmore v-if="goload"
                     :top-method="loadTop"
                     :bottom-method="loadBottom"
                     :bottom-all-loaded="allLoaded"
                     ref="loadmore"
                     bottomPullText=''
                     bottomDropText='下拉加载...'
                     bottomLoadingText=''
                     :autoFill='true'
                     id='olis'>
        <ul class="coupon-list">
            <div v-for="(item,index) in coupon_list" @click="selectedcoupon(item,index)">
                <!--可领取-->
                <li v-if="item.api_availability==1"
                    class="single-coupon js_coupon">
                    <div class="single-coupon-l">
                        <div class="sc-title">
                            <div class="sc-margin">
                                <div v-if="item.coupon_method==1">
                                    <p class="sc-money">¥{{item.deduct}}</p>
                                    <p class="sc-message">满{{item.enough}}立减</p>
                                </div>
                                <div v-else>
                                    <p class="sc-money">{{item.discount}}折</p>
                                    <p class="sc-message">满{{item.enough}}立享</p>
                                </div>
    
                            </div>
                        </div>
                    </div>
                    <!--可领取-->
                    <div class="single-coupon-m">
                        <p class="scm-text coupon_lineclamp">{{item.name}}</p>
                        <p class="scm-text scm-greytext">已领人数：<span class="js_peopleCount">{{item.has_many_member_coupon_count}}</span>人
                         <br>
                        <em v-if="item.api_remaining !=-1">可领张数：<span class="js_peopleCount">{{item.api_remaining}}</span>张</em>
                        <template v-if="item.api_remaining ==-1">可领张数：多张</template></p>
                    </div>
    
                </li>
                <!--已领取-->
                <li  v-if="item.api_availability==2"
                    class="single-coupon js_coupon">
                    <div class="single-coupon-l">
                        <div class="sc-title">
                            <div class="sc-margin">
                                <div v-if="item.coupon_method==1">
                                    <p class="sc-money">¥{{item.deduct}}</p>
                                    <p class="sc-message">满{{item.enough}}立减</p>
                                </div>
                                <div v-else>
                                    <p class="sc-money">{{item.discount}}折</p>
                                    <p class="sc-message">满{{item.enough}}立享</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--已领取-->
                    <div class="single-coupon-m coupon_remain">
                        <p class="scm-text coupon_lineclamp">{{item.name}}</p>
                        <p class="scm-text scm-greytext">已领人数：<span class="js_peopleCount">{{item.has_many_member_coupon_count}}</span>人
                        <br>
                        <em v-if="item.api_remaining !=-1">可领张数：<span class="js_peopleCount">{{item.api_remaining}}</span>张</em>
                        <template v-if="item.api_remaining ==-1">可领张数：多张</template>
                        </p>
                    </div>
                </li>
    
                <!--已抢光-->
                <li v-if="item.api_availability==3"
                    class="single-coupon no_coupon">
                    <div class="single-coupon-l">
                        <div class="sc-title">
                            <div class="sc-margin">
                                <div v-if="item.coupon_method==1">
                                    <p class="sc-money">¥{{item.deduct}}</p>
                                    <p class="sc-message">满{{item.enough}}立减</p>
                                </div>
                                <div v-else>
                                    <p class="sc-money">{{item.discount}}折</p>
                                    <p class="sc-message">满{{item.enough}}立享</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--已抢光-->
                    <div class="single-coupon-m coupon_remain">
                        <p class="scm-text coupon_lineclamp">{{item.name}}</p>
                        <p class="scm-text scm-greytext">已领人数：<span class="js_peopleCount">{{item.has_many_member_coupon_count}}</span>人</p>
                    </div>
                </li>
            </div>
    
        </ul>
    </mt-loadmore>
    </div>
</template>
<script>
import coupon_infocontroller from './coupon_storecontroller';
export default coupon_infocontroller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/css/coupon_index.scss'
</style>