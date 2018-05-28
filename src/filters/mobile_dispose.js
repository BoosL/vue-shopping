export const mobile_dispose = (value)=>{
	if(value){
		return value.substr(0, 3)+"****"+value.substr(7, value.length-1);
	}else{
		return "";
	}
	
}
