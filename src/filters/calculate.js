export const calculate = (value)=>{
	if(value){
		if(value<=0)
		{
			return 0.00;
		}else{
			return value.toFixed(2);
		}
	}else{
		return "0.00";
	}
	
}
