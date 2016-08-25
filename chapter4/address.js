function isPostalCode(s){
	return s.toUpperCase().match(
		/[A-Z][0-9][A-Z]\s*[0-9][A-Z][0-9]/i
	);
}

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