# BIN/IIN look up

This module uses the https://www.binlist.net service to return information
about a card by it's BIN number.

## What is a BIN?

The BIN is the first 4-8 characters of a card number: `xxxx xxxx ...`. You can
pass any range of 4-8 numbers. More numbers will return more information.

## Use

```js
// paid plan
var b = require('binlookup')('my-api-key');

// free plan
var b = require('binlookup')();

b('457173', function( err, data ){
	if (err)
		return console.error(err);

	console.log(data);
});
```

An example of the `data` variable:

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

If you're using their free plan, just leave out the api key.

## Security notice

Please do *never* deal with actual card numbers if you are not PCI certified.
As an added security, all arguments are sliced to the first eight characters
before shipped off to the binlist service.

This script comes without any warranties, use it at your own risk.
