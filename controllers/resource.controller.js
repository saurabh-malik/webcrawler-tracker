"use strict";
var Publisher = require('../publishers/publisher.url')();
var moment = require('moment');

var ResourceCtrl = function(Resource){

	var ResourceObj = {};

	ResourceObj.InitResourceCrawling = function(req, res, next){

		// ToDo Logic to avoid crawling on same URL

		//Store Resource to be crawled
		var newResource = new Resource(req.body);

		console.log(newResource);
		console.log(req.body);
		//logic to get domain 
		var domainName = extractHostname(newResource.resourceURL);
		newResource.resource = domainName;

		Resource.findOne({resource: domainName}, function(err,obj){
			if(err){
				res.json({status: false, error: err.message});
				return;
			}
			if(obj){
				console.log(obj)
				console.log(obj.lastCrawledAt);
				var crawledSince = (new Date()) - (new Date(obj.lastCrawledAt));
				console.log("Not crawled since hrs: " + crawledSince);
				if(crawledSince > 60*60*1000){
					obj.lastCrawledAt = Date.now();
					obj.save({})
					Publisher.PublishNewURL(newResource);
					res.json({status: true, resource: newResource});
				}
				else {
					res.json({status: false, message: "Already crawled in last 1 hr"});
				}
			}
			else{
				newResource.save(function(err, resource){
					if(err){
						res.json({status: false, error: err.message});
						return;
					}
					//ToDo Logic to Initiate the Resource Crawling
					startCrawler(resource);
					res.json({status: true, resource: resource});	
				});
			}
		})
	}

	ResourceObj.GetResources = function(req, res, next){
		Resource.find(function(err, resources){	
			if(err) {
				res.json({status: false, error: "Something went wrong"});
				return
			}
			res.json({status: true, resources: resources});
		});
	}

	function extractRootDomain(url) {
	    var domain = extractHostname(url),
	        splitArr = domain.split('.'),
	        arrLen = splitArr.length;

	    //extracting the root domain here
	    if (arrLen > 2) {
	        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
	    }
	    return domain;
	}

	function extractHostname(url) {
	    var hostname;
	    //find & remove protocol (http, ftp, etc.) and get hostname

	    if (url.indexOf("://") > -1) {
	        hostname = url.split('/')[2];
	    }
	    else {
	        hostname = url.split('/')[0];
	    }

	    //find & remove port number
	    hostname = hostname.split(':')[0];
	    //find & remove "?"
	    hostname = hostname.split('?')[0];

	    return hostname;
	}

	function startCrawler(newResource){
		Publisher.PublishNewURL(newResource);
		newResource.lastCrawledAt = Date.now();
		newResource.save(function(err, resource){
			if(err){
				console.log(err)
				return;
			}
		});
	}

	return ResourceObj;
}

module.exports = ResourceCtrl;