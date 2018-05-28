
export default {
    state: {//true

        member_model: '',
        avatar:'',
        createtime:'',
        //余额
        credit1:'',
        credit2:'',
        gender:'',
        group_id:'',
        group_name:'',
        //下线
        has_one_fans:'',
        level_id:'',
        //等级名称
        level_name:'',
        //手机号
        mobile:'',
        //昵称
        nickname:'',
        //真实姓名
        realname:'',
        //会员id
        uid:'',
        yz_member:''
    },
mutations: {
    savemodel(state, model) {
        state.member_model = model;
        state.avatar = model.avatar;
        state.createtime = model.createtime;
        state.credit1 = model.credit1;
        state.credit2 = model.credit2;
        state.gender = model.gender;
        state.group_id = model.group_id;
        state.group_name = model.group_name;
        state.has_one_fans = model.has_one_fans;
        state.level_id = model.level_id;
        state.level_name = model.level_name;
        state.mobile = model.mobile;
        state.nickname = model.nickname;
        state.realname = model.realname;
        state.uid = model.uid;
        state.yz_member = model.yz_member;


    },
    updateinfo(state,param)
    {
        state.mobile = param.mobile;

    }
},
actions: { },
getters: { }

}




