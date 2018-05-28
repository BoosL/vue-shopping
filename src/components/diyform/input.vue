<template>
    <yd-cell-group>
        <yd-cell-item>
            <span slot="left">用户名：</span>
            <yd-input slot="right" required v-model="input1" max="20" placeholder="请输入用户名"></yd-input>
        </yd-cell-item>
    </yd-cell-group>
</template>
<script>
  export default {
    props: ['datas'],
    mounted(){
      console.log('loading...');
    },
    methods:{
			areaClick(){
				console.log('点击响应，ajax得到数据后写入#container')
			}
    }
  }
</script>
