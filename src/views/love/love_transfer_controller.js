import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default
  {
    data() {
      return {
      	// bool	转让倍数，为1则不限制
      	transfer_multiple:0,
      	// 转让最小额，为0则不限制
      	transfer_fetter:0,
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
				buttonOff:true,//默认禁止提交
        love_name: "",//爱心值自定义名称
        usable: 0, // 登陆会员可用爱心值      				
      }
    },
    methods:
    {

      initData(){
        this.recharge_id='';
        this.recharge_value='';
        this.usable=0;
      },

       getUsable() {
        $http.get('plugin.love.Frontend.Controllers.page.index', {}, "加载中...").then((response)=>{

          if (response.result == 1) {
          		this.usable = response.data.usable;
          		this.love_name = response.data.love_name;
          		this.ratio = response.data.transfer_proportion;
          		this.transfer_multiple = response.data.transfer_multiple;
          		this.transfer_fetter = response.data.transfer_fetter;
          } else {
             MessageBox.alert(response.msg);
          }

        }, function (response) {
           MessageBox.alert(response);
        });

      },    	

      getBalance() {
        let that=this;
      	//recipient 被转让者ID
      	//change_value 转让爱心值
        $http.get('plugin.love.Frontend.Modules.Love.Controllers.transfer.index', {recipient:this.recharge_id,change_value:this.recharge_value}, "加载中...").then((response)=> {

          if (response.result == 1) {
            MessageBox.alert(response.msg);
            that.$router.go(-1);
    
          } else {
             MessageBox.alert(response.msg);
          }

        }, function (response) {
           MessageBox.alert(response);
        });

      }

    },

	  watch: {
	    // 如果 recharge_value 发生改变，这个函数就会运行
	    // recharge_value: function (val) {
	    //  	if(val<10){
	    //  		this.buttonOff = true;
	    //  		MessageBox.alert('转账值不能小于'+this.transfer_fetter);
	    //  	}else if(val%this.transfer_multiple != 0){
	    //  		this.buttonOff = true;
	    //  		MessageBox.alert('转账值需要被'+this.transfer_multiple+'整数倍！');
	    //  	}else{
	    //  		this.buttonOff = false;
	    //  	}
	    // }
	  },    
    activated() {
    	this.getUsable();
      //this.getLove();
      this.initData();
    },
    components: { cTitle }
  }