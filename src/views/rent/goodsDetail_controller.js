import { Loadmore } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Swipe, SwipeItem } from 'components/meswipe';
import cMyswipe from 'components/myswipe';

var goods_id = "";
var specsManage = [];//选择池 用于排序
var optionsId = "";//选择后的 规格ID
var optionsMaxCount = 1;

var submitActionTag = "rent";



//商品详情
var currentTabIndex = "0";
//标记 防止重复加载
var is_first_content = false;
var is_second_content = false;
var is_third_content = false;
//商品详情

export default {
	data() {
		return {
			//弹窗
			transfer: false,
			title: '商品详情',
			hoet: false,
			goodTop: false,
			popupSpecs: false,
			radio: '',
			popThumb: "",
			popStock: 0,
			popPrice: 0,
			goodsDescription: "",
			goodsCount: 1,
			isGoods: false,
			cservice: '',
			//商品详情
			first_content: "",
			second_content: "",
			third_content: [],
			activeName: 'first',
			show: true,
			//租赁天数
			rentDay: 1,
			rentDayType: "",
			goodsInfo: {
				lease_goods: {},
			},
			has_option: 0,//默认没有规格

			shopdatas: [
			],

			shopdatasItem: "",

			isCanPresended: false,//支持转赠
			isLeaseGoods: false,//押金
			cash: "0.00",//押金数

			rentDate: "",//起始日期


			pickerOptions0: {
				disabledDate(time) {
					return time.getTime() < Date.now() - 8.64e7;
				}
			},
		};
	},

	activated() {
		//初始化一下参数
		this.goodsInfo = {};
		this.goodsInfo.lease_goods = {};
		this.goodsCount = 1;
		this.popupSpecs = false;


		optionsId = "";
		specsManage = [];
		optionsMaxCount = 1;

		this.rentDay = 1;

		this.isCanPresended = false;//支持转赠
		this.isLeaseGoods = false;//押金
		this.cash = "0.00";//押金数

		this.rentDate = "";

		goods_id = this.$route.params.id;




		this.initData();//初始化商品详情参数
		this.getData();//获取数据

	},
	methods:
	{

		//初始化商品详情参数
		initData() {
			currentTabIndex = "0";
			is_first_content = false;
			is_second_content = false;
			is_third_content = false;

			this.first_content = "";
			this.second_content = "";
			this.third_content = [];
			this.activeName = 'first';
			this.show = true;

			this.has_option = 0;//默认没有规格
			this.shopdatas = [];
			this.shopdatasItem = "";
		},
		//获取数据
		getData() {
			let that = this;
			let json = { id: goods_id };
			$http.get('plugin.lease.frontend.modules.goods.controllers.goods.get-goods', json, "加载中...").then(function (response) {
				console.log(response)
				if (response.result == 1) {
					that.goodsInfo = response.data;
					that.has_option = response.data.has_option;//设置商品规格
					that.initRentInfo(response.data);//处理押金 转赠信息
					that.initPopView();//初始化弹窗view
					that.initShare();//初始化分享设置
					that.setDataByTabIndex();//设置商品详情
					that.setRentPrice();//设置商品租赁
					that.isGoods = true;
				} else {
					console.log(response.msg);
					that.isGoods = false;
					Toast(response.msg);
				}

			}, function (response) {
				console.log(response);
				that.isGoods = false;
			});
		},

		//处理押金 转赠信息
		initRentInfo(data) {
			if (this.fun.isTextEmpty(data.lease_goods)) {
				this.isCanPresended = false;
				this.isLeaseGoods = false;
			} else {
				this.isCanPresended = true;
				this.isLeaseGoods = true;

				this.cash = data.lease_goods.cash;
			}

		},

		//初始化弹窗view
		initPopView() {
			this.popThumb = this.goodsInfo.thumb;//设置默认图片
			this.popStock = this.goodsInfo.stock;//设置默认库存
			if (this.goodsInfo.has_option == 1) {
				this.popPrice = this.goodsInfo.min_price + "-" + this.goodsInfo.max_price;//设置默认价格
			} else {
				this.popPrice = this.goodsInfo.price;//设置默认价格
			}

			this.goodsDescription = "选择";
			for (let i = 0; i < this.goodsInfo.has_many_specs.length; i++) {
				this.goodsDescription += " " + this.goodsInfo.has_many_specs[i].title;
			}
		},



		//界面选择规格触发事件
		selectSpecs(data) {
			console.log("selectSpecs");
			var specid = data.specid;//对其他数据筛选 不筛选同级
			//console.log(specid);
			//处理选择池
			this.manageSpecs(data);

			//处理规格组合选择状态
			this.setGoodsSpecs(data);

			//设置选择规格后的 价格、照片、库存
			this.setGoodsSpecsChangeInfo();

			//判断当前购买总量与库存的关系
			this.getMaxCount();

		},

		//处理选择池
		manageSpecs(data) {
			var specsObject = new Object();
			specsObject.id = data.id;
			specsObject.specid = data.specid;
			specsObject.title = data.title;

			if (specsManage.length > 0) {
				for (let i = 0; i < specsManage.length; i++) {
					if (specsManage[i].specid == specsObject.specid) {
						specsManage.splice(i, 1);
					}
				}
				specsManage.push(specsObject);
			} else {
				specsManage.push(specsObject);
			}

			//排序
			if (specsManage.length == this.goodsInfo.has_many_specs.length) {
				var newSpecsManage = [];
				for (let i = 0; i < this.goodsInfo.has_many_specs.length; i++) {
					for (let j = 0; j < specsManage.length; j++) {
						if (this.goodsInfo.has_many_specs[i].id == specsManage[j].specid) {
							newSpecsManage.push(specsManage[j]);
							break;
						}
					}
				}
				specsManage = newSpecsManage;
			}
			this.setGoodsDescription();
		},

		//处理goodsDescription 数据
		setGoodsDescription() {
			var description = "";
			//相等代表全选了 体现语句
			if (specsManage.length == this.goodsInfo.has_many_specs.length) {
				description = "已选择 ";
				for (let i = 0; i < specsManage.length; i++) {
					description += specsManage[i].title + " ";
				}
				this.goodsDescription = description;
			} else {
				description = "请选择 ";

				for (let i = 0; i < this.goodsInfo.has_many_specs.length; i++) {
					for (let j = 0; j < specsManage.length; j++) {
						if (this.goodsInfo.has_many_specs[i].id != specsManage[j].specid) {
							description += this.goodsInfo.has_many_specs[i].title + " ";
							break;
						}
					}
				}
				this.goodsDescription = description;
			}
		},

		//处理规格组合选择状态 过滤数据
		setGoodsSpecs(specs) {
			for (let i = 0; i < this.goodsInfo.has_many_specs.length; i++) {
				if (specs.specid != this.goodsInfo.has_many_specs[i].id) {
					this.setGoodsSpecsStatus(this.goodsInfo.has_many_specs[i].specitem, specs.id);
				}
			}
		},


		//处理规格组合选择状态 处理状态 specitem 组合数组(未选中的) id当前选中的ID 根据ID 组合算是否有当前组合
		setGoodsSpecsStatus(specitem, id) {
			console.log("specitem=", specitem);
			console.log(id);
			let options = [];//数据池


			for (let i = 0; i < this.goodsInfo.has_many_options.length; i++) {
				//console.log(this.goodsInfo.has_many_options[i].specs);
				let _specs = this.goodsInfo.has_many_options[i].specs.split("_");
				//console.log(_specs);
				//判断是否包含
				for (let j = 0; j < _specs.length; j++) {
					if (_specs[j] == id) {
						options.push(this.goodsInfo.has_many_options[i]);
					}
				}
			}


			console.log("options.length=", options.length);
			console.log("options=", options);
			//关键处理方式 后期要优化 效率低
			for (let m = 0; m < options.length; m++) {
				let _specs = options[m].specs.split("_");
				for (let y = 0; y < _specs.length; y++) {
					console.log("_specs=", _specs[y]);
					if (_specs[y] != id && options[m].stock == 0) {
						for (let n = 0; n < specitem.length; n++) {
							if (_specs[y] == specitem[n].id) {
								specitem[n].c = true;
								console.log("specitem---=0", specitem[n]);
							}
						}

					} else if (_specs[y] != id && options[m].stock > 0) {
						for (let n = 0; n < specitem.length; n++) {
							if (_specs[y] == specitem[n].id) {
								specitem[n].c = false;
								console.log("specitem--->0", specitem[n]);
							}
						}
					}
				}
			}

			//console.log(options);

		},

		//设置选择规格后的 价格、照片、库存
		setGoodsSpecsChangeInfo() {
			//根据ID 排序 specsManage.sort();
			specsManage.sort(function (a, b) {
				return a.id - b.id;
			});
			if (specsManage.length == this.goodsInfo.has_many_specs.length) {
				let goodsSpecs = "";
				for (let j = 0; j < specsManage.length; j++) {
					goodsSpecs += specsManage[j].id + "_";
				}
				goodsSpecs = goodsSpecs.substring(0, goodsSpecs.length - 1);//处理"_"
				console.log("goodsSpecs", goodsSpecs);
				for (let i = 0; i < this.goodsInfo.has_many_options.length; i++) {
					if (goodsSpecs == this.setGoodsSpecsBySort(this.goodsInfo.has_many_options[i].specs)) {
						this.popPrice = this.goodsInfo.has_many_options[i].product_price;//设置价格
						this.popThumb = this.fun.isTextEmpty(this.goodsInfo.has_many_options[i].thumb) ? this.goodsInfo.thumb : this.goodsInfo.has_many_options[i].thumb;//设置图片
						this.popStock = this.goodsInfo.has_many_options[i].stock;//设置库存

						optionsId = this.goodsInfo.has_many_options[i].id;//设置规格ID，用于生成订单
						optionsMaxCount = this.goodsInfo.has_many_options[i].stock;//库存最大数 用于切换更改买家购买数量

						break;
					}
				}
			}
		},

		//处理商品goodsSpecs 并排序 新方法
		setGoodsSpecsBySort(specs) {
			let _specs = specs.split("_");//先变成数组
			console.log("_specs", _specs);
			_specs.sort();//排序
			// 在组装回去
			let goodsSpecs = "";
			for (let j = 0; j < _specs.length; j++) {
				goodsSpecs += _specs[j] + "_";
			}
			goodsSpecs = goodsSpecs.substring(0, goodsSpecs.length - 1);//处理"_"
			return goodsSpecs;
		},

		//判断当前购买总量与库存的关系
		getMaxCount() {
			if (specsManage.length == this.goodsInfo.has_many_specs.length) {
				console.log(optionsMaxCount);
				console.log(this.goodsCount);
				if (this.goodsCount > optionsMaxCount) {
					this.goodsCount = optionsMaxCount;
				}
			}
		},

		//返回操作
		goto() {
			this.$router.go(-1);
		},

		//增加
		addGoods() {
			console.log("增加");
			if (specsManage.length == this.goodsInfo.has_many_specs.length && this.goodsCount == optionsMaxCount) {
				console.log("数量超出范围");
				//Toast("数量超出范围");
				console.log("max=" + this.goodsCount);
				MessageBox.alert("数量超出范围");
				return;
			}
			this.goodsCount++;

		},
		//减少
		reduceGoods() {
			if (this.goodsCount == 1) {
				return;
			}
			this.goodsCount--;
		},


		//设置商品租赁价格
		setRentPrice() {
			this.shopdatas = this.goodsInfo.lease_goods.price_list;
			console.log(this.shopdatas);
		},

		//设置选择后的数据
		setDataByTabIndex() {
			console.log("setDataByTabIndex");
			if (currentTabIndex == "0" && !is_first_content) {
				is_first_content = true;
				this.first_content = this.goodsInfo.content;
			} else if (currentTabIndex == "1" && !is_second_content) {
				is_second_content = true;
				this.second_content = this.goodsInfo.has_many_params;
			} else if (currentTabIndex == "2" && !is_third_content) {
				is_third_content = true;
				//获取评论
				this.getCommentData();
			}
		},

		//tab 点击
		handleClick(tab, event) {
			//点击同tab 不刷新界面
			if (currentTabIndex == tab.index) {
				return;
			} else {
				currentTabIndex = tab.index;
			}

			this.setDataByTabIndex();
		},


		//获取评论数据
		getCommentData() {
			let that = this;
			let json = { goods_id: goods_id, page: 1, "i": this.fun.getKeyByI(), "type": this.fun.getTyep(), "mid": this.fun.getKeyByMid() };
			console.log(json);
			$http.get('goods.comment.get-comment', json, "获取中...").then(function (response) {
				console.log(response.data)
				if (response.result == 1) {
					that.third_content = response.data.data;
				} else {
					is_third_content = false;//复位
				}
			}, function (response) {
				is_third_content = false;//复位
				console.log(response)
			});
		},

		//跳转评论详情
		toContentInfo(data) {
			//this.$router.push({ name: "CommentDetails", params: { order_id: data.order_id, goods_id: data.goods_id, uid: data.uid }, query: { i: this.toi } });
			this.$router.push(this.fun.getUrl('CommentDetails', { order_id: data.order_id, goods_id: data.goods_id, uid: data.uid }));
		},


		//增减租期
		addDays() {
			this.rentDay++;
		},

		//增减租期
		reduceDays() {
			if (this.rentDay == 1) {
				return;
			}
			this.rentDay--;
		},

		//时间选择监听
		rentDateChange(date) {
			this.rentDate = date;
		},

		//立即购买
		buyNow() {
			if (!this.isGoods) {
				Toast("商品已下架或不存在");
				return;
			}

			this.popupSpecs = !this.popupSpecs;
		},

		//提交订单
		confirm() {

			if (!this.isGoods) {
				MessageBox.alert("商品已下架或不存在");
				return;
			}

			if (this.goodsInfo.has_option == 1 && this.fun.isTextEmpty(optionsId)) {
				MessageBox.alert(this.goodsDescription);
				return;
			}

			if (this.fun.isTextEmpty(this.shopdatasItem)) {
				MessageBox.alert("请选择租赁周期");
				return;
			}

			if (this.fun.isTextEmpty(this.rentDate)) {
				MessageBox.alert("请选择租赁起始日期");
				return;
			}

			//处理参数
			this.buyNowRequest(goods_id, optionsId, this.goodsCount, this.rentDate, this.rentDay, this.rentDayType);
		},

		//处理参数
		buyNowRequest(_goodsId, _optionsId, _total, _rentDate, _rentDay, _time_unit) {
			this.$router.push(this.fun.getUrl('confirmOrder', { tag: submitActionTag, goodsId: _goodsId, optionsId: _optionsId, total: _total, rentDate: this.fun.getTimestamp(_rentDate), rentDay: _rentDay, time_unit: _time_unit }));
		},


		//初始化分享设置
		initShare() {
			let that = this;
			console.log(document.location.href);
			let _url = document.location.href;
			let json = { url: _url, "mid": this.fun.getKeyByMid() };
			$http.post('member.member.wxJsSdkConfig', json).then(function (response) {
				console.log(response)
				if (response.result == 1) {
					that.share(response.data);
				} else {

				}
			}, function (response) {
				console.log(response);
			});
		},

		//分享
		shareWeixin() {
			//不是微信端 不访问
			if (window.localStorage.type == 5) {
				return;
			}
			MessageBox({
				title: '提示',
				message: '请点击右上角微信分享',
				showCancelButton: true
			});
		},

		//组装分享设置
		share(data) {
			let that = this;
			wx.config(data.config);
			wx.ready(function () {

				let _title = (that.fun.isTextEmpty(that.goodsInfo.has_one_share.share_title)) ? that.goodsInfo.title : that.goodsInfo.has_one_share.share_title;
				//let _link = document.location.href + "&mid=" + data.info.uid + "&share_tag=2";
				//let _link = location.protocol+'//'+location.host+location.pathname +'?i='+ that.fun.getKeyByI() +"&type=" +that.fun.getTyep()+ "&mid=" + data.info.uid + "&share_tag=2"; 
				let _link = document.location.href + "&share_tag=2";
				_link = that.fun.isMid(_link, data.info.uid);
				let _imgUrl = (that.fun.isTextEmpty(that.goodsInfo.has_one_share.share_thumb)) ? that.goodsInfo.thumb : that.goodsInfo.has_one_share.share_thumb;
				let _desc = (that.fun.isTextEmpty(that.goodsInfo.has_one_share.share_desc)) ? data.shop.name : that.goodsInfo.has_one_share.share_desc;
				wx.showOptionMenu();
				wx.onMenuShareTimeline({
					title: _title, // 分享标题
					link: _link, // 分享链接
					imgUrl: _imgUrl, // 分享图标
					success: function () {
						Toast("分享成功");
					},
					cancel: function () {
						Toast("取消分享");
					}
				});



				wx.onMenuShareAppMessage({
					title: _title, // 分享标题
					desc: _desc, // 分享描述
					link: _link, // 分享链接
					imgUrl: _imgUrl, // 分享图标
					type: 'link', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function () {
						Toast("分享成功");
					},
					cancel: function () {
						Toast("取消分享");
					}
				});
			});
		},


		changeTransfer() {
			this.transfer = !this.transfer;
		},


		changeStyle(index) {
			this.num = index;
		},


		//租赁周期选择
		selectRentType() {
			this.rentDayType = this.shopdatasItem.time_unit;
			console.log(this.shopdatasItem);
		}


	},
	components: { Swipe, SwipeItem, cMyswipe }
}