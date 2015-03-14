'use strict';

var needle = require('needle');

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

	needle.get(url, function( err, response ){
		if (err)
			return cb(err);

		if (response.statusCode !== 200)
			return cb(response);

		cb(null, response.body);
	});
}
