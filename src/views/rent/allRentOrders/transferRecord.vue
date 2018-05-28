<template>
	<div id="transferRecord">
		<c-title :hide="false" text='转赠记录'></c-title>
		<div style="height:45px"></div>
		<div class="box">
			<ul v-for="record in records">
				<li>{{record.recording}}</li>
				<li>转赠时间：{{record.time}}</li>
				<li>{{record.infor}}人信息：</li>
				<li>昵称：{{record.kity}}</li>
				<li>会员ID：{{record.userId}}</li>
				<li>姓名：{{record.name}}</li>
				<li>联系电话：{{record.tel}}</li>
				<li>地址：{{record.addr}}</li>
				<li></li>
			</ul>
		</div>
	</div>
</template>

<script>
	import cTitle from 'components/title';

	export default{
		components: { cTitle },
		data(){
			return{
				records:[
					{addr:"广东省广州市白云区云霄路188号",tel:"13878237878",name:"李一天",userId:"100",kity:"甲",
					infor:"受赠",time:"2017-02-10 00:00",recording:"您已将该笔订单成功转赠给丙(会员名称)"},
					{addr:"广东省广州市白云区云霄路188号",tel:"13878237878",name:"李一天",userId:"100",kity:"甲",
					infor:"转赠",time:"2017-02-10 00:00",recording:"甲(会员名称)已将该笔订单成功转赠给您"}
				]
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#transferRecord{
	
	text-align:left;
	line-height:30px;
	.box{
		padding:10px 20px;
		background:#fff;
		ul:first-child{
			color:#e51c23;
			li:nth-child(2){
				border-bottom:1px dotted #e51c23;
			}
			li:last-child{
				border:1px solid #db2427;
				background:#e84e40;
			}
		}
		ul:last-child{
			padding-bottom:0;
		}
		ul{
			padding:0 15px;
			border-left:1px solid #ccc;
			padding-bottom:50px;
			position:relative;
			li:first-child{
				line-height:25px;
				vertical-align: top;
			}
			li:nth-child(2){
				padding-bottom:15px;
				border-bottom:1px dotted #ccc;
			}
			li:nth-child(3){
				padding-top:15px;
			}
			li:last-child{
				width:10px;
				height:10px;
				border-radius:50%;
				border:1px solid #8c898c;
				background:#7d797d;
				position:absolute;
				top:0px;
				left:-7px;
			}
		}
	}
	
}

</style>