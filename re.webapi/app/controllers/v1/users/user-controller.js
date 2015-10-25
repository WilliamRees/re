var User = require('../../../../../re.business/user/user.js');
var provider = require('../../../../../re.providers/providers.js');
var AutoMapper = require('../../../../../re.providers/automapper.js');
function UserController() {
}

function get(req, res, next) {
  var id = req.params.id;
  provider.userProvider.find({_id: id}).then(function (users) {
    res.json(users)
  });
  
}

UserController.prototype = {
  get: get
};

var userController = new UserController();

module.exports = userController;
