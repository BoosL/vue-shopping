import cTitle from 'components/title';	
import { MessageBox } from 'mint-ui';
  export default {
    data() {
      return {
 		      star:null,
          comment:''    //评论内容
       };
    },
    methods: 
    {
      getStar(value)
      {
        console.log(value);
      },
      toComment()
      {
        if(this.comment.length==0)
        {
          MessageBox({
              title: '提示',
              message: '您还没有输入相关的评论内容',
              showCancelButton: true
            }).then(action => {
             
                if(action =='confirm')
                {
                
                  this.submitData();
                

                }else
                {
                  return;
                }

  
             });
        }else
        {
          this.submitData();

        }
        

      },
      //提交数据到服务器
      submitData()
      {
        console.log(this.$route.params.brother);
        
        if(this.$route.params.from == 0 )
          {
            this.$router.go('member');

          }else
          {
            this.$route.params.brother.$emit("selected","2");
            this.$router.go(-1);

          }

      }

    },
    components: { cTitle}
  };