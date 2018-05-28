import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default {
    data() {
        return {
            toi: this.fun.getKeyByI(),
            form:
            {
                refund_id:'',
                express_sn:'',
                express_company:'',
                "i": this.fun.getKeyByI(),
                 "type": this.fun.getTyep()
              
            },
           
            express: []
        };
    },
    methods: {
        // change(value){
        //     console.log(value);
        //     this.form.express_code = value.code;
        //     this.express_company_name = value.name;
        // },
        getExpressInfo() {
            var that = this;
            $http.get('dispatch.express-list',{"i": this.fun.getKeyByI(), "type": this.fun.getTyep()}).then(function (response) {

                if (response.result == 1) {


                    console.log(response.data);
                    var myData = response.data;
                    that.express = myData.express_companies;

                }
            }, function (response) {
                // error callback
            });
        },
        submitInfo()
        {
             var that = this;
     console.log(this.form.express_company);
      $http.get('refund.operation.send', {refund_id:this.form.refund_id,
                express_sn:this.form.express_sn,
                express_company_name:this.form.express_company.name,
                express_company_code:this.form.express_company.code,
                "i": this.fun.getKeyByI(),
                 "type": this.fun.getTyep()}, '正在提交申请').then(function (response) {
        if (response.result == 1) {

          MessageBox.alert(response.msg, '');
          that.$router.go(-1);

        } else {
          MessageBox.alert(response.msg);
        }
      }, function (response) {
        // error callback
      });

        }

    },
    activated() {
        this.toi = this.fun.getKeyByI();
        this.form.refund_id = this.$route.params.refund_id;
        this.getExpressInfo();

    },
    components: { cTitle }
};