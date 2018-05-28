import cTitle from 'components/title';
export default {
    data() {
        return {
            toi: this.fun.getKeyByI(),
            sort2:true,
            sort: 10000,
            //我的推荐人
	
            avatar: '',
            level: '',
            nickname: '',
            uid: '',
            //我推荐的人
            my_agent: []

        }
    },
    methods: {
        toggle(event, n) {
        	if (this.sort2) {
        		this.sort = n;
        	} else{
        		this.sort = 9999;
        	}
        	this.sort2 = !this.sort2;
			
        },
        getNetData() {

            var that = this;
            $http.get('member.member.getMyRelation', {"i": this.fun.getKeyByI(), "type": this.fun.getTyep()}).then(function (response) {

                if (response.result == 1) {
                    var mydata = response.data;
                    that.my_agent = mydata.my_agent;
                    //我的推荐人
                    that.avatar = mydata.my_referral.avatar;
                    that.level = mydata.my_referral.level;
                    that.nickname = mydata.my_referral.nickname;
                    that.uid = mydata.my_referral.uid;

                }

            }, function (response) {
                // error callback
            });

        }
    },
    activated() {
        this.toi = this.fun.getKeyByI();
        this.getNetData();
    },
    components: { cTitle }
}