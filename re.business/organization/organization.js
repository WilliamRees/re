module.exports.Organization = function () {
    this.name = "";
	this.users = [];
	this.owner = {};
}

module.exports.organizationMap = ["email", "firstname", "lastname", "password", "roles"];