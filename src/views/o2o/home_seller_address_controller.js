import cTitle from 'components/title';

export default {
    data() {
        return {
            //经度
            lng:0,
            //纬度
            lat:0,
            city:"",
            storeName:""
           

        }
    },
    

    mounted() {
        this.init();
        this.getAddress();
    },
    created() {

    },
    activated() {
        
    },
    methods: {
        createMap(){
            
            var map = new BMap.Map("map");
            var point = new BMap.Point(this.lng,this.lat);
            var marker = new BMap.Marker(point);
            
            map.centerAndZoom(point, 15);  
            // 初始化地图,设置中心点坐标和地图级别
            map.centerAndZoom(new BMap.Point(this.lng,this.lat), 100);
            // 添加地图类型控件
            map.addControl(new BMap.MapTypeControl());  
            // 设置地图显示的城市 此项是必须设置的
            map.setCurrentCity(this.city);    
            // 开启鼠标滚轮缩放      
            map.enableScrollWheelZoom(true);

            marker.addEventListener("touch",goTO);

            map.addOverlay(marker);

            function goTO(){
                window.location.href="http://api.map.baidu.com/marker?location="+this.lng+","+this.lat+"&title=我的位置&content="+this.storeName+"&output=html";
            }

            
            
        },

        getAddress(){
            $http.get('plugin.store-cashier.frontend.store.get-store-info.get-info-by-store-id', {store_id: this.$route.params.store_id}).then(response=>{
                console.log(response);
                if (response.result == 1 && !this.fun.isTextEmpty(response.data)) {
                    this.lat=parseFloat(response.data.lat);
                    this.lng=parseFloat(response.data.lng);
                    this.storeName=response.data.store_name;
                    this.city=response.data.store_address.slice(0,2);
                    // console.log(this.lat,this.lng);
                    // console.log(typeof this.lat);
                    // console.log(this.city);
                    this.createMap();
                }
            }).catch(error=>{
                console.log(error);
            })
        },

        init(){
            this.lng=0;
            this.lat=0;
            this.store_name="";
        }
    },



    components: {cTitle},

    compiled() {

        
    }
}
