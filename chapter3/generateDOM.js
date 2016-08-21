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
			// .indexOf(str) 返回str首次出现位置
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

	};

	function processAttrbute(tabCount, refParent){

	};

	function processNode(tabCount, refParent){

	};

	window['generateDOM'] = generate;

})();