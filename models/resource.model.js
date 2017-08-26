var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Web Resource schema
var ResourceSchema = new Schema({
	resource: String,
	resourceURL: String,
	status: String,
	crawledAt: Date,
	createdAt: { type: Date, default: Date.now }
});

// True since it is a parallel middleware
ResourceSchema.pre('save', function(next, done) {
	if(!this.resource){
		next(new Error("Resource should not be null"));
	}
  	next();
});

var ResourceModel = mongoose.model('Resource', ResourceSchema);

module.exports = ResourceModel;