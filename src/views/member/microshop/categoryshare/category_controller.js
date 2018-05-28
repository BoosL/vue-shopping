//import { mapState } from 'vuex';
import cTitle from 'components/title';
import cRootlist from 'components/rootlist';
import cCarcontent from './carcontent';
import { Loadmore } from 'mint-ui';
import BScroll from 'better-scroll';
import { mapState, mapMutations } from 'vuex';

export default {
	data() {
		return {
			active: 0,
			active2: true,
			allLoaded: false,
			topStatus: '',
			err: '',
			turl: '/category',
			arg: { index: 10, item: 'pinch' },
			list: [],
			contentlist: {},
		}
	},
	computed: mapState(["category", 'blurst']),
	methods: {

		allList() {
			this.active2 = true;
			this.active = 9999;
			this.getContentlist2();
		},
		tabsa(n, i) {

			this.$store.commit('setAdvimg', i);
			//this.$store.state.category.adv_img

			this.active = n;
			this.active2 = false;
			this.getContentlist(i.id);
		},
		bpfun() {
			this.$router.push(this.fun.getUrl('brand'));
		},
		getList() {
			$http.get('plugin.micro.frontend.controllers.MicroShop.CategoryByShare.getCategory').then((response) => {
				if (response.result == 1) {
					var myData = response.data;
					this.list = response.data.data;
					console.log(response.data.data[0]);


					if (this.fun.isTextEmpty(response.data) || this.fun.isTextEmpty(response.data.data) || this.fun.isTextEmpty(response.data.data[0])) {
						return;
					}
					this.tabsa(0, response.data.data[0]);//默认获取第一个子分类
				}
			}, function (response) {
				// error callback
			});
		},
		getContentlist(id) {
			let jsons = { parent_id: id };
			$http.get('plugin.micro.frontend.controllers.MicroShop.CategoryByShare.getChildrenCategory', jsons).then((response) => {
				if (response.result == 1) {
					this.err = false;
					this.contentlist = response.data;
					this.contentlist.tjfl = false;
					this.contentlist.set = response.data.set;
					//						 this.$nextTick(() => {
					//						 	this._initScroll(this.$refs.menucontent)
					//						 })
				} else {
					this.err = true;
					//this.doException(response);
				}
			});
		},
		getContentlist2() {
			$http.get('shop.index.get-default-index').then((response) => {
				if (response.result == 1) {
					this.err = false;
					response.data.category.goo = true;
					this.contentlist = response.data.category;
					this.contentlist.tjfl = true;
					this.contentlist.set = response.data.set;

				} else {
					this.err = true;
					//this.doException(response);
				}
			});
		},
		_initScroll(doc) {
			//this.menuScroll = new BScroll(doc, {click: true})  
		}
	},
	activated() {
		//console.log("cookie", document.cookie);
		this.active = 0;
		this.getList();
	},
	mounted() {


	},
	components: { cTitle, cCarcontent }
}