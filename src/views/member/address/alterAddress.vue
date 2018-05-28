<template>

	<div id="alterAddress">
		<c-title :hide="false" text='修改收货地址'></c-title>
		<div style="height: 50px;"></div>
		<mt-field label="收件人" placeholder="请输入收件人" v-model='form.username'></mt-field>
		<mt-field label="联系电话" placeholder="请输入联系电话" v-model='form.mobile'></mt-field>
		<div class="maleall"><label class="mydefault"><span>设置默认地址 </span>
         <div class="address" style="margin-left:40%;">
           <mt-switch v-model="form.isdefault" ></mt-switch>
           </div>
        </label>
		</div>
		<div class="maleall"><label for="male" class="males"><span>所在省份 </span>
            <div class="address">

                <el-select v-model="provicevalue" placeholder="请选择省份" @change="selectProviceHandle">
                    <el-option
                            v-for="item in provinceoptions"
                            :label="item.areaname"
                            :value="item">
                    </el-option>
                </el-select>
            </div>
        </label>
		</div>
		<div class="maleall"><label for="male" class="males"><span>所在城市 </span>
            <div class="address">

                <el-select v-model="cityvalue" placeholder="请选择城市" @change="selectCityHandle">
                    <el-option
                            v-for="item in cityoptions"
                            :label="item.areaname"
                            :value="item">
                    </el-option>
                </el-select>
            </div>
        </label>
		</div>
		<div class="maleall"><label for="male" class="males"><span>所在区县 </span>
            <div class="address">

                <el-select v-model="regionvalue" placeholder="请选择区县" @change="selectRegionHandle">
                    <el-option
                            v-for="item in regionoptions"
                            :label="item.areaname"
                            :value="item">
                    </el-option>
                </el-select>
            </div>
        </label>

		</div>

		<mt-field label="" placeholder="请输入详细地址" v-model='form.address'>{{detailAddress}}</mt-field>
		<div style="height: 80px;"></div>
		<div class="address_addnav" @click="alterAddresshandle"><i class="fa fa-plus-circle"></i><span>保存</span></div>

	</div>

</template>
<script>
	import alterAddress_controller from './alterAddress_controller';
	export default alterAddress_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.address_addnav {
		width: 100%;
		padding: 0 3% 0 6% !important;
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
	
	.mydefault {
		line-height: 50px;
		display: flex;
		border-top: 1px solid #d9d9d9;
		margin-left: 10px;
		align-items: center;
	}
	
	.maleall span {
		font-size: 16px;
		vertical-align: middle;
		width: 105px;
		-webkit-box-flex: 0;
		-ms-flex: none;
		flex: none;
	}
	
	.address {
		flex: 1;
		line-height: 50px;
		.mint-button--default {
			line-height: 50px;
			text-align: left;
			font-size: 16px;
		}
	}
</style>