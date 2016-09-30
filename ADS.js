// 向js的string对象原型添加新方法

// 重复一个字符串
if(!String.repeat){
	String.prototype.repeat = function(l){
		// 按给定的次数(l)，重复字符串
		return new Array(l+1).join(this);
	}
}

// 清除结尾和开头处的空白符
if(!String.trim){
	String.prototype.trim = function(){
		return this.replace(/^\s+|\s+$/g, '');
	}
}

// 自定义js库
(function(){
	// ADS命名空间
	if(!window.ADS){
		window['ADS'] = {};
	}

	function isCompatible(other){
		// 判断当前浏览器是否与该库兼容
		if(other === false
			|| !Array.prototype.push
			|| !Object.hasOwnProperty
			|| !document.createElement
			|| !document.getElementsByTagName){
			return false;
		}
		return true;
	};
	window['ADS']['isCompatible'] = isCompatible;

	function $(){
		var elements = new Array();
		for (var i = 0; i < arguments.length; i++){
			// arguments标识符 引用形参
			// arguments[0]表示第一个参数
			// 用于未知fn参数个数
			var element = arguments[i];

			// 如果参数是字符串
			if(typeof element == 'string'){
				element = document.getElementById(element);
            	// console.log(element.innerHTML);
			}

			// 如果只提供一个参数 则返回这个元素
			if(arguments.length == 1){
				return element;
			}

			// 否则添加于数组中
			elements.push(element);

		}
		// 返回包含多个被请求元素的数组
		return elements;

	};
	window['ADS']['$'] = $;

	function addEvent(node, type, listener){
		// 使用前面的方法检查兼容性以保证平稳退化
		if(!isCompatible()){
			return false;
		}

		if(!(node = $(node))){
			return false;
		}

		if(node.addEventListener){
			// for W3C
			node.addEventListener(type, listener, false);// 参数false表明在冒泡阶段
			return true;
		}else if(node.attachEvent){
			// for MSIE
			node['e' + type + listener] = listener;
			node[type + listener] = function(){
				node['e' + type + listener](window.event);
			}
			node.attachEvent('on' + type, node[type + listener]);
			return true;
		}

		return false;

	};
	window['ADS']['addEvent'] = addEvent;

	function removeEvent(node, type, listener){
		if(!(node = $(node))){
			return false;
		}

		if(node.removeEventListener){
			// for W3C
			node.removeEventListener(type, listener, false);
			return true;
		}else if(node.detachEvent){
			// for MSIE
			node.detachEvent('on' + type, node[type + listener]);
			node[type + listener] = null;
			return true;
		}

		return false;
	};
	window['ADS']['removeEvent'] = removeEvent;

	function getElementsByClassName(className, tag, parent){
		parent = parent || document;
		if(!(parent = $(parent))){
			return false;
		}

		// 查找所有匹配的标签
		var allTags = (tag == "*" && parent.all) ? parent.all : parent.getElementsByTagName(tag);
		var matchingElements = new Array();

		// 创建正则来判断className是否正确
		className = className.replace(/\-/g, "\\-");
		var regex = new RegExp("(^|\\s)" + className + "(\\s|$)");

		var element;
		// 检查每个元素
		for(var i = 0; i < allTags.length; i++){
			element = allTags[i];
			if(regex.test(element.className)){
				matchingElements.push(element);
			}
		}

		// 返回所有匹配的元素
		return matchingElements;
	};
	window['ADS']['getElementsByClassName'] = getElementsByClassName;

	function toggleDisplay(node, value){
		if(!(node = $(node))){
			return false;
		}

		if(node.style.display != 'none'){
			node.style.display = 'none';
		}else{
			node.style.display = value || '';
		}

		return true;
	};
	window['ADS']['toggleDisplay'] = toggleDisplay;

	function insertAfter(node, referenceNode){
		// 向后插入新子节点
		if(!(node = $(node))){
			return false;
		}

		if(!(referenceNode = $(referenceNode))){
			return false;
		}

		return referenceNode.parentNode.insertBefore(
			node, referenceNode.nextSibling);
	};
	window['ADS']['insertAfter'] = insertAfter;

	function removeChildren(parent){
		if(!(parent = $(parent))){
			return false;
		}

		while(parent.firstChild){
			parent.firstChild.parentNode.removeChild(parent.firstChild);
		}

		// 返回父节点，以便实现方法的连缀
		return parent;
	};
	window['ADS']['removeChildren'] = removeChildren;

	function prependChild(parent, newChild){
		// 向前插入新子节点
		if(!(parent = $(parent))){
			return false;
		}

		if(!(newChild = $(newChild))){
			return false;
		}

		if(parent.firstChild){
			parent.insertBefore(newChild, parent.firstChild);
		}else{
			parent.appendChild(newChild);
		}

		return parent;
	}
	window['ADS']['prependChild'] = prependChild;

	function bindFunction(obj, func){
		return function(){
			// 返回匿名函数
			// 函数.apply(环境,参数)，改变函数的执行环境
			func.apply(obj, arguments);
		};
	};
	window['ADS']['bindFunction'] = bindFunction;

	function getBrowserWindowSize(){
		var de = document.documentElement;
		return {
			'width': (
				// .innerWidth包括窗口宽度和滚动条
				// 在IE下并不支持该属性
				window.innerWidth
				// .clientWidth窗口可视区域，只包括元素宽度
				// 在IE下支持
				|| (de && de.clientWidth)
				|| document.body.clientWidth
			),
			'height': (
				window.innerHeight
				|| (de && de.clientHeight)
				|| document.body.clientHeight
			)
		}
	};
	window['ADS']['getBrowserWindowSize'] = getBrowserWindowSize;

	// DOM常量
	// 节点类型nodeType = 1表示 ELEMENT_NODE
	window['ADS']['node'] = {
		ELEMENT_NODE	            : 1,
		ATTRIBUTE_NODE	            : 2,
		TEXT_NODE		            : 3,
		CDATA_SECTION_NODE	        : 4,
		ENTITY_REFERENCE_NODE	    : 5,
		ENTITY_NODE                 : 6,
		PROCESSING_INSTRUCTION_NODE	: 7,
		COMMENT_NODE	            : 8,
		DOCUMENT_NODE	            : 9,
		DOCUMENT_TYPE_NODE	        : 10,
		DOCUMENT_FRAGMENT_NODE	    : 11,
		NOTATION_NODE	            : 12
	}

	// 创建递归(爬树tree-walking)
	// 进行遍历且在每个节点执行一个匿名函数的调用
	function walkElementsLinear(func, node){
		var root = node || window.document;
		var nodes = root.getElementsByTagName("*");
		for(var i = 0; i < nodes.length; i++){
			func.call(nodes[i]);
		}
	}

	// 创建递归，跟踪节点的深度或构建一个路经
	function walkTheDOMRecursive(func, node, depth, returnedFromParent){
		var root = node || window.document;
		var returnedFromParent = func.call(root, depth++, returnedFromParent);
		var node = root.firstChild;
		while(node){
			// 处理root的子节点
			walkTheDOMRecursive(func, node, depth, returnedFromParent);
			node = node.nextSibling;
		}
	}
	window['ADS']['walkTheDOMRecursive'] = walkTheDOMRecursive;

	// 查找每个节点的属性
	function walkTheDOMWithAttributes(node, func, depth, returnedFromParent){
		var root = node || window.document;
		returnedFromParent = func(root, depth++, returnedFromParent);
		if(root.attributes){
			for(var i = 0; i < root.attributes.length; i++){
				walkTheDOMWithAttributes(root.attributes[i],
					func, depth-1, returnedFromParent);
			}
		}
		if(root.nodeType != ADS.node.ATTRIBUTE_NODE){
			node = root.firstChild;
			while(node){
				walkTheDOMWithAttributes(node, func, depth, returnedFromParent);
				node = node.nextSibling;
			}
		}
	}

	/* 例：把word-word转换为wordWord */
	// 主要处理嵌入的样式属性
	function camelize(s){
		return s.replace(/-(\w)/g, function(strMatch, p1){
			return p1.toUpperCase();
		});
	};
	window['ADS']['camelize'] = camelize;

	// wordWord转换为word-word
	function uncamelize(s, sep){
		sep = sep || '-';
		return s.replace(/([a-z])([A-Z])/g, function(strMatch, p1, p2){
			return p1 + sep + p2.toLowerCase();
		});
	}
	window['ADS']['uncamelize'] = uncamelize;

	// 取得事件对象
	function getEventObject(e){
		// window.event: IE8之前版本IE获得event方式
		return e || window.event;
	}
	window['ADS']['getEventObject'] = getEventObject;

	// 阻止事件冒泡
	function stopPropagation(eventObject){
		eventObject = eventObject || getEventObject(eventObject);
		if(eventObject.stopPropagation){
			eventObject.stopPropagation();
		} else{
			// 在IE下
			// 设e.cancelBubble为true
			// 开启阻止事件冒泡
			eventObject.cancelBubble = true;
		}
	}
	window['ADS']['stopPropagation'] = stopPropagation;

	// 阻止事件默认行为
	function preventDefault(eventObject){
		eventObject = eventObject || getEventObject(eventObject);
		if(eventObject.preventDefault){
			eventObject.preventDefault();
		}else{
			// 在IE下
			// 设e.returnValue为false
			// 开启阻止事件默认行为
			eventObject.returnValue = false;
		}
	}
	window['ADS']['preventDefault'] = preventDefault;

	// 处理window.load的情况下
	// 存在大文件如标记中嵌入的img元素待加载
	// load事件需等所有图像载入完成从被调用的问题
	function addLoadEvent(loadEvent, waitForImages){
		if(!isCompatible()) return false;

		// 当第二个参数设为true
		// 则调用原始addEvent方法
		if(waitForImages){
			return addEvent(window, 'load', loadEvent);
		}

		// 否则使用另外的方式包装loadEvent()
		// 使得this指向正确的内容且确保事件不会被执行两遍
		var init = function(){
			// 如果这个函数已经被调用过则返回
			// arguments.callee 指向该函数本身
			if(arguments.callee.done) return;

			// 标记这个函数以便检验它是否运行过
			arguments.callee.done = true;

			// 在document环境中运行载入事件
			// 这里的arguments
			// 指向loadEvent方法的未知参数表
			loadEvent.apply(document, arguments);
		};

		// 为DOMContentLoaded事件注册事件侦听器
		if(document.addEventListener){
			document.addEventListener("DOMContentLoaded", init, false);
		}

		// 对于Safari，使用setInterval()函数检测
		// document是否载入完成
		if(/Webkit/i.test(navigator.userAgent)){
			var _timer = setInterval(function(){
				if(/loaded|complete/.test(document.readyState)){
					clearInterval(_timer);
					init();
				}
			},10);
		}

		// 对于IE则使用条件注释
		// 附加一个在载入过程最后执行的脚本
		// 并检测该脚本是否载入完成
		/*@cc_on @*/
		/*@if (@_win32)
		document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
		var script = document.getElementById("__ie_onload");
		script.onreadystatechange = function(){
			if(this.readyState == "complete"){
				init();
			}
		};
		/*@end @*/
		return true;
	}
	window['ADS']['addLoadEvent'] = addLoadEvent;

	// 兼容各浏览器，获取真正的目标对象
	function getTarget(eventObject){
		eventObject = eventObject || getEventObject(eventObject);

		// 如果是W3C标准模型或IE
		// DOM2规范下 e.target获取事件作用的元素对象
		// IE下 e.srcElement获取事件作用的元素对象
		var target = eventObject.target || eventObject.srcElement;

		// 如果是Safari中，它的目标对象为文本节点
		// 那么重新将目标对象指定为它的父元素
		if(target.nodeType == ADS.node.TEXT_NODE){
			target = node.parentNode;
		}

		return target;
	}
	window['ADS']['getTarget'] = getTarget;

	// 兼容各浏览器，获取真正的鼠标点击
	function getMouseButton(eventObject){
		eventObject = eventObject || getEventObject(eventObject);

		// 使用适当的属性初始化一个对象变量
		var buttons = {
			'left': false,
			'middle': false,
			'right': false
		};

		// 检查eventObject对象的toString()方法的值
		// W3C DOM对象有toString()方法
		// 且返回值为MouseEvent
		if(eventObject.toString && eventObject.toString().indexOf('MouseEvent') != -1){
			// W3C方式
			switch(eventObject.button){
				case 0:
					buttons.left = true;
				break;
				case 1:
					buttons.middle = true;
				break;
				case 2:
					buttons.right = true;
				break;
				default:
					break;
			}
		} else if(eventObject.button){
			// IE方式
			switch(eventObject.button){
				case 1:
					buttons.left = true;
				break;
				case 2:
					buttons.right = true;
				break;
				case 3:
					buttons.left = true;
					buttons.right = true;
				break;
				case 4:
					buttons.middle = true;
				break;
				case 5:
					buttons.left = true;
					buttons.middle = true;
				break;
				case 6:
					buttons.middle = true;
					buttons.right = true;
				break;
				case 7:
					buttons.left = true;
					buttons.middle = true;
					buttons.right = true;
				break;
				default: break;
			}
		} else {
			return false;
		}

		return buttons;
	}
	window['ADS']['getMouseButton'] = getMouseButton;

	// 兼容各浏览器，获取真正光标相对于文档的坐标位置
	function getPointerPositionInDocument(eventObject){
		eventObject = eventObject || getEventObject(eventObject);

		var x = eventObject.pageX || (eventObject.clientX
			+ (document.documentElement.scrollLeft
				|| document.body.scrollLeft));
		var y = eventObject.pageY || (eventObject.clientY
			+ (document.documentElement.scrolltop
				|| document.documentElement.scrolltop));
		// 现在x和y中都包含着鼠标
		// 相对于文档原点坐标
		return {
			'x': x,
			'y': y
		};
	}
	window['ADS']['getPointerPositionInDocument'] = getPointerPositionInDocument;

	// 获得键盘按键代码和对应的ASCII值
	function getKeyPressed(eventObject){
		eventObject = eventObject || getEventObject(eventObject);

		var code = eventObject.keyCode;
		var value = String.fromCharCode(code);
		return {
			'code': code,
			'value': value
		};
	}
	window['ADS']['getKeyPressed'] = getKeyPressed;

	// 通过ID修改单个元素的样式
	function setStyleById(element, styles){
		// 取得对象的引用
		if(!(element = $(element))) return false;
		// 循环遍历styles对象并应用每个属性
		for(property in styles){
			if(!styles.hasOwnProperty(property)) continue;

			if(element.style.setProperty){
				// DOM2支持setProperty
				element.style.setProperty(
					uncamelize(property, '-'),
					styles[property],
					null
				);
			} else {
				// 备用方法(IE支持)
				element.style[camelize(property)] = styles[property];
			}
		}
		return true;
	}
	window['ADS']['setStyle'] = setStyleById;
	window['ADS']['setStyleById'] = setStyleById;

	// 通过类名修改多个元素的样式
	function setStylesByClassName(parent, tag, className, styles){
		if(!(parent = $(parent))) return false;
		var elements = getElementsByClassName(className, tag, parent);
		for(var e = 0; e < elements.length; e++){
			setStyleById(elements[e], styles);
		}
		return true;
	}
	window['ADS']['setStylesByClassName'] = setStylesByClassName;

	// 通过标签名修改多个元素的样式
	function setStylesByTagName(tagname, styles, parent){
		parent = $(parent) || document;
		var elements = parent.getElementsByTagName(tagname);
		for(var e = 0; e < elements.length; e++){
			setStyleById(elements[e], styles);
		}
	}
	window['ADS']['setStylesByTagName'] = setStylesByTagName;

	// 取得包含元素类名的数组
	function getClassName(element){
		if(!(element = $(element))) return false;

		// 用一个空格替换多个空格
		// 且以空格分割类名
		return (element.className.replace(/\s+/,' ').split(' '));
	};
	window['ADS']['getClassName'] = getClassName;

	// 检查元素内是否存在某个类
	function hasClassName(element, className){
		if(!(element = $(element))) return false;

		var classes = getClassName(element);
		for(var i = 0; i < classes.length; i++){
			// 检测className是否匹配
			if(classes[i] === className) {
				return true;
			}
		}
		return false;
	}
	window['ADS']['hasClassName'] = hasClassName;

	// 为元素添加类
	function addClassName(element, className){
		if(!(element = $(element))) return false;

		// 将类名添加到当前className的末尾
		// 如果没有className则不包含空格
		element.className += (element.className ? ' ' : '') + className;
		return true;
	}
	window['ADS']['addClassName'] = addClassName;

	// 从元素中删除类
	function removeClassName(element, className){
		if(!(element = $(element))) return false;

		var classes = getClassName(element);
		var length = classes.length;

		// 循环遍历数组
		// 删除匹配项
		// 因删除数组会变短，则反向循环
		for(var i = length - 1; i > 0; i--){
			if(classes[i] === className) {
				delete(classes[i]);
			}
		}

		// .join(' ') 以空格分割数组并返回字符串
		element.className = classes.join(' ');
		return (length == classes.length ? false : true);
	};
	window['ADS']['removeClassName'] = removeClassName;

	// 添加新样式表
	function addStyleSheet(url, media){
		media = media || 'screen';
		var link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('type', 'text/css');
		link.setAttribute('href', url);
		link.setAttribute('media', media);
		document.getElementsByTagName('head')[0].appendChild(link);
	}
	window['ADS']['addStyleSheet'] = addStyleSheet;

	// 通过url取得包含所有样式表的数组
	function getStyleSheets(url, media){
		var sheets = [];
		for(var i = 0; i < document.styleSheets.length; i++){
			if(url && document.styleSheets[i].href.indexOf(url) == -1){
				continue;
			}

			if(media){
				// 规范化media字符串
				media = media.replace(/,\s*/,',');
				var sheetMedia;

				if(document.styleSheets[i].media.mediaText){
					// DOM方法
					sheetMedia = document.styleSheets[i].media.mediaText.replace(/,\s*/,',');
					// Safari会添加额外的逗号和空格
					// 把以上处理好的sheetMedia再加工去掉额外的
					sheetMedia = sheetMedia.replace(/,\s*$/,'');
				} else {
					// IE方法
					sheetMedia = document.styleSheets[i].media.replace(/,\s*/,',');
				}

				// 如果指定的media
				// 与加工处理的sheetMedia不匹配的话
				// 则中断循环
				if(media != sheetMedia) continue;
			}

			sheets.push(document.styleSheets[i]);
		}
		return sheets;
	}
	window['ADS']['getStyleSheets'] = getStyleSheets;

	// 移除样式表
	function removeStyleSheet(url, media){
		var styles = getStyleSheets(url, media);
		for(var i = 0; i < styles.length; i++){
			var node = styles[i].ownerNode || styles[i].owningElement;
			// 禁用样式表
			styles[i].disabled = true;
			// 移除节点
			node.parentNode.removeChild(node);
		}
	}
	window['ADS']['removeStyleSheet'] = removeStyleSheet;

	// 修改已有样式规则
	function editCSSRule(selector, styles, url, media){
		var styleSheets = (typeof url == 'array' ? url : getStyleSheets(url, media));
		for(var i = 0; i < styleSheets.length; i++){
			// 取得规则列表
			// DOM2样式规范方法是styleSheets[i].cssRules
			// IE方法是styleSheets[i].rules
			var rules = styleSheets[i].cssRules || styleSheets[i].rules;
			if(!rules) {continue};

			// IE默认使用大写
			selector = selector.toUpperCase();

			for(var j = 0; j < rules.length; j++){
				// 检查是否匹配
				if(rules[j].selectorText.toUpperCase() == selector){
					for(property in styles){
						if(!styles.hasOwnProperty(property)) {
							// 参数样式表中没有该属性
							// 则中断循环
							continue;
						}
						// 设置新样式属性
						rules[j].style[camelize(property)] = styles[property];
					}
				}
			}
		}
	}
	window['ADS']['editCSSRule'] = editCSSRule;

	// 添加一条规则
	function addCSSRule(selector, styles, index, url, media){
		var declaration = '';

		// 根据styles参数构建声明字符串
		for(property in styles){
			if(!styles.hasOwnProperty(property)){
				continue;
			}
			declaration += property + ':' + styles[property] + '; ';
		}

		var styleSheets = (typeof url == 'array' ? url : getStyleSheets(url, media));
		var newIndex;
		for(var i = 0; i < styleSheets.length; i++){
			// 添加规则
			if(styleSheets[i].insertRule){
				// DOM2样式规范方法
				// 当index = length表示位于列表末尾
				newIndex = (index >= 0 ? index : styleSheets[i].cssRules.length);
				styleSheets[i].insertRule(
					selector + ' { ' + declaration + ' } ',
					newIndex
				);
			} else if(styleSheets[i].addRule){
				// IE方法
				// index = -1 表示在列表末尾
				newIndex = (index > 0 ? index : -1);
				styleSheets[i].addRule(
					selector,
					declaration,
					newIndex
				);
			}
		}
	}
	window['ADS']['addCSSRule'] = addCSSRule;

	// 取得某元素已存在的行内样式值
	// 或在样式表中的样式值
	function getStyle(element, property){
		if(!(element = $(element)) || !property) return false;

		// 试着从行内获取对应的样式值
		var value = element.style[camelize(property)];

		// 如果行内不存在该样式
		// 那就调用document.defaultView.getComputedStyle(ele)
		// 或在IE下使用element.currentStyle.property
		// 获取样式表中对应的样式值
		if(!value){
			if(document.defaultView && document.defaultView.getComputedStyle){
				// DOM方式
				var css = document.defaultView.getComputedStyle(element, null);
				value = css ? css.getPropertyValue(property) : null;
			} else if(element.currentStyle){
				// IE方式
				value = element.currentStyle[camelize(property)];
			}
		}

		return value == 'auto' ? '' : value;
	}
	window['ADS']['getStyle'] = getStyle;
	window['ADS']['getStyleById'] = getStyle;

})();