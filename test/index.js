var validEmail = require('../'),
	isError = require('is-error'),
	assert = require('assert');

describe('valid email', function() {
	it('should identify empty emails', function() {
		assert.equal(validEmail().name, 'EmailTypeError');
		assert.equal(validEmail('').name, 'EmptyEmail');
		assert.equal(validEmail(null).name, 'EmailTypeError');
	});
	it('should identify invalid emails', function() {
		assert.equal(validEmail(1).name, 'EmailTypeError');
		assert.equal(validEmail(true).name, 'EmailTypeError');
		assert.equal(validEmail('hi').name, 'EmailMissingAt');
		assert.equal(validEmail('hi@').name, 'EmailMissingDomain');
		assert.equal(validEmail('@gmail.com').name, 'EmailMissingUser');
	});
	it('should include email in message', function() {
		assert.notEqual(validEmail('@gmail.com').message.indexOf('@gmail.com'), -1);
	});
	it('should cleanly convert erroor to boolean', function() {
		assert.equal(isError(validEmail('hi@')), false);
		assert.equal(isError(validEmail('@gmail.com')), false);
		assert.equal(isError(validEmail()), false);
	});
	it('should identify valid emails', function() {
		assert(validEmail('hi@gmail.com'), 'Did not accept a very basic email address');
		assert(validEmail('hi@gmail'), 'Did not accept an email without a subdomain');
		assert(validEmail('hi@foo.gmail'), 'Did not accept an email 2 subdomains');
		assert(validEmail('☻@gmail.com'), 'Did not accept utf8 characters');
	});
});
