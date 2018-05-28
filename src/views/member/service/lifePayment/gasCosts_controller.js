import cTitle from 'components/title';
import { Popup } from 'mint-ui';
import { Picker } from 'mint-ui';

export default{
	components:{cTitle},
	data(){
		return{
			language:{},
			popupVisible:false,
			company:'',
			
			score:600,
            scoreMoney:6.00,
            computedMoney:0.00,
            sourceMoney:0.00,
            useScore:false,

			slots: [
		        {
		          flex: 1,
		          values:["中国电费有限公司 1","中国电费有限公司 2","中国电费有限公司 3","中国电费有限公司 4","中国电费有限公司 5"],
		          className: 'slot1',
		          textAlign: 'right'
		        }
		    ]
		}
	},
	methods:{
		chooseCompony(){
			this.popupVisible=!this.popupVisible;
		},
		onValuesChange(picker, values) {
	      	picker.setSlotValue(1, values[0]);
	      	this.company=values[0];
	   },
	   cancle(){}
	},
	
	watch: {
	  	useScore:function(val){
			if(val){
				this.computedMoney=this.sourceMoney-this.scoreMoney;
				if(this.computedMoney<0){
					this.computedMoney=0;
				}
    		}else{
    			this.computedMoney=this.sourceMoney;
    		}
    	},
	},
	
}
