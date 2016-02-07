# BIN/IIN look up

Lookup card BIN numbers using https://www.binlist.net

IIN (Issuer Identification Number) is the more modern name.

Useful for querying information from a credit card such as:

- brand (Visa, MasterCard, American Express, etc.)
- type (debit or credit)
- category (prepaid or classic)
- country
- issuing bank

## What is a BIN?

The BIN is the first 4-8 characters of a card number: `0000 0000 **** ****`.
You can pass any range of 4-8 numbers. More numbers will return more
information.

## Use

Works in browser environments using Browserify or similar.

```js
// with an API key
var b = require('binlookup')('my-api-key');

// without API key
var b = require('binlookup')();

b('457173', function( err, data ){
	console.log(data);
});

// using promises
b('457173')
	.then(function( data ){
		console.log(data);
	});
```

Example `data` returned:

```js
{
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
	query_time: "352.309µs",
}
```

## Security notice

You should *never* process or store more than the first 8 characters of a card
number unless you are PCI compliant and has the appropriate knowledge.

The string is always truncated to eight characters before it is sent to the
binlist service.

This script comes without any warranties or guarantees, use it at your own
risk.

## Caching

You can cache the response using [AsyncCache](https://www.npmjs.com/package/async-cache)
or similar:

```js
var binlookup = require('binlookup');
var AsyncCache = require('async-cache');

var cache = new AsyncCache({
	load: binlookup('key'),
});

cache.get(bin, function( err, data ){
	console.log(data);
});
```
