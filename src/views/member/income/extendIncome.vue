<template>
	 <div id="income">
	 	<div class="top-warpper">
	 		<div class="warpper-t">
	 			<div class="brand">
	 				<img src="">
	 			</div>
	 			<p class="detail">查看收入明细 <span class="iconfont icon-weitixian"></span></p>
	 		</div>
	 		<div class="warpper-b">
	 			<div class="eyes">
	 				<img src="../../../assets/images/eyes.png">
	 			</div>
	 			<div class="ex-income">
	 				<p class="num">100.00<span>万</span> </p>
	 				<p class="title">推广收入 (元)</p>
	 			</div>
	 			<div class="cash"> <span>提现</span></div>
	 		</div>
	 	</div>
	 	<div class="content-warpper">
	 		<div class="warpper">
	 			<div class="line"></div>
	 			<div class="content-top">
	 				<h2>分销商推广收入</h2>
	 				<div class="click">点击进入</div>
	 			</div>
	 			<div class="content-bot">
	 				<div class="description">
	 					<p>分销商推广收入说明</p>
	 					<p class="money"><span>100.00</span>+4.00</p>
	 				</div>
	 				<div class="settle">
	 					<p> <span class="iconfont icon-yijiesuan"></span> 已结算20.00</p>
	 					<p> <span class="iconfont icon-weitixian"></span> 未结算20.00 <b>万</b></p>
	 				</div>
	 			</div>
	 		</div>

	 		<div class="warpper">
	 			<div class="line"></div>
	 			<div class="content-top">
	 				<h2>分销商推广收入</h2>
	 				<div class="click">点击进入</div>
	 			</div>
	 			<div class="content-bot">
	 				<div class="description">
	 					<p>分销商推广收入说明</p>
	 					<p class="money"><span>100.00</span>+4.00</p>
	 				</div>
	 				<div class="settle">
	 					<p> <span class="iconfont icon-yijiesuan"></span> 已结算20.00</p>
	 					<p> <span class="iconfont icon-weitixian"></span> 未结算20.00 <b>万</b></p>
	 				</div>
	 			</div>
	 		</div>

	 		<div class="permissions">
	 			<p class="title">获取更多推广权限</p>
	 			<div class="list">
	 				<mt-swipe :auto="0">
		 				<mt-swipe-item v-for="items in permissionsData">
		 					<ul>
		 						<li v-for="item in items" @click="openMOdal()">
		 							<i :class="item.icon"></i>
		 							<span>{{item.name}}</span>
		 						</li>
		 					</ul>
		 				</mt-swipe-item>
	 				</mt-swipe>
	 			</div>
	 		</div>
	 	</div>

	 	<div class="modal" style="display:none">
	 		<div class="modal-dialog">
		 		<div class="close" @click="closeModal()">
		 			<img src="../../../assets/images/close.png">
		 		</div>
				<h1 class="title">如想开启招商员需满足以下条件:</h1>
				<form action="" method="get" accept-charset="utf-8">
					<div class="form-group">
						<div class="radio" @click="iconChange()">
							<img src="../../../assets/images/check.png" v-if="checked">
							<img src="../../../assets/images/noCheck.png" v-else>
						</div>
						<span>会员关系链申请</span> <i class="accomplish" v-show="checked">完成</i>
					</div>
					<div class="form-group">
						<div class="radio" @click="iconChange2()">
							<img src="../../../assets/images/check.png" v-if="!checked2">
							<img src="../../../assets/images/noCheck.png" v-else>
						</div>
						<span>招商员申请</span>
					</div>
					<button class="apply_btn" type="button">去申请</button>
				</form>
	 		</div>
	 	</div>
	 </div>
</template>

<script type="text/javascript">
	import { Swipe, SwipeItem } from 'mint-ui';
	export default{
		data(){
			return{
				permissionsData:[
					[
						{icon:"iconfont icon-yijiesuan",name:"招商分红"},
						{icon:"iconfont icon-yijiesuan",name:"招商哇哇"},
						{icon:"iconfont icon-yijiesuan",name:"招商大吉"},
						{icon:"iconfont icon-yijiesuan",name:"招商进入"}
					],
					[
						{icon:"iconfont icon-yijiesuan",name:"招商分红"},
						{icon:"iconfont icon-yijiesuan",name:"招商哇哇"},
						{icon:"iconfont icon-yijiesuan",name:"招商大吉"},
						{icon:"iconfont icon-yijiesuan",name:"招商进入"}
					]
				],
				checked:true,
				checked2:true
			}
		},

		methods:{
			openMOdal(){
				var modal=document.getElementsByClassName("modal")[0];
				modal.style.display="block";
			},
			closeModal(){
				var modal=document.getElementsByClassName("modal")[0];
				modal.style.display="none";
			},
			iconChange(){
				this.checked=!this.checked;
			},
			iconChange2(){
				this.checked2=!this.checked2;
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../assets/css/extendIncome.scss";

</style>