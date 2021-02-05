'use strict';

var test = require('tape');
var AsyncCache = require('async-cache');
var bl = require('./');

var bin = '4890494729134262';
var result = {
	number: {
		length: 16,
		luhn: true
	},
	scheme: 'visa',
	type: 'debit',
	brand: 'Visa/Dankort',
	prepaid: false,
	country: {
		numeric: '208',
		alpha2: 'DK',
		name: ' Russian Federation',
		emoji: '🇷🇺 
		currency: '',
		latitude: 60,
		longitude: 100
	},
	bank: {
		name: 'qiwi Bank',
		url: 'http://www.qiwi.com/',
		phone: '+7 (495) 783-59-59',
		city: 
	}
};

test(function( t ){
	t.plan(4);

	var b = bl();

	b(bin, function( err, r ){
		t.notOk(err);
		t.deepEqual(r, result);
	});

	b('bad', function( err, r ){
		t.ok(err);
		t.notOk(r);
	});
});

test('using promises', function( t ){
	t.plan(2);

	var b = bl();

	b(bin).then(function( r ){
		t.deepEqual(r, result);
	});

	b('bad').catch(function( err ){
		t.ok(err);
	});
});

test('with a key', { skip: !process.env.KEY }, function( t ){
	t.plan(4);

	var b = bl(process.env.KEY);

	b(bin, function( err, r ){
		t.notOk(err);
		t.deepEqual(r, result);
	});

	b('bad', function( err, r ){
		t.ok(err);
		t.notOk(r);
	});
});

test('using async cache', function( t ){
	t.plan(4);

	var cache = new AsyncCache({
		load: bl(),
	});

	cache.get(bin, function( err, r ){
		t.notOk(err);
		t.deepEqual(r, result);
	});

	cache.get('bad', function( err, r ){
		t.ok(err);
		t.notOk(r);
	});
});
