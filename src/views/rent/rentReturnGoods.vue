<style lang="scss" rel="stylesheet/scss" scoped>
#rentReturnGoods {
	.title {
		width: 100%;
		box-sizing: border-box;
		padding: 0 15px;
		line-height: 40px;
		background-color: #edebfe;
		font-weight: 400;
		color: #18173a;
		font-size: 16px;
		b {
			color: #688498;
			float: left;
			font-size: 14px;
			font-weight: normal;
		}
		i {
			color: #e06a71;
			float: right;
			font-style: normal;
			font-size: 14px;
			font-weight: normal;
		}
	}
	.content {
		width: 100%;
		height: 200px;
		background: #FFFFFF;
		box-sizing: border-box;
		padding-top: 10px;
		li {
			width: 80%;
			margin: 15px auto;
			line-height: 20px;
			text-align: right;
			span {
				float: left;
				font-size: 14px;
				display: inline-block;
				color: #333;
				height: 20px;
				line-height: 20px;
				padding-top: 3px;
			}
			.orderNum {
				width: 180px;
				height: 29px;
				border: 1px solid #bfcbd9;
				outline: red;
				border-radius: 5px;
				padding: 3px 10px;
				box-sizing: border-box;
			}

			input::-webkit-input-placeholder {
				color: #97a8be;
			}
		}
		li:after {
			content: "";
			display: block;
			clear: both;
		}
	}

	.info {
		width: 100%;
		height: 120px;
		margin-top: 1px;
		background: #FFFFFF;
		padding-top: 20px;
		box-sizing: border-box;
		li {
			width: 80%;
			margin: 15px auto;
			line-height: 20px;
			font-size: 14px;
			text-align: left;
			.tel {
				width: 40%;
				/*text-align: right;*/
				padding-left: 20px;
				float: right;
				height: 100%;
				background-image: url(./../../assets/images/tel.png);
				background-repeat: no-repeat;
				background-size: 18px 18px;
			}
		}
	}
}
</style>
<template>
	<div id="rentReturnGoods">
		<header class="title">
			<b @click="back()">取消</b>
			归还
			<i @click="ensure()">确定</i>
		</header>
	
		<ul class="content">
			<li>
				<span>填写归还物流信息</span>
			</li>
			<li>
				<span>快递公司</span>
				<el-select v-model="expressName" clearable placeholder="请选择快递公司">
					<el-option v-for="item in options" :key="item.code" :label="item.name" :value="item.code">
					</el-option>
				</el-select>
			</li>
			<li>
				<span>快递单号</span>
				<input class="orderNum" v-model='orderNum' type="number" placeholder="请输入快递单号" />
			</li>
		</ul>
	
		<ul class="info">
			<li>
				收货人:{{addInfo.realname}}
				<div class="tel">{{addInfo.mobile}}</div>
			</li>
			<li>归还地址:{{addInfo.address}}</li>
		</ul>
	</div>
</template>


<script>
import rentReturnGoodsController from './rentReturnGoodsController';
export default rentReturnGoodsController;

</script>
