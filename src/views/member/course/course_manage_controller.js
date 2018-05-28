import { Field, Button } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import {CheckBox, CheckBoxGroup} from 'vue-ydui/dist/lib.px/checkbox'; 
import cTitle from 'components/title';


export default {
    data() {
        return {
           memberInfo:{}
           
        }
    },

    watch:{
        '$route':function(to,from){
　　　　　　　document.body.scrollTop = 0;
             document.documentElement.scrollTop = 0; 
        }
    },

    mounted() {
        window.scrollTo(0,0);
    
    },

    methods: {
        //获取会员信息
        getMemberInfo(){
            $http.get('plugin.video-demand.api.video-demand-member.get-member-data',{}).then(response =>{
                if(response.result == 1){
                    this.memberInfo=response.data;
                }
                
            }).catch(error =>{
                console.log(error)
            })
        },

        //历史记录
        gotoHistroy(){
            this.$router.push(this.fun.getUrl('CourseHistory'));
        },

        //我的课程
        gotoMycourse(){
            this.$router.push(this.fun.getUrl('CourseMy'));
        },

        //我的打赏
        gotoReward(){
            this.$router.push(this.fun.getUrl('CourseReward'));
        },
        
        //跳转购买vip
        gotoVip(){
            this.$router.push(this.fun.getUrl('CourseMemberUpdate'));
        }
        
              
    },
    activated() {
        this.getMemberInfo();
        document.getElementById('course').scrollTop="40px";
        console.log(document.getElementById('course').scrollTop);

    },

    components: { cTitle,   CheckBox }


}