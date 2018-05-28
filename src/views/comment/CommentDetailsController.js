import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default {

    //name: 'login',
    data() {
        return {
            toi: this.fun.getKeyByI(),
            content: '',
            //追评
            append: null,
            //全部回复
            reply: null,
            head_img_url: '',
            //评价时间
            created_at: '',
            nick_name: '',
            //主评论id
            comment_id: '',
            has_many_reply: [],
            has_one_order_goods: null,
            reply_placeholder: "回复@昵称:",
            //当前被回复对象
            reply_one: '',
            //1-代表回复主评论 2-回复某人
            reply_type: 1,




        }
    },
    methods: {
        getNetData(status) {
            var that = this;
            $http.get('goods.comment.get-order-goods-comment', { order_id: this.$route.params.order_id, goods_id: this.$route.params.goods_id,uid:this.$route.params.uid, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '正在获取...').then(function (response) {


                if (response.result == 1) {

                    var myData = response.data;
                    that.content = myData.content;
                    that.created_at = myData.created_at;
                    that.append = myData.append;
                    that.reply = myData.reply;
                    that.head_img_url = myData.head_img_url;
                    that.images = myData.images;
                    that.nick_name = myData.nick_name;
                    that.has_one_order_goods = myData.has_one_order_goods;
                    that.has_many_reply = myData.has_many_reply;
                    that.comment_id = myData.id;


                } else {
                    MessageBox.alert(response.msg);

                }
            }, function (response) {
                // error callback
            });

        },
        //触发回复动作
        replyToSomeOne(who) {
            this.reply_type = 2;
            this.reply_one = who;
            this.reply_placeholder = "回复@昵称:" + who.nick_name;



        },
        //回复主评论
        submitReplyForComment() {
            this.reply_type = 1;
            this.reply_placeholder = "回复@昵称:主评论";
        },
        //回复评价
        submitReply() {
            //goods.comment.reply-comment
            var that = this;
            var reply_id;
            if (this.reply_type == 1) {
                reply_id = this.comment_id;

            } else {
                reply_id = this.reply_one.id;
            }
            $http.get('goods.comment.reply-comment', { id: reply_id, content: this.reply_content, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() }, '正在回复').then(function (response) {


                if (response.result == 1) {

                    var myData = response.data;
                    that.reply_content = '';
                    that.has_many_reply.push(myData);




                } else {

                    MessageBox.alert(response.msg);
                }
            }, function (response) {
                // error callback
            });

        }
    }
    ,
    activated() {
        var that = this;
        that.content = '';
        that.created_at = '';
        that.append = '';
        that.reply = '';
        that.head_img_url = '';
        that.images = '';
        that.nick_name = '';
        that.has_one_order_goods = '';
        that.has_many_reply = '';
        that.comment_id = '';
        this.toi = this.fun.getKeyByI();
        this.getNetData();
        this.reply_placeholder = '回复@昵称:主评论';

    },
    components: { cTitle }
}