<template>
    <div id="course">
        <c-title :hide="false" text='讲师分红'></c-title>
        <div class="box01">
            <div class="header"><img :src="avatar"></div>
            <span style="float:left;line-height:60px;color:#fff;font-size:15px;">讲师:{{lecturer_name}}</span>
            <div class="clearfix"></div>
        </div>
        <div class="box02" style="margin-bottom:6px;">
            <div class="lecturer-Ab">
                <yd-icon slot="icon" class="icon-yuangongfenhong" custom size="20px" color="#f15353"></yd-icon>
                <span style="line-height:44px;margin-left:6px;">讲师分红</span>
                <span style="line-height:44px;position:absolute;right:12px;color:#f15353;">累计：￥{{lecturer_bonus}}</span>
            </div>
            <div class="lecturer-Ar">
                <div style="float:left;width:50%;border-right:solid 1px rgb(221, 221, 221);padding:6px 0 4px 0;">
                    <span style="color:#737372;font-size:15px;">订单分红</span><br><br><span>￥{{order_bonus}}</span>
                </div>
                <div style="float:left;width:50%;padding:6px 0 4px 0;">
                    <span style="color:#737372;font-size:15px;">打赏分红</span><br><br><span>￥{{reward_bonus}}</span>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
        <div class="shareholder-order">
            <div id="tabs">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="全部" name="first">
                        <div class="box03" v-for="item in first_content">
                            <div>
                                <div class="content01">
                                    <span style="color:#737372;line-height:24px;font-size:14px;">订单号：{{item.order_sn}}</span>
                                    <ul style="line-height:24px;">
                                        <li style="float:left">分红类型：{{item.reward_type_name}}</li>
                                        <li style="float:right;color:#f15353">+{{item.amount}}元</li>
                                        <div class="clearfix"></div>
                                    </ul>
                                    <ul style="line-height:24px;">
                                        <li style="float:left">{{item.created_at}}</li>
                                        <li style="float:right;color:#00da8a">{{item.status_name}}</li>
                                        <div class="clearfix"></div>
                                    </ul>
                                </div>
                                <div style="width:100%;height:1px;background-color:rgb(221, 221, 221);margin-left:12px;"></div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="未结算" name="second">
                        <div class="box03" v-for="item in second_content">
                            <div>
                                <div class="content01">
                                    <span style="color:#737372;line-height:24px;font-size:14px;">订单号：{{item.order_sn}}</span>
                                    <ul style="line-height:24px;">
                                        <li style="float:left">分红类型：{{item.reward_type_name}}</li>
                                        <li style="float:right;color:#f15353">+{{item.amount}}元</li>
                                        <div class="clearfix"></div>
                                    </ul>
                                    <ul style="line-height:24px;">
                                        <li style="float:left">{{item.created_at}}</li>
                                        <li style="float:right;color:#00da8a">{{item.status_name}}</li>
                                        <div class="clearfix"></div>
                                    </ul>
                                </div>
                                <div style="width:100%;height:1px;background-color:rgb(221, 221, 221);margin-left:12px;"></div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="已结算" name="third">
                        <div class="box03" v-for="item in third_content">
                            <div>
                                <div class="content01">
                                    <span style="color:#737372;line-height:24px;font-size:14px;">订单号：{{item.order_sn}}</span>
                                    <ul style="line-height:24px;">
                                        <li style="float:left">分红类型：{{item.reward_type_name}}</li>
                                        <li style="float:right;color:#f15353">+{{item.amount}}元</li>
                                        <div class="clearfix"></div>
                                    </ul>
                                    <ul style="line-height:24px;">
                                        <li style="float:left">{{item.created_at}}</li>
                                        <li style="float:right;color:#00da8a">{{item.status_name}}</li>
                                        <div class="clearfix"></div>
                                    </ul>
                                </div>
                                <div style="width:100%;height:1px;background-color:rgb(221, 221, 221);margin-left:12px;"></div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import index_controller from "./index_controller";
    export default index_controller;
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
    .header img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .box01 {
        margin-top: 40px;
        width: 100%;
        height: 60px;
        background-color: #f15353;
        padding-left: 12px;
    }
    .header {
        width: 36px;
        height: 36px;
        text-align: center;
        background-color: #333;
        border-radius: 18px;
        float: left;
        margin-top: 12px;
        margin-right: 10px;
    }
    .clearfix {
        clear: both;
    }
    .box02 {
        width: 100%;
        background-color: #fff;
        margin-top: 6px;
    }
    .lecturer-Ab {
        height: 44px;
        text-align: left;
        padding-left: 12px;
        position: relative;
        border-bottom: solid 1px rgb(221, 221, 221);
    }
    .lecturer-Ar {
        padding: 8px 0 10px 0;
    }
    .box03 {
        width: 100%;
        background-color: #fff;
        margin-top: 6px;
        text-align: left;
    }
    .content01 {
        width: 100%;
        padding: 8px 12px 8px 12px;
    }
</style>