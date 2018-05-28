<template>
  <div id="detailed">
    <c-title :hide="false"
             text='余额明细'
             tolink='screen'
             totext=''></c-title>
    <div style="height: 40px;"></div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="0"
                   @click.native="swichTabTItem">全部</mt-tab-item>
      <mt-tab-item id="1"
                   @click.native="swichTabTItem">收入</mt-tab-item>
      <mt-tab-item id="2"
                   @click.native="swichTabTItem">支出</mt-tab-item>
    </mt-navbar>
  
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="0">

        <router-link v-for="item in all"
                     :to="fun.getUrl('details',{ item:item})">
          <div class="tbs">
            <div class="item1">{{item.created_at}}</div>
            <div class="item2">{{item.service_type_name}}
              <br />余额：{{item.new_money}}</div>
            <div class="item3"
                 v-if="item.type == 1"><span class="add">+ {{item.change_money}}</span></div>
            <div class="item3"
                 v-if="item.type == 2"><span class="reduce">{{item.change_money}}</span></div>
          </div>
        </router-link>
      </mt-tab-container-item>
      <mt-tab-container-item id="1">
        <!--<div class="times">2017年3月</div>-->
        <router-link v-for="item in income"
                     :to="fun.getUrl('details',{ item:item})">
          <div class="tbs">
            <div class="item1">{{item.created_at}}</div>
            <div class="item2">{{item.service_type_name}}
              <br />余额：{{item.new_money}}</div>
            <div class="item3"><span class="add">+{{item.change_money}}</span></div>
          </div>
        </router-link>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <router-link v-for="item in expenditure"
                     :to="fun.getUrl('details',{ item:item})">
          <div class="tbs">
            <div class="item1">{{item.created_at}}</div>
            <div class="item2">{{item.service_type_name}}
              <br />余额：{{item.new_money}}</div>
            <div class="item3"><span class="reduce">{{item.change_money}}</span></div>
          </div>
        </router-link>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import member_balance_detailedcontroller from './member_balance_detailedcontroller';
export default member_balance_detailedcontroller;

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