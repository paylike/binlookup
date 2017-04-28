'use strict';

var defined = require('defined');
var fetch = require('pull-fetch-iso');
var collect = require('pull-stream/sinks/collect');

module.exports = binlookup;

function binlookup( opts ){
	if (typeof opts === 'string')
		opts = {
			key: opts,
		};

	if (typeof opts === 'undefined')
		opts = {};

	var url = defined(opts.url, 'https://lookup.binlist.net/');

	var Promise = defined(opts.Promise, global.Promise);

	return function( bin, cb ){
		var source = fetch({
			host: url,
			path: bin,
			headers: Object.assign({
				'Accept-Version': '3',
				'X-Client': 'Node.js 2.0.1',
			}, opts.key && {
				'Authorization': 'Basic '+fetch.btoa(opts.key+':'),
			}),
		});

		if (cb === undefined)
			return new Promise(function( rs, rj ){
				collect(function( err, ranges){
					if (err)
						return rj(err);

					rs(ranges[0]);
				})(source);
			});

		collect(function( err, ranges ){
			if (err)
				return cb(err);

			cb(null, ranges[0]);
		})(source);
	}
}
