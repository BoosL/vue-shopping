import { Indicator, Toast } from 'mint-ui';
import cTitle from '../../../components/title';

const IS_SUPPLIER = 3; //todo 已经成为，无需再申请
const REPEAT_APPLY = 2; //todo 已经提交申请，等待审核。
const VISIT_SUCCESS = 1; //todo 访问成功
export default {
    data() {
        return {
            o2o_status: "",
            o2o_info: "",
            applyModel: {
                username: "",
                password: "",
                realname: "",
                mobile: "",
            },
        }
    },

    activated() {
        this.getData();
    },
    mounted() {
    },

    methods: {
        //获取数据
        getData() {
            let that = this;
            let json = {};

            $http.get('plugin.store-cashier.frontend.store.store.verify-apply-status', json, "加载中...").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    that.o2o_status = response.data.status;
                    that.o2o_info = response.data.agreement;
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                console.log(response)
            });
        },

        //提交数据
        setApplyData() {

            console.log(this.applyModel);

            if (this.fun.isTextEmpty(this.applyModel.username)) {
                Toast("请填写账号");
                return;
            }

            if (this.fun.isTextEmpty(this.applyModel.password)) {
                Toast("请填写密码");
                return;
            }

            if (this.fun.isTextEmpty(this.applyModel.realname)) {
                Toast("请填写真实姓名");
                return;
            }

            if (this.fun.isTextEmpty(this.applyModel.mobile)) {
                Toast("请填写手机号码");
                return;
            }

            if (this.fun.isMoblie(this.applyModel.mobile)) {
                Toast("请输入正确的手机号");
                return;
            }

       


            let that = this;

            let json = { "apply": JSON.stringify(this.applyModel) };

            $http.get('plugin.store-cashier.frontend.store.store.apply', json, "提交中...").then(function (response) {
                console.log(response.data)
                if (response.result == 1) {
                    Toast(response.msg);
                    that.goHome();
                } else {
                    Toast(response.msg);
                }
            }, function (response) {
                console.log(response)
            });
        },

        //去商城
        goHome() {
            this.$router.push(this.fun.getUrl('home'));
        }
    },
    components: {cTitle}
}