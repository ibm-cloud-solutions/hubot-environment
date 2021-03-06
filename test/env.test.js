/*
  * Licensed Materials - Property of IBM
  * (C) Copyright IBM Corp. 2016. All Rights Reserved.
  * US Government Users Restricted Rights - Use, duplication or
  * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
  */
'use strict';

const Helper = require('hubot-test-helper');
const helper = new Helper('../src/scripts');
const expect = require('chai').expect;


describe('Testing environment.js', function() {

	let room;

	beforeEach(function() {
		room = helper.createRoom();
	});

	afterEach(function() {
		room.destroy();
	});

	// ---------------------------------------------------------
	// Fetch full env variable list.
	// ---------------------------------------------------------
	context('user asks for all env variables', function() {
		it('should present full list', function(done) {
			process.env = {
				var1: 'value1',
				var2: 'value2'
			};
			room.robot.on('ibmcloud.formatter', function(event) {
				expect(event.message).to.contain('Here is the full list');
				expect(event.message).to.contain('\n*var1*=value1');
				expect(event.message).to.contain('\n*var2*=value2');
				done();
			});
			room.user.say('mimiron', '@hubot environment show').then();
		});
	});

	// ---------------------------------------------------------
	// Fetch subset of variable list via filter
	// ---------------------------------------------------------
	context('user asks for a subset of the env variables', function() {
		it('should present subset list', function(done) {
			process.env = {
				var1: 'value1',
				var11: 'value11',
				var2: 'value2'
			};
			room.robot.on('ibmcloud.formatter', function(event) {
				expect(event.message).to.contain('Here is the subset');
				expect(event.message).to.contain('\n*var1*=value1');
				expect(event.message).to.contain('\n*var11*=value11');
				expect(event.message).to.not.contain('var2');
				done();
			});
			room.user.say('mimiron', '@hubot environment filter var1').then();
		});
	});

	// ---------------------------------------------------------
	// Fetch subset of variables that matches nothing.
	// ---------------------------------------------------------
	context('user asks for a subset of the env variables with no matches', function() {
		it('should present an empty list', function(done) {
			process.env = {
				var1: 'value1',
				var11: 'value11',
				var2: 'value2'
			};
			room.robot.on('ibmcloud.formatter', function(event) {
				expect(event.message).to.contain('None of the environment variables contain the string *abc*');
				expect(event.message).to.not.contain('\n*var1*=value1');
				expect(event.message).to.not.contain('\n*var11*=value11');
				expect(event.message).to.not.contain('var2');
				done();
			});
			room.user.say('mimiron', '@hubot environment filter abc').then();
		});
	});

	context('user asks for a subset of the env variables that contains sensitive data', function() {
		it('should present subset list with PASSWORD obscured', function(done) {
			process.env = {
				MY_PASSWORD: 'value1',
				MY_NAME: 'value11',
				var2: 'value2'
			};
			room.robot.on('ibmcloud.formatter', function(event) {
				expect(event.message).to.contain('Here is the subset');
				expect(event.message).to.contain('\n*MY_PASSWORD*=####################');
				expect(event.message).to.contain('\n*MY_NAME*=value11');
				expect(event.message).to.not.contain('var2');
				done();
			});
			room.user.say('mimiron', '@hubot environment filter MY').then();
		});

		it('should present subset list with TOKEN obscured', function(done) {
			process.env = {
				MY_TOKEN: 'value1',
				MY_NAME: 'value11',
				var2: 'value2'
			};
			room.robot.on('ibmcloud.formatter', function(event) {
				expect(event.message).to.contain('Here is the subset');
				expect(event.message).to.contain('\n*MY_TOKEN*=####################');
				expect(event.message).to.contain('\n*MY_NAME*=value11');
				expect(event.message).to.not.contain('var2');
				done();
			});
			room.user.say('mimiron', '@hubot environment filter MY').then();
		});

		it('should present subset list with SECRET obscured', function(done) {
			process.env = {
				MY_SECRET: 'value1',
				MY_NAME: 'value11',
				var2: 'value2'
			};
			room.robot.on('ibmcloud.formatter', function(event) {
				expect(event.message).to.contain('Here is the subset');
				expect(event.message).to.contain('\n*MY_SECRET*=####################');
				expect(event.message).to.contain('\n*MY_NAME*=value11');
				expect(event.message).to.not.contain('var2');
				done();
			});
			room.user.say('mimiron', '@hubot environment filter MY').then();
		});

		it('should present subset list with KEY obscured', function(done) {
			process.env = {
				MYKEY: 'value1',
				MY_NAME: 'value11',
				var2: 'value2'
			};
			room.robot.on('ibmcloud.formatter', function(event) {
				expect(event.message).to.contain('Here is the subset');
				expect(event.message).to.contain('\n*MYKEY*=####################');
				expect(event.message).to.contain('\n*MY_NAME*=value11');
				expect(event.message).to.not.contain('var2');
				done();
			});
			room.user.say('mimiron', '@hubot environment filter MY').then();
		});

		it('should present subset list with ACCOUNTS obscured', function(done) {
			process.env = {
				MY_ACCOUNTS: 'value1',
				MY_NAME: 'value11',
				var2: 'value2'
			};
			room.robot.on('ibmcloud.formatter', function(event) {
				expect(event.message).to.contain('Here is the subset');
				expect(event.message).to.contain('\n*MY_ACCOUNTS*=####################');
				expect(event.message).to.contain('\n*MY_NAME*=value11');
				expect(event.message).to.not.contain('var2');
				done();
			});
			room.user.say('mimiron', '@hubot environment filter MY').then();
		});

		it('should present subset list with SALT obscured', function(done) {
			process.env = {
				MY_SALT: 'value1',
				MY_NAME: 'value11',
				var2: 'value2'
			};
			room.robot.on('ibmcloud.formatter', function(event) {
				expect(event.message).to.contain('Here is the subset');
				expect(event.message).to.contain('\n*MY_SALT*=####################');
				expect(event.message).to.contain('\n*MY_NAME*=value11');
				expect(event.message).to.not.contain('var2');
				done();
			});
			room.user.say('mimiron', '@hubot environment filter MY').then();
		});

		it('should present the help', function(done) {
			room.robot.on('ibmcloud.formatter', function(event) {
				let expected = 'hubot environment show - Show the full set of environment variables.\n'
					+ 'hubot environment filter [string] - Show environment variables including the given string.\n';
				expect(event.message).to.contain(expected);
				done();
			});
			room.user.say('mimiron', '@hubot environment help').then();
		});

	});

});
