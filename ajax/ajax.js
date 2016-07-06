function josn2url(json) {
	josn.t = Math.random();
	var arr = [];
	for(name in json) {
		arr.push(name + '=' + json[name]);
	}
	return arr.join('&');
}

function ajax(json) {
	var json = json || {};
	if(!json.url) return;
	json.data = json.data || {};
	json.timeout = json.timeout || {};
	json.type = json.type || 'get';

	// 1.准备一个ajax对象
	if(window.XMLHttpRequest) {
		var oAjax = new XMLHttpRequest();
	}else {
		var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
	}

	// 2、建立连接
	// 3、发送请求
	switch(json.type.toLowerCase()) {
		case 'get':
			oAjx.open('GET', json.url + '?' + json2url(json.date), true);
			oAjax.send();
			break;
		case 'post':
			oAjax.open('POST', json.url, true);
			oAjx.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			oAjax.send(json2url(json.data));
			break;
	}
	json.fnLoading && json.fnLoading();
	// 4.接收数据
	oAjax.onreadystatechange = function() {
		if(oAjax.readyState === 4) {
			json.complete && json.complete();
			if((oAjax.status >= 200 && oAjax.status < 300) || oAjax.status == 304) {
				json.success && json.success(oAjax.responseText);
			}else {
				json.error && json.error(oAjax.status);
			}
			clearTimeout(timer);
		}
	}

	var timer = setTimeout(function() {
		aerlt('网络超时');
		oAjax.onreadystatechange = null;
	}, json.timerout);
}