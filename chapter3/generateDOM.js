/* generateDOM对象的新命名空间 */

(function(){

	function encode(str){
		if(!str) return null;
		str = str.replace(/\\/g, '\\\\');
		str = str.replace(/';/g, "'\\'");
		str = str.replace(/\s+^/mg, "\\n");
		return str;
	};

	function checkForVariable(v){
		// 查询各节点值中$var字符串
		if(v.indexOf('$') == -1){
			// .indexOf(str) 返回str在v中首次出现位置
			// 查询不到则返回 -1
			v = '\'' + v + '\'';
		} else{
			v = v.substring(v.indexOf('$') + 1);
			// .substring(start,stop)
			// 返回指定下标(start,stop)间的字符串
			requireVariables += 'var ' + v + ';\n';
		}
		return v;
	};

	var domCode = '';
	var nodeNameCounters = [];
	var requireVariables = '';
	var newVariables = '';

	function generate(strHTML, strRoot){

		// 将HTML代码添加到页面主体，便于能够遍历相应的DOM树
		var domRoot = document.createElement('div');
		domRoot.innerHTML = strHTML;

		// 重置变量
		domCode = '';
		nodeNameCounters = [];
		requireVariables = '';
		newVariables = '';

		// 使用processNode()处理domRoot中的所有子节点
		var node = domRoot.firstChild;
		while(node){
			ADS.walkTheDOMRecursive(processNode, node, 0, strRoot);
			node = node.nextSibling;
		}

		// 输出生成代码
		domCode = 
			'/* requireVariables in this code\n' + requireVariables + '*/\n\n'
			+ domCode + '\n\n'
			+ '/* new objects in this code\n' + newVariables + '*/\n\n';

		return domCode;
	};

	function processAttrbute(tabCount, refParent){

		// 跳过文本节点
		if(this.nodeType != ADS.node.ATTRIBUTE_NODE){
			return;
		}

		// 取得属性值
		var attrValue = (this.nodeValue ? encode(this.nodeValue.trim()) : '');
		if(this.nodeName == 'cssText') alert('true');
		// 没有值则返回
		if(!attrValue) return;
		// 确定缩进级别
		var tabs = (tabCount ? '\t'.repeat(parseInt(tabCount)) : '');

		// 由nodeName判断，除class和style需特殊处理
		// 其它类型按常规处理
		switch(this.nodeName){
			default:
				if(this.nodeName.substring(0,2) == 'on'){
					// 当属性名以'on'开头
					// 即为一个嵌入事件属性
					// 重新创建一个给该属性赋值的fn
					domCode += tabs
						+ refParent
						+ '.'
						+ this.nodeName
						+ '= function(){'
						+ attrValue
						+ '}\n';
				} else{
					// 其余情况使用setAttribute
					domCode += tabs
					+ refParent
					+ '.setAttribute(\''
					+ this.nodeName
					+ '\', '
					+ checkForVariable(attrValue)
					+ ');\n';
				}
			break;

			case 'class':
				// 使用className属性为class赋值
				domCode += tabs
					+ refParent
					+ '.className ='
					+ checkForVariable(attrValue)
					+ ';\n';
			break;

			case 'style':
				// 使用正则表达式
				// 基于 ; 和 邻近的空格符
				// 来分割样式属性的值
				var style = attrValue.split(/\s*;\s*/);

				if(style){
					for(pair in style){
						if(!style[pair]) continue;// 中断迭代

						// 使用正则基于 : 和空格符
						// 来分割每对样式属性
						var prop = style[pair].split(/\s*:\s*/);

						// 此处prop[0]为属性名
						// 而prop[1]为属性值
						if(!prop[1]) continue;

						// 将css-property格式的CSS属性
						// 转换为cssProperty格式
						prop[0] = ADS.camelize(prop[0]);

						var propValue = checkForVariable(prop[1]);

						if(prop[0] == 'float'){
							// cssFloat为标准属性
							domCode += tabs
								+ refParent
								+ '.style.cssFloat = '
								+ propValue
								+ ';\n';

							// styleFloat为IE使用的属性
							domCode += tabs
								+ refParent
								+ '.style.styleFloat = '
								+ propValue
								+ ';\n';
						} else{
							domCode += tabs
								+ refParent
								+ '.style'
								+ prop[0]
								+ '='
								+ propValue
								+ ';\n';
						}
					}
				}
			break;
		}
	};

	function processNode(tabCount, refParent){
		// 根据树的深度级别重复制表符
		// 便于对每一行进行适当的缩进
		var tabs = (tabCount ? '\t'.repeat(parseInt(tabCount)) : '');

		// 确定节点类型，并处理元素和文本节点
		switch(this.nodeType){
			case ADS.node.ELEMENT_NODE:
				// 计数器加1
				// 并创建一个使用标签和计数器的值表示的新变量
				// 如：a1、a2
				if(nodeNameCounters[this.nodeName]){
					++nodeNameCounters[this.nodeName];
				}else{
					nodeNameCounters[this.nodeName] = 1;
				}

				// 连接nodeName和计数器的值来创建新的变量
				// 便于引用具有相同nodeType的多个节点的实例
				var ref = this.nodeName.toLowerCase()
					+ nodeNameCounters[this.nodeName];

				// 添加创建这个元素的DOM代码行
				domCode += tabs
					+ 'var '
					+ ref
					+ ' = document.createElement(\''
					+ this.nodeName + '\');\n';

				newVariables += '' + ref + ';\n';

				// 检测是否存在属性，存在则遍历这些属性
				// 并processAtrribute()遍历它们DOM树
				if(this.attributes){
					for(var i = 0; i < this.attributes.length; i++){
						// 属性本身也是节点且包含在node.attributes中
						ADS.walkTheDOMRecursive(
							processAttrbute,
							this.attributes[i],
							tabCount,
							ref
						);
					}
				}

				break;

			case ADS.node.TEXT_NODE:
				// 检测文本节点中
				// 除了空白符外的值
				var value = (this.nodeValue ? encode(this.nodeValue.trim()) : '');
				if(value){
					// 计数器加1
					// 并创建一个使用txt的计数器的值的表示的新变量
					// 如：txt1、txt2
					if(nodeNameCounters['txt']){
						++nodeNameCounters['txt'];
					}else{
						nodeNameCounters['txt'] = 1;
					}

					var ref = 'txt' + nodeNameCounters['txt'];

					// 检测是否$var格式的值
					value = checkForVariable(value);

					// 添加创建这个元素的DOM代码
					domCode += tabs
						+ 'var '
						+ ref
						+ ' = document.createTextNode('+ value +');\n';

					// 将新变量添加到列表中
					newVariables += '' + ref + ';\n';
				} else {
					// 如果不存在值(或只有空白符)则返回
					// 即这个节点将不会被添加到父节点中
					return;
				}
			break;
			default:
				// 忽略其它情况
				break;
		}

		// 将上述代码执行处理的domCode
		// 将这个节点添加到其父节点
		if(refParent){
			domCode += tabs + refParent + '.appendChild(' + ref + ');\n';
		}
		return ref;
	};

	window['generateDOM'] = generate;

})();