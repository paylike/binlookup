'use strict';

var test = require('tape');
var withoutKeys = require('without-keys');
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
		t.ok(err);
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
		t.ok(err);
		t.notOk(r);
	});
});

test('cache', function( t ){
	t.plan(2);

	bl.noCache = false;
	bl.flush();

	var b = bl();

	b(bin, function( err, r ){
		var fr = r;

		b(bin, function( err, r ){
			t.notOk(err);
			t.ok(fr === r, 'returned result');
		});
	});
});

test('cache (flush)', function( t ){
	t.plan(2);

	bl.noCache = false;
	bl.flush();

	var b = bl();

	b(bin, function( err, r ){
		var fr = r;

		b(bin, true, function( err, r ){
			t.notOk(err);
			t.notOk(fr === r, 'returned result');
		});
	});
});

test('cache (global flush)', function( t ){
	t.plan(2);

	bl.noCache = false;
	bl.flush();

	var b = bl();

	b(bin, function( err, r ){
		var fr = r;
		bl.flush();

		b(bin, function( err, r ){
			t.notOk(err);
			t.notOk(fr === r, 'returned result');
		});
	});
});

test('cache (disabling)', function( t ){
	t.plan(2);

	bl.noCache = true;
	bl.flush();

	var b = bl();

	b(bin, function( err, r ){
		var fr = r;

		b(bin, function( err, r ){
			t.notOk(err);
			t.notOk(fr === r, 'returned result');

			// reset state
			bl.noCache = false;
		});
	});
});
