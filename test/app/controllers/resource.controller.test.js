"use strict";

var should = require('should'),
	sinon = require('sinon'),
	mongoose = require('mongoose');

require('sinon-mongoose');

var ResourceModel = require('../../../models/resource.model');

describe('ResourceController testing', function () {

	describe('Resource Crawling Initiating test', function () {
		
		it('Should call save only once', function () {
			var saveStub = sinon.stub();
			function Book(){
				this.save = saveStub
			}
			var req = {
				body: {
					resource: "Test resource from mock"
				}
			}
			var res = {}, next = {};
			var ResourceController = require('../../../controllers/resource.controller')(Book);
			ResourceController.InitResourceCrawling(req, res, next);
			sinon.assert.calledOnce(saveStub);
		});


	});

});