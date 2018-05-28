<template>
    <div id="love_list">
        <c-title :hide="false"
                 :text='coin_name+"明细"'></c-title>  
        <div style="height: 40px;"></div>
        <mt-navbar v-model="selected">
            <mt-tab-item id="0"
                         @click.native="switchItem">全部</mt-tab-item>
            <mt-tab-item id="1"
                         @click.native="switchItem">收入</mt-tab-item>
            <mt-tab-item id="2"
                         @click.native="switchItem">支出</mt-tab-item>
        </mt-navbar>
        <!--<mt-loadmore v-if="goload"
                     :top-method="loadTop"
                     :bottom-method="loadBottom"
                     :bottom-all-loaded="allLoaded"
                     ref="coupon_loadmore"
                     bottomPullText=''
                     bottomDropText='下拉加载...'
                     bottomLoadingText=''
                     :autoFill='true'
                     id='olis'>-->
            <mt-tab-container v-model="selected">
                <div class="coupon_card">
                    <mt-tab-container-item id="0">
                        <!--全部-->
                        <div class="tbs"
                             v-for='(item,index) in wait_used'>
							<div class="left titles">{{item.source_name}}</div>
							<div class="right reds">{{item.change_value}}元</div>
							<div class="left">{{item.created_at}}</div>
							<div class="right">{{item.value_type_name}}</div>	
                        </div>
                    </mt-tab-container-item>
                    <!--已过期-->
                        <div class="tbs"
                             v-for='(item,index) in overdue'>
							<div class="left titles">{{item.source_name}}</div>
							<div class="right reds">{{item.change_value}}元</div>
							<div class="left">{{item.created_at}}</div>
							<div class="right">{{item.value_type_name}}</div>	
                        </div>                    
                    <mt-tab-container-item id="1">

                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                        <!--已使用-->
                        <div class="tbs"
                             v-for='(item,index) in used'>
							<div class="left titles">{{item.source_name}}</div>
							<div class="right reds">{{item.change_value}}元</div>
							<div class="left">{{item.created_at}}</div>
							<div class="right">{{item.value_type_name}}</div>	
                        </div>  
                    </mt-tab-container-item> 
                </div>
    
            </mt-tab-container>
        <!--</mt-loadmore>-->

    </div>
</template>
<script>
import overseas_list_controller from './overseas_list_controller';
export default overseas_list_controller;

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/css/love_list.scss'
</style>