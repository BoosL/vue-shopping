<template>
	<div id="rentAfterSalas">	
		<c-title :hide="false" text='售后列表'></c-title>
		<div style="height:43px"></div>
		<ul class="salasList">
			<li v-for="sala in salas">
				<p class="title"><span class="lf">{{sala.singleNum}}</span> <span class="rt">{{sala.status}}</span></p>
				<div class="pro">
					<img :src="sala.imgSrc" alt="" />
					<div class="rt">
						<p>{{sala.proTit}}</p>
						<h5>规格：</h5>
					</div>
				</div>
				<div class="text">退款</div>
				<div class="checkDetail">
					<span class="lf">退款金额:¥{{sala.refundMoney}}</span>
					<button class="rt">查看详情</button>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import cTitle from 'components/title';
	export default{
		components: { cTitle },
		data(){
			return{
				salas:[
					{singleNum:"SN20171914350766222",status:"待审核",imgSrc:"",proTit:"衫资2017春夏秋冬女装群批发假两件套群，中长款纯色假连衣裙"
					,refundMoney:"110"},
					{singleNum:"SN20171914350766222",status:"待审核",imgSrc:"",proTit:"衫资2017春夏秋冬女装群批发假两件套群，中长款纯色假连衣裙"
					,refundMoney:"110"},
				]
			}
		}
	}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#rentAfterSalas{
	.salasList{
		li{
			margin-bottom:10px;
			.title{
				height:35px;
				line-height:35px;
				padding:0 15px;
				background:#fff;
				span.rt{color:#f15353}
			}
			.pro{
				padding:10px 15px;
				background:#f5f5f5;
				overflow:hidden;
				img{	
					width:25%;
					height:80px;
					float:left;
				}
				div.rt{
					width:72%;
					text-align:left;
					padding-left:3%;
					h5{font-weight:normal;padding-top:20px;font-size:10px;}
				}
			}
			.text{
				height:35px;
				line-height:35px;
				padding:0 15px;
				background:#fff;
				text-align:left;
				border-bottom:1px solid #eddcdc;
			}
			.checkDetail{
				background:#fff;
				height:40px;
				line-height:40px;
				padding:0 15px;
				button{
					margin-top:6px;
					padding: 5px 10px;
					border-radius:6px;
					background:#fff;
					border:1px solid #f15353;
					color:#f15353;
					outline:0;
				}
			}	
		}
	}
}
</style>