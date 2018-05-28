export const trainMinPirce = (pirces) => {
	console.log("pirces", pirces);

	if(pirces==null||pirces==''||pirces==undefined)
		{
			return '--';
		}

	if (pirces.length > 0) {

		pirces = pirces.sort(function (a, b) {
			return a.seatPrice - b.seatPrice;
		});
		return pirces[0].seatPrice;
	} else {
		return '--';
	}

}