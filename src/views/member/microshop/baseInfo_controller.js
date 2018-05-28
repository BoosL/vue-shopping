import cTitle from 'components/title';
import { Indicator, Toast } from 'mint-ui';
export default {
	data() {
		return {
			showInfo: true,//控制左右的切换
			shopName: "",
			userName: "",
			signName: "",
			showBox: "main",//控制主页，和不同弹出框的隐现
			changeType: "",//用来标示修改的是哪个属性
			changeVal: "",//用来存储用户输入的值
			imageUrl: "",
			imageUrl1: '',//用来存储微店头像
			imageUrl2: '',//用来存储用户头像
			bgImg: '',
			temp: false,
			bannerImg: '',
			postUrl: '',
			shopModle: {
				//shop_name: "",
				//shop_avatar: "",
				shop_background: "",
				signature: "",
			},
		}
	},
	activated() {
		this.temp = this.$route.params.showSelectGood;
		this.showInfo = true;
		this.init();
	},
	methods: {

		init() {
			let that = this;
			$http.get("plugin.micro.frontend.controllers.MicroShop.set-shop").then(function (response) {
				console.log("+++++++++++个人信息++++++++++++++");
				console.log(response);
				let temp = response.data.micro_shop;
				if (response.result == 1) {
					that.shopName = temp.shop_name;
					that.username = temp.has_one_member.nickname;
					that.signName = temp.signature;
					that.imageUrl1 = temp.shop_avatar;
					that.imageUrl2 = temp.has_one_member.avatar;
					that.postUrl = temp.api;
					that.bannerImg = response.data.select_goods_thumb;
					that.bgImg = temp.shop_background;
					//that.action = "http://localhost:8081" + response.data.api + "&type=" + that.fun.getTyep();
					that.action = response.data.api + "&type=" + that.fun.getTyep();
					that.shopModle.shop_background = response.data.micro_shop.shop_background;
					that.shopModle.signature = response.data.micro_shop.signature;
				} else {
					console.log(response);
				}
			}, function (response) {
				console.log(response);
			});
		},



		//修改信息时候 用变量来标示修改的是哪个属性
		changeShowBox(val) {
			this.changeType = val;
			if (val == "店招背景") {
				this.showBox = 'upLoadBox';
			} else if (val == "个性签名" || val == "微店名称" || val == "店主昵称") {
				this.showBox = 'inputBox';
			} else {
				this.showBox = "main";
			}
		},

		//控制基本信息和自选商品的切换
		changeActive(val, type) {

			//		  		

			if (type == 1) {//提交数据
				let that = this;

				if (this.fun.isTextEmpty(this.shopModle.shop_background)) {
					Toast("微店背景不能为空");
					return;
				}

				if (this.fun.isTextEmpty(this.shopModle.signature)) {
					Toast("微店个性签名不能为空");
					return;
				}

				let json = { shop_set: JSON.stringify(this.shopModle) };
				$http.get("plugin.micro.frontend.controllers.MicroShop.set-shop.edit", json, "设置中").then(function (response) {

					if (response.result == 1) {
						that.$router.go(-1);
					} else {
						console.log(response);
					}
				}, function (response) {
					console.log(response);
				});
			} else {
				this.showInfo = val;
			}


		},

		//点击输入信息关闭的时候 把输入框输入的值按照修改的类型赋值给指定的属性即可完成修改
		closePopInput() {

			//隐藏输入弹框
			this.showBox = 'main';

			//清空输入框内容
			this.changeVal = "";
		},

		// 输入和选择头像弹窗回退按钮
		goBack() {
			this.showBox = 'main';
		},

		//页面回退按钮
		goBack1() {
			this.$router.push(this.fun.getUrl('microShop_ShopKeeperCenter'));
		},

		//处理头像上传
		handleAvatarSuccess(res, file) {
			console.log("jfc", res);
			this.imageUrl = URL.createObjectURL(file.raw);
			if (this.changeType == '微店头像') {
				this.imageUrl1 = res.data.img;
			} else if (this.changeType == '店招背景') {
				this.bgImg = res.data.img;
				this.shopModle.shop_background = this.bgImg;
			}

		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error('上传图片只能是 JPG 或PNG格式!');
			}
			if (!isLt2M) {
				this.$message.error('上传图片大小不能超过 2MB!');
			}
			return isJPG && isLt2M;
		},


		//管理微店
		manageShop()
		{
			 this.$router.push(this.fun.getUrl('manage_shop', { }));
		}
	},
	components: { cTitle }


}