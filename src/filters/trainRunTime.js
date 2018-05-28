export const trainRunTime = (time)=>{
	if(time > 0 )
	{
		let h=parseInt(time/3600);
		//let m=(time-h*3600);
		let m=parseInt((time-h*3600)/60);
	    return h+"时"+m+"分"
	}else{
		return '--';
	}
	
}