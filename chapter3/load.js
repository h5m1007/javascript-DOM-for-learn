ADS.addEvent(window, 'load', function(){
	ADS.addEvent('generate', 'click', function(){
		var source = ADS.$('source').value;
		ADS.$('result').value = generateDOM(source);
	});
});