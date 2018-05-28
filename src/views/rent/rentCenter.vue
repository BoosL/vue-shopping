<template>
	<div id="rentCenter">
		<div class="m-header">
			<router-link :to= "fun.getUrl('rentDepositDetail')">
					<div class="money">押金明细</div>
			</router-link>
			<h3>¥{{data.cash}}</h3>
			<p>我的押金</p>
			<h4>冻结金额{{data.freeze}}元 <b @click="changePop()">?</b></h4>
			<div class="btn">
				
				<router-link :to= "fun.getUrl('rentCharge')">
					<button type="button">充值</button>
				</router-link>
				
				<router-link :to= "fun.getUrl('rentDeposit')">
					<button type="button">提现</button>
				</router-link>
				
			</div>
		</div>
		
		<!-- 弹窗 -->
      	<div class="modal" v-show="active">
	 		<div class="modal-dialog">
		 		<div class="close" @click="closeModal()">
		 			<img src="../../assets/images/close.png">
		 		</div>
				<h1 class="title">冻结金额说明</h1>
				<p>如果你无法简洁的表达你的想法，那么说明你还不都了解他---阿尔伯特-爱因斯坦</p>
	 		</div>
	 	</div>
	 	
	 
		<div id="orderlist">
			<div class="ordertltie">

				<router-link :to= "fun.getUrl('rentMyOrder',{ status:'0' })">
					<div class="ordername">我的订单</div>
					<div class=""><i class="fa fa-angle-right"></i>
					</div>
				</router-link>
			</div>
			<div class="order_all">
				<router-link :to="fun.getUrl('rentMyOrder',{ status:'1' })">
					<div class="order_pub">
						<div class="badge">{{waitPay==0?'':waitPay}}</div>
						<i class="fa money"></i>
						<br>待付款
					</div>
				</router-link>
				<router-link :to="fun.getUrl('rentMyOrder',{ status:'2' })">

					<div class="order_pub">
						<div class="badge ">{{waitSend==0?'':waitSend}}</div>
						<i class="fa box"></i>
						<br>待发货
					</div>
				</router-link>
				<router-link :to="fun.getUrl('rentMyOrder',{ status:'3' })">

					<div class="order_pub">
						<div class="badge ">{{waitReceive==0?'':waitReceive}}</div>
						<i class="fa car"></i>
						<br>待收货
					</div>

				</router-link>
				
				<router-link :to="fun.getUrl('rentMyOrder',{ status:'4' })">
					<div class="order_pub">
						<div class="badge">{{waitrRefund==0?'':waitrRefund}}</div>
						<i class="fa refun"></i>
						<br>待归还
					</div>
				</router-link>
				
				
				<router-link :to="fun.getUrl('rentAfterSalas')">
					<div class="order_pub">
						<div class="badge">{{waitrRefund==0?'':waitrRefund}}</div>
						<i class="fa refun"></i>
						<br>待退款
					</div>
				</router-link>
			</div>
		
			<div class="ordertltie"  >
				
				<router-link :to="fun.getUrl('rentGuide')">
					<div class="ordername">租赁指南</div>
					<div class=""><i class="fa fa-angle-right"></i>
					</div>
				</router-link>
			</div>
			<div class="ordertltie" @click="btnsPop=true">
				
				<router-link :to= "fun.getUrl('')">
					<div class="ordername">客服热线</div>
					<div class="tel">789879676</div>
				</router-link>
				<div class="modal" v-show="btnsPop" @click.stop="btnsPop=false">
					<div class="btns" @click.stop>
						<button>呼叫</button>
						<button>添加到通讯录</button>
					</div>
				</div>
			</div>
		</div>
		

		<c-Footer></c-Footer>
	</div>
</template>

<script>
import cFooter from './component/rentFoot';
export default{
	components: { cFooter },
	data(){
		return{
			active:false,
			btnsPop:false,
			data:{
				cash:"2000.00",
				freeze:"1000.00",
				
			}
		}
	},
	methods:{
		changePop(){
			this.active=!this.active;
		},
		closeModal(){
			this.active=false;
		},
	}
}
</script>			

<style lang="scss" rel="stylesheet/scss" scoped>
.list1 {height:44px; width:97%; background:#fff; padding:0 0 0 3%; border-top:1px solid #e6e1e1;font-size: .9rem;line-height:44px; color:#333;text-align: left;}
.list1 i.fa.fa-angle-right{ float:right; line-height:44px;display: inline-block;font-size:0.9rem; margin-right:6px;color: #929292;width: 20px;height: 20px;text-align: center;background-size: 20px;}

#rentCenter{
    .m-header{
		text-align:center;
		padding:0 15px;
		background:#fff;
		clear:both;
		.money{
			text-align: right;
			float:right;
			height:40px;
			line-height:40px;
			color:#aaa;
		}
		h3{
			clear:both;
			color:#e51c23;
			line-height:30px
		}
		p{
			clear:both;
			color:#aaa;
			line-height:30px
		}
		h4{
			clear:both;
			b{
				width:15px;
				height:15px;
				border-radius:50%;
				background:#e51c23;
				line-height:15px;
				text-align:center;
				display: inline-block;
				color:#fff;
			}
		}
		.btn{
			padding:10px 0;
			button{
				width:80px;
				height:30px;
				border-radius: 5px;
				border:1px solid #ccc;
				outline:0;
				background: #fff;
			}
		}
	}
	
	.modal{
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background:rgba(0,0,0,.7);
        z-index:999;
        .btns{
	    	margin:60% 15%;
	    	width:70%;
	    	button{
	    		float:left;
	    		width:100%;
	    		height:35px;
	    		text-align:left;
	    		line-height:35px;
	    		background:#fff;
	    		border:0;
	    		outline:0
	    	}
	    	button:first-child{
	    		border-bottom:1px solid #ccc;
	    	}
	    }
        .modal-dialog{
            width:80%;
            height:190px;
            background:#fff;
            border-radius:6px;
            border-top:10px solid #f15353;
            margin:50% auto;
            position:relative;
            .close{
                position:absolute;
                top:-50px;
                right:0;
            }
            .title{
                color:#666;
                font-size:14px;
                font-weight:bold;
                line-height:35px;
                text-align:left;
                padding-left:25px;
                padding-top:10px;
            }
            p{padding:0 15px;text-align:left}
        }
    }
	
	
	#orderlist{margin: 10px 0;}
    .ordertltie{background: #FFF;text-align: left;text-indent: 15px;width: 100%;height: 2.286rem;border-bottom: 1px solid #f5f3f3;    box-sizing: border-box;
        i{line-height:2.286rem;color:#999; font-size:20px; float:right;padding-right: 15px;}
        a .ordername{float: left;line-height: 2.286rem;font-size: 0.857rem;  color: #333;}
    	.tel{float:right;color:#e51c23;padding-right:15px;line-height:2.286rem}
    }
    .order_pub{width: 20%;position: relative;box-sizing: border-box;}
    #orderlist .puball{color: #000000;border-left:1px solid #8F9295;}
    .badge{position: absolute;left: 50%;top:-5px;background-color: #ff4949;border-radius: 10px;color: #fff;line-height: 14px;font-size: 12px;padding:0 5px;}
	
	.order { width:100%; background:#fff; margin-top:10px; border-bottom:1px solid #f5f3f3;}
    .order_all {background: #FFF;width:100%; padding:14px 0px; color:#666;overflow: hidden;margin-bottom:20px}
    .order_all a i{    font-size: 20px;  margin-bottom: 4px;  width: 20px;  height: 20px;  background-size: 20px;}
    .order_all a .money{background-image:url(../../assets/images/money.png); }
    .order_all a .box{background-image:url(../../assets/images/box.png); }
    .order_all a .car{background-image:url(../../assets/images/car.png); }
    .order_all a .refun{background-image:url(../../assets/images/refun.png); }
    .order_pub {height:38px; float:left; border-left:1px solid #eee; padding-top:2px; text-align:center; color:#8c8c8c; position:relative;font-size: .8rem}
    .order_pub span {height:14px; background:#f30; border-radius:8px; position:absolute; top:0; right:6%;padding: 0 5px;font-size:.8rem; color:#fff; line-height:14px;}
}
</style>












