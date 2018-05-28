<template>
    <div id="share">
        <mt-button class="share_btn" type="danger" @click="share_btn" size="large">分享</mt-button>
        <mt-button class="black_btn" type="default" @click="siteBack" size="large">返回</mt-button>
    </div>
</template>

<script>
    var site_uniacid = 0;
    var site_type = 0;
    import { Indicator, Toast } from 'mint-ui';
    export default {
        data() {
            return {
                sharetitle: "",
                sharedesc: "",
                shareimg: "",
                sharelink: ""
            }
        },
        mounted() {

        },

        methods: {
            share_btn(){
                this.Sharesinit();
            },
            //获取分享数据
            Sharesinit() {
                var that = this;
                var _url = document.location.href;
                var json = { url: _url, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
                $http.post('member.member.wxJsSdkConfig', json).then(function (response) {
                    if (response.result == 1) {
                        that.Shares(response.data);
                    }
                }, function (response) {
                    console.log(response);
                });

            },
            //设置分享内容
            Shares(data) {
                var that = this;
                var prrtocol = document.location.protocol;
                var domain = window.location.host;
                var sharedata = data.share;
                if (sharedata) {
                    that.sharetitle = that.fun.isTextEmpty(sharedata.title) ? data.shop.name : data.share.title;
                    that.shareimg = that.fun.isTextEmpty(sharedata.icon) ? data.shop.logo : data.share.icon;
                    that.sharedesc = that.fun.isTextEmpty(sharedata.desc) ? data.shop.name : data.share.desc;
                } else {
                    that.sharetitle = data.shop.name;
                    that.shareimg = data.shop.logo;
                    that.sharedesc = data.shop.name;
                }
                that.sharelink = prrtocol + "//" + domain + "/addons/yun_shop/?#/home?i=" + this.fun.getKeyByI() +"&type=" + this.fun.getTyep() + "&mid=" + data.info.uid + "&shop_id=";
                YDB.Share(that.sharetitle, that.sharedesc, that.shareimg, that.sharelink, "Sharesback");
            },
            //分享回调
            Sharesback(state) {
                if (state == 'success') {
                    Toast('分享成功');
                } else if (state == 'fail') {
                    Toast('分享失败');
                } else {
                    Toast('分享取消');
                }
                this.siteBack();
            },
            //返回前一页面
            siteBack(){
                this.$router.go(-1);
            }
        },
        activated(){
            site_uniacid = this.fun.getKeyByI();
            site_type = this.fun.getTyep();
            this.Sharesinit();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
    #share{
        background-color: #000000;
        filter:alpha(Opacity=80);
        -moz-opacity:0.5;
        opacity: 0.5;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .share_btn{
        position: fixed;
        bottom: 130px;
    }
    .black_btn{
        position: fixed;
        bottom: 80px;
    }
</style>