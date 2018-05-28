<template>
	<div id="register">
		<c-title :hide="false" text='协议'></c-title>
		<div id="a_content" v-html='protocol'></div>
	</div>
</template>

<script>
import register_agreement_controller from './register_agreement_controller';
export default register_agreement_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#register {
	#agreement {
		height: 30px;
		line-height: 30px;
		.span {
			text-align: center;
			font-size: 20px;
			
			
		}
	}
	#lin {
		margin-bottom: 20px;
	}
	margin-top: 50px;
	width: 100%;
	#code {
		background: #ccc;
		padding: 3px 5px;
		border-radius: 3px;
	}
	h1 {
		color: #42b983;
	}
	.mint-button--large {
		margin-top: 10px;
	}
	#bts {
		margin: auto 5px;
		.mint-button--default {
			background-color: #13ce66;
			color: #FFF;
		}
	}
	.forget {
		color: #999;
		float: right;
	}
}
</style>