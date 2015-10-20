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
  console.log(req.body);
  User.userMap.forEach(function (prop) {
    if (req.body[prop] === undefined) {
      res.json({success: false, Errors: ["Missing property " + prop]});
      return;
    }
  });
  
  var user = AutoMapper.Map(req.body, new User(), User.userMap);
  
  provider.userProvider.save(user).then(function (user) {
    res.status(201).location('/api/v1/users/');
  });
}

function post(req, res, next) {
  res.status(200).json({ hello: 'postss' }) 
}

UsersController.prototype = {
  get: get,
  post: post,
  put: put
};

var usersController = new UsersController();

module.exports = usersController;
