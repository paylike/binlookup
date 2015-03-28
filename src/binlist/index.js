'use strict';

var needle = require('needle');

module.exports = lookup;

function lookup( key, bin, cb ){
	var proto = (key ? 'https' : 'http');
	var url = proto + '://www.binlist.net/json/' + bin;

	needle.get(url, function( err, response ){
		if (err)
			return cb(err);

		if (response.statusCode !== 200)
			return cb(response);

		cb(null, response.body);
	});
}
