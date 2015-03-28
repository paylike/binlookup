'use strict';

var binlist = require('./binlist');

module.exports = function( key ){
	return function( bin, cb ){
		return lookup(key, bin, cb);
	}
};

function lookup( key, bin, cb ){
	binlist(key, bin.slice(0, 8), cb);
}
