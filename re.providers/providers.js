var UserProvider = require('./re.providers.users/usersprovider.js');
var dbcontext = require("../re.db/factory.js").create();

var providers = {
	userProvider: UserProvider
};

module.exports = providers; 