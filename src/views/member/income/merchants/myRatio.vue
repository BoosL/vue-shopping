
<template>
    <div id="myRatio">

      <div class="input">
        <input type="text" @focus="beginSearch" v-model="searchVal" placeholder="搜索订单编号">
      </div>

      <ul class="ratioNav">
        <li @click="changeType(0)" :class="{selected:salaryAll}">全部</li>
        <li @click="changeType(1)" :class="{selected:salaryed}">已结算</li>
        <li @click="changeType(2)" :class="{selected:salaring}">未结算</li>
      </ul>

      <ul class='rationList'>
        <li v-for="elem in rationData">
          <div class="left">
            <span>订单号：{{elem.id}}</span>
            <p>订单完成时间：{{elem.time}}</p>

          </div>

          <div class="right">
            <img :src="elem.img">
            分红+{{elem.salary}}
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
  export default {
    data(){
      return {
        rationType:0,
        val:"",
        salaryAll:true,
        salaryed:false,
        salaring:false,
        rationData:[
                {id:"111123456789",time:"2017-02-02",img:"./../../../../assets/images/jiesuan.png",salary:'5.00'},
                {id:"111123456789",time:"2017-02-02",img:"",salary:'5.00'},
                {id:"111123456789",time:"2017-02-02",img:"",salary:'5.00'},
                {id:"111123456789",time:"2017-02-02",img:"",salary:'5.00'}
              ]
      }
    },

    props: ['searchVal'],

    watch:{
      searchVal:function(val) {
//      console.log("获取到的搜索值",val);
        for(var i=0;i<this.rationData.length;i++){
          this.rationData[i].id=this.rationData[i].id.replace(/1{4}/,val);
        }
      }
    },

    methods:{

      beginSearch(){
                this.$emit('emitFocus',false);
                this.searchVal="";
            },

      changeType(a,b){
        this.rationType=a;

        switch(this.rationType){
          case 0:{
            console.log('请求全部分红数据中....');
            this.salaryAll=true,
            this.salaryed=false,
            this.salaring=false,
            this.rationData=[
                {id:"000123456789",time:"2017-02-02",img:"",salary:'5.00'},
                {id:"000456789",time:"2017-02-02",img:"",salary:'5.00'},
                {id:"000456789",time:"2017-02-02",img:"",salary:'5.00'},
                {id:"000456789",time:"2017-02-02",img:"",salary:'5.00'}
                ];
            break;
          }
          case 1:{
            console.log('请求已结算分红数据中....');
            this.salaryAll=false,
            this.salaryed=true,
            this.salaring=false,
            this.rationData=[
                {id:"111123456789",time:"2017-02-02",img:"",salary:'5.00'},
                {id:"111123456789",time:"2017-02-02",img:"",salary:'5.00'},
                {id:"111123456789",time:"2017-02-02",img:"",salary:'5.00'},
                {id:"111123456789",time:"2017-02-02",img:"",salary:'5.00'}];
            break;
          }
          case 2:{
            console.log('请求未结算分红数据中....');
            this.salaryAll=false,
            this.salaryed=false,
            this.salaring=true,
            this.rationData=[
                {id:"22223456789",time:"2017-02-02",img:"",salary:'5.00'},
                {id:"22223456789",time:"2017-02-02",img:"",salary:'5.00'},
                {id:"22223456789",time:"2017-02-02",img:"",salary:'5.00'},
                {id:"22223456789",time:"2017-02-02",img:"",salary:'5.00'}];
            break;
          }
        }
      }
    }

  }
</script>

<style  lang="scss" rel="stylesheet/scss" scoped>
  #myRatio{
   .input{
    background: #fff;
      input{
          margin:10px 5%;
          width:80%;
          height:30px;
          border-radius:6px;
          border:0;
          outline:0;
          padding-left:30px;
          background:url(../../../../assets/images/search.png) no-repeat 10px 8px #f2f2f2;
      }
    }
    .ratioNav{
      padding: 0px;
      margin: 0px;
      height: 40px;
      width: 100%;
      background: #fff;
      border-bottom: 1px solid #cdcdcd;
      border-top: 1px solid #cdcdcd;
      li{
        float: left;
        width: 33%;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        color: #666;
      }
    }
    .rationList{
      padding: 0px;
      margin: 0px;
      background: #fff;
      li{
        width: 100%;
        height: 65px;
        padding: 10px;
        box-sizing:border-box;
        border-bottom: 1px solid #f3f3f3;
        .left{
          width:60%;
          float: left;
          text-align: left;
          padding-left: 22px;
          box-sizing:border-box;
          span{
            font-size: 14px;
            font-weight: 400;
            color:#333;
          }
          p{
            font-size: 12px;
            color:#999;
          }
        }
        .right{
          line-height: 55px;
          float: left;
          width: 40%;
          color:#20b96a;
        }
      }
    }
  }
  .selected{
    color:#f15353 !important;
    border-bottom: 2px solid #f15353;
  }
</style>