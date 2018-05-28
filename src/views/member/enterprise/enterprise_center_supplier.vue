<template>
    <div id="enterpriseSupplier">
        <c-title :hide="false" text='我的供应商'></c-title>
        <div style="height: 40px;"></div>
        <ul class='rationList' >
            <li v-for="item in list" @click="goToSupplierInfo(item)" >
                <div class="left">
                    <div  class="li1">
                        <img  :src="item.avatar">
                    </div>
                    <div class="li2">{{item.nickname}}</div>

                </div>
                <div class="right">
                     分红金额
                    <p>{{item.bonus_total}}元</p>
                </div>
            </li>
        </ul>

    </div>


</template>

<script>
   import enterprise_center_supplier_controller from './enterprise_center_supplier_controller';
export default enterprise_center_supplier_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

#enterpriseSupplier{
    .rationList {
        li {
            background: #fff;
            padding: 10px;
            overflow: hidden;
            border-bottom: 1px solid #ddd;
            .left {
                width: 70%;
                float: left;
                text-align: left;
                box-sizing: border-box;
                .li1{    display: inline-block;
                    float: left;}
                img{    width: 50px;
                    height: 50px;}
                .li2{    float: left;
                    line-height: 50px;
                    margin-left: 10px;
                    font-size: .9rem;}

            }
            .right {
                float: left;
                width: 30%;
                color: #888;
                text-align:right;
                height: 50px;
                line-height: 25px;
                font-size:12px;
            p{    margin: 0;
                padding: 0;
                color: #f15353;
                font-size: .9rem;
                }
            }
        }
    }
}
</style>
