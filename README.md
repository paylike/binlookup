# BIN/IIN look up

Lookup card BIN numbers using https://www.binlist.net

IIN (Issuer Identification Number) is the more modern name.

Useful for querying information from a credit card such as:

- brand (Visa, MasterCard, American Express, etc.)
- expected card number length and LUHN algorithm support
- type (debit or credit)
- category (prepaid or classic)
- country
- issuing bank

## What is a BIN?

The BIN is the first digits of a card number: `0000 0000 **** ****`. You can
pass any card number prefix of 4-9 digits. More numbers will return more
information.

## Use

Works in browser environments using Browserify or similar.

```js
var lookup = require('binlookup')();

// using callbacks
lookup('45717360',
	function( err, data ){
		console.log(data);
	});

// using promises
lookup('45717360').then(
	data => console.log(data));
```

Example `data` returned:

```js
{
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
		name: 'Denmark',
		emoji: '🇩🇰',
		currency: 'DKK',
		latitude: 56,
		longitude: 10
	},
	bank: {
		name: 'Jyske Bank',
		url: 'www.jyskebank.dk',
		phone: '+4589893300',
		city: 'Hjørring'
	}
}
```

## Caching

You can cache the response using [AsyncCache](https://www.npmjs.com/package/async-cache)
or similar:

```js
var lookup = require('binlookup')();
var AsyncCache = require('async-cache');

var cache = new AsyncCache({
	load: lookup,
});

cache.get(bin, function( err, data ){
	console.log(data);
});
```
