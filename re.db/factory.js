var dbcontext = require("./dbcontext.js");

module.exports = {
	create: function () {
		return new dbcontext();
	}
}