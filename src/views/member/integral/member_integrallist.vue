<template>
  <div id="detailed">
    <c-title :hide="false"
             text='积分明细'></c-title>
    <div style="height: 40px;"></div>
    <mt-navbar v-model="selected">
      <mt-tab-item id=""
                   @click.native="swichTabTItem">全部</mt-tab-item>
      <mt-tab-item id="1"
                   @click.native="swichTabTItem">收入</mt-tab-item>
      <mt-tab-item id="-1"
                   @click.native="swichTabTItem">支出</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="">
        <!--<div class="times">2017年3月</div>-->
  
        <!--Object after_point : "2645.00" before_point : "2644.00" created_at : "2017-04-12 15:12:29" deleted_at : 0 id : 15 member_id : 1 order_id : 0 point : "1.00" point_income_type : 1 point_mode : "后台充值" remark : "后台充值[1]积分" uniacid : 2 updated_at : "2017-04-12 15:12:29-->
        <div class="tbs"
             v-for="item in all">
          <div class="item1">{{item.updated_at}}</div>
          <div class="item2">{{item.mode_name}}
            <br />积分：{{item.after_point}}</div>
          <div class="item3"
               v-if="item.point<0"><span class="add">{{item.point}}</span></div>
          <div class="item3"
               v-if="item.point>0"><span class="reduce">+{{item.point}}</span></div>
  
        </div>
  
      </mt-tab-container-item>
      <mt-tab-container-item id="1">
        <div class="tbs"
             v-for="item in income">
          <div class="item1">{{item.updated_at}}</div>
          <div class="item2">{{item.mode_name}}
            <br />积分：{{item.after_point}}</div>
          <div class="item3"
               v-if="item.point<0"><span class="add">{{item.point}}</span></div>
          <div class="item3"
               v-if="item.point>0"><span class="reduce">+{{item.point}}</span></div>
  
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="-1">
        <div class="tbs"
             v-for="item in out">
          <div class="item1">{{item.updated_at}}</div>
          <div class="item2">{{item.mode_name}}
            <br />积分：{{item.after_point}}</div>
          <div class="item3"
               v-if="item.point<0"><span class="add">{{item.point}}</span></div>
          <div class="item3"
               v-if="item.point>0"><span class="reduce">+{{item.point}}</span></div>
  
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import member_integraldetailcontroller from './member_integrallistcontroller';
export default member_integraldetailcontroller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#detailed {
  a {
    color: #000;
  }
  .mint-navbar {
    margin-bottom: 2px;
  }
  .mint-navbar .mint-tab-item {
    padding: 14px 0;
  }
  .times {
    text-align: left;
    text-indent: 10px;
    line-height: 2rem;
    background: #dddddd;
  }
  .tbs {
    background: #FFF;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #D9D9D9;
    .item1 {
      width: 100px;
      color: #858585;
    }
    .item2 {
      flex: 2;
      text-align: left;
    }
    .item3 {
      flex: 1;
      .add {
        color: #259b24;
      }
      .reduce {
        color: #e51c23;
      }
    }
  }
}
</style>