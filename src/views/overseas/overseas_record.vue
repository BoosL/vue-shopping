<template>
    <div id="love_record">
    	<c-title :hide="false" :text='coin_name+"激活记录"' ></c-title>
    	<div style="height: 60px;"></div>
		<div id="tbsd">
    	<div class="tbs" v-for="list in listData">
    		<div class="left">激活前冻结值 {{list.old_froze_coin}}<br /> 本次激活值： {{list.activation_coin}}<br /><font color="#607d8b">{{list.created_at}}</font></div>
    		<div class="right"><font color="red">比例：{{list.activation_proportion}}% <br /></font></div>	
    	</div>
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
        //数据列表
        listData:null,
        coin_name: "",//爱心值自定义名称
        usable: 0, // 登陆会员可用爱心值        
      }
    },
    methods:
    {
        getUsable() {
        $http.get('plugin.coin.Frontend.Controllers.page.index', {}, "加载中...").then((response)=>{

          if (response.result == 1) {
          		this.usable = response.data.usable;
          		this.coin_name = response.data.coin_name;
          } else {
             MessageBox.alert(response.msg);
          }

        }, function (response) {
           MessageBox.alert(response);
        });

      },
	  goDetailed(n){
	  	this.$router.push(this.fun.getUrl('love_activation',{id:n}));
	  },
      getBalance() {

        var that = this;
        $http.get('plugin.coin.Frontend.Modules.Coin.Controllers.activation-records.index', {}, "加载中...").then((response)=>{

          if (response.result == 1) {
           		this.listData =response.data;
          } else {
             MessageBox.alert(response.msg);
          }
        }, function (response) {
           MessageBox.alert(response);
        });
      }
    },
    activated() {
    	this.getUsable();
		this.getBalance();
    },
    components: { cTitle }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#love_record{
	#money{color: red;font-size: 2rem;line-height: 4.5rem;}
	#dingjing{border: 1px solid #ccc;padding: 5px 10px;width: 50px;border-radius: 10px;margin:0 auto;margin-bottom: 15px;}
	#tbsd{border-bottom: 1px solid #bbbbbb;}
	.tbs{
        display: flex;
        align-items: center;
        background: #FFF;padding: 10px 15px;
        flex-flow: row wrap;
        border-top: #bbbbbb 1px solid;    
        box-sizing: border-box;
        font-size: .8rem;line-height: 2rem;
        .left {
            flex: 70%;
            text-align: left;
        }
        .right {
            flex: 30%;
            text-align: right;
        }
  
}
}
</style>