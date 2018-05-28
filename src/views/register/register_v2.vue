<template>
	<div id="register">
		<c-title :hide="false" text='用户注册'></c-title>

		<div class="lin">
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

			<div class="diyform">
				<template v-for="item in diydata">
					<template v-if="item.type == 'diyinput'">
						<yd-cell-group>
							<yd-cell-item>
								<span slot="left">{{item.data.tp_name}}：</span>
								<yd-input v-if="item.data.tp_must == 1" slot="right" required v-model="item.value" v-bind:placeholder="item.data.placeholder"></yd-input>
								<yd-input v-if="item.data.tp_must == 0" slot="right" v-model="item.value" v-bind:placeholder="item.data.placeholder"></yd-input>
							</yd-cell-item>
						</yd-cell-group>
					</template>

					<template v-if="item.type == 'diytextarea'">
						<yd-cell-group :title="item.data.tp_name">
							<yd-cell-item>
								<yd-textarea slot="right" v-model="item.value" :placeholder="item.data.placeholder" maxlength="100"></yd-textarea>
							</yd-cell-item>
						</yd-cell-group>
					</template>

					<template v-if="item.type == 'diycheckbox'">
						<yd-cell-group :title="item.data.tp_name">
							<yd-cell-item type="checkbox" v-for="ck in item.data.tp_text">
								<span slot="left">{{ck}}</span>
								<input slot="right" type="checkbox" :value="ck" v-model="item.value" />
							</yd-cell-item>
						</yd-cell-group>
					</template>

					<template v-if="item.type == 'diyselect'">
						<yd-cell-group>
							<yd-cell-item arrow type="label">
								<span slot="left">{{item.data.tp_name}}：</span>
								<select slot="right" v-model="item.value">
									<option value="">请选择{{item.data.tp_name}}</option>
									<option :value="sitem" v-for="sitem in item.data.tp_text">{{sitem}}</option>
								</select>
							</yd-cell-item>

						</yd-cell-group>
					</template>

					<template v-if="item.type == 'diyradio'">
						<yd-cell-group :title="item.data.tp_name">
							<yd-cell-item type="radio" v-for="ritem in item.data.tp_text">
								<span slot="left">{{ritem}}</span>
								<input slot="right" type="radio" :value="ritem" v-model="item.value" />
							</yd-cell-item>
						</yd-cell-group>
					</template>

					<template v-if="item.type == 'diycity'">
						<div>
							<yd-cell-group>
								<yd-cell-item arrow>
									<span slot="left">{{item.data.tp_name}}：</span>
									<input slot="right" type="text" @click.stop="showCity = true" @click="openCity(item.name)" v-model="item.value" readonly :placeholder="item.data.tp_name">
								</yd-cell-item>
							</yd-cell-group>

						</div>
					</template>

					<template v-if="item.type == 'diydate'">
						<yd-cell-group>
							<yd-cell-item @click.native="openPicker(item.name)">
								<span slot="left">{{item.data.tp_name}}</span>
								<span slot="right">{{item.value}}</span>
							</yd-cell-item>
						</yd-cell-group>
					</template>

				</template>
			</div>

			<template v-if="agreementStatus">
				<div class="agreement">
					<el-checkbox v-model="agreementCB">&nbsp</el-checkbox>
					<span slot="right" style="font-size: 16px; text-decoration:underline;margin-left: -8px;" @click="goAgreement">注册协议</span>
				</div>

			</template>

			<yd-button-group>
				<yd-button size="large" type="primary" @click.native="register">注册</yd-button>

				<yd-button size="large" type="danger" @click.native="login">登录</yd-button>
			</yd-button-group>

		</div>

		<mt-datetime-picker ref="picker" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="setDate" v-model="pickerValue">
		</mt-datetime-picker>

		<yd-cityselect v-model="showCity" :callback="setCity" :items="district"></yd-cityselect>

		<mt-popup v-model="show2" class="mint-popup-3" position="right" closeOnClickModal='true' modal='false' style="z-index:2004;">

			<div class="city-info">
				<mt-header fixed title="协议">
					<mt-button icon="back" @click="popClose" slot="left"></mt-button>
				</mt-header>
				<div>
				
					<div style="height: 40px;clear: both;"></div>

					<div id="a_content" v-html='protocol_content'></div>

				</div>
			</div>

		</mt-popup>

		<div style="height: 40px;clear: both;"></div>

	</div>
</template>

<script>
import register_v2_controller from './register_v2_controller';
export default register_v2_controller;
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
	.city-info {
		overflow-y: scroll;
		width: 100vw;
		height: 100vh;
		background: #FFF;
	}
	.mint-header {
		background: none;
		color: #666;
	}

	.is-fixed .mint-header-title {
		font-weight: bold;
	}

	.mint-header.is-fixed {
		border-bottom: 1px solid #e8e8e8;
		background: #FFF;
		z-index: 99;
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