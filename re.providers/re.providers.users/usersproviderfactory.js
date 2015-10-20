var UsersProvider = require("./usersprovider.js");

module.exports = {
	create: function () {
		return new UsersProvider(); 
	}
}