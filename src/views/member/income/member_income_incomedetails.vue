<template>
    <div>
    
        <div id="incomedetailed">
            <!--<c-title :hide="false"
                                 text='收入明细'></c-title>-->
    
            <mt-header fixed title="收入明细">
                <!--onclick="window.history.go(-1)"v-on:等价于@  -->
                <mt-button icon="back" @click="goto" slot="left"></mt-button>
    
                <span slot="right" @click="screen()">筛选</span>
    
            </mt-header>
    
            <div style="height: 40px;"></div>
    
            <mt-loadmore v-if="goload" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="coupon_loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='true' id='olis'>
    
                <div>
                    <!-- tab-container -->
                    <!-- <div class="times">{{item.create_month}}</div> -->
                    <router-link :to="fun.getUrl('income_details_info',{ id: item.id })" v-for=" item in datas">
                        <div class="tbs">
                            <div class="item1">{{item.created_at}}
                                <br/>
                            </div>
                            <div class="item2">{{item.type_name}}
                                <br/>
                            </div>
                            <div class="item3">
                                <span class="add">+{{item.amount}}</span>
                            </div>
                        </div>
                    </router-link>
    
                </div>
    
            </mt-loadmore>
    
        </div>
    
        <mt-popup v-model="popupSpecs" position="bottom" class="mint-popup-4" closeOnClickModal='true'>
            <div class="screen" v-for=" item in typeData">
                <ul>
                    <li @click="screenType(item.type)">
                        <a>{{item.title}}</a>
                    </li>
                </ul>
            </div>
        </mt-popup>
    
    </div>
</template>
<script>
import member_income_incomedetails_controller from './member_income_incomedetails_controller';
export default member_income_incomedetails_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#incomedetailed {
    .mint-header {
        background: none;
        color: #666;
    }
    .is-fixed .mint-header-title {
        font-weight: bold;
    }
    .mint-header.is-fixed {
        border-bottom: 1px solid #e8e8e8;
        background: #FFF;
        z-index: 99;
    }
    .is-right a {
        font-size: .6rem;
    }
    a {
        color: #333;
    }
    .mint-navbar {
        margin-bottom: 2px;
    }
    .mint-navbar .mint-tab-item {
        padding: 14px 0;
    }
    .times {
        text-align: left;
        text-indent: 10px;
        line-height: 2rem;
        background: #dddddd;
    }
    .tbs {
        background: #FFF;
        overflow: hidden;
        display: flex;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #D9D9D9;
        .item1 {
            width: 100px;
            color: #858585;
        }
        .item2 {
            flex: 2;
            text-align: left;
        }
        .item3 {
            flex: 1;
            .add {
                color: #259b24;
            }
            .reduce {
                color: #e51c23;
            }
        }
    }
}

.mint-popup-4 {
    background: #fff;
    width: 100%;
    height: auto;

    position: fixed;
    top: 40px;
    .screen {
        li {
            padding: 6px 0;
            border-radius: 5px;

            float: left;
            background: #f5f5f5;
            font-size: 12px;
            width: 27%;
            margin: 3%;
            ;

            a {
                color: #333;
            }
        }
    }
}
</style>