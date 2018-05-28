<template>
    <div id="love_transfer">
        <c-title :hide="false" :text='love_name +"出售"' ></c-title>
        <div style="height: 60px;"></div>
        <center><i class="fa fa-heart" ></i></center>
        <p class="my-banlance">出售{{love_name}}<br /><span>￥<b>{{usable}}</b></span></p>
        <mt-field :label="love_name" v-model="sell_value" :placeholder="'请输入您要出售的'+love_name"></mt-field>
        <p><el-button type="success" @click="getBalance">确认出售</el-button><br /></p>

        <p>注：交易手续费收取{{poundage}}%，<br/>
            交易限制(最小额度){{trading_limit}}，<br/>
            交易限制(倍数) {{trading_fold}}，<br/>
            只有 {{trading_fold}} 或 {{trading_fold}} 的倍数是可以交易。

        </p>



    </div>
</template>
<script>
    import love_trading_sell_controller from './love_trading_sell_controller';
    export default love_trading_sell_controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    #love_transfer{
        button{width: 70%;margin: 15px;}
        i{font-size: 70px;  color: #666;}
        .my-banlance{margin: 20px 0;font-size: .9rem;  color: #333;line-height: 2rem;}
        .my-banlance span{font-size: .9rem;color: #f15353;margin-top:10px; }
        .my-banlance span b{font-size: 1.6rem;}
    }
</style>