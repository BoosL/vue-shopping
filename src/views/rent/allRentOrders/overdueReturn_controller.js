import { Popup } from 'mint-ui';
import cTitle from 'components/title';

export default{
	components: { cTitle },
	data(){
		return{
			rental:false,
			deposit:false,
			zhong:false,
			overdues:false,
			returned:{
				day:"2",
				time:"16:56",
				name:"李天一",
				tel:"13234454546",
				addr:"广东省广州市白云区云霄路",
				startTim:"2017-05-02 00:00",
				endTim:"2018-07-04 00:00",
				day:"2",
				send:"10.00",
				rental:"22000.00",
				deposit:"1000.00",
				num:"10",
				color:"白色"
			},
			form: {
                userid: '',
                username:'',
                mobile: '',
           },
            overdueDes:[
            	{time:'时间',everyRent:'平均每日租金',deductions:"扣费",exerRent:"剩余押金"},
            	{time:'2017-05-05 21:00:33',everyRent:'¥30.00/天',deductions:"-¥30.00",exerRent:"¥900.00"},
            	{time:'2017-05-05 21:00:33',everyRent:'¥30.00/天',deductions:"-¥30.00",exerRent:"¥900.00"},
            	{time:'2017-05-05 21:00:33',everyRent:'¥30.00/天',deductions:"-¥30.00",exerRent:"¥900.00"}
            ]
		}
	},
	methods:{
		//租金
		rentalTip(){
			this.rental=!this.rental;
		},
		//押金
		depositTip(){
			this.deposit=!this.deposit;
		},
		//关闭
		closeModal(){
			this.rental=false;
			this.deposit=false;
			this.overdues=false;
		},
		//归还
		retu(){
			this.zhong=!this.zhong;
		},
		//逾期扣费说明
		overdue(){
			this.overdues=!this.overdues;
		},
		//说明详情
		extendOverdu(e){
			var extend =e.currentTarget.parentElement.nextElementSibling;
			if(e.currentTarget.className=="iconfont icon-down rt"){
				e.currentTarget.className="iconfont icon-right rt";
				extend.style.display="none";
			}else{
				e.currentTarget.className="iconfont icon-down rt";
				extend.style.display="block";
			}
			
		},
		//查看详情
		checkDetail(){
			var extend=document.getElementById("overdueReturn").getElementsByClassName("extendBox");
			extend[0].style.display="block";
			document.body.scrollTop=500;
			extend[0].previousElementSibling.children[1].className="iconfont icon-down rt";
		}
	},
	activated(){
		
	}
}