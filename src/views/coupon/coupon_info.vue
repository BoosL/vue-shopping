<template>
    <div id="coupon_info">
        <c-title :hide="false" text='优惠券详情'></c-title>

        <div style="height: 40px;"></div>

        <div class="coupon_info">
            <div class="coupon_top">
                <!--待使用-->
                <div class="coupon_voucher  bg_dong  newarrive"  id="" >

                    <div class="coupon_voucher_main">
                        <div class="coupon_voucher_left ">

                            <p class="coupon_voucher_amount type_large">150</p>
                            <p class="coupon_voucher_limit">满1000元可用</p>

                        </div>
                        <div class="coupon_voucher_hr"></div>
                        <div class="coupon_voucher_right">
                            <p class="coupon_voucher_range">
                                <span tag="quotaText2">仅可购买自营奢侈品部分商品</span></p>
                            <!-- 蓝色：bg_1，红色：bg_2 -->
                            <a href="javascript:;" class="coupon_voucher_btn bg_1">删除</a>
                            <p class="coupon_voucher_period">2017.03.27-2017.04.02</p>
                            <p class="coupon_voucher_more on">详细<i class="fa fa-angle-down coupon_voucher_more_arr"></i></p>
                        </div>

                    </div>

                    <div class="coupon_voucher_btm">
                        <p class="coupon_voucher_explain">可在全平台使用</p>
                    </div>

                </div>

                <!--已过期-->
                <div class="coupon_voucher  disabled expired"   style="display: none">

                    <div class="coupon_voucher_main">
                        <div class="coupon_voucher_left">
                            <i class="coupon_voucher_label color_red"><span class="coupon_voucher_label_text">已过期</span></i>
                            <p class="coupon_voucher_amount type_large">150</p>
                            <p class="coupon_voucher_limit">满1000元可用</p>

                        </div>
                        <div class="coupon_voucher_hr"></div>
                        <div class="coupon_voucher_right">
                            <p class="coupon_voucher_range">
                                <span tag="quotaText2">仅可购买自营奢侈品部分商品</span></p>
                            <!-- 蓝色：bg_1，红色：bg_2 -->

                            <p class="coupon_voucher_period">2017.03.27-2017.04.02</p>
                            <p class="coupon_voucher_more on">详细<i class="fa fa-angle-down coupon_voucher_more_arr"></i></p>
                        </div>

                    </div>

                    <div class="coupon_voucher_btm">
                        <p class="coupon_voucher_explain">可在全平台使用</p>
                    </div>

                </div>

                <!--已使用-->
                <div class="coupon_voucher  disabled used" style="display: none"  >

                    <div class="coupon_voucher_main">
                        <div class="coupon_voucher_left">
                            <i class="coupon_voucher_label color_red"><span class="coupon_voucher_label_text">已使用</span></i>
                            <p class="coupon_voucher_amount type_large">150</p>
                            <p class="coupon_voucher_limit">满1000元可用</p>

                        </div>
                        <div class="coupon_voucher_hr"></div>
                        <div class="coupon_voucher_right">
                            <p class="coupon_voucher_range">
                                <span tag="quotaText2">仅可购买自营奢侈品部分商品</span></p>

                            <p class="coupon_voucher_period">2017.03.27-2017.04.02</p>
                            <p class="coupon_voucher_more on">详细<i class="fa fa-angle-down coupon_voucher_more_arr"></i></p>
                        </div>

                    </div>
                    <div class="coupon_voucher_btm">
                        <p class="coupon_voucher_explain">可在全平台使用</p>
                    </div>

                </div>


                <div class="coupon_board_tip" >
                    <p tag="moreinfo"><span>ID:</span> 9838251301</p>
                    <p class="coupon_leftTime"><span>时间：</span>剩<em>不到1天</em>过期</p>  <!--如已过期则不显示剩余时间-->
                </div>

            </div>
            <div class="coupon_detail">
                <p class="coupon_detail_tit">更多说明</p>
                <div class="more">
                    后台说明

                </div>
            </div>
        </div>
    </div>


</template>
<script>
    import cTitle from 'components/title';
    export default {
        data() {
            return {
                selected:''
            }
        },
        methods:{

        },
        components: { cTitle }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../assets/css/coupon_index.scss'
</style>