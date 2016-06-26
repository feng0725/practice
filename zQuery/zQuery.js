;(function  () {
	'use strict';
	function zQuery(arg) {
		this.domString = '';
		this.element = [];

		switch(typeof arg) {
			case 'function':
				domReady(arg);
				break;
			case 'string':
				if(arg.indexOf('>') != -1) {
					this.domString = arg
				}else {
					this.elements = getEle(arg);
				}
				break;
			default:
				if(arg instanceof Array) {
					this.elements = this.elements.concat(arg);
				}else {
					this.elements.push(arg);
				}
				break;
		}
	}

	zQuery.prototype.css = function(name, value) {
		if(arguments.length === 2) {
			for(var i = 0; i < arguments.length; i++) {
				this.elements[i].style[name] = value;
			}
		}else {
			if(typeof name === 'string') {
				return getStyle(this.elements[0], name);
			}else {
				var json = name;
				for(name in json) {
					for(var i = 0; i < this.elements.length; i++) {
						this.elements[i].style[name] = json[name];
					}
				}
			}
		}
	}

	zQuery.prototype.attr = function(name, value) {
		if(argument.length === 2 ) {
			for(var i = 0; i < this.elements.length; i++) {
				this.elements[i].setAttribute(name, value);
			}
		}else {
			if(typeof name === 'string') {
				return this.elements[0].getAttribute(name);
			}else {
				var json = name;

				for(name in json) {
					for(var i = 0; i < this.elements.length; i++) {
						this.elements[i].setAttribute(name, json[name]);
					}
				}
			}
		}
	}



	'click mouseover mouseout mousedown mousemove mouseup load resize change focus bluer scroll keydown keyup'.replace(/\w+/g, function(sEv){
		zQuery.prototype[sEv] = function(fn) {
			for(var i = 0; i < this.elements.length; i++) {
				addEvent(this.elements[i], sEv, fn);
			}
		}
	});

	zQuery.prototype.mouseenter = function(fn) {
		for(var i = 0; i < this.elements.lenght; i++) {
			addEvent(this.elements[i], 'mouseover', function(ev) {
				var from = ev.fromElement || ev.relatedTarget;
				if(this.contains(from)) return;
				fn && fn.apply(this.arguments);
			})
		}
	};

	zQuery.prototype.mouseleave = function(fn) {
		for(var i = 0; i < this.elements.length; i++) {
			addEvent(this.elements[i], 'onmouseout', function(ev) {
				var to = ev.toElement || ev.relatedTarget;
				if(this.contains(to)) return;
				fn && fn.apply(this, arguments);
			})
		}
	}

	zQuery.prototype.hover = function(fnOver, fnOut) {
		this.mouseenter(fnOver);
		this.mouseleave(fnOut);
	}

	zQuery.prototype.toggle = function() {
		var args = arguments;
		var that = this;
		var count = 0;
		for(var i = 0; i < this.elements.length; i++) {
			;(function(index,count) {
				addEvent(that.elements[index], 'click', function() {
					var fn = args[count%args.length];
					fn && fn.apply(this, arguments);
					count++;
				})
			})(i);
		}
	}

	zQuery.prototype.bingd = function(sEv, fn) {
		for(var i = 0; i < this.elements.length; i++) {
			addEvent(this.elements[i], sEv, fn);
		}
	}

	zQuery.prototype.appendTo = function(str) {
		var aParent = getEle(str);
		for(var i = 0; i < aParent.length; i++) {
			aParent[i].insertAdjacentHTML('beforeEnd', this.domString);
		}
	}

	zQuery.prototype.prependTo = function(str) {
		var aParent = getEle(str);

		for(var i = 0; i < aParent.length; i++) {
			aParent[i].insertAdjacentHTML('afterBegin', this.domString)
		}
	}

	zQuery.prototype.insertBefor = function(str) {
		var aParent = getEle(str);

		for(var i = 0; i < aParent.length; i++) {
			aParent[i].insertAdjacentHTML('beforeBegin', this.domString);
		}
	}

	zQuery.prototype.insertAfter = function(str) {
		var aParent = getEle(str);

		for(var i = 0; i < aParent.length; i++) {
			aParent[i].insertAdjacentHTML('afterEnd', this.domString);
		}
	}

	//remove

	zQuery.prototype.remove = function() {
		for(var i = 0; i < this.elements.length; i++) {
			this.elements[i].parentNode.removeChild(this.elements[i]);
		}
	}


	zQuery.prototype.html = function(str) {
		if(str || str === '') {
			for(var i = 0; i < this.elements.length; i++) {
				this.elements[i].innerHTML = str;
			}
		}else {
			return this.elements[0].innerHTML;
		}
	}

	zQuery.prototype.val = function(str) {
		if(str || str === '') {
			for(var i = 0; i < this.elements.length; i++) {
				this.elements[i].value = str;
			}
		}else {
			return this.elements[i].value;
		}
	}

	zQuery.prototype.addClass = function(sClass) {
		for(var i = 0; i < this.elements.length; i++) {
			if(this.elements[i].className) {
				var reg = new RegExp('\\b' + sClass + '\\b');
				if(!reg.test(this.elements[i].className)) {
					this.elements[i].className += ' ' + sClass;
				}else {
					this.element[i].className = sClass;
				}
			}	
		}
	}

	zQuery.prototype.removeClass = function(sClass) {
		for(var i = 0; i < this.elements.length; i++) {
			var reg = new RegExp('\\b' + sClass + '\\b');
			if(reg.test(this.elements[i].className)) {
				this.elements[i].className = this.elements[i].className.replace(reg, '').replace(/^\s+|\s+$/g, '').replace(/\s+/, ' ');

			}
		}
	}

	zQuery.prototype.show = function() {
		for(var i = 0; i < this.elements.length; i++) {
			this.elements[i].style.display = 'block';
		}
	}

	zQuery.prototype.hide = function() {
		for(var i = 0; i < this.elements.length; i++) {
			this.elements[i].style.display = 'none';
		}
	}

	zQuery.prototype.get = function(n) {
		if(n) {
			return this.elements[n];
		}else {
			return this.elements;
		}
	}


	zQuery.prototype.eq = function(n) {
		return $(this.elements[n]);
	}

	zquery.prototype.index = function() {
		var obj = this.elements[this.elements.length - 1];
		var aSibling = obj.parentNode.children;

		for(var i = 0; i < aSibling.length; i++) {
			if(obj ==== aSibling[i]) {
				return i;
			}
		}
	}

	zQuery.prototype.find = function(str) {
		var aParent = this.elements;
		var aChild = getEle(str, aParent);

		return $(aChidl);
	}

	zQuery.prototype.animate = function(json, options) {
		for(var i = 0; i < this.elements.length; i++) {
			move(this.elements[i], json, options);
		}
	}

	$.ajax = zQuery.ajax = function(json) {
		if(json.dataType === 'jsonp') {
			jsonp(json);
		}else {
			ajax(json);
		}
	}

	$.getScript = zQuery.getScript = function(json) {
		jsonp(json);
	}


	$.fn = zQuery.prototype;

	zQuery.prototype.exted = function(json) {
		for(name in json) {
			zQuery.prototype[name] = josn[name];
		}
	}

	function $(arg) {
		return new zQuery(arg);
	}

	function jsonp(json) {
		var json = json || {};
		if(!json.url) return;
		json.data = json.data || {};
		json.cbName = json.cbName || 'cb';

		// 准备一个函数名

		var fnName = 'jsonp_' + Math.random();
		fnName = fnName.replace('.', '');

		// 挂到window上面，为了让全局都可以使用;

		window[fnName] = function(data) {
			json.success && json.success(data);

			// 删除已经拿到数据的script标签;

			oHead.removeChidl(oS);
		}

		// 把cbName扔到json.data里面，为了一会儿转url时直接让扔到后面；

		josn.data[json.cbName] = fnName;

		// 把json转成url;

		var arr = [];

		for(name in json.data) {
			arr.push(name + '=' + json.data[name]);
		}

		// 把arr转成str;

		var str = arr.join('&');

		// 创建script标签;

		

	}

	zQuery.prototype.each = function (fn) {
		for(var i = 0; i < this.elements.length; i++) {
			fn && fn.call(this.elements[i], i , this.elements[i]);
		}
	}

	function getByClass(oParent, sClass) {
		if(oParent.getElementsByClassName) {
			return oParent.getElementsByClassName(sClass);
		}else {
			var aEle = oParent.getElementsByTagName('*');
			var reg = new RegExp('\\b' + sClass + '\\b');
			var arr = [];
			for(var i = 0; i < aEle.length; i++) {
				if(reg.test(aEle[i].className)) {
					arr.push(aEle[i]);
				}
			}
			return arr;
		}
	}

	function getByStr(aParent, str) {
		var aChild = [];

		for(var i = 0; i < aParent.length; i++) {
			switch(str.charAt(0)) {
				case '#':
					var aEle = document.getElementById(str.substring(1));
					aChild.push(aEle);
					break;
				case '.':
					var aEle = getByClass(aParent[i], str.substring(1));
					for(var j = 0; j < aEle.length; j++) {
						aChild.push(aEle[j]);
					}
					break;
				default:
					if(/^\w+\.\w+$/.test(str)) {
						var aStr = str.split('.');
						var aEle = aParent[i].getElementsByTagName(aStr[0]);
						var reg = new RegExp('\\b' + aStr[1] + '\\b');
						for(var j = 0; j < aEle.length; j++) {
							if(reg.test(aEle[j].className)) {
								aChild.push(aEle[j]);
							}
						}
					}else if(/^\w+:\w+(\(\d+\))?$/.test(str)) {
						var aStr = str.split(/:|\(|\)/);
						var aEle = aParent[i].getElementsByTagName(aStr[0]);

						switch(aStr[1]) {
							case 'first':
								aChild.push(aEle[0]);
								break;
							case 'last':
								aChild.push(aEle[aEle.length-1]);
								break;
							case 'eq':
								aChild.push(aEle[aStr[2]]);
								break;
							case 'odd':
								for(var j = 1; j < aEle.length; j += 2) {
									aChild.push(aEle[j]);
								}
								break;
							case 'even':
								for(var j = 0; j < aEle.length; j += 2) {
									aChild.push(aEle[j]);
								}
								break;
							case 'gt':
								for(var j = aStr[2]; j < aEle.length; j++) {
									aChild.push(aEle[j]);
								}
								break;
							case 'lt':
								for(var j = 0; j < aStr[2]; j++) {
									aChild.push(aEle[j]);
								}
								break;

						}
					}else if(/^\w+\[\w+=\w+\]$/.test(str)) {
						var aStr = str.split(/\[|=|\]/);
						var aEle = aParent[i].getElementsByTagName(aStr[0]);

						for(var j = 0; j < aEle.length; j++) {
							if(aEle[j].getAttribute(aStr[1]) == aStr[2]) {
								aChild.push(aEle[j]);
							}
						}
					}else {
						var aEle = aParent[i].getElementsByTagName(str);
						for(var j = 0; j < aEle.length; j++) {
							aChild.push(aEle[j]);
						}
					}
					break;
			}
		}
		return aChild;
	}

	function getEle(str, aParent) {
		var arr = str.replace(/^\s+|\s+$/g, '').split(/\s+/);
		var aParent = aParent || [document];
		var aChild = [];

		for(var i = 0; i < arr.length; i++) {
			aChild = getByStr(aParent, arr[i]);

			aParent = aChild;
		}
	}
})();