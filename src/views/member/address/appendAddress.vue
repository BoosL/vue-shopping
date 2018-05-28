<template>
	<div id="appendAddress">
	
		<c-title :hide="false"
		         text='添加收货地址'></c-title>
		<div style="height: 50px;"></div>
		<mt-field label="收件人"
		          v-model="form.username"
		          placeholder="请输入收件人"></mt-field>
		<mt-field label="联系电话"
		          v-model="form.mobile"
		          placeholder="请输入联系电话" type="tel"></mt-field>
		<div class="maleall">
			<label class="males"><span>设置默认地址 </span>
				<div class="address"
				     style="">
					<mt-switch :v-model="form.isdefault"></mt-switch>
				</div>
			</label>
		</div>
		<div class="maleall">
			<label for="male"
			       class="males"><span>所在省份 </span>
				<el-select v-model="provicevalue"
				           placeholder="请选择省份"
				           @change="selectProviceHandle">
					<el-option v-for="item in provinceoptions"
					           :label="item.areaname"
							   :key="item.value"
					           :value="item">
					</el-option>
				</el-select>
			</label>
		</div>
		<div class="maleall">
			<label for="male"
			       class="males"><span>所在城市 </span>
				<el-select v-model="cityvalue"
				           placeholder="请选择城市"
				           @change="selectCityHandle">
					<el-option v-for="item in cityoptions"
					           :label="item.areaname"
							   :key="item.value"
					           :value="item">
					</el-option>
				</el-select>
			</label>
		</div>
		<div class="maleall">
			<label for="male"
			       class="males"><span>所在区县 </span>
				<el-select v-model="regionvalue"
				           placeholder="请选择区县"
				           @change="selectRegionHandle">
					<el-option v-for="item in regionoptions"
					           :label="item.areaname"
							   :key="item.value"
					           :value="item">
					</el-option>
				</el-select>
			</label>
		</div>
		<mt-field label=""
		          v-model="form.address"
		          placeholder="请输入详细地址"></mt-field>
		          <div style="height: 80px;"></div>
		<div class="address_addnav"
		     @click="appendAddress"><i class="fa fa-plus-circle"></i><span>保存</span></div>
	
	</div>
</template>
<script>
import appendAddress_controller from './appendAddress_controller';
export default appendAddress_controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
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

#appendAddress .mint-field .mint-cell-title {
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

#appendAddress .males {
	line-height: 50px;
	display: flex;
	align-items: center;
	border-top: 1px solid #d9d9d9;
	margin-left: 10px;
	padding-right: 10px;
	.address {
		display: inline-block;
		position: relative;
		width: 100%;
		float: right;
		box-sizing: border-box;
		padding-top: 0px
	}
}

.maleall span {
	font-size: 16px;
	vertical-align: middle;
	width: 105px;
	-webkit-box-flex: 0;
	-ms-flex: none;
	flex: none;
	line-height: 50px;
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