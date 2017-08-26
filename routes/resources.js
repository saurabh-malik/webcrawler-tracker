var Resource = require('../models/resource.model');
var ResourceController = require('../controllers/resource.controller')(Resource);

module.exports = function(app){

	app.get('/api/resources', ResourceController.GetResource);
	
	app.post('/api/resources', ResourceController.InitResourceCrawling);

}
