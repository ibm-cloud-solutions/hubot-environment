// Description:
//	Displays the version of the bot and all of its external scripts
//
// Configuration:
//
// Commands:
//   hubot environment - Shows the current running environment variables
//   hubot environment <text> - Shows environment variables containing <text> in their name
//
// Author:
//	lanzen
//
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2016. All Rights Reserved.
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
'use strict';

const SHOW_ENV = /environment(.*)/i;

var path = require('path');
var TAG = path.basename(__filename);

// --------------------------------------------------------------
// i18n (internationalization)
// It will read from a peer messages.json file.  Later, these
// messages can be referenced throughout the module.
// --------------------------------------------------------------
const i18n = new (require('i18n-2'))({
	locales: ['en'],
	extension: '.json',
	// Add more languages to the list of locales when the files are created.
	directory: __dirname + '/../messages',
	defaultLocale: 'en',
	// Prevent messages file from being overwritten in error conditions (like poor JSON).
	updateFiles: false
});
// At some point we need to toggle this setting based on some user input.
i18n.setLocale('en');

const SENSITIVE_DATA_ENV = ['PASSWORD', 'SALT', 'TOKEN', 'SECRET', 'KEY', 'ACCOUNTS'];

module.exports = robot => {

	// ------------------------------------------------------------------------
	// Regex matching entry point.
	// ------------------------------------------------------------------------
	robot.respond(SHOW_ENV, {id: 'hubot.show.environment'}, (res) => {
		// See if a variable name filter was provided.
		let matchString = '';
		if (res.match.length > 1) {
			matchString = res.match[1].trim();
		}
		robot.logger.debug(`${TAG}: hubot-environment, matchString=${matchString}`);

		// Iterate the list of environment variables and gather the response.
		let envList = '';
		for (var key in process.env) {
			// Filter out variables that have no value.
			if (process.env.hasOwnProperty(key) && process.env[key] !== '') {
				// See if there is a match.
				if (key.indexOf(matchString) !== -1) {
					// Found a match.  See if entries already exist in the list.
					if (envList !== '') {
						// Found content, so need a newline before adding another.
						envList += '\n';
					}
					// Add the env variable.
					let data = process.env[key];
					if (SENSITIVE_DATA_ENV.some((currentValue, index) => {
						let sensitive = false;
						if (key.toUpperCase().indexOf(currentValue) >= 0) {
							sensitive = true;
						}
						return sensitive;
					})) {
						data = '********************';
					}
					envList += key + '=' + data;
				}
			}
		}

		// Apply an appropriate sentence introducing the data to follow.
		let message = '';
		if (matchString === '') {
			// No filter provided.  Full list provided.
			message = i18n.__('full.env.list', envList);
		}
		else if (matchString !== '' && envList !== '') {
			// Filter provided and matches found.
			message = i18n.__('matched.env.list', matchString, envList);
		}
		else {
			// Filter provided, but no matches found.
			message = i18n.__('no.matches.found', matchString);
		}
		robot.emit('ibmcloud.formatter', { response: res, message: message });
	});
};
