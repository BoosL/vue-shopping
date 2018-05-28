<template>
	<div id="info">
		<c-title :hide="false" text='我的信息'></c-title>
		<div style="height: 55px;"></div>

		<yd-cell-group title="基本信息">
			<yd-cell-item>
				<span slot="left">姓名：</span>
				<yd-input slot="right" required :show-success-icon="false" :show-error-icon="false" v-model="info_form.realname" max="10" placeholder="请输入您的姓名"></yd-input>
			</yd-cell-item>

			<yd-cell-item arrow v-if="type == 1" @click.native="bindTel">
				<span slot="left">手机号：</span>
				<yd-input slot="right" type="tel" disabled v-model="info_form.mobile" required regex="mobile" :show-success-icon="false" :show-error-icon="false" :show-clear-icon="false" max="11" placeholder="请输入手机号"></yd-input>
				<span slot="right" style="width:100px;">{{bind_btn}}</span>
			</yd-cell-item>
			<yd-cell-item v-else>
				<span slot="left">手机号：</span>
				<yd-input slot="right" type="tel" disabled v-model="info_form.mobile" required regex="mobile" :show-success-icon="false" :show-error-icon="false" :show-clear-icon="false" max="11" placeholder="请输入手机号"></yd-input>
			</yd-cell-item>

			<yd-cell-item arrow @click.native="showSexInfo" v-if="isShowSex">
				<span slot="left">性别：</span>
				<yd-input slot="right" type="text" disabled v-model="sexName" required :show-success-icon="false" :show-error-icon="false" :show-clear-icon="false" placeholder="请选择性别"></yd-input>

			</yd-cell-item>

			<yd-cell-item arrow @click.native="openPicker" v-if="isShowBirthday">
				<span slot="left">生日：</span>
				<yd-input slot="right" type="text" disabled v-model="info_form.birthday" required :show-success-icon="false" :show-error-icon="false" :show-clear-icon="false" placeholder="请选择性别"></yd-input>

			</yd-cell-item>

			<yd-cell-item>
				<span slot="left">微信号：</span>
				<yd-input slot="right" v-model="info_form.wx" max="20" :show-success-icon="false" :show-error-icon="false" placeholder="请输入微信号"></yd-input>
			</yd-cell-item>

		</yd-cell-group>

		<yd-cell-group title="支付宝信息">
			<yd-cell-item>
				<span slot="left">支付宝账号：</span>
				<yd-input slot="right" v-model="info_form.alipay" max="40" :show-success-icon="false" :show-error-icon="false" placeholder="请输入支付宝账号"></yd-input>
			</yd-cell-item>
			<yd-cell-item>
				<span slot="left">账号姓名：</span>
				<yd-input slot="right" v-model="info_form.alipay_name" max="20" :show-success-icon="false" :show-error-icon="false" placeholder="请输入支付宝账号姓名"></yd-input>
			</yd-cell-item>
		</yd-cell-group>

		<yd-cell-group title="所在地信息" v-if="isShowAddress">
			<yd-cell-item arrow>
				<span slot="left">所在地区：</span>
				<input slot="right" type="text" @click.stop="showAdd = true" v-model="districtName" readonly placeholder="请选择地区">
			</yd-cell-item>

			<yd-cell-item>
				<yd-textarea slot="right" v-model="info_form.address" placeholder="请输入详细地址" maxlength="100"></yd-textarea>
			</yd-cell-item>
		</yd-cell-group>

		<yd-cell-group title="其他信息" v-if="isForm">
			<yd-cell-item v-for="cItem in customDatas">
				<span slot="left">{{cItem.name}}：</span>
				<yd-input slot="right" v-model="cItem.value" max="40" :show-success-icon="false" :show-error-icon="false" :placeholder='"请输入"+cItem.name'></yd-input>
			</yd-cell-item>
		</yd-cell-group>

		<yd-cell-group title="银行卡信息">
			<yd-cell-item arrow @click.native="editBank">
				<span slot="left">银行卡</span>
				<yd-input slot="right" type="text" disabled required :show-success-icon="false" :show-error-icon="false" :show-clear-icon="false" placeholder=""></yd-input>
			</yd-cell-item>
		</yd-cell-group>

		<yd-cell-group title="支付密码" v-if="isBalancePwd">
			<yd-cell-item arrow @click.native="editBalancePwd">
				<span slot="left">余额支付密码</span>
				<yd-input slot="right" type="text" disabled required :show-success-icon="false" :show-error-icon="false" :show-clear-icon="false" placeholder=""></yd-input>
			</yd-cell-item>
		</yd-cell-group>

		<!--<yd-cell-group :title='custom_title+"信息"' v-if="is_custom">
			<yd-cell-item arrow @click.native="editCustom">
				<span slot="left">{{custom_title}}：</span>
				<yd-input slot="right" type="text" disabled v-model="custom_value" required :show-success-icon="false" :show-error-icon="false" :show-clear-icon="false" placeholder=""></yd-input>
			</yd-cell-item>
		</yd-cell-group>-->

		<yd-actionsheet :items="sexItems" v-model="showSex" cancel="取消"></yd-actionsheet>
		<yd-cityselect v-model="showAdd" :callback="resultAdd" :items="district"></yd-cityselect>
		<yd-button-group>
			<yd-button size="large" type="danger" @click.native="submitInfo($event)">确认修改</yd-button>
		</yd-button-group>
		<div style="height: 30px;"></div>

		<mt-datetime-picker ref="picker" type="date" :startDate="startDateInfo" :endDate="endDateInfo" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm" v-model="pickerValue">
		</mt-datetime-picker>
	</div>
</template>
<script>
	import info from "./info_v2_controller";
	export default info;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	#info span {
		font-size: 0.9rem !important;
	}
	
	.list1 {
		margin-top: 10px;
		height: 44px;
		width: 100%;
		background: #fff;
		padding: 0 0 0 3%;
		border-top: 1px solid #e6e1e1;
		font-size: 0.9rem;
		line-height: 44px;
		color: #333;
		text-align: left;
	}
	
	.list2 {
		height: 44px;
		width: 100%;
		background: #fff;
		padding: 0 0 0 3%;
		border-top: 1px solid #e6e1e1;
		font-size: 0.9rem;
		line-height: 44px;
		color: #333;
		text-align: left;
	}
	
	.list1 i.fa.fa-angle-right {
		float: right;
		line-height: 44px;
		display: inline-block;
		font-size: 0.9rem;
		margin-right: 6px;
		color: #929292;
		width: 20px;
		height: 20px;
		text-align: center;
		background-size: 20px;
	}
	
	.fa-angle-right {
		color: #999;
		font-size: 26px;
		float: right;
		line-height: 50px;
		margin-left: 6px;
		margin-right: 5px;
	}
	
	.btmobile {
		top: 0px;
		line-height: 48px;
		right: 100;
		width: 80px;
		font-size: 0.8rem;
		color: #f15353;
	}
	
	#info .mint-button {
		margin: 0 2%;
	}
	
	.maleall {
		background: #fff;
		text-align: left;
	}
	
	.males {
		line-height: 50px;
		display: flex;
		border-top: 1px solid #f3f3f3;
		margin-left: 10px;
	}
	
	.maleall span {
		color: #888;
		font-size: 0.9rem;
		vertical-align: middle;
		width: 28%;
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
	
	#myimg {
		flex: 1;
		text-align: right;
	}
	
	.popup-con {
		width: 100%;
	}
	
	.el-upload img {
		width: 30%;
	}
	
	.avatar-uploader-icon {
		padding-right: 25px;
	}
	
	.mint-cell-wrapper {
		background: red;
	}
	
	.mint-button {
		margin: 5px 0;
	}
	
	#info .mint-cell-wrapper {
		padding: 0;
	}
</style>