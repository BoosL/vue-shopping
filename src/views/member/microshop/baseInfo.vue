<style lang="scss" rel="stylesheet/scss" scoped>
#baseInfo {

	/*上传头像的样式*/
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #20a0ff;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}



	position:relative;
	width: 100%;
	height: 100%;
	.popupInput {
		height: 300px;
		background: #eeeeee;
		position: relative;
		text-align: left;
		p {
			padding: 15px;
			color: deepskyblue;
		}
		.inputBox {
			padding-left: 20px;
			padding-top: 20px;
			background: #fff;
			height: 200px;

			.avatar-uploader {
				position: relative;
				i {
					font-style: normal;
					position: absolute;
					top: 15px;
					color: blue;
					right: 15px;
				}
				div {
					width: 80px;
					height: 80px;
					background: rgb(241, 83, 83);
				}
				img {
					max-width: 200px;
				}
			}
		}


		span {
			display: inline-block;
			margin-right: 30px;
		}
		button {
			color: #fff;
			background: green;
			border-radius: 5px;
			width: 60px;
			border: none;
			outline: none;
			font-size: 12px;
			line-height: 24px;
			float: right;
			margin-top: 8px;
		}
	}


	.m_header {
		width: 100%;
		height: 45px;
		padding-right: 15px;
		box-sizing: border-box;
		background: #eee;
		line-height: 45px;
		font-size: 14px;
		text-align: center;
		span {
			display: inline-block;
			float: left;
			font-size: 28px;
		}
		i {
			font-size: 14px;
			float: right;
			font-style: normal;
		}
	}


	.nav {
		padding: 15px;
		li {
			width: 40%;
			display: inline-block;
			text-align: center;
			font-size: 14px;
			padding: 6px 0;
			line-height: 24px;
			background: #fff;
			color: #f15353;
		}
		li:first-child {
			border-radius: 6px 0 0 6px;
		}
		li:last-child {
			border-radius: 0 6px 6px 0;
		}
	}



	.info {

		li:after {
			content: "";
			display: block;
			clear: both;
		}
		li:first-child {
			border-bottom: 1px solid #ccc
		}
		li:nth-child(3) {
			border-bottom: 1px solid #ccc
		}
		li {
			padding: 6px 15px;
			font-size: 14px;
			text-align: left;
			background: #fff;
			line-height: 20px;
			.right {
				float: right;
				text-align: right;
				border: none !important;
				.img {
					width: 35px;
					height: 35px;
					border: none !important;
					img {
						width: 35px;
						height: 35px;
						vertical-align: middle;
						border: 0;
						margin-top: -3px;
					}
				}
			}
			input {
				width: 70%;
				border: none;
				outline: none;
				line-height: 20px;
				float: right;
				text-align: right;
				font-size: 14px;
				position: relative;
				top: -2px;
			}
			;
		}

		.tou {
			line-height: 36px;
			padding-bottom: 10px;
		}
		.tou2 {
			margin-bottom: 10px;
			i {
				float: right;
			}
		}
		.btn {
			margin: 60px auto;
			border-radius: 7px;
			width: 280px;
			padding: 10px;
			text-align: center;
			background: #f15353;

			font-size: 16px;

			color: #fff;
		}
	}



	.selectGoods {
		overflow: hidden;
		.selectedGood {
			li {
				float: left;
				width: 40px;
				margin: 10px;
				img {

					width: 40px;
				}
			}
		}
		.selectedGood:after {
			content: "";
			display: block;
			clear: both;
		}
		.content {
			font-size: 14px;
			background: #fff;
			text-align: center;
			img {
				width: 100%;
			}
		}
		p {
			padding: 0 15px
		}
		.add {
			width: 100%;

			background: #fff;

			box-sizing: border-box;
			padding: 20px;

			div {
				width: 70%;
				border: 1px solid gray;
				font-size: 20px;
				color: #b5b5b5;
				margin: 0 auto;
				border-radius: 10px;
				line-height: 40px;
				text-align: center;
				span {
					font-size: 28px;
				}
			}
		}
		.btn {
			margin: 120px auto 10px;
			border-radius: 7px;
			width: 80%;
			padding: 12px;
			text-align: center;
			background: #f15353;
			font-size: 20px;
			color: #fff;
		}

		p {
			margin-top: 15px;
			line-height: 20px;
			text-align: left;
			font-size: 12px;
			/*padding: 15px;*/
		}
	}
}

.active22 {
	color: #fff !important;
	background: #f15353 !important;
}
</style>





<template>
	<div id="baseInfo">
	
		<!-- 主内容区域 -->
		<div v-if="showBox=='main'">
	
			<c-title :hide="false" text=' 微店设置'></c-title>
			<div style="height:40px"></div>
	
			<ul class="nav">
				<li @click="changeActive(true)" :class="{active22:showInfo}">基本信息</li>
				<li @click="changeActive(false)" :class="{active22:!showInfo}">自选商品</li>
			</ul>
	
			<!-- 基本信息板块 -->
			<ul v-if="showInfo" class="info">
				<!--<li >微店名称	
					   				<input type="text" v-model="shopName" maxlength="20"/>
					   			
					   			</li>
					   			
					   			<li class="tou tou2"  @click="changeShowBox('微店头像')" >微店头像
					   				<div class="right">
					   					<el-upload
										  class="avatar-uploader"
										  action="http://localhost:8081/addons/yun_shop/api.php?i=2&type=1&route=plugin.micro.frontend.controllers.MicroShop.set-shop.upload"
										  :show-file-list="false"
										  :on-success="handleAvatarSuccess"
										  :before-upload="beforeAvatarUpload">
									      
					   					<div class="img" v-if="imageUrl1"><img  :src="imageUrl1" alt="" /></div>
					   					<div class="img" v-if="!imageUrl1"><img  src="../../../../static/app/images/photo-mr.jpg" alt="" /> </div>
					   				
								    	</el-upload>
					   				</div>
					   			</li>
					   			
					   			<li class="tou">店主头像
					   				<div class="right">
					   					<div class="img" v-if="imageUrl2"><img  :src="imageUrl2" alt="" /></div>
					   					<div class="img" v-if="!imageUrl2"><img  src="../../../../static/app/images/photo-mr.jpg" alt="" /> </div>
					   				</div>
					   			</li>
					   			<li >店主昵称
					   				<div class="right">
					   					{{username}}
					   				</div>
					   			</li>-->
				<li class=" tou2" @click="manageShop()">商品管理
					<i class="iconfont icon-right"></i>
				</li>
				<li class=" tou2" @click="changeShowBox('店招背景')">店招背景
					<i class="iconfont icon-right"></i>
				</li>
	
				<li>个性签名
					<input type="text" v-model="shopModle.signature" maxlength="120" />
				</li>
	
				<li class="btn" @click="changeActive(false,1)">
					确 定
				</li>
			</ul>
	
			<!-- 自选商品板块 -->
			<div v-else class="selectGoods">
				<div class="content">
					<img :src="bannerImg" alt="" />
				</div>
				<router-link :to="fun.getUrl('micro_shop_add_category')">
					<div class="add">
						<div>
							<span>+</span>&nbsp;&nbsp;选择 商品
						</div>
					</div>
	
				</router-link>
	
				<p>店主可以通过选择商品就可以生成微店，将微店分享给好友，好友通过自己的微店链接进入购买商品就可以获得分红啦~
					<br />快去选择您的微店商品吧！</p>
	
			</div>
		</div>
	
		<div class="popupInput" v-else-if="showBox=='upLoadBox'">
			<div class="m_header">
				<span class="iconfont icon-left" @click="closePopInput()"></span>
				修改{{changeType}}
				<button @click="closePopInput">保存</button>
			</div>
			<div class="inputBox">
				<el-upload class="avatar-uploader" :action="action" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<i>更换背景</i>
					<img v-if="bgImg" :src="bgImg" class="avatar">
					<div v-else></div>
				</el-upload>
	
				<br />
				<br />
	
			</div>
			<p>请上传不大于2M的jpeg或者png格式的图片。</p>
		</div>
	
	</div>
</template>


<script>
import baseInfo_controller from './baseInfo_controller';
export default baseInfo_controller;
</script>




























<!--<style  lang="scss" rel="stylesheet/scss" scoped>
	
</style>

<template>
   
</template>

<script>
    
</script>
-->
