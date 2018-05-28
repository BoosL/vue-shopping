import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
     toi: this.fun.getKeyByI(),
     good:'',
      order_id: '',
      content: '',
      level: 5,
      order: '',
      comment: '',    //评论内容


    };
  },
  methods:
  {
    getStar(value) {
      console.log(value);
    },
    toComment(item) {
      if (this.comment.length == 0) {
        MessageBox({
          title: '提示',
          message: '您还没有输入相关的评论内容',
          showCancelButton: true
        }).then(action => {

          if (action == 'confirm') {

            this.submitData(item);


          } else {
            return;
          }


        });
      } else {
        this.submitData(item);

      }


    },
    //提交数据到服务器
    submitData(item) {
    
     var that = this;
      $http.post('goods.comment.create-comment', {
        order_id: this.order_id,
        goods_id: item.goods_id,
        content: this.comment,
        level: this.level,
        "i": this.fun.getKeyByI(), "type": this.fun.getTyep()
      }).then(function (response) {
        if (response.result == 1) {
          MessageBox.alert(response.msg, '提示');
          that.$router.go(-1);

        } else {
          MessageBox.alert(response.msg, '提示');

        }

      }, function (response) {
        // error callback
      });
    }

  },
  activated() {
    this.comment = '';
    this.toi = this.fun.getKeyByI();
    this.order_id = this.$route.params.order_id;
    this.good = this.$route.params.goods;
  },
  components: { cTitle }
};