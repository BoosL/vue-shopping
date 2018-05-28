<template>
  <div class="hello">
    <c-title :text="title" text='new'></c-title>
    <c-qeephp :zhong="hoeta"></c-qeephp>
		<router-link to="/new/7665">new传参222222</router-link>
    <router-link :to="{name:'newli',params:{id:123}}">new传参</router-link>
    <p>路由信息：{{$route.name}}</p>
    <p>路由参数：{{$route.params}}</p>
    <div v-html="content"></div>
  </div>
</template>

<script>

  import {mapState} from 'vuex';
  import cTitle from 'components/title';
  import cQeephp from 'components/qeephp';  

  export default {
    data () {
      return {
        title: 'new首页!',
        hoeta:'传参...',
        content: '显示的内容',
        items:['精妙绝伦','发送机','土偶']
      }
    },
    methods: {
      async getContent () {
        const response = await fetch('/api/hello');
        this.content = await response.text();
      }
    },
    mounted () {
      this.$store.commit('MESSAGE', 'new内容部分！');
      this.getContent();
    },

    components: {cTitle,cQeephp}
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
