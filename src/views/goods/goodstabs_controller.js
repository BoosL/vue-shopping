var currentTabIndex = "0";
//标记 防止重复加载
var is_first_content = false;
var is_second_content = false;
var is_third_content = false;
export default {
    data() {
        return {
            first_content: "",
            second_content: "",
            third_content: [],
            goods_id: "",
            goodsInfo: {},
            activeName: 'first',
            show: true
        };
    },


    activated() {

        //初始化参数
        this.initData();
        //获取传递参数
        this.goodsInfo = this.$route.params.goods;
        this.goods_id = this.$route.params.id;
        this.setDataByTabIndex();
    },

    mounted() {

    },

    //些方式相当于window.onload
    methods: {

        //初始化参数
        initData() {
            currentTabIndex = "0";
            is_first_content = false;
            is_second_content = false;
            is_third_content = false;

            this.first_content = "";
            this.second_content = "";
            this.third_content = [];
            this.goods_id = "";
            this.goodsInfo = {};
            this.activeName = 'first';
            this.show = true;
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
            let json = { goods_id: this.goods_id, page: 1 };
            console.log(json);
            $http.get('goods.comment.get-comment', json, "获取中...").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    that.third_content=response.data.data;
                } else {
                    is_third_content = false;//复位
                }
            }, function (response) {
                is_third_content = false;//复位
                console.log(response)
            });
        },

        handleTopChange(status) {
            this.topStatus = status;
        },
        //更新
        loadTop() {
            this.$refs.loadmore.onTopLoaded();
            //this.$router.push('/goods/'+this.$route.params.id);
        },
        // 加载更多
        loadBottom() {
            this.$refs.loadmore.onBottomLoaded();
        }
    },

    components: {},
}



// <script>
//   export default {
//     data() {
//       return {
//         activeName: 'first',
//         show: true
//       };
//     },
//     methods: {
//       handleClick(tab, event) {
//         console.log(tab, event);
//       },
//       handleTopChange(status) {
//         this.topStatus = status;
//       },
//       //更新
//       loadTop(){
//       	this.$refs.loadmore.onTopLoaded();
//       	//this.$router.push('/goods/'+this.$route.params.id);
//       },
//       // 加载更多
//       loadBottom(){
//       	this.$refs.loadmore.onBottomLoaded();      	
//       }      
//     }
//   };
// </script>