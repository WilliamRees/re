
function UsersController() {
}

function get(req, res, next) {
  res.status(200).json({ hello: 'world' });
}

function post(req, res, next) {
  res.status(200).json({ hello: 'posts' }) 
}

UsersController.prototype = {
  get: get,
  post: post
};

var usersController = new UsersController();

module.exports = usersController;
