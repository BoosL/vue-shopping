<template>
    <div id="course">
        <c-title :hide="false" text='我的课程'></c-title>
        <div style="margin-top:40px;"></div>
        <yd-cell-group>
            <yd-cell-item @click.native="gotoVip">
                <div slot="left" class="touxiang">
                    <img :src="memberInfo.avatar" style="width:100%;height:100%;border-radius:25px;">
                </div>
                <span slot="left">{{memberInfo.nickname}}</span>
                <span slot="right">会员等级:{{memberInfo.level_name}}</span>
            </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group>
            <yd-cell-item arrow  @click.native="gotoMycourse">
                <yd-icon slot="icon" class="icon-kechengzhongxin" custom size="20px" color="#f5ce30"></yd-icon>
                <span slot="left">我的课程</span>
                <span slot="right"></span>
            </yd-cell-item>
            <yd-cell-item arrow  @click.native="gotoHistroy">
                <yd-icon slot="icon" class="icon-lishi" custom size="20px" color="#29c07e" ></yd-icon>
                <span slot="left">课程观看历史</span>
                <span slot="right">更多</span>
                <span slot="right"></span>
            </yd-cell-item>
            <yd-cell-item arrow @click.native="gotoReward">
                <yd-icon slot="icon" class="icon-giftfill" custom size="20px" color="#ff9600"></yd-icon>
                <span slot="left">我的打赏</span>
                <span slot="right"></span>
            </yd-cell-item>
        </yd-cell-group>
    </div>
</template>

<script>
    import course_manage_controller from "./course_manage_controller";
    export default course_manage_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
    .touxiang {
        width: 36px;
        height: 36px;
        border-radius: 5px;
        margin-right: 10px;
    }
</style>