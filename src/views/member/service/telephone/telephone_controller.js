import cTitle from 'components/title';
import { Switch } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default{
	components: { cTitle },
    data(){
        return{
        	language:{score:'',scoreTip1:'',scoreTip2:'',yuan:'',subtotal:'',total:'',btn:''},
        	moneyHotspot:99999,//热选值
        	isActive:true,
        	goods_id:'',
            option_id: '',
            tele:false,
            score:0,//用户积分
            scoreMoney:0.00,//实际价格
            computedMoney:0.00,//合计
            sourceMoney:0.00,//小计
            useScore:false,
        	MobilePhone:'',
        	deductionName:'',//积分抵扣名称
        	phoneInfo:'',//手机归属地
        	offDeductible:false,//关闭积分显示
        	disableds:true,//禁止提交
        	items:[
                {recharge:0,discount:0}
            ],
            checkDeductionList:[],
            preOrder: {},
            goodsInfo: {},

        }
    },
	methods:{
	// 提交充值
	 goSubmit(){
	 	if(this.disableds) return;
	 	this.submitOrder();
	 },
        submitOrder() {
      	let json = {goods: JSON.stringify(this.assembleGoods()),mobile:this.MobilePhone, orders: JSON.stringify(this.assembleDeduction())};
      	console.log("getOrderJson:::", json);
      	//plugin.recharge.Frontend.Modules.Order.Controllers.create
        $http.get('plugin.recharge.Frontend.Modules.Order.Controllers.create', json, "加载中...").then((response)=>{
            console.log("create:::", response);

          if (response.result == 1) {
          		localStorage.setItem( "TempMobilePhone", this.MobilePhone );
          		this.$router.push(this.fun.getUrl('orderpay', { status: "2", order_ids: response.data.order_ids }));
          } else {
             MessageBox.alert(response.msg);
          }

        }, function (response) {
           MessageBox.alert(response);
        });

	 },
        //组装商品信息
        assembleGoods() {
            let newGoods = [];
            let model = new Object();
                    model.goods_id = this.goods_id;
                    model.total = 1;
                    model.option_id = this.option_id;
                    newGoods.push(model);
            return newGoods;
        },
        //组装优惠抵扣信息
        assembleDeduction() {
            let deductions = [];

            for (let i = 0; i < this.checkDeductionList.length; i++) {
                deductions.push(this.checkDeductionList[i]);
            }

            return deductions;
        },
	 // 获取手机归属地
	 getPhoneInfo(mobile){
        $http.get('plugin.recharge.api.goods.phoneInfo', {mobile}).then((response)=>{
          if (response.result == 1) {

          		this.phoneInfo = response.data.province + response.data.city + response.data.operator;
          } else {
             MessageBox.alert(response.msg);
          }
        }, function (response) {
           MessageBox.alert(response);
        });
	 },
	 // 跳转到绑定手机列表页
	 toMobileBingding(){
	 	this.$router.push(this.fun.getUrl('mobileBinding'));
	 },
	//获取用户实际充值金额

      getGoodsOptionPrice(mobile) {
        $http.get('plugin.recharge.api.goods.goodsOptionPrice', {mobile}, "加载中...").then((response)=>{

          if (response.result == 1) {
          		this.items = response.data;
          		this.goods_id = response.data[0].goods_id;
				this.getDeductible(mobile,response.data[0].goods_id);
				
          } else {
             MessageBox.alert(response.msg);
          }
        }, function (response) {
           MessageBox.alert(response);
        });

      },
		// 获取用户信息积分
//    getUserInfo() {
//      $http.get('member.member.getUserInfo').then((response)=>{
//        if (response.result == 1) {
//        		this.score = response.data.credit1;
//        }
//      });
//
//    },
		// 获取用户积分和抵扣
      getDeductible(mobile,goods_id,offdb) {

          let json = {goods_id:this.goods_id,total:1,option_id:this.option_id,mobile:this.MobilePhone, orders: JSON.stringify(this.assembleDeduction())};

          $http.get('plugin.recharge.Frontend.Modules.Order.Controllers.goods-buy', json).then((response)=>{
          
          if (response.result == 1) {
              this.computedMoney = response.data.total_price;
              
	              this.preOrder = response.data.order_data[0];
	          	// console.error(666666,response.data.order_data[0].discount.deduction[0]);
	          if (response.data.order_data[0].discount.deduction[0]) {	
	          	this.deductionName = response.data.order_data[0].discount.deduction[0].name;
	              this.scoreMoney = response.data.order_data[0].discount.deduction[0].price;
	              this.score = response.data.order_data[0].discount.deduction[0].value;
              }
	          if(offdb) this.disableds = false;
          }else{
          	this.moneyHotspot = 999;
          	this.disableds = true;
          	this.offDeductible = false;
          	MessageBox.alert(response.msg);
          }
        });

      },
		// 获取话费商品规格预价格
      getBalance() {
        $http.get('plugin.recharge.api.goods.goodsOption', {}, "加载中...").then((response)=>{
          if (response.result == 1) {
          		this.goods_id = response.data[0].goods_id;
          		this.items = response.data;
          } else {
             MessageBox.alert(response.msg);
          }
        }, function (response) {
           MessageBox.alert(response);
        });
      },

		selectStyle(e,money){
			if (this.fun.isMoblie(this.MobilePhone)) {
				MessageBox.alert('请输入正确的手机号码！');
				return;
			}
//			if (!money.discount) {
//				MessageBox.alert('请输入手机号码！');
//				return;
//			}
			this.moneyHotspot = money.recharge;
			this.option_id = money.option_id;
            this.getDeductible(this.MobilePhone, this.goods_id, true);
            if(money.discount){
            	this.offDeductible = true;
				this.sourceMoney = money.discount;
//				this.disableds = false;
			}
            //this.computedMoney = this.sourceMoney;
            //this.sourceMoney = 0 ;
			//this.sourceMoney=parseFloat(money.money.split(":")[1]);
      }
	},

	//实时监测this.$store.state.service.chinese的变化，获取最新的语言包
	computed: {
		  	getLangState() {
				return this.$store.state.service.languageService;
		  	}
	},
	watch: {
	  	getLangState(val) {
		   	if(val){
				this.language=JSON.parse(sessionStorage.languageService).telephone;
			}else{
				this.language=this.$store.state.service.languageService.telephone;
			}
	  	},

	  	MobilePhone:function(val){
	  		val = val.toString();
			if(val.length != 11){
				this.phoneInfo = '';
				this.offDeductible = false;
				this.moneyHotspot = 999;
				this.disableds = true;
//				val.length == 10 ? this.getBalance():'';
			}else{
		  		if(!this.fun.isMoblie(val)){
		  			this.$refs.isinput.blur();
		  			this.getPhoneInfo(val);
		  			this.getGoodsOptionPrice(val);
	
		  		}else{
		  			MessageBox.alert('请输入正确的手机号码！');
		  		}
		  	}	
	  	},
	  	useScore:function(val){
	  	    console.log("deductVal::", val);
    		if(val){
                var deductionItem = new Object();
                if (this.preOrder.discount.deduction[0]) {
                	deductionItem.deduction_ids = this.preOrder.discount.deduction[0].id;
                }
                deductionItem.pre_id = this.preOrder.order.pre_id;
                this.checkDeductionList.push(deductionItem);
               // this.computedMoney=this.sourceMoney-this.scoreMoney;
    		}else{
                this.checkDeductionList = [];
    			//this.computedMoney=this.sourceMoney;
    		}
    		this.getDeductible();
    	},

	},

	activated(){
	
		
	},

	mounted(){
		//localStorage.setItem( "TempMobilePhone", 13751596693 );
		if(sessionStorage.languageService){
			this.language=JSON.parse(sessionStorage.languageService).telephone;
		}else{
			this.language=this.$store.state.service.languageService.telephone;
		}		
		if(localStorage.getItem("TempMobilePhone")){
			
			this.MobilePhone = localStorage.getItem("TempMobilePhone");
		}else if(this.MobilePhone){
			//this.MobilePhone = '';
		}else{
			this.getBalance();
		}
//		if (this.$route.params.phone) {
//			this.MobilePhone = this.$route.params.phone;
//			this.getGoodsOptionPrice(this.$route.params.phone);
//		};		
		this.$store.commit('onload');
	},
}
