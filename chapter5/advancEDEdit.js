function replaceImage(element){
	var element = ADS.$(element);
	var image = document.createElement('img');

	// 图像载入后添加span和类名
	ADS.addEvent(image, 'load', function(){
		var s = document.createElement('span');
		// 将span添加为元素的子元素;
		ADS.prependChild(element, s);

		if(!element.getAttribute('title')){
			var i, child;
			var title = '';

			// 循环遍历子元素以组合title属性
			for(i = 0; child = element.childNode[i]; i++){
				if(child.nodeValue){
					title += child.nodeValue;
				}
			}
			element.setAttribute('title', title);
		}

		// 修改类名表示已变更且应用css
		ADS.addClassName(element, 'advancED');
	});

	// 载入图像
	var styleSheet = ADS.getStyleSheets('advancED.css')[0];
	if(!styleSheet) return;

	// 在DOM2规范下 cssRules
	// 在IE下 rules
	var list = styleSheet.cssRules || styleSheet.rules;
	if(!list) return;

	var rule;
	for(var j = 0; rule = list[j]; j++){
		// 规则的selectorText属性不同
		// 在IE下 .advancED#element-id SPAN
		// element-id传参元素的id
		if(
			rule.selectorText.indexOf('#'
				+ element.getAttribute('id')) != -1
			&& rule.selectorText.indexOf('.advancED') != -1
			&& rule.selectorText.toUpperCase().indexOf('span') != -1
		){
			// 使用正则/url\(([^\)]+)\)/
			// 在css规则中查找url
			var matches = rule.style.cssText.match(/url\(([^\)]+)\)/);
			if(matches[1]){
				image.src = matches[1];
				break;
			}
		}
	}
}