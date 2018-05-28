<template>
    <div id="love_index">

        <c-title :hide="false" :text='love_name'></c-title>
        <div style="height: 60px;"></div>
        <center><i class="fa fa-heart"></i></center>
        <p class="my-banlance">
            <font>{{love_name}}</font>激活<br/>
            <span><b>{{usable}}</b></span>
            <br/>
        </p>
        <div id="djj">冻结{{love_name}}{{froze}}元</div>

          <div id="dyj" v-if="no_recharge>0">待用{{love_name}}{{no_recharge}}元</div>

        <p>
            <el-button type="success" @click="chargeHandel" v-if="transfer_status">转账</el-button>
            <br/>

            <router-link :to="fun.getUrl('love_trading_sell')">
                <el-button type="success" v-if="trading_status==1">
                    {{love_name}}出售
                </el-button>
            </router-link>
            <br/>

            <router-link :to="fun.getUrl('love_trading')">
                <el-button type="success" v-if="trading_status==1">
                    交易中心
                </el-button>
            </router-link>

             <router-link :to="fun.getUrl('loveWithdrawals')">
                <el-button type="success" v-if="withdraw_status">
                    提现
                </el-button>
            </router-link>
        </p>

        <div id="jh">
            <span id="jhst"><router-link :to="fun.getUrl('love_record')">激活记录</router-link></span>
            <span><router-link :to="fun.getUrl('love_list')">查看明细</router-link></span>
        </div>
        <div id="helps">
            <router-link :to="fun.getUrl('love_explain')"><p>?</p>{{love_name}}说明</router-link>
        </div>
    </div>
</template>
<script>
    import love_index_Controller from './love_index_Controller';
    export default love_index_Controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    #love_index {
        button {
            width: 70%;
            margin: 5px 15px;
        }
        i {
            font-size: 70px;
            color: #666;
        }
        .my-banlance {
            margin: 20px 0;
            font-size: .9rem;
            color: #333;
            line-height: 2rem;
        }
        .my-banlance span {
            font-size: .9rem;
            color: #f15353;
            margin-top: 10px;
        }
        .my-banlance span b {
            font-size: 1.6rem;
        }
        #djj {
            margin: 15px 0;
            font-size: 1.1rem;
        }
              #dyj {
            margin: 15px 0;
            font-size: 1.1rem;
             color: #f15353;
        }
        #jh {
            #jhst {
                border-right: 1px solid #8C8C8C;
                padding-right: 15px;
            }
            span {
                padding: 0 15px;
            }
        }
        #helps {
            position: fixed;
            bottom: 20px;
            left: 0;
            right: 0;
            a {
                color: #607d8b;
                font-size: 0.8rem;
            }
            p {
                background: #e51c23;
                color: #FFF;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                line-height: 20px;
                margin: 0 auto;
            }

        }
    }
</style>