<template>
    <div id="love_give">
    	<c-title :hide="false" text='购物赠送详情' ></c-title>
    	<div style="height: 100px;"></div>
    	<p>购物赠送</p>
    	<p id="money">-100元</p>
    	<p id="dingjing">冻结</p>
    	<div class="tbs">
    		<div class="left">购买商品</div>
    		<div class="right">商品名称标题内容部分</div>
    		<div class="left">商品最终价格</div>
    		<div class="right">18841元</div>
    		<div class="left">赠送比例</div>
    		<div class="right">10%</div>    		
    	</div>
    	<div class="tbs">
    		<div class="left">订单编号</div>
    		<div class="right">6958303457745602122</div>
    		<div class="left">订单完成时间</div>
    		<div class="right">2017-07-07 12:11:00</div>
    		<div class="left">赠送时间</div>
    		<div class="right">2017-07-07 12:11:00</div>    		
    	</div>    	
    </div>
</template>
<script>
import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default
  {
    data() {
      return {
        balance: 0,
        //是否开启充值

      }
    },
    methods:
    {

      getBalance() {

        var that = this;
        $http.get('finance.balance.balance', {}, "加载中...").then(function (response) {

          if (response.result == 1) {
            console.log(response.data);

          } else {
             MessageBox.alert(response.msg);
          }

        }, function (response) {
           MessageBox.alert(response);
        });

      }

    },
    activated() {

    },
    components: { cTitle }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#love_give{
	#money{color: red;font-size: 2rem;line-height: 4.5rem;}
	#dingjing{border: 1px solid #ccc;padding: 5px 10px;width: 50px;border-radius: 10px;margin:0 auto;margin-bottom: 15px;}
	.tbs{
        display: flex;
        align-items: center;
        background: #FFF;padding: 10px 15px;
        flex-flow: row wrap;
        border-top: #bbbbbb 1px solid;    
        box-sizing: border-box;
        font-size: .8rem;line-height: 2rem;
        .left {
            flex: 40%;
            text-align: left;
        }
        .right {
            flex: 60%;
            text-align: right;
        }
  
}
}
</style>