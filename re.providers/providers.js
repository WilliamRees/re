var UserProvider = require('./re.providers.users/usersprovider.js');
var OrganizationProvider = require('./re.providers.organizations/organizationsprovider.js');
var dbcontext = require("../re.db/factory.js").create();

var providers = {
	userProvider: UserProvider,
	organizationProvider: OrganizationProvider
};

module.exports = providers; 