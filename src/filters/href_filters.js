
export const href_filters = (url)=>{
	if ((url == null) || (url == "") || (url == undefined)) {
		return "javascript:;";
	} 
	let host=document.location.host
	let mid=decodeURIComponent((new RegExp('[?|&]' + "mid" + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
	if(url.indexOf(host) >= 0)
	{
		
		return url+"&mid="+mid;
	}else{
		
		return url;
	}
}
