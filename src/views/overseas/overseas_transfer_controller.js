import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default
  {
    data() {
      return {
      	//爱心转账值
      	recharge_value:undefined,
      	//爱心会员ID
      	recharge_id:undefined,
      	// 登陆会员可用爱心值
        usable: 0,
        // 转让手续费比率
        ratio:0,
        // 实际到账数
				arrival_count:0,
        coin_name: "",//爱心值自定义名称
        usable: 0, // 登陆会员可用爱心值      				
      }
    },
  watch: {
    recharge_value: function (val) {
    	if(!(/^[\+\-]?\d*?\.?\d*?$/.test(val))){
    		 MessageBox.alert('只能输入数字','提示').then(action => {
                       this.recharge_value='';
                  });
    		return;
    	}

    	let num = this.recharge_value-this.recharge_value*(this.ratio/100);
    	 num = num.toString();
		this.arrival_count = num.replace(/([0-9]+.[0-9]{2})[0-9]*/,"$1");
	
    }
  },    
    methods:
    {
       getUsable() {
        $http.get('plugin.coin.Frontend.Controllers.page.index', {}, "加载中...").then((response)=>{
          if (response.result == 1) {
          		this.usable = response.data.usable;
          		this.coin_name = response.data.coin_name;
          		this.ratio = response.data.transfer_proportion;
          } else {
             MessageBox.alert(response.msg);
          }

        }, function (response) {
           MessageBox.alert(response);
        });

      },    	

      getBalance() {

      	//recipient 被转让者ID
      	//change_value 转让爱心值
        $http.get('plugin.coin.Frontend.Modules.Coin.Controllers.transfer.index', {recipient:this.recharge_id,change_value:this.recharge_value}, "加载中...").then((response)=> {

          if (response.result == 1) {
            MessageBox.alert(response.msg).then(action => {
                   this.$router.push(this.fun.getUrl('overseas_index'));;
                });
            
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
			
    },
    components: { cTitle }
  }