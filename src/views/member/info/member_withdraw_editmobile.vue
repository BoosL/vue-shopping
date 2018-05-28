<template>
	<div id="alterAddress">
		<c-title :hide="false" :text='action_name' :goback='false'></c-title>
		<div style="height: 50px;"></div>
		<mt-field label="手机号码" placeholder="请输入手机号码" v-model='form.mobile'></mt-field>
		<mt-field label="验证码" placeholder="请输入验证码" v-model='form.code'>
			<button @click="VerificationCode" id="code">{{CodeStr}}</button>
		</mt-field>
		<div class="maleall">

			<div class="address_addnav" @click="alterAction">
				<i class="fa fa-pencil-square-o"></i>
				<span>{{action_name}}</span>
			</div>

		</div>
	</div>
</template>
<script>
import member_withdraw_editmobile_controller from './member_withdraw_editmobile_controller';
export default member_withdraw_editmobile_controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#alterAddress #code {
	background: #ccc;
	padding: 3px 5px;
	border-radius: 3px;
}

.address_addnav {
	width: 100%;
	padding: 0 3% 0 6%!important;
	position: fixed;
	bottom: 0;
	left: 0;
	background: #f15353 !important;
	color: #fff !important;
	text-align: center;
	height: 44px !important;
	line-height: 44px !important;
}

.popup-con {
	width: 100%;
}

.mint-field-other span {
	background: #ccc;
	color: #FFF;
	line-height: 48px;
	height: 48px;
	display: block;
	padding: 0 10px;
}

#alterAddress .mint-field .mint-cell-title {
	text-align: left;
}

.address_addnav i {
	color: #fff;
	font-size: 22px;
	position: absolute;
	top: 50%;
	height: 18px;
	line-height: 18px;
	margin-left: -34px;
	margin-top: -9px;
}

.maleall {
	background: #FFF;
	text-align: left;
}

#alterAddress .males {
	line-height: 50px;
	display: flex;
	border-top: 1px solid #d9d9d9;
	margin-left: 10px;
}

.maleall span {
	font-size: 16px;
	vertical-align: middle;
	width: 105px;
	-webkit-box-flex: 0;
	-ms-flex: none;
	flex: none;
}

#address {
	flex: 1;
	line-height: 50px;
	.mint-button--default {
		line-height: 50px;
		text-align: left;
		font-size: 16px;
	}
}
</style>
