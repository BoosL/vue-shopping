<template>
    <div id="detailed">
        <c-title :hide="false"
                 text='我的提现'
></c-title>
        <div style="height: 40px;"></div>
        <mt-navbar v-model="selected">
            <mt-tab-item id=""
                         @click.native="swichTabTItem">全部</mt-tab-item>
            <mt-tab-item id="0"
                         @click.native="swichTabTItem">待审核</mt-tab-item>
            <mt-tab-item id="1"
                         @click.native="swichTabTItem">待打款</mt-tab-item>
            <mt-tab-item id="2"
                         @click.native="swichTabTItem">已打款</mt-tab-item>
            <mt-tab-item id="-1"
                         @click.native="swichTabTItem">无效</mt-tab-item>
        </mt-navbar>
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="">
                <div>
                    <!--<div class="times">2017年3月</div>-->
                    <!--此处有一个循环-->
                    <router-link v-for="model in all" :to="fun.getUrl('presentationDetails',{ record_id: model.id })">
                        <div class="tbs">
                            <div class="item2">{{model.type_name}}
                                <br/>￥{{model.amounts}}</div>
                            <div class="item3"><span class="red">{{model.status_name}}</span>
                                <p>{{model.created_at}}</p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="0">
                <!--<div class="times">2017年3月</div>-->
               <router-link v-for="model in review" :to="fun.getUrl('presentationDetails',{ record_id: model.id})">
                        <div class="tbs">
                            <div class="item2">{{model.type_name}}
                                <br/>￥{{model.amounts}}</div>
                            <div class="item3"><span class="reduce">{{model.status_name}}</span>
                                <p>{{model.created_at}}</p>
                            </div>
                        </div>
                    </router-link>
            </mt-tab-container-item>
            <mt-tab-container-item id="1">
                <div>
                    <!--<div class="times">2017年3月</div>-->
                    <!--此处有一个循环-->
                <router-link v-for="model in waitPay" :to="fun.getUrl('presentationDetails',{ record_id: model.id})">
                        <div class="tbs">
                            <div class="item2">{{model.type_name}}
                                <br/>￥{{model.amounts}}</div>
                            <div class="item3"><span class="reduce">{{model.status_name}}</span>
                                <p>{{model.created_at}}</p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div>
                    <!--<div class="times">2017年3月</div>-->
                    <!--此处有一个循环-->
                   
                    <router-link v-for="model in pay" :to="fun.getUrl('presentationDetails',{ record_id: model.id})">
                        <div class="tbs">
                            <div class="item2">{{model.type_name}}
                                <br/>￥{{model.amounts}}</div>
                            <div class="item3"><span class="green">{{model.status_name}}</span>
                                <p>{{model.created_at}}</p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="-1">
                <div>
                    <!--<div class="times">2017年3月</div>-->
                    <!--此处有一个循环-->
                    <router-link v-for="model in invalid" :to="fun.getUrl('presentationDetails',{ record_id: model.id})">
                        <div class="tbs">
                            <div class="item2">{{model.type_name}}
                                <br/>￥{{model.amounts}}</div>
                            <div class="item3"><span class="red">{{model.status_name}}</span>
                                <p>{{model.created_at}}</p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
import member_income_presentationRecordcontroller from './member_income_presentationRecordcontroller';
export default member_income_presentationRecordcontroller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#detailed {
    a {
        color: #000;
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
        padding: 10px;
        border-bottom: 1px solid #D9D9D9;
        .item2 {
            flex: 2;
            text-align: left;
        }
        .item3 {
            flex: 2;
            text-align: right;
            .red {
                color: red;
            }
            .green {
                color: green;
            }
            .yellow {
                color: yellow;
            }
            .reduce {
                color: #e51c23;
            }
            p {
                margin: 3px 0;
                color: #CCCCCC;
            }
        }
    }
}
</style>