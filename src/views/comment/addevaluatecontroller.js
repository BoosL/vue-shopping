import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default {
    data() {
        return {
            toi: this.fun.getKeyByI(),
            value: 3,
            //评论内容
            comment: '',
            //追加评价
            reComment:'',
            good:'',
            comment_id:'',
            item:''
        };
    },
    methods: {
        toReComment() {
          var that = this;
            if (this.reComment.length == 0) {
                MessageBox({
                    title: '提示',
                    message: '您还没有输入相关的评论内容',
                    showCancelButton: true
                }).then(action => {
                    if (action == 'confirm') {

                       that.submitData();

                    }

                });
            }else
            {
                that.submitData();
            }
        },
         //提交数据到服务器
    submitData() {
    
     var that = this;
      $http.post('goods.comment.append-comment', {
        id: this.item.id,
        content: this.reComment,
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
    activated () {
        this.good = this.$route.params.item;
        this.item = this.good.has_one_comment;
        this.value = this.item.level;
        this.comment = this.item.content;
        this.toi = this.fun.getKeyByI();
    },
    components: { cTitle }
};