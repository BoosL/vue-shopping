<template>
    <div id="telephone">
        <!--<div class="input">
            <input type="text" name="" placeholder="请输入需要充值的金额">
            <span class="rt"></span>
        </div>-->
        <ul class="box">
            <li v-for="(item,index) in items">
                <div class="par" @click="selectStyle($event,item)" :class="{'active':item.recharge==moneyHotspot}">
                    <b>{{item.recharge}}</b> <p>{{item.discount}}</p> <i></i>
                    <div class="info" :class="{'active':item.recharge==moneyHotspot}"></div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';	
export default{
	props: [],
    data(){
        return{
            isactive:true,
            moneyHotspot:99999,//热选值
            items:[
                {recharge:'',money:''}
            ]
        }
    },
    methods:{
    	showTel(mPhone){
    		this.getGoodsOptionPrice(mPhone);
    	},
        selectStyle(e,money){
			if (!money.discount) {
				MessageBox.alert('请输入手机号码！');
				return;
			}
			this.moneyHotspot = money.recharge;		
			if(money.discount){
				this.sourceMoney = money.discount;
				this.disableds = false;
				this.$emit("payMoney",money.discount);
			}
        },
		// 获取话费商品规格预价格
      getBalance() {
        $http.get('plugin.recharge.api.goods.goodsOption', {}, "加载中...").then((response)=>{
          if (response.result == 1) {      		
          		this.items = response.data;
          } else {
             MessageBox.alert(response.msg);
          }
        }, function (response) {
           MessageBox.alert(response);
        });

      },
	
	//获取用户实际充值金额	
      getGoodsOptionPrice(mobile) {
        $http.get('plugin.recharge.api.goods.goodsOptionPrice', {mobile}, "加载中...").then((response)=>{

          if (response.result == 1) {
          		this.items = response.data;

          } else {
             MessageBox.alert(response.msg);
          }
        }, function (response) {
           MessageBox.alert(response);
        });

      },      
    },
    mounted(){
    	this.getBalance();
    },
    watch: {
	  	mPhones:function(val){
	  		console.error(999999999,val)
	  		this.getPhoneInfo(val);
	  		if(!this.fun.isMoblie(val)){
	  		this.getGoodsOptionPrice(val);
	  		}else{
	  			MessageBox.alert('请输入正确的手机号码！');
	  		}
	  	},    	
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
*{box-sizing:border-box}
#telephone{
    background:#fff;
    .input{
        margin:7px 13px;
        box-sizing:border-box;
        input{
            width:96%;
            height:35px;
            font-size:12px;
            border-radius:3px;
            color:#ccc;
            border:1px solid #ccc;
            padding-left:4%;
            background:#fff;
            outline:0;
            color:#000;
        }
    }
    .box{
        margin:7px 7px 150px 7px;
        overflow:hidden;
        li{
            width:33.3%;
            float:left;
            height:80px;
            margin-bottom:10px;
            div{
                margin:6px 6px;
                border:1px solid #ccc;
                height:100%;
                border-radius:4px;
                box-sizing:border-box;
                padding-top:20px;
                b{
                    font-size:22px;
                    color:#666;
                }
                p{
                    font-size:10px;
                    color:#999;
                }
            }
            .active{
                border:1px solid #36d2b6;
                position:relative;
                i{
                    width:30px;
                    height:16px;
                    display:inline-block;
                    position:absolute;
                    right:0;
                    bottom:0;
                    background:url(../../../../../assets/images/checkeD.png) no-repeat 1px 0;
                }
            }
            .par{
                position: relative;
            }
            .info{
                width: 100%;
                height: 100%;
                z-index: 100;
                position: absolute;
                top:-6px;
                left: -6px;
            }
        }
    }
}
</style>