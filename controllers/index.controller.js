"use strict";

var IndexCtrl = function(){
	var IndexObj = {};

	IndexObj.IndexGet = function(req, res, next){

		res.render('../views/index', {
	        title: "SMCrawler"
	    });
	}

	return IndexObj;
}

module.exports = IndexCtrl;