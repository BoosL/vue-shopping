import { Indicator, Toast } from 'mint-ui';
export default {
    data() {
        return {
            codes:[]
        }
    },


    activated() {
        this.getData();//初始化数据
    },


    methods: {

        //获取数据
        getData() {
            let that = this;
            $http.get('plugin.team-dividend.api.index.getCode', {},"获取中").then(function (response) {
                if (response.result == 1) {
                    that.codes=response.data.code;
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                Toast(response.msg);
            });
        },

        //返回
        goBack() {
            this.$router.go(-1);
        },

        //验证对话
        openDialog() {
            let that=this;
            this.$prompt('使用激活码', '', {
                title: '使用激活码',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                message: ' ',
                //inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                //inputErrorMessage: '激活码不正确'
                /*
                激活码升级等级比自身等级低时“您所在的等级高于激活等级，不能使用该激活码”
                使用者如果不是被发放者下线“提示您不可使用该激活码”
                */
            }).then(({ value }) => {
                that.verifyCode(value);//验证激活码
                // this.$message({
                //     type: 'success',
                //     message: '你的激活码是: ' + value
                // });
            })
        },

        //验证激活码
        verifyCode(value)
        {

            if(this.fun.isTextEmpty(value))
            {
                 Toast("请输入激活码");
                return; 
            }

            let that = this;
            let json ={code:value};
            $http.get('plugin.team-dividend.api.index.useCode', json,"激活中").then(function (response) {
                if (response.result == 1) {
                    that.getData();//重新获取数据
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                Toast(response.msg);
            });
        }
    }
}
