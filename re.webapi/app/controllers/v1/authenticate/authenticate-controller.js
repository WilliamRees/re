var dbcontext = require('../../../../../re.db/factory.js').create();
// var userProvider = require('../../../../../re.providers/re.providers.users/usersproviderfactory.js').create();
var providers = require('../../../../../re.providers/providers.js');
var User   = require('../../../../../re.business/user/user.js');
var jwt    = require('jsonwebtoken');
var bodyParser  = require('body-parser');

function AuthenticateController() {
}

function post(req, res, next) {
  providers.userProvider.findOne({
    email: req.body.email
  }).then(function (user) {
    if (user == null) {
      res.json({ success: false, message: 'Authentication failed. Invalid user' });
    } else if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, "ilovescotchyscotch", {
          expiresInMinutes: 1440 // expires in 24 hours
        });
  
        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }  
  });
}

AuthenticateController.prototype = {
  post: post
};

var authenticateController = new AuthenticateController();

module.exports = authenticateController;
