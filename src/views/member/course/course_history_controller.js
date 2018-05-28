import { Field, Button } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import {CheckBox, CheckBoxGroup} from 'vue-ydui/dist/lib.px/checkbox'; 
import cTitle from 'components/title';


export default {
    data() {
        return {
            histroyInfo:[],


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
       //获取历史记录
        getHistroy(){
            $http.get('plugin.video-demand.api.video-demand-member.get-scan-history',{page:this.page}).then(response =>{
                console.log(response);
                if(response.result == 1 && !this.fun.isTextEmpty(response.data.data)){
                    this.histroyInfo=response.data.data;
                    this.total_page=response.data.last_page;
                }
                
            }).catch(error =>{
                console.log(error)
            })
        },

        //清除历史记录
        clearData(){
            var that=this;
            MessageBox.confirm('确定删除观看记录?').then(function(){
                $http.get('plugin.video-demand.api.video-demand-member.historical-purge',{}).then(response =>{
                    console.log(response);
                    if(response.result == 1){
                        that.histroyInfo=[];
                        MessageBox("提示",response.msg);
                    }else if(response.result == 0){
                        MessageBox("提示",response.msg);
                    }else{
                        return
                    }
                }).catch(error =>{
                    console.log(error)
                })
            },function(){
                //取消回调
            })
        },

        goBack(){
            window.history.go(-1);
        },

        loadTop(){
            this.initData();
            this.getHistroy();
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
                return;

            }
            if (this.page >= this.total_page) {
                that.loading = true; that.allLoaded = true; return;

            } else {
                this.page = this.page + 1;
                $http.get('plugin.video-demand.api.video-demand-member.get-scan-history', { page: this.page}, '加载中...').then(function (response) {

                    if (response.result == 1) {
                        var myData = response.data.data;
                        that.loading = false; that.allLoaded = false;
                        that.histroyInfo = that.histroyInfo.concat(myData);//数组拼接

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
            this.histroyInfo = [];
        },

        gotoDetail(id){
            this.$router.push(this.fun.getUrl('CourseDetail',{goods_id:id}));
        }


    },
    activated() {
        this.initData();
        this.getHistroy();
    },

    components: { cTitle, CheckBox }


}