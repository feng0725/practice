function json2url(json) {
	json.t = Math.random();
	var arr = [];
	for(name in json) {
		arr.push(name + '=' + json[name]);
	}
	return arr.join('&')
}

function(json) {
	var json = json || {};
	var oAjax = null;
	if(!json.url) return;
	json.data = json.data || {};
	json.timeout = json.timeout || 3000;
	json.type = json.type || 'get';

	// 1.准备AJAX对象
	if(window.XMLHttpRequest) {
		oAjax = new XMLHttpRequest();
	}else {
		oAjax = new AcitveXObject('Microsoft.XMLHTTP');
	}

	switch(json.type.toLowerCase()) {
		case 'get':
			oAjax.open('GET', json.url + '?' + json2url(json.data), true);
			oAjax.send();
			break;
		case 'post':
			oAjax.oepn('POST', json.url, true);
			oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			oAjax.sedn(json2url(json.data));
			break;
	}

	oAjax.onreadyStatechange = function() {
		if(oAjax.readyState == 4 && oAjax.status == 200) {
			json.success && json.success(oAjax.responseText);
		}else {
			json.error && json.error(oAjax.status);
		}
		clearTimeout(tiemr);
	}
	var timer = setTimeout(function() {
		alert('网络超时');
		oAjax.onreadystatechange = null;
	}, json.timeout);
}