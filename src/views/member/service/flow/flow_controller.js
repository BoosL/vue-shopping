import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';

export default{
	components: { cTitle },
    data(){
        return{
        	language:{},
        	Hot_flow:999,//流量热选
        	moneyHotspot:9999,//套餐
        	payMoney:0,//选择的套餐价格
        	isActive:true,
        	MobilePhone:'',//手机号
        	api_goods_id:'',//当前选择的规格套餐ID
            tele:false,
            score:0,
        	goods_id:'',
        	preOrder:'',
            option_id: '',
            scoreMoney:0.00,
            computedMoney:0.00,
            sourceMoney:0.00,
            deductionName:'',//积分抵扣名称
            offDeductible:false,//关闭积分显示
            useScore:false,//是否启用积分
        	disableds:true,//禁止提交
        	datas:null,
        	checkDeductionList:[],
            items:[
            	{num:'',data:[{price:'',span:'',des:''}]}
	            ]
        }
    },
	methods:{
	// 提交充值	
	 goSubmit(){
	 	if(this.disableds) return;
	 	this.submitOrder();
	 },	

        submitOrder() {
      	let json = {goods: JSON.stringify(this.assembleGoods()),mobile:this.MobilePhone, orders: JSON.stringify(this.assembleDeduction()),api_goods_id:this.api_goods_id};
      	console.log("getOrderJson:::", json);
      	//plugin.recharge.Frontend.Modules.Order.Controllers.create
        $http.get('plugin.flow-recharge.Frontend.Modules.Order.Controllers.create', json, "加载中...").then((response)=>{
        	
            console.log("create:::", response);

          if (response.result == 1) {
          		localStorage.setItem( "FlowTempMobilePhone", this.MobilePhone );
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

	//获取用户实际流量清单
	    getGoodsOptionPrice(mobile) {
	        $http.get('plugin.flow-recharge.api.goods.goodsOptionPrice', {mobile}, "加载中...").then((response)=>{
	
	          if (response.result == 1) {
	          	let Ditem = response.data;
	          	for (let x in Ditem) {
	          		this.$set( this.items, x, Ditem[x] )
	          	}
	          		this.goods_id = response.data[0].goods_id;
	          		this.option_id = response.data[0].option_id;
//	          		this.getDeductible(mobile,response.data[0].goods_id);
	          } else {
	             MessageBox.alert(response.msg);
	          }
	        }, function (response) {
	           MessageBox.alert(response);
	        });
	
	    },
	//获取流量商品规格预价格
	    getGoodsOption() {
	        $http.get('plugin.flow-recharge.api.goods.goodsOption',{} , "加载中...").then((response)=>{
	
	          if (response.result == 1) {
	          	let Ditem = response.data;
	          	for (let x in Ditem) {
	          		this.$set( this.items, x, Ditem[x] )
	          	}
	          	
	          		
	
	          } else {
	             MessageBox.alert(response.msg);
	          }
	        }, function (response) {
	           MessageBox.alert(response);
	        });
	
	    },

		// 获取用户积分和抵扣
      getDeductible(mobile,goods_id) {

          let json = {goods_id:this.goods_id,total:1,option_id:this.option_id,mobile:this.MobilePhone, orders: JSON.stringify(this.assembleDeduction()),api_goods_id:this.api_goods_id};

          $http.get('plugin.flow-recharge.Frontend.Modules.Order.Controllers.goods-buy', json).then((response)=>{
          
          if (response.result == 1) {
              this.computedMoney = response.data.total_price;
              
	              this.preOrder = response.data.order_data[0];
	          	// console.error(666666,response.data.order_data[0].discount.deduction[0]);
	          if (response.data.order_data[0].discount.deduction[0]) {
	          	this.deductionName = response.data.order_data[0].discount.deduction[0].name;
	              this.scoreMoney = response.data.order_data[0].discount.deduction[0].price;
	              this.score = response.data.order_data[0].discount.deduction[0].value;
              }
	          this.disableds = false;
          }else{
          	MessageBox.alert(response.msg);
          }
        });

      },      
	    // 当前选择的套餐名
       	selectedStyle(e,n,money){
			if (this.fun.isMoblie(this.MobilePhone)) {
				MessageBox.alert('请输入正确的手机号码！');
				return;
			}
//			if(val.length < 11 || val.length > 11)
			this.moneyHotspot = 9999;
			this.payMoney = 0.00;
			this.sourceMoney = 0.00;
			this.disableds = true;
       		this.Hot_flow = n;
			this.option_id = money.option_id;
//          this.getDeductible(this.MobilePhone, this.goods_id);
            this.datas = this.items[n].data;
            //console.error(this.datas);
        },
        // 当前选择的套餐价格
        selectMoney(e,money,n,api_goods_id){
        	
			this.moneyHotspot = n;
			this.payMoney = money;
			this.api_goods_id = api_goods_id;
			this.sourceMoney = money;
			this.getDeductible();
			//this.$emit("payMoney",money);
        }
	},
	
	//实时监测this.$store.state.service.chinese的变化，获取最新的语言包
	computed: {
		  	getLangState() {
				return this.$store.state.service.languageService;
		  	}
	},
	watch: {
	  	MobilePhone:function(val){
	  		val = val.toString();
	  		if(val.length < 11 || val.length > 11){
	  			this.offDeductible = false;
	  			this.moneyHotspot = 999;
	  			this.Hot_flow = 999;
	  			this.datas = '';
	  			this.disableds = true;
	  			return;
	  		}
	  		if(!this.fun.isMoblie(val) && val.length == 11){
	  			this.$refs.isinput.blur();
	  			this.getGoodsOptionPrice(val);
	  		}else{
	  			MessageBox.alert('请输入正确的手机号码！');
	  		}
	  	},	
	  	getLangState(val) {
		   	if(val){
				this.language=JSON.parse(sessionStorage.languageService).flow;
			}else{
				this.language=this.$store.state.service.languageService.flow;
			}
	  	},
	  	sourceMoney:function(val){
    		if(this.useScore){
    			this.computedMoney=this.sourceMoney-this.scoreMoney;
    		}else{
    			this.computedMoney=this.sourceMoney;
    		}
    	},	  	
	  	useScore:function(val){
	  	    
    		if(val){
                var deductionItem = new Object();
                if (this.preOrder) {
	                deductionItem.deduction_ids = this.preOrder.discount.deduction[0].id;	
                }
	                deductionItem.pre_id = this.preOrder.order.pre_id;
	                this.checkDeductionList.push(deductionItem);  
                //this.computedMoney=this.sourceMoney-this.scoreMoney;
    		}else{
                this.checkDeductionList = [];
    			//this.computedMoney=this.sourceMoney;
    		}
    		console.log('data:::', this.goods_id);
    		this.getDeductible();
    	},

	},
	
//	activated(){
//		if(sessionStorage.languageService){
//			this.language=JSON.parse(sessionStorage.languageService).flow;
//		}else{
//			this.language=this.$store.state.service.languageService.flow;
//		}
////		console.log(sessionStorage.languageService)
//	},
	
	mounted(){
		if(sessionStorage.languageService){
			this.language=JSON.parse(sessionStorage.languageService).flow;
		}else{
			this.language=this.$store.state.service.languageService.flow;
		}		
		if(localStorage.getItem("FlowTempMobilePhone")){
			
			this.MobilePhone = localStorage.getItem("FlowTempMobilePhone");
		}else{
			this.MobilePhone = '';
			this.getGoodsOption();
		}		
		
		this.$store.commit('onload');
	},

}
