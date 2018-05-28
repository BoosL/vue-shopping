<template >
	<div id="info">
		<c-title :hide="false" text='修改支付密码'></c-title>
		<div style="height: 40px;"></div>
		<yd-cell-group>
			<yd-cell-item>
                <span slot="left">验证码发送到:{{mobile|mobile_dispose}}</span>
            </yd-cell-item>
        	<yd-cell-item>
            <input type="text" slot="right" placeholder="请输入验证码" v-model="code">

            <!-- ↓↓关键代码是这里↓↓ -->
            <yd-sendcode slot="right" 
                         v-model="startCode" 
                         @click.native="verificationCode" 
                         type="warning"
            ></yd-sendcode>
            <!-- ↑↑关键代码是这里↑↑ -->

        </yd-cell-item>
    </yd-cell-group>

	<yd-cell-group>
		<yd-cell-item @click.native="showOldKeyboard" >
            <span slot="left">旧密码：</span>
            <yd-input slot="right" type="password" v-model="oldPwd" disabled readonly max="6" :show-success-icon="false" :show-error-icon="false" placeholder="请输入旧密码"></yd-input>
        </yd-cell-item>
		<yd-cell-item @click.native="showNewKeyboard" >
            <span slot="left">新密码：</span>
            <yd-input slot="right" type="password" v-model="newPwd" disabled readonly max="6" :show-success-icon="false" :show-error-icon="false" placeholder="请输入新密码"></yd-input>
        </yd-cell-item>
		
	</yd-cell-group>

	<yd-button-group>
        <yd-button size="large" @click.native="submitInfo" type="danger">确认修改</yd-button>
    </yd-button-group>

		<div style="height: 10px;"></div>
		<yd-keyboard v-model="isOldShowKeyboard" title="安全键盘" input-text="请输入旧密码" :callback="oldKeyboardDone" ref="keyboardDemo1"></yd-keyboard>
		<yd-keyboard v-model="isNewShowKeyboard" title="安全键盘" input-text="请输入新密码" :callback="newKeyboardDone" ref="keyboardDemo1"></yd-keyboard>
	</div>
</template>
<script>
import balance_password_v2_controller from "./balance_password_v2_controller";
export default balance_password_v2_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#info span {
  font-size: 0.9rem !important;
}

.tips {
  height: 40px;
  background: #fff;
  padding-right: 10px;
  padding-left: 10px;
  line-height: 40px;
  text-align: left;
}

.tips1 {
  height: 30px;
  padding-right: 10px;
  padding-left: 10px;
  line-height: 30px;
  text-align: right;
}

.code {
  height: 30px;
  margin-top: 10px;
  margin-right: 10px;
  background: #ccc;
  padding: 3px 5px;
  border-radius: 5px;
}

.list1 {
  margin-top: 10px;
  height: 44px;
  width: 97%;
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