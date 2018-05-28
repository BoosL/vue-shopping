<template>
    <div class="distribution" id="distribution">
        <div class="header">
            <div class="user">
                <div class="user-head">
                    <img :src="userAvatar">
                    <!--<img v-lazy="userAvatar">-->
                </div>
                <div class="user-info">
                    <div data-v-30855510="" class="user-name">{{userName}}[会员ID:{{vipId}}]</div>
                    <div data-v-30855510="" class="user-other">{{ mail_distrbution_name }} {{distrbution_name}} {{ $yzt('distribution.distrbution_tiem') }}：{{distrbution_tiem}}</div>
                </div>
            </div>
        </div>
        <div class="scale">
            <div class="list1" style="margin: 0px;">
                {{ $yzt('distribution.default-rate') }}
    
                <!--Notification 通知   可自动关闭 -->
    
                <i class="fa fa-question-circle" aria-hidden="true" @click="msg"></i>
    
                <!--提示内容    标题：默认分销比例   内容：因商品、供应商可以独立设置佣金，您最终获得的佣金可能与此比例不同 -->
                <!--Notification 通知   结束 -->
    
            </div>
            <div class="list2" style="margin: 0px;">
                {{ $yzt('distribution.first-level') }}
                <span>{{first_level}}%</span>
            </div>
            <div class="list2" style="margin: 0px;" v-if="false">
                {{ $yzt('distribution.second-level') }}
                <span>{{second_level}}%</span>
            </div>
            <div class="list2" style="margin: 0px;" v-if="false">
                {{ $yzt('distribution.third-level') }}
                <span>{{third_level}}%</span>
            </div>
        </div>
        <div class="myrelationship">
    
            <!--<router-link  :to="{name:'myRelationship',query:{i:toi}}"-->
            <router-link :to="fun.getUrl('myRelationship',{})">
    
                <div class="list1" style="margin: 0px;">
                    {{ $yzt('distribution.team') }}
    
                    <i class="fa fa-angle-right"></i>
                    <span>{{count}}人</span>
                </div>
            </router-link>
        </div>
    
        <h3>佣金</h3>
        <ul id="gongge">
            <li>
    
                <!--<router-link :to="{name:'commission',query:{i:toi}}">-->
                <router-link :to="fun.getUrl('commission',{})">
                    <img src="../../assets/images/forecast.png" alt="">
                    <br>{{ $yzt('distribution.expect') }}
                    <br>
                    <span>{{expect}}</span>元
                </router-link>
            </li>
            <li>
    
                <!--<router-link :to="{name:'unsettled',query:{i:toi}}">-->
                <router-link :to="fun.getUrl('unsettled',{})">
                    <img src="../../assets/images/unsettlement.png" alt="">
                    <br>{{ $yzt('distribution.unliquidated') }}
                    <br>
                    <span>{{unliquidated}}</span>元
                </router-link>
            </li>
            <li>
    
                <!--<router-link :to="{name:'alreadySettled',query:{i:toi}}">-->
                <router-link :to="fun.getUrl('alreadySettled',{})">
                    <img src="../../assets/images/settlement.png" alt="">
                    <br>{{ $yzt('distribution.liquidated') }}
                    <br>
                    <span>{{liquidated}}</span>元
                </router-link>
            </li>
            <li>
    
                <!--<router-link :to="{name:'notPresent',query:{i:toi}}">-->
                <router-link :to="fun.getUrl('notPresent',{})">
                    <img src="../../assets/images/unwithdraw.png" alt="">
                    <br>{{ $yzt('distribution.not_yet_withdrawed') }}
                    <br>
                    <span>{{not_yet_withdrawed}}</span>元
                </router-link>
            </li>
            <li>
    
                <!--<router-link :to="{name:'present',query:{i:toi}}">-->
                <router-link :to="fun.getUrl('present',{})">
                    <img src="../../assets/images/withdraw.png" alt="">
                    <br>{{ $yzt('distribution.withdrawed') }}
                    <br>
                    <span>{{withdrawed}}</span>元
                </router-link>
    
            </li>
    
            <li v-if="false">
    
                <router-link :to="fun.getUrl('manage',{})">
                    <img src="../../assets/images/withdraw.png" alt="">
                    <br>{{ $yzt('distribution.manage') }}
                    <br>
                    <span>{{manage}}</span>元
                </router-link>
    
            </li>
        </ul>
    
        <h3>{{ $yzt('distribution.ordername') }}</h3>
        <ul id="distribution-order">
            <li>
                <!--<router-link :to="{name:'distributionOrder',params:{selected:'0'},query:{i:toi}}">-->
                <router-link :to="fun.getUrl('distributionOrder',{selected:'0'})">
                    <i class="fa fa-reorder"></i>
                    <br>{{ $yzt('distribution.all_order') }}
                </router-link> </li>
                <li>
                    <!--<router-link :to="{name:'distributionOrder',params:{selected:'1'},query:{i:toi}}">-->
                    <router-link :to="fun.getUrl('distributionOrder',{selected:'1'})">
                        <i class="fa fa-clock-o" aria-hidden="true"></i>
                        <br>{{ $yzt('distribution.no_pay_order') }}
                    </router-link>
                </li>
                <li>
                    <!--<router-link :to="{name:'distributionOrder',params:{selected:'2'},query:{i:toi}}">-->
                    <router-link :to="fun.getUrl('distributionOrder',{selected:'2'})">
                        <i class="fa fa-jpy" aria-hidden="true"></i>
                        <br>{{ $yzt('distribution.pay_order') }}
                    </router-link>
                </li>
                <li>
                    <!--<router-link :to="{name:'distributionOrder',params:{selected:'3'},query:{i:toi}}">-->
                    <router-link :to="fun.getUrl('distributionOrder',{selected:'3'})">
                        <i class="fa fa-check-circle-o"></i>
                        <br>{{ $yzt('distribution.complate_order') }}
                    </router-link>
                </li>
        </ul>
    </div>
</template>
<script>
import distribution from './distribution_controller';
export default distribution;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.distribution {
    a {
        color: #000;
    }
    .header {
        height: auto;
        background: #f15353;
        background-size: 100% 100%;
        padding: 10px;
        position: relative;
        .user {
            height: 110px;
            text-align: center;
            .user-head {
                height: 48px;
                width: 48px;
                background: #fff;
                border-radius: 50%;
                border: 2px solid #fff;
                margin: 10px auto;
                box-sizing: content-box;
                img {
                    height: 48px;
                    width: 48px;
                    border-radius: 50%;
                }
            }
            .user-info {
                height: 48px;
                width: 100%;
                float: left;
                color: #fff;
                .user-name {
                    height: 20px;
                    width: auto;
                    font-size: 0.8rem;
                    line-height: 20px;
                }
                .user-other {
                    height: 24px;
                    width: auto;
                    font-size: 0.8rem;
                    opacity: 0.5;
                    line-height: 24px;
                }
            }
        }
    }
    .scale {
        height: auto;
        width: 100%;
        background: #fff;
        margin-top: 10px;
        border-bottom: 1px solid #e3e3e3;
        .list1 {
            height: 44px;
            box-sizing: content-box;
            width: 94%;
            background: #fff;
            padding: 0 3% 0 3%;
            font-size: .9rem;
            line-height: 44px;
            color: #242424;
            text-align: left;
            i {
                color: #f15353;
                font-size: 1.2rem;
                float: right;
                line-height: 44px;
            }
        }
        .list2 {
            height: 32px;
            box-sizing: content-box;
            width: 94%;
            background: #fff;
            padding: 0 3% 0 3%;
            font-size: 0.9rem;
            line-height: 32px;
            color: #888;
            text-align: left;
            span {
                float: right;
            }
        }
    }
    .myrelationship {
        margin-top: 10px;
        a {
            .list1 {
                height: 44px;
                width: 97%;
                background: #fff;
                padding: 0 0 0 3%;
                font-size: .9rem;
                line-height: 44px;
                box-sizing: content-box;
                color: #242424;
                text-align: left;
                i {
                    line-height: 44px;
                    color: rgb(153, 153, 153);
                    font-size: 26px;
                    float: right;
                    padding-right: 3%;
                }
                span {
                    line-height: 44px;
                    color: #999;
                    font-size: 0.8rem;
                    float: right;
                    padding-right: 10px;
                }
            }
        }
    }
    h3 {
        background: #dbdbdb;
        margin: 0;
        padding: 5px 10px;
        text-align: left;
        font-weight: normal;
        font-size: .8rem;
        margin-top: 10px;
    }
    #gongge {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        background: #FFF;
        column-count: 3;
        padding-bottom: 10px;
        li {
            width: 33%;
            text-align: center;
            margin-bottom: 10px;
            margin-top: 10px;
            font-size: 0.8rem;
            line-height: 18px;
            img {
                width: 32px;
                margin: auto;
            }
            a span {
                color: #e84e40;
            }
        }
    }
}

#distribution-order {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background: #FFF;
    column-count: 4;
    padding-bottom: 10px;
    margin-bottom: 20px;
    li {
        width: 25%;
        text-align: center;
        margin-bottom: 10px;
        font-size: 0.8rem;
        line-height: 18px;
        color: #666;
        i {
            font-size: 1.7rem;
            color: #999;
            margin: 15px 0 7px 0;
        }
    }
}
</style>