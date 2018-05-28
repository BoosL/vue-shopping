<template>
	<div id="register">
		<c-title :hide="false" text='银行卡信息'></c-title>

		 <div style="height: 40px;"></div>
			<yd-cell-group>
				
				<yd-cell-item>
					<span slot="left">开户行：</span>
					<input slot="right" type="text" placeholder="请输入开户行" v-model.trim="bank_name">
				</yd-cell-item>
				<yd-cell-item>
					<span slot="left">开户行省份：</span>
					<input slot="right" type="text" placeholder="请输入开户行省份" v-model.trim="bank_province">
				</yd-cell-item>

				<yd-cell-item>
					<span slot="left">开户行城市：</span>
					<input slot="right" type="text" placeholder="请输入开户行城市" v-model.trim="bank_city">
				</yd-cell-item>

				<yd-cell-item>
					<span slot="left">开户行支行：</span>
					<input slot="right" type="text" placeholder="请输入开户行支行" v-model.trim="bank_branch">
				</yd-cell-item>

				<yd-cell-item>
					<span slot="left">账号：</span>
					<input slot="right" type="number" placeholder="请输入账号" v-model.trim="bank_id">
				</yd-cell-item>

				<yd-cell-item>
					<span slot="left">姓名：</span>
					<input slot="right" type="text" placeholder="请输入姓名" v-model.trim="bank_user">
				</yd-cell-item>

			</yd-cell-group>

	
			<yd-button-group>
				<yd-button size="large" type="primary" @click.native="bind">提交</yd-button>
			</yd-button-group>

		

		

		

	</div>
</template>

<script>
import bank_info_controller from "./bank_info_controller";
export default bank_info_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#register {
 
}
</style>