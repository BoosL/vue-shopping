<template >
    <div id="balance_recharge">
        <c-title :hide="false" text='提现'></c-title>
        <div style="height: 50px;"></div>
        <div class="my_wrapper">
            <span>可提现</span>
            <div class="my-value"><span>{{usable}} </span></div>
        </div>
        <div style="height: 10px;"></div>

        <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">提现：</span>
                    <yd-input slot="right" required v-model="sure_usable" max="20" placeholder="请输入要提现数值"></yd-input>
                </yd-cell-item>
        </yd-cell-group>

        <div id="payBtnList">
            <div class="mod_btns" id="wechatpay">
                <a @click="confirm()" class="mod_btn bg_wechat">确认提现</a>
            </div>
        </div>
    </div>
</template>
<script>
import love_withdrawals_controller from "./love_withdrawals_controller";
export default love_withdrawals_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#balance_recharge {
  .my_wrapper {
    background: #fff;
    overflow: hidden;
    display: flex;
    padding: 15px;
    span {
      width: 100px;
      text-align: left;
      font-size: 16px;
      line-height: 1;
    }
    .my-value {
      flex: 2;
      text-align: left;
      span {
        color: red;
      }
    }
  }
}
.mint-field .mint-cell-title {
  width: 80px;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
  text-align: left;
  margin-left: 15px;
}

#payBtnList {
  .mod_btns {
    margin: 10px 0;
    height: 40px;
    line-height: 40px;
    font-size: 1rem;
    .mod_btn {
      display: block;
      width: 96%;
      margin: 20px 2%;
      border-radius: 5px;
    }
    .mod_btn.bg_wechat {
      background: #26ce29;
      color: #fff;
    }
    .mod_btn.bg_ali {
      background: #22aaed;
      color: #fff;
    }
  }
}
</style>