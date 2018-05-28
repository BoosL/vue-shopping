import { Field, Button } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import {CheckBox, CheckBoxGroup} from 'vue-ydui/dist/lib.px/checkbox'; 
import cTitle from 'components/title';
//diy--------diy
import District from 'ydui-district/dist/gov_province_city_area_id';
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//diy--------diy

export default {
    data() {
        return {
            protocol_content:"",
            show2:false,

            agreementStatus: false,
            agreementCB: true,

            start1: false,
            form: {
                country:'86',
                mobile: '',
                mobileErr: '',
                password: '',
                passwordErr: '',
                confirm_password: '',
                confirm_passwordErr: ''

            },

            //diy--------diy
            diyStatus: 0,
            form_id: "",
            pickerValue: '2017-09-27',
            showCity: false,
            district: District,
            currentDateKey: '',
            currentCityKey: '',
            checks: [],
            isValidation: true,
            diyform: {},
            diydata: [],
            types: {
                "0": 'diyinput',
                "1": 'diytextarea',
                "3": 'diycheckbox',
                "4": 'diyradio',
                "2": 'diyselect',
                "7": 'diydate',
                "9": 'diycity',
            },
            //diy--------diy
        }
    },


    mounted() {

    },

    methods: {

        init() {
            this.agreementCB = true;

            this.start1 = false;
            this.form = {
                country:'86',
                mobile: '',
                mobileErr: '',
                password: '',
                passwordErr: '',
                confirm_password: '',
                confirm_passwordErr: ''
            };


            this.diyStatus = 0;
            this.form_id = "";
            this.pickerValue = '2017-09-27';
            this.showCity = false;

            this.currentDateKey = '';
            this.currentCityKey = '';
            this.checks = [];
            this.isValidation = true;
            this.diyform = {};
            this.diydata = [];

            this.show2=false;
        },


        //获取是否开启协议
        getProtocolStatus() {
            var that = this;
            $http.get('setting.get-member-protocol', {}).then((response) => {
                if (response.result == 1) {
                    that.agreementStatus = response.data.protocol == "0" ? false : true;
                    that.protocol_content=response.data.content;
                } else {
                    that.agreementStatus = false;
                }
            }, (response) => {
                console.log(response.msg);
                that.agreementStatus = false;
            });

        },


        //获取diy 状态信息
        getDiyFormStatus() {
            var that = this;
            $http.get('setting.get-register-diy-form', {}).then((response) => {
                if (response.result == 1) {
                    if (response.data.status == 1) {
                        that.diyStatus = 1;
                        that.form_id = response.data.form_id;
                        that.getDiyFormInfo(response.data.form_id);
                    } else {
                        that.diyStatus = 0;
                    }
                } else {
                    that.diyStatus = 0;
                }
            }, (response) => {
                console.log(response.msg);
                that.diyStatus = 0;
            });
        },


        //获取diy 信息
        getDiyFormInfo(id) {
            var that = this;
            $http.get('plugin.diyform.api.diy-form.get-diy-form-by-id', { form_id: id }).then((response) => {
                if (response.result == 1) {
                    that.diyform = response.data;
                    var fields = that.diyform.fields;
                    for (var field in fields) {
                        if (that.types[fields[field].data_type] == 'diycheckbox') {
                            var f = {
                                name: field,
                                data: fields[field],
                                value: [],
                                type: that.types[fields[field].data_type],
                            }
                        } else if (that.types[fields[field].data_type] == 'diydate') {
                            var f = {
                                name: field,
                                data: fields[field],
                                value: '',
                                type: that.types[fields[field].data_type],
                            }

                        } else {
                            var f = {
                                name: field,
                                data: fields[field],
                                value: '',
                                type: that.types[fields[field].data_type],
                            }
                        }

                        that.diydata.push(f);
                    }

                } else {

                }
            }, (response) => {
                console.log(response.msg);

            });
        },




        //发送验证码
        verificationCode() {
            let that = this;
            if (this.fun.isTextEmpty(this.form.country)) {
                this.$dialog.toast({
                    mes: '请输入国际区号',
                    timeout: 1500
                });
                return;
            }
            if (this.fun.isTextEmpty(this.form.mobile)) {
                this.$dialog.toast({
                    mes: '请填写手机号',
                    timeout: 1500
                });
                return;
            }

            if (this.form.country=="86"&&this.fun.isMoblie(this.form.mobile)) {
                this.$dialog.toast({
                    mes: '请填写正确的手机号',
                    timeout: 1500
                });
                return;
            }

            this.$dialog.loading.open('发送中...');
            //发送获取验证码的请求
            $http.get('member.register.sendCodeV2', { mobile: this.form.mobile ,state:this.form.country}).then((response) => {
                this.$dialog.loading.close();
                if (response.result == 1) {
                    that.sendCodeAnimation();
                } else {
                    this.$dialog.toast({
                        mes: response.msg,
                        timeout: 1500
                    });
                }
            }, (response) => {
                console.log(response.msg)
            });
        },

        //发送验证码 倒计时
        sendCodeAnimation() {

            setTimeout(() => {
                this.start1 = true;
                this.$dialog.loading.close();
                this.$dialog.toast({
                    mes: '已发送',
                    icon: 'success',
                    timeout: 1500
                });
            }, 1000);
        },

        //跳转
        login() {
            this.$router.push(this.fun.getUrl('login'));
        },

        goAgreement(){
            this.show2=true;
            //this.$router.push(this.fun.getUrl('registerAgreement', {}));
        },

        //注册
        register() {
            let that=this;

            if (this.diyStatus == 1) {
                this.validation();

                if (!this.isValidation) {
                    return;
                }
            }

            if (this.fun.isTextEmpty(this.form.country)) {
                this.$dialog.toast({
                    mes: '请输入国际区号',
                    timeout: 1500
                });
                return;
            }

            if (this.fun.isTextEmpty(this.form.mobile)) {
                this.$dialog.toast({
                    mes: '请填写手机号',
                    timeout: 1500
                });
                return;
            }

            if (this.form.country=="86"&&this.fun.isMoblie(this.form.mobile)) {
                this.$dialog.toast({
                    mes: '请填写正确的手机号',
                    timeout: 1500
                });
                return;
            }

            if (this.fun.isTextEmpty(this.form.code)) {
                this.$dialog.toast({
                    mes: '请填验证码',
                    timeout: 1500
                });
                return;
            }

            if (this.fun.isTextEmpty(this.form.password)) {
                this.$dialog.toast({
                    mes: '请填写密码',
                    timeout: 1500
                });
                return;
            }

            if (this.fun.isTextEmpty(this.form.password)) {
                this.$dialog.toast({
                    mes: '请填写确认密码',
                    timeout: 1500
                });
                return;
            }

            if (this.form.password != this.form.confirm_password) {
                this.$dialog.toast({
                    mes: '两次密码不一致',
                    timeout: 1500
                });
                return;

            }


            if(this.agreementStatus)
            {
                if(!this.agreementCB)
                {
                    this.$dialog.toast({
                        mes: '请同意注册协议',
                        timeout: 1500
                    });
                    return;
                }  
            }

            $http.post('member.register.index', this.form, "提交中...").then((response) => {

                if (response.result == 1) {
                    let member_id = response.data.member_id;
                    this.$store.commit('savemodel', response.data);
                    window.localStorage.myuserinfo = response.data;
                    this.$store.commit('savemodel', response.data);
                    if (this.diyStatus == 0) {
                        this.$dialog.alert({
                            mes: "注册成功",
                            callback: () => {
                                
                            }

                        });
                        that.$router.push(this.fun.getUrl('login'));
                    } else if (this.diyStatus == 1) {
                        //去提交diy
                        this.postDiy(member_id);
                    }


                } else {
                    this.$dialog.alert({ mes: response.msg });
                }
            }, (response) => {
                this.$dialog.alert({ mes: response.msg });
            });
        },



        //diy--------diy


        postDiy(member_id) {

            var that = this;
            var formData = [];
            var formObject = {};
            this.diydata.forEach(item => {
                formObject[item.name] = item.value;
            });
            formData.push(formObject);


            let json = { form_data: formData, form_id: this.form_id, "member_id": member_id, "form_type": "register" };
            $http.post('plugin.diyform.api.diy-form.save-diy-form-data', json, "提交中...").then((response) => {

                if (response.result == 1) {
                    this.$dialog.alert({
                        mes: "注册成功",
                        callback: () => {
                            
                        }

                    });
                    that.$router.push(this.fun.getUrl('login'));
                } else {
                    this.$dialog.alert({ mes: response.msg });
                }
            }, (response) => {
                this.$dialog.alert({ mes: response.msg });
            });
        },


        setCity(ret) {
            var retCity = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
            console.log('retCity', retCity);
            console.log('currentCityKey', this.currentCityKey);
            this.diydata.forEach(item => {
                if (item.name == this.currentCityKey) {
                    this.$set(item, 'value', retCity);
                }
            });
        },
        openPicker(name) {
            this.currentDateKey = name;
            console.log('name', name);
            this.$refs.picker.open();
        },
        setDate(ret) {
            console.log(ret.Format("yyyy-MM-dd"));
            this.diydata.forEach(item => {
                if (item.name == this.currentDateKey) {
                    this.$set(item, 'value', ret.Format("yyyy-MM-dd"));
                }
            });
        },
        openCity(name) {
            this.currentCityKey = name;
        },

        //验证参数
        validation() {
            this.isValidation = true;
            this.diydata.forEach(item => {
                if (item.data.tp_must == 1 && !item.value) {
                    console.log(item.data.tp_name, item.value);
                    this.$dialog.toast({
                        mes: item.data.tp_name + '必须填写哦',
                        timeout: 1500,
                        icon: 'error',
                        callback: () => {
                            //console.log('我走咯！');
                        }
                    });

                    this.isValidation = false;
                }

                if (item.type == 'diycheckbox' && item.value.length == 0) {
                    console.log(item.data.tp_name, item.value);
                    this.$dialog.toast({
                        mes: item.data.tp_name + '必须选择哦',
                        timeout: 1500,
                        icon: 'error',
                        callback: () => {
                            //console.log('我走咯！');
                        }
                    });
                    this.isValidation = false;
                }
            });
        },
        //diy--------diy

        popClose(){
            this.show2=false;
        },
    },
    activated() {
        //console.log(this.$route.params.object_id);
        this.init();
        this.getDiyFormStatus();
        this.getProtocolStatus();
    },

    components: { cTitle,   CheckBox }


}