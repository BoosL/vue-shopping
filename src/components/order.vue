<template>
	<div id="goodsinfo">
		<!--{{datas}}-->

		<div :v-model="datas">{{datas.order.price}}</div>

		 	
	
	</div>
</template>


<script>
import order from './order_controller';
export default order;
// import cTitle from 'components/title';
// var _goodsId = "";
// var _optionsId = "";
// var _total = 1;
// export default {
// 	props: ['datas'],
//     data() {
//         return {

//         }
//     },

//     methods: {

//     },
//     components: { cTitle }
// }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#goodsinfo {
	.addr {
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		background: #FFF;
		border-bottom: #d8c7c7 1px solid;
		margin-bottom: 10px;
		i {
			flex: 1;
			font-size: 20px;
			color: #888888
		}
		p {
			flex: 6;
			text-align: justify;
			font-weight: bold;
			line-height: 1.5rem;
			padding-right: 1rem;
			color: #333333;
			span {
				font-size: .9rem;
				font-weight: normal;
				color: #666;
			}
		}
	}
	.detail_good {
		background: #FFF;
		overflow: hidden;
		.content {
			text-align: left;
			background: #efeded;
			padding: 10px;
			color: #8C6700;
		}
		a {
			color: #000000;
		}
		h3 {
			text-align: left;
			margin: 9px 0;
			i {
				font-size: 20px;
				padding-right: 5px;
			}
		}
		.goods {
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-align: stretch;
			-ms-flex-align: stretch;
			align-items: stretch;
			-webkit-box-orient: horizontal;
			-webkit-box-direction: normal;
			-ms-flex-flow: row wrap;
			flex-flow: row wrap;
			padding: 10px;
			background: #fafafa;
			.img {
				flex: 3;
				img {
					width: 100%;
				}
			}
			.inner {
				flex: 5;
				padding: 0 5px;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
			}
			.name {
				flex: 5;
				text-align: left;
				color: #333333;
			}
			.price {
				flex: 2;
				align-items: center;
				text-align: right;
				color: #333333;
			}
			.option {
				color: #888;
				font-size: .6rem;
				flex: 1;
			}
		}
	}
	.nums {
		background: #FFF;
		text-align: right;
		margin: 0;
		padding-right: 10px;
		line-height: 2rem;
	}
	.tbs {
		display: flex;
		align-items: center;
		background: #FFF;
		flex-flow: row wrap;
		padding: 10px;
		line-height: 1.5rem;
		border-top: #e8e8e8 solid 1px;
		border-bottom: #e8e8e8 solid 1px;
		margin-top: 10px;
		.list {
			width: 100%;
			padding-bottom: 10px;
		}
		.list:nth-last-child(1) {
			padding-bottom: 0
		}
		.left {
			text-align: left;
			float: left;
			color: #858585;
		}
		.right {
			text-align: right;
			float: right;
		}
		p {
			text-align: left;
			margin: 0;
			padding-right: 10px;
			line-height: 2rem;
			width: 100%;
			span {
				color: #858585;
				font-size: .6rem;
				float: right;
			}
		}
	}
	.detail_pay {
		text-align: left;
		height: 3rem;
		width: 100%;
		background: #fff;
		padding: 0 0 0 2%;
		margin-top: 30px;
		border-top: 1px solid #eaeaea;
		position: fixed;
		bottom: 0px;
		box-sizing: border-box;
		line-height: 3rem;
		.order_delete {
			height: 3rem;
			width: auto;
			background: #f15353;
			padding: 0 15px;
			color: #FFF;
			line-height: 3rem;
			float: right;
			border: 1px solid #f15353;
		}
	}
	span {
		color: #f15353;
		font-size: 1.2rem;
	}
}
</style>