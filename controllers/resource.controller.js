"use strict";

var ResourceCtrl = function(Resource){

	var ResourceObj = {};

	ResourceObj.InitResourceCrawling = function(req, res, next){

		// ToDo Logic to avoid crawling on same URL

		//Store Resource to be crawled
		var newResource = new Resource(req.body);
		newResource.save(function(err, resource){
			if(err){
				res.json({status: false, error: err.message});
				return;
			}
			res.json({status: true, resource: resource});
		});

		//ToDo Logic to Initiate the Resource Crawling
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

	return ResourceObj;
}

module.exports = ResourceCtrl;