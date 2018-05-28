import cTitle from 'components/title';

export default {
    data() {
        return {
            mainInfo:{},
            info:{},
            infoShow:false

        }
    },
    

    mounted() {
        
    },
    created() {
       
    },
    activated() {
        this.getInfo();
        this.getStore();
    },
    methods: {
        getStore(){
            $http.get('plugin.store-cashier.frontend.store.get-store-info.get-info-by-store-id', {store_id: this.$route.params.store_id}).then(response=>{
                console.log(response);
                if (response.result == 1 && !this.fun.isTextEmpty(response.data)) {
                    this.mainInfo=response.data;
                }
            }).catch(error=>{
                console.log(error);
            })
        },

        getInfo(){
            $http.get('plugin.store-cashier.frontend.store.store-home.get-store-information', {store_id: this.$route.params.store_id}).then(response=>{
                console.log(response);
                if (response.result == 1 && !this.fun.isTextEmpty(response.data.information)) {
                    this.info=response.data.information;
                    this.infoShow=true;
                }
            }).catch(error=>{
                console.log(error);
            })
        }
    },



    components: {cTitle},

    compiled() {

        
    }
}
