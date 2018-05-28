import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';
export default {
	data() {
		return {
			toi: this.fun.getKeyByI(),
			//是否提现到微信
			withdrawToWechat: 0,
			//是否提现到支付宝
			withdrawToAlipay: 0,
			//华侨名称
			coin_name:'',
			//登陆会员冻结华侨币
			froze: "0.00",
			//登陆会员可用华侨币
			usable: "0.00",
			//提现手续费比例
			withdraw_proportion: 0,
			//保留两位小数
			bllw:0,//
			balance: 0,
			balance_money: ''
			
		}
	},
  watch: {
    // 如果 balance_money 发生改变，这个函数就会运行
    balance_money: function (val) {
    	if(!(/^[\+\-]?\d*?\.?\d*?$/.test(val))){
    		 MessageBox.alert('只能输入数字','提示').then(action => {
                       this.balance_money='';
                  });
    		return;
    	}

    	let num = this.balance_money-this.balance_money*(this.withdraw_proportion/100);
    	 num = num.toString();
		this.bllw = num.replace(/([0-9]+.[0-9]{2})[0-9]*/,"$1");
	
    }
  },	
	activated() {
		this.toi = this.fun.getKeyByI();
		//获取数据
		this.getData();
	},
	methods: {
		//获取数据
		getData() {
			let json = {};
			$http.get('plugin.coin.Frontend.Controllers.page.index', json, "获取中...").then((response)=> {
				if(response.result == 1) {
					this.withdraw_proportion = response.data.withdraw_proportion;
					this.froze = response.data.froze;
					this.usable = response.data.usable;
					this.coin_name = response.data.coin_name;
					//this.
				} else {
					Toast(response.msg);
				}
			}, function(response) {
				Toast(response);
			});
		},
		confirm(type) {
			this.$confirm('是否确认提交?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			        	this.confirm2(1);
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消'
			          });          
			});	
		},
		confirm2(type) {
			$http.get('plugin.coin.Frontend.Modules.Coin.Controllers.withdraw.index', {
				change_value: this.balance_money}, '正在提交数据...').then((response)=>{
				if(response.result == 1) {

                    MessageBox.alert(response.msg,'提示').then(action => {
                       this.$router.go(0);
                    });					

				} else {
					MessageBox.alert(response.msg, '提示');
				}
			}, function(response) {
				// error callback
			});
		}
	},

	components: {
		cTitle
	}
}