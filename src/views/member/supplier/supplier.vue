<template>
	<div id="income">
		<div class="supplier">
			<div class="banner">
				<img src="../../../assets/images/myextension.png">
			</div>

			<div class="main" v-if="supplier_status==1 && !isDiyForm">
				<!--申请   -->
				<div class="welcome">
					<div class="text">
						<p>请填写申请信息</p>
					</div>
					<div class="info">
						<input type="text" placeholder="设置账号" class="inp" v-model="applyModel.username">
						<input type="password" placeholder="设置密码" class="inp" v-model="applyModel.password">
						<input type="text" placeholder="请填写真实姓名" class="inp" v-model="applyModel.realname">
						<input type="number" placeholder="请填写手机号码" class="inp" v-model="applyModel.mobile">
						<input type="text" placeholder="请填写产品类型" class="inp" v-model="applyModel.product">

						<el-input type="textarea" :rows="2" placeholder="备注" v-model="applyModel.remark">
						</el-input>

						<input type="submit" value="申请" class="btn" @click="setApplyData">
					</div>
				</div>

				<!--文字说明；后台设置-->
				<div class="vip_main" v-if="!(supplier_info==null||supplier_info==''||supplier_info==undefined)">
					<div class="title">供应商说明</div>
					<div class="vip">
						<div class="text">
							<div class="t1">{{supplier_info}}</div>
							<!--<div class="t2">拥有专属推广二维码，用于推广客户；</div>-->
						</div>
					</div>

				</div>
			</div>

	<div class="main" v-if="supplier_status==2 && isDiyForm">
		<yd-cell-group>
			<yd-cell-item class="introTitle">
				<span slot="left"> 请填写申请信息</span>
			</yd-cell-item>
		</yd-cell-group>

    	<!--<div class="add-preview" v-show="isPreview" @click="closePreview">
		<img :src="previewImg">
		</div>-->
		<!--<yd-button @click.native="saveImage()" size="large">上传</yd-button>-->
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

			<div class="image-list" v-if="item.type == 'diyimage'">
				<div class="list-default-img">
					<span>{{item.data.tp_name}}：</span>
					<input type="file" accept="image/jpeg,image/jpg,image/png" capture="camera" @change="onFileChange($event, item)">
				</div>

        	<ul class="list-ul">
					<li class="list-li" v-for="(iu, index) in item.imgUrls"  style="overflow: hidden;position: relative">
						<a class="list-link">
							<img :src="iu">
						</a>
						<div class="delimg" @click="delImage(item.imgUrls, index)" size="large">删除</div>
					</li>
				</ul>
			</div>

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

			<template v-if="item.type == 'diyusername'">
				<yd-cell-group>
					<yd-cell-item>
						<span slot="left">{{item.data.tp_name}}：</span>
					<yd-input v-if="item.data.tp_must == 1" slot="right" required v-model="item.value" v-bind:placeholder="item.data.placeholder"></yd-input>
						<yd-input v-if="item.data.tp_must == 0" slot="right" v-model="item.value" v-bind:placeholder="item.data.placeholder"></yd-input>
					</yd-cell-item>
				</yd-cell-group>
			</template>
			<template v-if="item.type == 'diypassword'">
				<yd-cell-group>
					<yd-cell-item>
						<span slot="left">{{item.data.tp_name}}：</span>
						<yd-input v-if="item.data.tp_must == 1" slot="right" required v-model="item.value" v-bind:placeholder="item.data.placeholder" type="password"></yd-input>
						<yd-input v-if="item.data.tp_must == 0" slot="right" v-model="item.value" v-bind:placeholder="item.data.placeholder" type="password"></yd-input>
					</yd-cell-item>
				</yd-cell-group>
			</template>
		</template>
		<template>
			<yd-button-group>
				<yd-button size="large" @click.native="submit" type="primary">提交申请</yd-button>
			</yd-button-group>
		</template>
	</div>
	<mt-datetime-picker ref="picker" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="setDate" v-model="pickerValue">
	</mt-datetime-picker>

	<yd-cityselect v-model="showCity" :callback="setCity" :items="district"></yd-cityselect>

			<!--申请后展示-->
			<div class="success" v-if="supplier_status==0">
				<div class="ico"><i class="fa fa-check"></i></div>
				<div class="text">您的申请已经提交，请等待审核！</div>
				<a @click="goHome()">
					<div class="sub">去商城逛逛</div>
				</a>
			</div>

			<!--审核通过后展示，文字后台设置 -->
			<div class="success" v-if="supplier_status==-1">
				<div class="ico"><i class="fa fa-check"></i></div>
				<div class="text">您已通过审核</div>
				<a @click="goHome()">
					<div class="sub">去商城逛逛</div>
				</a>
			</div>
		</div>

	</div>
</template>
<script>
import supplier_controller from "./supplier_controller";
export default supplier_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.el-input__icon.el-icon-caret-top {
  color: #b8b8b8;
}

.el-input__inner {
  border: 1px solid #b8b8b8;
  font-size: 12px;
}

.el-select {
  display: block;
  margin-bottom: 8px;
  width: 100%;
  height: 2rem;
  border-radius: 5px;
  box-sizing: border-box;
  outline: none;
}

.delimg {
  position: absolute;
  top: 0px;
  right: 0px;
  height: 20px;
  width: 30px;
  color: #fff;
  background-color: red;
}

#income {
  h3 {
    background: #f5f5f5;
    margin: 0;
    padding: 0 10px;
    text-align: left;
    font-weight: normal;
    font-size: 0.8rem;
    height: 2rem;
    box-sizing: border-box;
    line-height: 2rem;
    span {
      color: #999;
    }
  }
}

a {
  text-decoration: none;
  color: #222;
}

input {
  border-width: 0;
 position:absolute;
 right:0px;
}
.list-ul img{
  width:80%;
  height:80%;
}
.list-ul{
  display: flex;
  flex-direction: column;
}
.image-list{
  width:100%;
  height:100%;
  background-color: #fff;
  padding:12px 0;
  margin-top:-10px;
  }
.list-default-img {
  height: 50px;
  text-align: left;
  padding-left: 12px;
}

.supplier .banner img {
  width: 100%;
}

.supplier .main {
  position: relative;
  top: -4px;
}

.welcome {
  padding: 10px;
  background: #ffffff;
  .text {
    p {
      font-size: 0.8rem;
      color: #666;
      line-height: 1.2rem;
      margin-top: 0;
      span {
        color: #f55955;
      }
    }
  }
  .info {
    margin-top: 10px;
    input {
      position: relative; 
      display: block;
      margin-bottom: 8px;
      width: 100%;
      height: 2rem;
      border-radius: 5px;
      padding: 0 5px;
      box-sizing: border-box;
      outline: none;
    }

    .inp {
      border: 1px solid #b8b8b8;
    }
    .inp:focus {
      border-color: #f55955;
      box-sizing: border-box;
    }
    span {
      color: #f55955;
    }
    .btn {
      background: #f55955;
      color: #ffffff;
      margin-bottom: 8px;
      width: 100%;
      height: 2rem;
      border-radius: 5px;
      padding: 0 5px;
      box-sizing: border-box;
      text-align: center;
      font-size: 0.8rem;
      line-height: 2rem;
      i {
        display: inline-block;
      }
    }
    .btn:focus {
      background: #d8403c;
    }
  }
}

.supplier .main .vip_main {
  background: #ffffff;
  margin: 15px 0;
  .title {
    padding: 10px;
    font-size: 0.8rem;
    border-bottom: 1px solid #eeeeee;
    text-align: center;
  }
  .vip {
    padding: 15px 10px;
    overflow: hidden;
    font-size: 0.8rem;
    color: #999;
    .ico1,
    .ico2 {
      width: 15%;
      float: left;
    }
    .ico1 {
      i {
        background: #32cd32;
      }
    }
    .ico2 {
      i {
        background: #fece00;
      }
    }
    .text {
      float: left;
      width: 85%;
      .t1 {
        font-size: 0.95rem;
        color: #333;
        margin-bottom: 5px;
        text-align: left;
      }
      .t2 {
        text-align: justify;
      }
    }
    i {
      background: #32cd32;
      height: 36px;
      width: 36px;
      border-radius: 18px;
      color: #fff;
      text-align: center;
      line-height: 38px;
      font-size: 1.2rem;
    }
  }
  .vip1 {
    border-bottom: 1px solid #eeeeee;
  }
}

.supplier .success {
  height: 200px;
  padding-top: 65px;
  background: #ffffff;
  .ico {
    height: 65px;
    width: 65px;
    margin: auto;
    border: 3px solid #32cd32;
    border-radius: 4rem;
    color: #32cd32;
    font-size: 2.3rem;
    text-align: center;
    line-height: 4rem;
  }
  .text {
    height: 2rem;
    margin-top: 30px;
    color: #666;
    line-height: 1.6rem;
    text-align: center;
  }
  a .sub {
    height: 2rem;
    width: 80%;
    background: #f55955;
    margin: 20px auto;
    border-radius: 2rem;
    color: #fff;
    line-height: 2rem;
    text-align: center;
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
  a .sub:focus {
    background: #d8403c;
  }
}
</style>
