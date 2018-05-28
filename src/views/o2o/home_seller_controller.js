import cTitle from 'components/title';

export default {
    data() {
        return {
            category:[],
            mainInfo:{},
            toi:this.fun.getKeyByI(),
            telephone:""

        }
    },
    //computed: mapState(['mailInfo']),

    mounted() {
        
    },
    created() {
       
    },
    activated() {
        this.init();
        this.getStoresCategory();
        this.getStore();
    },
    methods: {
      //获取页面主要信息
      getStore(){
        $http.get('plugin.store-cashier.frontend.store.get-store-info.get-info-by-store-id', {store_id: this.$route.params.store_id}).then(response=>{
            console.log(response.data);
            if (response.result == 1 && !this.fun.isTextEmpty(response.data)) {
                this.mainInfo=response.data;
                this.telephone="tel:"+response.data.store_mobile;
                console.log(this.telephone);
            }
        }).catch(error=>{
            console.log(error);
        })
      },

      getStoresCategory(){
        $http.get('plugin.store-cashier.frontend.store.store-category.get-list').then(response =>{
            if (response.result == 1) {
                this.category = response.data;
            }
        }).catch(error =>{
            console.log(error);
        })
      },

      getStoreDetail(){
        $http.get('plugin.store-cashier.frontend.store.store-home.get-store-information',{store_id:this.$route.params.store_id}).then(response=>{
            console.log(response);
        })
        console.log(this.$route.params.store_id)
      },


      goToShop(){
        this.$router.push({name:'o2oStore',params:{store_id:this.$route.params.store_id},query:{i:this.toi}})
      },

      goToDetail(){
        this.$router.push({name:'HomeSellerDetail',params:{store_id:this.$route.params.store_id},query:{i:this.toi}})
      },

      goToAdress(){
        //this.$router.push({name:'HomeSellerAddress',params:{store_id:this.$route.params.store_id},query:{i:this.toi}})
        window.location.href="http://api.map.baidu.com/marker?location="+this.mainInfo.lat+","+this.mainInfo.lng+"&title=我的位置&content="+this.mainInfo.store_name+"&output=html";
      },

      goToCrash(){
        this.$router.push({name:'cashier_pay',params:{store_id:this.$route.params.store_id},query:{i:this.toi}})
      },

      init(){
        this.category=[];
        this.mainInfo={};
      }

      



    },



    components: {cTitle},

    compiled() {

        
    }
}
