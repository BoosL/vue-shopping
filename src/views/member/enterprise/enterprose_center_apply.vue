<template>
    <div id="areaAgent">
        <div class="banner">
            <img src="../../../assets/images/myextension.png">
        </div>
    
        <!--已通过-->
        <div class="success" v-if="status=='1'">
            <div class="ico">
                <i class="fa fa-check"></i>
            </div>
            <div class="text">恭喜您已通过审核</div>
            <a @click="goEnterproseCentre()">
                <div class="sub">去招商中心</div>
            </a>
        </div>
        <!--可申请-->
        <div class="content" v-if="status=='-1'">
            <template v-if="config_status=='1'">
                <p class="title">申请招商中心</p>
                <div class="text">开启会员关系链，如果成为招商员，那么只要您的粉丝成为供应商，即可获得供应商的分红哦，快来申请吧~</div>
                <button type="button" @click="submit" class="submit">申&nbsp;请</button>
            </template>
            <template v-if="config_status=='2'">
                <p class="title">申请招商中心</p>
                <div class="text">团队会员人数
                    <span>{{config2.total}}</span>人 您还差
                    <span>{{config2.diff}}</span>人</div>
                <button type="button" @click="submit" class="submit">申&nbsp;请</button>
            </template>
    
            <template v-if="config_status=='3'">
                <p class="title">申请招商中心</p>
                <div class="text">请购买指定商品
                    <span>{{config3.goods_title}}</span>
                </div>
                <button type="button" @click="goToGoods(config3.goods_id)" class="submit">购 买</button>
            </template>
    
            <template v-if="config_status=='4'">
                <p class="title">申请招商中心</p>
                <div class="text">自购订单金额
                    <span>{{config4.total}}</span>元 您还差
                    <span>{{config4.diff}}</span>元</div>
                <button type="button" @click="submit" class="submit">申&nbsp;请</button>
            </template>


            <template v-if="config_status=='5'">
                <p class="title">申请招商中心</p>
                <div class="text">团队总消费金额
                    <span>{{config5.total}}</span>元 您还差
                    <span>{{config5.diff}}</span>元</div>
                <button type="button" @click="submit" class="submit">申&nbsp;请</button>
            </template>
    
        </div>
    
        <!--待审核-->
        <div class="success" v-if="status=='0'">
            <div class="ico">
                <i class="fa fa-check"></i>
            </div>
            <div class="text">申请已提交，请等待审核！</div>
            <a @click="goHome()">
                <div class="sub">去商城逛逛</div>
            </a>
        </div>
    
        <!--驳回申请-->
        <div class="success" v-if="status=='-2'">
            <div class="ico">
                <i class="fa fa-check"></i>
            </div>
            <div class="text">您的申请被驳回，请继续努力！</div>
            <a @click="goHome()">
                <div class="sub">去商城逛逛</div>
            </a>
        </div>
    
        <div class="vip_main" v-if="status=='-1'">
            <div class="title">推广特权</div>
            <div class="vip vip1">
                <div class="ico1">
                    <i class="fa fa-qrcode"></i>
                </div>
                <div class="text">
                    <div class="t1">专属二维码</div>
                    <div class="t2">拥有专属推广二维码，用于推广客户；</div>
                </div>
            </div>
            <div class="vip">
                <div class="ico2">
                    <i class="fa fa-cny"></i>
                </div>
                <div class="text">
                    <div class="t1">推广收入</div>
                    <div class="t2">推广的客户购买商品后，您将获得相应的推广收入；</div>
                </div>
            </div>
    
        </div>
    
    </div>
</template>


<style  lang="scss" rel="stylesheet/scss" scoped>
#areaAgent {
    .m_header {
        width: 100%;
        height: 45px;
        color: #000;
        text-align: center;
        span {
            width: 150px;
            line-height: 45px;
            font-size: 16px;
        }
    }
    .content {
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
        background: #fff;
        p.title {
            line-height: 33px;
            font-size: 16px
        }
        div.text {
            text-align: left;
            span {
                color: #f15353
            }
        }
        .el-select {
            width: 100%;
            height: 40px;
            margin-bottom: 10px;
            .el-input__inner {
                color: #000 !important;
                font-size: 16px !important;
                border: 1px solid #b8b8b8;
            }
        }

        .submit {
            width: 100%;
            height: 40px;
            border-radius: 6px;
            background-color: #f15353;
            text-align: center;
            line-height: 40px;
            color: #fff;
            border: 0;
            outline: 0;
            font-size: 16px;
            font-weight: bold;
            margin-top: 10px;
        }
        input {
            display: block;
            margin-bottom: 13px;
            width: 100%;
            border-radius: 5px;
            padding: 0 5px;
            box-sizing: border-box;
            outline: none;
            font-size: 16px;
            height: 36px;
            line-height: 1;
        }

        .inp {
            border: 1px solid #b8b8b8;
        }
        .inp:focus {
            border-color: #F55955;
            box-sizing: border-box;
        }
    }

    .banner {
        width: 100%;
        background: #fff;
        height: 100%;
        img {
            width: 100%;
        }
    }
    .vip_main {
        background: #ffffff;
        margin: 15px 0;
        .title {
            padding: 10px;
            font-size: .8rem;
            border-bottom: 1px solid #eeeeee;
            text-align: center
        }
        .vip {
            padding: 15px 10px;
            overflow: hidden;
            font-size: .8rem;
            color: #999;
            .ico1,
            .ico2 {
                width: 15%;
                float: left;
            }
            .ico1 {
                i {
                    background: #32cd32;
                }
            }
            .ico2 {
                i {
                    background: #fece00;
                }
            }
            .text {
                float: left;
                width: 85%;
                .t1 {
                    font-size: .95rem;
                    color: #333;
                    margin-bottom: 5px;
                    text-align: left;
                }
                .t2 {
                    text-align: justify;
                }
            }
            i {
                background: #32cd32;
                height: 36px;
                width: 36px;
                border-radius: 18px;
                color: #fff;
                text-align: center;
                line-height: 38px;
                font-size: 1.2rem;
            }
        }
        .vip1 {
            border-bottom: 1px solid #eeeeee;
        }
    }
}

#areaAgent .success {
    height: 200px;
    padding-top: 65px;
    background: #ffffff;
    .ico {
        height: 65px;
        width: 65px;
        margin: auto;
        border: 3px solid #32cd32;
        border-radius: 4rem;
        color: #32cd32;
        font-size: 2.3rem;
        text-align: center;
        line-height: 4rem;
    }
    .text {
        height: 2rem;
        margin-top: 30px;
        color: #666;
        line-height: 1.6rem;
        text-align: center;
    }
    a .sub {
        height: 2rem;
        width: 80%;
        background: #f55955;
        margin: 20px auto;
        border-radius: 2rem;
        color: #fff;
        line-height: 2rem;
        text-align: center;
        font-size: .9rem;
        margin-bottom: 20px;
    }
    a .sub:focus {
        background: #d8403c;
    }
}
</style>

<script>
import enterprose_center_apply_controller from './enterprose_center_apply_controller';
export default enterprose_center_apply_controller;

</script>




























