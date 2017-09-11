"use strict";

var IndexCtrl = function(){
	var IndexObj = {};

	IndexObj.IndexGet = function(req, res, next){

		res.json({status: true, resource: {}});
	}

	return IndexObj;
}

module.exports = IndexCtrl;