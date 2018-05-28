


<template>
  <div id="withdrawal">
    <c-title :hide="false" text='收入提现'></c-title>
    <div style="height: 40px;"></div>
    <!--<el-table :data="datasource" border stripe style="width: 100%" @select="handleSelectionChange" @select-all="selectAll" align='center'>
              <el-table-column type="selection" width="45" :selectable="isCheck">
              </el-table-column>
              <el-table-column label="类型" width="105">
                <template scope="scope">{{ scope.row.type_name }}</template>
              </el-table-column>
              <el-table-column prop="income" label="金额" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="poundage" label="手续费" show-overflow-tooltip>
              </el-table-column>
            </el-table>-->

    <ul class="tbbox">
      <li class="libg ones">
        <el-checkbox @change="allSelect" v-model="checkAll" :checked=checkAll :disabled="!isCheckAll">&nbsp</el-checkbox>
      </li>
      <li class="libg">类型</li>
      <li class="libg">金额</li>
      <li class="libg">手续费</li>
    </ul>
    <el-checkbox-group v-model="checkList" @change="allSelectHandle">

      <template v-for="item in datasource">
        <ul class="tbbox">
          <li class="libg2 ones">
            <el-checkbox :label=item @change="selectItem" :disabled="!item.can">&nbsp</el-checkbox>
          </li>
          <li class="libg2">{{item.type_name}}
            <p v-if="!item.can" style="line-height: 12px; font-size: 12px;">最低提现额:{{item.roll_out_limit}}</p>
          </li>
          <li class="libg2">{{item.income}}</li>
          <li class="libg2">{{item.poundage}}</li>
        </ul>
      </template>
    </el-checkbox-group>

    <div id="userinfo">
      <ul>
        <li>
          <span>{{totalwithdrawal}}</span>
          <br>提现金额合计</li>
        <li>
          <span>{{poundage}}</span>
          <br>手续费合计
        </li>
        <li>
          <span>{{servicetax}}</span>
          <br>劳务税合计
        </li>
      </ul>
    </div>

    <span class="wrapper">

      <template v-if="balance_special">
        <el-button type="danger" v-if="isBalance" @click="withdrawToBalance(balance.value)">{{balance.name}} （手续费:{{independent_poundage}} 劳务税:{{independent_special}})</el-button>
      </template>

      <template v-if="!balance_special">
        <el-button type="danger" v-if="isBalance" @click="withdrawToBalance(balance.value)">{{balance.name}}</el-button>
      </template>

      <el-button type="success" v-if="isWechat" @click="withdrawToBalance(wechat.value)">{{wechat.name}}</el-button>
      <el-button type="danger" v-if="isAlipay" @click="withdrawToBalance(alipay.value)">{{alipay.name}}</el-button>
      <el-button type="success" v-if="isManual" @click="checkManual(manual.value)">{{manual.name}}</el-button>
      <el-button type="info" :plain="true" @click="toRecord">提现记录</el-button>
    </span>

  </div>
</template>
<script>
import member_income_withdrawal_controller from './member_income_withdrawal_controller';
export default member_income_withdrawal_controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#withdrawal {
  .tbbox {
    display: flex;
    background: #FFF;
    line-height: 40px;
    .libg {
      flex: 2;
      background: #eef1f6;
      font-weight: bold;
    }
    .libg2 {
      flex: 2;
    }
    .ones {
      flex: 1;
    }
  }
  #userinfo {
    background: #FFF;
    margin: 10px 0;
    ul {
      display: flex;
      align-items: center;
    }
    ul li:last-child {
      border: 0;
    }
    ul li {
      color: #8c8c8c;
      text-align: center;
      display: block;
      flex: 1;
    }
    ul li span {
      color: #222;
      font-size: .9rem
    }
    ul li {
      float: left;
      width: 33.3333%;
      margin: 10px 0;
      border-right: 1px solid #e3e3e3;
      box-sizing: border-box;
    }
  }
  .wrapper {
    display: flex;
    padding: 0 10px;
    flex-flow: row wrap;
    margin-top: 50px;
    button {
      flex: 100%;
      margin: 5px auto;
    }
  }
}
</style>