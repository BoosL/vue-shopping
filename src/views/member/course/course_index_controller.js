import { Field, Button } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import {CheckBox, CheckBoxGroup} from 'vue-ydui/dist/lib.px/checkbox'; 
import cTitle from 'components/title';



export default {
    data() {
        return {
            carouselInfo:[],
            showCarousel:false,
            showRec:false,
            showHot:false,
            showNew:false,
            goodsList:[],
            recGoodList:[],
            hotGoodList:[],
            newGoodList:[]
        }
    },

    mounted() {
       
    },

    methods: {
        //获取轮播
        getCarouselInfo(){
            $http.get("plugin.video-demand.api.video-demand.get-video-slide",{}).then(response =>{
                if(response.result==1 && !this.fun.isTextEmpty(response.data)){
                    this.showCarousel=true;
                    this.carouselInfo=response.data;
                }else{
                    this.showCarousel=false;
                }
            }).catch(error =>{
                console.log(error)
            })
        },

        //获取商品
        getGoods(type,page,search,container){

            let param={
                goods_type:type,
                in_home_page:page?page:"",
                search:search?search:""
            }
            $http.get("plugin.video-demand.api.video-course-goods.get-course-goods",param).then(response =>{
               
                console.log(response);
                let arr=[];
                if(response.result==1 && !this.fun.isTextEmpty(response.data.data)){
                    arr=response.data.data;
                    switch(container){
                        case "recGoodList":
                            this.showRec=true;
                            this.recGoodList=arr; 
                            break;
                        case "hotGoodList":
                            this.showHot=true;
                            this.hotGoodList=arr; 
                            break;
                        case "newGoodList":
                            this.showNew=true;
                            this.newGoodList=arr; 
                            break;
                        default:
                            break;
                    }
                }else{
                    switch(container){
                        case "recGoodList":
                            this.showRec=false;
                            break;
                        case "hotGoodList":
                            this.showHot=false; 
                            break;
                        case "newGoodList":
                            this.showNew=false;
                            break;
                        default:
                            break;
                    }
                }
                
                

                
            }).catch(error =>{
                console.log(error);
            })
        },

        

        //更多商品
        moreGoods(type){
            this.$router.push(this.fun.getUrl('CourseSearch',{goods_type:type}));
        },

        //商品详情
        goToDetail(id){
            $http.get("plugin.video-demand.api.video-course-goods.get-course-goods-detail",{goods_id:id}).then(response =>{
                if(response.result == 1){
                    if(response.data.is_course == 1){
                        this.$router.push(this.fun.getUrl('CourseDetail',{goods_id:id}));
                    }else{
                        this.$router.push(this.fun.getUrl('goods',{id:id}));
                    }
                }
            }).catch(error =>{
                console.log(error);
            })
            
        },

        //聚合页搜索跳转至首页
        gotoIndex(){
            this.$router.push(this.fun.getUrl('home'));
        }
    },
    activated() {
        
        this.getCarouselInfo();
        //console.log(this.recGoodList);
        this.recGoodList=[];
        this.hotGoodList=[];
        this.newGoodList=[];
        this.getGoods("is_recommand",1,"","recGoodList");
        this.getGoods("is_hot",1,"","hotGoodList");
        this.getGoods("is_new",1,"","newGoodList");
        this.getGoods("");
        
        
    },

    components: { cTitle,   CheckBox }


}