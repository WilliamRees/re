var User = function () {
    this.email = "";
	this.firstname = "";
	this.lastname=  "";
    this.password = ""; 
    this.roles = [];
}


User.userMap = ["email", "firstname", "lastname", "password", "roles"];

module.exports = User;