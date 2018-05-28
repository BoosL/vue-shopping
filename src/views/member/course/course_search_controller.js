import { Field, Button } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import {CheckBox, CheckBoxGroup} from 'vue-ydui/dist/lib.px/checkbox'; 
import cTitle from 'components/title';



export default {
    data() {
        return {
           goodsList:[],
           searchVal:"",

           loading: false,
           allLoaded: false,
           goload: true,
           isLoadMore: true,
           page: 1,
           total_page: 0,
           
        }
    },

    mounted() {

    },

    methods: {
        //获取搜索内容
        getData(){

            let param={
                //goods_type:this.$route.params.goods_type?this.$route.params.goods_type:""
                goods_type:this.$route.params.goods_type,
                search:this.searchVal,
                page:this.page
                
            }
            $http.get("plugin.video-demand.api.video-course-goods.get-course-goods",param).then(response =>{
                console.log(response.data.data);
                this.goodsList=response.data.data;
                this.total_page = response.data.last_page
            }).catch(error =>{
                console.log(error)
            })
        },

        loadTop(){
            this.initData();
            this.getData();
            this.$refs.coupon_loadmore.onTopLoaded();
        },

        loadBottom() {
            //	this.allLoaded = true;// 若数据已全部获取完毕,不在显示加载更多组件
            if (this.isLoadMore) {
                this.getMoreData(this.page);
                this.$refs.coupon_loadmore.onBottomLoaded();
            } else {
                console.log('没有更多数据');
            }
        },

        getMoreData(page) {
            var that = this;
            if (this.page == this.total_page) {
                console.log(1);
                return;

            }
            if (this.page >= this.total_page) {
                that.loading = true; that.allLoaded = true; return;
                console.log(2);

            } else {
                this.page = this.page + 1;
                $http.get('plugin.video-demand.api.video-course-goods.get-course-goods', { goods_type: this.$route.params.goods_type, page: this.page,search:this.searchVal }, '加载中...').then(function (response) {

                    if (response.result == 1) {
                        var myData = response.data.data;
                        that.loading = false; that.allLoaded = false;
                        that.goodsList = that.goodsList.concat(myData);//数组拼接

                    } else {
                        that.page = that.page - 1;
                        that.loading = true; that.allLoaded = true; that.isLoadMore = false; return;
                    }
                }, function (response) {
                    // error callback
                });

            }


        },

        initData() {
            this.page = 1;
            this.total_page = 0;
            this.goload = true;
            this.loading = true;
            this.allLoaded = false;
            this.isLoadMore = true;
            this.goodsList = [];
        },

        goToDetail(id){
            this.$router.push(this.fun.getUrl('CourseDetail',{goods_id:id}));
        }


        //搜索
       

        
    },
    activated() {
        
        this.searchVal="";
        this.initData();
        this.getData();
    },

    components: { cTitle,   CheckBox }


}