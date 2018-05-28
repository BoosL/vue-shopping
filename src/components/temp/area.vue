<template>
<div id="area">
<div class="fe-mod fe-mod-3" :style="{'text-align':datas.params.align,'color':datas.params.color,'background-color':datas.params.bgcolor}">
    <h2 @click="areaClick()" :style="{'font-size':datas.params.fontsize1}">
    <img  src="../../assets/images/choose_city.png" :width="datas.data[1]">
    {{datas.params.title1|| '点击选择区域'}}</h2>
    <h4 :style="{'font-size':datas.params.fontsize2}" v-show="datas.params.showtitle2 == 1">{{datas.params.title2|| '区域说明'}}</h4>

</div>

<div id="container"></div>
</div>
</template>
<script>
  export default {
    props: ['datas'],
    mounted(){

    },
    methods:{
			areaClick(){
				console.log('点击响应，ajax得到数据后写入#container')
			}
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	#area{	text-align: left;padding: 10px;
.fe-mod-3 h2 { padding: 0px; margin: 0px; font-size: 18px; font-weight: 100; img{vertical-align: middle;}}
.fe-mod-3 h4 {padding: 0px;  margin: 0px; font-size: 14px; font-weight: 100; padding-top: 3px;}	
.select_place_bg {position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background: rgba(12, 2, 2, 0.82); z-index: 2000; }
.select_place_box {  position: fixed; top: 50%; z-index: 9999; max-width: 640px; width: 100%; overflow: hidden; margin-top: -20px; }
.index_tabBox {  overflow: hidden; margin: 10px; background: #fff; }
.index_tabBox ul {  padding: 5px 10px; vertical-align: top; width: 100%; }
.index_tabBox li { height: 20px; line-height: 24px; border: 1px dashed RGBA(204, 182, 182, 0.07); width: 25%; float: left; margin: 5px 0 5px 0; }
.index_tabBox .bd li a { display: block; text-align: center; color: #6A6868; font-size: 13px; }		
	}
</style>