import {mapState,mapMutations} from 'vuex';
import cStoreList from 'components/storeList';

export default {
	data() {
		return {
			title: '搜索',
			inputs: '',
			amout: false,
			loading: false,
			allLoaded: true,
			goload: false,
            stores: [],
			order_by:'',
			order_field:''
		}
	},
    activated() {
        console.log('point');

		this.city = this.$route.params.city;
		console.log(this.$route.params.point);
		this.point = JSON.parse(this.$route.params.point);
		this.search();

    },
	computed: mapState(['view']),
	...mapMutations(['views']),
	mounted() {
		this.slider();
	},
	methods: {

		search() {
			this.gotoSearch();
		},
		slider() {
			let that = this;
			window.onscroll = function () {
				var top = document.documentElement.scrollTop || document.body.scrollTop;
				if (top < 80) {
					that.amout = false;
				} else {
					that.amout = true;
				}
			}

		},
		// 加载更多
		loadBottom() {
			console.log('加载更多启动')
			this.gotoSearch(n);			
			this.$refs.loadmore.onBottomLoaded();
		},
		goback() {
			this.$router.go(-1);
		},
		gotoSearch() {
		    var that = this;
			let json = { 'kwd': this.inputs, 'lng': this.point.lng ,lat:this.point.lat, city_name:this.city};
			$http.get('plugin.store-cashier.frontend.store.goods.get-store-goods-by-title', json).then((json) => {

				if (json.result == 1) {
					console.log('store-goods', json);
					that.stores = json.data;
				}
				else {
                    that.stores = [];
				}
			});
		}
	},

	components: { cStoreList }
}
