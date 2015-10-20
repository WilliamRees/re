function SecureController() {
}

function post(req, res, next) {
  res.status(200).json({ hello: 'from secure controller' });
}

SecureController.prototype = {
  post: post
};

var secureController = new SecureController();

module.exports = secureController;