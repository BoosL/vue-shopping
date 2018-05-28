import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default {
    data() {
        return {
            title:'挑战规则',
            ruleContent:"",

            share_title:"",
            
            share_icon:"",
            
            share_desc:""

        }
    },
    methods: {
        //打卡规则请求数据
        getRule(){
            $http.get('plugin.clock-in.api.clock-in.get-rule',{}).then(response => {
                console.log(response);
                if(response.result == 1){
                    this.ruleContent=response.data.rule;
                }
            }).catch(error => {
                console.log(error)
            })
        },

         //获取分享数据
         getShareData(){
            $http.get('plugin.clock-in.api.clock-in.get-set', {}).then(response =>{
                this.share_title=response.data.share.share_title;
                this.share_icon=response.data.share.share_icon;
                this.share_desc=response.data.share.share_desc;

                this.initShare();
            }).catch(error =>{
                console.log(error);
            })
        },

        //微信分享
        initShare() {
            let that = this;
            console.log(document.location.href);
            let _url = document.location.href;
            let json = { url: _url};
            $http.post('member.member.wxJsSdkConfig', json).then(function (response) {
              console.log(response)
              if (response.result == 1) {
                //that.cservice = response.data.shop.cservice;
                //that.initCservice(response.data.shop.cservice);//重新赋值
                that.share(response.data);
              } else {
      
              }
            }, function (response) {
              console.log(response);
            });
        },

        share(data) {
            let that = this;
            wx.config(data.config);
            wx.ready(function () {
      
            //   let _title = (that.fun.isTextEmpty()) ? that.goodsInfo.title : that.goodsInfo.has_one_share.share_title;

            let _title=that.share_title;
              
              //let _link = document.location.href + "&mid=" + data.info.uid;
            let _link = document.location.href;
            _link=that.fun.isMid(_link,data.info.uid);
      
            // let _imgUrl = (that.fun.isTextEmpty()) ? that.goodsInfo.thumb : that.goodsInfo.has_one_share.share_thumb;
            // let _desc = (that.fun.isTextEmpty()) ? data.shop.name : that.goodsInfo.has_one_share.share_desc;

            let _imgUrl=that.share_icon;
            let _desc=that.share_desc;


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
        }

    },
    activated() {
        this.share_title="";
        this.share_icon="";
        this.share_desc="";
        this.getShareData();
    },

    mounted(){
       this.getRule();
    },
    components: { cTitle }
};