'use strict';

var Promise = require('bluebird');
var fetch = require('fetch-one');
var bind = require('component-bind');
var btoa = require('btoa-lite');

module.exports = binlookup;

function binlookup( key ){
	return bind(null, lookup, 'Basic ' + btoa(key + ':'));
}

function lookup( auth, bin, cb ){
	return fetch('GET', 'http://www.binlist.net/json/'+bin.slice(0, 8), auth && {
		'Authorization': auth,
	})
		.get('body')
		.catch(fetch.response.ClientError, function( e ){
			if (+e.code === 404)
				return null;

			throw e;
		})
		.asCallback(cb);
}
