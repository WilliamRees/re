var User = require('../../../../../re.business/user/user.js');
var provider = require('../../../../../re.providers/providers.js');
var AutoMapper = require('../../../../../re.providers/automapper.js');
function UsersController() {
}

function get(req, res, next) {
  provider.userProvider.find().then(function (users) {
    res.json(users)
  });
  
}

function put(req, res, next) {
  var user = AutoMapper.Map(req.body, new User(), User.userMap);
  
  provider.userProvider.save(user, function (error) {
    res.status(500).json({error: error, errmsg: error.errmsg});
      return;
  }).then(function (user) {
    res.status(201).location('/api/v1/users/' + user.id).json({success:true, data: {user: user }});
    return;
  }); 
}

UsersController.prototype = {
  get: get,
  put: put
};

var usersController = new UsersController();

module.exports = usersController;
