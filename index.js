var customError = require('custom-error'),
	util = require('util');

var isValidEmail = module.exports = function isValidEmail(email, msg) {
	// Default the messages
	msg = msg || {};
	msg.typeError = msg.typeError || '%s is not a string';
	msg.emptyError = msg.emptyError || 'Email is empty';
	msg.missingAt = msg.missingAd || '%s does not have an @ symbol';
	msg.missingUser = msg.missingUser || '%s is missing the user';
	msg.missingDomain = msg.missingDomain || '%s is missing the domain';

	// Is it a string?
	if (typeof email !== 'string') {
		return new isValidEmail.TYPE_ERROR(util.format(msg.typeError, email));
	}

	// Is email truthy/not empty
	if (email === '') {
		return new isValidEmail.EMPTY_ERROR(util.format(msg.emptyError, email));
	}

	// Get @ position
	var at = email.indexOf('@');

	// Does it have an @ symbol?
	if (at === -1) {
		return new isValidEmail.MISSING_AT(util.format(msg.missingAt, email));
	}

	// Does it have an email username?
	if (at < 1) {
		return new isValidEmail.MISSING_USER(util.format(msg.missingUser, email));
	}

	// Does it have an domain?
	if (at > email.length - 2) {
		return new isValidEmail.MISSING_DOMAIN(util.format(msg.missingDomain, email));
	}

	// Is valid email
	return true;
};

// Errors
isValidEmail.TYPE_ERROR = customError('EmailTypeError', TypeError);
isValidEmail.EMPTY_ERROR = customError('EmptyEmail');
isValidEmail.MISSING_AT = customError('EmailMissingAt');
isValidEmail.MISSING_USER = customError('EmailMissingUser');
isValidEmail.MISSING_DOMAIN = customError('EmailMissingDomain');
