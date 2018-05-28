import cTitle from 'components/title';
import { Loadmore } from 'mint-ui';
import cOrderList from './component/rentOrderList';
import { InfiniteScroll } from 'mint-ui';
import PullToRefresh from 'components/pull-to-refresh.vue';
import cFooter from './component/rentFoot';
import { Indicator, Toast } from 'mint-ui';
export default {
	data() {
		return {
			selected: "0",
			orderList: [],
			page: 1,
			allLoaded: false,//判断是否还有分页
		};
	},

	activated() {
		this.getSelected();//获取选择tab栏位置
		this.swichTabTItem();//根据标签切换组装api 
	},
	methods:
	{

		//获取选择tab栏位置
		getSelected() {
			this.selected = this.$route.params.status;
		},
		//初始化数据
		initData() {
			this.page = 1;//初始化分页
			this.allLoaded = false;//初始化加载更多
		},
		//tab 切换
		swichTabTItem() {
			this.initData();//初始化数据
			this.getOrderList(this.selected);//根据标签切换组装api 
		},

		//根据标签切换组装api 
		getOrderList(index) {
			let action = "";
			switch (index) {
				case "0"://全部
					action = "plugin.lease.frontend.modules.order.controllers.list";
					break;
				case "1"://待付款
					action = "plugin.lease.frontend.modules.order.controllers.list.wait-pay";
					break;
				case "2"://待发货
					action = "plugin.lease.frontend.modules.order.controllers.list.wait-send";
					break;
				case "3"://待收货
					action = "plugin.lease.frontend.modules.order.controllers.list.wait-receive";
					break;
				case "4"://待归还
					action = "plugin.lease.frontend.modules.order.controllers.list.wait-return";
					break;
				case "5"://归还中
					action = "plugin.lease.frontend.modules.order.controllers.list.wait-receive-return";
					break;
				case "6"://已完成
					action = "plugin.lease.frontend.modules.order.controllers.list.completed";
					break;
				case "7"://已转租
					action = "";
					break;
				case "8"://已取消
					action = "plugin.lease.frontend.modules.order.controllers.list.cancelled";
					break;

				default:
					break;
			}
			this.getData(action);
		},

		//获取数据
		getData(action) {
			let that = this;
			let json = { page: this.page };
			$http.get(action, json, "加载中...").then(function (response) {
				if (response.result == 1) {
					that.isMorePage(response.data.total);//判断是否有分页
					if (that.page == 1) {
						that.orderList = [];//清空数据源
						that.orderList = response.data.data;
					} else {
						if (response.data.data != null && response.data.data.length > 0) {
							that.orderList = that.orderList.concat(response.data.data);//数组拼接
						} else {
							that.isMorePage(0);//制造不可分页
							Toast("暂无数据");
						}
					}
				} else {
					Toast(response.msg);
					that.isMorePage(0);//制造不可分页
				}
			}, function (response) {
				console.log(response);
				that.isMorePage(0);//制造不可分页
			});
		},



		//判断是否有分页
		isMorePage(total) {
			this.allLoaded = this.page >= total ? true : false;
		},


		//更新
		loadTop() {
			this.swichTabTItem();
			this.$refs.loadmore.onTopLoaded();//结束动画
		},

		// 加载更多
		loadBottom() {
			this.page = this.page + 1;//分页增加
			this.getOrderList(this.selected);
			this.$refs.loadmore.onBottomLoaded();//结束动画
		},
	},
	components: { cTitle, cOrderList, PullToRefresh, cFooter }
}