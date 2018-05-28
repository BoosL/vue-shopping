<template v-title="核销订单">
    <div id="goodsinfo">
    	<c-title :hide="false" text='核销订单'></c-title>

    	<div style="height: 45px;"></div>
    
		<div class="qrcode" v-show="showQrcode">
		
			<img :src="qrcode" style="width:100%">
			<div style="height: 30px;">请核销员扫码</div>
		
		</div>
    </div>

</template>
<script>
import order_verification_controller from './order_verification_controller';
export default order_verification_controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.qrcode{
		width:100%;
		margin: 0 auto;
	}
#goodsinfo{
	.addr{display: flex;flex-flow: row wrap;align-items:center;background: #FFF; border-bottom: #d8c7c7 1px solid; margin-bottom: 10px; padding-top: 15px; padding-bottom: 15px;
		i{flex: 1;font-size: 20px;}
		p{flex: 9;text-align: left; span{color: #858585;font-size: .6rem;}}
	}
	.detail_good{background: #FFF;padding: 0 10px;overflow: hidden;
		.content{text-align: left;background: #efeded;padding: 10px;color: #8C6700;}
		a{color: #000000;}
		h3{text-align: left;margin: 9px 0; i{font-size:20px;padding-right: 5px;}}
		.goods{display: flex;align-items: stretch;  flex-flow: row wrap;background: #efeded;padding: 5px;margin-bottom: 10px;
			.img{flex:3; img{width: 100%;}}
			.inner{flex: 5;padding: 0 5px;display: flex;flex-direction:column;align-items: flex-start;}
			.name{flex: 5; text-align: left}
			.price{flex: 2;align-items:center;}
			.option{color: #888;font-size: .6rem;flex: 1;}
			}
		}
	.tbs{ display: flex;align-items:center; background: #FFF; flex-flow: row wrap; padding:10px; line-height: 1.5rem;
		.left{text-align: left;flex: 40%;color:#858585;}
		.right{text-align: right;flex: 60%;}
	}
.detail_pay { height: 3rem; width: 100%; background: #fff; padding: 0px 2%; margin-top: 30px; border-top: 1px solid #eaeaea;
    position: fixed; bottom: 0px; box-sizing: border-box;
    .order_delete {height: 1.5rem; width: auto; margin-left: 5px; background: #fff; padding: 0px 10px; margin-top: 10px; border-radius: 5px; color: #5f6e8b;
    line-height: 1.5rem; float: right; border: 1px solid #5f6e8b;}
    }	
}
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
	.mint-header{	background: none;color: #666;}
	.is-fixed .mint-header-title{font-weight: bold;}
	.mint-header.is-fixed{border-bottom: 1px solid #e8e8e8;background: #FFF;z-index: 99;}
	.is-right a{font-size: .6rem;}
</style>