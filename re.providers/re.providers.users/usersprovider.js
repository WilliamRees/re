var User = require("../../re.business/user/user.js");
var mongoose = require('mongoose');
var AutoMapper = require('../automapper.js');
var userMap = User.userMap;
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var DbUser = mongoose.model('User', new Schema({
    email: {type: String, unique : true, required : true, index : true},
	firstname: {type: String, required : true},
	lastname: {type: String, required : true},
    password: {type: String, required : true},
    roles: {type: Array, required : true}
},{strict: true}));

var UserProvider = function () {};

UserProvider.save = function (user, errorCallback) {
	var newUser = new DbUser(user);
	
	return newUser.save(function(err, user) {
		if (err) {
			errorCallback(err);
		}
	}).then(function (user) {
		return AutoMapper.Map(user, new User(), userMap);
	});	
};

UserProvider.count = function (options) {
	return DbUser.count(options).then(function(count) {
		return count;
	});	
};

UserProvider.findOne = function (options) {
	return DbUser.findOne(options, function (err, user) {
		//If there is an error throw it.
		if (err) {
			console.log("Error finding user")
			console.log(err);
			throw err;
		}

	}).then(function (user) {
		if (user) {
			//User was found return a new instance of user.
			var _user = new User();
			return AutoMapper.Map(user, _user, userMap);
		}

		return null;
		
	});
};

UserProvider.find = function (options) {
	return DbUser.find(options, function (err, users) {
		if (err) {
			console.log("Error finding user")
			console.log(err);
			throw err;
		}
	}).then(function (users) {
		var mappedUsers = [];
		users.forEach(function(user) {
			console.log(user);
			mappedUsers.push(AutoMapper.Map(user, new User(), userMap));
		});
		
		return users;
		
	});
}

module.exports = UserProvider;