# Simple Email validation

A super simple email validator.  Rather than maintaining a complicated email regular expression, this module just ensures that the string exists and has an `@` with characters before and after.

    > Just send them an email already

- David Celis (http://davidcel.is/posts/stop-validating-email-addresses-with-regex/)

This module also assumes you want to know why an email is not valid.  So rather than just returning a `true`/`false` it returns `true`/`Error`.  You can then log and introspect on the error to know why the email is not valid.  Get your regular express to do that!

## Install

```
$ npm install --save simple-email-validation
```

## Usage

```javascript
var isEmail = require('simple-email-validation'),
	isError = require('is-error');

var err = isEmail('not an email');
if (isError(err)) {
	throw new Error(); // not an email does not have an @ symbol
}

if (isEmail('hi@gmail.com') === true) {
	// No error here, just a valid email
	// Do whatever you wanted to do with the
	// valid email address, liek save it in
	// your database
}
```

## Configurable Messaging

To enable configurable messages and internationalization this module allows you to overrrde the error messages.  The second paramter is an object containing message strings that are passed to `util.format`.  For example:

``javascript
var err = isEmail(null, {
	typeError: '%s no es una cadena'
});
console.log(err.message); // null no es una cadena
```
