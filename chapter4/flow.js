ADS.addEvent(window, 'load', function(){
	// 修改版的addEvent
	function modifiedAddEvent(obj, type, fn){
		if(obj.addEventListener){
			// W3C标准方式
			// 在修改版的addEvent启用了捕获阶段(true)
			obj.addEventListener(type, fn, true);
		} else if(obj.attachEvent){
			// IE方式
			obj['e' + type + fn] = fn;
			obj[type + fn] = function(){
				obj['e' + type + fn](window.event);
			}
			obj.attachEvent('on' + type, obj[type + fn]);
		} else{
			return false;
		}
	}

	var counter = 0;

	// 取得列表并注册click事件
	var lists = document.getElementsByTagName('ul');
	for(var i = 0; i < lists.length; i++){
		modifiedAddEvent(lists[i], 'click', function(){
			// 向段落中添加表示捕获click事件先后顺序的数字
			var append = document.createTextNode(':' + counter++);
			this.getElementsByTagName('p')[0].appendChild(append);
			this.className = 'clicked';
		});
	}
});