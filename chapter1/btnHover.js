function regMultiStateAnchorListeners(anchor, anchorImg, path, extension){
	// 载入鼠标悬停状态的图像
	// 为每个锚参数anchor注册了事件侦听
	var imgMouseOver = new Image();
	imgMouseOver.src = path + '-over' + extension;

	ADS.addEvent(anchor, 'mouseover', function(e){
		anchorImg.src = imgMouseOver.src;
	});

	ADS.addEvent(anchor, 'mouseout', function(e){
		anchorImg.src = path + extension;
	});

	var imgMouseDown = new Image();
	imgMouseDown.src = path + '-down' + extension;

	ADS.addEvent(anchor, 'mousedown', function(e){
		anchorImg.src = imgMouseDown.src;
	});

	ADS.addEvent(anchor, 'mouseup', function(e){
		anchorImg.src = path + extension;
	});

}

function initMultiStateAnchors(e){
	var anchors = ADS.getElementsByClassName('multiStateAnchor', 'a');

	for(var i = 0; i < anchors.length; i++){
		var anchorImg = anchors[i].getElementsByTagName('img')[0];

		if(anchorImg){
			var extensionIndex = anchorImg.src.lastIndexOf('.');
			// lastIndexOf返回指定字符串最后出现的位置
			var path = anchorImg.src.substr(0, extensionIndex);
			// substr返回从0开始长度为extensionIndex的字符串
			var extension = anchorImg.src.substring(
				extensionIndex,
				anchorImg.src.length
			);
			// substring返回指定位置间的字符串

			regMultiStateAnchorListeners(
				anchors[i],
				anchorImg,
				path,
				extension
			);
		}
	}
}