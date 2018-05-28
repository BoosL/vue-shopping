export const KeyWord = (keys,e)=>{
	if(e.indexOf(keys) > 0 )
	{
	    return keys;
	}else{
		return '过滤器';
	}
	
}