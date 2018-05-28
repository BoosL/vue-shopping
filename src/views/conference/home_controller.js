import { mapState, mapMutations } from 'vuex';
import cTitle from '../../components/title';
import { Loadmore } from 'mint-ui';
import { Lazyload, Button } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';
var haveShop = false;

export default {
    data() {
        return {
            conference: [],
        };
    },

    mounted() {

    },
    methods: {
        goback() {
            this.$router.go(-1);
        },

        //获取活动列表数据
        getConference() {
            var that = this;
            $http.get('plugin.conference.api.conference-activity.get-activity', {}, "加载中...").then(function (response) {
                if (response.result == 1) {
                    that.conference = response.data;
                    console.log('conference1', response);
                    that.initShare();
                } else {
                    MessageBox.alert(response.msg);
                }
            }, function (response) {
                MessageBox.alert(response);
            });
        },

        //查看报名信息
        onActivityInfo(id) {
            this.$router.push(this.fun.getUrl('myActivityInfo', { id: id }));
        },


        //初始化分享设置
        initShare() {
            let that = this;
            let _url = document.location.href;
            let json = { url: _url, "i": this.fun.getKeyByI(), "type": this.fun.getTyep(), "mid": this.fun.getKeyByMid() };
            $http.post('member.member.wxJsSdkConfig', json).then(function (response) {
                console.log(response)
                if (response.result == 1) {
                    that.share(response.data);
                } else {

                }
            }, function (response) {
                console.log(response);
            });
        },
        //组装分享设置
        share(data) {
            let that = this;
            wx.config(data.config);
            wx.ready(function () {

                let _title = "";
                let _link = document.location.href;
                let _imgUrl = "";
				let _desc = "";

                _title = that.fun.isTextEmpty(data.share.title) ? data.shop.name : data.share.title;
				_imgUrl = that.fun.isTextEmpty(data.share.icon) ? data.shop.icon : data.share.icon;
				_desc = that.fun.isTextEmpty(data.share.desc) ? data.shop.name : data.share.desc;
                _link = that.fun.isMid(_link, data.info.uid);
               
                wx.showOptionMenu();
                wx.onMenuShareTimeline({
                    title: _title, // 分享标题
                    link: _link, // 分享链接
                    imgUrl: _imgUrl, // 分享图标
                    success: function () {
                        Toast("分享成功");
                    },
                    cancel: function () {
                        Toast("取消分享");
                    }
                });



                wx.onMenuShareAppMessage({
                    title: _title, // 分享标题
                    desc: _desc, // 分享描述
                    link: _link, // 分享链接
                    imgUrl: _imgUrl, // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        Toast("分享成功");
                    },
                    cancel: function () {
                        Toast("取消分享");
                    }
                });
            });
        },
    },
    activated() {
        this.conference = [];//初始化
        this.getConference();

    },
    created() {

    },
    components: { cTitle, Loadmore }

}
