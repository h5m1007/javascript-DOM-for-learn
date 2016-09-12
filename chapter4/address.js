function isPostalCode(s){
	return s.toUpperCase().match(
		/[A-Z][0-9][A-Z]\s*[0-9][A-Z][0-9]/i
	);
}

// 对表单提交做验证
ADS.addEvent(window, 'load', function(){
	ADS.addEvent(
		document.getElementById('canadianAddress'),
		'submit',
		function(e){
			var postalCode = document.getElementById('postalCode').value;

			// 正则表达式检查输入格式是否有效
			if(!isPostalCode(postalCode)){
				alert('That \'s not a valid Canadian postal code!');

				// 取消表单提交操作
				ADS.preventDefault(e);
			}
		}
	);
});

// 对表单输入数据做验证
ADS.addEvent(window, 'load', function(){
	// 添加初始样式
	var postalCode = document.getElementById('postalCode');
	postalCode.className = 'inputMissing';

	// 当获得焦点时将类修改为编辑
	ADS.addEvent(postalCode, 'focus', function(e){
		this.className = 'inputEditing';
	});

	// 当失去焦点时进行验证输入信息并改变样式
	ADS.addEvent(postalCode, 'blur', function(e){
		if(this.value == ''){
			this.className = 'inputMissing';
		} else if(!isPostalCode(this.value)) {
			this.className = 'inputInvalid';
		} else{
			this.className = 'inputComplete';
		}
	});
});

ADS.addEvent(window, 'load', function(){
	var postalCode = ADS.$('postalCode');

	ADS.addEvent(postalCode, 'change', function(e){
		var newPostalCode = this.value;

		if(!isPostalCode(newPostalCode)) return;

		var req = new XMLHttpRequest();
		req.open('POST', 'server.js?postalCode=' + newPostalCode, true);
		req.onreadystatechange = function(){
			if(req.readyState == 4){
				eval(req.responseText);

				if(ADS.$('street').value == ''){
					ADS.$('street').value = street;

					// 由chapter5引入fadeColor()
					// 开启渐变效果
					fadeColor(
						{r:0, g:255, b:0},
						{r:255, g:255, b:255},
						function(color){
							ADS.setStyle(
								'street',
								{'background-color': color}
							);
						}
					);
				}
				if(ADS.$('city').value == ''){
					ADS.$('city').value = city;

					fadeColor(
						{r:0, g:255, b:0},
						{r:255, g:255, b:255},
						function(color){
							ADS.setStyle(
								'city',
								{'background-color': color}
							);
						}
					);
				}
				if(ADS.$('province').value == ''){
					ADS.$('province').value = province;

					fadeColor(
						{r:0, g:255, b:0},
						{r:255, g:255, b:255},
						function(color){
							ADS.setStyle(
								'province',
								{'background-color': color}
							);
						}
					);
				}
			}
		}
		req.send();
	});
});
