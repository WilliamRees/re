var Organization = require("../../re.business/organization/organization.js");
var User = require("../../re.business/user/user.js");
var mongoose = require('mongoose');
var AutoMapper = require('../automapper.js');
var provider = "../providers.js";
var organizationMap = Organization.organizationMap;
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var DbOrganization = mongoose.model('Organization', new Schema({
    orgName: {type: String, unique : true, required : true, index : true},
	users: [{type: Schema.Types.ObjectId, ref: 'User'}],
	listings: {type: Array}
},{strict: true}));

DbOrganization.schema.path('users').validate(function (value, respond) {
	
}, 'The user does not exist.');

var OrganizationProvider = function () {};

OrganizationProvider.save = function (organization, errorCallback) {
	var newOrganization = new DbOrganization(organization);
	
	return newOrganization.save(function(err, user) {
		if (err) {
			errorCallback(err);
		}
	}).then(function (organization) {
		return AutoMapper.Map(organization, new Organization(), organizationMap);
	});	
};

OrganizationProvider.findOne = function (options) {
	return DbOrganization.findOne(options).populate({
        path:'users',
        model:'User'
    }).exec(options, function (err, organization) {
		//If there is an error throw it.
		if (err) {
			console.log("Error finding organization")
			console.log(err);
			throw err;
		}

	}).then(function (organization) {
		if (organization) {
			//User was found return a new instance of organization.
			var _organization = new Organization();
			return AutoMapper.Map(organization, _organization, organizationMap);
		}

		return null;
		
	});
};

module.exports = OrganizationProvider;