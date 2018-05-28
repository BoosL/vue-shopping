<template>
  <div class="hello">
  	<i class="el-icon-edit"></i>
		<i class="el-icon-share"></i>
		<i class="el-icon-delete"></i>
<el-button type="primary" icon="search">搜索</el-button>

    <c-title :hide="false" text='hello'></c-title>
    <img class="logo" src="../assets/images/logo.png">
    <div style="clear: both;">
    <c-calendar :hide="false" text='hello'></c-calendar>
    </div>
      	<el-radio class="radio" v-model="radio" label="1">备选项</el-radio>
  <el-radio class="radio" v-model="radio" label="2">备选项</el-radio>
  <div style="height: 300px;"></div>
  <div @click='kyebey'>
    <el-input v-model="input" placeholder="请输入内容" ></el-input>
    <mt-field label="" placeholder="请输入详细地址" v-model='input' >内容</mt-field>
    </div> 
    
    <mt-switch v-model="value" @change='chswitch("ffeee")'>开关</mt-switch>
    <el-switch v-model="value1" on-text="" off-text=""></el-switch>
    <el-input-number v-model="num1" :min="1" :max="10"></el-input-number>
    <p class="welcome">欢迎使用 vue{{message}}{{booa|normalTime}}</p>
    <div v-html="content"></div>
    
  </div>
</template>

<script>
  
  import {mapState} from 'vuex';
  import cTitle from 'components/title';
  import cCalendar from 'components/calendar';
  
  export default {
    data () {
      return {
      	value1:true,
      	 radio: '1',
        title: 'Hello Vue!',
        content: '显示的内容',
        message: '焚',
        booa:98
      }
    },
    methods: {
    chswitch(e){
    	console.log(7777777,e)
    },
   	kyebey(e){
  		e.target.style.background = '#25ff86';
  		//e.target.scrollIntoViewIfNeeded();
  		//e.target.scrollIntoView();
  	},   	
      async getContent () {
      	
        const response = await fetch('/api/hello');
        this.content = await response.text();
      }
    },
  
    mounted () {
    	//this.$store.commit('cfoots',{a:false});
      this.getContent();
    },
    components: {cTitle,cCalendar}
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  h1 {
    color: #42b983;
  }

  .logo {
    width: 100px;
    height: 100px;
    a {
      color: #42b983;
      text-decoration: none;
    }
  }
</style>
