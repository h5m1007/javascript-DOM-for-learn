/*
	javascript 日志对象
	用于调试查看dom对象的方法和属性
*/

function myLogger(id){
	id = id || 'ADSLogWindow';
	// 私有变量
	// 引用日志的DOM节点
	var logWindow = null;

	// 私有方法
	// 创建保存日志列表的DOM，并加入文档
	var createWindow = function(){
		// 动态定位窗口在浏览器中居中显示
		var browserWindowSize = ADS.getBrowserWindowSize();
		// 居中放置时左上角位置
		var top = ((browserWindowSize.height - 200) / 2) || 0;
		var left = ((browserWindowSize.width - 200) / 2) || 0;

		// 创建作为日志窗口的DOM节点
		logWindow = document.createElement('ul');
		logWindow.setAttribute('id', id);

		// 居中定位日志窗口
		logWindow.style.position = 'absolute';
		logWindow.style.top = top + 'px';
		logWindow.style.left = left + 'px';

		// 设置大小、滚动、样式
		logWindow.style.width = '200px';
		logWindow.style.height = '200px';
		logWindow.style.overflow = 'scroll';
		logWindow.style.padding = '0';
		logWindow.style.margin = '0';
		logWindow.style.border = '1px solid black';
		logWindow.style.backgroundColor = 'white';
		logWindow.style.listStyle = 'none';
		logWindow.style.font = '10px/10px Verdana, Tahoma, Sans';

		document.body.appendChild(logWindow);
	};

	this.writeRaw = function(msg){
		// 特权方法
		// 用于向日志中加入一条记录

		// 如果初始日志窗口不存在，则执行创建函数
		if(!logWindow) createWindow();

		// 创建列表项并添加样式
		var li = document.createElement('li');
		li.style.margin = '0';
		li.style.padding = '2px';
		li.style.border = '0';
		li.style.borderBottom = '1px dotted black';
		li.style.color = '#000';
		li.style.font = '9px/9px Verdana, Tahoma, Sans';

		// 向日志添加信息
		if(typeof msg == 'undefined'){
			li.appendChild(
				document.createTextNode('Message was undefined!')
			);
		} else if(typeof li.innerHTML != undefined){
			// 当msg存在html标签但以字符串显示时
			// 把msg赋值给li标签并以html文档输出
			li.innerHTML = msg;
		} else{
			li.appendChild(
				// 以上两种情况都不是
				// 直接向文档插入文本节点
				document.createTextNode(msg)
			);
		}

		logWindow.appendChild(li);

		return true;
	};
}

myLogger.prototype = {
	// 以数组的形式(键值对)
	// 定义myLogger的公有方法(原型)
	write: function(msg){
		// 对writeRaw再包装，加上额外的检测
		// 对HTML以源代码输出
		if(typeof msg == 'string' && msg.length == 0){
			return this.writeRaw('ADS.log: null message!');
		}

		// 当msg不是字符串，调用toString()强制转换msg为字符串
		// 又msg不存在toString()方法，则返回msg的类型
		if(typeof msg != 'string'){
			if(msg.toString) {
				return this.writeRaw(msg.toString())
			}else{
				return this.writeRaw(typeof msg);
			}
		}

		// /</g 正则匹配: /主体/, g: 指定在整个字符串中匹配
		msg = msg.replace(/</g, "&lt;").replace(/>/g, "&gt;");
		return this.writeRaw(msg);
	},
	header: function(msg){
		msg = '<span style="color:white;background-color:black;font-weight:bold;padding:0px 5px;">' + msg + '</span>';
		return this.writeRaw(msg);
	}
};

if(!window.ADS){
	window['ADS'] = {};
}

window['ADS']['log'] = new myLogger();