var User = require("../../re.business/user/user.js");
var mongoose = require('mongoose');
var AutoMapper = require('../automapper.js');
var userMap = User.userMap;
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var DbUser = mongoose.model('User', new Schema({
    email: String,
	firstname: String,
	lastname: String,
    password: String,
    roles: []
}));

var UserProvider = function () {};

UserProvider.save = function (user) {
	var newUser = new DbUser(user);
	return newUser.save(function(err) {
		if (err) throw err;

	}).then(function () {
		console.log('User saved successfully');
		return UserProvider.findOne({email: user.email});
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