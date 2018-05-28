<template>
<div id="richtext" :style="{'background-color':datas.params.bgcolor}">
    <div v-html="datas.content"></div>
    <div v-show="!datas.content">
        <p><span style="font-size: 20px;">哈喽大家好！这里是『富文本』区域</span></p>
        <p>你可以对文字进行<strong>加粗</strong>、<em>斜体</em>、<span style="text-decoration: underline;">下划线</span>、<span style="text-decoration: line-through;">删除线</span>、文字<span style="color: rgb(0, 176, 240);">颜色</span>、<span style="background-color: rgb(255, 192, 0); color: rgb(255, 255, 255);">背景色</span>、以及字号<span style="font-size: 20px;">大</span><span style="font-size: 14px;">小</span>等简单排版操作。
        </p>
        <p>也可在这里插入图片</p>
        <p><img src="../../assets/images/sale-by.png"></p>
        <p style="text-align: left;"><span style="text-align: left;">还可给文字加上<a href="http://www.baidu.com">超级链接</a>，方便用户点击。</span></p>
    </div>
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
	#richtext{text-align: left;}
</style>