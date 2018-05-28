<template>
	<div id="findpwd">
		<c-title :hide="false" text='忘记密码'></c-title>

			<yd-cell-group>

				<yd-cell-item>
					<span slot="left">国际区号：</span>
					<input slot="right" type="number" placeholder="请输入国际区号" v-model.trim="form.country">
				</yd-cell-item>

				<yd-cell-item>
					<span slot="left">手机号：</span>

					<input type="tel" slot="right" placeholder="请输入手机号码" v-model.trim="form.mobile">

					<!-- ↓↓关键代码是这里↓↓ -->
					<yd-sendcode slot="right" v-model="start1" @click.native="verificationCode" type="warning"></yd-sendcode>
					<!-- ↑↑关键代码是这里↑↑ -->

				</yd-cell-item>
				<yd-cell-item>
					<span slot="left">验证码：</span>
					<input slot="right" type="text" placeholder="请输入验证码" v-model.trim="form.code">
				</yd-cell-item>

				<yd-cell-item>
					<span slot="left">设置密码：</span>
					<input slot="right" type="password" placeholder="请输入密码" v-model.trim="form.password">
				</yd-cell-item>

				<yd-cell-item>
					<span slot="left">确认密码：</span>
					<input slot="right" type="password" placeholder="请输入密码" v-model.trim="form.confirm_password">
				</yd-cell-item>

			</yd-cell-group>

			<yd-button-group>
				<yd-button size="large" type="primary" @click.native="findpwd">提交修改</yd-button>
			</yd-button-group>

		<!-- <div class="page">
			<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model.trim="form.mobile" :attr="{ maxlength: 11 }" :state='form.mobileErr'></mt-field>
			<mt-field label="验证码" placeholder="请输入验证码" v-model.trim="form.code">
				<button @click="VerificationCode" id="code">{{CodeStr}}</button>
			</mt-field>
			<mt-field label="设置新密码" placeholder="请输入密码" type="password" v-model.trim="form.password" :state='form.passwordErr'></mt-field>
			<mt-field label="确认新密码" placeholder="请输入密码" type="password" v-model.trim="form.confirm_password" :state='form.confirm_passwordErr'></mt-field>
		</div>
		<div id="bts">
			<mt-button type="default" @click="findpwd" size="large">提交修改</mt-button>
		</div> -->
	</div>
</template>

<script>
import findpwd_controller from "./findpwd_controller";
export default findpwd_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#findpwd {
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
      color: #fff;
    }
  }
  .forget {
    color: #999;
    float: right;
  }
}
</style>