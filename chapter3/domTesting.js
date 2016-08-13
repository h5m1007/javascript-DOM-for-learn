ADS.addEvent(window, 'load', function(){
	ADS.log.header('testNodeName');
	ADS.log.write('nodeName is: '
		+ document.getElementById('firefox').nodeName);
});

ADS.addEvent(window, 'load', function(){
	ADS.log.header('The node value of the anchor');
	ADS.log.write('nodeValue is: '
		+ document.getElementById('firefox').nodeValue);// nodeValue is:null
	if(document.getElementById('firefox').childNodes){
		ADS.log.write('nodeValue is: '
			+ document.getElementById('firefox').childNodes[0].nodeValue);
	}
});