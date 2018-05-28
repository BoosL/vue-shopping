<template>
    <div id="login">
        <c-title :hide="false" text='充值码'></c-title>
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">充值码：</span>
					<input type="text" slot="right" placeholder="请输入充值码" v-model.trim="code">
                    <yd-button slot="right" size="small" @click.native="verifyCode" type="primary">验证</yd-button>
                </yd-cell-item>
            </yd-cell-group>

            <div v-if="isShowType">充值类型:{{type_name}}</div>
            <div v-if="isShowType">充值面值:{{price}}</div>
            <yd-button-group>
                <yd-button size="large" @click.native="submit" type="danger" :disabled="isDisabled">确定充值</yd-button>
            </yd-button-group>

        </div>
</template>

<script>
import index_controller from "./index_controller";
export default index_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#login {
  margin-top: 50px;
  width: 100%;
  h1 {
    color: #42b983;
  }
  .mint-button--large {
    margin-top: 10px;
  }
  #bts {
    margin: auto 5px;
  }
  .forget {
    line-height: 40px;
    float: right;
    a {
      color: #999;
    }
  }
  .vip_main {
    background: #ffffff;
    margin-top: 50px;
    .title {
      padding: 10px;
      font-size: 0.8rem;
      border-bottom: 1px solid #eeeeee;
      text-align: center;
    }
    .weixin {
      padding: 15px 10px;
      overflow: hidden;
      font-size: 0.8rem;
      color: #999;
      .ico1,
      .ico2 {
        width: 15%;
        float: left;
      }
      .ico1 {
        i {
          background: #32cd32;
        }
      }
      .ico2 {
        i {
          background: #fece00;
        }
      }
      .text {
        float: left;
        width: 85%;
        .t1 {
          font-size: 0.95rem;
          color: #333;
          margin-bottom: 5px;
          text-align: left;
        }
        .t2 {
          text-align: justify;
        }
      }
      i {
        background: #32cd32;
        height: 36px;
        width: 36px;
        border-radius: 18px;
        color: #fff;
        text-align: center;
        line-height: 38px;
        font-size: 1.2rem;
      }
    }
    .vip1 {
      border-bottom: 1px solid #eeeeee;
    }
  }
}
</style>