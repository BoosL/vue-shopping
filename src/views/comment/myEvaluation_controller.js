import cTitle from 'components/title';
import { Navbar } from 'mint-ui';
export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      selected: '0',
      //待评价
      wait: [],
      //已评价
      comment: [],
      //其他
      other: []
    };
  },
  methods:
  {
    swichTabTItem() {

      if (this.selected == 0 || this.selected==1) {

        this.getNetData(this.selected);

      } else {
        this.getOtherData();
      }
    },
    opration(btn,item)
    {
      //value-1 追加评价value-2 查看评价详情
      if(btn.value == 1)
      {
        this.$router.push({ name: "addevaluate", params: { item:item }, query: { i: this.toi } });

      }else
      {
        //CommentDetails
        this.$router.push({ name: "CommentDetails", params: { order_id:item.has_one_comment.order_id,goods_id:item.has_one_comment.goods_id,uid:0 }, query: { i: this.toi } });

      }

    },
    //追加评价
    // reComment() {

    //   this.$router.push({ name: "addevaluate", params: { order: null, form: 0 }, query: { i: this.toi } });


    // },
    //评价
    toComment(order_id, good) {

      this.$router.push({ name: "evaluate", params: { order_id: order_id, goods: good }, query: { i: this.toi } });


    },
    getNetData(status) {
      var that = this;
      $http.get('order.my-comment', { status: status, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '正在获取...').then(function (response) {

        if (response.result == 1) {

          var myData = response.data;
          if (status == 0) {
            that.wait = myData.list;

          } else if (status == 1) {

            that.comment = myData.list
          } else {
            that.other = myData.list;
          }

        }
      }, function (response) {
        // error callback
      });

    },
    //获取其他评价的
    getOtherData() {
      var that = this;
      $http.get('order.myComment.goods', { "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '正在获取...').then(function (response) {

        if (response.result == 1) {

          var myData = response.data;
          that.other = myData.list;


        }
      }, function (response) {
        // error callback
      });

    }

  },
  activated() {

    this.toi = this.fun.getKeyByI();
    this.getNetData(this.selected);
    this.$on('selected', (text) => {
      this.selected = text;
    });


  }
  ,
  created() {


  },
  components: { cTitle }
}