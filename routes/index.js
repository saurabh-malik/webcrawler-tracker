var indexCntrl = require('../controllers/index.controller')();

module.exports = function(app){
	app.get('/', indexCntrl.IndexGet);
}