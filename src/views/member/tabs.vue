<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="标签1" name="first">标签1内容</el-tab-pane>
    <el-tab-pane label="标签2" name="second">标签2内容</el-tab-pane>
    <el-tab-pane label="标签3" name="third">标签3内容</el-tab-pane>
    <el-tab-pane label="标签4" name="fourth">标签4内容</el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        toi:window.localStorage.i,
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	
</style>