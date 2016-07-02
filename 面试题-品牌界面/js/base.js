//  修改根字体大小
(function(win, doc) {
	function change() {
		doc.documentElement.style.fontSize = doc.documentElement.clientWidth / 360 * 22.5 + 'px';
	}
	change();
	win.addEventListener('resize', change, false);
})(window, document);

// ajax
function ajax(json) {
	var json = json || {};
	if(!json.url) return;
	json.data = json.data || {};
	json.type = json.type || 'get';

	// 1.准备ajax对象
	if(window.XMLHttpRequest) {
		var oAjax = new XMLHttpRequest();
	}else {
		var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
	}
	// 2.建立连接
	// 3.发送请求
	switch(json.type.toLowerCase()) {
		case 'get':
			oAjax.open('GET', json.url + '?' + json2url(json.data),true);
			oAjax.send;
			break;
		case 'post':
			oAjax.open('POST', json.url, true);
			oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			oAjax.send(json2url(json.data));
			break;
	}

	json.fnLoading && json.fnLoading();

	// 4.接收数据
	oAjax.onreadystatechange = function() {
		if(oAjax.readyState === 4) {
			json.complete && json.complete();
			if(oAjax.status >= 200 && oAjax.status < 300 || oAjax.status === 304) {
				json.success && json.success(oAjax.responseText);
			}else {
				json.error && json.error(oAjax.status);
			}
		}
	}
} 

function json2url(json) {
	json.t = Math.random();
	var arr = [];
	for(name in json) {
		arr.push(name + '=' + json[name]);
	}
	return arr.join('&');
}