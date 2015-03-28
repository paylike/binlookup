'use strict';

var binlist = require('./binlist');

module.exports = binlookup;

function binlookup( key ){
	return function( bin, flush, cb ){
		if (typeof flush === 'function') {
			cb = flush;
			flush = false;
		}

		return lookup(key, bin + '', flush, cb);
	}
}

binlookup.flush = flush;
binlookup.noCache = false;

var cache = {};

function flush(){
	cache = {};
}

function lookup( key, bin, flush, cb ){
	bin = bin.slice(0, 8);

	var cached = !flush && cache[bin];

	if (cached)
		cb(cached[0], cached[1]);
	else
		binlist(key, bin, function( err, res ){
			if (!binlookup.noCache)
				cache[bin] = [ err, res ];

			cb(err, res);
		});
}
