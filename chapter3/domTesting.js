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

ADS.addEvent(window, 'load', function(){
	ADS.log.header('Testing nodeType');
	if(document.getElementById('firefox').nodeType == ADS.node.ELEMENT_NODE) {
		ADS.log.write('nodeType is: '
			+ document.getElementById('firefox').nodeType);
	}
});

ADS.addEvent(window, 'load', function(){
	ADS.log.header('List child nodes of the document body');
	for( var i = 0; i < document.body.childNodes.length; i++){
		ADS.log.write(document.body.childNodes.item(i).nodeName);
	}
});

ADS.addEvent(window, 'load', function(){
	ADS.log.header('Testing Attributes');
	var firefoxAnchor = document.getElementById('firefox');
	for(var i = 0; i < firefoxAnchor.attributes.length; i++){
		ADS.log.write(
			firefoxAnchor.attributes.item(i).nodeName
			+ ' = '
			+ firefoxAnchor.attributes.item(i).nodeValue
		);
	}
	ADS.log.write(
		'指定获取href属性: '
		+ firefoxAnchor.attributes.getNamedItem('href').nodeName
	);
});

ADS.addEvent(window, 'load', function(){
	ADS.log.header('Attributes And childNodes');
	var h1 = document.getElementsByTagName('h1')[0];
	ADS.log.write(h1.nodeName);
	ADS.log.write(h1.nodeName + ' hasChildNodes: ' + h1.hasChildNodes());
	ADS.log.write(h1.nodeName + ' childNodes: ' + h1.childNodes);
	ADS.log.write(h1.nodeName + ' number of childNodes: ' + h1.childNodes.length);
	ADS.log.write(h1.nodeName + ' attributes: ' + h1.attributes);
	ADS.log.write(h1.nodeName + ' number of attributes: ' + h1.attributes.length);
	ADS.log.write(h1.nodeName + ' hasAttributes: ' + h1.hasAttributes());
});

ADS.addEvent(window, 'load', function(){
	ADS.log.header('Append Child');
	var newChild = document.createElement('li');
	newChild.appendChild(document.createTextNode('A new list item!'));
	var list = document.getElementById('browserList');
	list.appendChild(newChild);
});

ADS.addEvent(window, 'load', function(){
	ADS.log.header('Append Child');
	var newChild = document.createElement('li');
	newChild.appendChild(document.createTextNode('A new list item!'));
	var list = document.getElementById('browserList');
	list.insertBefore(newChild, list.lastChild);// 需考虑空白节点
});

ADS.addEvent(window, 'load', function(){
	ADS.log.header('Replace a node');
	var newChild = document.createElement('li');
	newChild .appendChild(document.createTextNode('A new list item!'));
	var firefoxLi = document.getElementById('firefoxListItem');
	// firefoxLi.parentNode.replaceChild(newChild, firefoxLi);
});

ADS.addEvent(window, 'load', function(){
	ADS.log.header('Remove a node');
	var firefoxLi = document.getElementById('firefoxListItem');
	// firefoxLi.parentNode.removeChild(firefoxLi);
});

ADS.addEvent(window, 'load', function(){
	ADS.log.header('Clone and Move a Node');
	var firefoxLi = document.getElementById('firefoxListItem');
	var firefoxLiClone = firefoxLi.cloneNode(true);// 取得节点的引用，并非副本
	var unorderedList = firefoxLi.parentNode;

	unorderedList.appendChild(firefoxLi);
	unorderedList.appendChild(firefoxLiClone);
});

