var mongoose = require('mongoose');

function dbcontext() {
	if (mongoose.connection.readyState === 0) {
		mongoose.connect("mongodb://localhost/re2");
	}
	
	return mongoose;
}

module.exports = dbcontext;