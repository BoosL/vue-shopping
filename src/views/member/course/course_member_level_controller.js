import { Field, Button } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import {CheckBox, CheckBoxGroup} from 'vue-ydui/dist/lib.px/checkbox'; 
import cTitle from 'components/title';


export default {
    data() {
        return {
          updateGoods:[]
        }
    },

    mounted() {

    },

    methods: {
       //获取会员升级商品信息
       getMemberUpdate(){
           $http.get("member.member-level.index").then(response => {
               console.log(response.data.data);
               if(response.result == 1 && response.data.level_type == 2){
                   if(!this.fun.isTextEmpty(response.data.data)){
                    this.updateGoods=response.data.data;
                   }
               }
           }).catch(error => {
               console.log(error)
           })
       },

       gotoBuy(id){
        this.$router.push(this.fun.getUrl('goods',{id:id}));
       }
    },
    activated() {
        this.updateGoods=[];
        this.getMemberUpdate();
    },

    components: { cTitle, CheckBox }


}