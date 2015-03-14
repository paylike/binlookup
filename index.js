'use strict';

module.exports = bl;

bl.lookup = lookup;

function bl( key ){
	return function( bin, cb ){
		lookup(key, bin, cb);
	}
}

function lookup( key, bin, cb ){
	var proto = (key ? 'https' : 'http');
	var url = proto + '://www.binlist.net/json/' + bin.slice(0, 8);

	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true /* async*/);

	xhr.onreadystatechange = function(){
		xhrcb(xhr, cb);
	};

	if (key)
		xhr.setRequestHeader('Authorization', 'Basic ' + btoa(key + ':'));

	xhr.send();
}

function xhrcb( xhr, cb ){
	if (xhr.readyState !== 4)
		return;

	var status;

	try { status = xhr.status } catch(e) { status = 0; }

	var ok = status && (status / 100 | 0) === 2;
	var body = ok ? JSON.parse(xhr.responseText) : null;

	cb && cb(ok ? null : xhr, body);
}
