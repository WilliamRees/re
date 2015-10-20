var mongoose = require('mongoose');

function dbcontext() {
	if (mongoose.connection.readyState === 0) {
		mongoose.connect("mongodb://localhost/re");
	}
	
	return mongoose;
}

module.exports = dbcontext;