'use strict';

var test = require('tape');
var withoutKeys = require('without-keys');
var AsyncCache = require('async-cache');
var bl = require('./');

var bin = '45717360';
var result = {
	bin: "45717360",
	brand: "VISA",
	sub_brand: "DANKORT",
	country_code: "DK",
	country_name: "Denmark",
	bank: "Jyske Bank",
	card_type: "DEBIT",
	card_category: "CLASSIC",
	latitude: "56",
	longitude: "10",
};

test('without a key', function( t ){
	t.plan(4);

	var b = bl();

	b(bin, function( err, r ){
		t.notOk(err);
		t.deepEqual(withoutKeys(r, [ 'query_time' ]), result);
	});

	b('bad', function( err, r ){
		t.notOk(err);
		t.notOk(r);
	});
});

test('with a key', { skip: !process.env.KEY }, function( t ){
	t.plan(4);

	var b = bl(process.env.KEY);

	b(bin, function( err, r ){
		t.notOk(err);
		t.deepEqual(withoutKeys(r, [ 'query_time' ]), result);
	});

	b('bad', function( err, r ){
		t.notOk(err);
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
		t.deepEqual(withoutKeys(r, [ 'query_time' ]), result);
	});

	cache.get('bad', function( err, r ){
		t.notOk(err);
		t.notOk(r);
	});
});
