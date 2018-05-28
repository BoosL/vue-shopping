<template>
    <div id="course">
        <c-title :hide="false" text='会员升级'></c-title>
        <div class="box" v-for="item in updateGoods" @click="gotoBuy(item.goods.id)">
            <div class="content-a">
                <div class="header">
                    <img :src="item.goods.thumb" style="width:100%;height:100%;">
                </div>
                <ul class="members">
                    <li  class="member01">{{item.goods.title}}</li>
                    <li  class="member02">￥{{item.goods.price}}</li>
                </ul>
                <div class="clearfix"></div>
            </div> 
            
        </div>
    </div>
</template>

<script>
    import course_member_level_controller from "./course_member_level_controller";
    export default course_member_level_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.box{
    width:100%;
    background-color: #fff;
    padding-left:12px;
    padding-top:40px;
}
.content-a{
    width:100%;
    height:100%;
    background-color: #fff;
    padding:12px 12px 12px 0px;
    border-bottom:solid 1px #e3e3e3;
}
.header{
    float:left;
    width:64px;
    height:64px;
    background-color: green;
    margin-right:10px;
}
.members{
    width:calc(100% - 74px);
    font-size: 15px;
    float:left;
}
.member01{
    float:left;
}
.member02{
    float:right;
}
.clearfix{
    clear: both;
}
</style>