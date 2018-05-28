<template>
    <div id="love_push">
    	<c-title :hide="false" text='直推奖奖励详情' ></c-title>
    	<div style="height: 100px;"></div>
    	<p>直推奖奖励</p>
    	<p id="money">+100元</p>
    	<p id="dingjing">冻结</p>
    	<div class="tbs">
    		<div class="left">现团队等级</div>
    		<div class="right">社区店</div>
    		<div class="left">下级团队代理</div>
    		<div class="right">李静</div>
    		<div class="left">下级升级至团队等级</div>
    		<div class="right">形象店</div>	
    	</div>
    	<div class="tbs">
    		<div class="left">升级时间</div>
    		<div class="right">6958303457745602122</div>
    		<div class="left">奖励时间</div>
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
#love_push{
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