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
		process.env = {
			var1: 'value1',
			var2: 'value2'
		};
		it('should present full list', function(done) {
			room.robot.on('ibmcloud.formatter', function(event) {
				expect(event.message).to.contain('Here is the full list');
				expect(event.message).to.contain('\nvar1=value1');
				expect(event.message).to.contain('\nvar2=value2');
				done();
			});
			room.user.say('mimiron', '@hubot environment').then();
		});
	});

	// ---------------------------------------------------------
	// Fetch subset of variable list via filter
	// ---------------------------------------------------------
	context('user asks for a subset of the env variables', function() {
		process.env = {
			var1: 'value1',
			var11: 'value11',
			var2: 'value2'
		};
		it('should present subset list', function(done) {
			room.robot.on('ibmcloud.formatter', function(event) {
				expect(event.message).to.contain('Here is the subset');
				expect(event.message).to.contain('\nvar1=value1');
				expect(event.message).to.contain('\nvar11=value11');
				expect(event.message).to.not.contain('var2');
				done();
			});
			room.user.say('mimiron', '@hubot environment var1').then();
		});
	});

	// ---------------------------------------------------------
	// Fetch subset of variables that matches nothing.
	// ---------------------------------------------------------
	context('user asks for a subset of the env variables with no matches', function() {
		process.env = {
			var1: 'value1',
			var11: 'value11',
			var2: 'value2'
		};
		it('should present an empty list', function(done) {
			room.robot.on('ibmcloud.formatter', function(event) {
				expect(event.message).to.contain('None of the environment variables contain the string *abc*');
				expect(event.message).to.not.contain('\nvar1=value1');
				expect(event.message).to.not.contain('\nvar11=value11');
				expect(event.message).to.not.contain('var2');
				done();
			});
			room.user.say('mimiron', '@hubot environment abc').then();
		});
	});

});
