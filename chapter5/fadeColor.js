function fadeColor(from, to, callback, duration, framesPerSecond){
	// 基于帧数计算延迟时间
	function doTimeout(color, frame){
		setTimeout(function(){
			try{
				callback(color);
			} catch(e){
				ADS.log.write(e);
			}
		}, (duration * 1000 / framesPerSecond) * frame);
	}

	// 以秒表示渐变时间
	var duration = duration || 1;
	// 在给定持续时间内动画帧数
	var framesPerSecond = framesPerSecond || duration * 15;

	var r,g,b;
	var frame = 1;

	// 在第0帧设置渐变开始颜色
	doTimeout('rgb(' + from.r + ',' + from.g + ',' + from.b + ')', 0);

	// 计算两帧间rgb值变化
	while(frame < framesPerSecond + 1){
		r = Math.ceil(
			from.r * ((framesPerSecond - frame) / framesPerSecond)
			+ to.r * (frame / framesPerSecond)
		);
		g = Math.ceil(
			from.g * ((framesPerSecond - frame) / framesPerSecond)
			+ to.g * (frame / framesPerSecond)
		);
		b = Math.ceil(
			from.b * ((framesPerSecond - frame) / framesPerSecond)
			+ to.b * (frame / framesPerSecond)
		);

		// 为这一帧变化调用延时函数
		doTimeout('rgb(' + r + ',' + g + ',' + b + ')', frame);

		frame++;
	}
}