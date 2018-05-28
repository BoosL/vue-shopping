<template>
  <div>
    <c-title :text="title" :hide="true"></c-title>
    <div class="box">
    <yd-icon slot="icon" class="icon-cuowu" custom size="68px" color="#f15353"></yd-icon>
    <div class="title">
    <p>{{ message }}</p>
    <p>{{blurst}}</p>
    </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import cTitle from 'components/title';

  export default {
    data () {
      return {
        title: 'ERROR!',
      }
    },
    computed: mapState([
      'message','blurst'
    ]),
    mounted: function () {
      this.$store.commit('MESSAGE', '404 Not Found！');
    },
    components: {cTitle}
  }
</script>
<style>
.box{
  width:100%;
  position:absolute;
  text-align: center;
  top:10%;
  }
.title{
  font-size:15px;
  color:#999;
}
</style>
