<template>
<div class="fe-mod fe-mod-1" :style="{'color':datas.params.color,'backgroundColor':datas.params.bgcolor}">
    <a :href="datas.params.noticehref|| '#'">
        <div class="scroll-notice" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; content:'...';" v-show="datas.params.scroll == 1">
            <marquee scrollamount="3" :style="{'color':datas.params.color}">{{datas.params.notice|| '请填写内容,可设置是否滚动显示'}}</marquee>
        </div>
        <div class="scroll-notice" :style="{'overflow': 'hidden','color':datas.params.color}" v-show="datas.params.scroll == 0">{{datas.params.notice|| '请填写内容,可设置是否滚动显示'}}</div>
    </a>
</div>
</template>
<script>
  export default {
    props: ['datas'],
    mounted(){

    },
    methods:{

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.scroll-notice{line-height: 2rem;}
</style>